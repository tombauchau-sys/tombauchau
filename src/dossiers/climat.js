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
    g.addEventListener('input',function(){go.textContent='−'+g.value+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-32.6)<=4?'Bien vu : ':'Vous avez dit −'+v+' %. ')+'Entre 1990 et 2024, les émissions de gaz à effet de serre de la Belgique ont baissé de 32,6 %, contre 38,0 % dans l’ensemble de l’Union.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='−32,6 %';g.value=33;
    });
  })();

  /* Courbes à départs variables */
  function lines2(host,o){CJD.series(host,o.series,o.t0);
    var T0=o.t0,T1=o.t1,W=o.w||(MOB?420:1000),Hh=o.h||(MOB?360:480),L=MOB?40:56,R=W-(o.rm||(MOB?70:140)),T=30,B=Hh-40,mn=o.min,mx=o.max;
    function X(y){return L+(y-T0)/(T1-T0)*(R-L)} function Y(v){return B-(v-mn)/(mx-mn)*(B-T)}
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    (o.bands||[]).forEach(function(b){s.appendChild(el('rect',{x:X(b[0]),y:T,width:X(b[1])-X(b[0]),height:B-T,fill:b[2]}));s.appendChild(el('text',{x:(X(b[0])+X(b[1]))/2,y:T-10,'text-anchor':'middle',style:'font-family:var(--main);font-weight:600;font-size:'+(MOB?15:22)+'px;fill:'+o.ink},b[3]))});
    o.ticks.forEach(function(v){s.appendChild(el('line',{x1:L,x2:R,y1:Y(v),y2:Y(v),stroke:o.grid}));s.appendChild(el('text',{x:L-10,y:Y(v)+5,'text-anchor':'end',style:TX+o.mute},fr(v,o.tdec||0)+(o.unit||'')))});
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
        g.appendChild(el('text',{x:X(lp[0])+10,y:Y(lp[1])+5+(se.dy||0),'class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+se.c},fr(lp[1],o.dec==null?1:o.dec)+(o.unit||'')+(MOB?'':'  '+se.n)));}
    });
    (o.marks||[]).forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:5.5,fill:k[3],stroke:o.bg||'#1E1914','stroke-width':2,'class':'fadein'}));s.appendChild(el('text',{x:x,y:y+(k[4]||-12),'text-anchor':k[5]||'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+k[3]},k[2]))});
    s.appendChild(g);host.appendChild(s);
  }


  var DK={grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',bg:'#1E1914'},PP={grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',bg:'#F7F6F2'};
  function o2(a,b){for(var k in b)a[k]=b[k];return a}

  /* Barres horizontales groupées, avec unité */
  function hb(host,o){CJD.cats(host,o.cats,o.series);
    var W=MOB?420:(o.w||1000),rh=o.rh||46,L=MOB?130:(o.L||220),R=W-80,k=o.series.length,Hh=o.cats.length*rh+40;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.cats.forEach(function(c,i){var y=10+i*rh;s.appendChild(el('text',{x:L-10,y:y+rh/2+2,'text-anchor':'end',style:TX+o.ink+';font-weight:600'},c));
      o.series.forEach(function(se,j){var bh=(rh-14)/k,yy=y+4+j*bh,w=(R-L)*se.v[i]/o.max;
        s.appendChild(el('rect',{x:L,y:yy.toFixed(1),width:w.toFixed(1),height:(bh-2).toFixed(1),fill:se.c,'class':'fadein'}));
        s.appendChild(el('text',{x:L+w+6,y:(yy+bh/2+3).toFixed(1),'class':'fadein',style:TX+o.ink+';font-weight:700'},fr(se.v[i])+(o.u||'')))})});
    var lx=L;o.series.forEach(function(se){s.appendChild(el('rect',{x:lx,y:Hh-20,width:12,height:12,fill:se.c}));s.appendChild(el('text',{x:lx+18,y:Hh-10,style:TX+o.ink},se.n));lx+=Math.max(MOB?120:170,38+se.n.length*(MOB?8:9))});
    host.appendChild(s);
  }

  lines2(D.getElementById('histChart'),o2({t0:1990,t1:2024,rm:MOB?70:150,min:50,max:110,ticks:[60,80,100],years:MOB?[1990,2005,2024]:[1990,1995,2000,2005,2010,2015,2020,2024],
    bands:[[2008,2012,'#2E2822','Kyoto']],
    series:[{n:'Union',v:DATA.ghgEU,s:1990,c:'#A69C8F',dash:1,dy:8},{n:'Belgique',v:DATA.ghg,s:1990,c:'#C9773A',w:4.5,dy:-4}],
    marks:[[2009,86.5,'2009','#EDE6DC',22],[2020,73.3,'2020','#EDE6DC',22]],
    label:'Émissions de gaz à effet de serre, indice 1990 = 100 : Belgique 67,4 en 2024, Union 62,0 ; chutes en 2009 et 2020'},DK));

  hb(D.getElementById('secChart'),{cats:['Transport','Bâtiments et autres','Procédés industriels','Production d’énergie','Industrie (combustion)','Agriculture','Déchets'],max:32,u:' Mt',ink:'#1A1A1A',
    series:[{n:'1990',v:[21.0,28.2,25.5,29.7,23.6,11.3,4.8],c:'#9A9488'},{n:'2024',v:[24.9,19.8,15.7,14.8,13.0,8.3,1.2],c:'#C0341E'}],
    label:'Émissions par secteur en millions de tonnes, 1990 puis 2024 : transport 21,0 puis 24,9 ; bâtiments et autres 28,2 puis 19,8 ; procédés industriels 25,5 puis 15,7 ; production d’énergie 29,7 puis 14,8 ; industrie 23,6 puis 13,0 ; agriculture 11,3 puis 8,3 ; déchets 4,8 puis 1,2'});

  lines2(D.getElementById('renChart'),o2({t0:2004,t1:2024,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:120,min:0,max:30,ticks:[0,10,20,30],unit:' %',years:MOB?[2004,2014,2024]:[2004,2009,2014,2019,2024],
    series:[{n:'Union',v:DATA.renEU,s:2004,c:'#A69C8F',dash:1,dy:0},{n:'Belgique',v:DATA.ren,s:2004,c:'#C9773A',w:4,dy:4}],
    label:'Part des renouvelables dans la consommation finale brute d’énergie : Belgique 1,9 % en 2004, 14,3 % en 2024 ; Union 9,6 % puis 25,2 %'},DK));
  lines2(D.getElementById('mixChart'),o2({t0:2000,t1:2024,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:150,min:0,max:55,ticks:[0,20,40],years:MOB?[2000,2012,2024]:[2000,2006,2012,2018,2024],
    series:[{n:'gaz',v:DATA.gas,s:2000,c:'#A69C8F',w:3,dy:4},{n:'renouv.',v:DATA.rnw,s:2000,c:'#7FB6A3',w:3.5,dy:6},{n:'nucléaire',v:DATA.nuc,s:2000,c:'#C9773A',w:4,dy:-4}],
    label:'Production d’électricité en Belgique en térawattheures : nucléaire 48,2 en 2000 et 31,3 en 2024 ; renouvelables 1,0 puis 26,5 ; gaz 16,0 puis 14,2'},DK));

  /* Prix de l'électricité : euros courants ou euros de 2025 (IPCH annuel, Eurostat prc_hicp_ainr ; approximation pour des prix semestriels) */
  (function(){
    var host=D.getElementById('priceChart'),real=false;
    function defl(pts,ix){return pts.filter(function(p){return ix[String(Math.floor(p[0]))]}).map(function(p){return [p[0],Math.round(p[1]*1000/ix[String(Math.floor(p[0]))])/10]})}
    function draw(){
      host.innerHTML='';
      var be=real?defl(DATA.price,DATA.ipchBE):DATA.price,eu=real?defl(DATA.priceEU,DATA.ipchEU):DATA.priceEU,pk=be.filter(function(p){return p[0]===2022.5})[0][1];
      var w=host.parentNode&&host.parentNode.querySelector('.axt-y');if(w)w.lastChild.textContent=real?'Centimes d’euro de 2025 par kWh (inflation déduite), toutes taxes comprises':'Centimes d’euro courants par kWh, toutes taxes comprises';
      lines2(host,{t0:2019,t1:2026,rm:MOB?70:150,min:15,max:55,ticks:[20,30,40,50],unit:' c€',grid:'rgba(26,26,26,.14)',mute:'#3D3A35',ink:'#1A1A1A',bg:'#7FB6A3',years:MOB?[2019,2022,2026]:[2019,2020,2021,2022,2023,2024,2025,2026],
        series:[{n:'Union',pts:eu,c:'#3D3A35',dash:1,dy:8},{n:'Belgique',pts:be,c:'#701C0E',w:4.5,dy:-4}],
        marks:[[2022.5,pk,'2022 : '+fr(pk)+' c€','#701C0E',-14]],
        label:real?'Prix de l’électricité pour les ménages, toutes taxes, en centimes d’euro de 2025 par kWh (inflation déduite avec l’IPCH annuel) : Belgique 35,7 au premier semestre 2019, 49,4 au second semestre 2022, 35,0 au second semestre 2025 ; Union 27,4 au premier semestre 2019 et 29,0 au second semestre 2025':'Prix de l’électricité pour les ménages, toutes taxes, en centimes d’euro courants par kWh : Belgique 28,4 au premier semestre 2019, 44,9 au second semestre 2022, 35,8 au premier semestre 2026 ; Union 29,0 au second semestre 2025'});
    }
    var bs=D.querySelectorAll('#priceUnit button');
    bs.forEach(function(b){b.onclick=function(){real=b.dataset.u==='r';bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});draw()}});
    draw();
    CJD.series(host,[{n:'Belgique, c€ courants',pts:DATA.price},{n:'Union, c€ courants',pts:DATA.priceEU},{n:'Belgique, c€ de 2025 (calcul Chiffre Juste)',pts:defl(DATA.price,DATA.ipchBE)},{n:'Union, c€ de 2025 (calcul Chiffre Juste)',pts:defl(DATA.priceEU,DATA.ipchEU)}],2019,null,'Euros de 2025 : prix divisé par l’IPCH annuel moyen (prc_hicp_ainr, 2025 = 100) ; 2026 non converti, faute d’indice annuel.');
  })();

  /* Recherche */
  (function(){
    var Q=[
      {q:'Donner un prix au carbone réduit-il les émissions ?',b:['b-ma','Majoritaire : oui, dans les secteurs couverts'],v:'Les études sur le marché européen du carbone et sur la taxe suédoise trouvent des baisses d’émissions nettes, sans recul mesurable de l’activité des entreprises concernées. Le débat porte surtout sur le niveau de prix nécessaire et sur son acceptation.',
       st:[{a:'Bayer et Aklin, 2020',t:'Marché européen du carbone, 2008-2016',l:0,lt:'estimation contrefactuelle',p:'Plus d’un milliard de tonnes de CO₂ évitées entre 2008 et 2016, soit 3,8 % des émissions de l’Union, malgré un prix bas du quota.',u:'https://strathprints.strath.ac.uk/72023',s:'PNAS'},
           {a:'Colmer, Martin, Muûls et Wagner, 2025',t:'Entreprises manufacturières soumises au marché européen',l:0,lt:'données administratives d’entreprises',p:'Baisse moyenne de 14 à 16 % des émissions de CO₂ des entreprises couvertes, sans contraction détectable de leur activité ni déplacement vers des entreprises non couvertes.',u:'https://ideas.repec.org/a/oup/restud/v92y2025i3p1625-1660..html',s:'Review of Economic Studies'},
           {a:'Andersson, 2019',t:'Suède, taxe carbone sur les carburants',l:3,p:'Comparée à un « jumeau statistique » construit à partir d’autres pays de l’OCDE, la Suède voit ses émissions du transport baisser de près de 11 %, surtout grâce à la taxe carbone.',u:'https://www.aeaweb.org/doi/10.1257/pol.20170144',s:'American Economic Journal: Economic Policy'}],
       x:'Ces études mesurent l’effet sur les secteurs déjà couverts. Elles ne disent pas comment réagiraient les ménages à un prix plus élevé sur le chauffage et la voiture.'},
      {q:'Les économies d’énergie promises se réalisent-elles ?',b:['b-de','Débattu'],v:'Les économies réelles sont parfois bien plus faibles que les projections des ingénieurs. En revanche, l’idée que l’efficacité ferait augmenter la consommation au total, le « paradoxe de Jevons », trouve peu d’appui dans la recherche récente.',
       st:[{a:'Fowlie, Greenstone et Wolfram, 2018',t:'États-Unis, programme d’isolation des logements modestes, plus de 30 000 ménages',l:5,p:'Les économies d’énergie réelles sont environ 2,5 fois plus faibles que prévu ; les coûts d’investissement représentent environ le double des économies réalisées.',u:'https://www.nber.org/papers/w21331',s:'Quarterly Journal of Economics'},
           {a:'Gillingham, Rapson et Wagner, 2014',t:'Synthèse de la recherche sur l’effet rebond',l:0,lt:'revue',p:'L’effet rebond existe, mais la recherche apporte peu d’appui à l’hypothèse selon laquelle il annulerait ou dépasserait les économies d’énergie.',u:'https://www.rff.org/publications/working-papers/the-rebound-effect-and-energy-efficiency-policy/',s:'Resources for the Future'}],
       x:'Le programme étudié porte sur des logements américains modestes ; le résultat ne se transpose pas automatiquement au parc belge, plus ancien et dans un autre climat.'},
      {q:'Pourquoi les taxes carbone sont-elles impopulaires ?',b:['b-pe','Peu étudié en Belgique'],v:'En France, une partie du rejet vient d’une surestimation des pertes : beaucoup pensent perdre de l’argent avec une taxe dont les recettes seraient reversées, alors que ce n’est pas le cas pour la majorité. Les ménages modestes restent toutefois plus exposés aux prix de l’énergie.',
       st:[{a:'Douenne et Fabre, 2022',t:'France, enquête représentative et informations expérimentales',l:0,lt:'enquête et expérience',p:'Les répondants surestiment leurs pertes et jugent à tort régressive une taxe carbone dont les recettes sont reversées à tous. Leur faire changer d’avis est difficile : les opposants écartent les informations favorables.',u:'https://ideas.repec.org/a/aea/aejpol/v14y2022i1p81-110.html',s:'American Economic Journal: Economic Policy'},
           {a:'Eurostat, 2025',t:'Incapacité à chauffer convenablement son logement, Belgique',l:1,lt:'statistique',p:'4,2 % de l’ensemble des habitants, mais 13,2 % des personnes sous le seuil de pauvreté.',u:'https://ec.europa.eu/eurostat/databrowser/view/ilc_mdes01/default/table?lang=fr',s:'Eurostat'}],
       x:'Aucune étude comparable sur la Belgique n’a été trouvée lors de la vérification.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p>'+(s.u?'<a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a>':'')+'</li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Éthique du futur','Hans Jonas','Le Principe responsabilité, 1979','Notre puissance technique crée une responsabilité nouvelle envers les générations futures : il faut agir de sorte que nos actes ne compromettent pas la possibilité d’une vie humaine sur Terre. En cas de doute, le pronostic le plus sombre doit l’emporter.','Le devoir envers ceux qui ne sont pas encore nés.','Une prudence systématique peut freiner des innovations utiles, y compris pour le climat.'],
      ['Biens communs','Garrett Hardin','« The Tragedy of the Commons », 1968','Quand une ressource est en libre accès, chacun a intérêt à l’exploiter davantage, et tous finissent par l’épuiser. On applique souvent ce raisonnement à l’atmosphère, où chacun rejette du CO₂ sans payer.','Les intérêts individuels face à une ressource partagée.','Hardin ne voyait d’issue que dans la contrainte publique ou la propriété privée ; d’autres solutions existent.'],
      ['Gouvernance des communs','Elinor Ostrom','Governing the Commons, 1990','Des communautés gèrent durablement des ressources partagées (pêcheries, pâturages, irrigation) sans État central ni privatisation, grâce à des règles qu’elles se donnent et font respecter.','Les institutions et la coopération.','Ses cas portent sur des communautés de taille limitée ; le climat concerne huit milliards de personnes et près de deux cents États.'],
      ['Économie du climat','William Nordhaus','The Climate Casino, 2013','Le réchauffement est un coût que personne ne paie : il faut un prix du carbone qui augmente progressivement, en pesant le coût des réductions contre les dommages évités.','Le rapport entre coûts et bénéfices de l’action.','Ses modèles sous-estimeraient les risques extrêmes et conduiraient à agir trop lentement, selon ses critiques.'],
      ['Urgence économique','Nicholas Stern','The Stern Review, 2006','Le coût de l’inaction dépasse de loin celui d’une action rapide : il faut réduire fortement les émissions dès maintenant.','Les dommages futurs, comptés presque autant que les coûts présents.','Ses conclusions dépendent d’un taux d’actualisation très bas, jugé discutable par d’autres économistes, dont Nordhaus.'],
      ['Bioéconomie','Nicholas Georgescu-Roegen','The Entropy Law and the Economic Process, 1971','L’économie transforme des ressources en déchets selon les lois de la physique : une croissance matérielle infinie est impossible dans un monde fini. Il a inspiré les courants de la décroissance.','Les limites physiques de la croissance.','Ne dit pas comment organiser une société sans croissance, ni comment y faire adhérer une majorité.'],
      ['Effet rebond','William Stanley Jevons','The Coal Question, 1865','Utiliser le charbon plus efficacement ne réduit pas sa consommation : cela le rend moins cher et en multiplie les usages.','Les effets indirects de l’efficacité énergétique.','La recherche récente trouve des effets rebond réels, mais rarement assez forts pour annuler les économies.'],
      ['Écologie politique','Bruno Latour','Où atterrir ?, 2017','Le climat redessine les conflits politiques : la vraie ligne de partage sépare ceux qui reconnaissent leur dépendance au sol terrestre de ceux qui la nient.','Les attachements au territoire et aux conditions de vie.','Reste abstrait sur les politiques concrètes et leur coût.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={ghg:'Entre 1990 et 2024, les émissions de gaz à effet de serre de la Belgique (hors forêts et sols) ont baissé de 32,6 %, contre 38,0 % pour l’Union européenne (Eurostat, sdg_13_10 et env_air_gge).',
      tra:'Les émissions du transport en Belgique sont passées de 21,0 millions de tonnes d’équivalent CO₂ en 1990 à 24,9 millions en 2024 (+19 %) ; c’est le premier secteur émetteur (Eurostat, env_air_gge).',
      ren:'En 2024, les énergies renouvelables représentaient 14,3 % de la consommation finale brute d’énergie en Belgique, la part la plus basse de l’Union (moyenne : 25,2 %) (Eurostat, nrg_ind_ren).',
      chf:'En 2025, 4,2 % des habitants de la Belgique ne pouvaient pas chauffer convenablement leur logement, et 13,2 % des personnes sous le seuil de pauvreté (Eurostat, ilc_mdes01).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('ghg');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','secChart','renChart','mixChart','priceChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
    var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;
    D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,svg[role=img]')))});
    (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  })();
})();
