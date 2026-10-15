/* Commun à toutes les pages : menu mobile, recherche globale (index construit avec le site, sans serveur), sommaire des dossiers */
(function(){
  var D=document,nav=D.querySelector('nav.top');
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  /* ---------- Menu mobile ---------- */
  if(nav){
    if(!nav.id)nav.id='navtop';
    var mb=D.createElement('button');mb.type='button';mb.className='navm';mb.setAttribute('aria-expanded','false');mb.setAttribute('aria-controls',nav.id);
    mb.innerHTML='<i aria-hidden="true"></i>Menu';
    mb.addEventListener('click',function(){var o=!nav.classList.contains('open');nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o)});
    nav.insertBefore(mb,nav.firstChild);
    nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
  }

  /* ---------- Recherche ---------- */
  var IDX=(typeof CJS!=='undefined')?CJS:[];
  function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’']/g,' ')}
  var N=IDX.map(function(e){return [norm(e[0]),norm(e[1])]});
  var ov=null,inp,res,cnt,sel=-1,last=null;
  function hl(t,qs){var n=norm(t),marks=[];qs.forEach(function(q){var i=n.indexOf(q);if(i>=0)marks.push([i,i+q.length])});
    marks.sort(function(a,b){return a[0]-b[0]});var out='',p=0;marks.forEach(function(m){if(m[0]<p)return;out+=esc(t.slice(p,m[0]))+'<mark>'+esc(t.slice(m[0],m[1]))+'</mark>';p=m[1]});return out+esc(t.slice(p))}
  function run(){
    var q=norm(inp.value).trim(),qs=q.split(/\s+/).filter(function(w){return w.length>1||/\d/.test(w)});
    res.innerHTML='';sel=-1;
    if(!qs.length){cnt.textContent='Tapez un mot : dette, Gini, pension, asile, PISA, loyer…';return}
    var hits=[];
    N.forEach(function(n,i){var s=0;for(var k=0;k<qs.length;k++){var w=qs[k],a=n[0].indexOf(w),b=n[1].indexOf(w);if(a<0&&b<0)return;s+=(a===0?6:a>0?(/\s/.test(n[0][a-1]||' ')?4:2):0)+(b>=0?1:0)}
      s+=IDX[i][3]==='Dossier'?2:0;hits.push([s,i])});
    hits.sort(function(a,b){return b[0]-a[0]||a[1]-b[1]});
    hits.slice(0,40).forEach(function(h,j){var e=IDX[h[1]],li=D.createElement('li');
      li.innerHTML='<a href="'+esc(e[2])+'" id="cjs-r'+j+'" role="option"><b><span class="k">'+esc(e[3])+'</span>'+hl(e[0],qs)+'</b>'+(e[1]?'<small>'+hl(e[1].length>170?e[1].slice(0,170)+'…':e[1],qs)+'</small>':'')+'</a>';
      res.appendChild(li)});
    cnt.textContent=hits.length?(hits.length>40?'40 premiers résultats sur '+hits.length:hits.length+(hits.length>1?' résultats':' résultat')):'Aucun résultat. Essayez un autre mot, ou consultez le lexique.';
  }
  function move(d){var a=res.querySelectorAll('a');if(!a.length)return;if(sel>=0)a[sel].removeAttribute('aria-selected');sel=(sel+d+a.length)%a.length;a[sel].setAttribute('aria-selected','true');a[sel].scrollIntoView({block:'nearest'});inp.setAttribute('aria-activedescendant',a[sel].id)}
  function build(){
    ov=D.createElement('div');ov.className='cjs';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Rechercher dans Chiffre Juste');
    ov.innerHTML='<div class="cjs-box"><div class="cjs-top"><label for="cjs-q">Rechercher dans le site</label><input id="cjs-q" type="search" autocomplete="off" placeholder="Rechercher un chiffre, un dossier, un terme…" role="combobox" aria-expanded="true" aria-controls="cjs-res" aria-autocomplete="list"><button type="button" class="cjs-x">Fermer</button></div><ul class="cjs-res" id="cjs-res" role="listbox" aria-label="Résultats"></ul><p class="cjs-n" aria-live="polite"></p></div>';
    D.body.appendChild(ov);inp=ov.querySelector('input');res=ov.querySelector('.cjs-res');cnt=ov.querySelector('.cjs-n');
    inp.addEventListener('input',run);
    inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();move(1)}else if(e.key==='ArrowUp'){e.preventDefault();move(-1)}else if(e.key==='Enter'){var a=res.querySelectorAll('a');if(a.length){e.preventDefault();(a[sel>=0?sel:0]).click()}}});
    ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('.cjs-x'))close();else if(e.target.closest('.cjs-res a'))close(true)});
    ov.addEventListener('keydown',function(e){if(e.key==='Escape')close();if(e.key==='Tab'){var f=[inp,ov.querySelector('.cjs-x')].concat([].slice.call(res.querySelectorAll('a')));var i=f.indexOf(D.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
  }
  function open(){if(!ov)build();last=D.activeElement;ov.hidden=false;D.documentElement.style.overflow='hidden';inp.focus();inp.select();run()}
  function close(nav){if(!ov||ov.hidden)return;ov.hidden=true;D.documentElement.style.overflow='';if(!nav&&last&&last.focus)last.focus()}
  if(IDX.length&&nav){
    var sb=D.createElement('button');sb.type='button';sb.className='cjs-btn';sb.setAttribute('aria-label','Rechercher dans le site (raccourci : /)');sb.title='Rechercher (/)';
    sb.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
    sb.addEventListener('click',open);nav.appendChild(sb);
    D.addEventListener('keydown',function(e){if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test((e.target.tagName||''))&&!e.target.isContentEditable){e.preventDefault();open()}});
  }

  /* ---------- Sommaire collant des dossiers ---------- */
  var hero=D.querySelector('section.hero#dossier');
  if(hero&&nav){
    var parts=[];
    function add(el,label){if(el&&label&&!parts.some(function(p){return p.el===el}))parts.push({el:el,label:label})}
    add(D.querySelector('section.seuil'),'Le pari');
    add(D.querySelector('section.twomin'),'L’essentiel en deux minutes');
    D.querySelectorAll('.sommaire .cards a[href^="#"]').forEach(function(a){var t=D.getElementById(a.getAttribute('href').slice(1)),h=a.querySelector('h3');if(t&&h)add(t,h.textContent.trim())});
    add(D.getElementById('histoire'),'L’histoire');
    add(D.getElementById('recherche'),'Ce que dit la recherche');
    add(D.getElementById('europe'),'Et ailleurs en Europe ?');
    add(D.getElementById('decision'),'Ce que peuvent faire les pouvoirs publics');
    add(D.getElementById('lectures'),'Lectures et débats');
    add(D.querySelector('section.cite'),'Citer ce dossier');
    parts=parts.filter(function(p){return p.el});
    parts.sort(function(a,b){return a.el.compareDocumentPosition(b.el)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1});
    if(parts.length>2){
      parts.forEach(function(p,i){if(!p.el.id)p.el.id='part-'+(i+1)});
      var tb=D.createElement('div');tb.className='cj-toc';
      var list=parts.map(function(p,i){return '<li><a href="#'+p.el.id+'"><em>'+(i+1)+'</em>'+esc(p.label)+'</a></li>'}).join('');
      tb.innerHTML='<button type="button" aria-expanded="false" aria-controls="cj-toc-l"><b>Sommaire</b><span>'+esc(parts[0].label)+'</span><i aria-hidden="true">▾</i></button><ol id="cj-toc-l" hidden>'+list+'</ol><div class="bar" aria-hidden="true"></div>';
      nav.parentNode.insertBefore(tb,nav.nextSibling);
      var side=D.createElement('nav');side.className='cj-side';side.setAttribute('aria-label','Sommaire du dossier');side.innerHTML='<p>Dans ce dossier</p><ol>'+list+'</ol>';
      D.body.appendChild(side);
      var btn=tb.querySelector('button'),ol=tb.querySelector('ol'),cur=tb.querySelector('button span'),bar=tb.querySelector('.bar');
      function setOpen(o){ol.hidden=!o;btn.setAttribute('aria-expanded',o)}
      btn.addEventListener('click',function(){setOpen(ol.hidden)});
      ol.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false)});
      D.addEventListener('keydown',function(e){if(e.key==='Escape'&&!ol.hidden){setOpen(false);btn.focus()}});
      var links=[].slice.call(D.querySelectorAll('.cj-toc ol a,.cj-side ol a')),idx=-1,tick=false;
      function upd(){tick=false;var y=innerHeight*0.35,k=0;
        for(var i=0;i<parts.length;i++){if(parts[i].el.getBoundingClientRect().top<=y)k=i}
        if(k!==idx){idx=k;cur.textContent=(k+1)+'/'+parts.length+' · '+parts[k].label;links.forEach(function(a){a.setAttribute('aria-current',a.getAttribute('href')==='#'+parts[k].el.id?'true':'false')})}
        var h=D.documentElement,m=h.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?Math.min(1,h.scrollTop/m):0)+')';
      }
      addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
      addEventListener('resize',upd);upd();
    }
  }
  /* ---------- Tableaux trop larges : cartes empilées sur mobile ---------- */
  function stack(){
    if(innerWidth>640)return;
    D.querySelectorAll('table').forEach(function(t){
      if(t.classList.contains('stk')||t.closest('.cj-data,.cjs'))return;
      var p=t.parentElement;if(!p||t.scrollWidth<=p.clientWidth+2)return;
      var hs=[].map.call(t.querySelectorAll('thead th'),function(h){return h.textContent.trim()});
      if(!hs.length||hs.length>8)return;
      t.querySelectorAll('tbody tr').forEach(function(r){var i=0;[].forEach.call(r.children,function(c){var span=+c.getAttribute('colspan')||1;if(!c.hasAttribute('data-label'))c.setAttribute('data-label',hs[i]||'');i+=span})});
      t.classList.add('stk');
    });
  }
  stack();setTimeout(stack,800);addEventListener('resize',function(){clearTimeout(stack.t);stack.t=setTimeout(stack,200)});
  new MutationObserver(function(m){if(innerWidth<=640&&m.some(function(x){return x.addedNodes.length})){clearTimeout(stack.u);stack.u=setTimeout(stack,150)}}).observe(D.body,{childList:true,subtree:true});
})();

/* Signature visuelle de la page d’entrée, reprise sur tout le site :
   - le logo « Chiffre J?ste » en pied de page, dont le « ? » se retourne en « u » quand on arrive au bout de la page ;
   - des nuages qui dérivent derrière la question d’ouverture de chaque dossier. */
(function(){
  var D=document,calm=function(){return D.documentElement.classList.contains('calm')||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)};
  D.querySelectorAll('.wm').forEach(function(w){
    if(w.querySelector('.q')||!/Chiffre\s+Juste/.test(w.textContent))return;
    w.innerHTML='Chiffre J<span class="q"><i class="qq">?</i><i class="uu">u</i></span>ste';
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){w.classList.toggle('flip',e.isIntersecting&&e.intersectionRatio>.5)})},{threshold:[0,.5,1]});io.observe(w)}
    else w.classList.add('flip');
  });
  var CLOUD='M0 30 Q-4 6 22 8 Q30 -14 56 -2 Q76 -14 90 8 Q116 6 110 30 Z';
  D.querySelectorAll('section.seuil').forEach(function(s){
    var c=D.createElement('div');c.className='cj-clouds';c.setAttribute('aria-hidden','true');
    c.innerHTML=[['a',.9,18],['b',.62,64],['c',.75,82]].map(function(p){return '<svg class="cl '+p[0]+'" style="top:'+p[2]+'%" viewBox="-6 -18 124 52" width="'+Math.round(170*p[1])+'"><path d="'+CLOUD+'"/></svg>'}).join('');
    s.insertBefore(c,s.firstChild);
  });
})();
