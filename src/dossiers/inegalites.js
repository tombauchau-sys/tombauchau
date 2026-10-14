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
    g.addEventListener('input',function(){go.textContent=fr(+g.value,1).replace(',0','')+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-10.9)<=2?'Bien vu : ':'Vous avez dit '+fr(v,1).replace(',0','')+' %. ')+'En 2025, 10,9 % des habitants de la Belgique vivent sous le seuil de pauvreté, contre 16,3 % dans l’Union. C’est le deuxième taux le plus bas de l’Union, après la Tchéquie.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='10,9 %';g.value=11;
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

  /* Barres horizontales groupées */
  function hbars(host,o){CJD.cats(host,o.cats,o.series);
    var W=MOB?420:(o.w||1000),rh=o.rh||46,L=MOB?120:(o.L||200),R=W-70,k=o.series.length,Hh=o.cats.length*rh+40;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.cats.forEach(function(c,i){var y=10+i*rh;s.appendChild(el('text',{x:L-10,y:y+rh/2+2,'text-anchor':'end',style:TX+o.ink+';font-weight:600'},c));
      o.series.forEach(function(se,j){var bh=(rh-14)/k,yy=y+4+j*bh,w=(R-L)*se.v[i]/o.max;
        s.appendChild(el('rect',{x:L,y:yy.toFixed(1),width:w.toFixed(1),height:(bh-2).toFixed(1),fill:se.c,'class':'fadein'}));
        s.appendChild(el('text',{x:L+w+6,y:(yy+bh/2+3).toFixed(1),'class':'fadein',style:TX+o.ink+';font-weight:700'},fr(se.v[i])+' %'))})});
    var lx=L;o.series.forEach(function(se){s.appendChild(el('rect',{x:lx,y:Hh-20,width:12,height:12,fill:se.c}));s.appendChild(el('text',{x:lx+18,y:Hh-10,style:TX+o.ink},se.n));lx+=Math.max(MOB?120:170,38+se.n.length*(MOB?8:9))});
    host.appendChild(s);
  }
  var DK={grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',bg:'#1E1914'},PP={grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',bg:'#F7F6F2'};
  function o2(a,b){for(var k in b)a[k]=b[k];return a}

  lines2(D.getElementById('povChart'),o2({t0:1995,t1:2025,rm:MOB?70:150,min:0,max:20,ticks:[0,5,10,15,20],unit:' %',years:MOB?[1995,2010,2025]:[1995,2000,2005,2010,2015,2020,2025],breaks:[2003,2019],
    series:[{n:'',pts:DATA.pov1,c:'#C9773A',w:4,end:false},{n:'Union',v:DATA.povEU,s:2015,c:'#A69C8F',dash:1,dy:-4},{n:'Belgique',pts:DATA.pov2,c:'#C9773A',w:4.5,dy:8}],
    marks:[[2019,14.8,'2019 : 14,8 %','#EDE6DC',28,'end']],
    label:'Taux de risque de pauvreté en Belgique : 16,0 % en 1995, 14,8 % en 2019 (après la réforme de l’enquête), 10,9 % en 2025 ; Union : 16,3 % en 2025'},DK));
  CJD.rename('povChart',['Belgique, enquête ECHP (%)','Union (%)','Belgique, enquête SILC (%)'],'Ruptures de série en 2003 (ECHP vers SILC, aucune donnée en 2002) et en 2019.');

  hbars(D.getElementById('ageChart'),{cats:['Moins de 18 ans','18-24 ans','65 ans et plus','Ensemble'],max:25,ink:'#1A1A1A',
    series:[{n:'2019',v:[19.0,16.0,15.8,14.8],c:'#9A9488'},{n:'2025',v:[14.5,12.6,9.3,10.9],c:'#C0341E'}],
    label:'Taux de risque de pauvreté selon l’âge en 2019 et 2025 : moins de 18 ans 19,0 puis 14,5 % ; 18-24 ans 16,0 puis 12,6 % ; 65 ans et plus 15,8 puis 9,3 % ; ensemble 14,8 puis 10,9 %'});

  hbars(D.getElementById('preChart'),{w:600,L:150,rh:60,cats:['Belgique','Union'],max:30,ink:'#EDE6DC',
    series:[{n:'avant transferts',v:[23.0,24.4],c:'#A69C8F'},{n:'après transferts',v:[10.9,16.3],c:'#C9773A'}],
    label:'Risque de pauvreté en 2025 avant et après transferts sociaux (hors pensions) : Belgique 23,0 puis 10,9 % ; Union 24,4 puis 16,3 %'});
  lines2(D.getElementById('giniChart'),o2({t0:2014,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:120,min:20,max:32,ticks:[20,24,28,32],years:MOB?[2014,2019,2025]:[2014,2017,2020,2025],breaks:[2019],
    series:[{n:'Union',v:DATA.giniEU,s:2015,c:'#A69C8F',dash:1,dy:-4},{n:'Belgique',v:DATA.gini,s:2014,c:'#C9773A',w:4,dy:6}],
    label:'Coefficient de Gini : Belgique 25,9 en 2014, 23,4 en 2025 ; Union 29,2 en 2025'},DK));

  /* Patrimoine : barre empilée */
  (function(){
    var P=[['50 % les moins riches',8.4,'#EDE6DC','#1A1A1A'],['40 % du milieu',36.6,'#3D3A35','#fff'],['10 % les plus riches',55.0,'#701C0E','#fff']];
    CJD.set('wealthChart',['Groupe de ménages','Part du patrimoine net (%), 2e trimestre 2023'],P.map(function(p){return [p[0],p[1]]}));
    var W=MOB?420:1000,L=10,R=W-10,Hh=MOB?150:120,x=L;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Patrimoine net des ménages belges au 2e trimestre 2023 : 8,4 % pour les 50 % les moins riches, 36,6 % pour les 40 % du milieu, 55 % pour les 10 % les plus riches'});
    P.forEach(function(p,i){var w=(R-L)*p[1]/100;s.appendChild(el('rect',{x:x.toFixed(1),y:10,width:(w-2).toFixed(1),height:50,fill:p[2],'class':'fadein'}));
      s.appendChild(el('text',{x:(x+w/2).toFixed(1),y:41,'text-anchor':'middle','class':'fadein',style:'font-family:var(--sans);font-weight:700;font-size:'+(MOB?14:17)+'px;fill:'+p[3]},fr(p[1])+' %'));
      var ly=MOB?84+i*20:86;s.appendChild(el('text',{x:MOB?L:(x+w/2),y:ly,'text-anchor':MOB?'start':'middle',style:TX+'#1A1A1A;font-weight:600'},(MOB?fr(p[1])+' % : ':'')+p[0]));x+=w});
    D.getElementById('wealthChart').appendChild(s);
  })();

  /* Recherche */
  (function(){
    var Q=[
      {q:'Les impôts et allocations réduisent-ils la pauvreté ?',b:['b-et','Établi : un effet massif sur les revenus'],b2:['b-de','Débattu : les effets sur les comportements'],v:'Mécaniquement, les transferts sociaux divisent par deux le nombre de personnes sous le seuil en Belgique. Ce que l’on discute, c’est leur effet indirect : sur l’incitation à travailler, sur l’épargne, et donc sur ce qui se passerait sans eux.',
       st:[{a:'Eurostat, 2025',t:'Risque de pauvreté avant et après transferts sociaux',l:1,lt:'statistique',p:'Belgique : 23,0 % avant transferts (pensions exclues), 10,9 % après. Union : 24,4 % puis 16,3 %. La Belgique réduit davantage la pauvreté par ses transferts que la moyenne européenne.',u:'https://ec.europa.eu/eurostat/databrowser/view/ilc_li10/default/table?lang=fr',s:'Eurostat'},
           {a:'Eurostat, 2025',t:'Risque de pauvreté selon l’intensité de travail du ménage, moins de 65 ans',l:1,lt:'statistique',p:'50,0 % sous le seuil dans les ménages où l’on ne travaille presque pas, 1,5 % là où les adultes travaillent quasi à temps plein.',u:'https://ec.europa.eu/eurostat/databrowser/view/ilc_li06/default/table?lang=fr',s:'Eurostat'},
           {a:'SPF Sécurité sociale, 2024',t:'Belgique, adéquation des prestations et effet des transferts, revenus 2018 à 2022',l:0,lt:'rapport public',p:'Les transferts sociaux réduisent le taux de risque de pauvreté d’environ 51 % (revenus 2022), contre 42 % (revenus 2018). Mais tous les minimums ne protègent pas de la même façon : en juillet 2024, le revenu d’intégration d’une personne isolée atteignait 84 % du seuil de pauvreté, la pension minimum d’un isolé 121 %. Le rapport signale que les seuils 2023 et 2024 sont estimés.',u:'https://socialsecurity.belgium.be/sites/default/files/content/docs/en/publications/20241120_adequacy_of_social_protection_final_def.pdf',s:'SPF Sécurité sociale'}],
       x:'Le calcul « avant transferts » ne tient pas compte des comportements : il mesure l’ampleur de la redistribution, pas un monde sans elle.'},
      {q:'Augmenter le salaire minimum détruit-il des emplois ?',b:['b-de','Débattu'],v:'Les études récentes les plus citées trouvent des effets faibles ou nuls sur l’emploi pour des hausses modérées. D’autres chercheurs trouvent des pertes d’emploi chez les jeunes et les moins qualifiés. L’ampleur de la hausse compte beaucoup.',
       st:[{a:'Card et Krueger, 1994',t:'New Jersey et Pennsylvanie, restauration rapide, avant et après une hausse',l:4,p:'Après la hausse du salaire minimum au New Jersey en 1992, l’emploi dans les fast-foods n’a pas baissé par rapport à la Pennsylvanie voisine.',u:'https://www.nber.org/papers/w4509',s:'American Economic Review'},
           {a:'Cengiz, Dube, Lindner et Zipperer, 2019',t:'États-Unis, 138 hausses de salaire minimum entre 1979 et 2016',l:4,p:'Le nombre d’emplois peu payés reste à peu près stable dans les cinq ans suivant une hausse ; des pertes apparaissent dans les secteurs exposés au commerce international.',u:'https://doi.org/10.1093/qje/qjz014',s:'Quarterly Journal of Economics'},
           {a:'Neumark et Wascher, 2006',t:'Revue des études publiées depuis le début des années 1990, plusieurs pays',l:0,lt:'revue',p:'Une nette majorité des études examinées trouvent des effets négatifs sur l’emploi, plus marqués et plus réguliers pour les travailleurs les moins qualifiés.',u:'https://www.nber.org/papers/w12663',s:'NBER, document de travail 12663'},
           {a:'Vandekerckhove, Van Gyes et Goos, 2018',t:'Belgique, secteurs de la commission paritaire, une vingtaine d’années',l:2,p:'Des hausses modérées des salaires minimums sectoriels ne s’accompagnent pas systématiquement de pertes d’emploi. Les auteurs préviennent que les liens observés reflètent aussi le fait que salaires minimums et emploi évoluent ensemble ; ils ajoutent qu’un salaire minimum peut prévenir la pauvreté au travail, mais pas celle des ménages sans emploi.',u:'https://www.belspo.be/belspo/brain-be/projects/FinalReports/IPSWICH_2018_policy-note-ii-minimum-wages.pdf',s:'HIVA (KU Leuven), Belspo'},
           {a:'Vandekerckhove, Desiere et Lenaerts, 2020',t:'Belgique, salaires par secteur, indexation utilisée comme variable instrumentale',l:3,p:'Les hausses du salaire minimum compressent la distribution des salaires par le bas et par le haut : syndicats et employeurs privilégient la hausse des bas salaires. L’étude porte sur les salaires, pas sur l’emploi.',u:'https://ideas.repec.org/p/nbb/reswpp/202007-387.html',s:'Banque nationale, document de travail 387'}],
       x:'Les grandes études portent surtout sur les États-Unis, où le salaire minimum est bas par rapport au salaire médian. En Belgique, les salaires minimums sont surtout fixés par secteur et indexés ; l’effet d’une forte hausse du salaire minimum national n’y a pas été évalué de façon causale.'},
      {q:'Les inégalités de patrimoine vont-elles forcément augmenter ?',b:['b-de','Débattu'],v:'Thomas Piketty soutient que, quand le rendement du capital dépasse la croissance, le patrimoine se concentre. Ses critiques montrent que la hausse de la part du capital dans les revenus vient surtout du logement, ce qui change le diagnostic et les solutions.',
       st:[{a:'Piketty, 2013',t:'Données historiques sur trois siècles, plusieurs pays',l:0,lt:'synthèse historique',p:'Quand le rendement du capital est durablement supérieur à la croissance, les patrimoines hérités tendent à peser de plus en plus lourd.',u:'',s:'Seuil'},
           {a:'Rognlie, 2015',t:'Sept grandes économies, part du capital nette de l’usure',l:0,lt:'analyse de données',p:'La seule hausse durable de la part du capital dans les revenus vient du logement ; le reste est surtout un rattrapage après la baisse des années 1948-1970.',u:'https://www.brookings.edu/articles/deciphering-the-fall-and-rise-in-the-net-capital-share',s:'Brookings Papers on Economic Activity'}],
       x:'En Belgique, la Banque nationale publie la répartition du patrimoine depuis peu : il est trop tôt pour mesurer une tendance de long terme.'},
      {q:'Les plus hauts revenus captent-ils une part croissante en Belgique ?',b:['b-pe','Peu étudié'],v:'L’étude de long terme de référence sur les déclarations fiscales belges (Decoster et al., KU Leuven) ne trouve pas de hausse de la part des 10 % aux plus hauts revenus depuis 1990, contrairement au Royaume-Uni, aux États-Unis ou à l’Allemagne. Les auteurs présentent leurs résultats comme provisoires.',
       st:[{a:'Decoster, Dedobbeleer et Maes, 2019',t:'Belgique, déclarations fiscales 1990-2013',l:0,lt:'analyse de données',p:'Après correction des biais des tableaux fiscaux publiés, la part des 10 % aux plus hauts revenus culmine à 37,5 % en 1994 et s’établit à 35,2 % en 2013 ; celle du 1 % le plus aisé culmine à 9,8 % en 2001 et revient à 8,3 % en 2013. Les tableaux publiés sans correction, eux, montrent une hausse : la conclusion dépend des hypothèses sur les revenus non déclarés.',u:'https://wid.world/www-site/uploads/2019/02/WID_WORKING_PAPER_2019_4_Belgium.pdf',s:'World Inequality Database, document de travail 2019/04'}],
       x:'Les données fiscales voient très mal les revenus du capital : en Belgique, la plupart sont soumis à un précompte libératoire et n’ont pas à être déclarés (les auteurs estiment que 97 % des revenus de la propriété manquent). Les résultats dépendent donc de la façon dont on répartit ces revenus manquants, et la série s’arrête en 2013.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p>'+(s.u?'<a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a>':'')+'</li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Égalitarisme libéral','John Rawls','A Theory of Justice, 1971','Les inégalités ne sont justes que si elles profitent aux plus défavorisés et si les positions restent ouvertes à tous. On les juge derrière un « voile d’ignorance », sans savoir quelle place on occupera.','Le sort des plus défavorisés.','Ne dit pas jusqu’où redistribuer, et suppose qu’on peut s’accorder sur ce qu’est être « défavorisé ».'],
      ['Libertarienne','Robert Nozick','Anarchy, State, and Utopia, 1974','Une répartition est juste si chacun a acquis ses biens par des moyens légitimes. Redistribuer de force revient à disposer du travail d’autrui.','La légitimité de l’acquisition et la liberté.','Ignore que les positions de départ, héritées de l’histoire, sont rarement le fruit d’acquisitions légitimes.'],
      ['Libérale classique','Friedrich Hayek','Le Mirage de la justice sociale, 1976','Dans une société de marché, personne ne décide de la répartition des revenus : parler de « justice sociale » n’a pas de sens. L’État doit garantir un minimum, pas corriger les écarts.','Le filet de sécurité minimal et l’ordre spontané du marché.','Un minimum garanti suppose déjà de juger certaines situations inacceptables, donc une idée de justice.'],
      ['Marxiste','Karl Marx','Le Capital, 1867','Les inégalités naissent de la propriété des moyens de production : ceux qui ne possèdent que leur force de travail produisent une valeur dont une partie revient aux propriétaires.','La répartition entre travail et capital.','Les économies mixtes ont fortement réduit la pauvreté sans abolir la propriété privée.'],
      ['Économie des inégalités','Thomas Piketty','Le Capital au XXI<sup>e</sup> siècle, 2013','Quand le rendement du capital dépasse la croissance, le patrimoine hérité se concentre. Un impôt progressif sur le capital permettrait de l’éviter.','Le patrimoine et l’héritage sur le long terme.','La hausse de la part du capital s’expliquerait surtout par le logement, selon ses critiques.'],
      ['Sociologie de la pauvreté','Peter Townsend','Poverty in the United Kingdom, 1979','La pauvreté est relative : est pauvre celui qui ne peut participer aux modes de vie ordinaires de sa société, faute de ressources.','La privation et l’exclusion sociale.','Une définition relative peut faire paraître la pauvreté stable même quand le niveau de vie des plus modestes progresse.'],
      ['Réformisme','Anthony Atkinson','Inequality: What Can Be Done?, 2015','Les inégalités ne sont pas une fatalité : fiscalité progressive, emploi garanti, capital de départ pour chaque jeune peuvent les réduire.','Les politiques concrètes de réduction des inégalités.','Plusieurs de ses propositions sont coûteuses et peu testées à grande échelle.'],
      ['Conservatrice','Charles Murray','Losing Ground, 1984','Des aides sociales mal conçues peuvent décourager le travail et la formation des familles, et enfermer dans la dépendance ceux qu’elles veulent aider.','Les incitations créées par les allocations.','Ses conclusions sur les États-Unis ont été vivement contestées, et le lien entre aides et dépendance varie selon les systèmes.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={pov:'En 2025, 10,9 % des habitants de la Belgique vivaient sous le seuil de pauvreté, contre 16,3 % dans l’Union européenne ; c’est le deuxième taux le plus bas de l’Union (Eurostat, ilc_li02).',
      red:'En Belgique, sans les transferts sociaux (hors pensions), 23,0 % des habitants auraient été sous le seuil de pauvreté en 2025 ; après ces transferts, ils étaient 10,9 % (Eurostat, ilc_li10 et ilc_li02).',
      pat:'Au deuxième trimestre 2023, les 10 % des ménages belges les plus riches détenaient 55 % du patrimoine net, et la moitié la moins riche 8,4 % (Banque nationale de Belgique).',
      reg:'En 2025, 33,6 % des Bruxellois étaient à risque de pauvreté ou d’exclusion sociale, contre 20,0 % des Wallons et 11,4 % des Flamands (Eurostat, ilc_peps11n).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('pov');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','povChart','ageChart','preChart','giniChart','wealthChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
