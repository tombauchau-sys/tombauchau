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
    function yr(v){return fr(v)+(v>=2?' ans':' an')}
    g.addEventListener('input',function(){go.textContent=yr(+g.value)});
    D.getElementById('reveal').addEventListener('click',function(){
      var v=+g.value;
      vd.innerHTML=(Math.abs(v-0.2)<=0.3?'Bien vu : ':'Vous avez dit '+yr(v)+'. ')+'L’espérance de vie en bonne santé est passée de 63,7 ans en 2008 à 63,9 ans en 2024 : à peine 0,2 an de plus, alors que l’espérance de vie a gagné 2,6 ans.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='0,2 an';g.value=0.2;
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

  /* Histoire : espérance de vie 1960-2024 */
  lines2(D.getElementById('leChart'),o2({t0:1960,t1:2024,rm:MOB?70:150,min:65,max:85,ticks:[65,70,75,80,85],years:MOB?[1960,1980,2000,2024]:[1960,1970,1980,1990,2000,2010,2024],breaks:[2011,2014],
    series:[{n:'Union',v:DATA.leEU,s:2002,c:'#A69C8F',dash:1,dy:10},{n:'Belgique',v:DATA.le,s:1960,c:'#C9773A',w:4.5,dy:-4}],
    marks:[[1960,69.7,'69,7 ans','#EDE6DC',26,'start'],[2020,80.8,'2020 : 80,8','#EDE6DC',30,'start']],
    label:'Espérance de vie à la naissance en Belgique : 69,7 ans en 1960, 80,8 en 2020, 82,4 en 2024 ; Union : 81,5 en 2024'},DK));

  /* Fiche 01 : espérance de vie et années en bonne santé */
  lines2(D.getElementById('hlyChart'),o2({t0:2004,t1:2024,rm:MOB?70:230,min:55,max:85,ticks:[55,60,65,70,75,80,85],years:MOB?[2004,2012,2024]:[2004,2008,2012,2016,2020,2024],breaks:[2005,2019],
    series:[{n:'ans d’espérance de vie',v:DATA.leB,s:2004,c:'#3E3A8C',w:4,dy:0},{n:'ans en bonne santé',v:DATA.hly,s:2004,c:'#C0341E',w:4.5,dy:0}],
    marks:[[2008,79.8,'79,8','#3E3A8C',-12],[2008,63.7,'63,7','#C0341E',-12]],
    label:'Belgique : espérance de vie de 79,8 ans en 2008 à 82,4 ans en 2024 ; espérance de vie en bonne santé de 63,7 à 63,9 ans'},PP));

  /* Fiche 02 : dépenses et renoncement */
  lines2(D.getElementById('spendChart'),o2({t0:2003,t1:2024,w:MOB?420:600,h:MOB?300:340,rm:MOB?60:120,min:8,max:12,ticks:[8,9,10,11,12],unit:' %',years:MOB?[2003,2013,2024]:[2003,2008,2013,2018,2024],
    series:[{n:'Union',v:DATA.spendEU,s:2014,c:'#A69C8F',dash:1,dy:10},{n:'Belgique',v:DATA.spend,s:2003,c:'#C9773A',w:4,dy:-4}],
    marks:[[2020,11.45,'2020','#EDE6DC',-12]],
    label:'Dépenses de santé en % du PIB : Belgique 9,2 % en 2003, 11,1 % en 2024 ; Union 9,9 % en 2023'},DK));
  (function(){
    var N=[['20 % les plus modestes',DATA.unmet[0]],['2e cinquième',DATA.unmet[1]],['3e cinquième',DATA.unmet[2]],['4e cinquième',DATA.unmet[3]],['20 % les plus aisés',DATA.unmet[4]]];
    CJD.set('unmetChart',['Cinquième de revenu','Renoncement à un examen médical (% des 16 ans et plus), 2025'],N.map(function(n){return [n[0],n[1]]}));
    var W=MOB?420:600,rh=44,L=MOB?160:190,R=W-60,Hh=N.length*rh+10;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':'Part des 16 ans et plus ayant renoncé à un examen médical en 2025, selon le revenu : '+N.map(function(n){return n[0]+' '+fr(n[1])+' %'}).join(', ')});
    N.forEach(function(n,i){var y=6+i*rh,w=(R-L)*n[1]/3.5;s.appendChild(el('text',{x:L-10,y:y+24,'text-anchor':'end',style:TX+DK.ink},n[0]));s.appendChild(el('rect',{x:L,y:y+8,width:Math.max(w,2).toFixed(1),height:rh-20,fill:'#C9773A','class':'fadein'}));s.appendChild(el('text',{x:L+Math.max(w,2)+8,y:y+24,'class':'fadein',style:TX+DK.ink+';font-weight:700'},fr(n[1])+' %'))});
    D.getElementById('unmetChart').appendChild(s);
  })();

  /* Fiche 03 : mortalité évitable */
  lines2(D.getElementById('avChart'),{t0:2011,t1:2023,rm:MOB?70:290,min:40,max:210,ticks:[50,100,150,200],dec:0,grid:'rgba(26,26,26,.14)',mute:'#3D3A35',ink:'#1A1A1A',bg:'#7FB6A3',years:MOB?[2011,2017,2023]:[2011,2013,2015,2017,2019,2021,2023],
    series:[{n:'prévention, Union',v:DATA.prvEU,s:2011,c:'#3D3A35',dash:1,dy:-6},{n:'prévention, Belgique',v:DATA.prv,s:2011,c:'#701C0E',w:4.5,dy:8},{n:'soins, Union',v:DATA.trtEU,s:2011,c:'#3D3A35',dash:1,dy:-2},{n:'soins, Belgique',v:DATA.trt,s:2011,c:'#1A1A1A',w:4.5,dy:6}],
    label:'Mortalité évitable pour 100 000 habitants en 2023 : par la prévention, Belgique 137, Union 151 ; par les soins, Belgique 59, Union 87'});

  /* Fiche 04 : reste à charge */
  (function(){
    var O=DATA.oop;
    lines2(D.getElementById('oopChart'),{t0:2015,t1:2024,rm:MOB?60:150,years:MOB?[2015,2019,2024]:[2015,2017,2019,2021,2024],min:0,max:25,ticks:[0,5,10,15,20,25],unit:' %',grid:'#D7D4CC',mute:'#6A665F',series:[{n:'Belgique',v:O.BE,s:2015,c:'#E2402B',w:4},{n:'Union',v:O.EU,s:2015,c:'#6A665F',dash:1},{n:'Pays-Bas',v:O.NL.slice(1),s:2016,c:'#7FB6A3',w:2.5,dy:-6},{n:'Allemagne',v:O.DE,s:2015,c:'#A69C8F',w:2.5,dy:6},{n:'France',v:O.FR,s:2015,c:'#C9A227',w:2.5,dy:16}],label:'Paiements directs des ménages en % des dépenses courantes de santé, 2015-2024 : Belgique de 19,4 % à 21,8 % ; Union de 16,4 % à 15,1 % ; Pays-Bas 11,9 % ; Allemagne 11,1 % ; France 10,2 % en 2024'});
  })();

  /* Recherche */
  (function(){
    var Q=[
      {q:'Les soins expliquent-ils l’essentiel de notre espérance de vie ?',j:'La revue de Kaplan et Milstein montre que les estimations varient selon la méthode mais convergent vers environ 10 %. La mortalité évitable (Eurostat, KCE) confirme une contribution réelle des soins. Les écarts belges selon le diplôme (Sciensano) montrent le poids des conditions de vie.',c:'Une méthode d’estimation reconnue qui réduirait l’écart entre les estimations.',b:['b-ma','Convergent : une contribution réelle mais partielle'],b2:['b-de','Débattu : sa part exacte'],v:'Les soins sauvent des vies, mais la durée de vie dépend aussi beaucoup des comportements, des conditions de vie et de travail. Une revue américaine de quatre méthodes situe autour de 10 % la part des décès prématurés due à un accès ou une qualité des soins insuffisants, chiffre que ses auteurs jugent plutôt surestimé ; il reste approximatif et ne mesure pas l’apport total de la médecine. En Belgique, les décès évitables par la prévention sont plus de deux fois plus nombreux que ceux évitables par des soins efficaces, et l’écart d’espérance de vie sans incapacité entre les moins et les plus diplômés dépasse dix ans.',
       st:[{a:'Kaplan et Milstein, 2019',t:'Revue de quatre méthodes d’estimation, États-Unis',l:0,lt:'revue',p:'Selon la méthode, 0 à 17 % des décès prématurés tiennent à un accès ou une qualité des soins insuffisants. Les quatre méthodes convergent vers environ 10 %, chiffre que les auteurs jugent plus probablement surestimé que sous-estimé ; le calcul d’origine de ce chiffre, lui, n’est pas reproductible. Les auteurs jugent l’effet des soins « modeste ».',u:'https://www.annfammed.org/content/17/3/267',s:'Annals of Family Medicine, 17(3), 267-272'},
           {a:'Eurostat, 2023',t:'Mortalité évitable, Belgique et Union',l:0,lt:'statistique officielle',p:'En Belgique, 137 décès pour 100 000 habitants sont évitables par la prévention, contre 59 par les soins. Le second chiffre est bien inférieur à la moyenne européenne (87), le premier en est plus proche (151).',u:'https://ec.europa.eu/eurostat/databrowser/view/hlth_cd_apr/default/table?lang=fr',s:'Eurostat'},
           {a:'KCE, 2024',t:'Belgique et régions, mortalité évitable grâce aux soins (traitable), 2020',l:0,lt:'statistique officielle',p:'Taux pour 100 000 habitants, ajustés sur l’âge : hommes 65,8 (Flandre 51,9 ; Wallonie 89,1 ; Bruxelles 88,3), femmes 59,4 (Flandre 55,2 ; Wallonie 78,1 ; Bruxelles 71,8). Selon Eurostat, la Belgique est sous la moyenne de l’UE-14 pour les hommes (66,3 contre 77,3) et dans la moyenne pour les femmes (59,5 contre 60,5) ; le KCE invite à la prudence pour les comparaisons internationales.',u:'https://www.healthybelgium.be/metadata/hspa/2024/HSPA2024_Quality_Effectiveness_FR.pdf',s:'KCE Report 376B, Performance du système de santé belge'},
           {a:'Renard, Devleesschauwer, Van Oyen, Gadeyne et Deboosere, 2019',t:'Belgique, recensements de 2001 et 2011 reliés aux décès, espérance de vie à 25 ans selon le diplôme',l:0,lt:'étude descriptive',p:'En 2011, l’écart d’espérance de vie à 25 ans entre les moins et les plus diplômés est de 6,1 ans chez les hommes et 4,6 ans chez les femmes ; l’écart d’espérance de vie sans incapacité atteint 10,4 et 13,5 ans. Ces écarts se sont creusés depuis 2001.',u:'https://doi.org/10.1186/s13690-019-0330-8',s:'Archives of Public Health, 77'}],
       x:'Les estimations de la part des soins viennent surtout des États-Unis, où l’accès aux soins est plus inégal qu’en Belgique. Elles mesurent l’effet d’un accès insuffisant, pas l’apport total de la médecine aux gains d’espérance de vie, que d’autres études jugent plus important (non examinées ici). Les écarts selon le diplôme mêlent comportements, conditions de travail, revenus et accès aux soins : ils ne disent pas la part de chacun. La répartition des décès entre « évitables par la prévention » et « évitables par les soins » repose en partie sur une convention.'},
      {q:'Faire payer le patient réduit-il les dépenses sans nuire à la santé ?',j:'Deux expériences par tirage au sort (RAND et Oregon) concordent sur l’effet du prix sur la consommation de soins et sur le budget des ménages. En Belgique, les travaux disponibles décrivent la protection financière (maximum à facturer, dépenses catastrophiques) sans mesurer l’effet sur la santé.',c:'Des évaluations européennes récentes, notamment belges (tickets modérateurs, tiers payant), montrant des effets différents sur la santé.',b:['b-ma','Convergent'],v:'Payer une partie de ses soins réduit leur consommation. En moyenne, la santé n’en souffre pas de façon mesurable, mais les plus pauvres et les plus malades y perdent. À l’inverse, rendre les soins accessibles protège surtout le budget des ménages et la santé mentale.',
       st:[{a:'Schokkaert et Van de Voorde, 2014',t:'Belgique, équité du système de santé',l:0,lt:'synthèse',p:'Le maximum à facturer offre une protection raisonnable contre les tickets modérateurs ; les problèmes principaux sont le manque d’information sur les suppléments et la mauvaise couverture des coûts non médicaux.',u:'https://ideas.repec.org/p/cor/louvrp/2705.html',s:'Revue française d’économie'},{a:'OMS Europe et KCE, 2023',t:'Belgique, protection financière, données 2020',l:0,lt:'rapport public',p:'5,2 % des ménages (environ 260 000) ont des dépenses de santé « catastrophiques » au regard de leurs moyens, une des parts les plus élevées d’Europe occidentale ; 12 % parmi les 20 % les plus modestes.',u:'https://www.who.int/europe/news/item/28-02-2023-can-people-afford-to-pay-for-health-care--new-evidence-on-financial-protection-in-belgium',s:'Organisation mondiale de la santé'},{a:'RAND, 1971-1982 (Manning et al., 1987)',t:'États-Unis, plus de 7 700 personnes tirées au sort entre plusieurs formules d’assurance',l:5,p:'Avec une participation financière, les dépenses baissent de 20 à 30 % et les hospitalisations d’environ 20 %. Pas d’effet sur la santé moyenne ; chez les plus pauvres et les plus malades (environ 6 % de l’échantillon), les soins gratuits améliorent le contrôle de la tension et la vue.',u:'https://www.rand.org/pubs/research_briefs/RB9174.html',s:'RAND · American Economic Review'},
           {a:'Oregon, 2008 (Finkelstein et al., 2012 ; Baicker et al., 2013)',t:'États-Unis, accès à une assurance publique attribué par tirage au sort',l:5,p:'Les gagnants consultent davantage, n’ont presque plus de dépenses catastrophiques et souffrent moins de dépression (−9 points). Pas d’effet significatif sur la tension, le cholestérol ou le diabète mesurés au bout de deux ans.',u:'https://www.povertyactionlab.org/es/node/1825',s:'QJE · NEJM'}],
       x:'Les deux expériences sont américaines ; la Belgique part d’une couverture presque universelle et d’une part à charge des patients déjà élevée.'},
      {q:'Les inégalités sociales de santé sont-elles importantes en Belgique ?',j:'Le gradient apparaît dans les décès reliés aux recensements (Renard et al.) et dans les enquêtes de santé (Sciensano).',c:'Le constat est stable ; ce qui reste débattu, c’est la part de chaque cause.',b:['b-et','Établi : le gradient social'],b2:['b-de','Débattu : ses causes'],v:'Plus on est diplômé ou aisé, plus on vit longtemps et en bonne santé, à chaque marche de l’échelle sociale. Les causes se cumulent (revenus, travail, logement, comportements, accès aux soins) et leur part respective est discutée.',
       st:[{a:'Renard et al., 2019',t:'Belgique, recensements de 2001 et 2011 reliés aux décès',l:0,lt:'étude de cohorte, descriptive',p:'En 2011, à 25 ans, l’écart d’espérance de vie entre peu diplômés et diplômés du supérieur atteint 6,1 ans chez les hommes et 4,6 chez les femmes ; en bonne santé, 10,5 et 13,4 ans.',u:'https://doi.org/10.1186/s13690-019-0330-8',s:'Archives of Public Health'},
           {a:'Sciensano (Bourguignon et al.), 2020',t:'Belgique, quartiles d’un indice socio-économique',l:0,lt:'statistique officielle',p:'Environ 9 ans d’écart d’espérance de vie à la naissance chez les hommes et 6 chez les femmes entre le quart le plus favorisé et le quart le moins favorisé.',u:'https://www.healthybelgium.be/en/health-status/health-inequalities/inequalities-in-life-expectancy-and-quality-of-life',s:'Sciensano'}],
       x:'Ces études décrivent des écarts ; elles ne disent pas quelle politique les réduirait.'}];
    function lvl(n,t){var M={1:'corrélation simple',2:'avant-après, témoin imparfait',3:'groupes comparables',4:'expérience naturelle',5:'tirage au sort'};return '<span class="lvl"><em>'+(n?'Évaluation d’impact · '+M[n]:t)+'</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p><a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a></li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Économie du bien-être','Kenneth Arrow','« Uncertainty and the Welfare Economics of Medical Care », 1963','La santé n’est pas un marché comme les autres : la maladie est imprévisible, le patient en sait moins que le médecin et ne peut pas « essayer » un traitement. Ces défauts justifient assurance, règles et confiance.','L’incertitude, l’asymétrie d’information, l’assurance.','N’indique pas jusqu’où l’État doit intervenir pour corriger ces défauts.','O'],
      ['Libérale','Milton Friedman','Capitalism and Freedom, 1962','Les règles qui réservent l’exercice de la médecine aux diplômés agréés protègent surtout les médecins et limitent l’offre. Plus de concurrence ferait baisser les prix.','La liberté de choix et le coût des soins.','Le patient a souvent du mal à juger la qualité d’un soin, ce qui rend la concurrence risquée.','L'],
      ['Protection universelle','William Beveridge','Social Insurance and Allied Services, 1942','Un service de santé accessible à tous, financé collectivement, est l’une des conditions d’une société libérée du besoin.','L’accès universel et la gratuité au point de soins.','Un système unique peut souffrir de files d’attente et d’une moindre réactivité.','S'],
      ['Égalitarisme libéral','Norman Daniels','Just Health, 2008','La santé protège l’égalité des chances : une société juste doit répartir équitablement non seulement les soins, mais aussi les conditions sociales qui produisent la santé.','Les inégalités de santé et leurs causes sociales.','Laisse ouverte la question des priorités quand les moyens manquent.','S'],
      ['Capabilités','Amartya Sen','Development as Freedom, 1999','La santé est une liberté fondamentale : elle détermine ce qu’une personne peut faire et être. On juge une société à la longévité et à la santé qu’elle rend possibles, pas seulement à sa richesse.','L’espérance de vie et les capacités réelles des personnes.','Difficile à transformer en indicateurs et en priorités concrètes.','O'],
      ['Épidémiologie sociale','Michael Marmot','The Health Gap, 2015','La santé suit un gradient social : à chaque marche de l’échelle sociale, on vit plus longtemps. Réduire les écarts passe par l’éducation, l’emploi et le logement autant que par les soins.','Les écarts de santé entre groupes sociaux.','Les mécanismes exacts reliant position sociale et santé restent discutés.','O'],
      ['Critique de la médicalisation','Ivan Illich','Némésis médicale, 1975','Au-delà d’un certain seuil, la médecine produit ses propres maux : effets indésirables, dépendance aux soins, perte de la capacité des personnes à faire face à la maladie.','Les soins inutiles et la surmédicalisation.','Sous-estime les progrès réels de la médecine depuis les années 1970.','K'],
      ['Philosophie de la médecine','Georges Canguilhem','Le normal et le pathologique, 1966','La santé n’est pas une moyenne statistique : c’est la capacité d’un individu à s’adapter et à créer de nouvelles normes de vie. Être en bonne santé, c’est pouvoir tomber malade et s’en remettre.','Ce que veut dire « être en bonne santé ».','Une réflexion conceptuelle, éloignée des choix concrets de politique de santé.','O'],
      ['Démocrate-chrétienne (subsidiarité)','Pie XI','Quadragesimo anno, 1931','Ce que des communautés plus proches des personnes peuvent faire, l’État ne doit pas le leur retirer : la protection contre la maladie revient d’abord aux organisations de la société, soutenues par l’État. Les mutualités belges, qui gèrent l’assurance maladie obligatoire, s’inscrivent dans cette tradition.','Le rôle des corps intermédiaires (mutualités, syndicats) entre l’individu et l’État.','Un système géré par des organisations liées à des courants politiques peut être morcelé et plus difficile à piloter.','C'],
      ['Écologiste (santé planétaire)','Sarah Whitmee et al.','« Safeguarding human health in the Anthropocene epoch », Commission Rockefeller–The Lancet, 2015','La santé humaine dépend de l’état des systèmes naturels : les gains de santé obtenus en dégradant le climat, l’air et la biodiversité risquent d’être perdus pour les générations futures.','Les liens entre climat, pollution, biodiversité et santé.','Les effets sanitaires à long terme restent difficiles à chiffrer, ce qui rend les arbitrages incertains.','E']
    ];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={hly:'En Belgique, l’espérance de vie à la naissance est passée de 79,8 ans en 2008 à 82,4 ans en 2024, mais l’espérance de vie en bonne santé seulement de 63,7 à 63,9 ans (Eurostat, demo_mlexpec et hlth_hlye).',
      dep:'En 2024, la Belgique a consacré 11,1 % de son PIB aux dépenses de santé, dont 21,8 % ont été payés directement par les ménages (Eurostat, hlth_sha11_hf).',
      evi:'En 2023, la Belgique comptait 137 décès évitables par la prévention et 59 décès évitables par des soins pour 100 000 habitants, contre 151 et 87 dans l’Union européenne (Eurostat, hlth_cd_apr).',
      ine:'En 2011, à 25 ans, un homme peu diplômé pouvait espérer vivre 6,1 ans de moins qu’un diplômé du supérieur, et 10,5 ans de moins en bonne santé (Renard et al., 2019).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('hly');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','leChart','hlyChart','spendChart','unmetChart','avChart','oopChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
