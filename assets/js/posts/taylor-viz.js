(function(){
  var container = document.getElementById('taylor-viz');
  var sl = document.getElementById('tf-n');
  var nv = document.getElementById('tf-n-val');
  if(!container || !sl) return;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var H=300, LP=50, RP=16, TP=30, BP=24, W;

  container.appendChild(canvas);

  sl.addEventListener('input', function(){ nv.textContent = this.value; redraw(); });
  document.querySelectorAll('input[name="tf-func"]').forEach(function(r){
    r.addEventListener('change', redraw);
  });

  function fact(n){ var r=1; for(var i=2;i<=n;i++) r*=i; return r; }

  function trueF(x,f){
    if(f===0) return Math.sin(x);
    if(f===1) return Math.cos(x);
    return Math.exp(x);
  }

  function taylorF(x,n,f){
    var s=0,k;
    if(f===0){      for(k=0;k<n;k++) s+=Math.pow(-1,k)*Math.pow(x,2*k+1)/fact(2*k+1); }
    else if(f===1){ for(k=0;k<n;k++) s+=Math.pow(-1,k)*Math.pow(x,2*k)/fact(2*k); }
    else{           for(k=0;k<n;k++) s+=Math.pow(x,k)/fact(k); }
    return s;
  }

  function rng(f){
    return f<2 ? {x0:-2*Math.PI,x1:2*Math.PI,y0:-2.5,y1:2.5}
               : {x0:-3,x1:3,y0:-0.5,y1:9};
  }

  function mv(v,a,b,c,d){ return c+(v-a)/(b-a)*(d-c); }

  function drawCurve(fn,r,color,lw){
    ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.beginPath();
    var go=false;
    for(var i=LP;i<=W-RP;i++){
      var x=mv(i,LP,W-RP,r.x0,r.x1);
      var y=fn(x);
      var sy=mv(y,r.y0,r.y1,H-BP,TP);
      if(isFinite(y)&&sy>=TP-14&&sy<=H-BP+14){
        go ? ctx.lineTo(i,sy) : ctx.moveTo(i,sy);
        go=true;
      } else { go=false; }
    }
    ctx.stroke();
  }

  function redraw(){
    var n=parseInt(sl.value);
    var el=document.querySelector('input[name="tf-func"]:checked');
    var f=el?parseInt(el.value):0;
    var r=rng(f);

    ctx.fillStyle='#fff';
    ctx.fillRect(0,0,W,H);

    var ax=mv(0,r.y0,r.y1,H-BP,TP);
    var ay=mv(0,r.x0,r.x1,LP,W-RP);
    ctx.strokeStyle='#d2d2d2'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(LP,ax); ctx.lineTo(W-RP,ax); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ay,TP); ctx.lineTo(ay,H-BP); ctx.stroke();

    if(f<2){
      ctx.font='10px sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#999';
      [[-2*Math.PI,'-2π'],[-Math.PI,'-π'],[0,'0'],[Math.PI,'π'],[2*Math.PI,'2π']].forEach(function(t){
        var tx=mv(t[0],r.x0,r.x1,LP,W-RP);
        ctx.strokeStyle='#d2d2d2'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(tx,ax-3); ctx.lineTo(tx,ax+3); ctx.stroke();
        ctx.fillStyle='#999'; ctx.fillText(t[1],tx,ax+14);
      });
    }

    drawCurve(function(x){return trueF(x,f);},r,'rgb(41,98,255)',2.5);
    drawCurve(function(x){return taylorF(x,n,f);},r,'rgb(215,65,15)',2);

    ctx.font='12px sans-serif'; ctx.textAlign='left';
    ctx.fillStyle='rgb(41,98,255)';
    ctx.fillText('—— 原函數', LP+4, TP+14);
    ctx.fillStyle='rgb(215,65,15)';
    ctx.fillText('—— 泰勒近似（n='+n+'）', LP+82, TP+14);
  }

  function resize(){
    W = Math.min(container.offsetWidth||620, 680);
    canvas.width = W;
    canvas.height = H;
    redraw();
  }

  resize();
  window.addEventListener('resize', resize);
})();
