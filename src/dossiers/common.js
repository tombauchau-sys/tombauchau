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
