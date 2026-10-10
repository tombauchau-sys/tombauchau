import fs from 'fs';
import {feature, mesh} from 'topojson-client';
import {geoNaturalEarth1, geoPath, geoGraticule10} from 'd3-geo';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json'));
const feats = feature(topo, topo.objects.countries).features.filter(f=>f.id!=='010');
const EU = new Set(['040','056','100','191','196','203','208','233','246','250','276','300','348','372','380','428','440','442','470','528','616','620','642','703','705','724','752']);
const W=1000,H=520;
const proj = geoNaturalEarth1().rotate([-10,0]);
proj.fitExtent([[6,6],[W-6,H-6]], {type:'FeatureCollection',features:feats});
const path = geoPath(proj).digits(1);
const out={W,H,land:[],eu:[],be:'',sphere:path({type:'Sphere'}),grat:path(geoGraticule10()),bx:0,by:0};
for(const f of feats){const d=path(f); if(!d) continue;
  if(f.id==='056'){out.be=d; const c=path.centroid(f); out.bx=+c[0].toFixed(1); out.by=+c[1].toFixed(1);}
  else if(EU.has(f.id)) out.eu.push(d); else out.land.push(d);}
fs.writeFileSync('world.json', JSON.stringify(out));
console.log(JSON.stringify(out).length, out.bx, out.by, out.eu.length);
