
(()=>{
 const FALLBACK_LOGO='https://desperate-orange-anteater.myfilebase.com/ipfs/QmWA4yRYu1fJAgB8aNNnWvEL8QrT4ndyQ5UDFxtt1Ycmm8';
 let siteLogo={logo:'',logoUrl:FALLBACK_LOGO};
 const fixSocial=s=>{const name=String(s?.[0]||'').trim(),handle=String(s?.[1]||'').trim(),url=String(s?.[2]||'').trim();if(name.toLowerCase()==='instagram'&&/instagram\.com\/(beastbandsa|beast_band)\/?$/i.test(url))return ['Instagram','@beast_band','https://www.instagram.com/beast_band/'];return [name,handle,url]};
 let siteSocials=socials.filter(s=>String(s[0]||'').toLowerCase()!=='bandcamp').map(fixSocial);
 const style=document.createElement('style');
 style.textContent='.logo.logo-image{display:flex;align-items:center;letter-spacing:0;text-transform:none}.logo.logo-image img{display:block;width:auto;height:clamp(24px,2.15vw,31px);max-width:min(190px,32vw);object-fit:contain}.foot-brand{flex-direction:column;align-items:flex-start;gap:6px;flex-wrap:nowrap;text-align:left}.home-hero .home-title,.home-hero .hero-title{display:none!important}';
 document.head.appendChild(style);
 header=()=>{const text=String(siteLogo.logo||'').trim();const image=String(siteLogo.logoUrl||'').trim()||FALLBACK_LOGO;const mark=text?text:`<img src="${image}" alt="BEAST logo">`;return `<header class="header"><div class="wrap header-in"><a class="logo ${text?'':'logo-image'}" href="#/">${mark}</a><button class="menu">Menu</button><nav class="nav">${['Band','Timeline','Albums','Lyrics','Shows','News','Gallery','Submit','Contact'].map(x=>`<a href="#/${x.toLowerCase()}">${x}</a>`).join('')}</nav></div></header>`};
 footer=()=>`<footer class="footer"><div class="wrap footer-in"><div class="foot-brand"><span>Cape Town, South Africa</span><span>Est. 2012 — Psychological rock and roll</span><a href="https://beast-band.vercel.app/#/admin">Band login</a></div><div class="foot-links">${siteSocials.map(s=>`<a target="_blank" rel="noreferrer" href="${s[2]}">${s[0]}</a>`).join('')}</div></div></footer>`;
 render();
 fetch('/api/content?ts='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(c=>{
  if(c?.site){const hasLogoUrl=Object.prototype.hasOwnProperty.call(c.site,'logoUrl');const legacyText=String(c.site.logo||'').trim();siteLogo.logo=(!hasLogoUrl&&legacyText.toLowerCase()==='beast')?'':legacyText;siteLogo.logoUrl=c.site.logoUrl||FALLBACK_LOGO;}
  if(Array.isArray(c?.socials)){siteSocials=c.socials.filter(s=>String(s?.name||'').toLowerCase()!=='bandcamp').filter(s=>String(s?.url||'').trim()).map(s=>fixSocial([String(s.name||'').trim(),String(s.handle||'').trim(),String(s.url||'').trim()]));}
  render();
 }).catch(()=>{});
})();
