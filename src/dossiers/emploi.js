(function(){
  var D=document,H=D.documentElement,NS='http://www.w3.org/2000/svg',DATA=__DATA__;
  H.classList.add('js');
  function el(n,a,t){var e=D.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e}
  function fr(v,d){d=d==null?1:d;return v.toLocaleString('fr-BE',{minimumFractionDigits:d,maximumFractionDigits:d})}
  function nb(v){return Math.round(v).toLocaleString('fr-BE')}
  var MOB=innerWidth<640;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,calm=false;
  try{calm=localStorage.getItem('cj-a11y')==='1'}catch(e){}
  var ab=D.getElementById('a11y');
  function setCalm(on){calm=on;H.classList.toggle('calm',on);ab.setAttribute('aria-pressed',on);ab.querySelector('b').textContent=on?'Activé':'Désactivé';try{localStorage.setItem('cj-a11y',on?'1':'0')}catch(e){}}
  setCalm(calm);ab.addEventListener('click',function(){setCalm(!calm)});
  var T0=2015,T1=2025,TX='font-family:var(--sans);font-size:'+(MOB?14:15)+'px;fill:';

  /* 0. Le pari */
  (function(){
    var C=339000,I=576643,bs=D.querySelectorAll('.betb'),duel=D.getElementById('duel'),vd=D.getElementById('verdict');
    function count(n,to){if(calm||reduce){n.textContent=nb(to);return}var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-p,3);n.textContent=nb(to*e);if(p<1)requestAnimationFrame(f)})(t0)}
    bs.forEach(function(b){b.addEventListener('click',function(){
      bs.forEach(function(x){x.disabled=true;x.setAttribute('aria-pressed',x===b)});
      duel.hidden=false;count(D.getElementById('nC'),C);count(D.getElementById('nI'),I);
      var k=b.dataset.b;
      vd.innerHTML=(k==='i'?'Bien vu.':'Surprenant, non ?')+' Il y a environ 1,7 fois plus de personnes en invalidité que de chômeurs. Mais attention : <a href="#f-invalidite">on ne les compte pas de la même façon</a>.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;
    })});
  })();

  /* Courbes génériques */
  function lines(host,o){var T0=o.t0||2015,T1=o.t1||2025;CJD.series(host,o.series,T0);
    var W=o.w||(MOB?420:1000),Hh=o.h||(MOB?360:480),L=MOB?38:52,R=W-(o.w?(MOB?60:125):(MOB?70:150)),T=26,B=Hh-40,mn=o.min,mx=o.max,n=T1-T0;
    function X(y){return L+(y-T0)/n*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:o.grid}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+o.mute},fr(v,0)+' %'))});
    (o.years||[2015,2017,2019,2021,2023,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+o.mute},y))});
    if(o.breaks)(o.breaks.length?o.breaks:[2016.5,2020.5]).forEach(function(b){s.appendChild(el('line',{x1:X(b),x2:X(b),y1:T,y2:B,stroke:'#E2402B','stroke-dasharray':'2 6'}));s.appendChild(el('text',{x:X(b),y:T-6,'text-anchor':'middle',style:'font-size:18px;fill:#E2402B'},'×'))});
    var g=el('g',{});
    o.series.forEach(function(se,i){
      var pen=0,d=se.v.map(function(v,j){if(v==null){pen=0;return ''}var c=(pen?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1);pen=1;return c}).join(' ');
      var p=el('path',{d:d,fill:'none',stroke:se.c,'stroke-width':se.w||3,'stroke-linejoin':'round','stroke-linecap':'round','class':se.dash?'fadein':'drawline'});
      if(se.dash)p.setAttribute('stroke-dasharray','6 6');
      g.appendChild(p);
      var lv=se.v[se.v.length-1],ly=Y(lv)+(se.dy||0);
      g.appendChild(el('circle',{cx:X(T1),cy:Y(lv),r:5,fill:se.c,'class':'fadein'}));
      var t=el('text',{x:X(T1)+10,y:ly+5,'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+se.c},fr(lv)+' %'+(MOB?'':'  '+se.n));
      g.appendChild(t);
    });
    s.appendChild(g);host.innerHTML='';host.appendChild(s);
    if(host.classList.contains('play')){host.classList.remove('play');void host.offsetWidth;host.classList.add('play')}
    return s;
  }


  /* 0b. Histoire */
  (function(){
    var S=DATA.slope,box=D.getElementById('slopeChart'),W=MOB?400:1000,Hh=MOB?360:420,L=MOB?110:300,R=W-(MOB?110:300),T=30,B=Hh-40,mn=15,mx=85;
    CJD.set('slopeChart',['Groupe','1993 (%)','2025 (%)'],S.map(function(r){return [r[0],r[1],r[2]]}));
    function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Taux d’emploi 1993 et 2025 : femmes 48,9 puis 69,3 % ; 55-64 ans 22,2 puis 61,5 % ; ensemble 61,2 puis 72,8 % ; hommes 73,4 puis 76,4 %'});
    s.appendChild(el('text',{x:L,y:Hh-10,'text-anchor':'middle',style:'font-family:var(--serif);font-size:'+(MOB?20:26)+'px;fill:#A69C8F'},'1993'));
    s.appendChild(el('text',{x:R,y:Hh-10,'text-anchor':'middle',style:'font-family:var(--serif);font-size:'+(MOB?20:26)+'px;fill:#A69C8F'},'2025'));
    [L,R].forEach(function(x){s.appendChild(el('line',{x1:x,x2:x,y1:T-10,y2:B+8,stroke:'#3B332B','stroke-width':1.5}))});
    var C={'Femmes':'#EFA3CB','55-64 ans':'#7FB6A3','Ensemble':'#C9773A','Hommes':'#A69C8F'},g=el('g',{});
    var dl={'Femmes':[0,10],'55-64 ans':[0,0],'Ensemble':[0,-2],'Hommes':[0,-8]};
    S.forEach(function(r){var c=C[r[0]],o=dl[r[0]];
      g.appendChild(el('line',{x1:L,y1:Y(r[1]),x2:R,y2:Y(r[2]),stroke:c,'stroke-width':r[0]==='Ensemble'?5:3.5,'class':'drawline','stroke-linecap':'round'}));
      g.appendChild(el('circle',{cx:L,cy:Y(r[1]),r:6,fill:c,stroke:'#1E1914','stroke-width':2}));
      g.appendChild(el('circle',{cx:R,cy:Y(r[2]),r:6,fill:c,stroke:'#1E1914','stroke-width':2}));
      var fs=MOB?11.5:15;
      g.appendChild(el('text',{x:L-12,y:Y(r[1])+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:700;font-size:'+fs+'px;fill:'+c},(MOB?'':r[0]+' · ')+fr(r[1])+' %'));
      g.appendChild(el('text',{x:R+12,y:Y(r[2])+5+o[1],'text-anchor':'start',style:'font-family:var(--sans);font-weight:700;font-size:'+fs+'px;fill:'+c},fr(r[2])+' %'+(MOB?'':' · '+r[0])));
      if(MOB)g.appendChild(el('text',{x:(L+R)/2,y:(Y(r[1])+Y(r[2]))/2-7,'text-anchor':'middle',style:'font-family:var(--sans);font-weight:700;font-size:13px;fill:'+c},r[0]));
    });
    s.appendChild(g);box.appendChild(s);
  })();
  (function(){
    var host=D.getElementById('uChart'),V=DATA.uhist,T0=1993,T1=2025,W=MOB?420:1000,Hh=MOB?280:340,L=MOB?40:56,R=W-(MOB?50:100),T=34,B=Hh-36,mx=12;
    CJD.series(host,[{n:'Taux de chômage (%)',v:V}],T0,null,'Rupture de méthode en 2015 (ligne pointillée sur le graphique).');
    function X(y){return L+(y-T0)/(T1-T0)*(R-L)} function Y(v){return B-v/mx*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Chômage en Belgique 1993-2025 : 9,5 % au milieu des années 1990, 5,5 % en 2019 et 2023, 6,2 % en 2025'});
    [0,4,8,12].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:'#3B332B'}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+'#A69C8F'},v+' %'))});
    (MOB?[1993,2005,2015,2025]:[1993,1997,2001,2005,2009,2013,2017,2021,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-10,'text-anchor':'middle',style:TX+'#A69C8F'},y))});
    s.appendChild(el('line',{x1:X(2014.5),x2:X(2014.5),y1:T,y2:B,stroke:'#A69C8F','stroke-dasharray':'2 5'}));
    s.appendChild(el('text',{x:X(2014.5)+6,y:T-8,style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?15:20)+'px;fill:#EDE6DC'},'nouvelle méthode →'));
    var d=V.map(function(v,j){return (j?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
    s.appendChild(el('path',{d:d,fill:'none',stroke:'#C9773A','stroke-width':4,'stroke-linejoin':'round','class':'drawline'}));
    [[1994,9.5,'9,5 %'],[2019,5.5,'5,5 %'],[2025,6.2,'6,2 %']].forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:5.5,fill:'#C9773A',stroke:'#1E1914','stroke-width':2,'class':'fadein'}));s.appendChild(el('text',{x:x,y:y-12,'text-anchor':k[0]===2025?'end':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:#EDE6DC'},k[2]))});
    host.appendChild(s);
  })();
  /* 1. Taux d'emploi */
  (function(){
    var host=D.getElementById('empChart'),R=DATA.reg;
    var sets={
      reg:[{n:'Flandre',v:R.Flandre,c:'#7FB6A3'},{n:'Belgique',v:DATA.emp.BE,c:'#C9773A',w:4.5,dy:-2},{n:'Wallonie',v:R.Wallonie,c:'#F2A07B',dy:6},{n:'Bruxelles',v:R.Bruxelles,c:'#9C98F0',dy:6}],
      eu:[{n:'Union',v:DATA.emp.EU27_2020,c:'#A69C8F',dash:1},{n:'Belgique',v:DATA.emp.BE,c:'#C9773A',w:4.5}]};
    var bs=D.querySelectorAll('#empTg button');
    function draw(k){lines(host,{t0:1999,series:sets[k],min:55,max:80,ticks:[55,60,65,70,75,80],grid:'#3B332B',mute:'#A69C8F',breaks:[2000.5,2004.5,2010.5,2016.5,2020.5],years:MOB?[1999,2008,2017,2025]:[1999,2003,2007,2011,2015,2019,2025],label:k==='reg'?'Taux d’emploi 1999-2025 : Flandre de 67,4 à 77,3 %, Belgique de 64,3 à 72,8 %, Wallonie de 60,2 à 67,9 %, Bruxelles de 58,4 à 63,9 %':'Taux d’emploi : Belgique de 64,3 % en 1999 à 72,8 % en 2025 ; Union de 67,3 % en 2009 à 76,1 % en 2025'});bs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    bs.forEach(function(b){b.addEventListener('click',function(){draw(b.dataset.k)})});draw('reg');
    CJD.series(host,[{n:'Flandre',v:R.Flandre},{n:'Wallonie',v:R.Wallonie},{n:'Bruxelles',v:R.Bruxelles},{n:'Belgique',v:DATA.emp.BE},{n:'Union (depuis 2009)',v:DATA.emp.EU27_2020}],1999,null,'Ruptures de série signalées par Eurostat en 2001, 2005, 2011, 2017 et 2021 (1999 : début de la série).');
    CJD.set('empEU',['Pays','Taux d’emploi 2025 (%)'],DATA.eu27.slice().sort(function(a,b){return b[1]-a[1]}).map(function(c){return [c[0],c[1]]}),'Moyenne de l’Union : 76,1 %.');

    var dd=DATA.eu27.slice().sort(function(a,b){return a[1]-b[1]}),box=D.getElementById('empEU');
    var W=MOB?400:1000,row=MOB?22:24,T=8,L=MOB?96:150,R2=MOB?350:900,mn=60,mx=86,Hh=T+dd.length*row+30;
    function X(v){return L+(v-mn)/(mx-mn)*(R2-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Taux d’emploi 2025 des 27 pays, de l’Italie (67,6 %) à Malte (83,6 %). Belgique 72,8 %, 23e sur 27.'});
    [60,70,80].forEach(function(v){s.appendChild(el('line',{x1:X(v),x2:X(v),y1:T,y2:Hh-24,stroke:'#3B332B'}));s.appendChild(el('text',{x:X(v),y:Hh-6,'text-anchor':'middle',style:TX+'#A69C8F'},v+' %'))});
    var xe=X(76.1);s.appendChild(el('line',{x1:xe,x2:xe,y1:T,y2:Hh-24,stroke:'#EDE6DC','stroke-dasharray':'4 4'}));
    var g=el('g',{'class':'pills'});
    dd.forEach(function(c,i){var y=T+i*row+row/2,be=c[0]==='Belgique';
      g.appendChild(el('line',{x1:X(mn),x2:X(c[1]),y1:y,y2:y,stroke:be?'#C9773A':'#5A4F44','stroke-width':be?3:1.5,'class':'bar',style:'transition-delay:'+(i*0.025)+'s'}));
      g.appendChild(el('circle',{cx:X(c[1]),cy:y,r:be?7:5,fill:be?'#C9773A':'#EDE6DC',stroke:'#1E1914','stroke-width':2}));
      g.appendChild(el('text',{x:L-12,y:y+4,'text-anchor':'end',style:'font-family:var(--sans);font-weight:'+(be?700:500)+';font-size:'+(MOB?14:16)+'px;fill:'+(be?'#C9773A':'#EDE6DC')},c[0]+(c[0]==='Espagne'||c[0]==='France'?'*':'')));
      if(be||i===0||i===dd.length-1)g.appendChild(el('text',{x:X(c[1])+12,y:y+4,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:15)+'px;fill:'+(be?'#C9773A':'#EDE6DC')},fr(c[1])+' %'));
    });
    s.appendChild(g);
    s.appendChild(el('text',{x:xe+6,y:T+10,style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?17:22)+'px;fill:#EDE6DC'},'moyenne UE 76,1 %'));
    box.appendChild(s);
  })();


  /* 1b. Où se situe l'écart */
  (function(){
    var G=[['Diplômés du supérieur',86.0,86.8],['Femmes',69.3,71.3],['Nés dans le pays',75.0,77.2],['Hommes',76.4,80.9],['55-64 ans',61.5,66.4],['Diplôme du secondaire',67.8,75.1],['Nés hors de l’Union',60.7,68.6],['Peu diplômés',46.7,58.1]];
    var box=D.getElementById('gapChart'),W=MOB?400:1000,row=MOB?40:44,L=MOB?150:300,R=W-(MOB?20:120),T=24,Hh=T+G.length*row+16,mn=MOB?-16:-13,mx=1;
    CJD.set('gapChart',['Groupe','Belgique 2025 (%)','Union 2025 (%)','Écart (points)'],G.map(function(r){return [r[0],r[1],r[2],Math.round((r[1]-r[2])*10)/10]}));
    function X(v){return L+(v-mn)/(mx-mn)*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Écart de taux d’emploi Belgique moins Union en 2025 : supérieur -0,8 point, peu diplômés -11,4 points, nés hors UE -7,9, 55-64 ans -4,9'}),g=el('g',{'class':'pills'});
    [-12,-8,-4,0].forEach(function(v){s.appendChild(el('line',{x1:X(v),x2:X(v),y1:T-6,y2:Hh-10,stroke:v?'#3B332B':'#EDE6DC','stroke-width':v?1:1.5}));s.appendChild(el('text',{x:X(v),y:T-10,'text-anchor':'middle',style:TX+'#A69C8F'},(v?fr(v,0).replace('-','−'):'0')+(v?(MOB?'':' pt'):(MOB?'':' = moyenne UE'))))});
    G.forEach(function(r,i){var d=Math.round((r[1]-r[2])*10)/10,y=T+i*row,big=d<=-5;
      var x0=X(d),w=X(0)-x0;
      var rc=el('rect',{x:x0,y:y+8,width:Math.max(w,2),height:row-18,rx:(row-18)/2,fill:big?'#C9773A':'#EDE6DC','class':'bar',style:'transform-origin:right;transition-delay:'+(i*.06)+'s'});g.appendChild(rc);
      g.appendChild(el('text',{x:L-14,y:y+row/2+4,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:16)+'px;fill:#EDE6DC'},r[0]));
      g.appendChild(el('text',{x:x0-8,y:y+row/2+4,'text-anchor':'end',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+(big?'#C9773A':'#EDE6DC')},fr(d).replace('-','−')));
      if(!MOB)g.appendChild(el('text',{x:X(0)+12,y:y+row/2+4,style:'font-family:var(--sans);font-size:14px;fill:#A69C8F'},fr(r[1])+' % contre '+fr(r[2])+' %'));
    });
    s.appendChild(g);box.appendChild(s);
  })();

  /* 2. Invalidité */
  (function(){
    var Y=[['2008',null,null,250705],['2021',455996,29439],['2022',471927,30444],['2023',493681,32826],['2024',514551,35445],['2025',537728,38915]];
    var box=D.getElementById('invChart'),W=MOB?400:640,Hh=MOB?320:400,L=MOB?52:66,R=W-10,T=34,B=Hh-36,mx=600000;
    CJD.set('invChart',['Année','Salariés et chômeurs','Indépendants','Total'],Y.map(function(r){return [+r[0],r[1],r[2],r[3]||r[1]+r[2]]}),'2008 : total seul, sans ventilation.');
    function Yp(v){return B-v/mx*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Personnes en invalidité : 250 705 en 2008, 485 435 en 2021, 576 643 en 2025'});
    [0,200000,400000,600000].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Yp(v),y2:Yp(v),stroke:'rgba(26,26,26,.25)'}));s.appendChild(el('text',{x:L-8,y:Yp(v)+4,'text-anchor':'end',style:TX+'#1A1A1A'},v?nb(v/1000)+' k':'0'))});
    var n=Y.length,slot=(R-L)/n,bw=slot*.62,g=el('g',{'class':'seg-bar'});
    Y.forEach(function(r,i){var x=L+i*slot+(slot-bw)/2,tot=r[3]||r[1]+r[2];
      if(r[3]){g.appendChild(el('rect',{x:x,y:Yp(tot),width:bw,height:B-Yp(tot),fill:'#fff',stroke:'#1A1A1A','stroke-width':2,'stroke-dasharray':'5 4','class':'s'}))}
      else{g.appendChild(el('rect',{x:x,y:Yp(r[1]),width:bw,height:B-Yp(r[1]),fill:'#1A1A1A','class':'s'}));g.appendChild(el('rect',{x:x,y:Yp(tot),width:bw,height:Yp(r[1])-Yp(tot),fill:'#E2402B','class':'s'}))}
      g.appendChild(el('text',{x:x+bw/2,y:Yp(tot)-8,'text-anchor':'middle',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12.5:15)+'px;fill:#1A1A1A'},MOB?nb(tot/1000)+' k':nb(tot)));
      g.appendChild(el('text',{x:x+bw/2,y:Hh-14,'text-anchor':'middle',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:15)+'px;fill:#1A1A1A'},r[0]+(+r[0]>=2024?'*':'')));
    });
    s.appendChild(g);
    var gx=L+slot;s.appendChild(el('text',{x:gx,y:B-6,'text-anchor':'middle',style:'font-size:20px;fill:#1A1A1A'},'≈'));
    var lg=el('g',{});lg.appendChild(el('rect',{x:L,y:6,width:12,height:12,fill:'#1A1A1A'}));lg.appendChild(el('text',{x:L+18,y:16,style:TX+'#1A1A1A'},'salariés et chômeurs'));
    lg.appendChild(el('rect',{x:L+(MOB?190:205),y:6,width:12,height:12,fill:'#E2402B'}));lg.appendChild(el('text',{x:L+(MOB?208:223),y:16,style:TX+'#1A1A1A'},'indépendants'));
    s.appendChild(lg);
    box.appendChild(s);

    var RG=[['Flandre',267356],['Wallonie',205779],['Bruxelles',50741],['Étranger',13852]],rb=D.getElementById('invReg');
    CJD.set('invReg',['Région de résidence','Invalides salariés et chômeurs, 2025'],RG.map(function(r){return [r[0],r[1]]}));
    var W2=MOB?400:1000,row=36,L2=MOB?84:110,R2=W2-(MOB?70:110),H2=RG.length*row+8;
    var s2=el('svg',{viewBox:'0 0 '+W2+' '+H2,role:'img','aria-label':'Invalides salariés et chômeurs 2025 par Région : Flandre 267 356, Wallonie 205 779, Bruxelles 50 741, étranger 13 852'}),g2=el('g',{'class':'pills'});
    RG.forEach(function(r,i){var y=4+i*row,w=r[1]/270000*(R2-L2);
      g2.appendChild(el('rect',{x:L2,y:y+6,width:w,height:row-14,rx:(row-14)/2,fill:'#fff',stroke:'#1A1A1A','stroke-width':2,'class':'bar',style:'transition-delay:'+(i*.08)+'s'}));
      g2.appendChild(el('text',{x:L2-10,y:y+row/2+4,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:16)+'px;fill:#1A1A1A'},r[0]));
      g2.appendChild(el('text',{x:L2+w+10,y:y+row/2+4,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:#1A1A1A'},nb(r[1])));
    });
    s2.appendChild(g2);rb.appendChild(s2);
  })();

  /* 3. Durée et jeunes */
  (function(){
    function sm(id,k,mx,ticks,lab){lines(D.getElementById(id),{t0:2009,years:MOB?[2009,2017,2025]:[2009,2013,2017,2021,2025],w:MOB?420:600,h:MOB?300:340,series:[{n:'Union',v:DATA[k].EU27_2020,c:'#6A665F',dash:1,dy:k==='ltu'?10:0},{n:'Belgique',v:DATA[k].BE,c:'#E2402B',w:4,dy:k==='ltu'?-6:0}],min:0,max:mx,ticks:ticks,grid:'#D7D4CC',mute:'#6A665F',breaks:[2010.5,2016.5,2020.5],label:lab})}
    sm('ltuChart','ltu',6,[0,2,4,6],'Chômage de longue durée 2009-2025 : Belgique de 3,2 % à 2,0 %, avec un pic de 4,0 % en 2015 ; Union de 3,1 % à 1,9 %, pic de 5,4 % en 2013-2014');
    sm('youChart','youth',30,[0,10,20,30],'Chômage des 15-24 ans 2009-2025 : Belgique de 22,0 % à 17,4 %, Union de 21,2 % à 15,2 %, pic de 25,2 % en 2013');
  })();

  /* 4. Recherche */
  (function(){
    var Q=[
      {q:'L’accompagnement et la formation des chômeurs fonctionnent-ils ?',j:'Une méta-analyse de plus de 200 évaluations (Card, Kluve et Weber) établit ce profil d’effets ; deux évaluations belges de l’activation, de bon niveau (Maryland 3 et 4), vont dans le même sens.',c:'Des évaluations publiques des programmes d’Actiris ou du Forem montrant des effets nuls à moyen terme, ou une nouvelle méta-analyse aux conclusions contraires.',b:['b-et','Établi'],v:'En moyenne, les politiques actives ont peu d’effet à court terme, mais un effet positif deux à trois ans après. La formation paie surtout sur la durée.',
       st:[{a:'Card, Kluve et Weber, 2018',t:'Méta-analyse de plus de 200 évaluations',l:0,lt:'méta-analyse',p:'Effets proches de zéro à court terme, plus positifs après 2-3 ans. Gains plus nets pour les femmes et les chômeurs de longue durée, et en période de récession.',u:'https://academic.oup.com/jeea/article-abstract/16/3/894/4430618',s:'Journal of the European Economic Association'},
           {a:'Cockx et Dejemeppe, 2012',t:'Belgique, plan d’activation de 2004, seuil d’âge de 30 ans (régression sur discontinuité)',l:4,p:'L’annonce d’un futur contrôle de la recherche d’emploi augmente d’environ 9 points de pourcentage les sorties vers l’emploi huit mois plus tard, avant même le premier entretien. Pas d’effet sur les retraits du marché du travail ; la hausse de la participation aux formations n’est pas statistiquement significative.',u:'https://www.labourline.org/KENTIKA-19131347124919595299-Monitoring-job-search-effort-a.htm',s:'Labour Economics'},
           {a:'Cockx, Lechner et Bollens, 2019',t:'Flandre, chômeurs indemnisés suivis par le VDAB, entrées 2014-2016, suivi de 30 mois',l:3,p:'Les formations professionnelles courtes ajoutent en moyenne 3,4 mois d’emploi sur 30 mois ; les formations longues 1,0 mois ; les formations d’orientation retirent 1,4 mois (temps passé en formation plutôt qu’à chercher). Les gains sont plus élevés pour les migrants récents qui parlent peu le néerlandais (5,8 mois contre 2,1 pour les personnes nées en Belgique, formation courte).',u:'https://docs.iza.org/dp12875.pdf',s:'IZA, document de travail 12875'}],
       x:'Les évaluations belges disponibles portent sur le contrôle de la recherche d’emploi (2004) et sur les formations du VDAB en Flandre : l’efficacité des programmes d’Actiris et du Forem est peu évaluée publiquement, et un résultat flamand ne se transpose pas automatiquement à Bruxelles ou à la Wallonie.'},
      {q:'Réduire ou limiter les allocations accélère-t-il le retour à l’emploi ?',j:'La revue de Schmieder et von Wachter résume une littérature internationale abondante et convergente, d’où « Majoritaire ». L’évaluation belge de la dégressivité (ONEM, 2022) ne trouve pas d’effet sur l’emploi, d’où « Débattu en Belgique ».',c:'Une évaluation de la limitation dans le temps entrée en vigueur en 2026, ou des études belges de meilleur niveau (Maryland 3 ou plus) sur la dégressivité.',b:['b-ma','Majoritaire'],b2:['b-de','Débattu en Belgique'],v:'La plupart des études trouvent que des allocations plus longues ou plus élevées allongent la période sans emploi. Mais l’effet net dépend de ce que deviennent les personnes, et l’évaluation belge de la dégressivité (ONEM, 2022) ne trouve pas d’effet sur l’emploi.',
       st:[{a:'Schmieder et von Wachter, 2016',t:'Revue de la littérature récente',l:0,lt:'revue',p:'Les estimations récentes confirment des effets négatifs des allocations sur l’offre de travail, tout en avertissant qu’elles mesurent imparfaitement les « effets désincitatifs ».',u:'https://www.nber.org/papers/w22564',s:'Annual Review of Economics'},
           {a:'Nekoei et Weber, 2017',t:'Autriche, seuil d’âge',l:4,p:'Allonger la durée des allocations améliore la qualité de l’emploi retrouvé : meilleures entreprises, pertes de salaire plus faibles.',u:'https://research.ceu.edu/en/publications/does-extending-unemployment-benefits-improve-job-quality/',s:'American Economic Review'},
           {a:'Nuyts, Segaert et Votquenne (ONEM), 2022',t:'Belgique, dégressivité renforcée de 2012',l:2,p:'Pas davantage de sorties vers l’emploi ; celles-ci suivent surtout la conjoncture. Économie estimée : 148 millions d’euros sur 2012-2020 (somme de montants annuels en euros courants).',u:'https://socialsecurity.belgium.be/sites/default/files/content/docs/fr/publications/rbss/2022/02-dix-ans-de-degressivite-renforcee-des-allocations-de-chomage-une-evaluation.pdf',s:'Revue belge de sécurité sociale'},
           {a:'De Brouwer et Tojerow, 2023',t:'Belgique, données administratives 2005-2015',l:2,p:'Les auteurs trouvent des éléments indiquant que les réformes de l’assurance chômage des deux dernières décennies ont contribué à la hausse des entrées en invalidité depuis le chômage. Document de travail, pas encore publié en revue.',u:'https://ideas.repec.org/p/iza/izadps/dp16376.html',s:'IZA Discussion Paper, non publié en revue'}],
       x:'Peu étudié : la limitation dans le temps entrée en vigueur par vagues depuis le 1er janvier 2026 n’a pas encore été évaluée. Le nombre de personnes exclues n’est pas une évaluation : il ne dit pas combien ont retrouvé un emploi.'},
      {q:'Pourquoi le nombre de malades de longue durée augmente-t-il ?',j:'La hausse est mesurée sans ambiguïté par l’INAMI. Ses causes reposent sur des études descriptives et un document de travail, sans évaluation causale de chaque facteur.',c:'Des données reliant l’invalidité à l’emploi occupé avant, ou l’évaluation d’une réforme des règles d’incapacité de travail.',b:['b-de','Débattu'],v:'La hausse elle-même est établie. Ses causes le sont moins : le vieillissement et la composition de la population active n’en expliquent qu’une petite partie ; les troubles psychosociaux, les règles des autres régimes et les conditions de travail sont avancés, avec des preuves inégales.',
       st:[{a:'De Brouwer et Tojerow, 2023',t:'Belgique, 2005-2020',l:2,p:'Le taux d’invalidité de longue durée passe de 3,5 % à 6,8 %. L’âge, la participation et les caractéristiques des emplois « n’expliquent que marginalement » la hausse des entrées.',u:'https://ideas.repec.org/p/iza/izadps/dp16376.html',s:'IZA Discussion Paper'},
           {a:'INAMI, 2024',t:'Étude sur les troubles psychosociaux',l:0,lt:'étude descriptive',p:'Fin 2021, 36,4 % des invalidités sont dues à des troubles psychosociaux, en hausse de 31 % depuis 2016 ; les femmes représentent 59 % des personnes en invalidité.',u:'https://www.inami.fgov.be/SiteCollectionDocuments/PSYA_etude_avril_2024.pdf',s:'Institution publique'},
           {a:'OCDE, 2010',t:'Synthèse des pays de l’OCDE',l:0,lt:'synthèse',p:'Paradoxe commun aux pays riches : la santé moyenne s’améliore, mais davantage de personnes en âge de travailler vivent de prestations de maladie. Les règles et les incitants comptent.',u:'https://search.oecd.org/els/sickness-disability-and-work-breaking-the-barriers-9789264088856-en.htm',s:'Institution internationale'},
           {a:'Minne et Saks (BNB), 2023',t:'Belgique, enquête sur les forces de travail',l:0,lt:'étude descriptive',p:'La part des 50-64 ans qui se déclarent malades ou handicapés a augmenté à tous les âges entre 2005 et 2020, alors que l’on travaille plus longtemps.',u:'https://www.nbb.be/doc/ts/publications/economicreview/2023/ecorevi2023_h15.pdf',s:'Banque nationale de Belgique'}],
       x:'Ce qu’on ne sait pas encore bien : la part exacte des conditions de travail dans la hausse. Les données relient rarement l’invalidité à l’emploi occupé avant.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* 5. Lectures */
  (function(){
    var Lx=[
      ['Libérale classique','Milton Friedman','« The Role of Monetary Policy », 1968','Il existe un taux de chômage « naturel », fixé par les règles et les structures du marché du travail. Pour le réduire durablement, il faut changer ces règles, pas relancer la demande.','La durée des allocations, les écarts entre revenu d’activité et de remplacement.','Ce taux est inobservable et ses estimations varient beaucoup selon les modèles.','L'],
      ['Keynésienne','John Maynard Keynes','Théorie générale, 1936','Le chômage peut être involontaire et durable quand la demande est insuffisante : les chômeurs ne choisissent pas de l’être.','La conjoncture : l’ONEM constate que les sorties vers l’emploi suivent l’activité économique.','N’explique pas pourquoi des emplois restent vacants quand la demande est forte.','O'],
      ['Sociale-démocrate','Gøsta Esping-Andersen','The Three Worlds of Welfare Capitalism, 1990','Un État social juste permet de vivre dignement sans dépendre entièrement du marché (« démarchandisation »). La Belgique est souvent rangée parmi les régimes continentaux, fondés sur l’assurance liée au travail.','Le niveau des allocations et la pauvreté des personnes sans emploi.','Une protection forte peut éloigner durablement de l’emploi ceux qu’elle protège.','S'],
      ['Conservatrice','Lawrence Mead','Beyond Entitlement, 1986','L’aide publique doit s’accompagner d’obligations : travailler ou chercher un emploi est un devoir de citoyen, et l’État peut l’exiger.','Les contrôles, l’activation et la réciprocité des droits et des devoirs.','Suppose que le problème est le comportement, alors qu’il peut venir du manque d’emplois ou de la santé.','C'],
      ['Démocrate-chrétienne','Pie XI','Quadragesimo anno, 1931','Principe de subsidiarité : l’échelon le plus proche (famille, associations, partenaires sociaux) doit agir d’abord, l’État en soutien. En Belgique, syndicats et employeurs participent à la gestion de la sécurité sociale.','Le rôle des syndicats, des mutualités et de la concertation sociale.','La multiplication des acteurs dilue les responsabilités et complique les réformes.','C'],
      ['Institutionnaliste','Peter Doeringer et Michael Piore','Internal Labor Markets and Manpower Analysis, 1971','Le marché du travail est coupé en deux : des emplois stables et protégés, et des emplois précaires d’où l’on sort difficilement.','Les écarts selon le diplôme, l’origine, l’âge et la Région.','Décrit la segmentation mieux qu’il n’explique comment en sortir.','O'],
      ['Marxiste','Karl Marx','Le Capital, livre I, 1867','L’« armée industrielle de réserve » des sans-emploi pèse sur les salaires de ceux qui travaillent : le chômage remplit une fonction.','Le rapport de force entre salariés et employeurs, l’évolution des salaires.','Difficile à tester, et peu attentif au rôle des institutions sociales modernes.','K'],
      ['Écologiste','André Gorz','Métamorphoses du travail, 1988','Le travail salarié ne doit plus être le centre de la vie : il faut réduire et partager le temps de travail pour libérer du temps.','Le temps partiel, la durée du travail, l’activité hors emploi.','Le coût et la faisabilité d’une réduction générale du temps de travail sont contestés.','E'],
      ['Sociologie de l’expérience','Marie Jahoda, Paul Lazarsfeld et Hans Zeisel','Les chômeurs de Marienthal, 1933','Le chômage prolongé ne pousse pas à la révolte mais à la résignation : il défait le rythme du temps et le lien social.','La durée du chômage, et le lien avec la santé mentale et l’invalidité.','Étude d’un seul village dans les années 1930 : sa généralisation demande prudence.','O']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* 6. Citer */
  (function(){
    var T={emp:'En 2025, 72,8 % des Belges de 20 à 64 ans avaient un emploi, contre 76,1 % dans l’Union européenne : la Belgique est 23e sur 27 (Eurostat, lfsi_emp_a).',
      inv:'Au 31 décembre 2025, 576 643 personnes étaient en invalidité en Belgique (salariés, chômeurs et indépendants), contre 485 435 fin 2021 (INAMI, chiffres provisoires).',
      reg:'En 2025, le taux d’emploi des 20-64 ans était de 77,3 % en Flandre, 67,9 % en Wallonie et 63,9 % à Bruxelles, selon le lieu de résidence (Eurostat, lfst_r_lfe2emprt).',
      alm:'Selon une méta-analyse de plus de 200 évaluations, les politiques actives de l’emploi ont peu d’effet à court terme mais un effet positif deux à trois ans après (Card, Kluve et Weber, 2018).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('emp');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  /* Révélations */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','slopeChart','uChart','empChart','gapChart','empEU','invChart','invReg','ltuChart','youChart'].forEach(function(id){io.observe(D.getElementById(id))});
  /* Titre lettre à lettre */
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  /* Curseur */
  (function(){
  })();
})();
