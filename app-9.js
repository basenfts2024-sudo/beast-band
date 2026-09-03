
(()=>{
 const FALLBACK_LOGO='https://desperate-orange-anteater.myfilebase.com/ipfs/QmWA4yRYu1fJAgB8aNNnWvEL8QrT4ndyQ5UDFxtt1Ycmm8';
 let siteLogo={logo:'',logoUrl:FALLBACK_LOGO};
 let instagramPosts=[];
 const fixSocial=s=>{const name=String(s?.[0]||'').trim(),handle=String(s?.[1]||'').trim(),url=String(s?.[2]||'').trim();if(name.toLowerCase()==='instagram'&&/instagram\.com\/(beastbandsa|beast_band)\/?$/i.test(url))return ['Instagram','@beast_band','https://www.instagram.com/beast_band/'];return [name,handle,url]};
 let siteSocials=socials.filter(s=>String(s[0]||'').toLowerCase()!=='bandcamp').map(fixSocial);
 const style=document.createElement('style');
 style.textContent='.logo.logo-image{display:flex;align-items:center;letter-spacing:0;text-transform:none}.logo.logo-image img{display:block;width:auto;height:clamp(24px,2.15vw,31px);max-width:min(190px,32vw);object-fit:contain}.foot-brand{flex-direction:column;align-items:flex-start;gap:6px;flex-wrap:nowrap;text-align:left}.home-hero .home-title,.home-hero .hero-title{display:none!important}.band-instagram{margin-top:70px;padding-top:28px;border-top:1px solid rgba(0,0,0,.18)}.band-instagram-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:28px}.band-instagram-head h2{font-size:clamp(32px,4vw,58px);letter-spacing:-.05em;margin:4px 0 0}.band-instagram-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start}.band-instagram iframe{width:100%;min-height:560px;border:0;background:#fff}.band-instagram-empty{padding:30px 0;border-top:1px solid rgba(0,0,0,.12)}@media(max-width:900px){.band-instagram-grid{grid-template-columns:1fr}.band-instagram iframe{min-height:620px}.band-instagram-head{align-items:start;flex-direction:column}}';
 document.head.appendChild(style);
 const cleanInstagramUrl=url=>{try{const u=new URL(String(url||'').trim());if(!/(^|\.)instagram\.com$/i.test(u.hostname))return '';const m=u.pathname.match(/^\/(p|reel|tv)\/([^/]+)/i);return m?`https://www.instagram.com/${m[1]}/${m[2]}/`:''}catch{return ''}};
 const instagramSection=()=>{const posts=instagramPosts.map(x=>cleanInstagramUrl(typeof x==='string'?x:x?.url)).filter(Boolean);if(!posts.length)return '';return `<section class="band-instagram"><div class="band-instagram-head"><div><div class="eyebrow">Instagram</div><h2>@beast_band</h2></div><a class="text-link" target="_blank" rel="noreferrer" href="https://www.instagram.com/beast_band/">Follow on Instagram ↗</a></div><div class="band-instagram-grid">${posts.map(url=>`<iframe src="${url}embed/" title="BEAST Instagram post" loading="lazy" scrolling="no" allowtransparency="true"></iframe>`).join('')}</div></section>`};
 const originalBand=band;
 band=()=>{let html=originalBand();const section=instagramSection();if(!section)return html;const marker='</div></section></main>';const i=html.lastIndexOf(marker);return i>=0?html.slice(0,i)+section+html.slice(i):html+section};
 header=()=>{const text=String(siteLogo.logo||'').trim();const image=String(siteLogo.logoUrl||'').trim()||FALLBACK_LOGO;const mark=text?text:`<img src="${image}" alt="BEAST logo">`;return `<header class="header"><div class="wrap header-in"><a class="logo ${text?'':'logo-image'}" href="#/">${mark}</a><button class="menu">Menu</button><nav class="nav">${['Band','Timeline','Albums','Lyrics','Shows','News','Gallery','Submit','Contact'].map(x=>`<a href="#/${x.toLowerCase()}">${x}</a>`).join('')}</nav></div></header>`};
 footer=()=>`<footer class="footer"><div class="wrap footer-in"><div class="foot-brand"><span>Cape Town, South Africa</span><span>Est. 2012 — Psychological rock and roll</span><a href="https://beast-band.vercel.app/#/admin">Band login</a></div><div class="foot-links">${siteSocials.map(s=>`<a target="_blank" rel="noreferrer" href="${s[2]}">${s[0]}</a>`).join('')}</div></div></footer>`;
 render();
 fetch('/api/content?ts='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(c=>{
  if(c?.site){const hasLogoUrl=Object.prototype.hasOwnProperty.call(c.site,'logoUrl');const legacyText=String(c.site.logo||'').trim();siteLogo.logo=(!hasLogoUrl&&legacyText.toLowerCase()==='beast')?'':legacyText;siteLogo.logoUrl=c.site.logoUrl||FALLBACK_LOGO;}
  if(Array.isArray(c?.socials)){siteSocials=c.socials.filter(s=>String(s?.name||'').toLowerCase()!=='bandcamp').filter(s=>String(s?.url||'').trim()).map(s=>fixSocial([String(s.name||'').trim(),String(s.handle||'').trim(),String(s.url||'').trim()]));}
  if(Array.isArray(c?.band?.instagramPosts))instagramPosts=c.band.instagramPosts;
  render();
 }).catch(()=>{});
})();
