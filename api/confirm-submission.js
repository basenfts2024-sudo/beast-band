const {sendEmail,esc}=require('./_email');
function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(data));}
function clean(v,max=500){return String(v||'').trim().slice(0,max)}
module.exports=async(req,res)=>{
 if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'Method not allowed'});}
 try{
  let body=req.body;if(typeof body==='string')body=JSON.parse(body);
  const email=clean(body?.email,180),name=clean(body?.name,120);
  if(!email)return send(res,400,{error:'Email is required'});
  const subject='Submission Received!';
  const greeting=name?`Hi ${name},`:'Hi,';
  const message='Thank-you for being a fan and documentarian in the music scene.';
  const text=`${greeting}\n\n${message}\n\nYour submission has been received and added to the BEAST Archive.\n\n— BEAST`;
  const html=`<div style="font-family:Arial,sans-serif;line-height:1.6;max-width:620px"><h1 style="font-size:28px;margin:0 0 24px">Submission Received!</h1><p>${esc(greeting)}</p><p>${esc(message)}</p><p>Your submission has been received and added to the BEAST Archive.</p><p>— BEAST</p></div>`;
  await sendEmail({to:email,subject,text,html});
  return send(res,200,{ok:true});
 }catch(e){return send(res,500,{error:'Could not send confirmation email',detail:e.message});}
};
