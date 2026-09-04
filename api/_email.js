const tls=require('tls');

const HOST=process.env.TURBOSMTP_HOST||'pro.turbo-smtp.com';
const PORT=Number(process.env.TURBOSMTP_PORT||465);
const USER=process.env.TURBOSMTP_USER;
const PASSWORD=process.env.TURBOSMTP_PASSWORD;
const FROM=process.env.TURBOSMTP_FROM||'BEAST <noreply@beast-band.vercel.app>';

function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function addressOnly(v){const s=String(v||'').trim();const m=s.match(/<([^>]+)>/);return (m?m[1]:s).trim();}
function headerValue(v){const s=String(v??'');return /^[\x20-\x7E]*$/.test(s)?s:`=?UTF-8?B?${Buffer.from(s,'utf8').toString('base64')}?=`;}
function normalizeRecipients(to){return (Array.isArray(to)?to:[to]).map(addressOnly).filter(Boolean);}
function dotStuff(s){return String(s).replace(/(^|\r?\n)\./g,'$1..');}

function smtpConnection(){
 return new Promise((resolve,reject)=>{
  const socket=tls.connect({host:HOST,port:PORT,servername:HOST,rejectUnauthorized:true});
  let buffer='';
  const waiters=[];
  let settled=false;
  const fail=e=>{if(settled)return;settled=true;reject(e)};
  socket.setTimeout(20000,()=>socket.destroy(new Error('SMTP connection timed out')));
  socket.on('error',fail);
  socket.on('data',chunk=>{
   buffer+=chunk.toString('utf8');
   while(true){
    const lines=buffer.split(/\r?\n/);
    if(lines.length<2)break;
    let end=-1;
    for(let i=0;i<lines.length-1;i++)if(/^\d{3} /.test(lines[i])){end=i;break;}
    if(end<0)break;
    const reply=lines.slice(0,end+1).join('\r\n');
    buffer=lines.slice(end+1).join('\r\n');
    const waiter=waiters.shift();
    if(waiter)waiter(reply);
   }
  });
  socket.on('secureConnect',()=>{
   const command=(line,expected)=>new Promise((res,rej)=>{
    waiters.push(reply=>{
     const code=Number(reply.slice(0,3));
     if(!expected.includes(code))return rej(new Error(`SMTP ${code}: ${reply.replace(/\r?\n/g,' ')}`));
     res(reply);
    });
    if(line!==null)socket.write(line+'\r\n');
   });
   settled=true;
   resolve({socket,command});
  });
 });
}

async function sendEmail({to,subject,text,html,replyTo}){
 if(!USER||!PASSWORD)throw new Error('turboSMTP credentials are not configured in Vercel');
 const recipients=normalizeRecipients(to);
 if(!recipients.length)throw new Error('No email recipient supplied');
 const fromAddress=addressOnly(FROM);
 const boundary=`beast_${Date.now()}_${Math.random().toString(16).slice(2)}`;
 const headers=[
  `From: ${FROM}`,
  `To: ${recipients.join(', ')}`,
  `Subject: ${headerValue(subject||'BEAST')}`,
  `Date: ${new Date().toUTCString()}`,
  'MIME-Version: 1.0',
  `Content-Type: multipart/alternative; boundary="${boundary}"`
 ];
 if(replyTo)headers.push(`Reply-To: ${addressOnly(replyTo)}`);
 const body=[
  ...headers,'',
  `--${boundary}`,'Content-Type: text/plain; charset="UTF-8"','Content-Transfer-Encoding: 8bit','',String(text||''),
  `--${boundary}`,'Content-Type: text/html; charset="UTF-8"','Content-Transfer-Encoding: 8bit','',String(html||`<pre>${esc(text||'')}</pre>`),
  `--${boundary}--`,''
 ].join('\r\n');

 const {socket,command}=await smtpConnection();
 try{
  await command(null,[220]);
  await command('EHLO beast-band.vercel.app',[250]);
  await command('AUTH LOGIN',[334]);
  await command(Buffer.from(USER).toString('base64'),[334]);
  await command(Buffer.from(PASSWORD).toString('base64'),[235]);
  await command(`MAIL FROM:<${fromAddress}>`,[250]);
  for(const recipient of recipients)await command(`RCPT TO:<${recipient}>`,[250,251]);
  await command('DATA',[354]);
  await command(dotStuff(body)+'\r\n.',[250]);
  await command('QUIT',[221]);
  socket.end();
  return {ok:true,provider:'turboSMTP'};
 }catch(e){
  socket.destroy();
  throw e;
 }
}
module.exports={sendEmail,esc};
