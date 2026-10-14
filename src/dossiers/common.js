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
    cap.textContent=(c.getAttribute('data-yt')?'Unité : '+c.getAttribute('data-yt')+'. ':'')+'Case vide : donnée non publiée pour cette année ou ce pays.';
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
      L.push(['Site','Chiffre Juste'].map(q).join(';'));
      L.push(['Page',D.title].map(q).join(';'));
      L.push(['Adresse',location.href.split('#')[0]+'#'+id].map(q).join(';'));
      if(svg&&svg.getAttribute('aria-label'))L.push(['Graphique',svg.getAttribute('aria-label')].map(q).join(';'));
      if(c.getAttribute('data-yt'))L.push(['Unité ou axe vertical',c.getAttribute('data-yt')].map(q).join(';'));
      if(c.getAttribute('data-xt'))L.push(['Axe horizontal',c.getAttribute('data-xt')].map(q).join(';'));
      if(src)L.push(['Source et notes',src.textContent].map(q).join(';'));
      if(d.note)L.push(['Remarque',d.note].map(q).join(';'));
      L.push(['Téléchargé le',today].map(q).join(';'));
      L.push(['Conditions','Mise en forme : Chiffre Juste, licence CC BY 4.0. Les données restent celles de leurs producteurs : vérifier et citer la source primaire. Case vide = donnée non publiée.'].map(q).join(';'));
      L.push('');
      L.push(d.cols.map(q).join(';'));
      d.rows.forEach(function(r){L.push(r.map(function(v,i){return q(i?num(v,1):String(v))}).join(';'))});
      var txt='﻿'+L.join('\r\n'),fn='chiffre-juste-'+((location.pathname.split('/').pop()||'').replace('.html','')||'page')+'-'+id+'.csv';
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
