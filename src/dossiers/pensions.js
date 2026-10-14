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
    g.addEventListener('input',function(){go.textContent=fr(+g.value)});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-2.1)<0.3?'Bien vu : ':'Vous avez dit '+fr(v)+'. ')+'La projection donne environ 2,1 personnes de 15 à 64 ans pour chaque personne de 65 ans ou plus en 2070, contre 3,1 aujourd’hui et 5,4 en 1960.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='2,1';g.value=2.1;
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
    (o.marks||[]).forEach(function(k){var x=X(k[0]),y=Y(k[1]);s.appendChild(el('circle',{cx:x,cy:y,r:5.5,fill:k[3],stroke:o.bg||'#1E1914','stroke-width':2,'class':'fadein'}));s.appendChild(el('text',{x:x+(k[6]||0),y:y+(k[4]||-12),'text-anchor':k[5]||'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:16)+'px;fill:'+k[3]},k[2]))});
    s.appendChild(g);host.appendChild(s);
  }

  /* Histoire : dépendance 1960-2070 */
  lines2(D.getElementById('depChart'),{t0:1960,t1:2070,min:10,max:55,ticks:[10,20,30,40,50],grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',years:MOB?[1960,1990,2025,2070]:[1960,1970,1980,1990,2000,2010,2025,2040,2055,2070],
    bands:[[2025,2070,'rgba(201,119,58,.14)','projection']],
    series:[{n:'',v:DATA.dep,s:1960,c:'#C9773A',w:4.5,end:false},{n:'',pts:DATA.proj,c:'#C9773A',w:3,dash:1,end:false}],
    marks:[[1960,18.5,'18,5','#EDE6DC',24,'start'],[1985,20.3,'20,3','#EDE6DC',22],[2025,31.8,'31,8','#EDE6DC',-14],[2070,48.3,'48,3 (projection)','#C9773A',-14,'end']],
    label:'Personnes de 65 ans et plus pour 100 personnes de 15 à 64 ans : 18,5 en 1960, 31,8 en 2025, 48,3 projeté en 2070'});
  CJD.rename('depChart',['Observé (Eurostat, demo_pjanind)','Projection EUROPOP2023, scénario de base'],'Une projection n’est pas une prévision. Rupture de série en 2011.');

  /* Fiche 01 : coût */
  lines2(D.getElementById('costChart'),{t0:2001,t1:2024,min:6,max:12,ticks:[6,8,10,12],unit:' %',grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',bg:'#F7F6F2',years:MOB?[2001,2010,2020,2024]:[2001,2004,2008,2012,2016,2020,2024],
    series:[{n:'Union',v:DATA.oldEU,s:2010,c:'#6A665F',dash:1,dy:-4},{n:'Belgique',v:DATA.oldBE,s:2001,c:'#E2402B',w:4.5,dy:6}],
    marks:[[2001,6.8,'6,8 %','#E2402B',-12,'start'],[2020,10.1,'Covid : 10,1 %','#E2402B',26,'end',-10]],
    label:'Dépenses publiques vieillesse en % du PIB : Belgique de 6,8 % en 2001 à 10,2 % en 2024 ; Union 10,7 % en 2024'});

  /* Fiche 02 : pauvreté et écart */
  lines2(D.getElementById('povChart'),{t0:2015,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:125,min:0,max:25,ticks:[0,5,10,15,20,25],unit:' %',grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',breaks:[2018.5],years:MOB?[2015,2019,2023,2025]:[2015,2017,2019,2021,2023,2025],
    series:[{n:'Union',v:DATA.povEU,s:2015,c:'#A69C8F',dash:1,dy:-4},{n:'Belgique',v:DATA.povBE,s:2015,c:'#C9773A',w:4,dy:4}],
    label:'Risque de pauvreté des 65 ans et plus : Belgique 15,2 % en 2015, 9,3 % en 2025 ; Union 16,3 % en 2025'});
  lines2(D.getElementById('gapChart'),{t0:2015,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:125,min:0,max:40,ticks:[0,10,20,30,40],unit:' %',grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',years:MOB?[2015,2019,2023,2025]:[2015,2017,2019,2021,2023,2025],
    series:[{n:'Union',v:DATA.gapEU,s:2015,c:'#A69C8F',dash:1,dy:8},{n:'Belgique',v:DATA.gapBE,s:2015,c:'#EFA3CB',w:4,dy:-4}],
    label:'Écart de pension femmes-hommes, 65-79 ans : Belgique 28,3 % en 2025, Union 24,2 %'});

  /* Recherche */
  (function(){
    var Q=[
      {q:'Le vieillissement rend-il les pensions impayables ?',b:['b-et','Établi : le coût augmente'],b2:['b-de','Débattu : l’ampleur'],v:'À règles inchangées, plus de pensionnés par travailleur fait monter le coût. Mais son ampleur dépend des réformes, de l’emploi et surtout de la productivité : ce qui compte est la richesse produite, pas seulement le nombre de cotisants.',
       st:[{a:'Comité d’étude sur le vieillissement, 2026',t:'Projections officielles à 2070',l:0,lt:'simulation',p:'Coût budgétaire du vieillissement : +1,5 point de PIB entre 2025 et 2070, dont +0,7 pour les pensions après la réforme récente (qui l’a réduit de 1,4 point). Hypothèse centrale : productivité en hausse de 1,1 % par an en moyenne ; avec 0,9 % par an, le coût atteint +3,3 points. L’estimation dépasse de 0,2 point celle du rapport précédent.',u:'https://blog.forumforthefuture.be/fr/article/vieillissement-en-belgique-a-lhorizon-2070-les-depenses-sociales-augmentent-jusquen-2050-puis-se-stabilisent-.../31873',s:'Bureau fédéral du Plan (relayé)'},
           {a:'Barr, 2002',t:'Synthèse de la théorie économique des pensions',l:0,lt:'revue',p:'Une série de mythes sur les pensions est « remarquablement persistante ». Le choix entre répartition et capitalisation est « de second ordre » : la variable clé est un État efficace.',u:'https://ideas.repec.org/a/wly/intssr/v55y2002i2p3-36.html',s:'International Social Security Review'}],
       x:'Les projections reposent sur des hypothèses longues (natalité, migrations, productivité) : elles se trompent souvent sur le niveau, moins sur le sens.'},
      {q:'Reculer l’âge de la retraite fait-il travailler plus longtemps ?',b:['b-ma','Majoritaire'],v:'Oui en partie : l’emploi des aînés augmente quand l’âge recule. Mais une partie des personnes concernées passe par le chômage ou l’invalidité, surtout les moins qualifiées et celles en moins bonne santé.',
       st:[{a:'Staubli et Zweimüller, 2013',t:'Autriche, recul de l’âge de retraite anticipée selon l’année de naissance',l:4,p:'Emploi des personnes concernées : +9,75 points chez les hommes, +11 chez les femmes. Mais chômage : +12,5 et +11,8 points. La hausse de l’emploi est concentrée chez les mieux payés et en meilleure santé.',u:'https://ideas.repec.org/a/eee/pubeco/v108y2013icp17-32.html',s:'Journal of Public Economics'},
           {a:'Minne et Saks (BNB), 2023',t:'Belgique, enquêtes',l:1,p:'Le taux d’emploi des 55-64 ans est passé d’environ 25 % en 2002 à près de 57 % en 2022, avec le durcissement de l’accès aux régimes de départ anticipé.',u:'https://www.nbb.be/doc/ts/publications/economicreview/2023/ecorevi2023_h15.pdf',s:'Banque nationale de Belgique'}],
       x:'Les effets de la réforme belge de 2026 (bonus et malus) ne sont pas encore observables.'},
      {q:'Capitalisation ou répartition : l’une est-elle plus sûre ?',b:['b-de','Débattu'],v:'Les deux systèmes dépendent de la même chose : la richesse produite quand on est pensionné. La répartition est exposée à la démographie, la capitalisation aux marchés financiers. La recherche ne désigne pas de vainqueur général.',
       st:[{a:'Samuelson, 1958',t:'Modèle des générations successives',l:0,lt:'théorie',p:'Dans un système par répartition, chaque génération finance la précédente : le « rendement » dépend de la croissance de la population et des revenus. Un contrat social peut améliorer la situation de toutes les générations.',u:'https://www.journals.uchicago.edu/doi/10.1086/258100',s:'Journal of Political Economy'},
           {a:'Feldstein, 1974',t:'États-Unis, séries temporelles',l:1,p:'La sécurité sociale par répartition réduirait l’épargne et le capital. Résultat célèbre… dont une erreur de programmation a été découverte ensuite. Dans sa correction (1980), l’auteur trouve encore une baisse importante de l’épargne, mais plus faible que dans l’estimation initiale.',u:'https://www.nber.org/papers/w0579',s:'Journal of Political Economy · correction NBER'}],
       x:'Comme pour la dette (Reinhart et Rogoff), l’histoire de l’étude de Feldstein rappelle l’importance de la réplication.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Bismarckienne (assurance professionnelle)','Otto von Bismarck','loi allemande sur l’assurance vieillesse et invalidité, 1889','La pension prolonge le salaire : elle est financée par les cotisations des travailleurs et des employeurs et dépend de la carrière. C’est la logique dont la Belgique s’est inspirée.','Le lien entre carrière, cotisations et montant de la pension.','Protège mal ceux qui ont des carrières courtes ou hachées, souvent des femmes.'],
      ['Beveridgienne (protection universelle)','William Beveridge','Social Insurance and Allied Services, 1942','Chacun doit recevoir une pension de base forfaitaire, financée par tous, qui garantit un minimum vital quelle que soit la carrière.','La pension minimum et la pauvreté des aînés.','Une pension forfaitaire basse pousse ceux qui le peuvent vers l’épargne privée, et creuse les écarts.'],
      ['Libérale classique','Milton Friedman','Capitalism and Freedom, 1962','Obliger chacun à cotiser à un système public restreint la liberté de choisir comment préparer sa retraite. L’État devrait se limiter à combattre la pauvreté.','La liberté de choix et le rendement de l’épargne.','Beaucoup de personnes épargnent trop peu sans obligation, et les marchés peuvent s’effondrer au mauvais moment.'],
      ['Économie du cycle de vie','Franco Modigliani et Richard Brumberg','« Utility Analysis and the Consumption Function », 1954','Chacun épargne pendant sa vie active pour consommer pendant sa retraite : la pension est un report de consommation.','Le taux d’épargne et le revenu sur toute la vie.','Les comportements réels s’éloignent souvent de ce calcul rationnel, d’où l’intérêt des systèmes obligatoires.'],
      ['Contrat entre générations','Paul Samuelson','« An Exact Consumption-Loan Model… », 1958','La répartition est un contrat social : chaque génération paie pour la précédente et sera payée par la suivante. Ce contrat peut profiter à toutes.','La croissance de la population et des revenus.','Le contrat est fragile quand la population active cesse de croître.'],
      ['Sociale-démocrate','Gøsta Esping-Andersen','The Three Worlds of Welfare Capitalism, 1990','Une bonne pension permet de vivre dignement sans dépendre du marché ni de sa famille. Les régimes diffèrent selon le degré de cette indépendance.','Le taux de remplacement et la pauvreté des aînés.','Une protection généreuse coûte cher et dépend d’un emploi élevé pour être financée.'],
      ['Marxiste (salaire continué)','Bernard Friot','L’enjeu des retraites, 2010','La pension n’est pas une épargne différée mais la continuation du salaire : les retraités restent des producteurs de valeur, que la cotisation reconnaît.','La part des cotisations dans la richesse produite.','Une théorie de la valeur contestée par la plupart des économistes, et un modèle peu chiffré.'],
      ['Conservatrice','Edmund Burke','Réflexions sur la Révolution de France, 1790','La société est un contrat entre les morts, les vivants et ceux qui sont à naître. Appliquée aux pensions, cette idée invite à préserver un système qui relie les générations, en le réformant avec prudence.','La solidarité entre générations et la stabilité des règles.','La prudence peut retarder des ajustements nécessaires et en reporter le coût sur les plus jeunes.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={dep:'En 2025, la Belgique comptait 31,8 personnes de 65 ans et plus pour 100 personnes de 15 à 64 ans, contre 18,5 en 1960 ; les projections d’Eurostat annoncent 48,3 en 2070 (demo_pjanind, proj_23ndbi).',
      cout:'Les dépenses publiques liées à la vieillesse sont passées de 6,8 % du PIB en 2001 à 10,2 % en 2024 en Belgique, contre 10,7 % dans l’Union européenne (Eurostat, gov_10a_exp).',
      pov:'En 2025, 9,3 % des Belges de 65 ans et plus étaient à risque de pauvreté, contre 16,3 % dans l’Union européenne (Eurostat, ilc_li02).',
      rep:'En Belgique, la pension médiane des 65-74 ans représente 48 % du revenu médian du travail des 50-59 ans, contre 60 % dans l’Union européenne (Eurostat, ilc_pnp3, 2025).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('dep');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','depChart','costChart','povChart','gapChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
    var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;
    D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,svg[role=img]')))});
    (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  })();
})();
