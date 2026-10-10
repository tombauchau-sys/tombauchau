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
