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
    g.addEventListener('input',function(){go.textContent=sg(+g.value,0)+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v+51)<=8?'Bien vu : ':'Vous avez dit '+sg(v,0)+' %. ')+'Les cambriolages de logements enregistrés sont passés de 75 640 en 2012 à 36 815 en 2024 : une baisse de 51 %.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='−51 %';g.value=-51;
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
  function yrs(a,b){var r=[];for(var y=a;y<=b;y++)r.push(y);return r}


  var DK={grid:'#3B332B',mute:'#A69C8F',ink:'#EDE6DC',bg:'#1E1914'},PP={grid:'#D7D4CC',mute:'#6A665F',ink:'#1A1A1A',bg:'#F7F6F2'};
  function o2(a,b){for(var k in b)a[k]=b[k];return a}

  /* Fiche 01 : indices */
  lines2(D.getElementById('crimeChart'),o2({t0:2008,t1:2024,rm:MOB?70:250,min:40,max:160,ticks:[40,60,80,100,120,140,160],dec:0,years:MOB?[2008,2012,2016,2020,2024]:[2008,2010,2012,2014,2016,2018,2020,2022,2024],
    series:[{n:'viols',v:DATA.rapeI,s:2008,c:'#3E3A8C',w:4,dy:0},{n:'vols avec violence',v:DATA.robI,s:2008,c:'#6A665F',dash:1,dy:-12},{n:'cambriolages de logements',v:DATA.burgI,s:2008,c:'#C0341E',w:4.5,dy:14}],
    marks:[[2012,118.1,'pic 2012','#C0341E',-12]],
    label:'Indice 100 en 2008 des infractions enregistrées : cambriolages de logements 57 en 2024 après un pic à 118 en 2012 ; vols avec violence 60 ; viols 148'},PP));

  /* Chiffre noir */
  (function(){
    var N=[['Sexuelles, en famille',25.4],['Sexuelles, hors famille',15.7],['Escroqueries en ligne',10.1],['Piratage informatique',9.5],['Hameçonnage',6.6]];
    CJD.set('darkChart',['Type de faits','Victimes ayant signalé à la police (%), 2021'],N.map(function(n){return [n[0],n[1]]}));
    var W=MOB?420:600,rh=38,L=MOB?170:220,R=W-60,Hh=N.length*rh+10;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Part des victimes ayant signalé les faits à la police, 2021 : '+N.map(function(n){return n[0]+' '+fr(n[1])+' %'}).join(', ')});
    N.forEach(function(n,i){var y=6+i*rh,w=(R-L)*n[1]/30;s.appendChild(el('text',{x:L-10,y:y+20,'text-anchor':'end',style:TX+PP.ink},n[0]));s.appendChild(el('rect',{x:L,y:y+6,width:w.toFixed(1),height:rh-16,fill:'#3E3A8C','class':'fadein'}));s.appendChild(el('text',{x:L+w+8,y:y+20,'class':'fadein',style:TX+PP.ink+';font-weight:700'},fr(n[1])+' %'))});
    D.getElementById('darkChart').appendChild(s);
  })();
  lines2(D.getElementById('homChart'),o2({t0:2008,t1:2024,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:90,min:0,max:2.5,ticks:[0,0.5,1,1.5,2,2.5],tdec:1,dec:2,years:MOB?[2008,2016,2024]:[2008,2012,2016,2020,2024],
    series:[{n:'',v:DATA.hom,s:2008,c:'#C0341E',w:4}],marks:[[2015,2.06,'2,06','#1A1A1A',-12]],
    label:'Homicides volontaires enregistrés pour 100 000 habitants en Belgique : 1,91 en 2008, 2,06 en 2015, 1,40 en 2024'},PP));
  CJD.rename('homChart',['Belgique']);

  /* Fiche 02 : prisons */
  lines2(D.getElementById('prisChart'),o2({t0:2008,t1:2025,rm:MOB?78:200,min:8000,max:13500,ticks:[8000,9000,10000,11000,12000,13000],dec:0,years:MOB?[2008,2012,2016,2020,2025]:[2008,2010,2012,2014,2016,2018,2020,2022,2025],
    series:[{n:'places',pts:DATA.cap,c:'#A69C8F',dash:1,dy:10},{n:'détenus',pts:DATA.pris,c:'#C9773A',w:4.5,dy:-2}],
    marks:[[2025.25,12976,'12 976 en cellule (mars 2025)','#EDE6DC',-14,'end']],
    label:'Détenus et capacité officielle des prisons belges : 9 811 détenus pour 8 445 places en 2008 ; 12 581 pour 11 040 en 2024 ; 12 976 détenus en cellule au 31 mars 2025'},DK));

  /* Recherche */
  (function(){
    var Q=[
      {q:'La criminalité augmente-t-elle en Belgique ?',b:['b-et','Établi : les vols ont baissé'],b2:['b-de','Débattu : violences et fraudes'],v:'Les vols et cambriolages enregistrés ont fortement baissé, comme dans beaucoup de pays riches depuis les années 1990. Pour les violences sexuelles et les fraudes, les plaintes augmentent, mais on ne sait pas quelle part vient d’une hausse des faits et quelle part d’une meilleure dénonciation ou de nouvelles formes de délinquance en ligne.',
       st:[{a:'Farrell, Tilley et Tseloni, 2014',t:'Baisse de la criminalité dans les pays riches depuis les années 1990',l:0,lt:'revue',p:'Sur dix-sept explications testées, seule l’amélioration des dispositifs de sécurité (serrures, alarmes, antivols) résiste à tous les tests ; la preuve est forte pour les vols de voitures et s’accumule pour les cambriolages.',u:'https://irep.ntu.ac.uk/id/eprint/26190/',s:'Crime and Justice'},
           {a:'Police fédérale, 2022',t:'Moniteur de sécurité 2021, près de 100 000 répondants',l:1,lt:'enquête',p:'Seules 15,7 % des victimes de violences sexuelles hors famille et environ une victime de violence physique sur trois disent avoir signalé les faits à la police.',u:'https://www.police.be/5998/fr/node/26230',s:'Police fédérale'}],
       x:'Le Moniteur de sécurité n’est pas mené chaque année : il est difficile de savoir si le taux de plainte pour violences sexuelles a augmenté depuis 2021.'},
      {q:'Des peines plus sévères font-elles baisser la criminalité ?',b:['b-ma','Majoritaire : la certitude compte plus que la sévérité'],v:'La probabilité d’être pris dissuade nettement plus que la longueur de la peine. Augmenter une peine déjà longue a peu d’effet dissuasif mesurable.',
       st:[{a:'Nagin, 2013',t:'Synthèse de la recherche sur la dissuasion',l:0,lt:'revue',p:'La certitude d’être pris est un moyen de dissuasion bien plus puissant que la peine elle-même ; augmenter la sévérité dissuade peu.',u:'https://nij.ojp.gov/topics/articles/five-things-about-deterrence',s:'Crime and Justice · synthèse NIJ'},
           {a:'Draca, Machin et Witt, 2011',t:'Londres, redéploiement policier après les attentats de juillet 2005',l:4,p:'Les quartiers qui ont reçu plus de policiers ont vu la criminalité baisser par rapport aux autres : environ 3 à 4 % de criminalité en moins pour 10 % de présence policière en plus.',u:'https://doi.org/10.1257/aer.101.5.2157',s:'American Economic Review'}],
       x:'Aucune étude belge de ce type n’a été trouvée lors de la vérification.'},
      {q:'La prison réduit-elle la récidive ?',b:['b-ma','Majoritaire : pas mieux que les autres peines'],v:'À profil comparable, la prison ne réduit pas davantage la récidive que les peines exécutées hors prison, et pourrait même l’augmenter légèrement. Elle protège en revanche la société pendant la détention.',
       st:[{a:'Nagin, Cullen et Jonson, 2009',t:'Revue des études comparant prison et peines hors prison',l:0,lt:'revue',p:'Par rapport aux sanctions non privatives de liberté, l’emprisonnement a un effet nul ou légèrement criminogène sur les comportements futurs.',u:'https://ojp.gov/ncjrs/virtual-library/abstracts/imprisonment-and-reoffending-crime-and-justice-review-research',s:'Crime and Justice'},
           {a:'Di Tella et Schargrodsky, 2013',t:'Argentine, juges attribués de façon quasi aléatoire',l:4,p:'Les personnes placées sous surveillance électronique ont été réarrêtées dans 13 % des cas, contre 22 % pour des détenus comparables.',u:'https://doi.org/10.1086/669786',s:'Journal of Political Economy'},
           {a:'Robert et Maes (INCC), 2012 ; Mine, Maes et Robert, 2021',t:'Belgique, 14 754 personnes libérées de 2003 à 2005',l:1,p:'44,1 % retournent en prison dans les cinq à huit ans (INCC, rapport n° 38, p. 20) ; 21 % dans les deux ans (Mine, Maes et Robert, police.be, 2021). Étude descriptive : elle ne dit pas ce qui se serait passé sans la prison.',u:'https://nicc.fgov.be/upload/publicaties/rapport_38.pdf',s:'INCC'}],
       x:'Les conditions de détention (surpopulation, accès aux activités) pourraient peser sur la récidive, mais les études belges manquent pour le mesurer.'},
      {q:'L’immigration augmente-t-elle la criminalité ?',b:['b-de','Débattu'],v:'Les études les plus solides trouvent des effets faibles et qui dépendent de la situation des personnes : dans une étude britannique, une vague de demandeurs d’asile, dont l’accès à l’emploi était limité selon les auteurs, s’est accompagnée d’une petite hausse des vols, mais pas une vague de travailleurs européens. Aucune n’a trouvé d’effet sur les violences.',
       st:[{a:'Bell, Fasani et Machin, 2013',t:'Royaume-Uni, deux grandes vagues d’immigration comparées par zone',l:4,p:'La vague de demandeurs d’asile de la fin des années 1990 a entraîné une petite hausse des atteintes aux biens ; la vague de travailleurs venus des nouveaux pays de l’Union après 2004, aucune. Pas d’effet observable sur les violences.',u:'https://researchonline.lse.ac.uk/id/eprint/59323',s:'Review of Economics and Statistics'}],
       x:'Aucune étude causale belge récente n’a été trouvée. La surreprésentation des étrangers en prison (fiche 02) ne suffit pas à répondre : elle mêle délinquance, séjour irrégulier, âge, pauvreté et fonctionnement de la justice.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p></div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Libérale classique','Cesare Beccaria','Des délits et des peines, 1764','Une peine doit être proportionnée, prévue par la loi et certaine plutôt que cruelle : c’est la certitude du châtiment, non sa dureté, qui détourne du crime.','La proportionnalité et la certitude de la peine.','Suppose des individus qui calculent ; beaucoup d’infractions sont impulsives ou liées à l’alcool, à la drogue ou à la détresse.'],
      ['Rétributiviste','Emmanuel Kant','Métaphysique des mœurs, 1797','On punit parce que la personne a commis une faute, et dans la mesure de cette faute ; la peine respecte le condamné comme un être responsable, pas comme un moyen.','La gravité de la faute et la justice due aux victimes.','Ne dit rien de l’efficacité : une peine juste peut ne protéger personne.'],
      ['Utilitariste','Jeremy Bentham','Introduction aux principes de morale et de législation, 1789','Une peine n’est justifiée que si elle évite plus de souffrance qu’elle n’en cause : dissuader, neutraliser, amender. Bentham a aussi imaginé le Panoptique.','La dissuasion et le coût des peines.','Peut justifier de punir lourdement pour l’exemple, au détriment de la justice individuelle.'],
      ['Sociologique','Émile Durkheim','Les Règles de la méthode sociologique, 1895','Le crime est « normal » : toute société en produit. La peine sert surtout à réaffirmer les valeurs communes et la cohésion du groupe.','Ce que la peine dit d’une société.','Ne dit pas quel niveau de crime ou de punition est acceptable.'],
      ['Critique','Michel Foucault','Surveiller et punir, 1975','La prison moderne n’a pas seulement humanisé la peine : elle a inventé une manière de surveiller et de discipliner les corps, et elle produit elle-même de la délinquance.','Le pouvoir derrière les institutions pénales.','Analyse historique et philosophique, difficile à traduire en politique concrète ou à vérifier par les chiffres.'],
      ['Économique','Gary Becker','« Crime and Punishment: An Economic Approach », 1968','Le délinquant compare les gains du crime à la probabilité d’être pris multipliée par la peine. La politique pénale doit choisir la combinaison la moins coûteuse de contrôles et de sanctions.','La probabilité d’arrestation et le coût des peines.','Les recherches montrent que les individus réagissent beaucoup plus à la probabilité d’être pris qu’à la durée de la peine.'],
      ['Ordre public','James Q. Wilson et George Kelling','« Broken Windows », 1982','Laisser passer les petits désordres (vitres cassées, incivilités) signale que personne ne contrôle le quartier et prépare des délits plus graves.','Les incivilités et la présence policière visible.','Ses applications (« tolérance zéro ») ont été accusées de cibler certains groupes, et leur effet propre sur la criminalité est discuté.'],
      ['Justice restauratrice','John Braithwaite','Crime, Shame and Reintegration, 1989','Une sanction qui désapprouve l’acte tout en réintégrant la personne prévient mieux la récidive qu’une sanction qui l’exclut. La réparation envers la victime est centrale.','La réparation, la médiation, la place de la victime.','Moins adaptée aux crimes graves et suppose que l’auteur et la victime acceptent d’y participer.'],
      ['Marxiste','Georg Rusche et Otto Kirchheimer','Punishment and Social Structure, 1939','Les formes de punition dépendent du marché du travail et des rapports de production, plus que du niveau de criminalité.','Le lien entre prison, pauvreté et économie.','Le lien entre économie et punition est réel mais loin d’être mécanique selon les recherches ultérieures.']];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={cam:'En Belgique, les cambriolages de logements enregistrés par la police sont passés de 75 640 en 2012 à 36 815 en 2024, soit une baisse de 51 % (Eurostat, crim_off_cat).',
      pri:'Au 31 mars 2025, 12 976 personnes étaient détenues en cellule dans les prisons belges pour 11 040 places (Conseil central de surveillance pénitentiaire).',
      rec:'Parmi les personnes libérées des prisons belges entre 2003 et 2005, 21 % y sont retournées dans les deux ans et 44,1 % dans un délai de cinq à huit ans (INCC : Robert et Maes, 2012 ; Mine, Maes et Robert, 2021).',
      pla:'En 2021, seules 15,7 % des victimes de violences sexuelles commises hors de la famille déclaraient avoir signalé les faits à la police (Police fédérale, Moniteur de sécurité 2021).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('cam');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','crimeChart','darkChart','homChart','prisChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
    var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;
    D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,svg[role=img]')))});
    (function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  })();
})();
