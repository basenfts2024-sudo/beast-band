function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(data));}
function validUploadUrl(value){try{const u=new URL(String(value||''));return u.protocol==='https:'&&u.hostname==='www.googleapis.com'&&u.pathname.startsWith('/upload/drive/v3/files')}catch{return false}}
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'Method not allowed'});}
  const uploadUrl=String(req.headers['x-beast-upload-url']||'');
  if(!validUploadUrl(uploadUrl))return send(res,400,{error:'Invalid upload session'});
  try{
    const type=String(req.headers['content-type']||'application/octet-stream');
    const length=req.headers['content-length'];
    const headers={'Content-Type':type};
    if(length)headers['Content-Length']=String(length);
    const r=await fetch(uploadUrl,{method:'PUT',headers,body:req,duplex:'half'});
    const text=await r.text();
    if(!r.ok){let detail=text;try{detail=JSON.parse(text)?.error?.message||text}catch{}return send(res,r.status||500,{error:'Google Drive upload failed',detail});}
    let file={};try{file=text?JSON.parse(text):{}}catch{file={raw:text}}
    return send(res,200,{ok:true,file});
  }catch(e){return send(res,500,{error:'Upload proxy failed',detail:e.message});}
};
