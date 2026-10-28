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
    g.addEventListener('input',function(){go.textContent=fr(+g.value,0)+' %'});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-35)<=5?'Bien vu : ':'Vous avez dit '+fr(v,0)+' %. ')+'En 2025, 35 % des élèves de 15 ans de la Fédération Wallonie-Bruxelles déclarent avoir déjà redoublé, contre 19 % en Flandre et 8 % en moyenne dans l’OCDE.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='35 %';g.value=35;
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

  /* Fiche 01 : évolution PISA, trois panneaux */
  (function(){
    var SY=['FWB (francophone)','Royaume-Uni','Allemagne','France','Flandre','Pays-Bas'];
    var P=[['Lecture, 2000-2025',[-12,-29,-23,-49,-68,-91]],['Mathématiques, 2003-2025',[-31,-20,-39,-51,-64,-55]],['Sciences, 2006-2025',[-4,-4,-30,-8,-33,-40]]];
    var host=D.getElementById('pisaChart'),W=MOB?420:1000,col=MOB?1:3,pw=W/col,rh=30,L=MOB?170:180,top=34,ph=top+SY.length*rh+10,Hh=ph*(MOB?3:1);
    var lab=[];P.forEach(function(p){lab.push(p[0]+' : '+SY.map(function(n,i){return n+' '+p[1][i]}).join(', '))});
    CJD.set(host,['Système éducatif'].concat(P.map(function(p){return 'Écart '+p[0].toLowerCase()+' (points PISA)'})),SY.map(function(n,i){return [n].concat(P.map(function(p){return p[1][i]}))}));
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Évolution des scores PISA en points. '+lab.join('. ')});
    P.forEach(function(p,k){var ox=MOB?0:k*pw,oy=MOB?k*ph:0,x0=ox+L,sc=(pw-L-48)/95;
      s.appendChild(el('text',{x:x0,y:oy+18,style:'font-family:var(--sans);font-weight:700;font-size:14px;fill:#1A1A1A'},p[0]));
      SY.forEach(function(n,i){var v=p[1][i],y=oy+top+i*rh,w=-v*sc,fwb=i===0;
        s.appendChild(el('text',{x:x0-10,y:y+16,'text-anchor':'end',style:TX+(fwb?'#1A1A1A;font-weight:700':'#3D3A35')},n));
        s.appendChild(el('rect',{x:x0,y:y+4,width:Math.max(w,1.5).toFixed(1),height:rh-12,fill:fwb?'#C0341E':(n==='Flandre'?'#3E3A8C':'#9A9488'),'class':'fadein'}));
        s.appendChild(el('text',{x:(x0+w+6).toFixed(1),y:y+16,'class':'fadein',style:TX+'#1A1A1A;font-weight:700'},'−'+(-v)))});
      s.appendChild(el('line',{x1:x0,x2:x0,y1:oy+top-4,y2:oy+top+SY.length*rh,stroke:'#1A1A1A','stroke-width':1.5}));
    });
    host.appendChild(s);
  })();

  /* Fiche 02 : redoublement et décrochage */
  lines2(D.getElementById('redChart'),o2({t0:2003,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:90,min:0,max:60,ticks:[0,20,40,60],unit:' %',dec:0,years:MOB?[2003,2012,2025]:[2003,2009,2012,2015,2018,2022,2025],
    series:[{n:'',pts:DATA.red,c:'#C9773A',w:4}],marks:[[2003,39,'39 %','#EDE6DC',-12,'start'],[2012,48,'48 %','#EDE6DC',-12],[2022,33,'33 %','#EDE6DC',24]],
    label:'Élèves de 15 ans ayant redoublé, Fédération Wallonie-Bruxelles : 39 % en 2003, 48 % en 2012, 33 % en 2022, 35 % en 2025'},DK));
  CJD.rename('redChart',['FWB : élèves de 15 ans ayant redoublé au moins une fois (%)']);
  lines2(D.getElementById('eslChart'),o2({t0:1992,t1:2025,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:120,min:0,max:20,ticks:[0,5,10,15,20],unit:' %',years:MOB?[1992,2008,2025]:[1992,2000,2008,2016,2025],
    series:[{n:'Union',v:DATA.eslEU,s:2015,c:'#A69C8F',dash:1,dy:-4},{n:'Belgique',v:DATA.esl,s:1992,c:'#C9773A',w:4,dy:8}],
    marks:[[1992,18.1,'18,1 %','#EDE6DC',-12,'start']],
    label:'Décrochage scolaire des 18-24 ans : Belgique 18,1 % en 1992, 7,3 % en 2025 ; Union 9,1 % en 2025'},DK));

  /* Fiche 03 : diplômés du supérieur */
  lines2(D.getElementById('terChart'),{t0:1992,t1:2025,rm:MOB?70:150,min:20,max:60,ticks:[20,30,40,50,60],unit:' %',grid:'rgba(26,26,26,.14)',mute:'#3D3A35',ink:'#1A1A1A',bg:'#7FB6A3',breaks:[1999,2008,2014,2017,2021],years:MOB?[1992,2008,2025]:[1992,1996,2000,2004,2008,2012,2016,2020,2025],
    series:[{n:'Union',v:DATA.terEU,s:2002,c:'#3D3A35',dash:1,dy:6},{n:'Belgique',v:DATA.ter,s:1992,c:'#701C0E',w:4.5,dy:-4}],
    marks:[[1992,27.8,'27,8 %','#1A1A1A',24,'start']],
    label:'Part des 25-34 ans diplômés du supérieur : Belgique 27,8 % en 1992, 40,6 % en 2005, 52,7 % en 2025 ; Union 23,1 % en 2002 et 44,8 % en 2025'});

  /* Fiche 04 : trois Régions */
  (function(){
    var E=DATA.eslReg;
    lines2(D.getElementById('eslReg'),{t0:2015,t1:2025,rm:MOB?60:150,years:MOB?[2015,2020,2025]:[2015,2017,2019,2021,2023,2025],min:0,max:18,ticks:[0,6,12,18],unit:' %',grid:'#D7D4CC',mute:'#6A665F',series:[{n:'Union',v:E.EU,s:2015,c:'#6A665F',dash:1,dy:-4},{n:'Wallonie',v:E.BE3,s:2015,c:'#E2402B',w:3.5,dy:-6},{n:'Bruxelles',v:E.BE1,s:2015,c:'#C9A227',w:3.5,dy:10},{n:'Flandre',v:E.BE2,s:2015,c:'#1F6F5C',w:3.5}],label:'Sortie précoce de l’école, 18-24 ans, 2015-2025 : Bruxelles de 15,8 % à 8,8 % ; Wallonie de 13,1 % à 9,8 % ; Flandre de 7,2 % à 5,5 % ; Union de 11,0 % à 9,1 %'});
  })();

  /* Recherche */
  (function(){
    var Q=[
      {q:'Le redoublement aide-t-il les élèves en difficulté ?',j:'Une méta-analyse de 84 études et une revue systématique des études causales concordent : pas de bénéfice moyen. Une expérience naturelle à Chicago et plusieurs études belges comparant des élèves semblables vont dans le même sens. Les données de l’aSPe décrivent l’ampleur du redoublement en Fédération Wallonie-Bruxelles sans en mesurer l’effet.',c:'Des évaluations belges par tirage au sort ou expérience naturelle, notamment en Fédération Wallonie-Bruxelles après la réforme du tronc commun.',b:['b-ma','Convergent : pas de bénéfice moyen'],b2:['b-de','Variable : selon la forme du redoublement'],v:'En moyenne, le redoublement n’apporte pas de bénéfice durable : une méta-analyse de 84 études trouve un effet moyen nul. Il est plus défavorable dans les systèmes qui, comme la Belgique, gèrent les écarts entre élèves par le redoublement et les filières précoces, et quand l’élève refait simplement la même année ; il est plus favorable quand il s’accompagne d’un soutien ciblé. Le léger avantage de l’année redoublée s’efface ensuite, chez les plus jeunes comme chez les plus âgés. En Belgique, les études qui comparent les redoublants à des élèves semblables ne trouvent pas de bénéfice durable, et observent davantage de retard, d’orientations vers l’enseignement spécialisé ou des filières moins valorisées, et de décrochage.',
       st:[{a:'Goos, Pipa et Peixoto, 2021',t:'84 études jugées solides (2000-2019), 1 328 résultats, de la maternelle à la fin du secondaire',l:0,lt:'méta-analyse',p:'Effet moyen nul (g = −0,04 ; intervalle de confiance à 95 % : −0,11 à +0,03). Plus négatif dans les pays qui gèrent les écarts par le redoublement et les filières précoces, dont la Belgique (g = −0,18), et quand l’élève refait simplement la même année (−0,10) ; positif quand le redoublement s’accompagne d’un soutien (+0,20). Le léger avantage de l’année redoublée diminue ensuite ; le moment du redoublement (précoce ou tardif) n’est pas un facteur significatif.',u:'https://doi.org/10.1016/j.edurev.2021.100401',s:'Educational Research Review, 100401'},
           {a:'Valbuena, Mediavilla, Choi et Gil, 2021',t:'Revue systématique des études corrigeant le biais de sélection',l:0,lt:'revue systématique',p:'Le redoublement est « peu susceptible d’être une politique efficace » : ses coûts dépassent des bénéfices faibles. En Floride, l’effet positif du redoublement en 3e année devient non significatif après 6 ans. Études belges recensées : en Flandre, pas d’effet l’année même mais des effets négatifs à long terme sur la lecture (Lamote et al., 2014), plus de décrochage et de réorientation, surtout pour les plus faibles (Cockx et al., 2019) ; en Fédération Wallonie-Bruxelles, renforcer la menace du redoublement après la réforme de 2001 n’a pas amélioré les résultats (Belot et Vandenberghe, 2014).',u:'https://doi.org/10.1111/joes.12406',s:'Journal of Economic Surveys'},
           {a:'Jacob et Lefgren, 2009',t:'Chicago, élèves juste au-dessus et juste en dessous du seuil de redoublement',l:4,p:'Le redoublement augmente modestement la probabilité d’abandonner l’école chez les élèves plus âgés ; pas d’effet significatif chez les plus jeunes.',u:'https://ideas.repec.org/p/nbr/nberwo/13514.html',s:'American Economic Journal: Applied'},
           {a:'Goos, Van Damme, Onghena, Petry et de Bilde, 2013',t:'Flandre, cohorte SiBO, redoublement en 1re primaire, comparaison à des élèves au risque de redoublement semblable mais promus',l:3,p:'Le redoublement de 1re primaire aide moins que ne le pensent parents et enseignants : les redoublants auraient mieux réussi en lecture et en mathématiques s’ils avaient été promus ; ils auraient eu moins de chances d’être orientés vers l’enseignement spécialisé ou la filière B. Près de 60 % des redoublants reçoivent une aide, sans changer ce constat.',u:'https://lirias.kuleuven.be/1793445',s:'Journal of School Psychology, 51(3), 323-347'},
           {a:'aSPe (ULiège), 2026',t:'PISA 2025, Fédération Wallonie-Bruxelles',l:0,lt:'statistique officielle',p:'35,2 % des élèves de 15 ans ont déjà redoublé, contre 19,4 % en Flandre et 8,4 % en moyenne dans l’OCDE. Le taux était de 47,8 % en 2012 (Cahier n° 49, septembre 2026).',u:'https://www.pisa-fwb.uliege.be/cms/c_13724469/fr/pisa-2025-cahier-sciences-education-49',s:'Université de Liège'}],
       x:'Les études belges comparent les redoublants à des élèves semblables, mais pas tirés au sort : elles réduisent le biais de sélection sans l’éliminer. Elles portent surtout sur la Flandre ; en Fédération Wallonie-Bruxelles, une étude porte sur la réforme de 2001 (citée de seconde main). Le redoublement accompagné d’un soutien paraît plus favorable, mais il est rarement distingué dans les études.'},
      {q:'Orienter tôt les élèves vers des filières augmente-t-il les inégalités ?',j:'Hanushek et Woessmann, trois revues (dont une systématique) et les données PISA vont dans le même sens sur le poids de l’origine sociale. Les comparaisons entre pays ne sont pas des preuves causales ; les réformes suédoise et finlandaise, plus proches d’une mesure causale, vont dans le même sens.',c:'Des évaluations de réformes qui ont retardé l’orientation, comme le tronc commun, montrant des effets différents.',b:['b-ma','Convergent'],v:'Les comparaisons entre pays montrent que les systèmes qui orientent tôt les élèves vers des écoles ou filières séparées renforcent le poids de l’origine sociale sur les résultats, sans gain clair de niveau moyen. Leur effet sur l’écart de résultats entre élèves est moins net selon les études. Des réformes qui ont retardé l’orientation en Suède et en Finlande ont réduit les inégalités ultérieures de revenus.',
       st:[{a:'Hanushek et Woessmann, 2006',t:'Comparaison de pays, avant et après l’âge de l’orientation',l:0,lt:'comparaison entre pays (différence de différences)',p:'L’orientation précoce augmente les inégalités de résultats ; elle tend aussi à réduire le niveau moyen, mais cette conclusion est moins solide.',u:'https://hanushek.stanford.edu/publications/does-educational-tracking-affect-performance-and-inequality-differences-differences',s:'Economic Journal, 116(510), C63-C76'},
           {a:'Van de Werfhorst et Mijs, 2010',t:'Revue des comparaisons internationales (PISA, TIMSS, PIRLS)',l:0,lt:'revue de littérature',p:'Les pays qui orientent tôt dans des écoles séparées ont plus d’inégalités selon l’origine sociale et ethnique. Il n’y a « pas de schéma clair » entre orientation et écart de résultats entre élèves, et pas de meilleur niveau moyen dans les pays aux résultats plus dispersés.',u:'https://doi.org/10.1146/annurev.soc.012809.102538',s:'Annual Review of Sociology, 36, 407-428'},
           {a:'Woessmann, 2009',t:'Revue des études internationales et nationales',l:0,lt:'revue de littérature',p:'Sur 27 pays (PISA 2003), plus l’orientation est tardive, moins l’origine sociale pèse sur les résultats ; effet sur le niveau moyen non significatif. Des réformes qui ont retardé l’orientation (Suède, années 1950 ; Finlande, années 1970) ont réduit les inégalités sur le marché du travail. Une réanalyse (Waldinger, 2007) trouve des résultats non significatifs. L’auteur est coauteur de l’étude de 2006.',u:'https://hdl.handle.net/10419/166958',s:'CESifo DICE Report, 7(1), 26-34'},
           {a:'Zapfe et Gross, 2021',t:'13 études sur les caractéristiques des systèmes scolaires',l:0,lt:'revue systématique',p:'La séparation des élèves entre écoles va avec une plus forte inégalité sociale ; la séparation en général, avec une plus forte inégalité ethnique. La plupart des études n’expliquent pas le mécanisme.',u:'https://doi.org/10.1016/j.ijer.2021.101837',s:'International Journal of Educational Research, 109, 101837'},
           {a:'aSPe (ULiège), 2026',t:'PISA 2025, lecture, systèmes classés par modèle',l:0,lt:'statistique officielle',p:'Dans les systèmes « à séparation » (Allemagne, Autriche, Pays-Bas, Communautés belges…), l’inégalité sociale des résultats est plus élevée que dans les autres modèles (97 points contre 70 à 77).',u:'https://www.pisa-fwb.uliege.be/cms/c_13724472/fr/pisa2025-synthese-et-slides',s:'Université de Liège'}],
       x:'Les pays diffèrent par bien d’autres aspects que l’âge d’orientation ; l’effet propre de cette règle reste difficile à isoler, et une réanalyse (Waldinger, 2007) ne trouve pas de résultat significatif avec moins de pays. En Belgique, l’orientation se mêle au redoublement : les élèves sont souvent orientés après un échec. Les écarts sont grands à l’intérieur du modèle « à séparation » : en 2025, l’inégalité sociale des résultats est de 78 points en Fédération Wallonie-Bruxelles et de 92 en Communauté flamande, contre 97 en moyenne pour ce modèle (aSPe). En Fédération Wallonie-Bruxelles, le tronc commun, qui devait retarder l’orientation jusqu’à la fin de la 3e secondaire, a été revu par un accord du gouvernement en octobre 2025 (retour d’options en 3e ; presse) : son effet ne pourra pas être évalué avant plusieurs années.'},
      {q:'Quels moyens améliorent les résultats des élèves ?',j:'Une méta-analyse de 31 études quasi expérimentales et une étude sur les réformes du financement (États-Unis) montrent un effet moyen positif de la dépense ; deux expériences par tirage au sort (petites classes, préscolaire) montrent l’effet de certains usages, et une méta-analyse sur les repas scolaires l’absence d’effet d’un autre. L’étude belge sur l’encadrement différencié décrit l’usage des moyens, sans pouvoir mesurer les résultats des élèves.',c:'Des évaluations belges de l’encadrement différencié ou des moyens supplémentaires accordés à certaines écoles.',b:['b-ma','Convergent : l’argent compte, en moyenne (États-Unis)'],b2:['b-de','Débattu : tout dépend de l’usage'],v:'Aux États-Unis, dépenser plus par élève améliore en moyenne les résultats et surtout les parcours scolaires : selon une méta-analyse de 31 études, 1 000 dollars de plus par élève pendant quatre ans augmentent un peu les scores et de 2,8 points l’entrée dans l’enseignement supérieur, un peu moins pour les élèves favorisés. Mais l’effet dépend de l’usage : les petites classes au début de la scolarité et un préscolaire de qualité pour les enfants défavorisés ont des effets démontrés par tirage au sort, alors que d’autres moyens, comme les repas scolaires dans les pays riches, ont un effet minime.',
       st:[{a:'Jackson et Mackevicius, 2024',t:'États-Unis, 31 études exploitant des hausses de dépense imposées de l’extérieur (réformes, décisions de justice)',l:0,lt:'méta-analyse',p:'1 000 dollars de plus par élève pendant quatre ans augmentent en moyenne les scores de 0,0316 écart-type (intervalle de confiance à 95 % : 0,021 à 0,043) et l’entrée dans le supérieur de 2,8 points ; dans un nouveau contexte, l’effet sur le diplôme et l’entrée dans le supérieur serait positif dans plus de 97 % des cas. Effets plus faibles pour les élèves favorisés ; semblables quel que soit le niveau de dépense de départ ; biais de publication jugés minimes.',u:'https://doi.org/10.1257/app.20220279',s:'American Economic Journal: Applied Economics, 16(1), 412-446'},
           {a:'Jackson, Johnson et Persico, 2016',t:'États-Unis, réformes du financement des écoles imposées par les tribunaux, enfants nés entre 1955 et 1985 suivis jusqu’en 2011',l:4,p:'Une hausse de 10 % de la dépense par élève pendant les 12 années de scolarité conduit à 0,31 année d’études en plus, à des salaires environ 7 % plus élevés et à 3,2 points de pauvreté en moins à l’âge adulte ; les effets sont beaucoup plus marqués pour les enfants de familles à bas revenu.',u:'https://doi.org/10.1093/qje/qjv036',s:'Quarterly Journal of Economics, 131(1), 157-218'},
           {a:'Krueger, 1999',t:'Tennessee, élèves et enseignants répartis au hasard entre petites et grandes classes',l:5,p:'Les élèves des petites classes gagnent environ 4 points de percentile la première année, puis environ 1 point par an ; l’effet est plus fort pour les élèves défavorisés.',u:'https://www.nber.org/papers/w6051',s:'Quarterly Journal of Economics'},
           {a:'Heckman et al., 2010',t:'États-Unis, programme préscolaire Perry, enfants tirés au sort',l:5,p:'Rendement social estimé à 7 à 10 % par an, pour les garçons comme pour les filles.',u:'https://nber.org/papers/w15471',s:'Journal of Public Economics'},
           {a:'Ayllón et Lado, 2025',t:'Pays à revenu élevé, 42 études et 2 821 estimations',l:0,lt:'méta-analyse (document de travail)',p:'Une fois corrigé le biais de publication, les programmes de repas scolaires ont un effet minime sur le comportement, la santé et les résultats ; les programmes ciblés sur les familles à faibles revenus et les petits-déjeuners font un peu mieux.',u:'https://hdl.handle.net/10419/325100',s:'IZA Discussion Paper 18042'},
           {a:'Desmet, Dupriez et Galand (UCLouvain), 2017',t:'Bruxelles, cinq implantations secondaires en encadrement différencié suivies quatre ans',l:0,lt:'étude descriptive',p:'Les changements observés chez les élèves (climat, motivation, absentéisme) sont très modestes, et les moyens supplémentaires sont rarement mis au service de la pédagogie. Les résultats scolaires n’ont pas pu être mesurés.',u:'https://ojs.uclouvain.be/index.php/cahiersgirsef/issue/download/4443/1423',s:'Cahiers du Girsef, n° 108'}],
       x:'Ces résultats sont surtout américains, et anciens pour les petites classes et le préscolaire : leur transposition à la Belgique reste à vérifier. Les effets sur les résultats aux tests sont faibles comparés aux effets sur les parcours (diplôme, études supérieures). Aucune étude belge ne mesure l’effet des moyens supplémentaires sur les résultats des élèves. Les études européennes sur la taille des classes n’ont pas encore été examinées ici.'}];
    function lvl(n,t){var M={1:'corrélation simple',2:'avant-après, témoin imparfait',3:'groupes comparables',4:'expérience naturelle',5:'tirage au sort'};return '<span class="lvl"><em>'+(n?'Évaluation d’impact · '+M[n]:t)+'</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Sociologie classique','Émile Durkheim','Éducation et sociologie, 1922','L’éducation est la socialisation méthodique de la jeune génération : elle transmet à chacun ce que la société juge nécessaire pour vivre ensemble.','Ce que l’école transmet en commun.','Insiste sur l’intégration à la société plus que sur l’épanouissement ou l’esprit critique de l’individu.','O'],
      ['Pragmatisme démocratique','John Dewey','Democracy and Education, 1916','L’école doit être une petite démocratie où l’on apprend en faisant et en coopérant : c’est ainsi qu’on forme des citoyens.','Les méthodes d’apprentissage actives.','Ses applications ont parfois été accusées de négliger la transmission des savoirs de base.','O'],
      ['Sociologie critique','Pierre Bourdieu et Jean-Claude Passeron','Les Héritiers, 1964','L’école récompense une culture que les enfants des milieux favorisés reçoivent à la maison, et transforme ainsi des inégalités sociales en inégalités de « mérite ».','Le lien entre origine sociale et réussite.','Laisse peu de place aux réussites qui échappent au déterminisme et aux politiques qui réduisent les écarts.','K'],
      ['Capital humain','Gary Becker','Human Capital, 1964','L’éducation est un investissement : elle accroît la productivité et les revenus futurs, pour l’individu comme pour la société.','Les rendements du diplôme et les choix d’études.','Réduit l’école à sa valeur économique ; une partie du « rendement » peut refléter un signal de sélection plutôt qu’un gain de compétences.','L'],
      ['Libérale','Milton Friedman','« The Role of Government in Education », 1955','L’État peut financer l’école sans la gérer : un chèque éducation laisserait les familles choisir et mettrait les écoles en concurrence.','Le libre choix et la concurrence entre écoles.','La concurrence peut renforcer la ségrégation sociale entre écoles, un risque déjà discuté en Belgique où le libre choix existe.','L'],
      ['Pédagogie de l’émancipation','Paulo Freire','Pédagogie des opprimés, 1968','L’éducation ne doit pas « déposer » des savoirs dans des esprits passifs, mais aider chacun à comprendre et transformer sa situation.','L’autonomie et l’esprit critique des élèves.','Sa dimension politique explicite est contestée, et ses effets sont difficiles à évaluer.','K'],
      ['Conservatisme culturel','Hannah Arendt','« La crise de l’éducation », 1958','L’école doit transmettre le monde existant aux nouveaux venus et assumer l’autorité de cette transmission, pour qu’ils puissent un jour le renouveler.','L’autorité des enseignants et la transmission des savoirs.','Peut servir à justifier un immobilisme face aux inégalités que l’école reproduit.','C'],
      ['Justice scolaire','François Dubet','L’École des chances, 2004','L’égalité des chances est nécessaire mais insuffisante : une école juste doit aussi garantir un socle commun à tous et ne pas humilier ceux qui échouent.','Le socle commun et le sort des élèves en difficulté.','Le « socle commun » peut abaisser les ambitions pour les meilleurs élèves, selon ses critiques.','S'],
      ['Écologie politique','Ivan Illich','Une société sans école, 1971','L’école obligatoire confond apprendre et être scolarisé ; il faudrait des réseaux d’apprentissage libres, ouverts à tous et tout au long de la vie.','La place de l’institution scolaire dans l’apprentissage.','Sans école commune, les inégalités entre familles risquent de se creuser.','E']
    ];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={red:'En 2025, 35 % des élèves de 15 ans de la Fédération Wallonie-Bruxelles déclaraient avoir déjà redoublé, contre 19 % en Flandre et 8 % en moyenne dans l’OCDE (PISA 2025, aSPe ULiège).',
      pisa:'Entre 2000 et 2025, le score moyen en lecture des élèves de 15 ans a reculé de 68 points en Flandre et de 12 points en Fédération Wallonie-Bruxelles (PISA, aSPe ULiège, 2026).',
      dep:'En 2024, les dépenses publiques d’enseignement atteignaient 6,3 % du PIB en Belgique, contre 4,7 % en moyenne dans l’Union européenne (Eurostat, gov_10a_exp).',
      dip:'En 2025, 52,7 % des Belges de 25 à 34 ans étaient diplômés du supérieur, contre 44,8 % dans l’Union, et 7,3 % des 18-24 ans avaient quitté l’école sans diplôme du secondaire supérieur (Eurostat).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('red');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','pisaChart','redChart','eslChart','terChart','eslReg'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
