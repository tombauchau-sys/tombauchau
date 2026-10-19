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
    var g=D.getElementById('guess'),go=D.getElementById('gOut'),vd=D.getElementById('verdict');
    g.addEventListener('input',function(){go.textContent=fr(+g.value)+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-20.2)<=2?'Bien vu : ':'Vous avez dit '+fr(v)+' %. ')+'Au 1<sup>er</sup> janvier 2025, 20,2 % des habitants de la Belgique sont nés à l’étranger, soit 2,4 millions de personnes. Dans l’ensemble de l’Union : 14,4 %.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='20,2 %';g.value=20;
    });
  })();

  /* Courbes à départs variables */
  function lines2(host,o){CJD.series(host,o.series,o.t0);
    var T0=o.t0,T1=o.t1,W=o.w||(MOB?420:1000),Hh=o.h||(MOB?360:480),L=MOB?40:56,R=W-(o.rm||(MOB?70:140)),T=30,B=Hh-40,mn=o.min,mx=o.max;
    function X(y){return L+(y-T0)/(T1-T0)*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    (o.bands||[]).forEach(function(b){s.appendChild(el('rect',{x:X(b[0]),y:T,width:X(b[1])-X(b[0]),height:B-T,fill:b[2]}));s.appendChild(el('text',{x:(X(b[0])+X(b[1]))/2,y:T-10,'text-anchor':'middle',style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?15:22)+'px;fill:'+o.ink},b[3]))});
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:o.grid}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+o.mute},fr(v,0)+(o.unit||'')))});
    o.years.forEach(function(y){s.appendChild(el('text',{x:X(y),y:Hh-12,'text-anchor':'middle',style:TX+o.mute},y))});
    (o.breaks||[]).forEach(function(b){s.appendChild(el('line',{x1:X(b),x2:X(b),y1:T,y2:B,stroke:'#E2402B','stroke-dasharray':'2 6'}));s.appendChild(el('text',{x:X(b),y:T-6,'text-anchor':'middle',style:'font-size:18px;fill:#E2402B'},'×'))});
    var g=el('g',{});
    o.series.forEach(function(se){
      var pts=se.pts||se.v.map(function(v,j){return [se.s+j,v]});
      var d=pts.map(function(p,j){return (j?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)}).join(' ');
      var p=el('path',{d:d,fill:'none',stroke:se.c,'stroke-width':se.w||3,'stroke-linejoin':'round','stroke-linecap':'round','class':se.dash?'fadein':'drawline'});
      if(se.dash)p.setAttribute('stroke-dasharray','6 6');g.appendChild(p);
      if(se.end!==false){var lp=pts[pts.length-1];
        g.appendChild(el('circle',{cx:X(lp[0]),cy:Y(lp[1]),r:5,fill:se.c,'class':'fadein'}));
        g.appendChild(el('text',{x:X(lp[0])+10,y:Y(lp[1])+5+(se.dy||0),'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+se.c},fr(lp[1])+(o.unit||'')+(MOB?'':'  '+se.n)));}
    });
    (o.marks||[]).forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:5.5,fill:k[3],stroke:o.bg||'#1E1914','stroke-width':2,'class':'fadein'}));s.appendChild(el('text',{x:x,y:y+(k[4]||-12),'text-anchor':k[5]||'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+k[3]},k[2]))});
    s.appendChild(g);host.appendChild(s);
  }


  var DK={grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',bg:'#1E1914'},PP={grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',bg:'#F7F6F2'};
  function o2(a,b){for(var k in b)a[k]=b[k];return a}
  function yrs(a,b){var r=[];for(var y=a;y<=b;y++)r.push(y);return r}

  /* Histoire : étrangers 1930-2025 */
  lines2(D.getElementById('histChart'),o2({t0:1930,t1:2025,rm:MOB?78:230,min:0,max:22,ticks:[0,5,10,15,20],unit:' %',years:MOB?[1930,1961,1991,2025]:[1930,1947,1961,1970,1981,1991,2000,2010,2025],breaks:[2011],
    series:[{n:'',pts:DATA.frHist,c:'#C9773A',w:3,end:false},{n:'étrangers',v:DATA.fr,s:1998,c:'#C9773A',w:4.5,dy:8},{n:'nés à l’étranger',v:DATA.born,s:2010,c:'#EFA3CB',w:3,dash:1,dy:-4}],
    marks:[[1930,3.8,'3,8 %','#EDE6DC',-12,'start'],[1961,4.9,'4,9 %','#EDE6DC',-12],[1981,8.9,'8,9 %','#EDE6DC',-14],[2000,8.8,'8,8 %','#EDE6DC',24]],
    label:'Part des étrangers dans la population belge : 3,8 % en 1930, 8,9 % en 1981, 8,8 % en 2000, 14,2 % en 2025. Part des personnes nées à l’étranger : 13,9 % en 2010, 20,2 % en 2025'},DK));
  CJD.rename('histChart',['Étrangers, 1930-1991 (Poulain, recensements)','Étrangers, 1998-2025 (Eurostat, migr_pop1ctz)','Nés à l’étranger (Eurostat, migr_pop3ctb)'],'Rupture de série en 2011.');

  /* Barres verticales génériques */
  function bars(host,o){CJD.series(host,o.series.map(function(se,j){return {n:se.n||(o.legend&&o.legend[j]&&o.legend[j][0]),v:se.v,s:+o.labels[0]}}),+o.labels[0]);
    var W=o.w||(MOB?420:1000),Hh=o.h||(MOB?300:400),L=MOB?44:60,R=W-16,T=o.legend&&MOB?56:24,B=Hh-36,mn=o.min,mx=o.max,n=o.labels.length,k=o.series.length;
    function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label}),bw=(R-L)/n;
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:v===0?o.mute:o.grid}));s.appendChild(el('text',{x:L-8,y:Y(v)+4,'text-anchor':'end',style:TX+o.mute},fr(v,0)))});
    var g=el('g',{'class':'fadein'});
    o.series.forEach(function(se,j){se.v.forEach(function(v,i){if(v==null)return;var sb=k>1&&!o.solo,w=bw*(sb?.42:.7),x=L+i*bw+(bw-(sb?2*w:w))/2+(sb?j*w:0),y0=Y(0),y1=Y(v);
      g.appendChild(el('rect',{x:x.toFixed(1),y:Math.min(y0,y1).toFixed(1),width:Math.max(w-.5,1).toFixed(1),height:Math.max(Math.abs(y1-y0),.5).toFixed(1),fill:se.c}))})});
    s.appendChild(g);
    o.labels.forEach(function(l,i){if(o.show.indexOf(l)>=0)s.appendChild(el('text',{x:L+i*bw+bw/2,y:Hh-12,'text-anchor':'middle',style:TX+o.mute},l))});
    (o.notes||[]).forEach(function(nt){var i=o.labels.indexOf(nt[0]);s.appendChild(el('text',{x:L+i*bw+bw/2+(nt[3]||0),y:Y(nt[1])-8,'text-anchor':nt[4]||'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+o.ink},nt[2]))});
    if(o.legend){var lg=el('g',{}),lx=L+8,ly=4;o.legend.forEach(function(it,i){var wd=40+it[0].length*(MOB?7.2:8.4);if(i&&lx+wd>R){lx=L+8;ly+=22}var x=lx;lx+=Math.max(MOB?150:210,wd);lg.appendChild(el('rect',{x:x,y:ly,width:14,height:14,fill:it[1]}));lg.appendChild(el('text',{x:x+20,y:ly+12,style:TX+o.ink},it[0]))});s.appendChild(lg)}
    host.appendChild(s);
  }
  /* Fiche 01 : croissance */
  bars(D.getElementById('growChart'),o2({min:-40,max:130,ticks:[-40,0,40,80,120],labels:yrs(1960,2025),show:MOB?[1960,1990,2025]:[1960,1970,1980,1990,2000,2010,2025],
    series:[{v:DATA.ng.map(function(v){return v/1000}),c:'#9A9488'},{v:DATA.mig.map(function(v){return v/1000}),c:'#C0341E'}],
    legend:[['Solde naturel','#9A9488'],['Solde migratoire','#C0341E']],
    notes:MOB?[]:[[2022,127.5,'2022 : 127 500',-6,'end']],
    label:'Solde naturel et solde migratoire en Belgique, 1960-2025, en milliers : le solde naturel dépasse 40 000 par an au début des années 1960 et devient négatif après 2020 ; le solde migratoire atteint 127 502 en 2022'},PP));
  CJD.series('growChart',[{n:'Solde naturel (personnes)',v:DATA.ng},{n:'Solde migratoire (personnes)',v:DATA.mig}],1960);

  /* Barres horizontales empilées 100 % */
  function stack(host,o){CJD.set(host,['Catégorie'].concat(o.names),o.rows.map(function(r){return [r[0]].concat(r[1])}));
    var W=MOB?420:600,rowH=MOB?54:60,L=MOB?86:110,R=W-12,Hh=o.rows.length*rowH+(o.legendRows||1)*26+14;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.rows.forEach(function(r,i){var y=10+i*rowH,x=L;s.appendChild(el('text',{x:L-10,y:y+24,'text-anchor':'end',style:TX+o.ink+';font-weight:700'},r[0]));
      r[1].forEach(function(v,j){var w=(R-L)*v/100;s.appendChild(el('rect',{x:x.toFixed(1),y:y,width:Math.max(w-2,0).toFixed(1),height:rowH-22,fill:o.cols[j],'class':'fadein'}));
        if(w>34)s.appendChild(el('text',{x:x+w/2,y:y+(rowH-22)/2+5,'text-anchor':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:15)+'px;fill:'+o.txt[j]},fr(v,0)+' %'));x+=w})});
    var ly=o.rows.length*rowH+18,lx=L,per=o.per||(MOB?2:4);
    o.names.forEach(function(nm,j){var cx=lx+(j%per)*((R-L)/per),cy=ly+Math.floor(j/per)*24;s.appendChild(el('rect',{x:cx,y:cy-11,width:12,height:12,fill:o.cols[j]}));s.appendChild(el('text',{x:cx+18,y:cy,style:TX+o.ink},nm))});
    host.appendChild(s);
  }
  stack(D.getElementById('immChart'),{rows:[['2024',[9.9,37.9,52.1]]],cols:['#9A9488','#3E3A8C','#C0341E'],txt:['#1A1A1A','#fff','#fff'],names:['Belges','Union','Hors Union*'],per:3,legendRows:1,ink:'#1A1A1A',
    label:'Immigrations en Belgique en 2024 selon la nationalité : 9,9 % de Belges, 37,9 % de citoyens d’autres pays de l’Union, 52,1 % de citoyens de pays hors de l’Union, apatrides et nationalités inconnues compris (0,2 %)'});
  stack(D.getElementById('resChart'),{rows:[['Belgique',[47.4,15.0,10.0,27.6]],['Union',[28.1,15.5,33.6,22.8]]],cols:['#C0341E','#3E3A8C','#2F6B4F','#9A9488'],txt:['#fff','#fff','#fff','#1A1A1A'],names:['Famille','Études','Travail','Autres'],legendRows:MOB?2:1,ink:'#1A1A1A',
    label:'Premiers titres de séjour en 2025 par motif. Belgique : famille 47,4 %, études 15,0 %, travail 10,0 %, autres 27,6 %. Union : famille 28,1 %, études 15,5 %, travail 33,6 %, autres 22,8 %'});

  /* Fiche 02 : asile */
  bars(D.getElementById('asyChart'),o2({min:0,max:45000,ticks:[0,10000,20000,30000,40000],labels:yrs(1985,2025),show:MOB?[1985,2000,2015,2025]:[1985,1990,1995,2000,2005,2010,2015,2020,2025],solo:1,
    series:[{v:DATA.asyOld.concat(yrs(2008,2025).map(function(){return null})),c:'#9A9488'},{v:yrs(1985,2007).map(function(){return null}).concat(DATA.asy),c:'#C9773A'}],legend:[['toutes demandes (1985-2007)','#9A9488'],['premières demandes (depuis 2008)','#C9773A']],notes:[[2000,42690,'42 690'],[2015,39065,'39 065'],[2025,27540,'27 540']],
    label:'Demandes d’asile en Belgique : toutes demandes de 1985 à 2007 (5 385 en 1985, 26 715 en 1993, 42 690 en 2000, 11 575 en 2007), puis premières demandes de 2008 à 2025 (11 395 en 2008, 39 065 en 2015, 12 930 en 2020, 27 540 en 2025)'},DK));
  CJD.rename('asyChart',['Toutes demandes d’asile, 1985-2007 (migr_asyctz)','Premières demandes d’asile, depuis 2008 (migr_asyappctza)'],'Les deux séries ne mesurent pas la même chose : avant 2008, Eurostat compte toutes les demandes, y compris les demandes répétées ; depuis 2008, seulement les premières demandes.');
  lines2(D.getElementById('recChart'),o2({t0:2008,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:125,min:0,max:70,ticks:[0,20,40,60],unit:' %',years:MOB?[2008,2015,2025]:[2008,2011,2014,2017,2020,2025],
    series:[{n:'Belgique',v:DATA.rec,s:2008,c:'#C9773A',w:4}],marks:[[2016,60.2,'60,2 %','#EDE6DC',-12],[2024,48.7,'48,7 %','#EDE6DC',-12]],
    label:'Part des décisions de première instance accordant une protection en Belgique : 25,7 % en 2008, 19,0 % en 2009, 53,8 % en 2015, 60,2 % en 2016, 34,9 % en 2020, 48,7 % en 2024, 29,7 % en 2025'},DK));
  (function(){
    var N=[['Palestine',2815],['Érythrée',2590],['Afghanistan',2395],['RD Congo',2110],['Turquie',2105],['Burundi',1435],['Syrie',1280],['Cameroun',1135],['Guinée',1085]];
    CJD.set('natChart',['Nationalité','Premières demandes d’asile, 2025'],N.map(function(n){return [n[0],n[1]]}));
    var W=MOB?420:600,rh=30,L=MOB?96:110,R=W-70,Hh=N.length*rh+10,mx=3000;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Premières demandes d’asile en Belgique en 2025 par nationalité : '+N.map(function(n){return n[0]+' '+n[1].toLocaleString('fr-BE')}).join(', ')});
    N.forEach(function(n,i){var y=6+i*rh,w=(R-L)*n[1]/mx;s.appendChild(el('text',{x:L-10,y:y+16,'text-anchor':'end',style:TX+DK.ink},n[0]));s.appendChild(el('rect',{x:L,y:y+3,width:w.toFixed(1),height:rh-12,fill:'#C9773A','class':'fadein'}));s.appendChild(el('text',{x:L+w+8,y:y+16,'class':'fadein',style:TX+DK.mute},n[1].toLocaleString('fr-BE')))});
    D.getElementById('natChart').appendChild(s);
  })();

  /* Fiche 03 : emploi */
  lines2(D.getElementById('empChart'),{t0:1995,t1:2025,rm:MOB?70:260,min:40,max:80,ticks:[40,50,60,70,80],unit:' %',grid:'rgba(26,26,26,.14)',mute:'#3D3A35',ink:'#1A1A1A',bg:'#7FB6A3',breaks:[1999,2001,2005,2011,2017,2021],years:MOB?[1995,2005,2015,2025]:[1995,2000,2005,2010,2015,2020,2025],
    series:[{n:'nés en Belgique',v:DATA.empNat,s:1995,c:'#1A1A1A',w:4,dy:-4},{n:'nés hors UE, moyenne UE',v:DATA.empNeuEU,s:2002,c:'#3D3A35',dash:1,dy:4},{n:'nés hors UE, en Belgique',v:DATA.empNeu,s:1995,c:'#701C0E',w:4.5,dy:6}],
    marks:[[1995,42,'42 %','#701C0E',22,'start']],
    label:'Taux d’emploi des 20-64 ans : nés en Belgique 63,1 % en 1995, 69,9 % en 2010 et 75,0 % en 2025 ; nés hors de l’Union vivant en Belgique 42 % en 1995, 49,3 % en 2010 et 60,7 % en 2025 ; nés hors de l’Union dans l’ensemble de l’Union 61,2 % en 2002 et 68,6 % en 2025'});

  /* Fiche 04 : naturalisations et départs */
  (function(){
    var A=DATA.acqs,R=DATA.retBE,W=MOB?420:600,Hh=MOB?320:360;
    lines2(D.getElementById('acqChart'),{t0:2015,t1:2024,w:W,h:Hh,rm:MOB?60:120,years:MOB?[2015,2019,2024]:[2015,2018,2021,2024],min:0,max:6,ticks:[0,2,4,6],unit:' %',grid:'#D7D4CC',mute:'#6A665F',series:[{n:'Pays-Bas',v:A.NL,s:2015,c:'#7FB6A3',w:2.5,dy:-6},{n:'Allemagne',v:A.DE,s:2015,c:'#A69C8F',w:2.5,dy:2},{n:'France',v:A.FR,s:2015,c:'#C9A227',w:2.5,dy:10},{n:'Belgique',v:A.BE,s:2015,c:'#E2402B',w:4,dy:10}],label:'Acquisitions de la nationalité pour 100 résidents étrangers, 2015-2024 : Belgique de 2,14 à 3,68 ; Pays-Bas 3,87 ; Allemagne 2,38 ; France 1,71 en 2024'});
    lines2(D.getElementById('retChart'),{t0:2019,t1:2025,w:W,h:Hh,rm:MOB?70:150,years:MOB?[2019,2022,2025]:[2019,2021,2023,2025],min:0,max:30,ticks:[0,10,20,30],unit:'',grid:'#D7D4CC',mute:'#6A665F',series:[{n:'ordres de quitter',v:R.ord.map(function(v){return v/1000}),s:2019,c:'#1A1A1A',w:3},{n:'départs constatés',v:R.rtn.map(function(v){return v/1000}),s:2019,c:'#E2402B',w:4}],label:'Belgique, ressortissants de pays tiers, en milliers : ordres de quitter le territoire de 22,0 en 2019 à 25,3 en 2025 ; départs constatés de 4,2 à 5,2'});
  })();

  /* Recherche */
  (function(){
    var Q=[
      {q:'L’immigration fait-elle baisser les salaires et l’emploi des natifs ?',j:'La synthèse des National Academies et la revue de Dustmann, Schönberg et Stuhler concluent à des effets moyens faibles. Le cas de Mariel, analysé par Card puis par Borjas, montre que les conclusions sur les moins qualifiés dépendent de la méthode.',c:'Plusieurs études de haut niveau, en Europe, montrant des effets nets sur les salaires des travailleurs peu qualifiés.',b:['b-ma','Majoritaire : effets moyens faibles'],b2:['b-de','Débattu : les groupes exposés'],v:'La plupart des études trouvent des effets moyens très faibles. Les désaccords portent sur les groupes les plus exposés (travailleurs peu qualifiés, immigrés déjà installés), sur le court terme et sur la manière de mesurer.',
       st:[{a:'National Academies of Sciences, 2017',t:'Synthèse de la littérature, États-Unis',l:0,lt:'synthèse',p:'L’effet à long terme sur les salaires et l’emploi des natifs est « très faible » dans l’ensemble ; les effets négatifs, s’il y en a, touchent surtout les immigrés arrivés avant et les natifs sans diplôme du secondaire.',u:'https://www.nationalacademies.org/projects/DBASSE-CNSTAT-13-03/publication/23550',s:'National Academies Press'},
           {a:'Card, 1990, et Borjas, 2017',t:'Miami, arrivée soudaine de réfugiés cubains en 1980 (exode de Mariel)',l:4,p:'Card compare Miami à des villes semblables et ne trouve pas d’effet sur les salaires et le chômage des moins qualifiés. Borjas réanalyse le même épisode en se concentrant sur les travailleurs sans diplôme du secondaire et trouve une baisse de leurs salaires de 10 à 30 %. Ses choix d’échantillon, plus restreints, sont à leur tour discutés.',u:'https://www.hks.harvard.edu/publications/wage-impact-marielitos-reappraisal-0',s:'ILR Review'},
           {a:'Dustmann, Schönberg et Stuhler, 2016',t:'Pourquoi les études divergent',l:0,lt:'revue',p:'Les études ne mesurent pas la même chose : certaines estiment l’effet relatif entre groupes de travailleurs, d’autres l’effet total. Leurs résultats ne sont donc pas directement comparables.',u:'https://doi.org/10.1257/jep.30.4.31',s:'Journal of Economic Perspectives'},
           {a:'Baeyens et al. (BNB), 2020',t:'Belgique, modèle d’équilibre général',l:0,lt:'simulation',p:'Les arrivées des cinq années précédentes augmenteraient le PIB de 3,5 % et le PIB par habitant de 0,7 %. Salaires des natifs : +0,4 % ; salaires des immigrés déjà installés : environ −2 %. Les auteurs présentent ces résultats comme des estimations basses.',u:'https://www.nbb.be/doc/ts/publications/economicreview/2020/ecorev2020_special.pdf',s:'Banque nationale de Belgique'}],
       x:'Une simulation dépend des hypothèses de son modèle : elle illustre un mécanisme, elle ne mesure pas un effet observé. Les études belges de type expérimental sur les salaires manquent.'},
      {q:'Quelles politiques améliorent l’emploi des réfugiés et des immigrés ?',j:'Trois expériences naturelles dans trois pays et un test de discrimination belge (tirage au sort) convergent.',c:'Des évaluations belges des parcours d’intégration ou des règles d’accès au travail des demandeurs d’asile aux résultats contraires.',b:['b-ma','Majoritaire'],v:'Les études les plus solides convergent : attendre longtemps avant de pouvoir travailler nuit durablement à l’emploi, et les cours de langue aident. La discrimination à l’embauche est mesurée directement en Belgique.',
       st:[{a:'Marbach, Hainmueller et Hangartner, 2018',t:'Allemagne, durée d’interdiction de travail modifiée par une décision de justice',l:4,p:'Les réfugiés arrivés en 1999, qui ont attendu environ sept mois de plus avant de pouvoir travailler, avaient un taux d’emploi inférieur d’environ 20 points cinq ans plus tard.',u:'https://doi.org/10.1126/sciadv.aap9519',s:'Science Advances'},
           {a:'Hainmueller, Hangartner et Lawrence, 2016',t:'Suisse, données de panel 1994-2004',l:3,p:'Chaque année supplémentaire d’attente de la décision d’asile réduit ensuite le taux d’emploi de 4 à 5 points.',u:'https://researchonline.lse.ac.uk/id/eprint/67539',s:'Science Advances'},
           {a:'Lochmann, Rapoport et Speciale, 2019',t:'France, cours de langue attribués selon un seuil à un test',l:4,p:'Les heures de cours de langue attribuées augmentent significativement la participation au marché du travail, surtout chez les plus diplômés.',u:'https://doi.org/10.1016/j.euroecorev.2019.01.008',s:'European Economic Review'},
           {a:'Baert, Cockx, Gheyle et Vandamme, 2015',t:'Belgique, candidatures fictives envoyées à des offres réelles',l:5,p:'À profil identique, des jeunes au nom à consonance étrangère devaient envoyer environ deux fois plus de candidatures pour être invités à un entretien dans les métiers où les candidats abondent ; aucune différence dans les métiers en pénurie.',u:'https://ideas.repec.org/a/sae/ilrrev/v68y2015i3p467-500.html',s:'ILR Review'}],
       x:'Nous n’avons pas trouvé d’évaluation causale publiée des parcours d’intégration belges ; si vous en connaissez une, signalez-la.'},
      {q:'Durcir la politique d’asile fait-il baisser les demandes ?',j:'L’étude comparative citée (Hatton, 2009) trouve un effet des politiques plus faible que celui de la situation dans les pays d’origine ; son ampleur dépend de la période et de la méthode.',c:'Des études récentes, de meilleur niveau, sur l’effet des politiques d’asile européennes depuis 2015.',b:['b-de','Débattu : l’ampleur'],v:'Les politiques ont un effet, mais la situation dans les pays d’origine (guerres, persécutions) pèse davantage. Les pics belges de 2015 et de 2022 coïncident avec des guerres, pas avec des changements de règles en Belgique.',
       st:[{a:'Hatton, 2009',t:'Demandes d’asile dans les pays développés, comparaison entre pays et dans le temps',l:2,p:'La violence et la terreur dans les pays d’origine expliquent une grande partie des variations. Des politiques plus strictes ont un effet dissuasif réel, mais n’expliquent qu’environ un tiers de la baisse des demandes après 2001.',u:'https://ideas.repec.org/a/wly/econjl/v119y2009i535pf183-f213.html',s:'Economic Journal'}],
       x:'Peu d’études mesurent de façon causale l’effet d’une règle précise. Le report des demandes d’un pays de l’Union vers un autre reste mal mesuré. Aucune étude belge de ce type n’a été trouvée lors de nos recherches.'},
      {q:'L’immigration coûte-t-elle ou rapporte-t-elle aux finances publiques ?',j:'Les comptabilités de l’OCDE (25 pays), de la BNB et des National Academies trouvent des montants faibles en % du PIB ; le signe change selon les conventions (imputer ou non les biens publics) et l’horizon retenu.',c:'Une comptabilité belge sur l’ensemble du cycle de vie, ou de nouvelles conventions de calcul admises par les institutions.',b:['b-ma','Majoritaire : un effet faible'],b2:['b-de','Débattu : le signe dépend de la méthode'],v:'Dans les pays de l’OCDE étudiés, la contribution budgétaire nette des immigrés est le plus souvent comprise entre −1 et +1 % du PIB. Elle dépend surtout de leur âge et de leur emploi. En Belgique, elle est plus faible que celle des natifs, en grande partie à cause d’un taux d’emploi plus bas.',
       st:[{a:'OCDE, Damas de Matos, 2021',t:'25 pays, moyenne 2006-2018',l:0,lt:'comptabilité',p:'Les immigrés paient leur part des biens publics comme la police ou les transports dans la plupart des pays. Pour la Belgique, si les immigrés avaient le même taux d’emploi que les natifs de même âge et diplôme, leur contribution nette augmenterait de plus de 0,5 point de PIB.',u:'https://www.oecd.org/en/publications/international-migration-outlook-2021_29f23e9d-en/full-report/component-8.html',s:'OCDE'},
           {a:'Baeyens et al. (BNB), 2020',t:'Belgique, transferts reçus et payés',l:0,lt:'comptabilité',p:'La première génération contribue moins que la moyenne, surtout à cause d’un emploi et de salaires plus bas ; la deuxième génération contribue davantage que les natifs, en partie parce qu’elle est plus jeune.',u:'https://www.nbb.be/doc/ts/publications/economicreview/2020/ecorev2020_special.pdf',s:'Banque nationale de Belgique'},
           {a:'National Academies of Sciences, 2017',t:'États-Unis, synthèse',l:0,lt:'synthèse',p:'La première génération coûte plus aux administrations que les natifs ; ses enfants comptent parmi les plus forts contributeurs.',u:'https://www.nationalacademies.org/projects/DBASSE-CNSTAT-13-03/publication/23550',s:'National Academies Press'}],
       x:'Les résultats changent selon les dépenses attribuées (défense, intérêts de la dette), l’horizon choisi et la prise en compte des enfants : un chiffre unique présenté sans ses hypothèses n’a pas de sens.'}];
    function lvl(n,t){var M={1:'corrélation simple',2:'avant-après, témoin imparfait',3:'groupes comparables',4:'expérience naturelle',5:'tirage au sort'};return '<span class="lvl"><em>'+(n?'Évaluation d’impact · '+M[n]:t)+'</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Cosmopolitisme libéral','Joseph Carens','The Ethics of Immigration, 2013','La citoyenneté des pays riches ressemble à un privilège de naissance, comparable aux statuts féodaux. Par principe, les frontières devraient être largement ouvertes.','Les inégalités entre pays et le hasard du lieu de naissance.','Ne dit pas comment gérer les effets d’arrivées nombreuses sur les services publics et l’adhésion démocratique.','L'],
      ['Communautarienne','Michael Walzer','Spheres of Justice, 1983','Une communauté politique a le droit de décider qui la rejoint. Mais ceux qu’elle admet pour travailler doivent pouvoir devenir citoyens : pas de résidents permanents de seconde zone.','La cohésion et l’autodétermination des communautés.','Qui définit « la communauté » ? Le droit de fermer peut servir à exclure arbitrairement.','O'],
      ['Nationalisme libéral','David Miller','Strangers in Our Midst, 2016','Les États peuvent choisir leurs immigrés selon leurs besoins et leur culture politique, mais ils ont des devoirs forts envers les réfugiés et doivent traiter équitablement ceux qu’ils admettent.','Le rythme des arrivées, la sélection et l’intégration.','La frontière entre réfugié et migrant économique est plus floue que la théorie ne le suppose.','O'],
      ['Économie du développement','Michael Clemens','« Economics and Emigration », 2011','Les barrières aux migrations font perdre une richesse considérable : les réduire augmenterait fortement la production mondiale, d’abord au profit des migrants.','Les gains pour les migrants et pour l’économie mondiale.','Les estimations reposent sur des hypothèses très fortes et laissent de côté les effets politiques et sociaux dans les pays d’accueil.','O'],
      ['Économie de la répartition','George Borjas','We Wanted Workers, 2016','L’immigration crée peu de richesse nette pour les natifs, mais elle la redistribue : les travailleurs en concurrence avec les immigrés perdent, les employeurs et les consommateurs gagnent.','Les gagnants et les perdants parmi les natifs.','Ses estimations des effets sur les salaires sont plus fortes que celles de la plupart des autres chercheurs.','O'],
      ['Prudence sur le rythme','Paul Collier','Exodus, 2013','Les migrations profitent aux migrants, mais un rythme trop rapide pourrait affaiblir la confiance sociale dans les pays d’accueil et priver les pays de départ de leurs diplômés. La question est le rythme, pas le principe.','Le rythme des arrivées et la confiance sociale.','Les preuves empiriques sur la diversité et la confiance sont fragiles et discutées.','O'],
      ['Sociologie critique','Abdelmalek Sayad','La double absence, 1999','L’immigré est aussi un émigré : absent de son pays d’origine sans être pleinement reconnu dans la société d’accueil, qui ne le juge légitime que par son travail.','L’expérience des migrants et le regard des États.','Une analyse ancrée dans l’immigration algérienne en France, difficile à généraliser.','K'],
      ['Droits humains','Hannah Arendt','Les Origines du totalitarisme, 1951','Les apatrides et réfugiés de l’entre-deux-guerres ont montré que, sans État pour les protéger, les droits de l’homme restent théoriques : le premier droit est le « droit d’avoir des droits ».','La protection des réfugiés et des apatrides.','Elle décrit un problème plus qu’elle ne propose une politique d’accueil.','O'],
      ['Marxiste','Karl Marx','lettre à S. Meyer et A. Vogt, 1870','En Angleterre, l’antagonisme entre ouvriers anglais et irlandais divise la classe ouvrière, et cette division sert les intérêts des classes dominantes.','La concurrence entre travailleurs et les rapports de classe.','Réduit les migrations à des intérêts de classe ; les effets mesurés sur les salaires sont souvent faibles.','K'],
      ['Sociale-démocrate','Keith Banting et Will Kymlicka','Multiculturalism and the Welfare State (dir.), 2006','La diversité issue de l’immigration n’affaiblit pas forcément la solidarité : les auteurs ne trouvent pas que les politiques d’intégration multiculturelles érodent l’État-providence.','Le lien entre diversité, politiques d’intégration et soutien à la redistribution.','D’autres travaux concluent qu’une population plus diverse soutient moins la redistribution (Alesina et Glaeser, 2004).','S'],
      ['Conservatrice','Christopher Caldwell','Reflections on the Revolution in Europe, 2009','L’immigration de masse transforme durablement les sociétés européennes, et les dirigeants ont sous-estimé la difficulté de l’intégration culturelle, en particulier religieuse.','La culture, l’identité et la cohésion sur le long terme.','Ses critiques lui reprochent des généralisations sur les musulmans et des projections démographiques peu étayées.','C'],
      ['Écologiste','François Gemenne','Atlas des migrations environnementales (avec D. Ionesco et D. Mokhnacheva), 2016','La dégradation de l’environnement et le changement climatique deviennent une cause majeure de déplacements, surtout à l’intérieur des pays pauvres ; migrer est aussi une manière de s’adapter.','Les causes environnementales des migrations et leur géographie.','Isoler la part du climat parmi les causes d’une migration est difficile, et les projections chiffrées sont très incertaines.','E']
    ];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={nes:'Au 1er janvier 2025, 20,2 % des habitants de la Belgique étaient nés à l’étranger, dont quatre sur dix dans un autre pays de l’Union, et 14,2 % n’avaient pas la nationalité belge (Eurostat, migr_pop3ctb et migr_pop1ctz).',
      pop:'Entre 2016 et 2025, le solde migratoire a ajouté 620 046 personnes à la population belge, contre 24 145 pour l’excédent des naissances sur les décès (Eurostat, demo_gind).',
      asy:'En 2025, la Belgique a enregistré 27 540 premières demandes d’asile, soit 2,3 pour 1 000 habitants, contre 1,5 dans l’Union européenne (Eurostat, migr_asyappctza).',
      emp:'En 2025, 60,7 % des personnes de 20 à 64 ans nées hors de l’Union avaient un emploi en Belgique, contre 75,0 % des personnes nées en Belgique (Eurostat, lfsa_ergacob).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('nes');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','growChart','immChart','resChart','asyChart','recChart','natChart','empChart','acqChart','retChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
