/* Au plus Juste · comparaison entre pays (dossiers, page Comparer, accueil) */
var CJC=(function(){
  var NS='http://www.w3.org/2000/svg',D=document;
  var EU='EU27_2020';
  var MEM=['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'];
  var EN={BE:'en Belgique',BG:'en Bulgarie',CZ:'en Tchéquie',DK:'au Danemark',DE:'en Allemagne',EE:'en Estonie',IE:'en Irlande',EL:'en Grèce',ES:'en Espagne',FR:'en France',HR:'en Croatie',IT:'en Italie',CY:'à Chypre',LV:'en Lettonie',LT:'en Lituanie',LU:'au Luxembourg',HU:'en Hongrie',MT:'à Malte',NL:'aux Pays-Bas',AT:'en Autriche',PL:'en Pologne',PT:'au Portugal',RO:'en Roumanie',SI:'en Slovénie',SK:'en Slovaquie',FI:'en Finlande',SE:'en Suède'};
  var DE_={BE:'de la Belgique',BG:'de la Bulgarie',CZ:'de la Tchéquie',DK:'du Danemark',DE:'de l’Allemagne',EE:'de l’Estonie',IE:'de l’Irlande',EL:'de la Grèce',ES:'de l’Espagne',FR:'de la France',HR:'de la Croatie',IT:'de l’Italie',CY:'de Chypre',LV:'de la Lettonie',LT:'de la Lituanie',LU:'du Luxembourg',HU:'de la Hongrie',MT:'de Malte',NL:'des Pays-Bas',AT:'de l’Autriche',PL:'de la Pologne',PT:'du Portugal',RO:'de la Roumanie',SI:'de la Slovénie',SK:'de la Slovaquie',FI:'de la Finlande',SE:'de la Suède'};
  /* Pays voisins ou proches (frontière terrestre dans l’Union, sinon pays le plus proche) */
  var NB={BE:['FR','NL','DE','LU'],NL:['BE','DE'],LU:['BE','DE','FR'],FR:['BE','LU','DE','IT','ES'],DE:['DK','NL','BE','LU','FR','AT','CZ','PL'],DK:['DE','SE'],SE:['DK','FI'],FI:['SE','EE'],EE:['LV','FI'],LV:['EE','LT'],LT:['LV','PL'],PL:['DE','CZ','SK','LT'],CZ:['DE','PL','SK','AT'],SK:['CZ','PL','HU','AT'],AT:['DE','CZ','SK','HU','SI','IT'],HU:['AT','SK','RO','HR','SI'],SI:['IT','AT','HU','HR'],HR:['SI','HU'],IT:['FR','AT','SI','MT'],MT:['IT'],ES:['FR','PT'],PT:['ES'],IE:['FR'],EL:['BG','CY'],CY:['EL'],BG:['RO','EL'],RO:['BG','HU']};
  var PAL=['#2F6B8F','#7A5195','#3E8E5E','#B07A1F','#8C4A6B','#2B8C8C','#A35D3A','#5B6BB0','#6F7F2E','#9A4C9A'];
  function fr(v,d){return v.toLocaleString('fr-BE',{minimumFractionDigits:d,maximumFractionDigits:d})}
  function fmt(it,v){if(v==null)return '–';var s=fr(Math.abs(v),it.d);if(it.sg)s=(v<0?'−':v>0?'+':'')+s;else if(v<0)s='−'+s;return s+it.u}
  function ord(n){return n===1?'1re':n+'e'}
  function el(n,a,t){var e=D.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e}
  function h(t,a,c){var e=D.createElement(t);if(a)for(var k in a){if(k==='text')e.textContent=a[k];else e.setAttribute(k,a[k])}if(c)c.forEach(function(x){e.appendChild(x)});return e}
  function getPays(){try{var p=localStorage.getItem('cj-pays');if(p&&EN[p])return p}catch(e){}return 'BE'}
  function setPays(p){try{localStorage.setItem('cj-pays',p)}catch(e){}}

  function Data(C){
    this.C=C;
    this.name=function(g){return C.n[g]||g};
    this.series=function(id,g){var s=C.i[id].v[g];return s||{}};
    this.flag=function(id,g,y){var f=C.i[id].f;return f&&f[g]&&f[g][y]||''};
    this.years=function(id){var ys={};MEM.concat([EU]).forEach(function(g){var s=C.i[id].v[g];if(s)for(var y in s)ys[y]=1});return Object.keys(ys).map(Number).sort(function(a,b){return a-b})};
    /* Année de référence : la plus récente où au moins 20 pays ont une valeur */
    this.ref=function(id){var self=this,ys=this.years(id).reverse();for(var i=0;i<ys.length;i++){var n=MEM.filter(function(g){return self.series(id,g)[ys[i]]!=null}).length;if(n>=20)return ys[i]}return ys[0]};
    this.val=function(id,g,y){var v=this.series(id,g)[y];return v==null?null:v};
    this.rank=function(id,g,y){var self=this,rows=MEM.filter(function(c){return self.val(id,c,y)!=null}).map(function(c){return [c,self.val(id,c,y)]});rows.sort(function(a,b){return b[1]-a[1]});var r=0;rows.forEach(function(x,i){if(x[0]===g)r=i+1});return {r:r,n:rows.length}};
  }

  /* Réponse chiffrée à une question du débat, sans jugement */
  function answer(dt,id,g){
    var it=dt.C.i[id],y=dt.ref(id),v=dt.val(id,g,y),eu=dt.val(id,EU,y);
    if(v==null)return {t:'Pas de donnée pour '+dt.name(g)+' en '+y+' dans cette série ('+it.src+') : aucune valeur n’est estimée à sa place.',ok:false};
    var rk=dt.rank(id,g,y),s=it.lab+' '+EN[g]+' : '+fmt(it,v)+' en '+y;
    s+=eu!=null?', contre '+fmt(it,eu)+' dans l’Union. ':'. ';
    s+='Rang : '+ord(rk.r)+' sur '+rk.n+' pays de l’Union disposant de données, du plus élevé au plus bas.';
    var y0=y-5,v0=dt.val(id,g,y0);if(v0!=null)s+=' En '+y0+', elle était de '+fmt(it,v0).replace(/\.$/,'')+'.';
    if(dt.flag(id,g,y)==='b'||(v0!=null&&Object.keys(dt.series(id,g)).some(function(k){return +k>y0&&+k<=y&&dt.flag(id,g,k)==='b'})))s+=' Attention : rupture de série dans cette période.';
    return {t:s,ok:true,y:y};
  }
  function questions(dt,ids,g){return ids.filter(function(id){return dt.C.i[id]&&dt.C.i[id].q}).map(function(id){var it=dt.C.i[id];return {id:id,q:it.q.replace('{en}',EN[g]),a:answer(dt,id,g),src:it.src}})}

  /* Comparateur : choix de l’indicateur, pays à cocher, courbes et tableau */
  function Comparator(host,dt,ids,opts){
    opts=opts||{};var self=this,cur=ids[0],sel={},main=opts.pays||getPays();
    var uid='cmp'+Math.random().toString(36).slice(2,7);
    function defaults(){sel={};sel[main]=1;(NB[main]||[]).forEach(function(c){sel[c]=1});sel[EU]=1}
    defaults();
    var bar=h('div',{'class':'cmp-ind',role:'group','aria-label':'Choisir l’indicateur'});
    var pick=null;
    if(opts.grouped){
      var lab=h('label',{'for':uid+'-ind','class':'cmp-lab',text:'Indicateur'});
      pick=h('select',{id:uid+'-ind'});
      var groups={};ids.forEach(function(id){var t=dt.C.i[id].t;(groups[t]=groups[t]||[]).push(id)});
      Object.keys(groups).forEach(function(t){var og=h('optgroup',{label:t});groups[t].forEach(function(id){og.appendChild(h('option',{value:id,text:dt.C.i[id].lab}))});pick.appendChild(og)});
      pick.onchange=function(){cur=pick.value;draw()};
      bar.appendChild(lab);bar.appendChild(pick);
    }else{
      ids.forEach(function(id){var b=h('button',{type:'button','data-id':id,'aria-pressed':String(id===cur),text:dt.C.i[id].lab});b.onclick=function(){cur=id;bar.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.id===cur))});draw()};bar.appendChild(b)});
    }
    var fs=h('fieldset',{'class':'cmp-pays'});fs.appendChild(h('legend',{text:'Pays affichés'}));
    var quick=h('div',{'class':'cmp-quick'});
    [['Voisins',function(){defaults()}],['Les 27',function(){sel={};MEM.forEach(function(c){sel[c]=1});sel[EU]=1}],['Aucun',function(){sel={};sel[main]=1}]].forEach(function(q){var b=h('button',{type:'button',text:q[0]});b.onclick=function(){q[1]();sync();draw()};quick.appendChild(b)});
    fs.appendChild(quick);
    var grid=h('div',{'class':'cmp-grid'});
    [EU].concat(MEM.slice().sort(function(a,b){return dt.name(a).localeCompare(dt.name(b),'fr')})).forEach(function(c){
      var id=uid+'-'+c,cb=h('input',{type:'checkbox',id:id,value:c});cb.onchange=function(){if(cb.checked)sel[c]=1;else delete sel[c];draw()};
      var l=h('label',{'for':id,'class':c===EU?'eu':''},[cb,D.createTextNode(c===EU?'Moyenne de l’Union':dt.name(c))]);grid.appendChild(l)});
    fs.appendChild(grid);
    function sync(){grid.querySelectorAll('input').forEach(function(cb){cb.checked=!!sel[cb.value]})}
    var head=h('div',{'class':'cmp-head'});
    var chart=h('div',{'class':'cmp-chart'}),legend=h('ul',{'class':'cmp-legend','aria-hidden':'true'});
    function axt(cls,lab){var e=h('p',{'class':'axt '+cls});e.appendChild(h('span',{text:lab}));e.appendChild(D.createTextNode(''));return e}
    var axY=axt('axt-y','Axe vertical'),axX=axt('axt-x','Axe horizontal');
    var tw=h('div',{'class':'cmp-table'}),def=h('p',{'class':'cmp-def'});
    host.appendChild(bar);host.appendChild(head);
    var two=h('div',{'class':'cmp-two'},[h('div',{'class':'cmp-main'},[axY,chart,axX,legend,def]),fs]);
    host.appendChild(two);host.appendChild(tw);
    this.setMain=function(p){main=p;defaults();sync();draw()};
    function colors(list){var m={},k=0;list.forEach(function(c){if(c===main)m[c]='var(--cmp-main)';else if(c===EU)m[c]='var(--cmp-eu)';else m[c]=PAL[k++%PAL.length]});return m}
    function draw(){
      var it=dt.C.i[cur],y=dt.ref(cur),list=[EU].concat(MEM).filter(function(c){return sel[c]});
      list.sort(function(a,b){return a===main?1:b===main?-1:0});
      var col=colors(list);
      head.innerHTML='';head.appendChild(h('h3',{text:it.lab+(it.u&&it.u.indexOf('PIB')>-1?' (% du PIB)':'')}));
      def.textContent=it.def+(it.note?' '+it.note:'')+' Source : ';
      var mc=/\b([a-z]{2,5}_[a-z0-9]+(?:_[a-z0-9]+)*|tec\d{5}|tps\d{5}|teina\d{3}|tessi\d{3}|tespm\d{3}|tesem\d{3})\b/.exec(it.src||'');
      if(mc){var sa=D.createElement('a');sa.href=it.bk||('https://ec.europa.eu/eurostat/databrowser/view/'+mc[1]+'/default/table?lang=fr');sa.target='_blank';sa.rel='noopener';sa.textContent=it.src;def.appendChild(sa);def.appendChild(D.createTextNode('.'))}
      else def.appendChild(D.createTextNode(it.src+'.'));
      axY.lastChild.textContent=it.ax;axX.lastChild.textContent='Année (une observation par an ; '+ (dt.years(cur)[0]||'')+'-'+(dt.years(cur).slice(-1)[0]||'')+')';
      /* Graphique */
      var ys=dt.years(cur),mob=innerWidth<640,W=mob?360:760,H=mob?320:440,L=mob?40:54,R=W-(mob?40:74),T=18,B=H-34;
      var vals=[];list.forEach(function(c){ys.forEach(function(yy){var v=dt.val(cur,c,yy);if(v!=null)vals.push(v)})});
      chart.innerHTML='';legend.innerHTML='';
      if(!vals.length){chart.appendChild(h('p',{'class':'cmp-empty',text:'Aucune donnée pour les pays cochés.'}));drawTable();return}
      var mn=Math.min.apply(0,vals),mx=Math.max.apply(0,vals),pad=(mx-mn)*0.08||1;mn-=pad;mx+=pad;if(mn>0&&mn<(mx-mn)*0.5)mn=0;
      var step=nice((mx-mn)/4),lo=Math.floor(mn/step)*step,hi=Math.ceil(mx/step)*step;
      var y0=ys[0],y1=ys[ys.length-1];
      function X(v){return L+(v-y0)/((y1-y0)||1)*(R-L)}function Y(v){return B-(v-lo)/(hi-lo)*(B-T)}
      var s=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':it.lab+', '+y0+'-'+y1+' : '+list.map(function(c){var v=dt.val(cur,c,y);return (c===EU?'Union':dt.name(c))+' '+(v==null?'pas de donnée':fmt(it,v))}).join(' ; ')+' (en '+y+')'});
      for(var t=lo;t<=hi+step/2;t+=step){s.appendChild(el('line',{x1:L,x2:R,y1:Y(t),y2:Y(t),'class':'g'}));s.appendChild(el('text',{x:L-8,y:Y(t)+4,'text-anchor':'end','class':'tk'},fr(t,step<1?1:0)))}
      if(lo<0&&hi>0)s.appendChild(el('line',{x1:L,x2:R,y1:Y(0),y2:Y(0),'class':'z'}));
      var every=Math.ceil((y1-y0+1)/(innerWidth<640?4:8));
      for(var yy=y0;yy<=y1;yy++)if(((yy-y0)%every===0&&y1-yy>=every/2)||yy===y1)s.appendChild(el('text',{x:X(yy),y:H-10,'text-anchor':'middle','class':'tk'},yy));
      var ends=[];
      list.forEach(function(c){
        var pts=ys.filter(function(yy){return dt.val(cur,c,yy)!=null}).map(function(yy){return [yy,dt.val(cur,c,yy)]});if(!pts.length)return;
        var d='',prev=null;pts.forEach(function(p){d+=(prev!=null&&p[0]===prev+1?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)+' ';prev=p[0]});
        var a={d:d,fill:'none',stroke:col[c],'stroke-width':c===main?4:2,'stroke-linejoin':'round','stroke-linecap':'round'};if(c===EU)a['stroke-dasharray']='6 5';
        s.appendChild(el('path',a));
        var lp=pts[pts.length-1];s.appendChild(el('circle',{cx:X(lp[0]),cy:Y(lp[1]),r:c===main?5:3.5,fill:col[c]}));
        ends.push({c:c,y:Y(lp[1]),x:X(lp[0])});
      });
      if(ends.length>10)ends=ends.filter(function(e){return e.c===main||e.c===EU});ends.sort(function(a,b){return a.y-b.y});var gap=mob?15:18;for(var i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<gap)ends[i].y=ends[i-1].y+gap;var over=ends.length?ends[ends.length-1].y-(B+4):0;if(over>0)ends.forEach(function(e){e.y-=over});for(var j=ends.length-2;j>=0;j--)if(ends[j+1].y-ends[j].y<gap)ends[j].y=ends[j+1].y-gap;
      ends.forEach(function(e){s.appendChild(el('text',{x:e.x+8,y:e.y+4,'class':'lb'+(e.c===main?' m':''),fill:col[e.c]},e.c===EU?'UE':e.c))});
      chart.appendChild(s);
      list.slice().reverse().forEach(function(c){legend.appendChild(h('li',{},[h('span',{'class':'sw'+(c===EU?' eu':''),style:'background:'+col[c]}),D.createTextNode(c===EU?'Union':dt.name(c))]))});
      drawTable();
    }
    function drawTable(){
      var it=dt.C.i[cur],y=dt.ref(cur);
      var rows=MEM.map(function(c){return {c:c,v:dt.val(cur,c,y)}}).filter(function(r){return r.v!=null}).sort(function(a,b){return b.v-a.v});
      var eu=dt.val(cur,EU,y),shown=rows.filter(function(r){return sel[r.c]});
      var miss=MEM.filter(function(c){return sel[c]&&dt.val(cur,c,y)==null});
      var t='<table><caption>'+it.lab+' en '+y+', pays cochés, du plus élevé au plus bas</caption><thead><tr><th scope="col">Rang sur '+rows.length+'</th><th scope="col">Pays</th><th scope="col">Valeur</th><th scope="col">Écart à l’Union</th></tr></thead><tbody>';
      shown.forEach(function(r){var i=rows.indexOf(r)+1,f=dt.flag(cur,r.c,y);t+='<tr'+(r.c===main?' class="me"':'')+'><td>'+ord(i)+'</td><th scope="row">'+dt.name(r.c)+'</th><td>'+fmt(it,r.v)+(f?' <abbr title="'+(f==='b'?'rupture de série':f==='p'?'provisoire':f==='e'?'estimé':'note Eurostat')+'">'+f+'</abbr>':'')+'</td><td>'+(eu==null?'–':(function(d){return (d<0?'−':d>0?'+':'')+fr(Math.abs(d),it.d)})(r.v-eu))+'</td></tr>'});
      if(eu!=null&&sel[EU])t+='<tr class="eu"><td></td><th scope="row">Moyenne de l’Union</th><td>'+fmt(it,eu)+'</td><td></td></tr>';
      t+='</tbody></table>';
      if(miss.length)t+='<p class="cmp-miss">Pas de donnée en '+y+' : '+miss.map(dt.name).join(', ')+'. Les données manquantes ne sont pas remplacées.</p>';
      tw.innerHTML=t;
    }
    function nice(x){var p=Math.pow(10,Math.floor(Math.log10(x))),f=x/p;return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p}
    sync();draw();
    if(pick)pick.value=cur;
  }

  /* Section « Ce dossier en Europe » d’un dossier */
  function dossier(cfg){
    var dt=new Data(CMP);if(!D.getElementById('eu-pays'))return;
    var g=getPays();
    var sw=D.getElementById('eu-pays');
    MEM.slice().sort(function(a,b){return dt.name(a).localeCompare(dt.name(b),'fr')}).forEach(function(c){sw.appendChild(h('option',{value:c,text:dt.name(c)}))});
    sw.value=g;
    var cards=D.getElementById('eu-cards'),qs=D.getElementById('eu-q'),note=D.getElementById('eu-note'),ttl=D.getElementById('eu-title');
    var cmp=new Comparator(D.getElementById('eu-cmp'),dt,cfg.ind,{pays:g});
    function render(){
      ttl.textContent='Les chiffres '+DE_[g];
      note.hidden=g==='BE';
      note.querySelector('b').textContent=dt.name(g);
      cards.innerHTML='';
      cfg.ind.forEach(function(id){var it=dt.C.i[id],y=dt.ref(id),v=dt.val(id,g,y),eu=dt.val(id,EU,y),rk=dt.rank(id,g,y);
        cards.appendChild(h('div',{'class':'eu-card'},[h('span',{'class':'k',text:it.lab}),h('b',{text:fmt(it,v)}),h('span',{text:(v==null?'pas de donnée en '+y:y+(rk.r?' · '+ord(rk.r)+' sur '+rk.n:''))+(eu!=null?' · Union : '+fmt(it,eu):'')}),h('span',{'class':'src',text:it.src})]))});
      qs.innerHTML='';
      questions(dt,cfg.ind,g).forEach(function(q){qs.appendChild(h('li',{},[h('h4',{text:q.q}),h('p',{text:q.a.t}),h('span',{'class':'src',text:q.src})]))});
    }
    sw.onchange=function(){g=sw.value;setPays(g);render();cmp.setMain(g)};
    render();
  }
  /* Page Comparer : tous les indicateurs */
  function page(ids){
    var dt=new Data(CMP),g=getPays(),sw=D.getElementById('eu-pays');
    MEM.slice().sort(function(a,b){return dt.name(a).localeCompare(dt.name(b),'fr')}).forEach(function(c){sw.appendChild(h('option',{value:c,text:dt.name(c)}))});
    sw.value=g;
    var cmp=new Comparator(D.getElementById('eu-cmp'),dt,ids,{pays:g,grouped:true});
    sw.onchange=function(){g=sw.value;setPays(g);cmp.setMain(g)};
  }
  /* Accueil : questions du débat pour le pays choisi */
  function home(groups){
    var dt=new Data(CMP),sw=D.getElementById('q-pays');if(!sw)return;
    var be=D.getElementById('q-be'),gen=D.getElementById('q-gen'),note=D.getElementById('q-note');
    MEM.slice().sort(function(a,b){return dt.name(a).localeCompare(dt.name(b),'fr')}).forEach(function(c){sw.appendChild(h('option',{value:c,text:dt.name(c)}))});
    function render(g){
      be.hidden=g!=='BE';gen.hidden=g==='BE';note.hidden=g==='BE';note.querySelector('b').textContent=dt.name(g);
      if(g==='BE')return;
      gen.innerHTML='';
      groups.forEach(function(gr){
        var qs=questions(dt,gr.ind,g);if(!qs.length)return;
        gen.appendChild(h('h3',{'class':'qth',text:gr.t}));
        var ul=h('ul',{'class':'qlist'});
        qs.forEach(function(q){var a=h('a',{href:gr.href+'#europe'},[h('span',{'class':'qst au',text:'Réponse chiffrée'}),h('h4',{text:q.q}),h('p',{text:q.a.t}),h('span',{'class':'qsrc',text:q.src}),h('span',{'class':'qgo','aria-hidden':'true',text:'Voir le dossier →'})]);a.addEventListener('click',function(){setPays(g)});ul.appendChild(h('li',{},[a]))});
        gen.appendChild(ul);
      });
    }
    var g0=getPays();sw.value=g0;render(g0);
    sw.onchange=function(){setPays(sw.value);render(sw.value)};
  }
  return {home:home,page:page,Data:Data,Comparator:Comparator,questions:questions,dossier:dossier,getPays:getPays,setPays:setPays,MEM:MEM,EN:EN,DE:DE_,EU:EU};
})();
