!function(){function d(a){this.converter=a.converter,this.data=a.path||a.data,this.imageData=[],this.multiplier=a.multiplier||1,this.padding=a.padding||0,this.fps=a.fps||25,this.stepsPerFrame=~~a.stepsPerFrame||1,this.trailLength=a.trailLength||1,this.pointDistance=a.pointDistance||0.05,this.domClass=a.domClass||"sonic",this.backgroundColor=a.backgroundColor||"rgba(0,0,0,0)",this.fillColor=a.fillColor,this.strokeColor=a.strokeColor,this.stepMethod="string"==typeof a.step?b[a.step]:a.step||b.square,this._setup=a.setup||c,this._teardown=a.teardown||c,this._preStep=a.preStep||c,this.pixelRatio=a.pixelRatio||null,this.width=a.width,this.height=a.height,this.fullWidth=this.width+2*this.padding,this.fullHeight=this.height+2*this.padding,this.domClass=a.domClass||"sonic",this.setup()}var c=function(){},g=d.argTypes={DIM:1,DEGREE:2,RADIUS:3,OTHER:0},j=d.argSignatures={arc:[1,1,3,2,2,0],bezier:[1,1,1,1,1,1,1,1],line:[1,1,1,1]},f=d.pathMethods={bezier:function(G,x,H,B,y,E,w,k,q){G=1-G;var v=1-G,m=G*G,D=v*v,F=m*G,C=3*m*v,A=3*G*D,z=D*v;return[F*x+C*E+A*k+z*B,F*H+C*w+A*q+z*y]},arc:function(o,n,q,v,p,m){var k=(m-p)*o+p,u=[Math.cos(k)*v+n,Math.sin(k)*v+q];return u.angle=k,u.t=o,u},line:function(k,a,m,n,l){return[(n-a)*k+a,(l-m)*k+m]}},b=d.stepMethods={square:function(a){this._.fillRect(a.x-3,a.y-3,6,6)},fader:function(a){this._.beginPath(),this._last&&this._.moveTo(this._last.x,this._last.y),this._.lineTo(a.x,a.y),this._.closePath(),this._.stroke(),this._last=a}};d.prototype={calculatePixelRatio:function(){var e=window.devicePixelRatio||1,a=this._.webkitBackingStorePixelRatio||this._.mozBackingStorePixelRatio||this._.msBackingStorePixelRatio||this._.oBackingStorePixelRatio||this._.backingStorePixelRatio||1;return e/a},setup:function(){var A,s,y,q,e=this.data;this.canvas=document.createElement("canvas"),this._=this.canvas.getContext("2d"),null==this.pixelRatio&&(this.pixelRatio=this.calculatePixelRatio()),this.canvas.className=this.domClass,1!=this.pixelRatio?(this.canvas.style.height=this.fullHeight+"px",this.canvas.style.width=this.fullWidth+"px",this.fullHeight*=this.pixelRatio,this.fullWidth*=this.pixelRatio,this.canvas.height=this.fullHeight,this.canvas.width=this.fullWidth,this._.scale(this.pixelRatio,this.pixelRatio)):(this.canvas.height=this.fullHeight,this.canvas.width=this.fullWidth),this.points=[];for(var k=-1,m=e.length;++k<m;){if(A=e[k].slice(1),y=e[k][0],y in j){for(var h=-1,x=A.length;++h<x;){switch(s=j[y][h],q=A[h],s){case g.RADIUS:q*=this.multiplier;break;case g.DIM:q*=this.multiplier,q+=this.padding;break;case g.DEGREE:q*=Math.PI/180}A[h]=q}}A.unshift(0);for(var z,w=this.pointDistance,v=w;1>=v;v+=w){v=Math.round(1*v/w)/(1/w),A[0]=v,z=f[y].apply(null,A),this.points.push({x:z[0],y:z[1],progress:v})}}this.frame=0,this.converter&&this.converter.setup&&this.converter.setup(this)},prep:function(o){if(!(o in this.imageData)){this._.clearRect(0,0,this.fullWidth,this.fullHeight),this._.fillStyle=this.backgroundColor,this._.fillRect(0,0,this.fullWidth,this.fullHeight);var n,q,v,p=this.points,m=p.length;this.pointDistance;this._setup();for(var k=-1,u=m*this.trailLength;++k<u&&!this.stopped;){q=o+k,n=p[q]||p[q-m],n&&(this.alpha=Math.round(1000*(k/(u-1)))/1000,this._.globalAlpha=this.alpha,this.fillColor&&(this._.fillStyle=this.fillColor),this.strokeColor&&(this._.strokeStyle=this.strokeColor),v=o/(this.points.length-1),indexD=k/(u-1),this._preStep(n,indexD,v),this.stepMethod(n,indexD,v))}return this._teardown(),this.imageData[o]=this._.getImageData(0,0,this.fullWidth,this.fullWidth),!0}},draw:function(){this.prep(this.frame)||(this._.clearRect(0,0,this.fullWidth,this.fullWidth),this._.putImageData(this.imageData[this.frame],0,0)),this.converter&&this.converter.step&&this.converter.step(this),this.iterateFrame()||this.converter&&this.converter.teardown&&(this.converter.teardown(this),this.converter=null)},iterateFrame:function(){return this.frame+=this.stepsPerFrame,this.frame>=this.points.length?(this.frame=0,!1):!0},play:function(){this.stopped=!1;var a=this;this.timer=setInterval(function(){a.draw()},1000/this.fps)},stop:function(){this.stopped=!0,this.timer&&clearInterval(this.timer)}},window.Sonic=d}();