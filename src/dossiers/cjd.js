/* Registre des données des graphiques : chaque graphique y dépose les valeurs exactes qu’il dessine, pour le tableau « Voir les données » et le téléchargement CSV */
var CJD={t:{},
  set:function(h,cols,rows,note){var id=h&&(h.id||h);if(typeof id==='string'&&id)this.t[id]={cols:cols,rows:rows,note:note||''}},
  series:function(h,ser,t0,names,note){
    var m={},xs=[];
    ser.forEach(function(se,j){
      var pts=se.pts||(se.v||[]).map(function(v,k){return [(se.s!=null?se.s:t0)+k,v]});
      pts.forEach(function(p){if(p[1]==null||typeof p[1]!=='number'||isNaN(p[1]))return;var k=String(p[0]);if(!(k in m)){m[k]={};xs.push(p[0])}m[k][j]=p[1]});
    });
    xs.sort(function(a,b){return a-b});
    var half=xs.some(function(x){return x%1!==0});
    var cols=[half?'Semestre':'Année'].concat(ser.map(function(se,j){return (names&&names[j])||se.n||('Série '+(j+1))}));
    this.set(h,cols,xs.map(function(x){return [half?Math.floor(x)+(x%1?'-S2':'-S1'):x].concat(ser.map(function(se,j){var v=m[String(x)][j];return v==null?null:v}))}),note);
  },
  rename:function(id,names,note){var t=this.t[id];if(!t)return;names.forEach(function(n,i){if(n)t.cols[i+1]=n});if(note)t.note=note},
  cats:function(h,cats,ser,first,note){
    this.set(h,[first||'Catégorie'].concat(ser.map(function(se,j){return se.n||('Série '+(j+1))})),cats.map(function(c,i){return [c].concat(ser.map(function(se){var v=se.v[i];return v==null?null:v}))}),note);
  }
};
