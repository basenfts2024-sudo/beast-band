const crypto=require('crypto');

const CLIENT_ID=process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET=process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI='https://beast-band.vercel.app/api/drive/callback';
const TARGET_EMAIL='futurenowza@gmail.com';

function sign(value){return crypto.createHmac('sha256',CLIENT_SECRET||'').update(value).digest('hex')}

module.exports=async(req,res)=>{
  if(!CLIENT_ID||!CLIENT_SECRET){res.statusCode=503;return res.end('Google Drive OAuth is not configured in Vercel.');}
  const ts=String(Date.now());
  const state=`${ts}.${sign(ts)}`;
  const params=new URLSearchParams({
    client_id:CLIENT_ID,
    redirect_uri:REDIRECT_URI,
    response_type:'code',
    access_type:'offline',
    prompt:'consent',
    include_granted_scopes:'true',
    scope:'openid email https://www.googleapis.com/auth/drive.file',
    login_hint:TARGET_EMAIL,
    state
  });
  res.statusCode=302;
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Location','https://accounts.google.com/o/oauth2/v2/auth?'+params.toString());
  res.end();
};