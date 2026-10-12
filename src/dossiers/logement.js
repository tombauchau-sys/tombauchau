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
    g.addEventListener('input',function(){go.textContent=g.value+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-70.9)<=5?'Bien vu : ':'Vous avez dit '+v+' %. ')+'En 2025, 70,9 % des habitants de la Belgique vivent dans un logement dont leur ménage est propriétaire, contre 68,5 % dans l’Union.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='70,9 %';g.value=71;
    });
  })();

  /* Courbes à départs variables */
  function lines2(host,o){
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
  function hb(host,o){
    var W=MOB?420:(o.w||1000),rh=o.rh||46,L=MOB?130:(o.L||220),R=W-80,k=o.series.length,Hh=o.cats.length*rh+40;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.cats.forEach(function(c,i){var y=10+i*rh;s.appendChild(el('text',{x:L-10,y:y+rh/2+2,'text-anchor':'end',style:TX+o.ink+';font-weight:600'},c));
      o.series.forEach(function(se,j){var bh=(rh-14)/k,yy=y+4+j*bh,w=(R-L)*se.v[i]/o.max;
        s.appendChild(el('rect',{x:L,y:yy.toFixed(1),width:w.toFixed(1),height:(bh-2).toFixed(1),fill:se.c,'class':'fadein'}));
        s.appendChild(el('text',{x:L+w+6,y:(yy+bh/2+3).toFixed(1),'class':'fadein',style:TX+o.ink+';font-weight:700'},fr(se.v[i])+(o.u||'')))})});
    var lx=L;o.series.forEach(function(se){s.appendChild(el('rect',{x:lx,y:Hh-20,width:12,height:12,fill:se.c}));s.appendChild(el('text',{x:lx+18,y:Hh-10,style:TX+o.ink},se.n));lx+=Math.max(MOB?120:170,38+se.n.length*(MOB?8:9))});
    host.appendChild(s);
  }

  lines2(D.getElementById('histChart'),o2({t0:2005,t1:2025,rm:MOB?70:150,min:60,max:170,ticks:[80,100,120,140,160],years:MOB?[2005,2015,2025]:[2005,2009,2013,2017,2021,2025],
    series:[{n:'Union',v:DATA.hpiEU,s:2005,c:'#A69C8F',dash:1,dy:-2},{n:'Belgique',v:DATA.hpi,s:2005,c:'#C9773A',w:4.5,dy:6}],
    label:'Indice des prix des logements, 2015 = 100 : Belgique 72,9 en 2005 et 144,9 en 2025 ; Union 85,9 puis 161,9'},DK));

  lines2(D.getElementById('ptirChart'),o2({t0:2015,t1:2024,rm:MOB?70:150,min:90,max:120,ticks:[90,100,110,120],years:MOB?[2015,2020,2024]:[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024],
    series:[{n:'Union',v:DATA.ptirEU,s:2015,c:'#6A665F',dash:1,dy:-2},{n:'Belgique',v:DATA.ptir,s:2015,c:'#C0341E',w:4.5,dy:6}],
    label:'Rapport prix des logements sur revenu, 2015 = 100 : Belgique 104,4 en 2021 et 97,0 en 2024 ; Union 115,2 en 2022 et 105,7 en 2024'},PP));

  hb(D.getElementById('burChart'),{cats:['Locataires, prix du marché','Locataires, loyer réduit','Propriétaires sans emprunt','Propriétaires avec emprunt','Ensemble'],max:30,u:' %',ink:'#EDE6DC',L:260,
    series:[{n:'Belgique, 2025',v:[25.4,7.4,1.6,0.9,6.7],c:'#C9773A'}],
    label:'Part des personnes dont le logement coûte plus de 40 % du revenu, 2025 : locataires au prix du marché 25,4 % ; loyer réduit 7,4 % ; propriétaires sans emprunt 1,6 % ; avec emprunt 0,9 % ; ensemble 6,7 %'});

  lines2(D.getElementById('parChart'),{t0:2015,t1:2025,rm:MOB?70:150,min:10,max:35,ticks:[10,20,30],unit:' %',grid:'rgba(26,26,26,.14)',mute:'#3D3A35',ink:'#1A1A1A',bg:'#7FB6A3',years:MOB?[2015,2020,2025]:[2015,2017,2019,2021,2023,2025],breaks:[2019],
    series:[{n:'Union',v:DATA.parEU,s:2015,c:'#3D3A35',dash:1,dy:-2},{n:'Belgique',v:DATA.par,s:2015,c:'#701C0E',w:4.5,dy:6}],
    label:'Part des 25-34 ans vivant chez leurs parents : Belgique 19,0 % en 2015, 20,7 % en 2024, 25,1 % en 2025 ; Union 30,1 % en 2025'});

  /* Recherche */
  (function(){
    var Q=[
      {q:'Encadrer les loyers protège-t-il les locataires ?',b:['b-de','Débattu'],v:'Les locataires déjà en place en profitent : ils restent plus longtemps dans leur logement. Mais les propriétaires concernés peuvent retirer des logements du marché locatif, ce qui fait monter les loyers des autres. L’effet dépend beaucoup de la forme de l’encadrement.',
       st:[{a:'Diamond, McQuade et Qian, 2019',t:'San Francisco, extension du contrôle des loyers en 1994',l:4,p:'Les locataires protégés ont près de 20 % de chances en plus de rester à leur adresse ; les propriétaires concernés réduisent leur offre locative de 15 % ; les loyers de la ville augmentent de 5,1 %.',u:'https://nber.org/papers/w24181',s:'American Economic Review'}],
       x:'Cette étude porte sur un plafonnement strict dans une ville américaine très tendue. Les grilles indicatives de loyers belges, plus souples, n’ont pas été évaluées de la même manière.'},
      {q:'Les aides au logement profitent-elles à ceux qui les reçoivent ?',b:['b-ma','Majoritaire : en partie seulement'],v:'Quand l’offre de logements ne suit pas, une aide à la demande se reporte en partie sur les prix. Les avantages fiscaux à l’achat changent peu la part de propriétaires, mais encouragent l’endettement.',
       st:[{a:'Fack, 2006',t:'France, extension des aides au logement au début des années 1990',l:4,p:'Pour un euro d’aide supplémentaire, le loyer payé par les nouveaux bénéficiaires augmente de 78 centimes.',u:'https://ideas.repec.org/p/hal/journl/hal-00813573.html',s:'Labour Economics'},
           {a:'Gruber, Jensen et Kleven, 2021',t:'Danemark, réduction de la déduction des intérêts d’emprunt',l:4,p:'Aucun effet mesurable sur la part de propriétaires parmi les ménages à revenus moyens et élevés ; en revanche, des effets nets sur l’endettement des ménages.',u:'https://ideas.repec.org/a/aea/aejpol/v13y2021i2p273-303.html',s:'American Economic Journal: Economic Policy'}],
       x:'L’effet de la suppression du bonus logement en Flandre et à Bruxelles, ou de la baisse des droits d’enregistrement, n’a pas été trouvé dans des évaluations comparables lors de la vérification.'},
      {q:'Construire davantage fait-il baisser les loyers ?',b:['b-ma','Majoritaire : oui, localement'],v:'Les études récentes trouvent que de nouveaux logements, même haut de gamme, font baisser les loyers à proximité, parce qu’ils absorbent une partie de la demande. L’ampleur dépend de la quantité construite et de l’endroit.',
       st:[{a:'Asquith, Mast et Reed, 2023',t:'États-Unis, grands immeubles neufs dans des quartiers modestes',l:3,p:'Les loyers à proximité baissent de 5 à 7 % par rapport à des emplacements un peu plus éloignés ou construits plus tard.',u:'https://research.upjohn.org/up_workingpapers/316',s:'Review of Economics and Statistics'},
           {a:'Eurostat, 2025',t:'Surpeuplement des logements',l:1,lt:'statistique',p:'6,6 % des habitants de la Belgique vivent dans un logement surpeuplé, contre 16,8 % dans l’Union : le problème belge est surtout celui du coût, moins celui de la taille.',u:'https://ec.europa.eu/eurostat/databrowser/view/ilc_lvho05a/default/table?lang=fr',s:'Eurostat'}],
       x:'Aucune étude comparable sur l’effet de la construction sur les loyers en Belgique n’a été trouvée lors de la vérification.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p>'+(s.u?'<a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a>':'')+'</li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Marxiste','Friedrich Engels','La Question du logement, 1872','La pénurie de logements ouvriers n’est pas un accident : elle découle du capitalisme. Aider les ouvriers à devenir propriétaires ne résout rien et les attache à leur lieu de travail.','Les rapports entre propriétaires et locataires, capital et travail.','Les politiques publiques du XX<sup>e</sup> siècle ont fortement amélioré le logement ouvrier sans abolir le marché.'],
      ['Économie de la rente','Henry George','Progress and Poverty, 1879','La valeur du sol vient de la collectivité, pas du propriétaire : il faut taxer la rente foncière plutôt que le travail ou la construction.','La valeur du terrain et qui en profite.','Un impôt foncier élevé est politiquement difficile, et sa mise en œuvre exige d’estimer la valeur des terrains.'],
      ['Libérale','Milton Friedman et George Stigler','Roofs or Ceilings?, 1946','Plafonner les loyers crée la pénurie : le prix ne joue plus son rôle de rationnement, les logements sont mal répartis et l’offre se tarit.','Le rôle du prix dans l’offre de logements.','Le marché seul peut laisser les plus pauvres sans logement décent, surtout quand construire prend des années.'],
      ['Droit à la ville','Henri Lefebvre','Le Droit à la ville, 1968','La ville appartient à ceux qui l’habitent : l’accès au logement et aux centres urbains ne doit pas être réservé à ceux qui peuvent payer.','La participation et l’accès de tous aux villes.','Reste vague sur les moyens concrets de financer et de répartir les logements.'],
      ['Urbanisme','Jane Jacobs','Déclin et survie des grandes villes américaines, 1961','La vie urbaine naît de la densité, de la mixité des usages et des bâtiments d’âges différents ; les grands projets planifiés détruisent ce tissu.','La diversité des quartiers et la vie de rue.','Ses idées ont aussi servi à bloquer de nouvelles constructions au nom de la préservation des quartiers.'],
      ['Sociologie de la pauvreté','Matthew Desmond','Evicted, 2016','L’expulsion n’est pas seulement une conséquence de la pauvreté, elle en est une cause : elle fait perdre emploi, école et santé.','Le marché locatif vu par les locataires pauvres.','Son enquête porte sur Milwaukee : le droit belge du bail protège davantage les locataires.'],
      ['Propriétaire','Peter Saunders','A Nation of Home Owners, 1990','La propriété du logement répond à un désir profond de sécurité et d’autonomie ; elle mérite d’être encouragée.','La sécurité et le patrimoine des ménages.','L’accès à la propriété creuse l’écart avec ceux qui restent locataires.'],
      ['Sociologie critique','Pierre Bourdieu','Les Structures sociales de l’économie, 2000','Le marché de la maison individuelle est construit par l’État, les banques et les promoteurs, qui orientent les ménages vers l’achat et l’endettement.','Le rôle de l’État dans la fabrication du « choix » d’acheter.','Sous-estime les préférences réelles des ménages pour la propriété.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={pri:'Entre 2005 et 2025, les prix des logements ont doublé en Belgique (indice 72,9 puis 144,9, 2015 = 100) ; depuis 2015, une fois l’inflation déduite, la hausse est d’environ 7 % (Eurostat, prc_hpi_a, calcul Chiffre Juste).',
      loc:'En 2025, 25,4 % des locataires du marché privé en Belgique consacraient plus de 40 % de leur revenu disponible au logement, contre 0,9 % des propriétaires remboursant un emprunt (Eurostat, ilc_lvho07c).',
      soc:'Fin 2025, 62 234 ménages attendaient un logement social en Région bruxelloise, pour 41 809 logements sociaux au 31 décembre 2025 (SLRB, rapport annuel 2025 ; liste d’attente rapportée par BX1, 2 octobre 2026).',
      jeu:'En 2025, 25,1 % des 25-34 ans vivaient chez leurs parents en Belgique, contre 20,7 % en 2024 et 30,1 % dans l’Union (Eurostat, ilc_lvps08).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('pri');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','ptirChart','burChart','parChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
    var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;
    D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,svg[role=img]')))});
    (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  })();
})();
