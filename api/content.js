const OWNER=process.env.GITHUB_OWNER||'basenfts2024-sudo';
const REPO=process.env.GITHUB_REPO||'beast-band';
const BRANCH=process.env.GITHUB_BRANCH||'main';
const GOOGLE_CLIENT_ID='795220644196-3nmjjdevr2dc2qjfb0dd8dmb4engckn7.apps.googleusercontent.com';
const ALLOWED_EMAILS=new Set(['houjoubeckmann@gmail.com','futurenowza@gmail.com','basenfts2024@gmail.com','talktobeast@gmail.com']);
const apiPath=p=>`https://api.github.com/repos/${OWNER}/${REPO}/contents/${p}`;
const headers=()=>({Accept:'application/vnd.github+json','User-Agent':'beast-band-cms',...(process.env.GITHUB_TOKEN?{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`}:{})});
const send=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store, max-age=0');res.end(JSON.stringify(data));};
async function readFile(path){const r=await fetch(`${apiPath(path)}?ref=${encodeURIComponent(BRANCH)}&t=${Date.now()}`,{headers:headers(),cache:'no-store'});if(!r.ok)return null;const j=await r.json();return Buffer.from((j.content||'').replace(/\n/g,''),'base64').toString('utf8')}
async function readContent(){const direct=await readFile('content.json');if(direct)return JSON.parse(direct);return Object.assign({},require('../cms-core.json'),require('../cms-shows.json'),require('../cms-news.json'),require('../cms-interviews.json'),require('../cms-gallery.json'),require('../cms-timeline.json'),require('../cms-video.json'));}
async function verifyGoogle(req){const h=String(req.headers.authorization||'');if(!h.startsWith('Bearer '))return null;const token=h.slice(7);const r=await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(token),{cache:'no-store'});if(!r.ok)return null;const p=await r.json();const email=String(p.email||'').toLowerCase();if(p.aud!==GOOGLE_CLIENT_ID||p.email_verified!=='true'||!ALLOWED_EMAILS.has(email))return null;return email;}
module.exports=async(req,res)=>{
 if(req.method==='GET'){try{return send(res,200,await readContent())}catch(e){return send(res,500,{error:'Could not load site content',detail:e.message})}}
 if(req.method==='PUT'){
   const googleEmail=await verifyGoogle(req);
   const passwordOK=!!process.env.ADMIN_PASSWORD&&req.headers['x-admin-key']===process.env.ADMIN_PASSWORD;
   if(!googleEmail&&!passwordOK)return send(res,401,{error:'Google account is not authorized for BEAST CMS'});
   if(!process.env.GITHUB_TOKEN)return send(res,503,{error:'GITHUB_TOKEN is not configured in Vercel'});
   try{let body=req.body;if(typeof body==='string')body=JSON.parse(body);if(!body||typeof body!=='object'||Array.isArray(body))return send(res,400,{error:'Invalid content document'});const path='content.json';const current=await fetch(`${apiPath(path)}?ref=${encodeURIComponent(BRANCH)}`,{headers:headers(),cache:'no-store'});let sha=null;if(current.ok)sha=(await current.json()).sha;const payload={message:`Update BEAST site content${googleEmail?' by '+googleEmail:''} — ${new Date().toISOString()}`,content:Buffer.from(JSON.stringify(body,null,2)).toString('base64'),branch:BRANCH,...(sha?{sha}:{})};const saved=await fetch(apiPath(path),{method:'PUT',headers:{...headers(),'Content-Type':'application/json'},body:JSON.stringify(payload)});const out=await saved.json();if(!saved.ok)return send(res,saved.status,{error:out.message||'Save failed'});return send(res,200,{ok:true,commit:out.commit?.sha||null,updatedAt:new Date().toISOString(),user:googleEmail||'password-admin'});}catch(e){return send(res,500,{error:'Save failed',detail:e.message})}
 }
 res.setHeader('Allow','GET, PUT');return send(res,405,{error:'Method not allowed'});
};
