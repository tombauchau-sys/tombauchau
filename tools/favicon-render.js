// Rend les PNG du favicon à partir de favicon.svg et tools/icon-full.svg (Chromium via Playwright).
// Usage : NODE_PATH=$(npm root -g) node tools/favicon-render.js
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const jobs=[['favicon.svg',[16,32,48],'tools/ico-'],['favicon.svg',[96,192,512],'icon-'],['tools/icon-full.svg',[180],'apple-touch-icon-']];
for(const [src,sizes,pre] of jobs){const svg=fs.readFileSync(path.join(R,src),'utf8');
 for(const s of sizes){await p.setViewportSize({width:s,height:s});
  await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ',`<svg width="${s}" height="${s}" `)}</body></html>`);
  await p.screenshot({path:path.join(R,`${pre}${s}.png`),omitBackground:true,clip:{x:0,y:0,width:s,height:s}});}}
await b.close()})();
