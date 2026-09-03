const PARENT_FOLDER=process.env.GOOGLE_DRIVE_FOLDER_ID;
const CLIENT_ID=process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET=process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REFRESH_TOKEN=process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(data));}
function clean(s,max=80){return String(s||'').replace(/[\\/:*?"<>|\x00-\x1f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max)}
function isoDate(value){if(!value)return new Date().toISOString().slice(0,10);const d=new Date(value);return Number.isNaN(d.getTime())?new Date().toISOString().slice(0,10):d.toISOString().slice(0,10)}
async function accessToken(){
  if(!CLIENT_ID||!CLIENT_SECRET||!REFRESH_TOKEN)throw new Error('Google Drive authorization is not complete in Vercel');
  const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:CLIENT_ID,client_secret:CLIENT_SECRET,refresh_token:REFRESH_TOKEN,grant_type:'refresh_token'})});
  const j=await r.json();if(!r.ok||!j.access_token)throw new Error(j.error_description||j.error||'Could not refresh Google Drive access');return j.access_token;
}
async function driveJSON(token,url,options={}){
  const r=await fetch(url,{...options,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...(options.headers||{})}});const text=await r.text();let out={};try{out=text?JSON.parse(text):{}}catch{out={raw:text}}if(!r.ok)throw new Error(out.error?.message||out.error||`Google Drive request failed (${r.status})`);return {r,out};
}
async function createJsonFile(token,folderId,name,data){
  const boundary='beast_'+Math.random().toString(36).slice(2);
  const meta=JSON.stringify({name,mimeType:'application/json',parents:[folderId]});
  const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(data,null,2)}\r\n--${boundary}--`;
  const r=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':`multipart/related; boundary=${boundary}`},body});
  const j=await r.json();if(!r.ok)throw new Error(j.error?.message||'Could not create submission.json');return j;
}
async function createUploadSession(token,folderId,file){
  const safeName=clean(file.name,160)||'upload.bin';
  const r=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,webViewLink',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json; charset=UTF-8','X-Upload-Content-Type':file.type||'application/octet-stream','X-Upload-Content-Length':String(file.size||0)},body:JSON.stringify({name:safeName,parents:[folderId]})});
  if(!r.ok){let j={};try{j=await r.json()}catch{}throw new Error(j.error?.message||`Could not prepare upload for ${safeName}`)}
  const uploadUrl=r.headers.get('location');if(!uploadUrl)throw new Error(`Google did not return an upload URL for ${safeName}`);return {name:safeName,uploadUrl};
}

module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'Method not allowed'});}
  if(!PARENT_FOLDER)return send(res,503,{error:'GOOGLE_DRIVE_FOLDER_ID is not configured'});
  try{
    let body=req.body;if(typeof body==='string')body=JSON.parse(body);if(!body||typeof body!=='object')return send(res,400,{error:'Invalid submission'});
    const submission={
      type:clean(body.type,60),name:clean(body.name,120),email:clean(body.email,180),show:clean(body.show,180),eventDate:clean(body.eventDate,40),city:clean(body.city,100),link:clean(body.link,500),notes:String(body.notes||'').trim().slice(0,10000),submittedAt:new Date().toISOString(),source:'beast-band.vercel.app',originalFiles:Array.isArray(body.files)?body.files.map(f=>({name:clean(f.name,160),type:clean(f.type,120),size:Number(f.size)||0})).slice(0,25):[]
    };
    if(!submission.name||!submission.email)return send(res,400,{error:'Name and email are required'});
    const token=await accessToken();
    const date=isoDate(submission.eventDate||submission.submittedAt);
    const label=[date,submission.show||submission.city||submission.type||'Submission',submission.name].map(x=>clean(x,60)).filter(Boolean).join(' — ');
    const {out:folder}=await driveJSON(token,'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink',{method:'POST',body:JSON.stringify({name:label,mimeType:'application/vnd.google-apps.folder',parents:[PARENT_FOLDER]})});
    await createJsonFile(token,folder.id,'submission.json',{...submission,archiveFolderId:folder.id,archiveFolderName:folder.name});
    const uploads=[];for(const file of submission.originalFiles)uploads.push(await createUploadSession(token,folder.id,file));
    return send(res,200,{ok:true,folderId:folder.id,folderName:folder.name,uploads});
  }catch(e){return send(res,500,{error:'Could not create archive submission',detail:e.message});}
};