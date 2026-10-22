// Génère les images de partage (1200×630) : node tools/og.js <dossier des polices fontsource>
// Polices : @fontsource/instrument-serif et @fontsource/instrument-sans (npm).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FONTS=process.argv[2];const R=path.resolve(__dirname,'..');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const items=[['accueil','Chiffres vérifiés sur la Belgique et l’Europe','Dette, emploi, pauvreté, climat, logement : avec leurs sources, leurs définitions et leurs limites.']];
for(const f of fs.readdirSync(R).filter(f=>/^dossier-.*\.html$/.test(f))){
  const h=fs.readFileSync(path.join(R,f),'utf8');
  const q=(h.match(/<h1 class="q"[^>]*>([^<]*)/)||[])[1];const k=(h.match(/<span class="kick">([^<]*)/)||[])[1].replace(/ · avant de lire/,'');
  items.push([f.slice(8,-5),k,q]);}
const ff=(fam,file,style)=>`@font-face{font-family:'${fam}';font-style:${style};font-weight:400 700;src:url(data:font/woff2;base64,${fs.readFileSync(FONTS+'/'+file).toString('base64')}) format('woff2')}`;
const css=ff('IS','instrument-serif/files/instrument-serif-latin-400-normal.woff2','normal')+ff('IS','instrument-serif/files/instrument-serif-latin-400-italic.woff2','italic')+ff('ISa','instrument-sans/files/instrument-sans-latin-400-normal.woff2','normal')+
`*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#1E1914;color:#EDE6DC;font-family:ISa,sans-serif;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.k{font-size:26px;letter-spacing:.08em;text-transform:uppercase;color:#C9773A}.t{font-family:IS,serif;font-size:66px;line-height:1.02;letter-spacing:-.01em;max-width:1000px}.t.s{font-size:56px}.foot{display:flex;justify-content:space-between;align-items:flex-end}
.logo{font-family:IS,serif;font-size:54px}.logo i{font-style:normal;color:#F09A3E}.u{font-size:24px;color:#A69C8F}.d{font-size:30px;color:#D8CFC3;max-width:900px;line-height:1.3}
.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:#C9773A}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630}});
for(const [slug,kick,q] of items){
  const big=slug==='accueil';
  const body=`<div class="bar"></div><div><p class="k">${esc(big?'Au plus Juste':kick)}</p></div><div><p class="t${q.length>95?' s':''}">${esc(big?kick:q)}</p>${big?`<p class="d" style="margin-top:22px">${esc(q)}</p>`:''}</div><div class="foot"><p class="logo">Au plus J<i>?</i>ste</p><p class="u">auplusjuste.be</p></div>`;
  await p.setContent(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`);
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
  await p.screenshot({path:path.join(R,'og',slug+'.png')});console.log('og/'+slug+'.png');}
await b.close()})();
