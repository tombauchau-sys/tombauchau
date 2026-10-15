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
      vd.innerHTML=(Math.abs(v-45.1)<=4?'Bien vu : ':'Vous avez dit '+v+' %. ')+'En 2024, les impôts et cotisations sociales représentent 45,1 % du PIB en Belgique, contre 40,3 % dans l’Union : le troisième niveau le plus élevé des 27, après le Danemark et la France.<span class="down" aria-hidden="true">↓</span>';
      vd.hidden=false;go.textContent='45,1 %';g.value=45;
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


  /* Barres classées, Belgique et Union mises en évidence */
  function rank(host,o){CJD.set(host,['Pays',o.unit],o.rows.map(function(r){return [r[0],r[1]]}));
    var W=MOB?420:1000,rh=MOB?24:26,L=MOB?120:170,R=W-70,Hh=o.rows.length*rh+16;
    var s=el('svg',{viewBox:'0 0 '+W+' '+Hh,role:'img','aria-label':o.label});
    o.rows.forEach(function(r,i){var y=8+i*rh,w=(R-L)*r[1]/o.max,hi=r[2];
      s.appendChild(el('text',{x:L-10,y:y+rh/2+4,'text-anchor':'end',style:TX+(hi?o.hi:o.ink)+';font-weight:'+(hi?700:500)},r[0]));
      s.appendChild(el('rect',{x:L,y:y+3,width:w.toFixed(1),height:rh-7,fill:hi?o.hi:o.bar,'class':'fadein'}));
      s.appendChild(el('text',{x:L+w+6,y:y+rh/2+4,'class':'fadein',style:TX+(hi?o.hi:o.ink)+';font-weight:700'},fr(r[1])+' %'))});
    host.appendChild(s);
  }

  /* Fiche 01 : 60 ans de prélèvements */
  lines2(D.getElementById('histChart'),o2({t0:1965,t1:2024,rm:MOB?78:200,min:20,max:50,ticks:[20,30,40,50],unit:' %',tdec:0,years:MOB?[1965,1985,2005,2024]:[1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2015,2020,2024],
    series:[{n:'pays moyen de l’OCDE',v:DATA.oecd.totO.v,s:1965,c:'#A69C8F',dash:1,dy:6},{n:'Belgique',v:DATA.oecd.tot.v,s:1965,c:'#C9773A',w:4.5,dy:-4}],
    label:'Recettes fiscales, cotisations sociales comprises, en % du PIB, définition de l’OCDE : Belgique 30,8 % en 1965, 44,1 % en 1987, 44,8 % en 2013 et 42,6 % en 2024 ; pays moyen de l’OCDE 24,9 % en 1965 et 34,1 % en 2024'},DK));
  CJD.rename('histChart',['Pays moyen de l’OCDE','Belgique'],'Définition de l’OCDE (Revenue Statistics) : plus étroite que celle d’Eurostat, qui donne 45,1 % pour la Belgique en 2024.');

  var R=DATA.rank24,N={BE:'Belgique',DK:'Danemark',FR:'France',AT:'Autriche',LU:'Luxembourg',IT:'Italie',FI:'Finlande',SE:'Suède',EL:'Grèce',DE:'Allemagne',EU27_2020:'Union',NL:'Pays-Bas',SI:'Slovénie',HR:'Croatie',CY:'Chypre',PL:'Pologne',ES:'Espagne',PT:'Portugal',EE:'Estonie',SK:'Slovaquie',LV:'Lettonie',HU:'Hongrie',CZ:'Tchéquie',LT:'Lituanie',BG:'Bulgarie',MT:'Malte',RO:'Roumanie',IE:'Irlande'};
  var rows=Object.keys(R).map(function(k){return [N[k]||k,R[k],k==='BE'||k==='EU27_2020']}).sort(function(a,b){return b[1]-a[1]});
  rank(D.getElementById('rankChart'),{rows:rows,max:50,unit:'% du PIB, 2024',ink:'#1A1A1A',bar:'#A69C8F',hi:'#C0341E',
    label:'Impôts et cotisations sociales en % du PIB, 2024, 27 pays : Danemark 45,5 %, France 45,3 %, Belgique 45,1 %, Union 40,3 %, Irlande 22,4 % (le PIB irlandais est gonflé par les multinationales)'});

  /* Fiche 02 : sur quoi */
  var C=DATA.comp24;
  hb(D.getElementById('compChart'),{cats:['Impôts sur les revenus et bénéfices','Cotisations sociales','TVA','Autres impôts sur la production','Succession et donation','Autres impôts courants'],max:20,u:' %',ink:'#1A1A1A',L:300,
    series:[{n:'Belgique',v:[C.rev[0],C.ssc[0],C.tva[0],C.prod[0],C.cap[0],C.oth[0]],c:'#C0341E'},{n:'Union',v:[C.rev[1],C.ssc[1],C.tva[1],C.prod[1],C.cap[1],C.oth[1]],c:'#6A665F'}],
    label:'Composition des prélèvements en % du PIB, 2024 : impôts sur les revenus et bénéfices Belgique 16,5, Union 12,8 ; cotisations sociales 15,4 et 14,0 ; TVA 6,1 et 7,1 ; autres impôts sur la production 6,0 et 5,8 ; succession et donation 0,7 et 0,3'});
  CJD.rename('compChart',['Belgique','Union'],'Eurostat gov_10a_taxag, % du PIB, 2024. Autres impôts sur la production : impôts sur les produits hors TVA (accises, droits d’enregistrement…) et autres impôts sur la production (dont précompte immobilier). Succession et donation : impôts en capital (D91).');

  lines2(D.getElementById('structChart'),o2({t0:1965,t1:2024,rm:MOB?78:230,min:0,max:18,ticks:[0,5,10,15],unit:' %',tdec:0,years:MOB?[1965,1985,2005,2024]:[1965,1975,1985,1995,2005,2015,2024],
    series:[{n:'Cotisations sociales',v:DATA.oecd.ssc.v,s:1965,c:'#C0341E',w:3.5,dy:-6},{n:'Impôt des personnes',v:DATA.oecd.pit.v,s:1965,c:'#1A1A1A',w:3.5,dy:8},{n:'Biens et services',v:DATA.oecd.gs.v,s:1965,c:'#6A665F',w:3,dy:0},{n:'Sociétés',v:DATA.oecd.cit.v,s:1965,c:'#C9773A',w:3,dy:-4},{n:'Patrimoine',v:DATA.oecd.prop.v,s:1965,c:'#3E3A8C',w:3,dy:8}],
    label:'Belgique, principaux prélèvements en % du PIB, 1965-2024 (OCDE) : impôt des personnes de 6,3 % en 1965 à 15,9 % en 1984 puis 12,0 % en 2024 ; cotisations sociales de 9,7 % à 13,1 % ; biens et services de 11,4 % à 9,8 % ; sociétés de 1,9 % à 4,4 % ; patrimoine de 1,2 % à 3,2 %'},PP));
  CJD.rename('structChart',['Cotisations sociales','Impôt des personnes physiques','Impôts sur les biens et services','Impôt des sociétés','Impôts sur le patrimoine'],'OCDE, Revenue Statistics, % du PIB. 1970 : valeurs atypiques publiées telles quelles par l’OCDE (patrimoine 5,0 %, biens et services 8,2 %), l’année précédant l’introduction de la TVA le 1er janvier 1971.');

  /* Fiche 03 : qui paie */
  var Wg=DATA.wage;
  hb(D.getElementById('wageChart'),{rh:MOB?84:96,cats:['Mi-salaire (50 %)','Bas salaire (67 %)','Salaire moyen (100 %)','Haut salaire (167 %)'],max:50,u:' %',ink:'#EDE6DC',L:220,
    series:[{n:'Belgique',v:Wg.BE,c:'#C9773A'},{n:'Allemagne',v:Wg.DE,c:'#EDE6DC'},{n:'France',v:Wg.FR,c:'#7E9CC4'},{n:'Pays-Bas',v:Wg.NL,c:'#7FB6A3'}],
    label:'Part du salaire brut prélevée en impôt et cotisations personnelles, célibataire sans enfant, 2025 : Belgique 11,6 % à mi-salaire, 27,8 % à 67 %, 38,8 % au salaire moyen, 46,9 % à 167 % ; Allemagne 28,9, 32,5, 37,0 et 41,5 % ; France 21,0, 22,7, 27,1 et 33,0 % ; Pays-Bas 16,5, 23,4, 32,7 et 42,1 %'});
  CJD.rename('wageChart',['Belgique','Allemagne','France','Pays-Bas'],'Calcul Chiffre Juste à partir d’Eurostat earn_nt_net (2025) : (impôt sur le revenu + cotisations sociales du salarié) / salaire brut. Les cotisations patronales ne sont pas comptées.');

  lines2(D.getElementById('wedgeChart'),o2({t0:2000,t1:2025,rm:MOB?70:150,min:30,max:55,ticks:[30,40,50],unit:' %',tdec:0,years:MOB?[2000,2012,2025]:[2000,2005,2010,2015,2020,2025],breaks:[2023.5],
    series:[{n:'Union',v:DATA.wedge.EU.v,s:2013,c:'#A69C8F',dash:1,dy:6},{n:'Belgique',v:DATA.wedge.BE.v,s:2000,c:'#C9773A',w:4.5,dy:-6}],
    label:'Coin fiscal sur un bas salaire (67 % du salaire moyen, célibataire), en % du coût du travail : Belgique 51,4 % en 2000, 45,9 % en 2023, 41,4 % en 2025 ; Union 41,4 % en 2013 et 39,5 % en 2025 ; rupture de série en 2024'},DK));
  CJD.rename('wedgeChart',['Union (depuis 2013)','Belgique'],'Eurostat earn_nt_taxwedge. Rupture de série en 2024 (nouvelle méthode) : la baisse entre 2023 et 2024 n’est pas entièrement comparable.');

  /* Recherche */
  (function(){
    var Q=[
      {q:'Des impôts élevés freinent-ils la croissance ?',j:'Les travaux de l’OCDE sur un panel de pays et une évaluation américaine de bon niveau (Romer et Romer) vont dans le même sens sur deux points : la structure des impôts compte, et une hausse d’impôts pèse sur l’activité à court terme. Le lien entre niveau global de prélèvements et croissance de long terme reste, lui, discuté.',c:'Des estimations convergentes, pour des pays européens comme la Belgique, de l’effet d’un changement du niveau total des prélèvements.',b:['b-ma','Majoritaire : la structure compte'],b2:['b-de','Débattu : l’effet du niveau'],v:'Les études comparatives de l’OCDE classent les impôts selon leur coût pour la croissance : l’impôt des sociétés est le plus dommageable, puis l’impôt sur le revenu, la consommation, et enfin l’impôt foncier récurrent, le moins nocif. Une hausse d’impôts réduit l’activité à court terme ; ce que les recettes financent (éducation, infrastructures, protection sociale) n’entre pas dans ces estimations.',
       st:[{a:'Arnold, Brys, Heady, Johansson, Schwellnus et Vartia (OCDE), 2011',t:'Pays de l’OCDE, structure des impôts et PIB par habitant',l:2,p:'À recettes égales, déplacer la charge de l’impôt sur les revenus vers la consommation et surtout vers l’impôt foncier récurrent est associé à une croissance plus forte ; l’impôt des sociétés est le plus défavorable.',u:'https://cepr.org/voxeu/columns/tax-policy-aid-recovery-and-growth',s:'Economic Journal (présentation VoxEU)'},
           {a:'Romer et Romer, 2010',t:'États-Unis, changements d’impôts décidés pour des raisons sans lien avec la conjoncture (méthode « narrative »)',l:3,p:'Une hausse d’impôts de 1 % du PIB réduit le PIB réel d’environ 2 à 3 %, en grande partie par la baisse de l’investissement.',u:'https://www.nber.org/papers/w13264',s:'American Economic Review'}],
       x:'Ces estimations ne disent pas ce que deviendraient les services publics financés par l’impôt. Aucune étude belge comparable sur le niveau global des prélèvements n’a été trouvée lors de nos recherches.'},
      {q:'Taxer davantage le patrimoine, est-ce efficace ?',j:'Une évaluation de haut niveau (Danemark, Maryland 4) montre que les grandes fortunes réagissent fortement à l’impôt sur la fortune ; les propositions de Saez et Zucman reposent sur une estimation de la base taxable dont l’ampleur de l’évasion est discutée.',c:'Des évaluations récentes d’impôts sur la fortune en Europe (Espagne, Norvège, Suisse) ou de la taxe belge sur les comptes-titres.',b:['b-de','Débattu'],v:'Un impôt sur la fortune peut rapporter, mais les plus riches réduisent la richesse déclarée ou épargnée en réponse, d’autant plus qu’ils sont fortunés. Le débat porte sur l’ampleur de ces réactions et sur la capacité de l’administration à les limiter. La Belgique taxe surtout le patrimoine à la transmission et à l’achat (successions, droits d’enregistrement) et par le précompte immobilier.',
       st:[{a:'Jakobsen, Jakobsen, Kleven et Zucman, 2020',t:'Danemark, impôt sur la fortune réduit puis supprimé entre 1989 et 1997',l:4,p:'L’impôt sur la fortune a des effets nets sur l’accumulation du patrimoine à court et moyen terme, plus forts pour les très riches que pour les patrimoines moyens ; à long terme, la richesse réagit fortement au rendement après impôt au sommet de la distribution.',u:'https://nber.org/papers/24371',s:'Quarterly Journal of Economics'},
           {a:'Saez et Zucman, 2019',t:'États-Unis, proposition d’impôt progressif sur la fortune',l:0,lt:'analyse et simulation',p:'Un impôt sur le 0,1 % le plus riche, avec un taux de 3 % au-delà d’un milliard de dollars dans le scénario modéré, sur une base estimée entre 9 000 et 13 000 milliards de dollars ; le rendement dépend de l’évasion, que les auteurs jugent maîtrisable avec une bonne conception.',u:'https://www.brookings.edu/articles/progressive-wealth-taxation',s:'Brookings Papers on Economic Activity'}],
       x:'Aucune évaluation de la taxe belge sur les comptes-titres n’a été trouvée lors de nos recherches.'},
      {q:'Baisser les cotisations sur le travail crée-t-il des emplois ?',j:'Une évaluation de haut niveau (Suède, Maryland 4) et une thèse belge récente (UCLouvain, méthode des doubles différences pour le bonus à l’emploi) trouvent des effets positifs, surtout quand la baisse est ciblée sur les travailleurs et les entreprises les plus sensibles au coût.',c:'Une évaluation du « tax shift » de 2016-2019 ou des baisses de cotisations récentes montrant des effets nuls.',b:['b-ma','Majoritaire : oui, surtout si c’est ciblé'],v:'Les baisses de cotisations ciblées sur les jeunes ou les bas salaires augmentent l’emploi des personnes visées. Les baisses générales coûtent plus cher par emploi créé, et une partie peut se retrouver dans les salaires ou les profits plutôt que dans l’embauche.',
       st:[{a:'Toniolo (UCLouvain), 2025',t:'Belgique, réductions de cotisations patronales (premiers engagements) et bonus à l’emploi des bas salaires',l:3,p:'Le bonus à l’emploi augmente nettement le nombre de jours prestés par les jeunes salariés à temps partiel ; la réduction pour les premiers engagements change peu les embauches, la plupart des entreprises bénéficiaires auraient embauché de toute façon.',u:'https://research.dial.uclouvain.be/entities/publication/06c0d1a4-2432-465c-98e6-7df5ee3f96f1',s:'Thèse de doctorat, UCLouvain'},
           {a:'Saez, Schoefer et Seim, 2019',t:'Suède, cotisations patronales des moins de 26 ans réduites de 31 % à 15 %',l:4,p:'Le taux d’emploi des jeunes concernés augmente de 2 à 3 points, surtout parce qu’ils perdent moins leur emploi ; leurs salaires nets ne changent pas, et les entreprises les plus concernées se développent et augmentent les salaires de tous leurs travailleurs.',u:'https://www.nber.org/papers/w23976',s:'American Economic Review'}],
       x:'Le « tax shift » belge de 2016-2019 a été simulé avant son adoption, mais aucune évaluation après coup de son effet sur l’emploi n’a été trouvée lors de nos recherches.'}];
    function lvl(n,t){if(!n)return '<span class="lvl"><em>'+t+'</em></span>';var h='<span class="lvl" title="Échelle de Maryland : niveau '+n+' sur 5">';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'<em>Maryland '+n+'/5</em></span>'}
    D.getElementById('rq').innerHTML=Q.map(function(q,i){return '<article class="rq" data-r><div class="qh"><span class="qn">'+(i+1)+'</span><div><h3>'+q.q+'</h3><div class="verd"><span class="bdg '+q.b[0]+'">'+q.b[1]+'</span>'+(q.b2?'<span class="bdg '+q.b2[0]+'">'+q.b2[1]+'</span>':'')+'<p>'+q.v+'</p>'+(q.j?'<div class="why-b"><p><b>Pourquoi ce badge :</b> '+q.j+'</p><p><b>Ce qui le ferait changer :</b> '+q.c+'</p></div>':'')+'</div></div></div><ul class="studies">'+q.st.map(function(s){return '<li class="study"><div class="meta"><span>'+s.s+'</span>'+lvl(s.l,s.lt)+'</div><h4>'+s.a+' · '+s.t+'</h4><p>'+s.p+'</p>'+(s.u?'<a href="'+s.u+'" target="_blank" rel="noopener">Lire la source ↗</a>':'')+'</li>'}).join('')+'</ul><p class="unknown">'+q.x+'</p></article>'}).join('');
  })();

  /* Lectures */
  (function(){
    var Lx=[
      ['Libérale classique','Adam Smith','La richesse des nations, 1776, livre V','Un bon impôt respecte quatre règles : chacun contribue selon ses moyens, le montant est certain et non arbitraire, il est perçu au moment le plus commode et il coûte le moins possible à percevoir.','La justice et la simplicité de l’impôt.','Ces règles ne disent pas jusqu’où l’impôt doit être progressif.','L'],
      ['Libérale','Friedrich Hayek','La Constitution de la liberté, 1960','L’impôt progressif permet à une majorité d’imposer à une minorité une charge qu’elle ne supporte pas elle-même ; un taux proportionnel respecte mieux l’égalité devant la loi.','L’égalité de traitement et les limites du pouvoir de la majorité.','Un impôt proportionnel pèse relativement plus sur les ménages modestes, qui consacrent tout leur revenu à vivre.','L'],
      ['Libertarienne','Robert Nozick','Anarchie, État et utopie, 1974','Prélever le fruit du travail pour le redistribuer revient à faire travailler une personne pour d’autres sans son consentement : l’impôt n’est légitime que pour un État minimal.','Le droit de chacun sur ce qu’il a acquis justement.','Les patrimoines et revenus actuels ne viennent pas tous d’échanges justes ; la théorie dit peu sur la manière de corriger le passé.','L'],
      ['Sociale-démocrate','Emmanuel Saez et Gabriel Zucman','The Triumph of Injustice, 2019','Aux États-Unis, les plus riches paient un taux global d’impôt plus faible que le reste de la population ; un impôt sur la fortune et un impôt minimum sur les multinationales rétabliraient la progressivité.','Le taux d’impôt réellement payé à chaque niveau de revenu.','Leurs estimations des taux payés par les plus riches ont été contestées par d’autres économistes, qui trouvent un système plus progressif.','S'],
      ['Conservatrice (économie de l’offre)','Arthur Laffer','« The Laffer Curve: Past, Present, and Future », 2004','Au-delà d’un certain taux, augmenter l’impôt fait baisser les recettes, car l’activité taxée se réduit ou se dissimule ; baisser les taux élevés peut stimuler l’activité.','L’effet des taux d’imposition sur l’activité et les recettes.','Le taux à partir duquel les recettes baissent est très incertain, et la plupart des baisses d’impôts ne se sont pas autofinancées.','C'],
      ['Écologiste (fiscalité environnementale)','Arthur Cecil Pigou','The Economics of Welfare, 1920','Quand une activité impose un coût à d’autres sans le payer, comme la pollution, une taxe égale à ce coût corrige le marché : c’est l’origine des taxes carbone.','Les coûts que le marché ne compte pas.','Mesurer le coût exact d’une pollution est difficile, et une taxe peut peser davantage sur les ménages modestes.','E'],
      ['Critique','Karl Marx et Friedrich Engels','Manifeste du parti communiste, 1848','Parmi les mesures demandées figure un impôt fortement progressif : l’impôt est un instrument du rapport de force entre classes, pas une simple technique de financement.','Qui supporte l’impôt selon sa place dans l’économie.','Le Manifeste voit l’impôt comme une étape vers la transformation de la propriété ; il dit peu sur la fiscalité durable d’une économie de marché.','K'],
      ['Économie de la rente','Henry George','Progress and Poverty, 1879','La valeur du sol vient de la collectivité ; un impôt unique sur la rente foncière remplacerait avantageusement les impôts sur le travail et le capital.','La valeur du terrain et qui en profite.','Un impôt unique ne suffirait pas à financer un État moderne, et estimer la valeur des terrains est délicat.','O'],
      ['Théorie de l’impôt optimal','James Mirrlees','« An Exploration in the Theory of Optimum Income Taxation », 1971','L’impôt sur le revenu doit arbitrer entre l’équité et l’incitation à travailler, en tenant compte de ce que l’État ne peut pas observer : les capacités de chacun.','Le compromis entre redistribution et incitations.','Les résultats dépendent beaucoup d’hypothèses sur les comportements et sur ce que la société juge juste.','O']
    ];
    for(var i=Lx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=Lx[i];Lx[i]=Lx[j];Lx[j]=t}
    D.getElementById('reads').innerHTML=Lx.map(function(r){return '<article class="read" data-r data-fam="'+(r[6]||'')+'"><span class="trad">'+r[0]+'</span><h3>'+r[1]+'</h3><p class="w">'+r[2]+'</p><p class="th">'+r[3]+'</p><p class="so"><b>Ce qu’elle regarde</b>'+r[4]+'</p><p class="cr"><b>Sa critique</b>'+r[5]+'</p></article>'}).join('');
  })();

  /* Citer */
  (function(){
    var T={pre:'En 2024, les impôts et cotisations sociales représentaient 45,1 % du PIB en Belgique, contre 40,3 % dans l’Union, le troisième niveau le plus élevé après le Danemark et la France (Eurostat, gov_10a_taxag).',
      sal:'En 2025, un célibataire sans enfant au salaire moyen paie en Belgique 38,8 % de son salaire brut en impôt et cotisations personnelles, contre 11,6 % à mi-salaire et 46,9 % à 167 % du salaire moyen (calcul Chiffre Juste d’après Eurostat, earn_nt_net ; cotisations patronales non comprises).',
      pat:'En 2023, la Belgique prélevait 3,1 % du PIB en impôts sur le patrimoine (précompte immobilier, droits d’enregistrement, successions), contre 1,7 % pour le pays moyen de l’OCDE (OCDE, Revenue Statistics).',
      reg:'En 2019, les transferts implicites entre Régions via l’État fédéral et la sécurité sociale représentaient environ 7,1 milliards d’euros en faveur de la Wallonie, financés par la Flandre (environ 6,2 milliards) et Bruxelles (environ 0,9 milliard) (Cornille et al., Banque nationale de Belgique, 2021).'};
    var q=D.getElementById('quote'),c=D.getElementById('copied'),cs=D.querySelectorAll('#chips button');
    function set(k){q.textContent=T[k];c.textContent='';cs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)})}
    cs.forEach(function(b){b.onclick=function(){set(b.dataset.k)}});set('pre');
    D.getElementById('copy').onclick=function(){function fb(){var r=D.createRange();r.selectNodeContents(q);var s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Texte sélectionné : copiez-le.'}try{navigator.clipboard.writeText(q.textContent).then(function(){c.textContent='Copié.'},fb)}catch(e){fb()}};
  })();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');n.classList.add('play');if(n.id==='t1')n.classList.add('go');io.unobserve(n)})},{threshold:.15});
  D.querySelectorAll('[data-r]').forEach(function(n){io.observe(n)});
  ['t1','histChart','rankChart','compChart','structChart','wageChart','wedgeChart'].forEach(function(id){io.observe(D.getElementById(id))});
  (function(){var t=D.getElementById('t1');[].slice.call(t.children).forEach(function(sp){var w=sp.textContent.split(/(\s+)/);sp.textContent='';w.forEach(function(wd){if(/^\s+$/.test(wd)){sp.appendChild(D.createTextNode(wd));return}var b=D.createElement('span');b.className='wd';wd.split('').forEach(function(ch,i){var c=D.createElement('span');c.className='ch';c.textContent=ch;c.style.transitionDelay=(i*0.035)+'s';b.appendChild(c)});sp.appendChild(b)})})})();
  (function(){
  })();
})();
