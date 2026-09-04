const RESEND_API_KEY=process.env.RESEND_API_KEY;
const EMAIL_FROM=process.env.EMAIL_FROM||'BEAST <onboarding@resend.dev>';

function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function sendEmail({to,subject,text,html,replyTo}){
  if(!RESEND_API_KEY)throw new Error('RESEND_API_KEY is not configured in Vercel');
  const body={from:EMAIL_FROM,to:Array.isArray(to)?to:[to],subject,text,html};
  if(replyTo)body.reply_to=replyTo;
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(body)});
  const out=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(out.message||out.error||`Email delivery failed (${r.status})`);
  return out;
}
module.exports={sendEmail,esc};
