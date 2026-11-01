
(()=>{
 const FALLBACK_LOGO='https://desperate-orange-anteater.myfilebase.com/ipfs/QmWA4yRYu1fJAgB8aNNnWvEL8QrT4ndyQ5UDFxtt1Ycmm8';
 let siteLogo={logo:'',logoUrl:FALLBACK_LOGO};
 let instagramPosts=[];
 const memberInstagram={
  'Inge Beckmann':'https://www.instagram.com/beckmannschreuder/',
  'Rian Zietsman':'https://www.instagram.com/rianzietsman/',
  'Louis Nel':'https://www.instagram.com/ll_cool_nel/',
  'Werner von Waltsleben':'https://www.instagram.com/wernervonwaltsleben/',
  'Sasha Righini':'https://www.instagram.com/__ko1__/'
 };
 const fixSocial=s=>{const name=String(s?.[0]||'').trim(),handle=String(s?.[1]||'').trim(),url=String(s?.[2]||'').trim();if(name.toLowerCase()==='instagram'&&/instagram\.com\/(beastbandsa|beast_band)\/?$/i.test(url))return ['Instagram','@beast_band','https://www.instagram.com/beast_band/'];return [name,handle,url]};
 let siteSocials=socials.filter(s=>String(s[0]||'').toLowerCase()!=='bandcamp').map(fixSocial);
 const style=document.createElement('style');
 style.textContent='.logo.logo-image{display:flex;align-items:center;letter-spacing:0;text-transform:none}.logo.logo-image img{display:block;width:auto;height:clamp(24px,2.15vw,31px);max-width:min(190px,32vw);object-fit:contain}.foot-brand{flex-direction:column;align-items:flex-start;gap:6px;flex-wrap:nowrap;text-align:left}.home-hero .home-title,.home-hero .hero-title{display:none!important}.member-instagram{display:inline-block;margin-top:14px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}.band-instagram{margin-top:70px;padding-top:28px;padding-bottom:38px;border-top:1px solid rgba(0,0,0,.18);border-bottom:1px solid rgba(0,0,0,.18);display:flow-root;clear:both;position:relative}.instagram-gallery-divider{display:block;clear:both;width:100%;height:1px;background:rgba(0,0,0,.28);margin:48px 0 42px;position:relative}.gallery{clear:both;position:relative}.band-instagram-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:28px}.band-instagram-head h2{font-size:clamp(32px,4vw,58px);letter-spacing:-.05em;margin:4px 0 0}.band-instagram-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start}.band-instagram-card{min-width:0;overflow:hidden}.band-instagram iframe{display:block;width:100%;height:720px;border:0;background:#fff}.tl-intro{display:grid;grid-template-columns:minmax(180px,.55fr) 1.45fr;gap:40px;border-top:3px solid #111;border-bottom:1px solid rgba(0,0,0,.2);padding:28px 0 34px;margin:0 0 16px}.tl-intro>div{display:flex;flex-direction:column}.tl-intro strong{font-size:clamp(64px,9vw,130px);line-height:.8;letter-spacing:-.08em}.tl-intro span,.tl-key,.tl-date,.tl-index,.tl-source,.tl-year-break{font-size:10px;letter-spacing:.16em;text-transform:uppercase}.tl-intro p{font-size:clamp(19px,2.2vw,30px);line-height:1.2;letter-spacing:-.025em;margin:0;max-width:760px}.tl-key{display:flex;gap:24px;padding:12px 0 34px}.tl-key span{display:flex;align-items:center;gap:7px}.tl-key b{width:8px;height:8px;background:#111;border-radius:50%;display:inline-block}.tl-key .poster-dot{background:transparent;border:1px solid #111}.tl-year-break{display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:center;padding:48px 0 12px;font-weight:700}.tl-year-break span{font-size:18px;letter-spacing:-.02em}.tl-year-break i{height:1px;background:#111}.tl-card{display:grid;grid-template-columns:48px 150px minmax(0,1fr);gap:20px;padding:25px 0 28px;border-top:1px solid rgba(0,0,0,.25);position:relative}.tl-index{opacity:.45;padding-top:7px}.tl-date{font-weight:700;padding-top:7px;line-height:1.4}.tl-event{max-width:850px}.tl-event h2{font-size:clamp(26px,3vw,44px);line-height:.95;letter-spacing:-.055em;margin:0 0 12px}.tl-event p{font-size:15px;line-height:1.55;margin:0 0 16px;max-width:720px}.tl-source{display:inline-block;color:inherit;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px;font-weight:700}.tl-poster{opacity:.48;border-bottom-style:dashed}.tl-end{margin-top:70px;padding:48px 0 20px;border-top:3px solid #111}.tl-end>span{font-size:11px;letter-spacing:.16em}.tl-end h2{font-size:clamp(52px,9vw,128px);line-height:.78;letter-spacing:-.075em;margin:22px 0 30px}.tl-end p{font-size:18px;max-width:550px}.tl-end a{display:inline-block;margin-top:12px;color:inherit;text-decoration:none;border:1px solid #111;padding:14px 18px;font-size:11px;letter-spacing:.12em;font-weight:700}@media(max-width:900px){.band-instagram-grid{grid-template-columns:1fr}.band-instagram iframe{height:720px}.band-instagram-head{align-items:start;flex-direction:column}.tl-intro{grid-template-columns:1fr;gap:22px}.tl-card{grid-template-columns:38px 105px minmax(0,1fr);gap:12px}}@media(max-width:620px){.tl-card{grid-template-columns:32px 1fr;gap:8px 12px}.tl-date{grid-column:2}.tl-event{grid-column:2}.tl-event h2{font-size:30px}.tl-year-break{grid-template-columns:70px 1fr}.tl-key{flex-direction:column;gap:8px}.tl-intro strong{font-size:76px}.tl-end h2{font-size:58px}}';
 document.head.appendChild(style);
 const friendsStyle=document.createElement('style');
 friendsStyle.dataset.scope='friends-style-marker';
 friendsStyle.textContent='.friends-intro{display:grid;grid-template-columns:minmax(170px,.48fr) 1.52fr;gap:42px;padding:28px 0 38px;border-top:3px solid #111;border-bottom:1px solid rgba(0,0,0,.2);margin-bottom:14px}.friends-intro>div:first-child{display:flex;flex-direction:column}.friends-intro strong{font-size:clamp(70px,9vw,130px);line-height:.8;letter-spacing:-.08em}.friends-intro span,.friends-note,.friend-number,.friend-context,.friend-links{font-size:10px;letter-spacing:.14em;text-transform:uppercase}.friends-intro p{font-size:clamp(19px,2.25vw,31px);line-height:1.18;letter-spacing:-.03em;max-width:790px;margin:0 0 20px}.friends-note{padding:13px 0 38px;line-height:1.55;max-width:880px;opacity:.58}.friends-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 24px;border-bottom:1px solid rgba(0,0,0,.22)}.friend-card{min-height:240px;padding:22px 0 26px;border-top:1px solid rgba(0,0,0,.25);display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px}.friend-number{opacity:.42;padding-top:5px}.friend-body{display:flex;flex-direction:column;min-width:0}.friend-card h2{font-size:clamp(25px,2.45vw,38px);line-height:.96;letter-spacing:-.05em;margin:0 0 15px}.friend-context{line-height:1.45;opacity:.6;margin:0 0 22px}.friend-links{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto}.friend-links a,.friend-links span{display:inline-block;color:inherit;text-decoration:none;border:1px solid rgba(0,0,0,.35);padding:8px 9px;line-height:1}.friend-links a:hover{background:#111;color:#f5f4ef}.friend-links span{border-style:dashed;opacity:.45}@media(max-width:900px){.friends-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.friends-intro{grid-template-columns:1fr;gap:22px}}@media(max-width:620px){.friends-grid{grid-template-columns:1fr}.friend-card{min-height:205px}.friends-intro strong{font-size:78px}}';
 document.head.appendChild(friendsStyle);

 const cleanInstagramUrl=url=>{try{const u=new URL(String(url||'').trim());if(!/(^|\.)instagram\.com$/i.test(u.hostname))return '';const m=u.pathname.match(/^\/(p|reel|tv)\/([^/]+)/i);return m?`https://www.instagram.com/${m[1]}/${m[2]}/`:''}catch{return ''}};
 const instagramSection=()=>{const posts=instagramPosts.map(x=>cleanInstagramUrl(typeof x==='string'?x:x?.url)).filter(Boolean);if(!posts.length)return '';return `<section class="band-instagram"><div class="band-instagram-head"><div><div class="eyebrow">Instagram</div><h2>@beast_band</h2></div><a class="text-link" target="_blank" rel="noreferrer" href="https://www.instagram.com/beast_band/">Follow on Instagram ↗</a></div><div class="band-instagram-grid">${posts.map((url,i)=>`<div class="band-instagram-card"><iframe src="${url}embed/captioned/" title="BEAST Instagram post ${i+1}" loading="lazy" scrolling="no" frameborder="0" allowfullscreen></iframe></div>`).join('')}</div></section>`};
 const addMemberLinks=html=>{Object.entries(memberInstagram).forEach(([name,url])=>{const safe=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp(`(<h2>${safe}<\\/h2>[\\s\\S]*?<p(?: class="bodycopy")?[^>]*>[^<]*<\\/p>)`);html=html.replace(re,`$1<a class="member-instagram" target="_blank" rel="noreferrer" href="${url}">Instagram ↗</a>`)});return html};
 const originalBand=band;
 const bandWithInstagram=()=>{let html=addMemberLinks(originalBand());const section=instagramSection();if(!section)return html;const close='</div></section></main>';const i=html.lastIndexOf(close);if(i>=0)return html.slice(0,i)+section+html.slice(i);const mainClose='</main>';const j=html.lastIndexOf(mainClose);return j>=0?html.slice(0,j)+section+html.slice(j):html+section};
 band=bandWithInstagram;
 if(typeof routes==='object'&&routes)routes['/band']=bandWithInstagram;
 const originalGallery=gallery;
 const galleryWithInstagram=()=>{let html=originalGallery();const section=instagramSection();if(!section)return html;const divider='<div class="instagram-gallery-divider" role="separator" aria-hidden="true"></div>';const marker='<div class="gallery">';const i=html.indexOf(marker);return i>=0?html.slice(0,i)+section+divider+html.slice(i):html+section+divider};
 gallery=galleryWithInstagram;
 if(typeof routes==='object'&&routes)routes['/gallery']=galleryWithInstagram;
 header=()=>{const text=String(siteLogo.logo||'').trim();const image=String(siteLogo.logoUrl||'').trim()||FALLBACK_LOGO;const mark=text?text:`<img src="${image}" alt="BEAST logo">`;return `<header class="header"><div class="wrap header-in"><a class="logo ${text?'':'logo-image'}" href="#/">${mark}</a><button class="menu">Menu</button><nav class="nav">${['Band','Timeline','Albums','Lyrics','Shows','News','Gallery','Friends','Submit','Contact'].map(x=>`<a href="#/${x.toLowerCase()}">${x}</a>`).join('')}</nav></div></header>`};
 footer=()=>`<footer class="footer"><div class="wrap footer-in"><div class="foot-brand"><span>Cape Town, South Africa</span><span>Est. 2012 — Psychological rock and roll</span></div><div class="foot-links">${siteSocials.map(s=>`<a target="_blank" rel="noreferrer" href="${s[2]}">${s[0]}</a>`).join('')}</div></div></footer>`;

 const friendDialogStyle=document.createElement('style');
 friendDialogStyle.textContent='.friend-card{cursor:default}.friend-open{grid-column:1/-1;display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;width:100%;min-width:0;padding:0;border:0;background:transparent;color:inherit;text-align:left;font:inherit;cursor:pointer}.friend-open .friend-body{display:flex;flex-direction:column;min-width:0}.friend-name{display:block;font-size:clamp(25px,2.45vw,38px);font-weight:700;line-height:.96;letter-spacing:-.05em;margin:0 0 15px}.friend-open:hover .friend-name{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}.friend-open:focus-visible{outline:2px solid #111;outline-offset:5px}.friend-open-hint{display:block;margin-top:18px;font-size:10px;letter-spacing:.14em;opacity:.58}.friend-links{grid-column:2;display:flex;flex-wrap:wrap;gap:7px;margin-top:15px}.friends-open-note{display:block;margin-top:15px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.58}.friend-dialog-backdrop{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:clamp(12px,3vw,32px);background:rgba(0,0,0,.76);overflow-y:auto}.friend-dialog{position:relative;width:min(800px,100%);max-height:min(90vh,960px);overflow-y:auto;background:#f5f4ef;color:#111;padding:clamp(26px,5vw,58px);box-shadow:0 18px 80px rgba(0,0,0,.34)}.friend-dialog-close{position:absolute;top:14px;right:14px;width:42px;height:42px;border:1px solid #111;background:transparent;color:#111;font-size:27px;line-height:1;cursor:pointer}.friend-dialog-close:hover{background:#111;color:#f5f4ef}.friend-dialog-eyebrow,.friend-dialog-kicker{font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.6}.friend-dialog h2{font-size:clamp(40px,7vw,76px);font-weight:700;line-height:.88;letter-spacing:-.065em;margin:24px 52px 16px 0}.friend-dialog-context{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.62;line-height:1.5}.friend-dialog-rule{height:1px;background:#777;opacity:.6;margin:26px 0}.friend-dialog-summary{font-size:clamp(17px,2vw,22px);line-height:1.48;max-width:650px;margin:12px 0 0}.friend-dialog-section{margin-top:30px}.friend-dialog-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px;margin-top:12px;border-top:1px solid rgba(0,0,0,.25)}.friend-dialog-fact{padding:13px 0 15px;border-bottom:1px solid rgba(0,0,0,.18);min-width:0}.friend-dialog-fact b{display:block;font-size:9px;font-weight:400;letter-spacing:.15em;text-transform:uppercase;opacity:.55;margin-bottom:7px}.friend-dialog-fact span{display:block;font-size:14px;line-height:1.45;overflow-wrap:anywhere}.friend-dialog-works{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.friend-dialog-works span{border:1px solid rgba(0,0,0,.25);padding:8px 10px;font-size:11px;line-height:1.25}.friend-career-timeline{position:relative;margin:18px 0 0 4px;padding:0 0 0 25px;border-left:1px solid rgba(0,0,0,.28)}.friend-timeline-item{position:relative;padding:0 0 25px 0}.friend-timeline-item:last-child{padding-bottom:0}.friend-timeline-item:before{content:\"\";position:absolute;width:7px;height:7px;border-radius:50%;background:#111;left:-29px;top:4px}.friend-timeline-year{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.6;margin-bottom:6px}.friend-timeline-item h3{font-size:19px;letter-spacing:-.025em;line-height:1.1;margin:0 0 7px}.friend-timeline-item p{font-size:14px;line-height:1.5;margin:0;max-width:650px}.friend-timeline-source{display:inline-block;margin-top:9px;color:inherit;font-size:9px;letter-spacing:.12em;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}.friend-timeline-source:hover{opacity:.6}.friend-dialog-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:12px}.friend-dialog-links a{display:inline-block;color:inherit;text-decoration:none;border:1px solid rgba(0,0,0,.32);padding:10px 12px;font-size:10px;letter-spacing:.1em;text-transform:uppercase}.friend-dialog-links a:hover{background:#111;color:#f5f4ef}.friend-dialog-source-note{font-size:13px;line-height:1.5;opacity:.65;margin:10px 0 0}.friend-dialog:focus{outline:none}@media(max-width:620px){.friend-dialog-backdrop{padding:0;place-items:stretch}.friend-dialog{width:100%;max-height:100dvh;min-height:100dvh;padding:72px 24px 34px}.friend-dialog-facts{grid-template-columns:1fr}.friend-open-hint{margin-top:14px}.friend-card{min-height:0}}';
 document.head.appendChild(friendDialogStyle);
 const friendHtml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const friendHref=value=>/^https:\/\//i.test(String(value||''))?String(value):'';
 const friendAnchor=(label,url)=>{const href=friendHref(url);return href?'<a href="'+friendHtml(href)+'" target="_blank" rel="noopener noreferrer">'+friendHtml(label)+'</a>':''};
 const openFriendProfile=index=>{
  const person=Array.isArray(friends)?friends[Number(index)]:null;
  if(!person)return;
  const previousFocus=document.activeElement;
  const previousOverflow=document.body.style.overflow;
  const facts=person.profileDetails||{};
  const detailRows=[
   ['ORIGIN',facts.origin],
   ['SOUND',facts.sound],
   ['ACTIVE PERIOD',facts.activePeriod],
   ['KEY PEOPLE',facts.keyPeople]
  ].filter(row=>String(row[1]||'').trim());
  const factMarkup=detailRows.map(([label,value])=>'<div class="friend-dialog-fact"><b>'+friendHtml(label)+'</b><span>'+friendHtml(value)+'</span></div>').join('');
  const works=Array.isArray(facts.notableWorks)?facts.notableWorks:[];
  const workMarkup=works.map(value=>'<span>'+friendHtml(value)+'</span>').join('');
  const timeline=Array.isArray(person.artistTimeline)?person.artistTimeline:[];
  const timelineMarkup=timeline.map(item=>{
   const source=friendAnchor('SOURCE ↗',item.sourceUrl);
   return '<article class="friend-timeline-item"><div class="friend-timeline-year">'+friendHtml(item.year||'')+'</div><h3>'+friendHtml(item.title||'Career milestone')+'</h3><p>'+friendHtml(item.detail||'')+'</p>'+(source?'<a class="friend-timeline-source" href="'+friendHtml(friendHref(item.sourceUrl))+'" target="_blank" rel="noopener noreferrer">RESEARCH SOURCE ↗</a>':'')+'</article>';
  }).join('');
  const social=[friendAnchor('INSTAGRAM ↗',person.instagram),friendAnchor('FACEBOOK ↗',person.facebook),friendAnchor('YOUTUBE ↗',person.youtube)].filter(Boolean).join('');
  const sources=(Array.isArray(person.careerSources)?person.careerSources:[]).map(item=>friendAnchor(item.label||'CAREER SOURCE ↗',item.url)).filter(Boolean).join('');
  const archive=friendAnchor('BEAST GIG / TIMELINE SOURCE ↗',person.source);
  const overlay=document.createElement('div');
  overlay.className='friend-dialog-backdrop';
  overlay.innerHTML='<section class="friend-dialog" role="dialog" aria-modal="true" aria-labelledby="friend-dialog-title" tabindex="-1"><button class="friend-dialog-close" type="button" aria-label="Close artist profile">×</button><div class="friend-dialog-eyebrow">BEAST / FRIENDS OF BEAST</div><h2 id="friend-dialog-title">'+friendHtml(person.name||'Artist profile')+'</h2><p class="friend-dialog-context">'+friendHtml(person.context||'')+'</p><div class="friend-dialog-rule"></div><div class="friend-dialog-kicker">CAREER SNAPSHOT</div><p class="friend-dialog-summary">'+friendHtml(person.careerSummary||'A detailed career summary is not yet available for this artist. The links below provide the verified material currently available.')+'</p>'+(factMarkup?'<div class="friend-dialog-section"><div class="friend-dialog-kicker">ARTIST DETAILS</div><div class="friend-dialog-facts">'+factMarkup+'</div></div>':'')+(workMarkup?'<div class="friend-dialog-section"><div class="friend-dialog-kicker">NOTABLE RELEASES & WORK</div><div class="friend-dialog-works">'+workMarkup+'</div></div>':'')+(timelineMarkup?'<div class="friend-dialog-section"><div class="friend-dialog-kicker">CAREER TIMELINE</div><div class="friend-career-timeline">'+timelineMarkup+'</div></div>':'')+(social?'<div class="friend-dialog-section"><div class="friend-dialog-kicker">ARTIST LINKS</div><div class="friend-dialog-links">'+social+'</div></div>':'')+((sources||archive)?'<div class="friend-dialog-section"><div class="friend-dialog-kicker">RESEARCH & REFERENCES</div><div class="friend-dialog-links">'+sources+archive+'</div><p class="friend-dialog-source-note">Career notes are compiled from linked artist profiles, music catalogues, interviews and published coverage. Some early local acts have limited surviving public documentation; where records are incomplete, the timeline identifies only the milestones that could be checked.</p></div>':'')+'</section>';
  const dialog=overlay.querySelector('.friend-dialog');
  const closeButton=overlay.querySelector('.friend-dialog-close');
  const close=()=>{
   document.removeEventListener('keydown',onKeydown);
   overlay.remove();
   document.body.style.overflow=previousOverflow;
   if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();
  };
  const onKeydown=event=>{
   if(event.key==='Escape'){event.preventDefault();close();return;}
   if(event.key==='Tab'){
    const focusable=Array.from(dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'));
    if(!focusable.length){event.preventDefault();dialog.focus();return;}
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   }
  };
  closeButton.addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  document.addEventListener('keydown',onKeydown);
  document.body.appendChild(overlay);
  document.body.style.overflow='hidden';
  closeButton.focus();
 };

 document.addEventListener('click',event=>{
  const trigger=event.target.closest('.friend-open');
  if(!trigger)return;
  openFriendProfile(trigger.dataset.friendIndex);
 });

 render();
 fetch('/api/content?ts='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(c=>{
  if(c?.site){const hasLogoUrl=Object.prototype.hasOwnProperty.call(c.site,'logoUrl');const legacyText=String(c.site.logo||'').trim();siteLogo.logo=(!hasLogoUrl&&legacyText.toLowerCase()==='beast')?'':legacyText;siteLogo.logoUrl=c.site.logoUrl||FALLBACK_LOGO;}
  if(Array.isArray(c?.socials)){siteSocials=c.socials.filter(s=>String(s?.name||'').toLowerCase()!=='bandcamp').filter(s=>String(s?.url||'').trim()).map(s=>fixSocial([String(s.name||'').trim(),String(s.handle||'').trim(),String(s.url||'').trim()]));}
  if(Array.isArray(c?.band?.instagramPosts))instagramPosts=c.band.instagramPosts;
  if(Array.isArray(c?.friends)&&typeof friends!=='undefined'){friends.splice(0,friends.length,...c.friends);}
  render();
 }).catch(()=>{});
})();
