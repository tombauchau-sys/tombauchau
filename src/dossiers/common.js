/* Composants pédagogiques communs aux dossiers :
   - explication après le pari d'ouverture (data-reveal),
   - questions de transfert avec correction expliquée (.qz). */
(function(){
  var D=document;
  /* Après le pari : afficher l'explication détaillée */
  D.querySelectorAll('[data-reveal]').forEach(function(b){
    b.addEventListener('click',function(){var t=D.getElementById(b.getAttribute('data-reveal'));if(t)t.hidden=false});
  });
  /* Questions de transfert */
  D.querySelectorAll('.qz').forEach(function(q){
    var ok=q.getAttribute('data-ok'),opts=q.querySelectorAll('.qopts button'),mech=q.querySelector('.qmech');
    opts.forEach(function(b){
      b.addEventListener('click',function(){
        var k=b.getAttribute('data-k');
        opts.forEach(function(o){
          var good=o.getAttribute('data-k')===ok;
          o.setAttribute('aria-pressed',o===b?'true':'false');
          o.classList.toggle('is-ok',good);
          o.classList.toggle('is-ko',o===b&&!good);
        });
        q.querySelectorAll('.qfb').forEach(function(f){f.hidden=f.getAttribute('data-k')!==k});
        if(mech)mech.hidden=false;
        var live=q.querySelector('.qlive');
        if(live)live.textContent=k===ok?'Bonne réponse.':'Ce n’est pas la bonne réponse : lisez l’explication.';
      });
    });
  });
})();

/* Cadre des graphiques : le cadre (viewBox) s’agrandit pour contenir toutes les étiquettes, afin qu’aucune ne soit coupée au bord de l’écran */
(function(){
  var D=document;
  function fit(svg){
    try{
      var vb=svg.viewBox.baseVal;if(!vb||!vb.width)return;
      if(!svg.dataset.vb)svg.dataset.vb=[vb.x,vb.y,vb.width,vb.height].join(' ');
      var o=svg.dataset.vb.split(' ').map(Number),bb=svg.getBBox(),p=6;
      var x0=Math.min(o[0],bb.x-p),y0=Math.min(o[1],bb.y-p),x1=Math.max(o[0]+o[2],bb.x+bb.width+p),y1=Math.max(o[1]+o[3],bb.y+bb.height+p);
      svg.setAttribute('viewBox',[x0,y0,x1-x0,y1-y0].map(function(n){return Math.round(n*10)/10}).join(' '));
    }catch(e){}
  }
  function all(c){c.querySelectorAll(':scope > svg, :scope svg').forEach(function(s){if(!s.parentNode.closest('svg'))fit(s)})}
  D.querySelectorAll('.chart').forEach(function(c){
    all(c);
    new MutationObserver(function(){all(c)}).observe(c,{childList:true});
  });
})();

/* Titres des axes des graphiques : chaque graphique annonce ce que mesurent l’axe vertical et l’axe horizontal */
(function(){
  var D=document;
  D.querySelectorAll('.chart[data-xt],.chart[data-yt]').forEach(function(c){
    var yt=c.getAttribute('data-yt'),xt=c.getAttribute('data-xt');
    function p(cls,lab,txt){var e=D.createElement('p');e.className='axt '+cls;var s=D.createElement('span');s.textContent=lab;e.appendChild(s);e.appendChild(D.createTextNode(txt));return e}
    var w=D.createElement('div');w.className='axwrap';c.parentNode.insertBefore(w,c);
    if(yt)w.appendChild(p('axt-y','Axe vertical',yt));
    w.appendChild(c);
    if(xt)w.appendChild(p('axt-x','Axe horizontal',xt));
  });
})();

/* Données des graphiques : sous chaque graphique, un tableau « Voir les données » et un téléchargement CSV des valeurs exactes dessinées */
(function(){
  var D=document;if(typeof CJD==='undefined')return;
  var snap=JSON.parse(JSON.stringify(CJD.t));
  function num(v,csv,dp){if(v==null)return '';if(typeof v!=='number')return String(v);return csv?String(v).replace('.',','):v.toLocaleString('fr-BE',{minimumFractionDigits:dp||0,maximumFractionDigits:Math.max(dp||0,3)})}
  function dec(v){if(typeof v!=='number')return 0;var s=String(v),i=s.indexOf('.');return i<0?0:Math.min(3,s.length-i-1)}
  function q(t){t=String(t==null?'':t).replace(/\s+/g,' ').trim();return /[";\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}
  function srcOf(w){
    for(var n=w;n&&n!==D.body;n=n.parentNode){
      for(var s=n.nextElementSibling;s;s=s.nextElementSibling){
        if(s.classList&&s.classList.contains('srcl'))return s;
        var i=s.querySelector&&s.querySelector('.srcl');if(i)return i;
        if(s.querySelector&&s.querySelector('.chart'))return null;
      }
    }
    return null;
  }
  var today=new Date().toISOString().slice(0,10);
  Object.keys(snap).forEach(function(id){
    var c=D.getElementById(id);if(!c)return;
    var d=snap[id],w=c.closest('.axwrap')||c,src=srcOf(w),svg=c.querySelector('svg');
    var det=D.createElement('details');det.className='cj-data';
    var sm=D.createElement('summary');sm.textContent='Voir les données du graphique';det.appendChild(sm);
    var box=D.createElement('div');box.className='cj-box';
    var tb=D.createElement('table'),cap=D.createElement('caption');
    var un=c.hasAttribute('data-cat')?c.getAttribute('data-xt'):c.getAttribute('data-yt');
    cap.textContent=(un?'Unité : '+un+'. ':'')+'Case vide : donnée non publiée pour cette année ou ce pays.';
    tb.appendChild(cap);
    var th=D.createElement('thead'),tr=D.createElement('tr');
    d.cols.forEach(function(h,i){var e=D.createElement('th');e.scope='col';e.textContent=h;tr.appendChild(e)});th.appendChild(tr);tb.appendChild(th);
    var bd=D.createElement('tbody');
    var dp=d.cols.map(function(c,i){return d.rows.reduce(function(m,r){return Math.max(m,dec(r[i]))},0)});
    d.rows.forEach(function(r){var tr=D.createElement('tr');r.forEach(function(v,i){var e=D.createElement(i?'td':'th');if(!i)e.scope='row';e.textContent=i?num(v,0,dp[i]):String(v);tr.appendChild(e)});bd.appendChild(tr)});
    tb.appendChild(bd);
    var sc=D.createElement('div');sc.className='cj-scroll';sc.tabIndex=0;sc.setAttribute('role','region');sc.setAttribute('aria-label','Tableau des données');sc.appendChild(tb);box.appendChild(sc);
    if(d.note){var nt=D.createElement('p');nt.className='cj-note';nt.textContent=d.note;box.appendChild(nt)}
    var bt=D.createElement('button');bt.type='button';bt.className='cj-dl';bt.textContent='Télécharger ces données (CSV)';
    bt.addEventListener('click',function(){
      var L=[];
      L.push(['Site','Au plus Juste'].map(q).join(';'));
      L.push(['Page',D.title].map(q).join(';'));
      L.push(['Adresse',location.href.split('#')[0]+'#'+id].map(q).join(';'));
      if(svg&&svg.getAttribute('aria-label'))L.push(['Graphique',svg.getAttribute('aria-label')].map(q).join(';'));
      if(c.hasAttribute('data-cat')){if(c.getAttribute('data-yt'))L.push(['Catégories',c.getAttribute('data-yt')].map(q).join(';'));if(c.getAttribute('data-xt'))L.push(['Unité',c.getAttribute('data-xt')].map(q).join(';'))}
      else{if(c.getAttribute('data-yt'))L.push(['Unité ou axe vertical',c.getAttribute('data-yt')].map(q).join(';'));
      if(c.getAttribute('data-xt'))L.push(['Axe horizontal',c.getAttribute('data-xt')].map(q).join(';'))}
      if(src)L.push(['Source et notes',src.textContent].map(q).join(';'));
      if(d.note)L.push(['Remarque',d.note].map(q).join(';'));
      L.push(['Téléchargé le',today].map(q).join(';'));
      L.push(['Conditions','Mise en forme : Au plus Juste, licence CC BY 4.0. Les données restent celles de leurs producteurs : vérifier et citer la source primaire. Case vide = donnée non publiée.'].map(q).join(';'));
      L.push('');
      L.push(d.cols.map(q).join(';'));
      d.rows.forEach(function(r){L.push(r.map(function(v,i){return q(i?num(v,1):String(v))}).join(';'))});
      var txt='﻿'+L.join('\r\n'),fn='au-plus-juste-'+((location.pathname.split('/').pop()||'').replace('.html','')||'page')+'-'+id+'.csv';
      function plain(){var blob=new Blob([txt],{type:'text/csv;charset=utf-8'}),a=D.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;D.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
      if(window.claude&&window.claude.use){window.claude.use('downloads').then(function(dl){if(!dl)return plain();dl.save({filename:fn,data:txt}).catch(function(){})},plain)}else plain();
    });
    box.appendChild(bt);det.appendChild(box);
    var after=src&&src.parentNode===w.parentNode&&src.previousElementSibling===w?src:w;
    after.parentNode.insertBefore(det,after.nextSibling);
  });
})();

/* Comment citer : date de consultation du jour et copie de la référence */
(function(){
  var D=document,M=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],t=new Date();
  var today=(t.getDate()===1?'1er':t.getDate())+' '+M[t.getMonth()]+' '+t.getFullYear();
  D.querySelectorAll('.cj-today').forEach(function(s){s.textContent=today});
  D.querySelectorAll('.cj-cite').forEach(function(c){
    var b=c.querySelector('.cj-copy'),r=c.querySelector('.cj-ref');if(!b||!r)return;
    b.addEventListener('click',function(){
      var txt=r.textContent.replace(/\s+/g,' ').trim();
      function ok(){b.textContent='Référence copiée';setTimeout(function(){b.textContent='Copier la référence'},2000)}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,function(){sel()})}else sel();
      function sel(){var g=D.createRange();g.selectNodeContents(r);var s=window.getSelection();s.removeAllRanges();s.addRange(g);b.textContent='Référence sélectionnée : Ctrl+C pour copier'}
    });
  });
})();

/* Info-bulle au survol des graphiques chronologiques : valeur exacte de chaque série pour l’année pointée (lue dans le registre des données, pas dans le dessin) ; périodes historiques ombrées (data-periods) */
(function(){
  var D=document;if(typeof CJD==='undefined')return;
  var NS='http://www.w3.org/2000/svg';
  function axis(svg){
    var ts=[].filter.call(svg.querySelectorAll('text'),function(t){return /^(18|19|20)\d\d$/.test(t.textContent.trim())&&!t.closest('.cj-per')});
    if(ts.length<2)return null;
    var g={};ts.forEach(function(t){var y=Math.round(+t.getAttribute('y')||0);(g[y]=g[y]||[]).push(t)});
    var best=null;Object.keys(g).forEach(function(k){if(!best||g[k].length>g[best].length||(g[k].length===g[best].length&&+k>+best))best=k});
    var L=g[best];if(L.length<2)return null;
    var pts=L.map(function(t){var b=t.getBBox();return [+t.textContent.trim(),b.x+b.width/2]});
    var n=pts.length,sx=0,sy=0,sxx=0,sxy=0;pts.forEach(function(p){sx+=p[0];sy+=p[1];sxx+=p[0]*p[0];sxy+=p[0]*p[1]});
    var a=(n*sxy-sx*sy)/(n*sxx-sx*sx),b=(sy-a*sx)/n;if(!isFinite(a)||a<=0)return null;
    var err=Math.max.apply(null,pts.map(function(p){return Math.abs(a*p[0]+b-p[1])}));if(err>Math.max(4,a*0.3))return null;
    var grid=[].filter.call(svg.querySelectorAll('line'),function(l){return l.getAttribute('y1')===l.getAttribute('y2')&&+l.getAttribute('x2')-+l.getAttribute('x1')>40});
    var top=grid.length?Math.min.apply(null,grid.map(function(l){return +l.getAttribute('y1')}))-12:20,bot=+best-22;
    return {a:a,b:b,top:Math.max(0,top),bot:bot,y0:Math.min.apply(null,pts.map(function(p){return p[0]})),y1:Math.max.apply(null,pts.map(function(p){return p[0]}))};
  }
  function fmt(v){return typeof v==='number'?v.toLocaleString('fr-BE',{maximumFractionDigits:2}):v}
  function periods(c){
    var spec=c.getAttribute('data-periods'),svg=c.querySelector('svg');if(!spec||!svg||svg.querySelector('.cj-per'))return;
    var ax=axis(svg);if(!ax)return;
    var bars=svg.querySelectorAll('rect').length>6;var g=D.createElementNS(NS,'g');g.setAttribute('class','cj-per');g.setAttribute('aria-hidden','true');
    spec.split(';').forEach(function(s){var m=s.split('|'),r=m[0].split('-'),y0=+r[0],y1=+(r[1]||r[0]);
      var x0=ax.a*(y0-0.5)+ax.b,x1=ax.a*(y1+0.5)+ax.b;
      var rc=D.createElementNS(NS,'rect');rc.setAttribute('x',x0);rc.setAttribute('y',ax.top);rc.setAttribute('width',Math.max(2,x1-x0));rc.setAttribute('height',ax.bot-ax.top);rc.setAttribute('fill','currentColor');rc.setAttribute('opacity','.09');g.appendChild(rc);
      if(m[1]){var t=D.createElementNS(NS,'text');t.setAttribute('x',(x0+x1)/2);t.setAttribute('y',bars?ax.top+4:ax.bot-6);t.setAttribute('text-anchor','middle');t.setAttribute('style','font-family:var(--sans);font-size:12px;font-weight:600;fill:currentColor;opacity:.75');t.textContent=m[1];g.appendChild(t)}
    });
    svg.insertBefore(g,svg.firstChild);
  }
  var tip=null;
  function showTip(c,e){
    var svg=c.querySelector('svg'),d=CJD.t[c.id];if(!svg||!d||d.cols[0]!=='Année')return hide();
    if(!c._ax||c._axs!==svg){c._ax=axis(svg);c._axs=svg}var ax=c._ax;if(!ax)return hide();
    var pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;var m=svg.getScreenCTM();if(!m)return;var p=pt.matrixTransform(m.inverse());
    var yr=Math.round((p.x-ax.b)/ax.a);
    var row=null;d.rows.forEach(function(r){if(+r[0]===yr)row=r});
    if(!row||p.y<ax.top-30||p.y>ax.bot+30)return hide();
    if(!tip){tip=D.createElement('div');tip.className='cj-tip';tip.setAttribute('role','presentation');D.body.appendChild(tip)}
    var u=c.getAttribute('data-yt')||'';
    tip.innerHTML='<b>'+yr+'</b>'+d.cols.slice(1).map(function(n,i){var v=row[i+1];return v==null?'':'<span><i>'+String(n).replace(/[<&]/g,'')+'</i> '+fmt(v)+'</span>'}).join('')+(u?'<small>'+u.replace(/[<&]/g,'')+'</small>':'');
    var gl=svg.querySelector('.cj-guide');if(!gl){gl=D.createElementNS(NS,'line');gl.setAttribute('class','cj-guide');gl.setAttribute('stroke','currentColor');gl.setAttribute('stroke-width','1');gl.setAttribute('opacity','.5');gl.setAttribute('pointer-events','none');svg.appendChild(gl)}
    var gx=ax.a*yr+ax.b;gl.setAttribute('x1',gx);gl.setAttribute('x2',gx);gl.setAttribute('y1',ax.top);gl.setAttribute('y2',ax.bot);gl.style.display='';
    tip.style.display='block';var w=tip.offsetWidth,h=tip.offsetHeight,x=e.clientX+16,y=e.clientY-h-12;if(x+w>innerWidth-8)x=e.clientX-w-16;if(y<8)y=e.clientY+18;
    tip.style.left=Math.max(8,x)+'px';tip.style.top=y+'px';
  }
  function hide(){if(tip)tip.style.display='none';D.querySelectorAll('.cj-guide').forEach(function(g){g.style.display='none'})}
  D.querySelectorAll('.chart').forEach(function(c){
    if(!c.id)return;
    periods(c);
    new MutationObserver(function(){c._ax=null;periods(c)}).observe(c,{childList:true});
    c.addEventListener('pointermove',function(e){showTip(c,e)});
    c.addEventListener('pointerdown',function(e){showTip(c,e)});
    c.addEventListener('pointerleave',hide);
  });
  addEventListener('scroll',function(){if(tip&&tip.style.display==='block')hide()},{passive:true});
})();

/* Partager un chiffre : une image carrée avec le chiffre, ce qu’il mesure, sa source et la date de vérification (le format qui circule dans le débat public) */
(function(){
  var D=document;
  var canon=D.querySelector('link[rel=canonical]'),url=(canon?canon.href:'https://auplusjuste.be/').replace(/^https?:\/\//,'');
  var vb=D.querySelector('.verif-badge b,.maj'),ver=vb?(vb.textContent.match(/vérifiée? le ([^·]+)/)||[])[1]:'';
  function wrap(ctx,t,w){var ws=t.split(/\s+/),L=[],l='';ws.forEach(function(x){var n=l?l+' '+x:x;if(ctx.measureText(n).width>w&&l){L.push(l);l=x}else l=n});if(l)L.push(l);return L}
  function draw(num,lab,src){
    var c=D.createElement('canvas'),S=1080;c.width=S;c.height=S;var x=c.getContext('2d'),P=84;
    x.fillStyle='#F7F6F2';x.fillRect(0,0,S,S);x.fillStyle='#C9773A';x.fillRect(0,0,S,18);
    var F='"Instrument Sans",system-ui,sans-serif';
    x.fillStyle='#1E1914';x.font='700 30px '+F;x.fillText('AU PLUS JUSTE',P,110);
    x.fillStyle='#6A665F';x.font='500 28px '+F;x.fillText(D.title.split(' · ')[0],P,152);
    var fs=230;x.font='700 '+fs+'px '+F;while(x.measureText(num).width>S-2*P&&fs>90){fs-=10;x.font='700 '+fs+'px '+F}
    x.fillStyle='#E2402B';x.fillText(num,P-6,250+fs*0.8);
    var y=290+fs*0.8;x.fillStyle='#222';x.font='600 46px '+F;wrap(x,lab,S-2*P).slice(0,4).forEach(function(l){y+=58;x.fillText(l,P,y)});
    x.fillStyle='#1A1A1A';x.fillRect(P,S-250,S-2*P,2);
    x.fillStyle='#55514B';x.font='500 30px '+F;var yy=S-200;wrap(x,'Source : '+src,S-2*P).slice(0,3).forEach(function(l){x.fillText(l,P,yy);yy+=40});
    x.fillStyle='#1E1914';var ft=(ver?'Vérifié le '+ver.trim()+' · ':'')+url,fz=28;x.font='600 '+fz+'px '+F;while(x.measureText(ft).width>S-2*P&&fz>16){fz--;x.font='600 '+fz+'px '+F}x.fillText(ft,P,S-56);
    return c;
  }
  function save(c,fn){
    c.toBlob(function(blob){
      function plain(){var a=D.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;D.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
      if(window.claude&&window.claude.use){window.claude.use('downloads').then(function(dl){if(!dl)return plain();dl.save({filename:fn,data:blob}).catch(function(){})},plain)}else plain();
    },'image/png');
  }
  D.querySelectorAll('.facts>div,.tm-num').forEach(function(f,i){
    var b=f.querySelector('b'),sp=f.querySelector('span:not(.src)'),sr=f.querySelector('.src,small');if(!b||!sp)return;
    var bt=D.createElement('button');bt.type='button';bt.className='cj-share';bt.textContent='Partager ce chiffre';
    bt.setAttribute('aria-label','Télécharger une image de ce chiffre : '+b.textContent.trim()+' '+sp.textContent.trim());
    bt.addEventListener('click',function(){
      var go=function(){save(draw(b.textContent.replace(/\s+/g,' ').trim(),sp.textContent.replace(/\s+/g,' ').trim(),sr?sr.textContent.replace(/\s+/g,' ').trim():'voir la page'),'au-plus-juste-'+((location.pathname.split('/').pop()||'page').replace('.html',''))+'-'+(i+1)+'.png')};
      if(D.fonts&&D.fonts.load)D.fonts.load('700 40px "Instrument Sans"').then(go,go);else go();
    });
    f.appendChild(bt);
  });
})();

/* Grille commune des lectures : les mêmes cinq familles, dans le même ordre, pour chaque dossier (les cartes, elles, changent d’ordre à chaque visite) */
(function(){
  var D=document,box=D.getElementById('reads');if(!box)return;
  var arts=[].slice.call(box.querySelectorAll('.read[data-fam]'));if(!arts.length)return;
  var F=[['L','Libérale'],['S','Sociale-démocrate'],['C','Conservatrice ou démocrate-chrétienne'],['E','Écologiste'],['K','Critique (marxiste, sociologie critique)']];
  var g=D.createElement('div');g.className='famgrid';
  var h='<p class="famt">Grille commune à tous les dossiers <span>famille politique ou intellectuelle la plus proche, à titre indicatif</span></p><ul>';
  F.forEach(function(f){
    var who=arts.filter(function(a){return a.getAttribute('data-fam')===f[0]}).map(function(a){var n=a.querySelector('h3');a.id=a.id||('lect-'+(arts.indexOf(a)+1));return '<a href="#'+a.id+'">'+(n?n.textContent:'')+'</a>'});
    h+='<li><b>'+f[1]+'</b><span>'+(who.length?who.join(' · '):'<em>pas de lecture propre trouvée sur ce sujet</em>')+'</span></li>';
  });
  var o=arts.filter(function(a){return a.getAttribute('data-fam')==='O'}).map(function(a){var n=a.querySelector('h3');a.id=a.id||('lect-'+(arts.indexOf(a)+1));return '<a href="#'+a.id+'">'+(n?n.textContent:'')+'</a>'});
  if(o.length)h+='<li><b>Autres approches</b><span>'+o.join(' · ')+'</span></li>';
  g.innerHTML=h+'</ul>';
  box.parentNode.insertBefore(g,box);
})();
