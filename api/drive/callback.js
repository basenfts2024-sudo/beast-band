const crypto=require('crypto');

const CLIENT_ID=process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET=process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI='https://beast-band.vercel.app/api/drive/callback';
const TARGET_EMAIL='futurenowza@gmail.com';

function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function sign(value){return crypto.createHmac('sha256',CLIENT_SECRET||'').update(value).digest('hex')}
function validState(state){
  const [ts,sig]=String(state||'').split('.');
  if(!ts||!sig||!/^\d+$/.test(ts))return false;
  if(Date.now()-Number(ts)>15*60*1000)return false;
  const expected=sign(ts);
  try{return crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))}catch{return false}
}
function page(title,body){return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>body{font-family:Arial,sans-serif;background:#f1eadc;color:#111;margin:0;padding:48px}main{max-width:760px;margin:auto;border:2px solid #111;padding:32px;background:#f7f0e4}h1{font-size:42px;margin:0 0 20px}code,textarea{font-family:monospace}textarea{width:100%;min-height:160px;box-sizing:border-box;padding:12px}.note{margin-top:18px;line-height:1.5}</style></head><body><main>${body}</main></body></html>`}

module.exports=async(req,res)=>{
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  if(!CLIENT_ID||!CLIENT_SECRET){res.statusCode=503;return res.end(page('Not configured','<h1>Drive OAuth is not configured.</h1>'));}
  const url=new URL(req.url,'https://beast-band.vercel.app');
  const code=url.searchParams.get('code');
  const state=url.searchParams.get('state');
  const oauthError=url.searchParams.get('error');
  if(oauthError){res.statusCode=400;return res.end(page('Authorization cancelled',`<h1>Authorization cancelled</h1><p>${esc(oauthError)}</p>`));}
  if(!code||!validState(state)){res.statusCode=400;return res.end(page('Invalid request','<h1>Invalid or expired authorization request.</h1><p>Start again from <code>/api/drive/auth</code>.</p>'));}
  try{
    const tokenRes=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:CLIENT_ID,client_secret:CLIENT_SECRET,redirect_uri:REDIRECT_URI,grant_type:'authorization_code'})});
    const tokens=await tokenRes.json();
    if(!tokenRes.ok)throw new Error(tokens.error_description||tokens.error||'Token exchange failed');
    if(!tokens.id_token)throw new Error('Google did not return an ID token');
    const infoRes=await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(tokens.id_token),{cache:'no-store'});
    const info=await infoRes.json();
    if(!infoRes.ok)throw new Error('Could not verify Google account');
    const email=String(info.email||'').toLowerCase();
    if(email!==TARGET_EMAIL)throw new Error(`Please authorize ${TARGET_EMAIL}, not ${email||'another account'}.`);
    if(!tokens.refresh_token)throw new Error('No refresh token was returned. Revoke the app connection for this account and authorize again with consent.');
    const rt=esc(tokens.refresh_token);
    return res.end(page('BEAST Drive connected',`<h1>Drive authorization complete.</h1><p>Authorized account: <strong>${esc(email)}</strong></p><p>Copy the refresh token below directly into Vercel as <code>GOOGLE_DRIVE_REFRESH_TOKEN</code>.</p><textarea readonly onclick="this.select()">${rt}</textarea><p class="note"><strong>Keep this token private.</strong> Do not paste it into chat or share it. After saving it in Vercel, redeploy the production site.</p>`));
  }catch(e){res.statusCode=500;return res.end(page('Authorization failed',`<h1>Authorization failed</h1><p>${esc(e.message)}</p>`));}
};