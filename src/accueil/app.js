  /* ======================= Données ======================= */
  var C=DATA.c,T=DATA.trade,EU='EU27_2020';
  /* IPCH, moyenne annuelle, 2025 = 100, 2015-2024 (Eurostat prc_hicp_ainr, TOTAL, INX_A_AVG, lu le 12/10/2026) : sert à convertir en euros de 2024 */
  /* Dépenses publiques totales 2025, % du PIB (Eurostat gov_10a_main, S13, TE ; lu le 12/10/2026 ; BE et NL provisoires) : la ventilation par fonction (COFOG) s'arrête à 2024 */
  var TE25={"EU27_2020":49.5,"BE":54.2,"BG":41.7,"CZ":43.2,"DK":48.1,"DE":50.5,"EE":45.4,"IE":21.0,"EL":48.3,"ES":45.3,"FR":57.2,"HR":50.1,"IT":51.2,"CY":40.2,"LV":46.1,"LT":41.2,"LU":49.1,"HU":47.3,"MT":37.0,"NL":44.9,"AT":55.2,"PL":50.9,"PT":42.7,"RO":43.3,"SI":49.6,"SK":47.9,"FI":57.7,"SE":49.9};
  var IPCH={"EU27_2020":[75.27,75.4,76.58,77.95,79.06,79.6,81.91,89.43,95.12,97.6],"BE":[73.81,75.11,76.78,78.55,79.54,79.88,82.45,90.97,93.05,97.06],"BG":[70.18,69.25,70.07,71.92,73.68,74.58,76.7,86.68,94.14,96.58],"CZ":[64.35,64.77,66.37,67.65,69.39,71.67,74.05,85.0,95.19,97.75],"DK":[82.42,82.44,83.32,83.9,84.51,84.8,86.43,93.82,96.97,98.19],"DE":[75.81,76.07,77.38,78.86,79.95,80.24,82.81,89.99,95.41,97.79],"EE":[61.51,62.0,64.27,66.46,67.97,67.54,70.57,84.29,91.97,95.41],"IE":[82.07,81.89,82.1,82.71,83.43,83.04,85.05,91.92,96.69,97.98],"EL":[81.46,81.48,82.4,83.04,83.47,82.42,82.89,90.6,94.37,97.19],"ES":[78.96,78.7,80.3,81.69,82.33,82.05,84.52,91.55,94.66,97.38],"FR":[80.37,80.61,81.55,83.26,84.34,84.78,86.54,91.65,96.84,99.08],"HR":[72.56,72.1,73.04,74.18,74.77,74.78,76.78,84.97,92.1,95.8],"IT":[80.5,80.4,81.5,82.5,83.0,82.9,84.5,91.9,97.3,98.4],"CY":[84.7,83.67,84.23,84.9,85.37,84.42,86.33,93.32,96.99,99.18],"LV":[66.29,66.36,68.28,70.02,71.95,72.0,74.34,87.15,95.05,96.33],"LT":[64.11,64.54,66.94,68.64,70.18,70.92,74.2,88.19,95.86,96.67],"LU":[78.17,78.2,79.85,81.46,82.8,82.8,85.68,92.67,95.38,97.53],"HU":[57.49,57.74,59.12,60.84,62.92,65.05,68.43,78.88,92.32,95.75],"MT":[79.43,80.15,81.16,82.57,83.83,84.49,85.08,90.3,95.32,97.65],"NL":[73.61,73.68,74.64,75.83,77.86,78.73,80.95,90.37,94.07,97.1],"AT":[71.94,72.64,74.26,75.83,76.96,78.03,80.18,87.09,93.81,96.55],"PL":[65.07,64.95,66.0,66.77,68.21,70.69,74.39,84.21,93.34,96.76],"PT":[80.11,80.62,81.87,82.83,83.07,82.97,83.76,90.54,95.31,97.85],"RO":[62.48,61.81,62.48,65.03,67.57,69.14,71.98,80.63,88.49,93.66],"SI":[76.31,76.19,77.38,78.88,80.21,79.99,81.63,89.24,95.68,97.58],"SK":[67.01,66.69,67.61,69.33,71.25,72.68,74.73,83.8,93.0,95.93],"FI":[81.96,82.28,82.97,83.94,84.89,85.22,86.98,93.22,97.26,98.21],"SE":[75.56,76.42,77.84,79.43,80.79,81.32,83.48,90.21,95.54,97.45]};
  var M2D=function(m){return m==='GR'?'EL':m},D2M=function(d){return d==='EL'?'GR':d};
  var MOB=innerWidth<700;
  var MINUS='−';
  var CONSULT='consulté le 10 octobre 2026';
  function esl(code,url){var p=String(code).split('|');code=p[0];url=url||p[1];var u=url||(/^DS-/.test(code)?'https://ec.europa.eu/eurostat/web/international-trade-in-goods/database':'https://ec.europa.eu/eurostat/databrowser/view/'+code+'/default/table?lang=fr');return '<a href="'+u+'" target="_blank" rel="noopener">'+code+'</a>'}
  function srcs(codes,extra){return 'Source : Eurostat, '+codes.map(esl).join(', ')+(extra?' ; '+extra:'')+' · '+CONSULT+'.'}
  function linkify(t,url){var n=0;return t.replace(/\b(DS-045409|[a-z]{2,5}_[a-z0-9]+(?:_[a-z0-9]+)*|tec\d{5}|tps\d{5}|tipsbp\d+|teina\d{3}|tet\d{5}|tessi\d{3}|tespm\d{3}|tesem\d{3})\b/g,function(m){return esl(m,(n++===0)?url:null)})}
  /* Vues Eurostat filtrées (signets créés et vérifiés le 16/10/2026) : le lien ouvre directement l’indicateur cité */
  var BK={"interest": "https://ec.europa.eu/eurostat/databrowser/bookmark/145d7c26-236f-4d36-b0f8-dff09f5324c3?lang=fr", "gf10": "https://ec.europa.eu/eurostat/databrowser/bookmark/7352237d-fe8c-4dbc-8fac-7a732e1fff77?lang=fr", "gf07": "https://ec.europa.eu/eurostat/databrowser/bookmark/840374ec-685a-4974-a90c-e74d6f6da21e?lang=fr", "gf09": "https://ec.europa.eu/eurostat/databrowser/bookmark/272aca4e-ca91-4b5d-8046-defd67c9f508?lang=fr", "gf02": "https://ec.europa.eu/eurostat/databrowser/bookmark/f00dab29-021e-4af0-922b-32544ebd915e?lang=fr", "gf04": "https://ec.europa.eu/eurostat/databrowser/bookmark/6280c3e0-2682-476a-8190-0daa16ce9ead?lang=fr", "gf05": "https://ec.europa.eu/eurostat/databrowser/bookmark/4618d60f-68ba-4975-b4e5-29185a45fa56?lang=fr", "edu_tot": "https://ec.europa.eu/eurostat/databrowser/bookmark/b959f48e-ec76-405e-8d4d-7ff8bd3a2f5c?lang=fr", "netmig": "https://ec.europa.eu/eurostat/databrowser/bookmark/e54aab50-f0fc-4ffe-b44f-05126ba3bcac?lang=fr", "medage": "https://ec.europa.eu/eurostat/databrowser/bookmark/f82df853-74ac-4c9f-a354-249ab950e0cb?lang=fr"};
  /* Entrées du lexique liées à chaque classement */
  var LXA={debt:[['dette-publique','dette publique'],['criteres-de-convergence','critères de Maastricht (60 % et 3 %)']],debtpc:[['dette-publique','dette publique']],deficit:[['deficit-public','déficit public'],['criteres-de-convergence','critères de Maastricht (60 % et 3 %)'],['procedure-pour-deficit-excessif','procédure pour déficit excessif']],interest:[['charge-d-interets','charge d’intérêts']],spend:[['depenses-publiques','dépenses publiques'],['cofog','COFOG']],revenue:[['recettes-publiques','recettes publiques']],gf10:[['cofog','COFOG']],gf07:[['cofog','COFOG']],gf09:[['cofog','COFOG']],gf02:[['cofog','COFOG']],gf04:[['cofog','COFOG']],gf05:[['cofog','COFOG']],edu_pib:[['cofog','COFOG']],edu_tot:[['cofog','COFOG']],edu_pps:[['standard-de-pouvoir-d-achat','standard de pouvoir d’achat']],gdppps:[['standard-de-pouvoir-d-achat','standard de pouvoir d’achat']],gdphab:[['pib-par-habitant','PIB par habitant'],['euros-courants-et-euros-constants','euros courants et constants']],growth:[['croissance-economique','croissance économique']],inflation:[['inflation','inflation'],['indice-des-prix-a-la-consommation-harmonise','IPCH']],curacc:[['compte-courant','compte courant']],gini:[['coefficient-de-gini','coefficient de Gini']],arope:[['risque-de-pauvrete-ou-d-exclusion-sociale','risque de pauvreté ou d’exclusion sociale']],depriv:[['privation-materielle-et-sociale-severe','privation matérielle et sociale sévère']],emp:[['taux-d-emploi','taux d’emploi']],unemp:[['chomage-au-sens-du-bit','chômage au sens du BIT']],youth:[['chomage-au-sens-du-bit','chômage au sens du BIT']],ltu:[['chomage-de-longue-duree','chômage de longue durée']],minwage:[['salaire-minimum','salaire minimum']],paygap:[['ecart-salarial-entre-femmes-et-hommes','écart salarial']],lifeexp:[['esperance-de-vie','espérance de vie']],hly65:[['annees-de-vie-en-bonne-sante','années de vie en bonne santé']],olddep:[['taux-de-dependance-des-ages','taux de dépendance des âgés']],netmig:[['solde-migratoire-et-solde-naturel','solde migratoire']],tertiary:[['diplomes-du-superieur','diplômés du supérieur']],earlyleave:[['decrochage-scolaire','décrochage scolaire']]};
  function lexLinks(id){var L=LXA[id];if(!L)return '';return '<span class="dl">Lexique : '+L.map(function(l){return '<a href="__LEXIQUE__#t-'+l[0]+'">'+l[1]+'</a>'}).join(' · ')+'</span>'}
  function num(v,dec){return v.toLocaleString('fr-BE',{minimumFractionDigits:dec,maximumFractionDigits:dec})}
  function sgn(v,dec){return (v>0?'+':v<0?MINUS:'')+num(Math.abs(v),dec)}
  function pc(v,dec){return num(v,dec==null?1:dec)+' %'}
  function spc(v){return sgn(v,1)+' %'}
  function eur(v){var a=Math.abs(v);if(a>=1e9)return num(v/1e9,1)+' Md€';if(a>=1e6)return num(Math.round(v/1e6),0)+' M€';return num(Math.round(v),0)+' €'}
  function seur(v){return (v>0?'+':v<0?MINUS:'')+eur(Math.abs(v))}
  function hab(n){return n>=1e6?num(n/1e6,n>=1e7?1:2)+' millions':num(n,0)}
  function S(code,k){return C[code][k]||{}}
  function at(o,y){var v=o[String(y)];return v==null?null:v}
  function last(o){var ys=Object.keys(o).filter(function(y){return o[y]!=null}).map(Number).sort(function(a,b){return a-b});var y=ys[ys.length-1];return [y,o[y]]}
  function popMid(code,y){var p=S(code,'population'),a=at(p,y),b=at(p,y+1);return a&&b?(a+b)/2:(a||b)}
  function gdpHab(code,y){var g=at(S(code,'gdp_meur'),y),p=popMid(code,y);return g&&p?g*1e6/p:null}
  function name(code){return C[code].name}
  var ART={BE:'la',BG:'la',CZ:'la',DK:'le',DE:'l’',EE:'l’',IE:'l’',EL:'la',ES:'l’',FR:'la',HR:'la',IT:'l’',CY:'',LV:'la',LT:'la',LU:'le',HU:'la',MT:'',NL:'les',AT:'l’',PL:'la',PT:'le',RO:'la',SI:'la',SK:'la',FI:'la',SE:'la'};
  function le(c){var a=ART[c];return a?(a==='l’'?a:a+' ')+name(c):name(c)}
  function Le(c){var t=le(c);return t.charAt(0).toUpperCase()+t.slice(1)}
  function au(c){var a=ART[c];return a==='le'?'au '+name(c):a==='les'?'aux '+name(c):'à '+le(c)}
  function du(c){var a=ART[c];return a==='le'?'du '+name(c):a==='les'?'des '+name(c):a===''?'de '+name(c):'de '+le(c)}
  function de(code){var n=name(code);return (/^[AEIOUÉÈ]/.test(n)?'d’':'de ')+n}
  function adj(code){return {BE:'belges',FR:'françaises',DE:'allemandes',NL:'néerlandaises',IT:'italiennes',ES:'espagnoles',PT:'portugaises',LU:'luxembourgeoises',IE:'irlandaises',AT:'autrichiennes',PL:'polonaises',CZ:'tchèques',SK:'slovaques',HU:'hongroises',SI:'slovènes',HR:'croates',RO:'roumaines',BG:'bulgares',EL:'grecques',CY:'chypriotes',MT:'maltaises',DK:'danoises',SE:'suédoises',FI:'finlandaises',EE:'estoniennes',LV:'lettones',LT:'lituaniennes'}[code]}
  var COF=[['GF10','Protection sociale','pensions, chômage, famille, handicap','#EFA3CB'],['GF07','Santé','hôpitaux, soins, médicaments','#7FB6A3'],['GF09','Enseignement','de l’école maternelle à l’université','#9C98F0'],['GF01','Services généraux','administration, intérêts de la dette, aide extérieure','#A69C8F'],['GF04','Affaires économiques','transports, énergie, agriculture, aides aux entreprises','#F2A07B'],['GF03','Ordre et sécurité publics','police, justice, prisons, pompiers','#7E9CC4'],['GF02','Défense','armée, défense civile','#C9773A'],['GF08','Loisirs, culture et cultes','sport, culture, médias publics','#F09A3E'],['GF06','Logement et équipements collectifs','logement, eau, éclairage public','#FFF4E2'],['GF05','Protection de l’environnement','déchets, eaux usées, pollution, biodiversité','#D8D4CC']];
  var Y0=2015,Y1=2024;

  /* ======================= Graphiques ======================= */
  function nice(min,max){var span=max-min||1,step=Math.pow(10,Math.floor(Math.log10(span/4))),f=span/4/step;step*=f<1.5?1:f<3.5?2:f<7.5?5:10;return {lo:Math.floor(min/step)*step,hi:Math.ceil(max/step)*step,step:step}}
  function lineChart(host,o){
    var W=MOB?420:640,Hh=MOB?280:300,L=44,R=W-(MOB?70:84),Tp=16,B=Hh-30,dark=o.dark,fg=dark?'#EDE6DC':'#222',mut=dark?'#A69C8F':'#6A665F',grid=dark?'#3B332B':'#D7D4CC';
    var vals=[];o.series.forEach(function(s){for(var y=o.from;y<=o.to;y++){var v=at(s.d,y);if(v!=null)vals.push(v)}});(o.refs||[]).forEach(function(r){vals.push(r.v)});
    var n=nice(o.min!=null?Math.min(o.min,Math.min.apply(0,vals)):Math.min.apply(0,vals),Math.max.apply(0,vals));
    function X(y){return L+(y-o.from)/(o.to-o.from)*(R-L)}function Y(v){return B-(v-n.lo)/(n.hi-n.lo)*(B-Tp)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.aria});
    for(var v=n.lo;v<=n.hi+1e-9;v+=n.step){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:Math.abs(v)<1e-9?mut:grid,'stroke-width':1}));s.appendChild(el('text',{x:L-8,y:Y(v)+4,'text-anchor':'end',style:'font-family:var(--sans);font-size:12px;fill:'+mut},num(v,n.step<1?1:0)))}
    var ys=[o.from,Math.round((o.from+o.to)/2),o.to];ys.forEach(function(y,i){s.appendChild(el('text',{x:X(y),y:Hh-8,'text-anchor':i===0?'start':i===2?'end':'middle',style:'font-family:var(--sans);font-size:12px;fill:'+mut},y))});
    (o.refs||[]).forEach(function(r){s.appendChild(el('line',{x1:L,x2:R,y1:Y(r.v),y2:Y(r.v),stroke:fg,'stroke-width':1.4,'stroke-dasharray':'2 5',opacity:.8}));s.appendChild(el('text',{x:L+6,y:Y(r.v)-7,'class':'fadein',style:'font-family:var(--main);font-weight:600;font-size:21px;fill:'+fg},r.label))});
    var ends=[];
    o.series.forEach(function(sr){
      var d='',pen=false,lastp=null;for(var y=o.from;y<=o.to;y++){var v=at(sr.d,y);if(v==null){pen=false;continue}d+=(pen?'L':'M')+X(y).toFixed(1)+' '+Y(v).toFixed(1);pen=true;lastp=[y,v]}
      var p=el('path',{d:d,fill:'none',stroke:sr.color,'stroke-width':sr.w||3,'stroke-linejoin':'round','stroke-linecap':'round','class':sr.dash?'fadein':'drawline'});if(sr.dash)p.setAttribute('stroke-dasharray','6 6');s.appendChild(p);
      if(lastp){s.appendChild(el('circle',{cx:X(lastp[0]),cy:Y(lastp[1]),r:sr.dash?3.5:5,fill:sr.color,'class':'fadein'}));ends.push({y:Y(lastp[1]),t:(o.fmt||pc)(lastp[1]),c:sr.color,n:sr.name})}
    });
    ends.sort(function(a,b){return a.y-b.y});for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<30)ends[i].y=ends[i-1].y+30;
    ends.forEach(function(e){var g=el('g',{'class':'fadein'});g.appendChild(el('text',{x:R+10,y:e.y+2,style:'font-family:var(--sans);font-weight:700;font-size:14px;fill:'+e.c},e.t));g.appendChild(el('text',{x:R+10,y:e.y+17,style:'font-family:var(--sans);font-size:11.5px;fill:'+mut},e.n));s.appendChild(g)});
    host.appendChild(s);s.querySelectorAll('.drawline').forEach(function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()+2))}catch(e){}});
  }
  function barChart(host,o){
    var W=MOB?420:640,Hh=MOB?280:300,L=44,R=W-20,Tp=16,B=Hh-30,dark=o.dark,fg=dark?'#EDE6DC':'#222',mut=dark?'#A69C8F':'#6A665F',grid=dark?'#3B332B':'#D7D4CC';
    var vals=[0,o.ref];for(var y=o.from;y<=o.to;y++){var v=at(o.d,y);if(v!=null)vals.push(v)}
    var n=nice(Math.min.apply(0,vals),Math.max.apply(0,vals));
    var bw=(R-L)/(o.to-o.from+1);function X(y){return L+(y-o.from)*bw}function Y(v){return B-(v-n.lo)/(n.hi-n.lo)*(B-Tp)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.aria});
    for(var v=n.lo;v<=n.hi+1e-9;v+=n.step){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:Math.abs(v)<1e-9?mut:grid}));s.appendChild(el('text',{x:L-8,y:Y(v)+4,'text-anchor':'end',style:'font-family:var(--sans);font-size:12px;fill:'+mut},num(v,0)))}
    for(var y=o.from;y<=o.to;y++){var v=at(o.d,y);if(v==null)continue;var y0=Y(0),y1=Y(v);var r=el('rect',{x:X(y)+bw*.18,y:Math.min(y0,y1),width:bw*.64,height:Math.max(1,Math.abs(y1-y0)),fill:v<0?o.color:o.pos,'class':'grow',style:'transform-origin:'+(X(y)+bw/2)+'px '+y0+'px;transition-delay:'+((y-o.from)*0.05)+'s'});s.appendChild(r);
      if(y===o.to||y===2020){s.appendChild(el('text',{x:X(y)+bw/2,y:v<0?y1+16:y1-6,'text-anchor':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:12.5px;fill:'+fg},sgn(v,1)))}}
    [o.from,o.to].forEach(function(y,i){s.appendChild(el('text',{x:X(y)+bw/2,y:Hh-8,'text-anchor':'middle',style:'font-family:var(--sans);font-size:12px;fill:'+mut},y))});
    s.appendChild(el('line',{x1:L,x2:R,y1:Y(o.ref),y2:Y(o.ref),stroke:fg,'stroke-width':1.4,'stroke-dasharray':'2 5'}));
    s.appendChild(el('text',{x:R-4,y:Y(o.ref)+22,'text-anchor':'end','class':'fadein',style:'font-family:var(--main);font-weight:600;font-size:21px;fill:'+fg},o.refLabel));
    host.appendChild(s);
  }
  function spark(code,k){
    var W=120,Hh=36,a=[],e=[];for(var y=Y0;y<=Y1;y++){a.push(at(C[code].cofog[k],y));e.push(at(C[EU].cofog[k],y))}
    var all=a.concat(e).filter(function(v){return v!=null}),mn=Math.min.apply(0,all),mx=Math.max.apply(0,all),sp=mx-mn||1;
    function P(arr){return arr.map(function(v,i){return v==null?'':(i?'L':'M')+(2+i*(W-4)/(arr.length-1)).toFixed(1)+' '+(Hh-3-(v-mn)/sp*(Hh-6)).toFixed(1)}).join('')}
    return '<svg viewBox="0 0 '+W+' '+Hh+'" aria-hidden="true"><path d="'+P(e)+'" fill="none" stroke="#6A665F" stroke-width="1.5" stroke-dasharray="3 3"/><path d="'+P(a)+'" fill="none" stroke="#C9773A" stroke-width="2.5" stroke-linejoin="round"/></svg>';
  }

  /* ======================= Carte ======================= */
  var svg=D.getElementById('map'),W=MAP.W,Hh=MAP.H,pad=44;
  svg.setAttribute('viewBox',(-pad)+' '+(-pad)+' '+(W+2*pad)+' '+(Hh+2*pad));
  var defs=el('defs',{}),lgd=el('linearGradient',{id:'sky',x1:0,y1:0,x2:0,y2:1});
  lgd.appendChild(el('stop',{offset:'0',style:'stop-color:#F7B54A'}));lgd.appendChild(el('stop',{offset:'1',style:'stop-color:#EE8A3A'}));defs.appendChild(lgd);
  [['arA','#E2402B'],['arB','#1A1A1A']].forEach(function(m){var mk=el('marker',{id:m[0],viewBox:'0 0 10 10',refX:6,refY:5,markerWidth:4,markerHeight:4,orient:'auto-start-reverse'});mk.appendChild(el('path',{d:'M0 0 L10 5 L0 10 Z',fill:m[1]}));defs.appendChild(mk)});
  /* Cadre en nuage rectangulaire (Ponpon Mania) : il englobe toute l'Union, Portugal et Chypre compris */
  var cloud='',cpts=[],cx0=-8,cy0=4,cx1=W+8,cy1=Hh+4,cstep=78,cb=16;
  function cedge(ax,ay,bx,by,nx,ny){var L=Math.hypot(bx-ax,by-ay),n=Math.max(1,Math.round(L/cstep));for(var i=0;i<n;i++){var tm=(i+.5)/n,t1=(i+1)/n;cpts.push([ax+(bx-ax)*tm+nx*cb*2,ay+(by-ay)*tm+ny*cb*2,ax+(bx-ax)*t1,ay+(by-ay)*t1])}}
  cedge(cx0,cy0,cx1,cy0,0,-1);cedge(cx1,cy0,cx1,cy1,1,0);cedge(cx1,cy1,cx0,cy1,0,1);cedge(cx0,cy1,cx0,cy0,-1,0);
  cloud='M'+cx0+' '+cy0+cpts.map(function(p){return ' Q'+p[0].toFixed(1)+' '+p[1].toFixed(1)+' '+p[2].toFixed(1)+' '+p[3].toFixed(1)}).join('')+'Z';
  var clp=el('clipPath',{id:'cloud'});clp.appendChild(el('path',{d:cloud}));defs.appendChild(clp);svg.appendChild(defs);
  svg.appendChild(el('path',{d:cloud,fill:'#1A1A1A',transform:'translate(12 12)'}));
  svg.appendChild(el('path',{d:cloud,fill:'url(#sky)',stroke:'#1A1A1A','stroke-width':3}));
  var root=el('g',{'clip-path':'url(#cloud)'}),gO=el('g',{}),gC=el('g',{}),gT=el('g',{}),gF=el('g',{}),gLb=el('g',{});
  MAP.other.forEach(function(d){gO.appendChild(el('path',{d:d,'class':'o'}))});
  var GRID={SE:[4,0],FI:[5,0],IE:[0,1],DK:[3,1],EE:[5,1],NL:[2,2],DE:[3,2],PL:[4,2],LV:[5,2],BE:[2,3],LU:[3,3],CZ:[4,3],LT:[5,3],FR:[1,4],AT:[3,4],SK:[4,4],PT:[0,5],ES:[1,5],IT:[2,5],SI:[3,5],HU:[4,5],RO:[5,5],HR:[3,6],BG:[5,6],MT:[2,7],GR:[4,7],CY:[6,7]};
  var by={},cell=72,gx=(W-7*cell)/2,gy=(Hh-8*cell)/2;
  var st={mode:'A',a:'BE',b:null,color:null,view:'geo'};
  MAP.eu.forEach(function(c){
    var code=M2D(c.code),p=el('path',{d:c.d,'class':'c',tabindex:0,role:'button','aria-label':name(code)});p.appendChild(el('title',{},name(code)));
    var g=GRID[c.code],t=el('g',{'class':'tile',tabindex:-1,role:'button','aria-label':name(code)});
    t.appendChild(el('rect',{x:-31,y:-31,width:62,height:62,rx:14}));t.appendChild(el('text',{x:0,y:-2,'text-anchor':'middle'},c.code));
    var tv=el('text',{x:0,y:16,'text-anchor':'middle','class':'tv'},'');t.appendChild(tv);t.appendChild(el('title',{},name(code)));
    by[code]={p:p,t:t,tv:tv,cx:c.cx,cy:c.cy,tx:gx+g[0]*cell+cell/2,ty:gy+g[1]*cell+cell/2,gx:g[0],gy:g[1]};
    [p,t].forEach(function(n){n.addEventListener('click',function(){pick(code)});n.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(code)}})});
    gC.appendChild(p);gT.appendChild(t);
  });
  root.appendChild(gO);root.appendChild(gC);root.appendChild(gT);root.appendChild(gF);root.appendChild(gLb);svg.appendChild(root);
  function pos(code){var o=by[code];return st.view==='geo'?[o.cx,o.cy]:[o.tx,o.ty]}

  /* Couleurs de la carte */
  var RAMP=[12,32,52,72,92];
  function rampCol(i){return 'color-mix(in srgb,#2E2A86 '+RAMP[i]+'%,#FFF4E2)'}
  (function(){var pat=el('pattern',{id:'nd',width:8,height:8,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'});pat.appendChild(el('rect',{width:8,height:8,fill:'#ECE7DE'}));pat.appendChild(el('line',{x1:0,y1:0,x2:0,y2:8,stroke:'#A39D93','stroke-width':3}));defs.appendChild(pat)})();
  var chips=D.getElementById('chips');
  function chip(id,lab){var b=D.createElement('button');b.type='button';b.textContent=lab;b.setAttribute('aria-pressed','false');b.dataset.id=id;chips.appendChild(b);return b}
  var colorSel=D.createElement('select');colorSel.id='colorSel';colorSel.setAttribute('aria-label','Colorer la carte selon un indicateur');chips.appendChild(colorSel);
  colorSel.onchange=function(){st.color=this.value||null;paint()};
  var viewBtn=chip('view','Une case par pays');
  viewBtn.onclick=function(){st.view=st.view==='geo'?'tile':'geo';this.setAttribute('aria-pressed',st.view!=='geo');paint();drawFlows()};
  function colorData(){
    var it=RKX[st.color],vals={},list=[],ys={};
    Object.keys(by).forEach(function(k){var r=it.f(k);var v=r?r[1]:null;if(v!=null&&!isNaN(v)){vals[k]=v;list.push(v);ys[r[0]]=1}});
    list.sort(function(a,b){return a-b});
    var q=[1,2,3,4].map(function(i){return list[Math.min(list.length-1,Math.floor(i*list.length/5))]});
    var y=Object.keys(ys).sort();
    return {it:it,vals:vals,q:q,min:list[0],max:list[list.length-1],y:y.length===1?y[0]:y[0]+'-'+y[y.length-1]};
  }
  function qcls(v,q){var i=0;for(var j=0;j<4;j++)if(v>=q[j])i=j+1;return i}
  function vfmt(it,v,c){return it.id==='rating'?(c?(DATA.rt[c].sp||DATA.rt[c].mo).r:''):it.fmt(v)}
  function paint(){
    var cd=st.color&&typeof RKX!=='undefined'&&RKX[st.color]?colorData():null;
    Object.keys(by).forEach(function(k){
      var o=by[k],geo=st.view==='geo',r=o.t.querySelector('rect'),cls=k===st.a?'a':(k===st.b?'b':'');
      o.p.classList.toggle('a',cls==='a');o.p.classList.toggle('b',cls==='b');o.t.classList.toggle('a',cls==='a');o.t.classList.toggle('b',cls==='b');
      var f='',dk=false,lab='';if(cd){if(cd.vals[k]!=null){var ci=qcls(cd.vals[k],cd.q);f=rampCol(ci);dk=ci>=3;lab=vfmt(cd.it,cd.vals[k],k)}else{f='url(#nd)';lab='n.d.'}}
      o.p.style.fill=f;r.style.fill=f;o.tv.textContent=lab;
      o.t.querySelectorAll('text').forEach(function(x){x.style.fill=(dk&&!cls)?'#FFFFFF':''});
      o.p.style.opacity=geo?1:0;o.p.style.pointerEvents=geo?'auto':'none';o.p.setAttribute('tabindex',geo?0:-1);o.t.setAttribute('tabindex',geo?-1:0);
      o.t.style.transitionDelay=geo?'0s':((o.gx+o.gy)*0.04)+'s';
      o.t.style.transform='translate('+(geo?o.cx:o.tx)+'px,'+(geo?o.cy:o.ty)+'px) scale('+(geo?.25:1)+')';o.t.style.opacity=geo?0:1;o.t.style.pointerEvents=geo?'none':'auto';
    });
    D.querySelectorAll('.o').forEach(function(o){o.style.opacity=st.view==='geo'?'':0});
    var lg=D.getElementById('legend');
    if(cd){var it=cd.it,nd=Object.keys(by).length-Object.keys(cd.vals).length;
      lg.innerHTML='<span class="sw">'+RAMP.map(function(p,i){return '<span style="background:'+rampCol(i)+'"></span>'}).join('')+'</span><span><b>'+it.lab+'</b>, '+cd.y+' · '+(it.id==='rating'?'note la plus haute (clair) → la plus basse (foncé)':vfmt(it,cd.min)+' (clair) → '+vfmt(it,cd.max)+' (foncé)')+' · cinq classes de même effectif'+(nd?' · <span class="ndk"></span> donnée non disponible ('+nd+')':'')+'</span><span class="lsrc">'+linkify(it.src)+'</span>'+(it.note?'<span class="lnt">À savoir : '+it.note+'</span>':'')+(DOSL[it.id]?'<span class="lsrc ldl">'+dosLinks(it.id)+'</span>':'')}else lg.innerHTML='';
    gLb.innerHTML='';[st.a,st.b].forEach(function(k,i){if(!k)return;var pp=pos(k),t=el('text',{x:pp[0],y:pp[1]-(st.view==='geo'?18:40),'text-anchor':'middle','class':'maptag'},name(k));gLb.appendChild(t)});
  }
  function drawFlows(){
    gF.innerHTML='';if(st.mode!=='C'||!st.a||!st.b)return;
    var A=pos(st.a),B=pos(st.b),xa=T[st.a][st.b],xb=T[st.b][st.a],mx=115e9;
    [[A,B,xa,'#E2402B','arA',1],[B,A,xb,'#1A1A1A','arB',-1]].forEach(function(f){
      var P=f[0],Q=f[1],dx=Q[0]-P[0],dy=Q[1]-P[1],dd=Math.hypot(dx,dy)||1,nx=-(B[1]-A[1])/dd,ny=(B[0]-A[0])/dd,k=Math.max(st.view==='geo'?95:70,dd*.42)*f[5];
      var ux=dx/dd,uy=dy/dd,sh=Math.min(14,dd*.18),s0=[P[0]+ux*sh,P[1]+uy*sh],s1=[Q[0]-ux*sh,Q[1]-uy*sh];
      var k2=(dd<160?Math.max(170,dd*1.1):Math.abs(k)*1.2)*(k<0?-1:1),sp=dd<160?-Math.abs(k2)*.5:dd*.15,c1=[s0[0]+nx*k2*.75+ux*sp,s0[1]+ny*k2*.75+uy*sp],c2=[s1[0]+nx*k2*.75-ux*sp,s1[1]+ny*k2*.75-uy*sp];
      var w=3+15*Math.sqrt(f[2]/mx),d='M'+s0[0].toFixed(1)+' '+s0[1].toFixed(1)+' C'+c1[0].toFixed(1)+' '+c1[1].toFixed(1)+' '+c2[0].toFixed(1)+' '+c2[1].toFixed(1)+' '+s1[0].toFixed(1)+' '+s1[1].toFixed(1);
      var halo=el('path',{d:d,'class':'flow',stroke:'#fff','stroke-width':w+5,opacity:.85});var p=el('path',{d:d,'class':'flow draw2',stroke:f[3],'stroke-width':w,'marker-end':'url(#'+f[4]+')'});
      gF.appendChild(halo);gF.appendChild(p);try{var L=Math.ceil(p.getTotalLength()+4);p.style.setProperty('--len',L);halo.style.strokeDasharray=L;halo.style.strokeDashoffset=L;halo.style.animation='trace 1.4s var(--ease-io) forwards'}catch(e){}
      var m=[(s0[0]+3*c1[0]+3*c2[0]+s1[0])/8,(s0[1]+3*c1[1]+3*c2[1]+s1[1])/8],sg=k<0?-1:1;
      gF.appendChild(el('text',{x:m[0]+nx*22*sg,y:m[1]+ny*22*sg+6,'text-anchor':'middle','class':'flowlab',style:'fill:'+f[3]},eur(f[2])));
    });
  }

  /* ======================= Bulle ======================= */
  var bul=D.getElementById('bulle'),h1=D.getElementById('atT'),hint=D.getElementById('hint');
  function pop(n){n.classList.remove('pop');void n.offsetWidth;n.classList.add('pop')}
  function bulleA(c){
    var p=last(S(c,'population')),g=gdpHab(c,2025),ge=gdpHab(EU,2025),dt=last(S(c,'debt')),u=last(S(c,'unemp'));
    bul.innerHTML='<div class="head"><h2>'+name(c)+'</h2><span class="tag-s">Fiche pays · Eurostat</span></div>'+
      '<div class="kg">'+
      '<div><span class="v">'+hab(at(S(c,'population'),2026))+'</span><span class="t">d’habitants au 1er janvier 2026</span></div>'+
      '<div><span class="v">'+num(Math.round(g/100)*100,0)+' €</span><span class="t">de PIB par habitant, 2025 (euros courants)</span><span class="e">UE : '+num(Math.round(ge/100)*100,0)+' €</span></div>'+
      '<div><span class="v">'+pc(dt[1])+'</span><span class="t">de dette publique, en % du PIB, '+dt[0]+'</span><span class="e">UE : '+pc(at(S(EU,'debt'),dt[0]))+'</span></div>'+
      '<div><span class="v">'+pc(u[1])+'</span><span class="t">de chômage, '+u[0]+'</span><span class="e">UE : '+pc(at(S(EU,'unemp'),u[0]))+'</span></div>'+
      '</div><p class="rline"><span>Note de la dette</span><b>'+rtShort(c)+'</b><small>S&P · Moody’s · Fitch</small></p><div class="cta"><a class="btn" href="#dossier" data-magnet>Ouvrir l’analyse <span aria-hidden="true">↓</span></a><button type="button" class="btn" style="background:#fff;color:var(--line);border:2px solid var(--line)" id="goC">Comparer avec…</button></div>'+
      '<p class="src">'+srcs(['tps00001','nama_10_gdp','teina225','une_rt_a'],'PIB par habitant : calcul Au plus Juste, PIB ÷ population moyenne')+' Notes : agences, vérifiées le 10/10/2026.</p>';
    D.getElementById('goC').onclick=function(){setMode('C')};pop(bul);
  }
  function bulleC(){
    var a=st.a,b=st.b;
    if(!a||!b){bul.innerHTML='<div class="head"><h2>'+(a?name(a):'?')+' <i>⇄</i> ?</h2><span class="tag-s">Commerce de biens</span></div><p class="wait">'+(a?'Cliquez sur un second pays pour voir ce que '+le(a)+' et lui s’échangent.':'Cliquez sur un premier pays, puis sur un second.')+'</p>';pop(bul);return}
    var xa=T[a][b],xb=T[b][a],sol=xa-xb,sa=xa/T[a].WORLD*100,sb=xb/T[b].WORLD*100;
    bul.innerHTML='<div class="head"><h2>'+name(a)+' <i>⇄</i> '+name(b)+'</h2><span class="tag-s">Biens, 2024</span></div>'+
      '<div class="flowbox"><div><span class="v" style="color:var(--red)">'+eur(xa)+'</span><span class="t">vendus par '+le(a)+' '+au(b)+'</span></div><span class="arr" aria-hidden="true">⇄</span><div><span class="v">'+eur(xb)+'</span><span class="t">vendus par '+le(b)+' '+au(a)+'</span></div></div>'+
      '<div class="solde"><span>Solde pour '+le(a)+'</span><b>'+seur(sol)+'</b></div>'+
      '<p class="src" style="color:var(--line);font-size:13.5px">'+Le(b)+' reçoit '+pc(sa)+' des exportations de biens '+adj(a)+' ; '+le(a)+', '+pc(sb)+' des exportations '+adj(b)+'.</p>'+
      '<div class="cta"><a class="btn" href="#dossier">Comparer en détail <span aria-hidden="true">↓</span></a></div><p class="src">'+srcs(['DS-045409'],'valeurs déclarées par chaque exportateur')+'</p>';
    pop(bul);
  }
  function setMode(m){
    st.mode=m;var sw=D.getElementById('switch');sw.classList.toggle('cmp',m==='C');D.getElementById('mA').setAttribute('aria-pressed',m==='A');D.getElementById('mC').setAttribute('aria-pressed',m==='C');
    if(m==='A'){st.b=null;if(!st.a)st.a='BE';h1.innerHTML='Choisissez <span>un pays.</span>';hint.textContent='cliquez sur la carte ←'}
    else{h1.innerHTML='Choisissez <span>deux pays.</span>';hint.textContent='un clic, puis un autre ←'}
    update(true);
  }
  D.getElementById('mA').onclick=function(){setMode('A')};D.getElementById('mC').onclick=function(){setMode('C')};
  function pick(code){
    if(st.mode==='A'){st.a=code}
    else{if(code===st.a){st.a=st.b;st.b=null}else if(code===st.b){st.b=null}else if(!st.a){st.a=code}else{st.b=code}}
    update(true);
  }
  function update(re){
    paint();drawFlows();
    if(st.mode==='A')bulleA(st.a);else bulleC();
    var h=st.mode==='A'?'#pays-'+st.a:(st.a&&st.b?'#comparer-'+st.a+'-'+st.b:'');
    try{if(h&&location.hash!==h)history.replaceState(null,'',h)}catch(e){}
    if(re){if(st.mode==='C'&&st.a&&st.b)renderC(st.a,st.b);else if(st.a)renderA(st.a)}
    if(typeof renderRanks==='function'&&D.getElementById('rkL')&&D.getElementById('rkL').children.length)renderRanks();
  }

  /* ======================= Dossier : un pays ======================= */
  var dos=D.getElementById('dossier');
  function fcell(v,l,e){return '<div><b>'+v+'</b><span class="l">'+l+'</span><span class="e">'+e+'</span></div>'}
  function euCmp(v,eu,fmt){return 'UE : <em>'+fmt(eu)+'</em>'}
  function renderA(c){
    var nm=name(c),p25=at(S(c,'population'),2026),p24=at(S(c,'population'),2025),gdp=at(S(c,'gdp_meur'),2025)*1e6,gdpEU=at(S(EU,'gdp_meur'),2025)*1e6;
    var gr=last(S(c,'growth')),inf=last(S(c,'inflation')),u=last(S(c,'unemp')),dt=last(S(c,'debt')),df=last(S(c,'deficit'));
    var h='';
    h+='<section class="dz brun grain" aria-labelledby="dA1"><div class="w"><p class="kicker" data-r>Analyse · Eurostat · consulté le 10 octobre 2026</p><h2 class="giant" id="dA1" data-r>'+nm+'<span class="s">, en huit chiffres.</span></h2>'+
      '<div class="facts8" data-r>'+
      fcell(hab(p25),'d’habitants au 1er janvier 2026',(p24?sgn((p25/p24-1)*100,1)+' % en un an':''))+
      fcell(eur(gdp),'de PIB en 2025 (euros courants)',num(gdp/gdpEU*100,1)+' % du PIB de l’Union')+
      fcell(num(Math.round(gdpHab(c,2025)/100)*100,0)+' €','de PIB par habitant, 2025 (euros courants)',euCmp(0,Math.round(gdpHab(EU,2025)/100)*100,function(v){return num(v,0)+' €'}))+
      fcell(spc(gr[1]),'de croissance réelle, '+gr[0],euCmp(0,at(S(EU,'growth'),gr[0]),spc))+
      fcell(pc(inf[1]),'d’inflation (IPCH), '+inf[0],euCmp(0,at(S(EU,'inflation'),inf[0]),pc))+
      fcell(pc(u[1]),'de chômage, '+u[0],euCmp(0,at(S(EU,'unemp'),u[0]),pc))+
      fcell(pc(dt[1]),'de dette publique, % du PIB, '+dt[0],euCmp(0,at(S(EU,'debt'),dt[0]),pc))+
      fcell(spc(df[1]),'de solde public, % du PIB, '+df[0],euCmp(0,at(S(EU,'deficit'),df[0]),spc))+
      '</div><p class="src8">'+srcs(['tps00001','nama_10_gdp','tec00115','tec00118','une_rt_a','teina225'],'PIB par habitant : calcul Au plus Juste')+'</p></div></section>';
    /* Budget */
    var tot=at(C[c].cofog.TOTAL,Y1),sp=at(C[c].cofog.GF10,Y1);
    h+='<section class="dz papier" aria-labelledby="dA2"><div class="w"><p class="kicker" data-r>Dépenses publiques par fonction · COFOG · Eurostat gov_10a_exp</p><h2 id="dA2" data-r>Où va <span class="s">l’argent public ?</span></h2>'+
      '<p class="lede" data-r id="bLede"></p>'+
      '<div class="budget-top" data-r><div class="yearpick"><label for="yr" class="kicker" style="color:var(--grey);margin:0">Année</label><input type="range" id="yr" min="'+Y0+'" max="'+Y1+'" step="1" value="'+Y1+'"><output id="yrO">'+Y1+'</output></div>'+
      '<div class="unit" role="group" aria-label="Unité"><button type="button" id="uP" aria-pressed="true">% du PIB</button><button type="button" id="uR" aria-pressed="false">€ de 2024 par habitant</button><button type="button" id="uE" aria-pressed="false">€ courants par habitant</button></div></div>'+
      '<ul class="fn" id="fn" data-r></ul>'+
      '<div class="keyrow"><span><i style="border-color:#C9773A"></i>'+nm+', '+Y0+'-'+Y1+'</span><span><i class="d" style="border-color:#6A665F"></i>moyenne de l’Union</span></div>'+
      '<p class="src">'+srcs(['gov_10a_exp','nama_10_gdp','tps00001'],'€ par habitant : calcul Au plus Juste. « € courants » : euros de l’année choisie. « € de 2024 » : montant converti avec l’indice des prix à la consommation harmonisé du pays (Eurostat prc_hicp_ainr ; moyenne de l’Union : IPCH de l’Union), pour comparer les années entre elles. Les écarts de prix entre pays ne sont pas corrigés')+'</p>'+
      '<div class="limits" data-r><div><b>Une fonction n’est pas un ministère.</b><p>Les portefeuilles changent à chaque gouvernement. La classification COFOG des Nations unies range chaque dépense selon sa finalité : c’est ce qui permet de comparer les pays et les années.</p></div>'+
      '<div><b>Tous les niveaux de pouvoir.</b><p>'+(c==='BE'?'État fédéral, Régions, Communautés, provinces, communes et sécurité sociale sont additionnés : aucun de ces budgets, pris seul, ne donne ce total.':'Administration centrale, collectivités locales et sécurité sociale sont additionnées (secteur S13).')+'</p></div>'+
      '<div><b>La dette se cache dans « services généraux ».</b><p>Les intérêts payés y sont comptés : '+pc(at(S(c,'interest'),Y1))+' du PIB en '+Y1+' pour '+le(c)+', contre '+pc(at(S(EU,'interest'),Y1))+' dans l’Union.</p></div></div>'+
      '</div></section>';
    /* Santé financière */
    h+='<section class="dz brun grain" aria-labelledby="dA3"><div class="w"><p class="kicker" data-r>Finances publiques · Eurostat, notification PDE d’avril 2026 (teina225, tec00127) et gov_10a_main</p><h2 id="dA3" data-r>La santé <span class="s">financière.</span></h2>'+ratingBlock(c)+
      '<div class="grid2"><div class="chartcard" data-r id="cDebt"><h3>Dette publique</h3><p class="def">Ce que doivent toutes les administrations publiques, en % du PIB, au sens du traité de Maastricht.</p></div>'+
      '<div class="chartcard" data-r id="cDef"><h3>Solde public</h3><p class="def">Recettes moins dépenses de l’année, en % du PIB. Sous zéro : déficit, qui s’ajoute à la dette.</p></div>'+
      '<div class="chartcard" data-r id="cRE"><h3>Recettes et dépenses</h3><p class="def">Ce que les administrations prélèvent et ce qu’elles dépensent, en % du PIB. Dépenses : Eurostat gov_10a_exp jusqu’en 2024, gov_10a_main pour 2025 (provisoire pour certains pays).</p></div>'+
      '<div class="chartcard" data-r id="cInt"><h3>Charge d’intérêts</h3><p class="def">Les intérêts payés sur la dette, en % du PIB.</p></div></div>'+
      '<div class="limits" data-r><div><b>Un stock rapporté à un flux.</b><p>La dette s’accumule sur des décennies ; le PIB est produit en un an. Le ratio dit l’effort relatif, pas la date d’une faillite.</p></div><div><b>60 % et 3 % : des conventions.</b><p>Ces seuils datent du traité de Maastricht (1992). Ce sont des valeurs de référence politiques, pas des limites scientifiques ; les économistes débattent de leur pertinence. <a href="__LEXIQUE__#t-criteres-de-convergence">Les critères de Maastricht dans le lexique</a>.</p></div><div><b>Une dette brute.</b><p>Les actifs financiers publics ne sont pas déduits. Deux pays au même ratio peuvent avoir des patrimoines publics très différents.</p></div></div>'+
      '</div></section>';
    /* Santé sociale */
    h+='<section class="dz papier" aria-labelledby="dA4"><div class="w"><p class="kicker" data-r>Conditions de vie · Eurostat, enquête SILC, démographie, enquête sur les forces de travail</p><h2 id="dA4" data-r>La santé <span class="s">sociale.</span></h2>'+
      '<div class="grid2"><div class="chartcard" data-r id="cArope"><h3>Pauvreté ou exclusion sociale</h3><p class="def">Part de la population à risque de pauvreté, en privation matérielle et sociale sévère, ou dans un ménage à très faible intensité de travail (définition Europe 2030).</p></div>'+
      '<div class="chartcard" data-r id="cGini"><h3>Inégalités de revenu</h3><p class="def">Coefficient de Gini du revenu disponible : 0 si tous ont le même revenu, 100 si une seule personne a tout.</p></div>'+
      '<div class="chartcard" data-r id="cLife"><h3>Espérance de vie</h3><p class="def">À la naissance, en années, femmes et hommes ensemble.</p></div>'+
      '<div class="chartcard" data-r id="cUnemp"><h3>Chômage</h3><p class="def">Part des actifs de 15 à 74 ans sans emploi, qui cherchent et sont disponibles (définition du BIT).</p></div></div>'+
      '<div class="limits" data-r><div><b>Une pauvreté relative.</b><p>Le seuil vaut 60 % du revenu médian du pays. Le même pourcentage ne recouvre pas le même niveau de vie d’un pays à l’autre.</p></div><div><b>Des enquêtes.</b><p>Pauvreté, inégalités et chômage viennent d’échantillons : quelques dixièmes de point d’écart ne prouvent rien.</p></div><div><b>Des moyennes nationales.</b><p>Elles masquent les écarts entre régions'+(c==='BE'?', très marqués en Belgique entre la Flandre, la Wallonie et Bruxelles':'')+'.</p></div></div>'+
      '</div></section>';
    /* Commerce */
    var tr=T[c],bal=tr.WORLD-tr._imp.WORLD,ex=last(S(c,'exports_pc')),im=at(S(c,'imports_pc'),ex[0]);
    var parts=Object.keys(tr).filter(function(k){return k.length===2&&k!=='US'&&k!=='CN'}).map(function(k){return [k,tr[k]]});parts.push(['US',tr.US]);parts.push(['CN',tr.CN]);
    parts.sort(function(a,b){return b[1]-a[1]});parts=parts.slice(0,6);var pmx=parts[0][1];
    var PN=function(k){return k==='US'?'États-Unis':k==='CN'?'Chine':name(k)};
    h+='<section class="dz aplat grain" style="background:var(--c-eco)" aria-labelledby="dA5"><div class="w"><p class="kicker" data-r>Commerce extérieur · Eurostat, Comext DS-045409 et nama_10_gdp</p><h2 id="dA5" data-r>Ce que '+le(c)+' <span class="s">vend et achète.</span></h2>'+
      '<div class="trade"><div class="bulle" data-r><div class="kg"><div><span class="v">'+pc(ex[1],0)+'</span><span class="t">du PIB exporté en biens et services, '+ex[0]+'</span></div><div><span class="v">'+pc(im,0)+'</span><span class="t">du PIB importé, '+ex[0]+'</span></div>'+
      '<div><span class="v">'+eur(tr.WORLD)+'</span><span class="t">de biens exportés, 2024 (euros courants)</span></div><div><span class="v">'+seur(bal)+'</span><span class="t">de solde commercial en biens, 2024</span></div></div>'+
      '<p class="src" style="color:var(--line)">'+(ex[1]>100?'Les exportations dépassent le PIB : le PIB compte une valeur ajoutée, les exportations une valeur brute, qui inclut ce qui a été importé puis réexporté.':'Le solde en biens ne compte ni le tourisme, ni la finance, ni les transports : ces services figurent dans les exportations totales.')+'</p></div>'+
      '<div data-r><p class="kicker">Premiers clients en biens, 2024</p><ul class="fn" style="margin-top:8px">'+parts.map(function(p){return '<li style="grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) 100px"><span class="nm" style="font-size:22px">'+PN(p[0])+'</span><span class="bar"><span style="width:'+(p[1]/pmx*100).toFixed(1)+'%;--cc:#FFF4E2"></span></span><span class="val">'+eur(p[1])+'</span></li>'}).join('')+'</ul>'+
      '<p class="note" style="font-size:24px;margin-top:14px;transform:rotate(-2deg)">pour voir les flux dans les deux sens, comparez deux pays ↑</p></div></div>'+
      '<p class="src" style="color:var(--line);margin-top:18px">'+srcs(['DS-045409','nama_10_gdp'])+'</p></div></section>';
    dos.innerHTML=h;afterRender();
    /* Graphiques */
    var EUc='#A69C8F';
    lineChart(D.getElementById('cDebt'),{dark:true,from:2013,to:2025,min:0,refs:[{v:60,label:'critère de Maastricht : 60 %'}],aria:'Dette publique de '+nm+' et de l’Union, 2013-2025',series:[{d:S(EU,'debt'),color:EUc,dash:1,w:2,name:'UE'},{d:S(c,'debt'),color:'#C9773A',name:nm}]});
    barChart(D.getElementById('cDef'),{dark:true,from:2013,to:2025,d:S(c,'deficit'),ref:-3,refLabel:'repère : −3 %',color:'#C9773A',pos:'#7FB6A3',aria:'Solde public de '+nm+', 2013-2025'});
    var te={};for(var y=2013;y<=2024;y++)te[y]=at(C[c].cofog.TOTAL,y);te[2025]=TE25[c];
    lineChart(D.getElementById('cRE'),{dark:true,from:2013,to:2025,aria:'Recettes et dépenses publiques de '+nm,series:[{d:S(c,'revenue'),color:'#EDE6DC',name:'recettes'},{d:te,color:'#C9773A',name:'dépenses'}]});
    lineChart(D.getElementById('cInt'),{dark:true,from:2013,to:2025,min:0,aria:'Charge d’intérêts de '+nm,series:[{d:S(EU,'interest'),color:EUc,dash:1,w:2,name:'UE'},{d:S(c,'interest'),color:'#C9773A',name:nm}]});
    var EUp='#6A665F';
    lineChart(D.getElementById('cArope'),{from:2015,to:2025,aria:'Pauvreté ou exclusion sociale',series:[{d:S(EU,'arope'),color:EUp,dash:1,w:2,name:'UE'},{d:S(c,'arope'),color:'#C9773A',name:nm}]});
    lineChart(D.getElementById('cGini'),{from:2015,to:2025,fmt:function(v){return num(v,1)},aria:'Coefficient de Gini',series:[{d:S(EU,'gini'),color:EUp,dash:1,w:2,name:'UE'},{d:S(c,'gini'),color:'#C9773A',name:nm}]});
    lineChart(D.getElementById('cLife'),{from:2013,to:2024,fmt:function(v){return num(v,1)+' ans'},aria:'Espérance de vie',series:[{d:S(EU,'lifeexp'),color:EUp,dash:1,w:2,name:'UE'},{d:S(c,'lifeexp'),color:'#C9773A',name:nm}]});
    lineChart(D.getElementById('cUnemp'),{from:2013,to:2025,min:0,aria:'Chômage',series:[{d:S(EU,'unemp'),color:EUp,dash:1,w:2,name:'UE'},{d:S(c,'unemp'),color:'#C9773A',name:nm}]});
    var CS={cDebt:['teina225'],cDef:['tec00127'],cRE:['tec00021','gov_10a_exp'],cInt:['gov_10a_main|'+BK.interest],cArope:['ilc_peps01n'],cGini:['tessi190'],cLife:['tps00205'],cUnemp:['une_rt_a']};
    Object.keys(CS).forEach(function(id){D.getElementById(id).insertAdjacentHTML('beforeend','<p class="src">'+srcs(CS[id])+'</p>')});
    /* Budget interactif */
    var unit='P',yr=Y1;
    function eurHab(code,k,y){var v=at(C[code].cofog[k],y),g=at(S(code,'gdp_meur'),y),p=popMid(code,y);return v!=null&&g&&p?v/100*g*1e6/p:null}
    function realHab(code,k,y){var e=eurHab(code,k,y),ix=IPCH[code];if(e==null||!ix||y<2015||y>2024)return null;return e*ix[9]/ix[y-2015]}
    function drawBudget(){
      var get=function(code,k){return unit==='P'?at(C[code].cofog[k],yr):unit==='R'?realHab(code,k,yr):eurHab(code,k,yr)};
      var fmt=function(v){return v==null?'—':unit==='P'?pc(v):num(Math.round(v/10)*10,0)+' €'};
      var mx=0;COF.forEach(function(f){mx=Math.max(mx,get(c,f[0])||0,get(EU,f[0])||0)});
      var ul=D.getElementById('fn'),tv=get(c,'TOTAL'),te2=get(EU,'TOTAL');
      if(!ul.children.length){ul.innerHTML='<li class="tot"><span class="nm">Total</span><span></span><span class="val" id="fTot"></span><span></span></li>'+COF.map(function(f){return '<li><span class="nm">'+f[1]+'<small>'+f[2]+'</small></span><span class="bar"><span style="--cc:'+f[3]+';width:0"></span><i class="eu"></i></span><span class="val" data-k="'+f[0]+'"></span>'+spark(c,f[0])+'</li>'}).join('')}
      D.getElementById('fTot').innerHTML=fmt(tv)+'<small>UE : '+fmt(te2)+'</small>';
      COF.forEach(function(f,i){var li=ul.children[i+1],v=get(c,f[0]),ve=get(EU,f[0]);li.querySelector('.bar span').style.width=((v||0)/mx*100).toFixed(1)+'%';li.querySelector('.eu').style.left=((ve||0)/mx*100).toFixed(1)+'%';li.querySelector('.val').innerHTML=fmt(v)+'<small>UE : '+fmt(ve)+'</small>'});
      var t=at(C[c].cofog.TOTAL,yr),s=at(C[c].cofog.GF10,yr),eh=eurHab(c,'TOTAL',yr);
      D.getElementById('bLede').innerHTML='En '+yr+', les administrations publiques '+(adj(c)||'')+' ont dépensé <b>'+pc(t)+' du PIB</b>, soit environ <b>'+num(Math.round(eh/100)*100,0)+' € par habitant</b> en euros de '+yr+(yr<2024&&realHab(c,'TOTAL',yr)!=null?' ('+num(Math.round(realHab(c,'TOTAL',yr)/100)*100,0)+' € aux prix de 2024)':'')+'. La protection sociale en représente '+pc(s/t*100,0)+'. Moyenne de l’Union : '+pc(at(C[EU].cofog.TOTAL,yr))+' du PIB.';
    }
    var yrI=D.getElementById('yr');yrI.oninput=function(){yr=+this.value;D.getElementById('yrO').textContent=yr;drawBudget()};
    ['uP','uR','uE'].forEach(function(id){D.getElementById(id).onclick=function(){unit=id.charAt(1);['uP','uR','uE'].forEach(function(j){D.getElementById(j).setAttribute('aria-pressed',j===id?'true':'false')});drawBudget()}});
    drawBudget();
  }

  /* ======================= Dossier : deux pays ======================= */
  function renderC(a,b){
    var na=name(a),nb=name(b),xa=T[a][b],xb=T[b][a],ma=T[b]._m[a],mb=T[a]._m[b],sol=xa-xb;
    var h='<section class="dz brun grain" aria-labelledby="dC1"><div class="w"><p class="kicker" data-r>Comparaison · Eurostat · consulté le 10 octobre 2026</p>'+
      '<h2 class="vs giant" id="dC1" data-r style="max-width:none"><span class="a">'+na+'</span><span class="mid" aria-label="et">×</span><span class="b">'+nb+'</span></h2></div></section>';
    /* Commerce bilatéral */
    var mx=Math.max(xa,xb),wa=4+22*Math.sqrt(xa/mx),wb=4+22*Math.sqrt(xb/mx);
    h+='<section class="dz aplat grain" style="background:var(--lilac)" aria-labelledby="dC2"><div class="w"><p class="kicker" data-r>Commerce de biens, 2024 · Eurostat, Comext DS-045409</p><h2 id="dC2" data-r>Qui vend quoi <span class="s">à qui ?</span></h2>'+
      '<div class="trade"><div data-r><svg viewBox="0 0 600 340" role="img" aria-label="'+na+' vend '+eur(xa)+' de biens à '+nb+', qui lui en vend '+eur(xb)+'">'+
      '<defs><marker id="mA2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#E2402B"/></marker><marker id="mB2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1A1A1A"/></marker></defs>'+
      '<circle cx="112" cy="176" r="92" fill="#E2402B" stroke="#1A1A1A" stroke-width="3"/><circle cx="488" cy="176" r="92" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="3"/>'+
      '<text x="112" y="184" text-anchor="middle" style="font-family:var(--serif);font-size:'+(na.length>9?26:32)+'px;fill:#fff">'+na+'</text><text x="488" y="184" text-anchor="middle" style="font-family:var(--serif);font-size:'+(nb.length>9?26:32)+'px;fill:#fff">'+nb+'</text>'+
      '<path class="drawline" style="--len:420" d="M200 130 Q300 40 392 128" fill="none" stroke="#E2402B" stroke-width="'+wa.toFixed(1)+'" stroke-linecap="round" marker-end="url(#mA2)"/>'+
      '<path class="drawline" style="--len:420" d="M400 224 Q300 314 208 226" fill="none" stroke="#1A1A1A" stroke-width="'+wb.toFixed(1)+'" stroke-linecap="round" marker-end="url(#mB2)"/>'+
      '<text x="300" y="58" text-anchor="middle" class="fadein" style="font-family:var(--sans);font-weight:700;font-size:26px;fill:#E2402B">'+eur(xa)+'</text>'+
      '<text x="300" y="320" text-anchor="middle" class="fadein" style="font-family:var(--sans);font-weight:700;font-size:26px;fill:#1A1A1A">'+eur(xb)+'</text></svg></div>'+
      '<div class="bulle" data-r><p class="kicker">La balance commerciale</p><p style="font-size:17px;margin-top:6px">C’est la différence entre ce qu’un pays vend et ce qu’il achète. Ici, entre les deux pays, en biens seulement.</p>'+
      '<div class="solde"><span>Solde pour '+le(a)+'</span><b style="color:'+(sol>=0?'var(--line)':'var(--red)')+'">'+seur(sol)+'</b></div>'+
      '<p style="font-size:14.5px;margin-top:10px">'+(sol>=0?'Les ventes '+du(a)+' '+au(b)+' dépassent ses achats : un excédent bilatéral.':'Les achats '+du(a)+' '+au(b)+' dépassent ses ventes : un déficit bilatéral.')+' Un excédent n’est pas un gain, ni un déficit une perte : un pays peut importer beaucoup parce qu’il transforme puis réexporte, et les échanges de services ne sont pas comptés.</p>'+
      '<p style="font-size:14.5px;margin-top:10px">'+Le(b)+' reçoit <b>'+pc(xa/T[a].WORLD*100)+'</b> des exportations de biens '+adj(a)+' ; '+le(a)+', <b>'+pc(xb/T[b].WORLD*100)+'</b> des exportations '+adj(b)+'.</p></div></div>'+
      '<div class="mirror" data-r><p class="kicker" style="color:var(--line)">Le même flux, deux chiffres</p><table><thead><tr><th>Flux</th><th>Déclaré par l’exportateur</th><th>Déclaré par l’importateur</th></tr></thead><tbody>'+
      '<tr><td>'+na+' → '+nb+'</td><td>'+eur(xa)+'</td><td>'+eur(ma)+'</td></tr><tr><td>'+nb+' → '+na+'</td><td>'+eur(xb)+'</td><td>'+eur(mb)+'</td></tr></tbody></table>'+
      '<p style="margin-top:10px;font-size:14.5px">Les deux douanes ne voient pas la même chose : dates d’enregistrement, transport compté ou non, marchandises qui transitent par un port (Anvers, Rotterdam) sans y être produites, seuils de déclaration. Au plus Juste retient la déclaration de l’exportateur, et affiche l’autre.</p><p class="src" style="color:var(--line)">'+srcs(['DS-045409'])+'</p></div>'+
      '</div></section>';
    /* Côte à côte */
    var R=[['PIB par habitant','2025, euros courants, calcul',function(k){return gdpHab(k,2025)},function(v){return num(Math.round(v/100)*100,0)+' €'}],
      ['Croissance réelle',null,'growth',spc],['Inflation (IPCH)',null,'inflation',pc],['Chômage',null,'unemp',pc],
      ['Dette publique','% du PIB','debt',pc],['Solde public','% du PIB','deficit',spc],
      ['Dépenses publiques','% du PIB, 2025',function(k){return TE25[k]},pc],['Recettes publiques','% du PIB','revenue',pc],
      ['Pauvreté ou exclusion','% de la population','arope',pc],['Inégalités (Gini)','0 à 100','gini',function(v){return num(v,1)}],
      ['Espérance de vie','à la naissance','lifeexp',function(v){return num(v,1)+' ans'}],['Exportations','% du PIB','exports_pc',function(v){return pc(v,0)}]];
    function rowsHTML(list){return list.map(function(r){
      var va,vb,ve,yy='';if(typeof r[2]==='function'){va=r[2](a);vb=r[2](b);ve=r[2](EU)}else{var la=last(S(a,r[2]));yy=la[0];va=la[1];vb=at(S(b,r[2]),yy);ve=at(S(EU,r[2]),yy)}
      var m=Math.max(Math.abs(va||0),Math.abs(vb||0))||1;
      return '<li><span class="s l"><span class="bar" style="width:'+(Math.abs(va||0)/m*100*.7).toFixed(1)+'%"></span><b>'+(va==null?'—':r[3](va))+'</b></span><span class="lab">'+r[0]+'<small>'+(r[1]?r[1]+(yy?', '+yy:''):yy)+(ve!=null?' · UE : '+r[3](ve):'')+'</small></span><span class="s r"><span class="bar" style="width:'+(Math.abs(vb||0)/m*100*.7).toFixed(1)+'%"></span><b>'+(vb==null?'—':r[3](vb))+'</b></span></li>'}).join('')}
    h+='<section class="dz papier" aria-labelledby="dC3"><div class="w"><p class="kicker" data-r>Mêmes sources, mêmes années</p><h2 id="dC3" data-r>Les mêmes indicateurs, <span class="s">côte à côte.</span></h2>'+
      '<table class="rtcmp" data-r><thead><tr><th>Note de la dette, oct. 2026</th><th class="a">'+na+'</th><th>'+nb+'</th></tr></thead><tbody>'+AG.map(function(g){var x=RT[a][g[0]],y=RT[b][g[0]];return '<tr><td>'+g[1]+'</td><td class="a"><b>'+(x?x.r:'—')+'</b> '+(x?'':'<small>non noté</small>')+'</td><td><b>'+(y?y.r:'—')+'</b> '+(y?'':'<small>non noté</small>')+'</td></tr>'}).join('')+'</tbody></table>'+
      '<ul class="bfly" data-r><li><span class="hd a" style="text-align:right">'+na+'</span><span class="lab hd">Indicateur</span><span class="hd">'+nb+'</span></li>'+rowsHTML(R)+'</ul>'+
      '<p class="src" style="margin-top:12px;font-size:12.5px;color:var(--grey)">Les barres comparent les deux pays sur chaque ligne ; elles ne sont pas à la même échelle d’une ligne à l’autre. '+srcs(['nama_10_gdp','tps00001','tec00115','tec00118','une_rt_a','teina225','tec00127','gov_10a_exp','gov_10a_main|'+BK.interest,'ilc_peps01n','tessi190','tps00205'])+' Notes : agences, vérifiées le 10/10/2026.</p></div></section>';
    /* Budget comparé */
    var B=COF.map(function(f){return [f[1],'% du PIB, 2024',function(k){return at(C[k].cofog[f[0]],2024)},pc]});
    h+='<section class="dz papier" style="padding-top:0" aria-labelledby="dC4"><div class="w"><p class="kicker" data-r>Dépenses par fonction · COFOG · 2024</p><h2 id="dC4" data-r>Deux budgets, <span class="s">fonction par fonction.</span></h2>'+
      '<ul class="bfly" data-r><li><span class="hd a" style="text-align:right">'+na+'</span><span class="lab hd">Fonction</span><span class="hd">'+nb+'</span></li>'+rowsHTML(B)+'</ul>'+
      '<div class="limits" data-r><div><b>Des structures différentes.</b><p>Un pays qui finance ses retraites par l’impôt affiche plus de dépenses publiques qu’un pays où elles passent par des fonds privés obligatoires.</p></div><div><b>Le PIB au dénominateur.</b><p>Un PIB gonflé par les multinationales (Irlande, Luxembourg) fait paraître chaque dépense plus petite.</p></div><div><b>Pas un classement.</b><p>Dépenser plus n’est ni mieux ni moins bien en soi : la question est ce que la dépense produit.</p></div></div>'+
      '</div></section>';
    /* Trajectoires */
    h+='<section class="dz brun grain" aria-labelledby="dC5"><div class="w"><p class="kicker" data-r>Trajectoires · 2013-2025</p><h2 id="dC5" data-r>Deux trajectoires, <span class="s">une moyenne.</span></h2>'+
      '<div class="grid2"><div class="chartcard" data-r id="kDebt"><h3>Dette publique</h3><p class="def">En % du PIB.</p></div><div class="chartcard" data-r id="kUnemp"><h3>Chômage</h3><p class="def">En % des actifs de 15 à 74 ans.</p></div>'+
      '<div class="chartcard" data-r id="kArope"><h3>Pauvreté ou exclusion sociale</h3><p class="def">En % de la population.</p></div><div class="chartcard" data-r id="kSoc"><h3>Protection sociale</h3><p class="def">Dépenses publiques, en % du PIB.</p></div></div>'+
      '<p class="keyrow" style="color:var(--cream)"><span><i style="border-color:#E2402B"></i>'+na+'</span><span><i style="border-color:#EDE6DC"></i>'+nb+'</span><span><i class="d" style="border-color:#A69C8F"></i>moyenne de l’Union</span></p></div></section>';
    dos.innerHTML=h;afterRender();
    function three(id,k,from,to,min,refs){lineChart(D.getElementById(id),{dark:true,from:from,to:to,min:min,refs:refs,aria:na+', '+nb+' et Union',series:[{d:k==='soc'?C[EU].cofog.GF10:S(EU,k),color:'#A69C8F',dash:1,w:2,name:'UE'},{d:k==='soc'?C[b].cofog.GF10:S(b,k),color:'#EDE6DC',name:nb},{d:k==='soc'?C[a].cofog.GF10:S(a,k),color:'#E2402B',name:na}]})}
    three('kDebt','debt',2013,2025,0,[{v:60,label:'60 %'}]);three('kUnemp','unemp',2013,2025,0);three('kArope','arope',2015,2025);three('kSoc','soc',2013,2024);
    var KS={kDebt:['teina225'],kUnemp:['une_rt_a'],kArope:['ilc_peps01n'],kSoc:['gov_10a_exp|'+BK.gf10]};Object.keys(KS).forEach(function(id){D.getElementById(id).insertAdjacentHTML('beforeend','<p class="src">'+srcs(KS[id])+'</p>')});
  }
  function afterRender(){
    dos.querySelectorAll('[data-r]').forEach(function(n){io2.observe(n)});
    dos.querySelectorAll('.drawline').forEach(function(p){if(!p.style.getPropertyValue('--len')){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()+4))}catch(e){}}});
  }
  var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');e.target.classList.add('play');io2.unobserve(e.target)}})},{threshold:.12});

  /* ======================= Notations ======================= */
  var RT=DATA.rt;
  var AG=[['sp','S&P Global'],['mo','Moody’s'],['fi','Fitch']];
  var SCALE=[['AAA','Aaa'],['AA+','Aa1'],['AA','Aa2'],['AA-','Aa3'],['A+','A1'],['A','A2'],['A-','A3'],['BBB+','Baa1'],['BBB','Baa2'],['BBB-','Baa3'],['BB+','Ba1']];
  var MOIS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
  function mdate(s){if(!s)return 'date non retrouvée';var p=s.split('-');return MOIS[+p[1]-1]+' '+p[0]}
  function rtShort(c){var r=RT[c];return AG.map(function(a){return r[a[0]]?r[a[0]].r:'—'}).join(' · ')}
  function ratingBlock(c){
    var r=RT[c];
    var cards=AG.map(function(a){var x=r[a[0]];
      if(!x)return '<div class="agc"><span class="ag">'+a[1]+'</span><b class="nr">—</b><span class="ol">ne note plus ce pays</span><span class="dt">notation retirée à la demande de l’État</span></div>';
      return '<div class="agc"><span class="ag">'+a[1]+'</span><b>'+x.r+'</b><span class="dt">dernière décision : '+mdate(x.d)+'</span></div>'}).join('');
    var ladder=SCALE.map(function(s,i){var on=AG.filter(function(a){return r[a[0]]&&r[a[0]].n===i+1}).map(function(a){return a[1].split(' ')[0]});
      return '<li class="'+(on.length?'on':'')+(i===9?' ig':'')+'"><span>'+s[0]+'</span><i>'+s[1]+'</i>'+(on.length?'<em>'+on.join(', ')+'</em>':'')+'</li>'}).join('');
    return '<div class="rating" data-r><div class="rtop"><div><h3>La note de la dette</h3><p class="def">L’avis de trois agences privées sur la capacité de l’État à rembourser sa dette à temps. De AAA (risque minimal) à D (défaut).</p></div></div>'+
      '<div class="agrid">'+cards+'</div><ol class="ladder" aria-label="Échelle des notes">'+ladder+'</ol>'+
      '<p class="lnote">Sous BBB− / Baa3, la dette est dite « spéculative ». Au 10 octobre 2026, aucun pays de l’Union n’y est classé par les trois agences. Les perspectives (stable, positive, négative) ne sont pas affichées : elles n’ont pas pu être vérifiées dans les communiqués des agences.</p>'+
      '<div class="limits"><div><b>Des avis, pas des mesures.</b><p>Une note est une opinion argumentée, publiée par une entreprise privée. Les trois agences ne sont pas toujours d’accord, ni au même moment.</p></div><div><b>Un poids réel.</b><p>Une baisse de note peut renchérir le coût de l’emprunt public : certains investisseurs ne peuvent détenir que des titres bien notés.</p></div><div><b>Une histoire contestée.</b><p>Les agences ont été critiquées pour avoir noté trop haut avant 2008, puis dégradé brutalement pendant la crise de la zone euro. Elles sont encadrées dans l’UE depuis 2009 (règlement CRA, supervision de l’ESMA).</p></div></div></div>';
  }

  /* Liens de la carte et des classements vers les dossiers qui analysent l'indicateur */
  var DOSL={
    unemp:[['__FICHE__','Fiche chômage','ce que le taux compte, et pourquoi il ne se compare pas toujours d’une source à l’autre'],['__EMPLOI__#f-emploi','Dossier Emploi','chômage, inactivité et taux d’emploi en Belgique']],
    youth:[['__FICHE__','Fiche chômage','définition du chômage et limites des comparaisons']],
    ltu:[['__EMPLOI__#f-duree','Dossier Emploi','durée du chômage et inactivité']],
    emp:[['__EMPLOI__#f-emploi','Dossier Emploi','qui travaille, qui ne travaille pas, et où se situe l’écart avec l’Union']],
    debt:[['__FINANCES__#f-dette','Dossier Finances publiques','une dette n’est pas mauvaise en soi : tout dépend de ce qu’elle finance']],
    debtpc:[['__FINANCES__#f-dette','Dossier Finances publiques','dette, croissance et taux d’intérêt']],
    deficit:[['__FINANCES__#f-deficit','Dossier Finances publiques','ce que mesure le solde et ce qu’il ne dit pas']],
    spend:[['__FINANCES__#f-depenses','Dossier Finances publiques','les dépenses par fonction']],
    revenue:[['__FINANCES__#f-depenses','Dossier Finances publiques','recettes, dépenses et solde']],
    tax:[['__FINANCES__#f-depenses','Dossier Finances publiques','recettes, dépenses et solde']],
    interest:[['__FINANCES__#f-interets','Dossier Finances publiques','la charge d’intérêts et les notes des agences']],
    gf10:[['__PENSIONS__#f-cout','Dossier Pensions','le premier poste de la protection sociale']],
    gf07:[['__SANTE__#f-cout','Dossier Santé','dépenses publiques et privées, accès aux soins']],
    olddep:[['__PENSIONS__#histoire','Dossier Pensions','ce que le ratio dit, et ce qu’il ne dit pas du financement des pensions']],
    netmig:[['__IMMIGRATION__#f-flux','Dossier Immigration','qui arrive, d’où, et pour quelles raisons']],
    lifeexp:[['__SANTE__#f-vie','Dossier Santé','vivre plus longtemps, mais pas forcément en bonne santé']],
    hly65:[['__SANTE__#f-vie','Dossier Santé','ce que mesure la « bonne santé » déclarée']],
    tertiary:[['__EDUCATION__#f-diplome','Dossier Éducation','diplômes et emploi']],
    earlyleave:[['__EDUCATION__#f-parcours','Dossier Éducation','redoublement et décrochage']],
    gf09:[['__EDUCATION__#recherche','Dossier Éducation','dépenser plus suffit-il ?']],
    edu_hab:[['__EDUCATION__#recherche','Dossier Éducation','dépenser plus suffit-il ?']],
    edu_pps:[['__EDUCATION__#recherche','Dossier Éducation','dépenser plus suffit-il ?']],
    edu_pib:[['__EDUCATION__#recherche','Dossier Éducation','dépenser plus suffit-il ?']],
    edu_tot:[['__EDUCATION__#recherche','Dossier Éducation','dépenser plus suffit-il ?']],
    arope:[['__INEGALITES__#f-pauvrete','Dossier Inégalités','ce que mesure le risque de pauvreté']],
    depriv:[['__INEGALITES__#definitions','Dossier Inégalités','pauvreté relative et privations concrètes']],
    gini:[['__INEGALITES__#f-redistribution','Dossier Inégalités','redistribution et coefficient de Gini']],
    ghg:[['__CLIMAT__#f-emissions','Dossier Climat et énergie','quels secteurs émettent, et ce que l’inventaire ne compte pas']],
    renew:[['__CLIMAT__#f-energie','Dossier Climat et énergie','renouvelable ne veut pas dire bas carbone']]};
  function dosLinks(id){var L=DOSL[id];if(!L)return '';return '<span class="dl">Pour comprendre : '+L.map(function(l){return '<a href="'+l[0]+'">'+l[1]+'</a> ('+l[2]+')'}).join(' · ')+'</span>'}

  /* ======================= Classements ======================= */
  function cof(k){return function(c){var o=C[c].cofog[k]||{},L=last(o);return L}}
  function lastOf(k){return function(c){return last(S(c,k))}}
  var RK=[
    {th:'Économie',items:[
      {id:'gdphab',lab:'PIB par habitant',f:function(c){var y=2025,v=gdpHab(c,y);return [y,v]},fmt:function(v){return num(Math.round(v/100)*100,0)+' €'},def:'Produit intérieur brut divisé par la population moyenne de l’année, en euros courants de l’année indiquée.',src:'Eurostat nama_10_gdp, tps00001 ; calcul Au plus Juste',note:'Le PIB par habitant de l’Irlande et du Luxembourg est gonflé par les profits des multinationales et les travailleurs frontaliers.'},
      {id:'gdppps',lab:'Niveau de vie (PIB en SPA)',f:lastOf('gdppps'),fmt:function(v){return num(v,0)},def:'PIB par habitant corrigé des différences de prix, indice : Union = 100.',src:'Eurostat tec00114'},
      {id:'growth',lab:'Croissance',f:lastOf('growth'),fmt:spc,def:'Variation du PIB en volume par rapport à l’année précédente.',src:'Eurostat tec00115'},
      {id:'inflation',lab:'Inflation',f:lastOf('inflation'),fmt:pc,def:'Variation annuelle moyenne de l’indice des prix à la consommation harmonisé (IPCH).',src:'Eurostat tec00118 (série prc_hicp_ainr, classification ECOICOP 2)'},
      {id:'curacc',lab:'Balance courante',f:lastOf('curacc'),fmt:spc,def:'Solde des échanges de biens, de services et de revenus avec le reste du monde, en % du PIB.',src:'Eurostat tipsbp20',note:'Un excédent n’est pas une « victoire » : il peut refléter une demande intérieure faible.'},
      {id:'exports',lab:'Exportations',f:lastOf('exports_pc'),fmt:function(v){return pc(v,0)},def:'Exportations de biens et services, en % du PIB.',src:'Eurostat tet00003 (comptes nationaux, nama_10_gdp)',note:'Les petits pays ouverts dépassent souvent 100 % : les exportations sont une valeur brute, le PIB une valeur ajoutée.'},
      {id:'rd',lab:'Recherche et développement',f:lastOf('rd'),fmt:function(v){return pc(v,2)},def:'Dépense intérieure de R&D, publique et privée, en % du PIB.',src:'Eurostat sdg_09_10'}]},
    {th:'Finances publiques',items:[
      {id:'rating',lab:'Note de la dette',f:function(c){return RT[c]?[2026,RT[c].avg]:null},fmt:function(v,c){return rtShort(c)},inv:true,def:'Notes S&P, Moody’s et Fitch au 10 octobre 2026, classées par leur moyenne (AAA = 1, AA+ = 2…).',src:'Agences de notation, communiqués et presse, vérifiés le 10/10/2026',note:'S&P ne note plus l’Estonie depuis 2025 : sa moyenne repose sur deux agences.'},
      {id:'debt',lab:'Dette publique',f:lastOf('debt'),fmt:pc,def:'Dette brute consolidée des administrations publiques, au sens de Maastricht (valeur nominale, fin d’année), en % du PIB. C’est un stock : il s’accumule d’année en année.',src:'Eurostat teina225 (notification d’avril 2026)'},
      {id:'debtpc',lab:'Dette par habitant',f:function(c){var y=last(S(c,'debt_meur'))[0],d=at(S(c,'debt_meur'),y),p=popMid(c,y);return [y,d&&p?d*1e6/p:null]},fmt:function(v){return num(Math.round(v/100)*100,0)+' €'},def:'Dette publique (en millions d’euros) divisée par la population moyenne de l’année, en euros courants de l’année indiquée.',src:'Eurostat teina225, tps00001 ; calcul Au plus Juste'},
      {id:'deficit',lab:'Solde public',f:lastOf('deficit'),fmt:spc,def:'Recettes moins dépenses publiques de l’année, en % du PIB : négatif = déficit, positif = excédent. C’est un flux, à ne pas confondre avec la dette (un stock).',src:'Eurostat tec00127 (notification d’avril 2026)',note:'Le seuil de 3 % est une valeur de référence fixée par les traités européens, pas une mesure économique de soutenabilité. Les règles budgétaires de l’Union ont été réformées en 2024.'},
      {id:'spend',lab:'Dépenses publiques',f:cof('TOTAL'),fmt:pc,def:'Dépenses totales des administrations publiques, en % du PIB.',src:'Eurostat gov_10a_exp'},
      {id:'revenue',lab:'Recettes publiques',f:lastOf('revenue'),fmt:pc,def:'Recettes totales des administrations publiques, en % du PIB.',src:'Eurostat tec00021'},
      {id:'tax',lab:'Impôts et cotisations',f:lastOf('tax'),fmt:pc,def:'Recettes totales provenant des impôts et des cotisations sociales (cotisations imputées incluses), après déduction des montants notifiés mais non susceptibles d’être perçus, en % du PIB. Champ : administrations publiques et institutions de l’Union (droits de douane perçus pour l’Union inclus).',src:'Eurostat gov_10a_taxag',note:'Le « taux de prélèvements » ne dit pas qui paie : il additionne impôts sur le revenu, TVA, cotisations, taxes sur le capital.'},
      {id:'interest',lab:'Charge d’intérêts',f:lastOf('interest'),fmt:pc,def:'Intérêts payés par les administrations publiques (opération D.41 des comptes nationaux), en % du PIB.',src:'Eurostat gov_10a_main (D.41, % du PIB)',bk:BK.interest,note:'En % du PIB, la charge peut baisser alors qu’elle augmente en euros : il faut regarder les deux. Elle dépend aussi des taux auxquels la dette passée a été émise, pas seulement des taux du moment.'}]},
    {th:'Budget par fonction',items:[
      {id:'gf10',lab:'Protection sociale',f:cof('GF10'),fmt:pc,def:'Pensions, chômage, famille, handicap, exclusion : dépenses publiques en % du PIB.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf10},
      {id:'gf07',lab:'Santé',f:cof('GF07'),fmt:pc,def:'Dépenses publiques de santé en % du PIB.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf07,note:'Les dépenses privées (mutuelles, ménages) ne sont pas comptées.'},
      {id:'gf09',lab:'Enseignement',f:cof('GF09'),fmt:pc,def:'Dépenses publiques d’enseignement en % du PIB.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf09},
      {id:'gf02',lab:'Défense',f:cof('GF02'),fmt:pc,def:'Dépenses publiques de défense en % du PIB (classification COFOG).',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf02,note:'L’OTAN calcule autrement (pensions militaires, aide à l’Ukraine…) : ses chiffres sont plus élevés.'},
      {id:'gf04',lab:'Affaires économiques',f:cof('GF04'),fmt:pc,def:'Transports, énergie, agriculture, aides aux entreprises, en % du PIB.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf04},
      {id:'gf05',lab:'Environnement',f:cof('GF05'),fmt:pc,def:'Protection de l’environnement, en % du PIB.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf05}]},
    {th:'Emploi',items:[
      {id:'emp',lab:'Taux d’emploi',f:lastOf('emp'),fmt:pc,def:'Part des 20-64 ans qui ont un emploi.',src:'Eurostat lfsi_emp_a'},
      {id:'unemp',lab:'Chômage',f:lastOf('unemp'),fmt:pc,def:'Part des actifs de 15 à 74 ans sans emploi, qui cherchent et sont disponibles (BIT).',src:'Eurostat une_rt_a'},
      {id:'youth',lab:'Chômage des jeunes',f:lastOf('youth'),fmt:pc,def:'Chômage des 15-24 ans, en % des jeunes actifs.',src:'Eurostat tesem140',note:'Les étudiants ne comptent pas parmi les actifs : 20 % de chômage ne veut pas dire un jeune sur cinq.'},
      {id:'ltu',lab:'Chômage de longue durée',f:lastOf('ltu'),fmt:pc,def:'Chômeurs depuis un an ou plus, en % des actifs.',src:'Eurostat une_ltu_a'},
      {id:'minwage',lab:'Salaire minimum',f:lastOf('minwage'),fmt:function(v){return num(Math.round(v),0)+' €'},def:'Salaire minimum légal mensuel brut, second semestre de l’année, en euros courants de cette année.',src:'Eurostat tps00155',note:'Cinq pays (Autriche, Danemark, Finlande, Italie, Suède) n’ont pas de salaire minimum légal : les minima y sont fixés par conventions collectives, ils n’apparaissent pas. Montants bruts, sans correction des prix.'},
      {id:'paygap',lab:'Écart salarial femmes-hommes',f:lastOf('paygap'),fmt:pc,def:'Différence de salaire horaire brut moyen entre hommes et femmes, en % du salaire masculin.',src:'Eurostat sdg_05_20',note:'Écart « non ajusté » : il ne compare pas des postes identiques, il mesure l’écart global.'}]},
    {th:'Social',items:[
      {id:'arope',lab:'Pauvreté ou exclusion',f:lastOf('arope'),fmt:pc,def:'Risque de pauvreté, privation sévère ou très faible intensité de travail (Europe 2030).',src:'Eurostat ilc_peps01n'},
      {id:'depriv',lab:'Privation sévère',f:lastOf('depriv'),fmt:pc,def:'Part de la population qui ne peut pas s’offrir au moins 7 biens ou activités sur 13 jugés nécessaires.',src:'Eurostat tespm030',note:'Contrairement au seuil de pauvreté, cette mesure est absolue : elle compare mieux les pays entre eux.'},
      {id:'gini',lab:'Inégalités (Gini)',f:lastOf('gini'),fmt:function(v){return num(v,1)},def:'Coefficient de Gini du revenu disponible : 0 = égalité parfaite, 100 = une personne a tout.',src:'Eurostat tessi190'},
      {id:'lifeexp',lab:'Espérance de vie',f:lastOf('lifeexp'),fmt:function(v){return num(v,1)+' ans'},def:'À la naissance, femmes et hommes ensemble.',src:'Eurostat tps00205'},
      {id:'hly65',lab:'Années en bonne santé à 65 ans',f:lastOf('hly65'),fmt:function(v){return num(v,1)+' ans'},def:'Années qu’une personne de 65 ans peut espérer vivre sans limitation d’activité.',src:'Eurostat tepsr_sp320',note:'Fondé sur une question d’enquête : les habitudes de réponse varient d’un pays à l’autre.'}]},
    {th:'Démographie',items:[
      {id:'pop',lab:'Population',f:function(c){return last(S(c,'population'))},fmt:function(v){return hab(v)},def:'Habitants au 1er janvier.',src:'Eurostat tps00001'},
      {id:'fert',lab:'Fécondité',f:lastOf('fert'),fmt:function(v){return num(v,2)},def:'Nombre moyen d’enfants par femme. Le seuil de remplacement des générations est d’environ 2,1.',src:'Eurostat tps00199'},
      {id:'medage',lab:'Âge médian',f:lastOf('medage'),fmt:function(v){return num(v,1)+' ans'},def:'La moitié de la population est plus jeune, l’autre plus âgée.',src:'Eurostat demo_pjanind',bk:BK.medage},
      {id:'olddep',lab:'Dépendance des âgés',f:lastOf('olddep'),fmt:pc,def:'Personnes de 65 ans et plus pour 100 personnes de 15 à 64 ans.',src:'Eurostat tps00198'},
      {id:'netmig',lab:'Solde migratoire',f:lastOf('netmig'),fmt:function(v){return sgn(v,1)+' ‰'},def:'Arrivées moins départs, pour 1 000 habitants (y compris ajustement statistique).',src:'Eurostat demo_gind',bk:BK.netmig,note:'Les pics de 2022 reflètent l’accueil des personnes fuyant la guerre en Ukraine.'}]},
    {th:'Éducation',items:[
      {id:'edu_hab',lab:'Budget par habitant',f:lastOf('edu_hab'),fmt:function(v){return num(Math.round(v),0)+' €'},def:'Dépenses publiques d’enseignement (de la maternelle à l’université, toutes administrations publiques) divisées par le nombre d’habitants, en euros courants.',src:'Eurostat gov_10a_exp (COFOG, GF09) et nama_10_pe, calcul Au plus Juste, données lues le 15 octobre 2026',note:'Un euro n’achète pas la même chose partout : à Luxembourg ou au Danemark, les salaires des enseignants et les prix sont plus élevés. Voir aussi l’indicateur en pouvoir d’achat. Certaines valeurs 2024 sont provisoires (Belgique, Allemagne, France, Espagne, Portugal, Slovaquie).'},
      {id:'edu_pps',lab:'Budget par habitant (pouvoir d’achat)',f:lastOf('edu_pps'),fmt:function(v){return num(Math.round(v),0)+' SPA'},def:'Même dépense par habitant, corrigée des écarts de prix entre pays (standard de pouvoir d’achat, SPA : 1 SPA achète la même chose partout dans l’Union).',src:'Eurostat gov_10a_exp, nama_10_pe et prc_ppp_ind_1 (niveau des prix du PIB, PPA fondées sur la COICOP 2018), calcul Au plus Juste, données lues le 16 octobre 2026',note:'Correction approximative : l’indice de prix utilisé porte sur l’ensemble du PIB, pas sur les seuls coûts de l’enseignement.'},
      {id:'edu_pib',lab:'Budget en % du PIB',f:cof('GF09'),fmt:pc,def:'Dépenses publiques d’enseignement en % de la richesse produite.',src:'Eurostat gov_10a_exp (COFOG)',bk:BK.gf09},
      {id:'edu_tot',lab:'Part du budget public',f:lastOf('edu_tot'),fmt:pc,def:'Dépenses publiques d’enseignement en % de l’ensemble des dépenses publiques : la priorité donnée à l’école dans le budget.',src:'Eurostat gov_10a_exp (COFOG, PC_TOT), données lues le 15 octobre 2026',bk:BK.edu_tot,note:'Un pays peut consacrer une grande part de son budget à l’enseignement tout en dépensant peu par habitant, si son budget public total est petit.'},
      {id:'tertiary',lab:'Diplômés du supérieur',f:lastOf('tertiary'),fmt:pc,def:'Part des 25-34 ans diplômés de l’enseignement supérieur.',src:'Eurostat sdg_04_20'},
      {id:'earlyleave',lab:'Sorties précoces',f:lastOf('earlyleave'),fmt:pc,def:'Part des 18-24 ans sans diplôme du secondaire supérieur et hors formation.',src:'Eurostat sdg_04_10'},
      {id:'adultlearn',lab:'Formation des adultes',f:lastOf('adultlearn'),fmt:pc,def:'Part des 25-64 ans ayant suivi une formation au cours des quatre dernières semaines.',src:'Eurostat sdg_04_60 (enquête sur les forces de travail)'}]},
    {th:'Climat et énergie',items:[
      {id:'ghg',lab:'Émissions nettes par habitant',f:lastOf('ghgnet'),fmt:function(v){return num(v,1)+' t'},def:'Gaz à effet de serre émis, moins ce qu’absorbent forêts et sols, en tonnes d’équivalent CO₂ par habitant.',src:'Eurostat sdg_13_10',note:'Les puits de carbone sont déduits : la Suède passe sous zéro grâce à ses forêts. Les émissions liées aux importations ne sont pas comptées.'},
      {id:'renew',lab:'Énergies renouvelables',f:lastOf('renew'),fmt:pc,def:'Part des renouvelables dans la consommation finale brute d’énergie.',src:'Eurostat nrg_ind_ren'}]}
  ];
  var RKX={};RK.forEach(function(t){t.items.forEach(function(it){it.th=t.th;RKX[it.id]=it})});
  colorSel.innerHTML='<option value="">Aucune couleur</option>'+RK.map(function(t){return '<optgroup label="'+t.th+'">'+t.items.map(function(it){return '<option value="'+it.id+'">'+it.lab+'</option>'}).join('')+'</optgroup>'}).join('');
  var rk={id:'debt',dir:-1};
  var MEM=Object.keys(C).filter(function(k){return k!==EU});
  function renderRanks(){
    var host=D.getElementById('rkL');if(!host)return;
    var it0=RKX[rk.id],it={};for(var kk in it0)it[kk]=it0[kk];it.fmt=function(v,c){return it0.id==='rating'?it0.fmt(v,c):it0.fmt(v)};
    var rows=MEM.map(function(c){var r=it.f(c);return {c:c,y:r&&r[0],v:r?r[1]:null}}).filter(function(r){return r.v!=null&&!isNaN(r.v)});
    var eu=it.f(EU);var euv=eu&&eu[1];if(it.id==='rating')euv=null;
    var sgnd=it.inv?1:-1;function ord(x,y){return (x-y)*sgnd*(rk.dir<0?1:-1)}rows.sort(function(a,b){return ord(a.v,b.v)});
    var yrs={};rows.forEach(function(r){yrs[r.y]=(yrs[r.y]||0)+1});var ys=Object.keys(yrs).sort();
    var vals=rows.map(function(r){return it.id==='rating'?11-r.v:r.v});if(euv!=null)vals.push(euv);
    var mn=Math.min(0,Math.min.apply(0,vals)),mx=Math.max.apply(0,vals),sp=(mx-mn)||1;
    function W(v){return (Math.abs(v)/(Math.max(Math.abs(mn),Math.abs(mx))))*100}
    var neg=mn<0;
    var html='';var euPlaced=euv==null;
    rows.forEach(function(r,i){
      if(!euPlaced&&ord(euv,r.v)<0){html+=euRow();euPlaced=true}
      var bv=it.id==='rating'?11-r.v:r.v,cls=r.c===st.a?' a':(r.c===st.b?' b':'');
      html+='<li class="rr'+cls+'" data-c="'+r.c+'"><button type="button" class="rrb" aria-label="'+name(r.c)+', '+it.fmt(r.v,r.c)+', rang '+(i+1)+'. Choisir ce pays sur la carte"></button><span class="n">'+(i+1)+'</span><span class="cn">'+name(r.c)+(ys.length>1?'<small>'+r.y+'</small>':'')+'</span><span class="bw'+(neg?' neg':'')+'"><span class="bar'+(bv<0?' m':'')+'" style="--w:'+W(bv).toFixed(1)+'%"></span></span><b class="vv">'+it.fmt(r.v,r.c)+'</b></li>';
    });
    if(!euPlaced)html+=euRow();
    function euRow(){return '<li class="rr eu"><span class="n"></span><span class="cn">Union européenne</span><span class="bw'+(neg?' neg':'')+'"><span class="bar'+(euv<0?' m':'')+'" style="--w:'+W(euv).toFixed(1)+'%"></span></span><b class="vv">'+it.fmt(euv)+'</b></li>'}
    D.getElementById('rkT').innerHTML=it.lab+'<span class="s">, '+(ys.length===1?ys[0]:ys[0]+'-'+ys[ys.length-1])+'.</span>';
    D.getElementById('rkK').textContent=it.th+' · '+rows.length+' pays classés';
    D.getElementById('rkD').innerHTML=it.def+' <span class="src">Source : '+linkify(it.src,it.bk)+' · '+CONSULT+'.'+(euv!=null?' La ligne « Union européenne » est la valeur de l’ensemble des 27 calculée pour l’Union entière (agrégat), pas la moyenne simple des pays.':'')+'</span>'+(it.note?'<span class="nt">'+it.note+'</span>':'')+dosLinks(it.id)+lexLinks(it.id);
    D.getElementById('rkDir').textContent=(rk.dir<0)?(it.inv?'Du mieux noté au moins bien noté':'Du plus élevé au plus bas'):(it.inv?'Du moins bien noté au mieux noté':'Du plus bas au plus élevé');
    var ol=D.getElementById('rkL');ol.innerHTML=html;ol.classList.remove('go');void ol.offsetWidth;ol.classList.add('go');
    ol.querySelectorAll('.rr[data-c]').forEach(function(li){function go(){var c=li.dataset.c;if(st.mode==='A'){st.a=c}else{if(c===st.a){}else if(!st.b)st.b=c;else st.b=c}update(true);renderRanks()}li.querySelector('.rrb').onclick=go});
    D.querySelectorAll('#rkI button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.id===rk.id)});
  }
  (function(){
    var th=D.getElementById('rkTh'),ii=D.getElementById('rkI');if(!th)return;
    var cur=RKX[rk.id].th;
    function tabs(){th.innerHTML=RK.map(function(t){return '<button type="button" aria-pressed="'+(t.th===cur)+'">'+t.th+'</button>'}).join('');
      th.querySelectorAll('button').forEach(function(b,i){b.onclick=function(){cur=RK[i].th;rk.id=RK[i].items[0].id;tabs();items();renderRanks()}})}
    function items(){var t=RK.filter(function(x){return x.th===cur})[0];ii.innerHTML=t.items.map(function(it){return '<button type="button" data-id="'+it.id+'">'+it.lab+'</button>'}).join('');
      ii.querySelectorAll('button').forEach(function(b){b.onclick=function(){rk.id=b.dataset.id;renderRanks()}})}
    tabs();items();
    D.getElementById('rkDir').onclick=function(){rk.dir=-rk.dir;renderRanks()};
    renderRanks();
  })();

  /* ======================= Démarrage ======================= */
  (function(){
    var h=location.hash||'',m;
    if((m=h.match(/^#pays-([A-Z]{2})$/))&&C[m[1]]){st.a=m[1]}
    else if((m=h.match(/^#comparer-([A-Z]{2})-([A-Z]{2})$/))&&C[m[1]]&&C[m[2]]&&m[1]!==m[2]){st.a=m[1];st.b=m[2];st.mode='C';D.getElementById('switch').classList.add('cmp');D.getElementById('mA').setAttribute('aria-pressed','false');D.getElementById('mC').setAttribute('aria-pressed','true');h1.innerHTML='Choisissez <span>deux pays.</span>';hint.textContent='un clic, puis un autre ←'}
    update(true);
  })();

/* menu déroulant Dossiers */
(function(){
  var b=document.getElementById('ddBtn'),p=document.getElementById('ddP');if(!b||!p)return;
  var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches,t;
  function set(o){p.hidden=!o;b.setAttribute('aria-expanded',o?'true':'false')}
  b.addEventListener('click',function(e){if(fine){set(false);return}e.preventDefault();set(p.hidden)});
  b.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();set(true);var f=p.querySelector('a');f&&f.focus()}});
  if(fine){[b,p].forEach(function(n){n.addEventListener('mouseenter',function(){clearTimeout(t);set(true)});n.addEventListener('mouseleave',function(){t=setTimeout(function(){set(false)},220)})})}
  p.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
  document.addEventListener('click',function(e){if(!p.hidden&&!e.target.closest('#ddP,#ddBtn'))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!p.hidden){set(false);b.focus()}});
})();

/* menu : soulignement de la rubrique en cours */
(function(){
  var map={atlas:'#atlas',dossier:'#atlas',classements:'#classements',dossiers:'#dossiers',methode:'#methode',apropos:'#apropos'};
  var links=[].slice.call(document.querySelectorAll('nav.top > a:not(.mark)'));
  function spy(){var y=innerHeight*.35,cur='#atlas';Object.keys(map).forEach(function(id){var n=document.getElementById(id);if(n&&n.offsetHeight&&n.getBoundingClientRect().top<=y)cur=map[id]});
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')===cur)})}
  addEventListener('scroll',function(){requestAnimationFrame(spy)},{passive:true});spy();
})();
