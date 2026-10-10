import fs from 'fs';
import {feature} from 'topojson-client';
import {geoAzimuthalEqualArea, geoPath, geoBounds, geoArea, geoCentroid} from 'd3-geo';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));
const all = feature(topo, topo.objects.countries).features;
const EU = {'040':'AT','056':'BE','100':'BG','191':'HR','196':'CY','203':'CZ','208':'DK','233':'EE','246':'FI','250':'FR','276':'DE','300':'GR','348':'HU','372':'IE','380':'IT','428':'LV','440':'LT','442':'LU','470':'MT','528':'NL','616':'PL','620':'PT','642':'RO','703':'SK','705':'SI','724':'ES','752':'SE'};
const box = {lon:[-12,36], lat:[33.5,71.5]};
function inBox(poly){ // poly: array of rings; test centroid of outer ring
  const r=poly[0]; let x=0,y=0; for(const p of r){x+=p[0];y+=p[1]} x/=r.length;y/=r.length;
  return x>=box.lon[0]&&x<=box.lon[1]&&y>=box.lat[0]&&y<=box.lat[1];
}
function clip(f){
  const g=f.geometry; if(!g) return null;
  if(g.type==='Polygon') return inBox(g.coordinates)?f:null;
  const polys=g.coordinates.filter(inBox);
  if(!polys.length) return null;
  return {...f, geometry:{type:'MultiPolygon',coordinates:polys}};
}
const feats = all.map(clip).filter(Boolean);
const W=760,H=800;
const proj = geoAzimuthalEqualArea().rotate([-10,-52]);
const frame = {type:'Feature',geometry:{type:'MultiPoint',coordinates:[[-10,35],[30,35],[-10,70],[32,70],[34,35],[26,71]]}};
proj.fitExtent([[10,10],[W-10,H-10]], {type:'FeatureCollection',features:feats.filter(f=>EU[f.id])});
const path = geoPath(proj).digits(1);
const out={W,H,eu:[],other:[]};
for(const f of feats){
  const d=path(f); if(!d) continue;
  const b=path.bounds(f);
  if(b[1][0]<-50||b[0][0]>W+50||b[1][1]<-50||b[0][1]>H+50) continue;
  if(EU[f.id]){
    const c=path.centroid(f);
    out.eu.push({code:EU[f.id],d,cx:+c[0].toFixed(1),cy:+c[1].toFixed(1),bb:b.map(p=>p.map(v=>+v.toFixed(1)))});
  } else out.other.push(d);
}
fs.writeFileSync('map.json',JSON.stringify(out));
console.log('eu',out.eu.length,'other',out.other.length,'bytes',JSON.stringify(out).length);
console.log(out.eu.map(e=>e.code).sort().join(' '));
