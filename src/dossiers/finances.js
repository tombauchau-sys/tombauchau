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
  var TX='font-family:var(--sans);font-size:'+(MOB?12:13)+'px;fill:';

  /* 0. Seuil */
  (function(){
    var g=D.getElementById('guess'),go=D.getElementById('gOut'),vd=D.getElementById('verdict'),V=14.3;
    g.addEventListener('input',function(){go.textContent=fr(+g.value)+' Md€'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value,a=Math.abs(v-V);
      vd.innerHTML=(a<1.5?'Bien vu : ':'Vous avez dit '+fr(v)+' milliards. ')+'C’est 14,3 milliards d’euros en 2025, environ 1 200 € par habitant. En 2024, les intérêts (13,5 milliards) dépassaient déjà les dépenses de défense (environ 8 milliards).<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='14,3 Md€';g.value=V;
    });
  })();

  /* Courbes */
  function lines(host,o){
    var T0=o.t0,T1=o.t1,n=T1-T0,W=MOB?420:1000,Hh=o.h||(MOB?320:420),L=MOB?40:56,R=W-(MOB?70:140),T=26,B=Hh-40,mn=o.min,mx=o.max;
    function X(y){return L+(y-T0)/n*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:o.grid}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+o.mute},fr(v,0).replace('-','−')+' %'))});
    o.years.forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+o.mute},y))});
    (o.refs||[]).forEach(function(r){s.appendChild(el('line',{x1:L,x2:R,y1:Y(r.v),y2:Y(r.v),stroke:r.c,'stroke-width':2,'stroke-dasharray':'3 5'}));s.appendChild(el('text',{x:L+6,y:Y(r.v)+(r.dy||-8),style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?11:13)+'px;fill:'+r.c},r.t))});
    (o.events||[]).forEach(function(e){var x=X(e.y);s.appendChild(el('line',{x1:x,x2:x,y1:T,y2:B,stroke:o.grid,'stroke-dasharray':'2 5'}));if(!MOB||e.m)s.appendChild(el('text',{x:x+6,y:T+12,style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?16:22)+'px;fill:'+o.ink},e.t))});
    var g=el('g',{});
    o.series.forEach(function(se){
      var d=se.v.map(function(v,j){return (j?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
      var p=el('path',{d:d,fill:'none',stroke:se.c,'stroke-width':se.w||3,'stroke-linejoin':'round','stroke-linecap':'round','class':se.dash?'fadein':'drawline'});
      if(se.dash)p.setAttribute('stroke-dasharray','6 6');g.appendChild(p);
      var lv=se.v[se.v.length-1];
      g.appendChild(el('circle',{cx:X(T1),cy:Y(lv),r:5,fill:se.c,'class':'fadein'}));
      g.appendChild(el('text',{x:X(T1)+10,y:Y(lv)+5+(se.dy||0),'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:'+se.c},fr(lv).replace('-','−')+' %'+(MOB?'':'  '+se.n)));
    });
    s.appendChild(g);host.appendChild(s);
  }


  /* 0b. Histoire 1980-2025 */
  (function(){
    var host=D.getElementById('histChart'),V=DATA.hist,T0=1980,T1=2025,W=MOB?420:1000,Hh=MOB?340:440,L=MOB?40:56,R=W-(MOB?50:110),T=40,B=Hh-40,mn=60,mx=150;
    function X(y){return L+(y-T0)/(T1-T0)*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dette publique belge 1980-2025 : 76,8 % en 1980, pic de 138,9 % en 1993, 87,3 % en 2007, 107,9 % en 2025'});
    [[1980,1993,'boule de neige','rgba(226,64,43,.16)'],[1993,2007,'assainissement','rgba(127,182,163,.18)'],[2008,2011,'banques','rgba(201,119,58,.18)'],[2020,2021,'Covid','rgba(201,119,58,.18)']].forEach(function(p){
      s.appendChild(el('rect',{x:X(p[0]),y:T,width:X(p[1])-X(p[0]),height:B-T,fill:p[3]}));
      if(!MOB||p[0]<2000)s.appendChild(el('text',{x:(X(p[0])+X(p[1]))/2,y:T-10,'text-anchor':'middle',style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?15:22)+'px;fill:#EDE6DC'},p[2]))});
    [60,90,120,150].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:'#3B332B'}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+'#A69C8F'},v+' %'))});
    (MOB?[1980,1995,2010,2025]:[1980,1985,1990,1995,2000,2005,2010,2015,2020,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+'#A69C8F'},y))});
    var d=V.map(function(v,j){return (j?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
    s.appendChild(el('path',{d:d,fill:'none',stroke:'#C9773A','stroke-width':4.5,'stroke-linejoin':'round','class':'drawline'}));
    [[1993,138.9,'138,9 %',-14],[2007,87.3,'87,3 %',24],[2025,107.9,'107,9 %',-12],[1980,76.8,'76,8 %',-12]].forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:6,fill:'#C9773A',stroke:'#1E1914','stroke-width':2.5,'class':'fadein'}));s.appendChild(el('text',{x:x,y:y+k[3],'text-anchor':k[0]===2025?'end':k[0]===1980?'start':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:#EDE6DC'},k[2]))});
    host.appendChild(s);
  })();
  /* 1. Dette */
  lines(D.getElementById('debtChart'),{t0:2000,t1:2025,min:50,max:120,ticks:[60,80,100,120],grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',years:MOB?[2000,2010,2020,2025]:[2000,2005,2010,2015,2020,2025],
    refs:[{v:60,c:'#E2402B',t:'60 % : valeur de référence européenne',dy:16}],events:[{y:2008,t:'crise financière'},{y:2020,t:'pandémie',m:1}],
    series:[{n:'Union',v:DATA.debt.EU,c:'#A69C8F',dash:1},{n:'Belgique',v:DATA.debt.BE,c:'#C9773A',w:4.5}],label:'Dette publique 2000-2025 : Belgique de 109,7 % à 107,9 % du PIB, Union de 66,6 % à 81,7 %'});

  (function(){
    var S=DATA.sub.debt,box=D.getElementById('subChart'),W=MOB?400:1000,row=MOB?58:54,L=MOB?120:250,R=W-(MOB?50:110),mx=95,Hh=S.length*row+30;
    function X(v){return L+v/mx*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dette par niveau de pouvoir, 2015 et 2025 : fédéral 89,2 puis 86,9 % du PIB ; Communautés et Régions 12,6 puis 20,4 % ; pouvoirs locaux 5,9 puis 4,3 % ; sécurité sociale 2,0 puis 0,1 %'}),g=el('g',{'class':'pills'});
    S.forEach(function(r,i){var y=i*row+6,hh=(row-16)/2;
      g.appendChild(el('rect',{x:L,y:y,width:Math.max(2,X(r[2])-L),height:hh,rx:hh/2,fill:'none',stroke:'#A69C8F','stroke-width':1.5,'class':'bar'}));
      g.appendChild(el('rect',{x:L,y:y+hh+3,width:Math.max(2,X(r[1])-L),height:hh,rx:hh/2,fill:i===1?'#C9773A':'#EDE6DC','class':'bar',style:'transition-delay:.15s'}));
      g.appendChild(el('text',{x:L-12,y:y+hh+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?12:15)+'px;fill:#EDE6DC'},r[0]));
      g.appendChild(el('text',{x:X(r[2])+8,y:y+hh-2,style:TX+'#A69C8F'},'2015 : '+fr(r[2])+' %'));
      g.appendChild(el('text',{x:X(r[1])+8,y:y+2*hh+1,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:'+(i===1?'#C9773A':'#EDE6DC')},'2025 : '+fr(r[1])+' %'));
    });
    s.appendChild(g);box.appendChild(s);
  })();

  /* 2. Déficit */
  (function(){
    var box=D.getElementById('defChart'),T0=2000,T1=2025,W=MOB?420:1000,Hh=MOB?320:400,L=MOB?40:56,R=W-(MOB?60:130),T=20,B=Hh-40,mn=-10,mx=1;
    function X(y){return L+(y-T0+.5)/(T1-T0+1)*(R-L)} function Y(v){return T+(mx-v)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Solde public 2000-2025 : Belgique −5,2 % en 2025, Union −3,1 %, plus bas −9,0 % en 2020'});
    [0,-3,-6,-9].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:v===-3?'#E2402B':'#D7D4CC','stroke-width':v===-3?2:1,'stroke-dasharray':v===-3?'3 5':''}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+'#6A665F'},(v?'−'+Math.abs(v):'0')+' %'))});
    var bw=(R-L)/(T1-T0+1)*.62,g=el('g',{'class':'seg-bar'});
    DATA.def.BE.forEach(function(v,i){var x=X(T0+i)-bw/2,y0=Y(0),y1=Y(v);g.appendChild(el('rect',{x:x,y:Math.min(y0,y1),width:bw,height:Math.max(1.5,Math.abs(y1-y0)),fill:v<-3?'#E2402B':'#1A1A1A','class':'s',style:'transform-origin:top'}))});
    s.appendChild(g);
    var d=DATA.def.EU.map(function(v,j){return (j?'L':'M')+X(T0+j).toFixed(1)+' '+Y(v).toFixed(1)}).join(' ');
    s.appendChild(el('path',{d:d,fill:'none',stroke:'#6A665F','stroke-width':2.5,'stroke-dasharray':'6 5','class':'fadein'}));
    (MOB?[2000,2010,2020,2025]:[2000,2005,2010,2015,2020,2025]).forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+'#6A665F'},y))});
    s.appendChild(el('text',{x:X(2025)+bw,y:Y(-5.2)+5,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:#E2402B'},'−5,2 %'+(MOB?'':' Belgique')));
    s.appendChild(el('text',{x:X(2025)+bw,y:Y(-3.1)-6,'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:14)+'px;fill:#6A665F'},'−3,1 %'+(MOB?'':' Union')));
    s.appendChild(el('text',{x:L+6,y:Y(-3)+16,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?11:13)+'px;fill:#E2402B'},'−3 % : valeur de référence'));
    box.appendChild(s);
  })();

  function hbars(id,rows,o){
    var box=D.getElementById(id),W=MOB?420:600,row=o.row||(MOB?40:44),L=MOB?150:190,R=W-(MOB?60:70),mn=o.min,mx=o.max,Hh=rows.length*row+26;
    function X(v){return L+(v-mn)/(mx-mn)*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label}),g=el('g',{'class':'pills'});
    if(mn<0){s.appendChild(el('line',{x1:X(0),x2:X(0),y1:0,y2:Hh-20,stroke:'#1A1A1A','stroke-width':1.5}))}
    rows.forEach(function(r,i){var y=i*row+4,h=row-14,v=r[1],x0=X(Math.min(0,v)),x1=X(Math.max(0,v));
      g.appendChild(el('rect',{x:x0,y:y,width:Math.max(2,x1-x0),height:h,rx:h/2,fill:r[2]||'#fff',stroke:'#1A1A1A','stroke-width':2,'class':'bar',style:'transform-origin:'+(v<0?'right':'left')}));
      g.appendChild(el('text',{x:L-10,y:y+h/2+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?12:14)+'px;fill:#1A1A1A'},r[0]));
      g.appendChild(el('text',{x:v<0?x0-8:x1+8,y:y+h/2+5,'text-anchor':v<0?'end':'start',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?12:13)+'px;fill:#1A1A1A'},(o.signed?sg(v):fr(v))+' %'));
    });
    s.appendChild(g);box.appendChild(s);
  }
  var SD=DATA.sub.def.map(function(r){return [r[0],r[1],r[1]<-1?'#E2402B':'#fff']});
  hbars('subDef',SD,{min:-4.8,max:0.6,signed:1,label:'Solde 2025 par niveau de pouvoir : fédéral −3,8 % du PIB, Communautés et Régions −1,4 %, pouvoirs locaux −0,1 %, sécurité sociale 0,0 %'});
  hbars('revExp',[['Recettes · Belgique',49.0,'#7FB6A3'],['Recettes · Union',46.4,'#fff'],['Dépenses · Belgique',54.2,'#E2402B'],['Dépenses · Union',49.5,'#fff']],{min:0,max:62,label:'Recettes et dépenses publiques 2025 : Belgique 49,0 % et 54,2 % du PIB ; Union 46,4 % et 49,5 %'});

  /* 3. COFOG */
  (function(){
    var F=[['GF10','Protection sociale','Protection sociale'],['GF07','Santé','Santé'],['GF01','Services généraux (dont intérêts)','Services généraux*'],['GF04','Affaires économiques','Affaires éco.'],['GF09','Enseignement','Enseignement'],['GF03','Ordre et sécurité publics','Ordre public'],['GF02','Défense','Défense'],['GF05','Environnement','Environnement'],['GF08','Loisirs, culture, cultes','Culture, loisirs'],['GF06','Logement et équipements','Logement']];
    var box=D.getElementById('cofChart'),W=MOB?400:1000,row=MOB?46:44,L=MOB?120:290,R=W-(MOB?20:150),mx=MOB?30:26,Hh=F.length*row+36;
    function X(v){return L+v/mx*(R-L)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Dépenses publiques par fonction 2024, Belgique et Union, en % du PIB : protection sociale 20,4 contre 19,6 ; santé 8,0 contre 7,4 ; enseignement 6,3 contre 4,8'}),g=el('g',{'class':'pills'});
    [0,5,10,15,20].forEach(function(v){s.appendChild(el('line',{x1:X(v),x2:X(v),y1:4,y2:Hh-28,stroke:'rgba(26,26,26,.2)'}));s.appendChild(el('text',{x:X(v),y:Hh-10,'text-anchor':'middle',style:TX+'#1A1A1A'},v+' %'))});
    F.forEach(function(f,i){var y=i*row+row/2+2,be=DATA.cofBE[f[0]],eu=DATA.cofEU[f[0]],d=Math.round((be-eu)*10)/10;
      g.appendChild(el('line',{x1:X(Math.min(be,eu)),x2:X(Math.max(be,eu)),y1:y,y2:y,stroke:'#1A1A1A','stroke-width':3,'class':'bar'}));
      g.appendChild(el('circle',{cx:X(eu),cy:y,r:MOB?6:7,fill:'#fff',stroke:'#1A1A1A','stroke-width':2.5}));
      g.appendChild(el('circle',{cx:X(be),cy:y,r:MOB?7:8,fill:'#E2402B',stroke:'#1A1A1A','stroke-width':2.5}));
      g.appendChild(el('text',{x:L-14,y:y+5,'text-anchor':'end',style:'font-family:var(--sans);font-weight:600;font-size:'+(MOB?11.5:15)+'px;fill:#1A1A1A'},MOB?f[2]:f[1]));
      g.appendChild(el('text',{x:X(Math.max(be,eu))+14,y:y+5,style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?11.5:14)+'px;fill:#1A1A1A'},fr(be)+(MOB?'':' % contre '+fr(eu)+' %')+'  ('+sg(d)+')'));
    });
    s.appendChild(g);
    var lg=el('g',{});lg.appendChild(el('circle',{cx:L+8,cy:Hh-44+30,r:0}));box.appendChild(s);
    var key=D.createElement('p');key.className='key-dots';key.innerHTML='<span class="kd be"></span> Belgique <span class="kd eu"></span> Union européenne · entre parenthèses : l’écart en points'+(MOB?' · * dont intérêts de la dette':'');box.appendChild(key);
  })();

  /* 4. Intérêts */
  (function(){
    var I=DATA.int,box=D.getElementById('intChart'),W=MOB?420:1000,Hh=MOB?280:340,L=MOB?44:60,R=W-20,T=30,B=Hh-34,mx=16000,n=I.length;
    function Y(v){return B-v/mx*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Intérêts payés 2015-2025 : 12,4 milliards en 2015, 8,6 en 2021, 14,3 en 2025'}),g=el('g',{'class':'seg-bar'});
    [0,5000,10000,15000].forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:'#3B332B'}));s.appendChild(el('text',{x:L-8,y:Y(v)+4,'text-anchor':'end',style:TX+'#A69C8F'},v/1000+' Md'))});
    var slot=(R-L)/n,bw=slot*.6;
    I.forEach(function(v,i){var x=L+i*slot+(slot-bw)/2,y=2015+i,hi=y===2021||y>=2024;
      g.appendChild(el('rect',{x:x,y:Y(v),width:bw,height:B-Y(v),fill:hi?'#C9773A':'#EDE6DC','class':'s',style:'transform-origin:bottom'}));
      if(!MOB||hi||y===2015)g.appendChild(el('text',{x:x+bw/2,y:Y(v)-8,'text-anchor':'middle',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?10.5:13)+'px;fill:'+(hi?'#C9773A':'#EDE6DC')},fr(v/1000)));
      if(!MOB||i%2===0)g.appendChild(el('text',{x:x+bw/2,y:Hh-12,'text-anchor':'middle',style:TX+'#A69C8F'},y+(y>=2024?'*':'')));
    });
    s.appendChild(g);box.appendChild(s);
  })();


  /* 4b. Investissement */
  lines(D.getElementById('invChart'),{t0:2000,t1:2025,min:1.5,max:4.5,ticks:[2,3,4],grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',years:MOB?[2000,2010,2020,2025]:[2000,2005,2010,2015,2020,2025],
    events:[{y:2008,t:'écart max. : 1,7 pt'}],
    series:[{n:'Union',v:DATA.inv.EU,c:'#6A665F',dash:1,dy:-4},{n:'Belgique',v:DATA.inv.BE,c:'#E2402B',w:4.5,dy:4}],label:'Investissement public 2000-2025 : Belgique de 2,4 % à 3,1 % du PIB, Union de 3,3 % à 3,9 %'});

  /* 5. Recherche */
  (function(){
    var Q=[
      {q:'Une dette élevée freine-t-elle la croissance ?',b:['b-de','Débattu'],v:'Une étude célèbre a fixé un seuil de 90 % de dette au-delà duquel la croissance s’effondrerait. Sa réplication a trouvé des erreurs, et les travaux suivants ne trouvent pas de seuil commun à tous les pays.',
       st:[{a:'Reinhart et Rogoff, 2010',t:'Corrélations historiques entre pays',l:1,p:'Au-delà de 90 % de dette, la croissance serait nettement plus faible. Publiée dans un numéro « Papers and Proceedings », moins sélectif que la revue elle-même.',u:'https://doi.org/10.1257/aer.100.2.573',s:'American Economic Review'},
           {a:'Herndon, Ash et Pollin, 2014',t:'Réplication de l’étude précédente',l:0,lt:'réplication',p:'Erreur de tableur excluant notamment la Belgique, l’Australie, l’Autriche, le Canada et le Danemark, et pondération inhabituelle. Corrigée, la croissance moyenne au-delà de 90 % est de 2,2 %, et non de −0,1 %.',u:'https://peri.umass.edu/publication/does-high-public-debt-consistently-stifle-economic-growth-a-critique-of-reinhart-and-rogoff/',s:'Cambridge Journal of Economics'},
           {a:'Eberhardt et Presbitero, 2013',t:'Panel de pays, relation propre à chaque pays',l:2,p:'Aucune preuve d’un seuil de dette commun : la relation entre dette et croissance varie d’un pays à l’autre.',u:'https://www.gov.uk/research-for-development-outputs/this-time-they-are-different-heterogeneity-and-nonlinearity-in-the-relationship-between-debt-and-growth',s:'Document de travail du FMI'}],
       x:'Le sens de la causalité reste discuté : une croissance faible peut aussi faire monter la dette. Le cas Reinhart-Rogoff est devenu un exemple d’école de l’importance de la réplication.'},
      {q:'Réduire vite le déficit coûte-t-il cher en croissance ?',b:['b-de','Débattu'],v:'Cela dépend du moment et de la méthode. En pleine crise, l’austérité a coûté plus cher que prévu. Selon d’autres travaux, réduire les dépenses pèse moins sur l’activité qu’augmenter les impôts.',
       st:[{a:'Blanchard et Leigh, 2013',t:'Erreurs de prévision, pays avancés, début de la crise',l:2,p:'Les pays qui avaient prévu le plus d’austérité ont eu une croissance plus faible que prévu : l’effet des coupes sur l’activité était sous-estimé.',u:'https://nber.org/papers/w18779',s:'American Economic Review'},
           {a:'Alesina, Favero et Giavazzi, 2019',t:'Plans d’austérité de pays avancés',l:2,p:'Les plans fondés sur la baisse des dépenses coûtent beaucoup moins de croissance que ceux fondés sur les hausses d’impôts.',u:'https://cdhowe.org/publication/alesina-favero-giavazzi-austerity-and-economy-spending-cuts-versus-tax-increases/',s:'Princeton University Press'}],
       x:'Les deux travaux ne s’opposent pas entièrement : l’un porte sur le moment (en pleine crise), l’autre sur la composition (impôts ou dépenses). Leurs méthodes restent contestées, et aucune évaluation ne porte spécifiquement sur la Belgique.'},
      {q:'Emprunter pour investir, est-ce une « bonne » dette ?',b:['b-ma','Majoritaire : l’investissement rapporte'],b2:['b-de','Débattu : la règle d’or'],v:'Dans les pays avancés, une hausse de l’investissement public augmente la production à court et à long terme, surtout quand l’économie tourne au ralenti et que l’investissement est bien choisi. Faut-il pour autant l’exclure des règles de déficit ? Les économistes sont partagés.',
       st:[{a:'Abiad, Furceri et Topalova, 2016',t:'Pays avancés, surprises d’investissement public',l:3,p:'L’investissement public augmente la production à court et à long terme, entraîne l’investissement privé et réduit le chômage. L’effet est plus fort quand l’économie a des capacités inutilisées et quand l’investissement est efficace ; le ratio de dette peut même baisser.',u:'https://ideas.repec.org/a/eee/jmacro/v50y2016icp224-240.html',s:'Journal of Macroeconomics'},
           {a:'Blanchard et Giavazzi, 2004',t:'Proposition de règle d’or',l:0,lt:'analyse',p:'Le pacte de stabilité contient une « erreur sérieuse » dans la façon de comptabiliser l’investissement public : il faudrait exclure l’investissement net du solde surveillé.',u:'https://cepr.org/publications/dp4220',s:'CEPR Discussion Paper'},
           {a:'Balassone et Franco, 2000',t:'Évaluation de la règle d’or',l:0,lt:'analyse',p:'Les règles européennes peuvent freiner l’investissement public, mais la règle d’or, « intuitivement séduisante », ne semble pas la bonne solution.',u:'https://ideas.repec.org/a/ifs/fistud/v21y2000i2p207-229.html',s:'Fiscal Studies'},
           {a:'Bogaert (Bureau du Plan), 2016',t:'Belgique et règles européennes',l:0,lt:'analyse',p:'L’ajustement budgétaire imposé par les règles a réduit l’investissement public, « un frein à la croissance future » ; il propose de mieux en tenir compte dans l’objectif à moyen terme.',u:'https://ideas.repec.org/p/fpb/wpaper/201601.html',s:'Bureau fédéral du Plan'}],
       x:'Ce qu’on ne sait pas bien : le rendement réel de chaque investissement public belge. Il dépend du projet, et peu d’évaluations sont publiées.'},
      {q:'La dette belge est-elle soutenable ?',b:['b-et','Établi : le mécanisme'],b2:['b-de','Débattu : le seuil'],v:'Le mécanisme est connu : la dette baisse si la croissance dépasse le taux d’intérêt et si le budget hors intérêts est en équilibre. Aucun niveau de dette « sûr » ne fait consensus.',
       st:[{a:'Blanchard, 2019',t:'Analyse historique et théorique',l:0,lt:'analyse',p:'Tant que le taux d’intérêt reste sous la croissance, la dette peut avoir un coût budgétaire faible. Mais des primes de risque peuvent apparaître brutalement quand la dette est élevée.',u:'https://ideas.repec.org/a/aea/aecrev/v109y2019i4p1197-1229.html',s:'American Economic Review'},
           {a:'Comité d’étude sur le vieillissement, 2026',t:'Projections à l’horizon 2070',l:0,lt:'simulation',p:'Coût budgétaire du vieillissement : +1,5 point de PIB entre 2025 et 2070, surtout les soins de santé (+2,1 points). Avec une productivité plus faible : +3,3 points.',u:'https://blog.forumforthefuture.be/fr/article/vieillissement-en-belgique-a-lhorizon-2070-les-depenses-sociales-augmentent-jusquen-2050-puis-se-stabilisent-.../31873',s:'Bureau fédéral du Plan (relayé)'}],
       x:'Calcul Chiffre Juste à partir d’Eurostat : en 2025, la croissance (3,6 % en valeur) dépassait le taux d’intérêt moyen (2,2 %), ce qui réduisait la dette d’environ 1,4 point. Mais le déficit primaire (3,0 points) et d’autres ajustements, surtout des opérations financières (environ 2,4 points), l’ont fait monter de 4 points au total.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* 6. Lectures */
  (function(){
    var Lx=[
      ['Libérale classique','Adam Smith','La richesse des nations, 1776, livre V','L’État doit financer la défense, la justice et les ouvrages publics, et se méfier de l’emprunt : Smith jugeait que l’habitude d’emprunter avait affaibli les États européens.','Le niveau des dépenses et leur efficacité.','Écrit avant l’État social, il ne dit rien du rôle stabilisateur du budget en récession.'],
      ['Choix public','James Buchanan et Richard Wagner','Democracy in Deficit, 1977','Les démocraties penchent vers le déficit : dépenser rapporte des voix, taxer en coûte. Il faut des règles budgétaires inscrites dans la loi fondamentale.','Les règles budgétaires et leur respect.','Des règles rigides peuvent aggraver une récession, et des démocraties ont aussi réduit leur dette.'],
      ['Keynésienne','John Maynard Keynes','Théorie générale, 1936','En récession, l’État doit soutenir la demande quitte à creuser le déficit, et le résorber quand l’activité repart.','Le déficit selon la conjoncture.','Les déficits de crise sont rarement compensés ensuite : la Belgique n’a plus connu d’excédent depuis 2007.'],
      ['Économie publique','Richard Musgrave','The Theory of Public Finance, 1959','Le budget remplit trois fonctions : fournir des biens publics, redistribuer les revenus, stabiliser l’économie.','La répartition des dépenses par fonction.','Suppose un État bienveillant et bien informé, ce que conteste l’école du choix public.'],
      ['Sociale-démocrate','Thomas Piketty','Le capital au XXIe siècle, 2013','La question est d’abord de savoir qui paie. Piketty défend un impôt progressif sur le capital, et envisage une contribution exceptionnelle sur les grands patrimoines plutôt que l’austérité pour réduire la dette.','La répartition de l’impôt selon le revenu et le patrimoine.','Risque de fuite des capitaux, difficile à appliquer sans coordination internationale.'],
      ['Conservatrice','Edmund Burke','Réflexions sur la Révolution de France, 1790','La société est un contrat entre les morts, les vivants et ceux qui sont à naître. Appliquée au budget, cette idée invite à ne pas léguer de charges sans contrepartie aux générations futures.','La dette léguée et le coût du vieillissement.','Les générations futures héritent aussi des routes, écoles et hôpitaux financés par la dette.'],
      ['Marxiste','James O’Connor','The Fiscal Crisis of the State, 1973','L’État doit à la fois soutenir l’accumulation du capital et acheter la paix sociale : ses dépenses tendent à croître plus vite que ses recettes.','L’écart durable entre dépenses et recettes.','Une prédiction générale, difficile à tester précisément.'],
      ['Hétérodoxe (théorie monétaire moderne)','Stephanie Kelton','The Deficit Myth, 2020','Un État qui émet sa propre monnaie ne peut pas faire faillite dans cette monnaie : la vraie limite est l’inflation, pas la dette.','L’inflation et les capacités inutilisées de l’économie.','Ne s’applique pas directement à la Belgique, qui n’émet pas l’euro elle-même.'],
      ['Écologiste','Kate Raworth','Doughnut Economics, 2017','Les finances publiques ne devraient pas dépendre d’une croissance perpétuelle : il faut les rendre « agnostiques » à la croissance, dans les limites de la planète.','La dépendance des recettes à la croissance, les investissements climatiques.','Ne propose pas de plan précis pour financer l’État sans croissance.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* 7. Citer */
  (function(){
    var T={dette:'Fin 2025, la dette publique belge atteignait 107,9 % du PIB, soit 692 milliards d’euros, contre 81,7 % en moyenne dans l’Union européenne (Eurostat, gov_10dd_edpt1, notification d’avril 2026).',
      def:'En 2025, le déficit public belge était de 5,2 % du PIB, dont 2,2 points d’intérêts, contre 3,1 % dans l’Union européenne (Eurostat, gov_10dd_edpt1).',
      int:'Les pouvoirs publics belges ont payé 14,3 milliards d’euros d’intérêts en 2025, contre 8,6 milliards en 2021 (Eurostat, gov_10a_main, chiffres provisoires).',
      ent:'La dette des Communautés et des Régions est passée de 12,6 % à 20,4 % du PIB entre 2015 et 2025 (Eurostat, gov_10dd_edpt1, secteur S1312).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('dette');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','debtChart','subChart','defChart','subDef','revExp','cofChart','intChart','invChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
    var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;
    D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,svg[role=img]')))});
    (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  })();
})();
