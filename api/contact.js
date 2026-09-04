const {sendEmail,esc}=require('./_email');
const DESTINATION='talktobeast@gmail.com';
function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(data));}
function clean(v,max=4000){return String(v||'').trim().slice(0,max)}
module.exports=async(req,res)=>{
 if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'Method not allowed'});}
 try{
  let body=req.body;if(typeof body==='string')body=JSON.parse(body);
  const name=clean(body?.name,120),email=clean(body?.email,180),subject=clean(body?.subject,120)||'Message',message=clean(body?.message,8000);
  if(!name||!email||!message)return send(res,400,{error:'Name, email and message are required'});
  const title=`BEAST — ${subject}`;
  const text=`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
  const html=`<div style="font-family:Arial,sans-serif;line-height:1.5"><h2>${esc(title)}</h2><p><strong>Name:</strong> ${esc(name)}<br><strong>Email:</strong> ${esc(email)}<br><strong>Subject:</strong> ${esc(subject)}</p><p>${esc(message).replace(/\n/g,'<br>')}</p></div>`;
  await sendEmail({to:DESTINATION,subject:title,text,html,replyTo:email});
  return send(res,200,{ok:true});
 }catch(e){return send(res,500,{error:'Could not send message',detail:e.message});}
};
