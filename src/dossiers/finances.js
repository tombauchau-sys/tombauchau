(function(){
  var D=document,H=D.documentElement,NS='http://www.w3.org/2000/svg',DATA=__DATA__;
  H.classList.add('js');
  function el(n,a,t){var e=D.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e}
  function fr(v,d){d=d==null?1:d;return v.toLocaleString('fr-BE',{minimumFractionDigits:d,maximumFractionDigits:d})}
  function sg(v,d){return (v<0?'−':v>0?'+':'')+fr(Math.abs(v),d)}
  var MOB=innerWidth<640;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,calm=false;
  try{calm=localStorage.getItem('cj-a11y')==='1'}catch(e){}
  var ab=D.getElementById('a11y');
  function setCalm(on){calm=on;H.classList.toggle('calm',on);ab.setAttribute('aria-pressed',on);ab.querySelector('b').textContent=on?'Activé':'Désactivé';try{localStorage.setItem('cj-a11y',on?'1':'0')}catch(e){}}
  setCalm(calm);ab.addEventListener('click',function(){setCalm(!calm)});
  var TX='font-family:var(--sans);font-size:'+(MOB?14:15)+'px;fill:';

  /* 0. Seuil */
  (function(){
    var g=D.getElementById('guess'),go=D.getElementById('gOut'),vd=D.getElementById('verdict'),V=14.3;
    g.addEventListener('input',function(){go.textContent=fr(+g.value)+' Md€'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value,a=Math.abs(v-V);
      vd.innerHTML=(a<1.5?'Bien vu : ':'Vous avez dit '+fr(v)+' milliards. ')+'C’est 14,5 milliards d’euros en 2025, environ 1 200 € par habitant. En 2024, les intérêts (13,6 milliards) dépassaient déjà les dépenses de défense (environ 8 milliards).<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='14,3 Md€';g.value=V;
    });
  })();

  /* Courbes */
  function lines(host,o){CJD.series(host,o.series,o.t0||T0);
    var T0=o.t0,T1=o.t1,n=T1-T0,W=MOB?420:1000,Hh=o.h||(MOB?360:480),L=MOB?40:56,R=W-(MOB?70:140),T=26,B=Hh-40,mn=o.min,mx=o.max;
    function X(y){return L+(y-T0)/n*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:o.grid}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+o.mute},fr(v,0).replace('-','−')+' %'))});
    o.years.forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+o.mute},y))});
    (o.refs||[]).forEach(function(r){s.appendChild(el('line',{x1:L,x2:R,y1:Y(r.v),y2:Y(r.v),stroke:r.c,'stroke-width':2,'stroke-dasharray':'3 5'}));s.appendChild(el('text',{x:L+6,y:Y(r.v)+(r.dy||-8),style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+r.c},r.t))});
    (o.events||[]).forEach(function(e){var x=X(e.y);s.appendChild(el('line',{x1:x,x2:x,y1:T,y2:B,stroke:o.grid,'stroke-dasharray':'2 5'}));if(!MOB||e.m)s.appendChild(el('text',{x:x+6,y:T+12,style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?16:22)+'px;fill:'+o.ink},e.t))});
    var g=el('g',{});
    o.series.forEach(function(se){
      var pen=0,d=se.v.map(function(v,j){if(v==null){pen=0;return ''}var c=(pen?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1);pen=1;return c}).join(' ');
      var p=el('path',{d:d,fill:'none',stroke:se.c,'stroke-width':se.w||3,'stroke-linejoin':'round','stroke-linecap':'round','class':se.dash?'fadein':'drawline'});
      if(se.dash)p.setAttribute('stroke-dasharray','6 6');g.appendChild(p);
      var lv=se.v[se.v.length-1];
      g.appendChild(el('circle',{cx:X(T1),cy:Y(lv),r:5,fill:se.c,'class':'fadein'}));
      g.appendChild(el('text',{x:X(T1)+10,y:Y(lv)+5+(se.dy||0),'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+se.c},fr(lv).replace('-','−')+' %'+(MOB?'':'  '+se.n)));
    });
    s.appendChild(g);host.appendChild(s);
  }


  /* 0b. Histoire 1980-2025 */
  (function(){
    var host=D.getElementById('histChart'),V=DATA.hist,T0=1980,T1=2025,W=MOB?420:1000,Hh=MOB?340:440,L=MOB?40:56,R=W-(MOB?50:110),T=40,B=Hh-40,mn=60,mx=150;
    CJD.series(host,[{n:'Dette publique belge (% du PIB)',v:V}],T0);
    function X(y){return L+(y-T0)/(T1-T0)*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dette publique belge 1980-2025 : 76,8 % en 1980, pic de 138,9 % en 1993, 87,3 % en 2007, 108,1 % en 2025'});
    [[1980,1993,'boule de neige','rgba(226,64,43,.16)'],[1993,2007,'assainissement','rgba(127,182,163,.18)'],[2008,2011,'banques','rgba(201,119,58,.18)'],[2020,2021,'Covid','rgba(201,119,58,.18)']].forEach(function(p){
      s.appendChild(el('rect',{x:X(p[0]),y:T,width:X(p[1])-X(p[0]),height:B-T,fill:p[3]}));
      if(!MOB||p[0]<2000)s.appendChild(el('text',{x:(X(p[0])+X(p[1]))/2,y:T-10,'text-anchor':'middle',style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?15:22)+'px;fill:#EDE6DC'},p[2]))});
    [60,90,120,150].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:'#3B332B'}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+'#A69C8F'},v+' %'))});
    (MOB?[1980,1995,2010,2025]:[1980,1985,1990,1995,2000,2005,2010,2015,2020,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+'#A69C8F'},y))});
    var d=V.map(function(v,j){return (j?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
    s.appendChild(el('path',{d:d,fill:'none',stroke:'#C9773A','stroke-width':4.5,'stroke-linejoin':'round','class':'drawline'}));
    [[1993,138.9,'138,9 %',-14],[2007,87.3,'87,3 %',24],[2025,108.1,'108,1 %',-12],[1980,76.8,'76,8 %',-12]].forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:6,fill:'#C9773A',stroke:'#1E1914','stroke-width':2.5,'class':'fadein'}));s.appendChild(el('text',{x:x,y:y+k[3],'text-anchor':k[0]===2025?'end':k[0]===1980?'start':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:#EDE6DC'},k[2]))});
    host.appendChild(s);
  })();
  /* 1. Dette */
  lines(D.getElementById('debtChart'),{t0:1980,t1:2025,min:50,max:145,ticks:[60,80,100,120,140],grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',years:MOB?[1980,1995,2010,2025]:[1980,1985,1990,1995,2000,2005,2010,2015,2020,2025],
    refs:[{v:60,c:'#E2402B',t:'60 % : valeur de référence européenne',dy:16}],events:[{y:1992,t:'Maastricht'},{y:2008,t:'crise financière'},{y:2020,t:'pandémie',m:1}],
    series:[{n:'Union',v:DATA.debtL.EU,c:'#A69C8F',dash:1},{n:'Belgique',v:DATA.debtL.BE,c:'#C9773A',w:4.5}],label:'Dette publique 1980-2025 : Belgique de 76,8 % du PIB en 1980 à 138,9 % en 1993, 87,5 % en 2007 et 108,1 % en 2025 ; Union (depuis 1995) de 70,6 % à 81,5 %'});
  CJD.rename('debtChart',['Union (% du PIB ; 1995-1999 : FMI)','Belgique (% du PIB ; 1980-1994 : FMI)'],'1980-1994 (Belgique) et 1995-1999 (Union) : FMI ; ensuite Eurostat. Les deux sources concordent pour la Belgique en 1995 (131,3 % et 131,5 %).');

  (function(){
    var S=DATA.sub.debt,box=D.getElementById('subChart'),W=MOB?400:1000,row=MOB?58:54,L=MOB?120:250,R=W-(MOB?50:110),mx=95,Hh=S.length*row+30;
    CJD.set('subChart',['Niveau de pouvoir','2015 (% du PIB)','2025 (% du PIB)'],S.map(function(r){return [r[0],r[2],r[1]]}));
    function X(v){return L+v/mx*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dette par niveau de pouvoir, 2015 et 2025 : fédéral 89,2 puis 86,9 % du PIB ; Communautés et Régions 12,6 puis 20,4 % ; pouvoirs locaux 5,9 puis 4,3 % ; sécurité sociale 2,0 puis 0,1 %'}),g=el('g',{'class':'pills'});
    S.forEach(function(r,i){var y=i*row+6,hh=(row-16)/2;
      g.appendChild(el('rect',{x:L,y:y,width:Math.max(2,X(r[2])-L),height:hh,rx:hh/2,fill:'none',stroke:'#A69C8F','stroke-width':1.5,'class':'bar'}));
      g.appendChild(el('rect',{x:L,y:y+hh+3,width:Math.max(2,X(r[1])-L),height:hh,rx:hh/2,fill:i===1?'#C9773A':'#EDE6DC','class':'bar',style:'transition-delay:.15s'}));
      g.appendChild(el('text',{x:L-12,y:y+hh+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:16)+'px;fill:#EDE6DC'},r[0]));
      g.appendChild(el('text',{x:X(r[2])+8,y:y+hh-2,style:TX+'#A69C8F'},'2015 : '+fr(r[2])+' %'));
      g.appendChild(el('text',{x:X(r[1])+8,y:y+2*hh+1,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+(i===1?'#C9773A':'#EDE6DC')},'2025 : '+fr(r[1])+' %'));
    });
    s.appendChild(g);box.appendChild(s);
  })();

  /* 2. Déficit */
  (function(){
    var box=D.getElementById('defChart'),T0=1980,T1=2025,W=MOB?420:1000,Hh=MOB?340:440,L=MOB?40:56,R=W-(MOB?60:130),T=20,B=Hh-40,mn=-17,mx=1;
    CJD.series(box,[{n:'Belgique (% du PIB ; 1980-1994 : FMI)',v:DATA.defL.BE},{n:'Union (% du PIB ; 1991-1999 : FMI)',v:DATA.defL.EU}],T0,null,'1980-1994 (Belgique) et 1991-1999 (Union) : FMI, Perspectives de l’économie mondiale ; ensuite Eurostat. Pour la Belgique, les deux sources sont identiques de 1995 à 2025.');
    function X(y){return L+(y-T0+.5)/(T1-T0+1)*(R-L)} function Y(v){return T+(mx-v)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Solde public 1980-2025 : Belgique −16,0 % en 1981, proche de l’équilibre entre 2000 et 2007, −9,0 % en 2020, −5,2 % en 2025 ; Union −3,1 % en 2025'});
    [0,-3,-6,-9,-12,-15].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:v===-3?'#E2402B':'#D7D4CC','stroke-width':v===-3?2:1,'stroke-dasharray':v===-3?'3 5':''}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+'#6A665F'},(v?'−'+Math.abs(v):'0')+' %'))});
    var bw=(R-L)/(T1-T0+1)*.62,g=el('g',{'class':'seg-bar'});
    DATA.defL.BE.forEach(function(v,i){var x=X(T0+i)-bw/2,y0=Y(0),y1=Y(v);g.appendChild(el('rect',{x:x,y:Math.min(y0,y1),width:bw,height:Math.max(1.5,Math.abs(y1-y0)),fill:v<-3?'#E2402B':'#1A1A1A','class':'s',style:'transform-origin:top'}))});
    s.appendChild(g);
    var pen=0,d=DATA.defL.EU.map(function(v,j){if(v==null){pen=0;return ''}var c=(pen?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1);pen=1;return c}).join(' ');
    s.appendChild(el('path',{d:d,fill:'none',stroke:'#6A665F','stroke-width':2.5,'stroke-dasharray':'6 5','class':'fadein'}));
    (MOB?[1980,1995,2010,2025]:[1980,1985,1990,1995,2000,2005,2010,2015,2020,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+'#6A665F'},y))});
    s.appendChild(el('line',{x1:X(1994.5),x2:X(1994.5),y1:T,y2:B,stroke:'#6A665F','stroke-dasharray':'2 5'}));s.appendChild(el('text',{x:X(1994.5)+6,y:B-8,style:'font-family:var(--sans);font-size:'+(MOB?12:14)+'px;fill:#6A665F'},'← FMI · Eurostat →'));
    s.appendChild(el('text',{x:X(2025)+bw,y:Y(-5.2)+5,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:#E2402B'},'−5,2 %'+(MOB?'':' Belgique')));
    s.appendChild(el('text',{x:X(2025)+bw,y:Y(-3.1)-6,'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:#6A665F'},'−3,1 %'+(MOB?'':' Union')));
    s.appendChild(el('text',{x:X(1997),y:Y(-3)+18,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?13:16)+'px;fill:#E2402B'},MOB?'−3 % : réf.':'−3 % : valeur de référence'));
    box.appendChild(s);
  })();

  function hbars(id,rows,o){CJD.set(id,['Catégorie','Valeur'],rows.map(function(r){return [r[0],r[1]]}));
    var box=D.getElementById(id),W=MOB?420:600,row=o.row||(MOB?40:44),L=MOB?170:215,R=W-(MOB?60:70),mn=o.min,mx=o.max,Hh=rows.length*row+26;
    function X(v){return L+(v-mn)/(mx-mn)*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label}),g=el('g',{'class':'pills'});
    if(mn<0){s.appendChild(el('line',{x1:X(0),x2:X(0),y1:0,y2:Hh-20,stroke:'#1A1A1A','stroke-width':1.5}))}
    rows.forEach(function(r,i){var y=i*row+4,h=row-14,v=r[1],x0=X(Math.min(0,v)),x1=X(Math.max(0,v));
      g.appendChild(el('rect',{x:x0,y:y,width:Math.max(2,x1-x0),height:h,rx:h/2,fill:r[2]||'#fff',stroke:'#1A1A1A','stroke-width':2,'class':'bar',style:'transform-origin:'+(v<0?'right':'left')}));
      g.appendChild(el('text',{x:L-10,y:y+h/2+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:16)+'px;fill:#1A1A1A'},r[0]));
      g.appendChild(el('text',{x:v<0?X(0)+8:x1+8,y:y+h/2+5,'text-anchor':'start',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:15)+'px;fill:#1A1A1A'},(o.signed?sg(v):fr(v))+' %'));
    });
    s.appendChild(g);box.appendChild(s);
  }
  var SD=DATA.sub.def.map(function(r){return [r[0],r[1],r[1]<-1?'#E2402B':'#fff']});
  hbars('subDef',SD,{min:-4.8,max:0.6,signed:1,label:'Solde 2025 par niveau de pouvoir : fédéral −3,7 % du PIB, Communautés et Régions −1,4 %, pouvoirs locaux −0,1 %, sécurité sociale 0,0 %'});
  CJD.rename('subDef',['Solde 2025 (% du PIB)']);
  hbars('revExp',[['Recettes · Belgique',49.0,'#7FB6A3'],['Recettes · Union',46.4,'#fff'],['Dépenses · Belgique',54.2,'#E2402B'],['Dépenses · Union',49.5,'#fff']],{min:0,max:62,label:'Recettes et dépenses publiques 2025 : Belgique 49,0 % et 54,2 % du PIB ; Union 46,4 % et 49,5 %'});
  CJD.rename('revExp',['2025 (% du PIB)']);

  /* 3. COFOG */
  (function(){
    var F=[['GF10','Protection sociale','Protection sociale'],['GF07','Santé','Santé'],['GF01','Services généraux (dont intérêts)','Services généraux*'],['GF04','Affaires économiques','Affaires éco.'],['GF09','Enseignement','Enseignement'],['GF03','Ordre et sécurité publics','Ordre public'],['GF02','Défense','Défense'],['GF05','Environnement','Environnement'],['GF08','Loisirs, culture, cultes','Culture, loisirs'],['GF06','Logement et équipements','Logement']];
    var box=D.getElementById('cofChart'),W=MOB?400:1000,row=MOB?46:44,L=MOB?120:290,R=W-(MOB?20:150),mx=MOB?30:26,Hh=F.length*row+36;
    CJD.set('cofChart',['Fonction (COFOG)','Belgique 2024 (% du PIB)','Union 2024 (% du PIB)'],F.map(function(f){return [f[1],DATA.cofBE[f[0]],DATA.cofEU[f[0]]]}).concat([['Total',DATA.cofBE.TOTAL,DATA.cofEU.TOTAL]]));
    function X(v){return L+v/mx*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dépenses publiques par fonction 2024, Belgique et Union, en % du PIB : protection sociale 20,4 contre 19,6 ; santé 8,0 contre 7,3 ; enseignement 6,3 contre 4,7'}),g=el('g',{'class':'pills'});
    [0,5,10,15,20].forEach(function(v){s.appendChild(el('line',{x1:X(v),x2:X(v),y1:4,y2:Hh-28,stroke:'rgba(26,26,26,.2)'}));s.appendChild(el('text',{x:X(v),y:Hh-10,'text-anchor':'middle',style:TX+'#1A1A1A'},v+' %'))});
    F.forEach(function(f,i){var y=i*row+row/2+2,be=DATA.cofBE[f[0]],eu=DATA.cofEU[f[0]],d=Math.round((be-eu)*10)/10;
      g.appendChild(el('line',{x1:X(Math.min(be,eu)),x2:X(Math.max(be,eu)),y1:y,y2:y,stroke:'#1A1A1A','stroke-width':3,'class':'bar'}));
      g.appendChild(el('circle',{cx:X(eu),cy:y,r:MOB?6:7,fill:'#fff',stroke:'#1A1A1A','stroke-width':2.5}));
      g.appendChild(el('circle',{cx:X(be),cy:y,r:MOB?7:8,fill:'#E2402B',stroke:'#1A1A1A','stroke-width':2.5}));
      g.appendChild(el('text',{x:L-14,y:y+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?14:17)+'px;fill:#1A1A1A'},MOB?f[2]:f[1]));
      g.appendChild(el('text',{x:X(Math.max(be,eu))+14,y:y+5,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:17)+'px;fill:#1A1A1A'},fr(be)+(MOB?'':' % contre '+fr(eu)+' %')+'  ('+sg(d)+')'));
    });
    s.appendChild(g);
    var lg=el('g',{});lg.appendChild(el('circle',{cx:L+8,cy:Hh-44+30,r:0}));box.appendChild(s);
    var key=D.createElement('p');key.className='key-dots';key.innerHTML='<span class="kd be"></span> Belgique <span class="kd eu"></span> Union européenne · entre parenthèses : l’écart en points'+(MOB?' · * dont intérêts de la dette':'');box.appendChild(key);
  })();

  /* 4. Intérêts : euros courants et euros constants de 2025 (déflateur : IPCH, Eurostat prc_hicp_ainr, 2025 = 100) */
  (function(){
    var I=DATA.int,P=DATA.ipch,Y0=DATA.intY0,box=D.getElementById('intChart'),W=MOB?420:1000,Hh=MOB?330:420,L=MOB?44:60,R=W-20,T=MOB?62:48,B=Hh-34,mx=38000,n=I.length;
    var K=I.map(function(v,i){return v*100/P[i]});
    CJD.set('intChart',['Année','Intérêts, millions d’euros courants','IPCH Belgique (2025 = 100)','Intérêts, millions d’euros de 2025 (calcul Au plus Juste)'],I.map(function(v,i){return [Y0+i,v,P[i],Math.round(K[i]*10)/10]}),'Rupture de série en 2009 (Eurostat). 2024 et 2025 provisoires.');
    function Y(v){return B-v/mx*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Intérêts payés 1996-2025. En euros courants : 18,9 milliards en 1996, 12,4 en 2015, 8,6 en 2021, 14,3 en 2025. En euros de 2025, inflation déduite : 36,3 milliards en 1996, 16,8 en 2015, 10,4 en 2021, 14,3 en 2025.'}),g=el('g',{'class':'seg-bar'});
    [0,10000,20000,30000].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:'#3B332B'}));s.appendChild(el('text',{x:L-8,y:Y(v)+4,'text-anchor':'end',style:TX+'#A69C8F'},v/1000+' Md'))});
    var C1='#A69C8F',C2='#C9773A',lab=function(x,y,t,c){g.appendChild(el('text',{x:x,y:y,'text-anchor':'middle',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?13:15)+'px;fill:'+c},t))};
    var lg=el('g',{}),ly=MOB?8:10;
    lg.appendChild(el('rect',{x:L,y:ly,width:12,height:12,fill:C1}));lg.appendChild(el('text',{x:L+18,y:ly+11,style:TX+'#EDE6DC'},'euros courants (de chaque année)'));
    var lx2=MOB?L:L+300,ly2=MOB?ly+24:ly;
    lg.appendChild(el('rect',{x:lx2,y:ly2,width:12,height:12,fill:C2}));lg.appendChild(el('text',{x:lx2+18,y:ly2+11,style:TX+'#EDE6DC'},'euros de 2025 (inflation déduite)'));
    s.appendChild(lg);
    var slot=(R-L)/n,bw=slot*(MOB?.36:.38),gap=slot*.04;
    I.forEach(function(v,i){var y=Y0+i,x0=L+i*slot+(slot-2*bw-gap)/2,x1=x0+bw+gap,k=K[i],show=MOB?(y===1996||y===2021||y===2025):(y===1996||y===2008||y===2015||y===2021||y===2025);
      g.appendChild(el('rect',{x:x0,y:Y(v),width:bw,height:B-Y(v),fill:C1,'class':'s',style:'transform-origin:bottom'}));
      g.appendChild(el('rect',{x:x1,y:Y(k),width:bw,height:B-Y(k),fill:C2,'class':'s',style:'transform-origin:bottom'}));
      if(show){
        if(Math.abs(k-v)<50)lab(x0+bw+gap/2,Y(k)-8,fr(k/1000),'#EDE6DC');
        else if(MOB){lab(x1+bw/2,Y(k)-8,fr(k/1000),C2);var cx=x0+bw/2+4,cy=Y(v)+8;g.appendChild(el('text',{x:cx,y:cy,'text-anchor':'end',transform:'rotate(-90 '+cx+' '+cy+')',style:'font-family:var(--sans);font-weight:700;font-size:12px;fill:#1E1914'},fr(v/1000)))}
        else{lab(x1+bw/2+2,Y(k)-8,fr(k/1000),C2);lab(x0+bw/2-2,Y(v)-8,fr(v/1000),C1)}
      }
      if(y%(MOB?10:5)===0||y===2025||y===1996)g.appendChild(el('text',{x:L+i*slot+slot/2,y:Hh-12,'text-anchor':'middle',style:TX+'#A69C8F'},y+(y>=2024?'*':'')));
    });
    s.appendChild(g);box.appendChild(s);
  })();


  /* 4b. Investissement */
  lines(D.getElementById('invChart'),{t0:1995,t1:2025,min:1.5,max:4.5,ticks:[2,3,4],grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',years:MOB?[1995,2005,2015,2025]:[1995,2000,2005,2010,2015,2020,2025],
    events:[{y:2008,t:'écart max. : 1,7 pt'}],
    series:[{n:'Union',v:DATA.inv.EU,c:'#6A665F',dash:1,dy:-4},{n:'Belgique',v:DATA.inv.BE,c:'#E2402B',w:4.5,dy:4}],label:'Investissement public 1995-2025 : Belgique de 2,2 % à 3,1 % du PIB, Union (depuis 2000) de 3,3 % à 3,9 %'});
  CJD.rename('invChart',['Union (% du PIB, depuis 2000)','Belgique (% du PIB)'],'Rupture de série en 2009 ; 2024-2025 provisoires. Eurostat ne publie pas l’agrégat de l’Union avant 2000.');

  /* 4b. Dynamique, détenteurs, taux (fiches 06-08) */
  (function(){
    var Y1=MOB?[1996,2008,2025]:[1996,2001,2006,2011,2016,2021,2025],RG=DATA.rg;
    function sm(id,o){var h=D.getElementById(id);var W0=MOB;lines(h,{t0:1996,t1:2025,years:Y1,h:MOB?300:360,series:o.series,min:o.min,max:o.max,ticks:o.ticks,grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',refs:o.refs,label:o.label})}
    sm('rgChart',{series:[{n:'croissance nominale',v:RG.g,c:'#A69C8F',dash:1,dy:-8},{n:'taux apparent',v:RG.r,c:'#C9773A',w:4,dy:12}],min:-4,max:12,ticks:[-4,0,4,8,12],label:'Taux d’intérêt apparent de la dette belge, de 6,5 % en 1996 à 2,3 % en 2025 (minimum 1,6 % en 2022) ; croissance du PIB nominal, de −3,3 % en 2020 à 11,0 % en 2022, 3,5 % en 2025'});
    sm('pbChart',{series:[{n:'solde primaire',v:RG.pb,c:'#C9773A',w:4}],min:-8,max:8,ticks:[-8,-4,0,4,8],refs:[{v:0,c:'#EDE6DC',t:'équilibre',dy:-8}],label:'Solde primaire de la Belgique, en % du PIB : excédent de 4,6 % en 1996 et 6,8 % en 2001, −7,1 % en 2020, −3,0 % en 2025'});
    var Hd=DATA.hold,host=D.getElementById('holdChart'),K=[['nr','Non-résidents','#E2402B'],['bnb','Banque nationale','#7FB6A3'],['bank','Banques belges','#C9773A'],['ofi','Autres institutions financières','#EFA3CB'],['hh','Ménages et entreprises','#A69C8F']];
    CJD.set('holdChart',['Année'].concat(K.map(function(k){return k[1]+' (% du PIB)'})).concat(['Total (% du PIB)']),Hd.tot.map(function(t,i){return [2005+i].concat(K.map(function(k){return Hd[k[0]][i]})).concat([t])}),'Dette brute consolidée selon le secteur détenteur. Eurostat, gov_10dd_ggd.');
    var W=MOB?420:1000,Hh=MOB?380:440,L=MOB?40:56,R=W-(MOB?10:230),T=20,B=Hh-40,mx=120,n=Hd.tot.length,bw=(R-L)/n;
    function X(i){return L+i*bw} function Yv(v){return B-v/mx*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Détenteurs de la dette publique belge en % du PIB, 2005 et 2025 : non-résidents 48,7 puis 68,4 ; Banque nationale 1,0 puis 16,1 ; banques 30,4 puis 12,4 ; autres institutions financières 8,9 puis 7,7 ; ménages et entreprises 6,2 puis 3,3'});
    [0,40,80,120].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Yv(v),y2:Yv(v),stroke:'#D7D4CC'}));s.appendChild(el('text',{x:L-8,y:Yv(v)+5,'text-anchor':'end',style:TX+'#6A665F'},v+' %'))});
    var g=el('g',{'class':'pills'});
    Hd.tot.forEach(function(t,i){var y0=B;K.forEach(function(k){var v=Hd[k[0]][i],h=v/mx*(B-T);g.appendChild(el('rect',{x:X(i)+2,y:y0-h,width:bw-4,height:Math.max(h,0.5),fill:k[2],'class':'bar',style:'transform-origin:bottom;transform-box:fill-box'}));y0-=h});
      if(!MOB?(i%5===0||i===n-1):(i%10===0||i===n-1))s.appendChild(el('text',{x:X(i)+bw/2,y:Hh-12,'text-anchor':'middle',style:TX+'#6A665F'},2005+i))});
    s.appendChild(g);
    if(!MOB){var yy=Yv(Hd.tot[n-1]);K.slice().reverse().forEach(function(k,j){var v=Hd[k[0]][n-1];s.appendChild(el('rect',{x:R+16,y:T+20+j*30-11,width:14,height:14,rx:3,fill:k[2]}));s.appendChild(el('text',{x:R+38,y:T+20+j*30+1,style:TX+'#1A1A1A'},k[1]+' '+fr(v)))})}
    host.appendChild(s);
    if(MOB){var lg=D.createElement('p');lg.className='mlegend';lg.innerHTML=K.map(function(k){return '<span><i style="background:'+k[2]+'"></i>'+k[1]+' : '+fr(Hd[k[0]][n-1])+' %</span>'}).join('');host.appendChild(lg)}
    var LT=DATA.lt,hl=D.getElementById('ltChart');
    lines(hl,{t0:1995,t1:2025,years:MOB?[1995,2010,2025]:[1995,2000,2005,2010,2015,2020,2025],h:MOB?340:440,series:[{n:'Italie',v:LT.IT,c:'#A69C8F',dash:1,dy:-24},{n:'France',v:LT.FR,c:'#7FB6A3',w:2.5,dy:-6},{n:'Allemagne',v:LT.DE,c:'#EDE6DC',w:2.5,dy:26},{n:'Belgique',v:LT.BE,c:'#C9773A',w:4,dy:12}],min:-1,max:13,ticks:[0,4,8,12],grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',refs:[],events:[{y:2011,t:'crise de la zone euro'}],label:'Taux à dix ans, moyenne annuelle 1995-2025 : Belgique de 7,48 % à 3,17 % (−0,15 % en 2020), Allemagne de 6,85 % à 2,59 %, France 3,35 % en 2025, Italie 3,59 % en 2025'});
  })();

  /* 4d. Fiche 09 : les 27 en 2025 */
  (function(){
    var P=DATA.eu2025,A=DATA.eu2025agg,box=D.getElementById('euScatter'),W=MOB?400:1000,Hh=MOB?380:520,L=MOB?40:60,R=W-(MOB?14:30),T=20,B=Hh-40,x0=20,x1=150,y0=-9,y1=4;
    CJD.set('euScatter',['Pays','Dette (% du PIB)','Solde (% du PIB)','Intérêts payés (% du PIB)'],P.map(function(r){return [r[0],r[1],r[2],r[3]]}).concat([['Union européenne',A[0],A[1],A[2]]]),'2025, notification d’octobre 2026. Eurostat, gov_10dd_edpt1.');
    function X(v){return L+(v-x0)/(x1-x0)*(R-L)} function Y(v){return T+(y1-v)/(y1-y0)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dette et solde 2025 des 27 pays. Belgique : dette 108,1 %, solde −5,2 %. France 115,7 % et −5,1 %. Italie 136,7 % et −3,1 %. Grèce 145,4 % et +2,0 %. Roumanie 58,9 % et −7,8 %. Pologne 59,6 % et −7,2 %. Union 81,5 % et −3,1 %.'});
    [20,60,100,140].forEach(function(v){s.appendChild(el('line',{x1:X(v),x2:X(v),y1:T,y2:B,stroke:'#E3E0D8'}));s.appendChild(el('text',{x:X(v),y:Hh-14,'text-anchor':'middle',style:TX+'#6A665F'},v+' %'))});
    [-8,-4,0,4].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:v?'#E3E0D8':'#1A1A1A','stroke-width':v?1:1.2}));s.appendChild(el('text',{x:L-8,y:Y(v)+5,'text-anchor':'end',style:TX+'#6A665F'},(v>0?'+':'')+String(v).replace('-','−')))});
    s.appendChild(el('line',{x1:X(60),x2:X(60),y1:T,y2:B,stroke:'#E2402B','stroke-dasharray':'5 5'}));
    s.appendChild(el('line',{x1:L,x2:R,y1:Y(-3),y2:Y(-3),stroke:'#E2402B','stroke-dasharray':'5 5'}));
    s.appendChild(el('text',{x:X(60)+6,y:T+14,style:TX+'#E2402B'},'60 %'));s.appendChild(el('text',{x:R-4,y:Y(-3)-6,'text-anchor':'end',style:TX+'#E2402B'},'−3 %'));
    var lab={'Belgique':1,'France':1,'Italie':1,'Grèce':1,'Roumanie':1,'Pologne':1,'Allemagne':1,'Espagne':1,'Pays-Bas':!MOB,'Hongrie':!MOB,'Autriche':!MOB,'Danemark':!MOB,'Chypre':!MOB},off={'France':[8,-10],'Belgique':[-10,20],'Pologne':[8,-8],'Roumanie':[8,14],'Autriche':[-8,-10],'Hongrie':[8,-6],'Allemagne':[8,-8]};
    var g=el('g',{'class':'fadein'});
    P.forEach(function(r){var be=r[0]==='Belgique',cx=X(r[1]),cy=Y(r[2]);
      g.appendChild(el('circle',{cx:cx,cy:cy,r:be?9:6,fill:be?'#E2402B':'#A69C8F',stroke:'#1A1A1A','stroke-width':be?2:1,'fill-opacity':be?1:.75}));
      if(lab[r[0]]){var o=off[r[0]]||[8,4],end=o[0]<0;g.appendChild(el('text',{x:cx+o[0],y:cy+o[1],'text-anchor':end?'end':'start',style:'font-family:var(--sans);font-weight:'+(be?700:500)+';font-size:'+(MOB?12:14)+'px;fill:'+(be?'#E2402B':'#1A1A1A')},r[0]+(be?' '+fr(r[1])+' % ; '+sg(r[2])+' %':'')))}
    });
    g.appendChild(el('rect',{x:X(A[0])-6,y:Y(A[1])-6,width:12,height:12,fill:'#1A1A1A',transform:'rotate(45 '+X(A[0])+' '+Y(A[1])+')'}));
    g.appendChild(el('text',{x:X(A[0])+10,y:Y(A[1])+18,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:#1A1A1A'},'Union'));
    s.appendChild(g);box.appendChild(s);
  })();

  /* 5. Recherche */
  (function(){
    var Q=[
      {q:'Une dette élevée freine-t-elle la croissance ?',j:'Le seuil de 90 % a été corrigé par sa réplication, et l’analyse pays par pays d’Eberhardt et Presbitero ne trouve pas de seuil commun : des travaux sérieux divergent sur l’existence et l’ampleur de l’effet.',c:'Des preuves causales, et non des corrélations, de l’effet de la dette sur la croissance, confirmées par plusieurs équipes.',b:['b-de','Débattu'],v:'Une étude célèbre a fixé un seuil de 90 % de dette au-delà duquel la croissance s’effondrerait. Sa réplication a trouvé des erreurs, et les travaux suivants ne trouvent pas de seuil commun à tous les pays.',
       st:[{a:'Reinhart et Rogoff, 2010',t:'Corrélations historiques entre pays',l:1,p:'Au-delà de 90 % de dette, la croissance serait nettement plus faible. Publiée dans un numéro « Papers and Proceedings », moins sélectif que la revue elle-même.',u:'https://doi.org/10.1257/aer.100.2.573',s:'American Economic Review'},
           {a:'Herndon, Ash et Pollin, 2014',t:'Réplication de l’étude précédente',l:0,lt:'réplication',p:'Erreur de tableur excluant notamment la Belgique, l’Australie, l’Autriche, le Canada et le Danemark, et pondération inhabituelle. Corrigée, la croissance moyenne au-delà de 90 % est de 2,2 %, et non de −0,1 %.',u:'https://peri.umass.edu/publication/does-high-public-debt-consistently-stifle-economic-growth-a-critique-of-reinhart-and-rogoff/',s:'Cambridge Journal of Economics'},
           {a:'Eberhardt et Presbitero, 2013',t:'Panel de pays, relation propre à chaque pays',l:2,p:'Aucune preuve d’un seuil de dette commun : la relation entre dette et croissance varie d’un pays à l’autre.',u:'https://www.gov.uk/research-for-development-outputs/this-time-they-are-different-heterogeneity-and-nonlinearity-in-the-relationship-between-debt-and-growth',s:'Document de travail du FMI'}],
       x:'Le sens de la causalité reste discuté : une croissance faible peut aussi faire monter la dette. Le cas Reinhart-Rogoff est devenu un exemple d’école de l’importance de la réplication. Aucune étude belge de ce type n’a été trouvée lors de nos recherches.'},
      {q:'Réduire vite le déficit coûte-t-il cher en croissance ?',j:'Deux programmes de recherche reconnus aboutissent à des conclusions différentes (Blanchard et Leigh ; Alesina, Favero et Giavazzi), et leurs méthodes sont elles-mêmes discutées.',c:'Des estimations convergentes de l’effet des mesures budgétaires selon la phase du cycle et le type de mesure (dépenses ou impôts).',b:['b-de','Débattu'],v:'Cela dépend du moment et de la méthode. En pleine crise, l’austérité a coûté plus cher que prévu. Selon d’autres travaux, réduire les dépenses pèse moins sur l’activité qu’augmenter les impôts.',
       st:[{a:'Blanchard et Leigh, 2013',t:'Erreurs de prévision, pays avancés, début de la crise',l:2,p:'Les pays qui avaient prévu le plus d’austérité ont eu une croissance plus faible que prévu : l’effet des coupes sur l’activité était sous-estimé.',u:'https://nber.org/papers/w18779',s:'American Economic Review'},
           {a:'Alesina, Favero et Giavazzi, 2019',t:'Plans d’austérité de pays avancés',l:2,p:'Les plans fondés sur la baisse des dépenses coûtent beaucoup moins de croissance que ceux fondés sur les hausses d’impôts.',u:'https://cdhowe.org/publication/alesina-favero-giavazzi-austerity-and-economy-spending-cuts-versus-tax-increases/',s:'Princeton University Press'}],
       x:'Les deux travaux ne s’opposent pas entièrement : l’un porte sur le moment (en pleine crise), l’autre sur la composition (impôts ou dépenses). Leurs méthodes restent contestées, et aucune évaluation ne porte spécifiquement sur la Belgique.'},
      {q:'Emprunter pour investir, est-ce une « bonne » dette ?',j:'L’effet positif de l’investissement public repose sur une estimation de bon niveau couvrant de nombreux pays avancés (Abiad, Furceri et Topalova, groupes comparables). La règle d’or est un choix de règle budgétaire : les analyses citées s’y opposent ou la défendent.',c:'Des estimations montrant des rendements faibles dans les pays très endettés, ou des évaluations des pays qui ont appliqué une règle d’or.',b:['b-ma','Majoritaire : l’investissement rapporte'],b2:['b-de','Débattu : la règle d’or'],v:'Dans les pays avancés, une hausse de l’investissement public augmente la production à court et à long terme, surtout quand l’économie tourne au ralenti et que l’investissement est bien choisi. Faut-il pour autant l’exclure des règles de déficit ? Les économistes sont partagés.',
       st:[{a:'Abiad, Furceri et Topalova, 2016',t:'Pays avancés, surprises d’investissement public',l:3,p:'L’investissement public augmente la production à court et à long terme, entraîne l’investissement privé et réduit le chômage. L’effet est plus fort quand l’économie a des capacités inutilisées et quand l’investissement est efficace ; le ratio de dette peut même baisser.',u:'https://ideas.repec.org/a/eee/jmacro/v50y2016icp224-240.html',s:'Journal of Macroeconomics'},
           {a:'Blanchard et Giavazzi, 2004',t:'Proposition de règle d’or',l:0,lt:'analyse',p:'Le pacte de stabilité contient une « erreur sérieuse » dans la façon de comptabiliser l’investissement public : il faudrait exclure l’investissement net du solde surveillé.',u:'https://cepr.org/publications/dp4220',s:'CEPR Discussion Paper'},
           {a:'Balassone et Franco, 2000',t:'Évaluation de la règle d’or',l:0,lt:'analyse',p:'Les règles européennes peuvent freiner l’investissement public, mais la règle d’or, « intuitivement séduisante », ne semble pas la bonne solution.',u:'https://ideas.repec.org/a/ifs/fistud/v21y2000i2p207-229.html',s:'Fiscal Studies'},
           {a:'Bogaert (Bureau du Plan), 2016',t:'Belgique et règles européennes',l:0,lt:'analyse',p:'L’ajustement budgétaire imposé par les règles a réduit l’investissement public, « un frein à la croissance future » ; il propose de mieux en tenir compte dans l’objectif à moyen terme.',u:'https://ideas.repec.org/p/fpb/wpaper/201601.html',s:'Bureau fédéral du Plan'}],
       x:'Ce qu’on ne sait pas bien : le rendement réel de chaque investissement public belge. Il dépend du projet, et peu d’évaluations sont publiées.'},
      {q:'La dette belge est-elle soutenable ?',j:'Le lien entre dette, taux d’intérêt, croissance et solde hors intérêts est une relation comptable. Le niveau de dette soutenable dépend, lui, d’hypothèses sur les taux et la croissance futurs.',c:'Le mécanisme ne changera pas ; le jugement sur le seuil évolue avec les taux d’intérêt et les projections du Comité d’étude sur le vieillissement.',b:['b-et','Établi : le mécanisme'],b2:['b-de','Débattu : le seuil'],v:'Le mécanisme est connu : la dette baisse si la croissance dépasse le taux d’intérêt et si le budget hors intérêts est en équilibre. Aucun niveau de dette « sûr » ne fait consensus.',
       st:[{a:'Blanchard, 2019',t:'Analyse historique et théorique',l:0,lt:'analyse',p:'Tant que le taux d’intérêt reste sous la croissance, la dette peut avoir un coût budgétaire faible. Mais des primes de risque peuvent apparaître brutalement quand la dette est élevée.',u:'https://ideas.repec.org/a/aea/aecrev/v109y2019i4p1197-1229.html',s:'American Economic Review'},
           {a:'Comité d’étude sur le vieillissement, 2026',t:'Projections à l’horizon 2070',l:0,lt:'simulation',p:'Coût budgétaire du vieillissement : +1,5 point de PIB entre 2025 et 2070, surtout les soins de santé (+2,1 points). Hypothèse centrale : productivité en hausse de 1,1 % par an en moyenne ; avec 0,9 % par an, le coût atteint +3,3 points. L’estimation dépasse de 0,2 point celle du rapport précédent.',u:'https://blog.forumforthefuture.be/fr/article/vieillissement-en-belgique-a-lhorizon-2070-les-depenses-sociales-augmentent-jusquen-2050-puis-se-stabilisent-.../31873',s:'Bureau fédéral du Plan (relayé)'}],
       x:'Calcul Au plus Juste à partir d’Eurostat, avec la notification d’octobre 2026 (voir la fiche 06) : en 2025, la croissance (3,5 % en valeur) dépassait le taux d’intérêt moyen (2,3 %), ce qui réduisait la dette d’environ 1,2 point. Mais le déficit primaire (3,0 points) et d’autres ajustements, surtout des opérations financières (environ 2,4 points), l’ont fait monter de 4,1 points au total.'},
      {q:'Les marchés jugent-ils la dette d’un pays de la zone euro sur ses seuls fondamentaux ?',j:'Une étude économétrique publiée en revue, centrée sur la crise de 2010-2012, et la comparaison avec des pays qui ont leur propre banque centrale. Le résultat est discuté, d’où « Débattu ».',c:'Des études montrant que, sur la même période, les écarts de taux s’expliquent entièrement par la dette, le déficit et la croissance.',b:['b-de','Débattu'],v:'Pas toujours. Pendant la crise de 2010-2011, une part importante de la hausse des écarts de taux des pays du sud de la zone euro n’était pas liée à leur dette ou à leur déficit, mais à une perte de confiance qui pouvait s’autoréaliser. Des pays hors zone euro aussi endettés n’ont pas connu la même hausse. La Belgique a vu son écart avec l’Allemagne monter à 1,62 point en 2011 (fiche 08).',
       st:[{a:'De Grauwe et Ji, 2013',t:'Zone euro et pays « autonomes », données de panel jusqu’en 2011',l:0,lt:'étude économétrique',p:'Une part importante de la hausse des écarts de taux des pays périphériques en 2010-2011 était déconnectée de l’évolution de leur dette et de leur marge budgétaire ; des pays hors zone euro aussi endettés n’ont pas subi la même défiance. Les auteurs en concluent que les marchés obligataires de la zone euro sont plus fragiles, faute de prêteur en dernier ressort.',u:'https://doi.org/10.1016/j.jimonfin.2012.11.003',s:'Journal of International Money and Finance, 34, 15-36'}],
       x:'Depuis 2012, la Banque centrale européenne s’est dotée d’instruments pour intervenir sur les marchés de la dette publique ; l’étude porte sur la période précédente. Ses conclusions ne disent pas à partir de quel niveau de dette la confiance se perd.'},
      {q:'Les règles budgétaires européennes limitent-elles les déficits ?',j:'Une méta-analyse de 30 études et une étude quasi expérimentale sur le critère de 3 %. Effet probable mais estimé avec peu de précision quand on corrige les biais, d’où « Débattu ».',c:'Des évaluations du nouveau cadre européen de 2024, fondé sur une trajectoire de dépenses nettes, une fois plusieurs années de données disponibles.',b:['b-de','Débattu'],v:'Plutôt oui, mais l’effet est moins sûr qu’on ne le dit. Le seuil de 3 % attire les déficits vers lui et réduit les déficits très élevés ; mais une fois corrigés le biais de publication et le fait que les pays vertueux adoptent plus volontiers des règles, l’effet moyen des règles n’est plus statistiquement significatif.',
       st:[{a:'Heinemann, Moessinger et Yeter, 2018',t:'30 études publiées sur l’effet des règles budgétaires chiffrées',l:0,lt:'méta-analyse',p:'Les études concluent en moyenne à un effet modérateur des règles. Cet effet s’affaiblit quand les études ne tiennent pas compte du choix des pays d’adopter une règle, et un biais de publication est détecté ; ensemble, ces biais ramènent la précision des estimations sous les seuils usuels.',u:'https://doi.org/10.1016/j.ejpoleco.2017.03.008',s:'European Journal of Political Economy, 51, 69-92'},
           {a:'Caselli et Wingender, 2021',t:'Pays de l’Union, distribution des déficits avant et après le critère de Maastricht',l:3,p:'Le seuil de 3 % agit comme un « aimant » : la distribution des déficits présente environ 20 % de masse en excès autour du plafond par rapport à une situation sans règle, surtout parce que les déficits très élevés deviennent plus rares (résultats du document de travail du FMI de 2018, publié en revue en 2021).',u:'https://doi.org/10.1016/j.euroecorev.2021.103748',s:'European Economic Review, 136, 103748'}],
       x:'La Belgique est sous procédure de déficit excessif depuis juillet 2024 (fiche 02) ; le Conseil l’a mise en suspens le 3 juillet 2026, la trajectoire convenue étant respectée (fiche 09). Le nouveau cadre européen (règlement (UE) 2024/1263) n’a pas encore été évalué.'}];
    function lvl(n,t){var M={1:'corrélation simple',2:'avant-après, témoin imparfait',3:'groupes comparables',4:'expérience naturelle',5:'tirage au sort'};return '<span class="lvl"><em>'+(n?'Évaluation d’impact · '+M[n]:t)+'</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* 6. Lectures */
  (function(){
    var Lx=[
      ['Libérale classique','Adam Smith','La richesse des nations, 1776, livre V','L’État doit financer la défense, la justice et les ouvrages publics, et se méfier de l’emprunt : Smith jugeait que l’habitude d’emprunter avait affaibli les États européens.','Le niveau des dépenses et leur efficacité.','Écrit avant l’État social, il ne dit rien du rôle stabilisateur du budget en récession.','L'],
      ['Choix public','James Buchanan et Richard Wagner','Democracy in Deficit, 1977','Les démocraties penchent vers le déficit : dépenser rapporte des voix, taxer en coûte. Il faut des règles budgétaires inscrites dans la loi fondamentale.','Les règles budgétaires et leur respect.','Des règles rigides peuvent aggraver une récession, et des démocraties ont aussi réduit leur dette.','L'],
      ['Keynésienne','John Maynard Keynes','Théorie générale, 1936','En récession, l’État doit soutenir la demande quitte à creuser le déficit, et le résorber quand l’activité repart.','Le déficit selon la conjoncture.','Les déficits de crise sont rarement compensés ensuite : la Belgique n’a plus connu d’excédent depuis 2007.','O'],
      ['Économie publique','Richard Musgrave','The Theory of Public Finance, 1959','Le budget remplit trois fonctions : fournir des biens publics, redistribuer les revenus, stabiliser l’économie.','La répartition des dépenses par fonction.','Suppose un État bienveillant et bien informé, ce que conteste l’école du choix public.','O'],
      ['Sociale-démocrate','Thomas Piketty','Le capital au XXIe siècle, 2013','La question est d’abord de savoir qui paie. Piketty défend un impôt progressif sur le capital, et envisage une contribution exceptionnelle sur les grands patrimoines plutôt que l’austérité pour réduire la dette.','La répartition de l’impôt selon le revenu et le patrimoine.','Risque de fuite des capitaux, difficile à appliquer sans coordination internationale.','S'],
      ['Conservatrice','Edmund Burke','Réflexions sur la Révolution de France, 1790','La société est un contrat entre les morts, les vivants et ceux qui sont à naître. Appliquée au budget, cette idée invite à ne pas léguer de charges sans contrepartie aux générations futures.','La dette léguée et le coût du vieillissement.','Les générations futures héritent aussi des routes, écoles et hôpitaux financés par la dette.','C'],
      ['Marxiste','James O’Connor','The Fiscal Crisis of the State, 1973','L’État doit à la fois soutenir l’accumulation du capital et acheter la paix sociale : ses dépenses tendent à croître plus vite que ses recettes.','L’écart durable entre dépenses et recettes.','Une prédiction générale, difficile à tester précisément.','K'],
      ['Hétérodoxe (théorie monétaire moderne)','Stephanie Kelton','The Deficit Myth, 2020','Un État qui émet sa propre monnaie ne peut pas faire faillite dans cette monnaie : la vraie limite est l’inflation, pas la dette.','L’inflation et les capacités inutilisées de l’économie.','Ne s’applique pas directement à la Belgique, qui n’émet pas l’euro elle-même.','O'],
      ['Écologiste','Kate Raworth','Doughnut Economics, 2017','Les finances publiques ne devraient pas dépendre d’une croissance perpétuelle : il faut les rendre « agnostiques » à la croissance, dans les limites de la planète.','La dépendance des recettes à la croissance, les investissements climatiques.','Ne propose pas de plan précis pour financer l’État sans croissance.','E']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* 7. Citer */
  (function(){
    var T={dette:'Fin 2025, la dette publique belge atteignait 108,1 % du PIB, soit 693 milliards d’euros, contre 81,5 % en moyenne dans l’Union européenne (Eurostat, gov_10dd_edpt1, notification d’octobre 2026).',
      def:'En 2025, le déficit public belge était de 5,2 % du PIB, dont 2,2 points d’intérêts, contre 3,1 % dans l’Union européenne (Eurostat, gov_10dd_edpt1).',
      int:'Les pouvoirs publics belges ont payé 14,5 milliards d’euros d’intérêts en 2025, contre 8,6 milliards en 2021 en euros courants : +66 %. Une fois l’inflation déduite (8,6 milliards de 2021 valent environ 10,4 milliards de 2025), la hausse est d’environ 37 % (Eurostat, gov_10a_main, chiffres provisoires ; IPCH, prc_hicp_ainr ; calcul Au plus Juste).',
      ent:'La dette des Communautés et des Régions est passée de 12,6 % à 20,4 % du PIB entre 2015 et 2025 (Eurostat, gov_10dd_edpt1, secteur S1312).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('dette');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','debtChart','subChart','defChart','subDef','revExp','cofChart','intChart','invChart','rgChart','pbChart','holdChart','ltChart','euScatter'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
