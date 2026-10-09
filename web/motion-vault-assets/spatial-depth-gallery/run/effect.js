(()=>{var kl=new AbortController,oa=new Set,Ni=new Set,hs={},us=!1,wn=!1,Ks,fd,Vl,md=new Promise((n,t)=>{fd=n,Vl=t});md.catch(()=>{});window.sourceErrors=[];var Dm=()=>new DOMException("Source disposed before readiness","AbortError");function pd(n){wn||!pe.running||n.id!==null||(n.started=performance.now(),n.id=setTimeout(()=>{n.id=null,Ni.delete(n),!wn&&pe.running&&n.callback()},n.remaining))}var pe={ready:md,isReady:!1,status:"loading",running:!document.hidden,signal:kl.signal,get disposed(){return wn},setHandlers(n){hs={...hs,...n}},addCleanup(n){return oa.add(n),()=>oa.delete(n)},listen(n,t,e,i={}){n.addEventListener(t,e,{...i,signal:kl.signal})},schedule(n,t){let e={callback:n,remaining:t,started:0,id:null};return Ni.add(e),pd(e),e},succeed(n){wn||us||(us=!0,this.isReady=!0,this.status="ready",this.evidence=n,fd(n))},fail(n){let t=n instanceof Error?n:new Error(String(n));wn&&t.name==="AbortError"||(window.sourceErrors.push(t.message),wn||(this.status="error"),us||(us=!0,Vl(t)),this.stop(),console.error(t))},stop(){this.running=!1;for(let n of Ni)n.id!==null&&(clearTimeout(n.id),n.id=null,n.remaining=Math.max(0,n.remaining-(performance.now()-n.started)));hs.stop?.()},resume(){if(!(wn||this.status==="error")){this.running=!0;for(let n of Ni)pd(n);hs.resume?.()}},paint(){return this.isReady&&!wn},dispose(){if(Ks)return Ks;wn=!0,this.stop(),kl.abort(),us||(us=!0,Vl(Dm()));let n=[];for(let t of oa)try{n.push(t())}catch(e){n.push(Promise.reject(e))}oa.clear(),Ni.clear();try{n.push(hs.dispose?.())}catch(t){n.push(Promise.reject(t))}return window.dispatchEvent(new Event("vault-source-dispose")),this.isReady=!1,this.status="disposed",Ks=Promise.allSettled(n).then(t=>{let e=t.find(i=>i.status==="rejected");if(e)throw this.status="dispose-error",e.reason}),Ks.catch(t=>console.error(t)),Ks},inspect(){return{status:this.status,ready:this.isReady,running:this.running,disposed:wn,scheduledTimers:Ni.size,activeTimers:[...Ni].filter(n=>n.id!==null).length,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,viewport:{width:innerWidth,height:innerHeight},evidence:this.evidence||null,errors:[...window.sourceErrors],...hs.inspect?.()}}};window.SourceDemo=pe;pe.listen(window,"error",n=>pe.fail(n.error||n.message));pe.listen(window,"unhandledrejection",n=>pe.fail(n.reason));pe.listen(window,"pagehide",n=>n.persisted?pe.stop():pe.dispose());pe.listen(window,"pageshow",()=>{document.hidden||pe.resume()});pe.listen(document,"visibilitychange",()=>document.hidden?pe.stop():pe.resume());function gd(n){n.debug&&(n.debug.checkShaderErrors=!0,n.debug.onShaderError=(t,e,i,s)=>{let r=new Error("Shader compilation/link failed: "+[t.getProgramInfoLog(e),t.getShaderInfoLog(i),t.getShaderInfoLog(s)].filter(Boolean).join(`
`));throw pe.fail(r),r})}function vd(n){let t=n.getContext();if(t.isContextLost())throw new Error("WebGL context lost during first frame");let e=t.getError();if(e!==t.NO_ERROR)throw new Error("WebGL first frame error: 0x"+e.toString(16))}var Od=0,_c=1,Bd=2;var Mr=1,kd=2,Ns=3,Xn=0,He=1,on=2,An=0,qn=1,xc=2,bc=3,yc=4,Vd=5;var mi=100,zd=101,Hd=102,Gd=103,Wd=104,Xd=200,qd=201,Yd=202,$d=203,Ia=204,Da=205,Zd=206,Jd=207,jd=208,Kd=209,Qd=210,tp=211,ep=212,np=213,ip=214,La=0,Fa=1,Na=2,zi=3,Ua=4,Oa=5,Ba=6,ka=7,wc=0,sp=1,rp=2,_n=0,Mc=1,Sc=2,Ec=3,Tc=4,Cc=5,Ac=6,Pc=7;var Rc=300,wi=301,Xi=302,uo=303,po=304,Sr=306,Va=1e3,En=1001,za=1002,Ae=1003,ap=1004;var Er=1005;var De=1006,fo=1007;var Mi=1008;var en=1009,Ic=1010,Dc=1011,Us=1012,mo=1013,xn=1014,bn=1015,Pn=1016,go=1017,vo=1018,Os=1020,Lc=35902,Fc=35899,Nc=1021,Uc=1022,ln=1023,Tn=1026,Si=1027,Oc=1028,_o=1029,qi=1030,xo=1031;var bo=1033,Tr=33776,Cr=33777,Ar=33778,Pr=33779,yo=35840,wo=35841,Mo=35842,So=35843,Eo=36196,To=37492,Co=37496,Ao=37488,Po=37489,Ro=37490,Io=37491,Do=37808,Lo=37809,Fo=37810,No=37811,Uo=37812,Oo=37813,Bo=37814,ko=37815,Vo=37816,zo=37817,Ho=37818,Go=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,$o=36495,Zo=36283,Jo=36284,jo=36285,Ko=36286;var rr=2300,Ha=2301,Pa=2302,uc=2303,dc=2400,pc=2401,fc=2402;var op=3200;var Bc=0,lp=1,Jn="",Ue="srgb",Hi="srgb-linear",ar="linear",Jt="srgb";var Vi=7680;var mc=519,cp=512,hp=513,up=514,Qo=515,dp=516,pp=517,tl=518,fp=519,gc=35044;var kc="300 es",mn=2e3,or=2001;function Lm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Fm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Cs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mp(){let n=Cs("canvas");return n.style.display="block",n}var _d={},As=null;function Vc(...n){let t="THREE."+n.shift();As?As("log",t,...n):console.log(t,...n)}function gp(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Tt(...n){n=gp(n);let t="THREE."+n.shift();if(As)As("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function At(...n){n=gp(n);let t="THREE."+n.shift();if(As)As("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function lr(...n){let t=n.join(" ");t in _d||(_d[t]=!0,Tt(...n))}function vp(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var _p={[La]:Fa,[Na]:Ba,[Ua]:ka,[zi]:Oa,[Fa]:La,[Ba]:Na,[ka]:Ua,[Oa]:zi},Yn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xd=1234567,ir=Math.PI/180,Ps=180/Math.PI;function Bs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]).toLowerCase()}function Ht(n,t,e){return Math.max(t,Math.min(e,n))}function zc(n,t){return(n%t+t)%t}function Nm(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Um(n,t,e){return n!==t?(e-n)/(t-n):0}function sr(n,t,e){return(1-e)*n+e*t}function Om(n,t,e,i){return sr(n,t,1-Math.exp(-e*i))}function Bm(n,t=1){return t-Math.abs(zc(n,t*2)-t)}function km(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Vm(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function zm(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Hm(n,t){return n+Math.random()*(t-n)}function Gm(n){return n*(.5-Math.random())}function Wm(n){n!==void 0&&(xd=n);let t=xd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xm(n){return n*ir}function qm(n){return n*Ps}function Ym(n){return(n&n-1)===0&&n!==0}function $m(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jm(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),d=r((t-i)/2),u=a((t-i)/2),f=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*h,o*c);break;default:Tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Es(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ke(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Dt={DEG2RAD:ir,RAD2DEG:Ps,generateUUID:Bs,clamp:Ht,euclideanModulo:zc,mapLinear:Nm,inverseLerp:Um,lerp:sr,damp:Om,pingpong:Bm,smoothstep:km,smootherstep:Vm,randInt:zm,randFloat:Hm,randFloatSpread:Gm,seededRandom:Wm,degToRad:Xm,radToDeg:qm,isPowerOfTwo:Ym,ceilPowerOfTwo:$m,floorPowerOfTwo:Zm,setQuaternionFromProperEuler:Jm,normalize:ke,denormalize:Es},Wt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Cn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],f=r[a+1],g=r[a+2],b=r[a+3];if(d!==b||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*b;m<0&&(u=-u,f=-f,g=-g,b=-b,m=-m);let p=1-o;if(m<.9995){let y=Math.acos(m),E=Math.sin(y);p=Math.sin(p*y)/E,o=Math.sin(o*y)/E,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+b*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+b*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(bd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(bd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return zl.copy(this).projectOnVector(t),this.sub(zl)}reflect(t){return this.sub(zl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zl=new F,bd=new Cn,Ft=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],b=s[0],m=s[3],p=s[6],y=s[1],E=s[4],S=s[7],C=s[2],T=s[5],I=s[8];return r[0]=a*b+o*y+l*C,r[3]=a*m+o*E+l*T,r[6]=a*p+o*S+l*I,r[1]=c*b+h*y+d*C,r[4]=c*m+h*E+d*T,r[7]=c*p+h*S+d*I,r[2]=u*b+f*y+g*C,r[5]=u*m+f*E+g*T,r[8]=u*p+f*S+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return t[0]=d*b,t[1]=(s*c-h*i)*b,t[2]=(o*i-s*a)*b,t[3]=u*b,t[4]=(h*e-s*l)*b,t[5]=(s*r-o*e)*b,t[6]=f*b,t[7]=(i*l-c*e)*b,t[8]=(a*e-i*r)*b,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Hl.makeScale(t,e)),this}rotate(t){return this.premultiply(Hl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Hl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Hl=new Ft,yd=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wd=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jm(){let n={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Jt&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Jt&&(s.r=Ts(s.r),s.g=Ts(s.g),s.b=Ts(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Jn?ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Hi]:{primaries:t,whitePoint:i,transfer:ar,toXYZ:yd,fromXYZ:wd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:i,transfer:Jt,toXYZ:yd,fromXYZ:wd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),n}var Gt=jm();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ds,Ga=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ds===void 0&&(ds=Cs("canvas")),ds.width=t.width,ds.height=t.height;let s=ds.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ds}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Cs("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Wn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Wn(e[i]/255)*255):e[i]=Wn(e[i]);return{data:e,width:t.width,height:t.height}}else return Tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Km=0,Rs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Bs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Gl(s[a].image)):r.push(Gl(s[a]))}else r=Gl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Gl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ga.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Tt("Texture: Unable to serialize Texture."),{})}var Qm=0,Wl=new F,Ve=class n extends Yn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=En,s=En,r=De,a=Mi,o=ln,l=en,c=n.DEFAULT_ANISOTROPY,h=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Bs(),this.name="",this.source=new Rs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Wl).x}get height(){return this.source.getSize(Wl).y}get depth(){return this.source.getSize(Wl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Tt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Tt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Va:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Va:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Rc;Ve.DEFAULT_ANISOTROPY=1;var fe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],b=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+b)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,S=(f+1)/2,C=(p+1)/2,T=(h+u)/4,I=(d+b)/4,_=(g+m)/4;return E>S&&E>C?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=T/i,r=I/i):S>C?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=T/s,r=_/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=I/r,s=_/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-b)*(d-b)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-b)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wa=class extends Yn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new Ve(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Rs(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ke=class extends Wa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},cr=class extends Ve{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xa=class extends Ve{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _e=class n{constructor(t,e,i,s,r,a,o,l,c,h,d,u,f,g,b,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,d,u,f,g,b,m)}set(t,e,i,s,r,a,o,l,c,h,d,u,f,g,b,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=b,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();let e=this.elements,i=t.elements,s=1/ps.setFromMatrixColumn(t,0).length(),r=1/ps.setFromMatrixColumn(t,1).length(),a=1/ps.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,b=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-b*c,e[9]=-o*l,e[2]=b-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,b=c*d;e[0]=u+b*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=b+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,b=c*d;e[0]=u-b*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=b-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,b=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+b,e[1]=l*d,e[5]=b*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,b=o*c;e[0]=l*h,e[4]=b-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-b*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,b=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+b,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=b*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tg,t,eg)}lookAt(t,e,i){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),li.crossVectors(i,Ze),li.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),li.crossVectors(i,Ze)),li.normalize(),la.crossVectors(Ze,li),s[0]=li.x,s[4]=la.x,s[8]=Ze.x,s[1]=li.y,s[5]=la.y,s[9]=Ze.y,s[2]=li.z,s[6]=la.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],b=i[6],m=i[10],p=i[14],y=i[3],E=i[7],S=i[11],C=i[15],T=s[0],I=s[4],_=s[8],w=s[12],q=s[1],A=s[5],k=s[9],V=s[13],G=s[2],z=s[6],B=s[10],O=s[14],Q=s[3],J=s[7],ct=s[11],ft=s[15];return r[0]=a*T+o*q+l*G+c*Q,r[4]=a*I+o*A+l*z+c*J,r[8]=a*_+o*k+l*B+c*ct,r[12]=a*w+o*V+l*O+c*ft,r[1]=h*T+d*q+u*G+f*Q,r[5]=h*I+d*A+u*z+f*J,r[9]=h*_+d*k+u*B+f*ct,r[13]=h*w+d*V+u*O+f*ft,r[2]=g*T+b*q+m*G+p*Q,r[6]=g*I+b*A+m*z+p*J,r[10]=g*_+b*k+m*B+p*ct,r[14]=g*w+b*V+m*O+p*ft,r[3]=y*T+E*q+S*G+C*Q,r[7]=y*I+E*A+S*z+C*J,r[11]=y*_+E*k+S*B+C*ct,r[15]=y*w+E*V+S*O+C*ft,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],b=t[7],m=t[11],p=t[15],y=l*f-c*u,E=o*f-c*d,S=o*u-l*d,C=a*f-c*h,T=a*u-l*h,I=a*d-o*h;return e*(b*y-m*E+p*S)-i*(g*y-m*C+p*T)+s*(g*E-b*C+p*I)-r*(g*S-b*T+m*I)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],b=t[13],m=t[14],p=t[15],y=e*o-i*a,E=e*l-s*a,S=e*c-r*a,C=i*l-s*o,T=i*c-r*o,I=s*c-r*l,_=h*b-d*g,w=h*m-u*g,q=h*p-f*g,A=d*m-u*b,k=d*p-f*b,V=u*p-f*m,G=y*V-E*k+S*A+C*q-T*w+I*_;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/G;return t[0]=(o*V-l*k+c*A)*z,t[1]=(s*k-i*V-r*A)*z,t[2]=(b*I-m*T+p*C)*z,t[3]=(u*T-d*I-f*C)*z,t[4]=(l*q-a*V-c*w)*z,t[5]=(e*V-s*q+r*w)*z,t[6]=(m*S-g*I-p*E)*z,t[7]=(h*I-u*S+f*E)*z,t[8]=(a*k-o*q+c*_)*z,t[9]=(i*q-e*k-r*_)*z,t[10]=(g*T-b*S+p*y)*z,t[11]=(d*S-h*T-f*y)*z,t[12]=(o*w-a*A-l*_)*z,t[13]=(e*A-i*w+s*_)*z,t[14]=(b*E-g*C-m*y)*z,t[15]=(h*C-d*E+u*y)*z,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,b=a*h,m=a*d,p=o*d,y=l*c,E=l*h,S=l*d,C=i.x,T=i.y,I=i.z;return s[0]=(1-(b+p))*C,s[1]=(f+S)*C,s[2]=(g-E)*C,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(u+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(g+E)*I,s[9]=(m-y)*I,s[10]=(1-(u+b))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=ps.set(s[0],s[1],s[2]).length(),o=ps.set(s[4],s[5],s[6]).length(),l=ps.set(s[8],s[9],s[10]).length();r<0&&(a=-a),dn.copy(this);let c=1/a,h=1/o,d=1/l;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,e.setFromRotationMatrix(dn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=mn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),g,b;if(l)g=r/(a-r),b=a*r/(a-r);else if(o===mn)g=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===or)g=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=mn,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-s),u=-(e+t)/(e-t),f=-(i+s)/(i-s),g,b;if(l)g=1/(a-r),b=a/(a-r);else if(o===mn)g=-2/(a-r),b=-(a+r)/(a-r);else if(o===or)g=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},ps=new F,dn=new _e,tg=new F(0,0,0),eg=new F(1,1,1),li=new F,la=new F,Ze=new F,Md=new _e,Sd=new Cn,vn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Md.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Md,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sd.setFromEuler(this),this.setFromQuaternion(Sd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var hr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ng=0,Ed=new F,fs=new Cn,kn=new _e,ca=new F,Qs=new F,ig=new F,sg=new Cn,Td=new F(1,0,0),Cd=new F(0,1,0),Ad=new F(0,0,1),Pd={type:"added"},rg={type:"removed"},ms={type:"childadded",child:null},Xl={type:"childremoved",child:null},an=class n extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,e=new vn,i=new Cn,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new Ft}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(Td,t)}rotateY(t){return this.rotateOnAxis(Cd,t)}rotateZ(t){return this.rotateOnAxis(Ad,t)}translateOnAxis(t,e){return Ed.copy(t).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Td,t)}translateY(t){return this.translateOnAxis(Cd,t)}translateZ(t){return this.translateOnAxis(Ad,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ca.copy(t):ca.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Qs,ca,this.up):kn.lookAt(ca,Qs,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(kn),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(At("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pd),ms.child=t,this.dispatchEvent(ms),ms.child=null):At("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rg),Xl.child=t,this.dispatchEvent(Xl),Xl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pd),ms.child=t,this.dispatchEvent(ms),ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,t,ig),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,sg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};an.DEFAULT_UP=new F(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=class extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}},ag={type:"move"},Is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let b of t.hand.values()){let m=e.getJointPose(b,i),p=this._getHandJoint(c,b);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ag)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new gn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},xp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},ha={h:0,s:0,l:0};function ql(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Rt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Gt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Gt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Gt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Gt.workingColorSpace){if(t=zc(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=ql(a,r,t+1/3),this.g=ql(a,r,t),this.b=ql(a,r,t-1/3)}return Gt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ue){function i(r){r!==void 0&&parseFloat(r)<1&&Tt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Tt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Tt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let i=xp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Tt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return Gt.workingToColorSpace(Ne.copy(this),t),Math.round(Ht(Ne.r*255,0,255))*65536+Math.round(Ht(Ne.g*255,0,255))*256+Math.round(Ht(Ne.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Gt.workingColorSpace){Gt.workingToColorSpace(Ne.copy(this),e);let i=Ne.r,s=Ne.g,r=Ne.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Gt.workingColorSpace){return Gt.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Ue){Gt.workingToColorSpace(Ne.copy(this),t);let e=Ne.r,i=Ne.g,s=Ne.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(ha);let i=sr(ci.h,ha.h,e),s=sr(ci.s,ha.s,e),r=sr(ci.l,ha.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new Rt;Rt.NAMES=xp;var Gi=class extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},pn=new F,Vn=new F,Yl=new F,zn=new F,gs=new F,vs=new F,Rd=new F,$l=new F,Zl=new F,Jl=new F,jl=new fe,Kl=new fe,Ql=new fe,fi=class n{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),pn.subVectors(t,e),s.cross(pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){pn.subVectors(s,e),Vn.subVectors(i,e),Yl.subVectors(t,e);let a=pn.dot(pn),o=pn.dot(Vn),l=pn.dot(Yl),c=Vn.dot(Vn),h=Vn.dot(Yl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return jl.setScalar(0),Kl.setScalar(0),Ql.setScalar(0),jl.fromBufferAttribute(t,e),Kl.fromBufferAttribute(t,i),Ql.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(jl,r.x),a.addScaledVector(Kl,r.y),a.addScaledVector(Ql,r.z),a}static isFrontFacing(t,e,i,s){return pn.subVectors(i,e),Vn.subVectors(t,e),pn.cross(Vn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),pn.cross(Vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;gs.subVectors(s,i),vs.subVectors(r,i),$l.subVectors(t,i);let l=gs.dot($l),c=vs.dot($l);if(l<=0&&c<=0)return e.copy(i);Zl.subVectors(t,s);let h=gs.dot(Zl),d=vs.dot(Zl);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(gs,a);Jl.subVectors(t,r);let f=gs.dot(Jl),g=vs.dot(Jl);if(g>=0&&f<=g)return e.copy(r);let b=f*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(vs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Rd.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(Rd,o);let p=1/(m+b+u);return a=b*p,o=u*p,e.copy(i).addScaledVector(gs,a).addScaledVector(vs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},gi=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ua.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ua.copy(i.boundingBox)),ua.applyMatrix4(t.matrixWorld),this.union(ua)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tr),da.subVectors(this.max,tr),_s.subVectors(t.a,tr),xs.subVectors(t.b,tr),bs.subVectors(t.c,tr),hi.subVectors(xs,_s),ui.subVectors(bs,xs),Ui.subVectors(_s,bs);let e=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Ui.z,Ui.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Ui.z,0,-Ui.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Ui.y,Ui.x,0];return!tc(e,_s,xs,bs,da)||(e=[1,0,0,0,1,0,0,0,1],!tc(e,_s,xs,bs,da))?!1:(pa.crossVectors(hi,ui),e=[pa.x,pa.y,pa.z],tc(e,_s,xs,bs,da))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Hn=[new F,new F,new F,new F,new F,new F,new F,new F],fn=new F,ua=new gi,_s=new F,xs=new F,bs=new F,hi=new F,ui=new F,Ui=new F,tr=new F,da=new F,pa=new F,Oi=new F;function tc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Oi.fromArray(n,r);let o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),h=i.dot(Oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var be=new F,fa=new Wt,og=0,je=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:og++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=gc,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)fa.fromBufferAttribute(this,e),fa.applyMatrix3(t),this.setXY(e,fa.x,fa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Es(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Es(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Es(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Es(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==gc&&(t.usage=this.usage),t}};var ur=class extends je{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var dr=class extends je{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ie=class extends je{constructor(t,e,i){super(new Float32Array(t),e,i)}},lg=new gi,er=new F,ec=new F,Ds=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):lg.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;er.subVectors(t,this.center);let e=er.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(er,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ec.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(er.copy(t.center).add(ec)),this.expandByPoint(er.copy(t.center).sub(ec))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},cg=0,rn=new _e,nc=new an,ys=new F,Je=new gi,nr=new gi,Ce=new F,Qe=class n extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=Bs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Lm(t)?dr:ur)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ft().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,i){return rn.makeTranslation(t,e,i),this.applyMatrix4(rn),this}scale(t,e,i){return rn.makeScale(t,e,i),this.applyMatrix4(rn),this}lookAt(t){return nc.lookAt(t),nc.updateMatrix(),this.applyMatrix4(nc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ie(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){At("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&At('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ds);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){At("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Je.min,nr.min),Je.expandByPoint(Ce),Ce.addVectors(Je.max,nr.max),Je.expandByPoint(Ce)):(Je.expandByPoint(nr.min),Je.expandByPoint(nr.max))}Je.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(ys.fromBufferAttribute(t,c),Ce.add(ys)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&At('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){At("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new F,l[_]=new F;let c=new F,h=new F,d=new F,u=new Wt,f=new Wt,g=new Wt,b=new F,m=new F;function p(_,w,q){c.fromBufferAttribute(i,_),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,q),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,q),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(A),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),o[_].add(b),o[w].add(b),o[q].add(b),l[_].add(m),l[w].add(m),l[q].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let _=0,w=y.length;_<w;++_){let q=y[_],A=q.start,k=q.count;for(let V=A,G=A+k;V<G;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let E=new F,S=new F,C=new F,T=new F;function I(_){C.fromBufferAttribute(s,_),T.copy(C);let w=o[_];E.copy(w),E.sub(C.multiplyScalar(C.dot(w))).normalize(),S.crossVectors(T,w);let A=S.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,A)}for(let _=0,w=y.length;_<w;++_){let q=y[_],A=q.start,k=q.count;for(let V=A,G=A+k;V<G;V+=3)I(t.getX(V+0)),I(t.getX(V+1)),I(t.getX(V+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),b=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,b),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let b=0,m=l.length;b<m;b++){o.isInterleavedBufferAttribute?f=l[b]*o.data.stride+o.offset:f=l[b]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new je(u,h,d)}if(this.index===null)return Tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var hg=0,vi=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Bs(),this.name="",this.type="Material",this.blending=qn,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Da,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Tt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Tt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qn&&(i.blending=this.blending),this.side!==Xn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ia&&(i.blendSrc=this.blendSrc),this.blendDst!==Da&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Gn=new F,ic=new F,ma=new F,di=new F,sc=new F,ga=new F,rc=new F,qa=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ic.copy(t).add(e).multiplyScalar(.5),ma.copy(e).sub(t).normalize(),di.copy(this.origin).sub(ic);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ma),o=di.dot(this.direction),l=-di.dot(ma),c=di.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let b=1/h;d*=b,u*=b,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ic).addScaledVector(ma,u),f}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);let i=Gn.dot(this.direction),s=Gn.dot(Gn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,i,s,r){sc.subVectors(e,t),ga.subVectors(i,t),rc.crossVectors(sc,ga);let a=this.direction.dot(rc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,t);let l=o*this.direction.dot(ga.crossVectors(di,ga));if(l<0)return null;let c=o*this.direction.dot(sc.cross(di));if(c<0||l+c>a)return null;let h=-o*di.dot(rc);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$n=class extends vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Id=new _e,Bi=new qa,va=new Ds,Dd=new F,_a=new F,xa=new F,ba=new F,ac=new F,ya=new F,Ld=new F,wa=new F,ye=class extends an{constructor(t=new Qe,e=new $n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(ac.fromBufferAttribute(d,t),a?ya.addScaledVector(ac,h):ya.addScaledVector(ac.sub(e),h))}e.add(ya)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),va.copy(i.boundingSphere),va.applyMatrix4(r),Bi.copy(t.ray).recast(t.near),!(va.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(va,Dd)===null||Bi.origin.distanceToSquared(Dd)>(t.far-t.near)**2))&&(Id.copy(r).invert(),Bi.copy(t.ray).applyMatrix4(Id),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Bi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,C=E;S<C;S+=3){let T=o.getX(S),I=o.getX(S+1),_=o.getX(S+2);s=Ma(this,p,t,i,c,h,d,T,I,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let m=g,p=b;m<p;m+=3){let y=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);s=Ma(this,a,t,i,c,h,d,y,E,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,C=E;S<C;S+=3){let T=S,I=S+1,_=S+2;s=Ma(this,p,t,i,c,h,d,T,I,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let m=g,p=b;m<p;m+=3){let y=m,E=m+1,S=m+2;s=Ma(this,a,t,i,c,h,d,y,E,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function ug(n,t,e,i,s,r,a,o){let l;if(t.side===He?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Xn,o),l===null)return null;wa.copy(o),wa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(wa);return c<e.near||c>e.far?null:{distance:c,point:wa.clone(),object:n}}function Ma(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,_a),n.getVertexPosition(l,xa),n.getVertexPosition(c,ba);let h=ug(n,t,e,i,_a,xa,ba,Ld);if(h){let d=new F;fi.getBarycoord(Ld,_a,xa,ba,d),s&&(h.uv=fi.getInterpolatedAttribute(s,o,l,c,d,new Wt)),r&&(h.uv1=fi.getInterpolatedAttribute(r,o,l,c,d,new Wt)),a&&(h.normal=fi.getInterpolatedAttribute(a,o,l,c,d,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new F,materialIndex:0};fi.getNormal(_a,xa,ba,u.normal),h.face=u,h.barycoord=d}return h}var Ya=class extends Ve{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ae,h=Ae,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var oc=new F,dg=new F,pg=new Ft,Sn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=oc.subVectors(i,e).cross(dg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(oc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||pg.getNormalMatrix(t),s=this.coplanarPoint(oc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ki=new Ds,fg=new Wt(.5,.5),Sa=new F,pr=class{constructor(t=new Sn,e=new Sn,i=new Sn,s=new Sn,r=new Sn,a=new Sn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=mn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],b=r[9],m=r[10],p=r[11],y=r[12],E=r[13],S=r[14],C=r[15];if(s[0].setComponents(c-a,f-h,p-g,C-y).normalize(),s[1].setComponents(c+a,f+h,p+g,C+y).normalize(),s[2].setComponents(c+o,f+d,p+b,C+E).normalize(),s[3].setComponents(c-o,f-d,p-b,C-E).normalize(),i)s[4].setComponents(l,u,m,S).normalize(),s[5].setComponents(c-l,f-u,p-m,C-S).normalize();else if(s[4].setComponents(c-l,f-u,p-m,C-S).normalize(),e===mn)s[5].setComponents(c+l,f+u,p+m,C+S).normalize();else if(e===or)s[5].setComponents(l,u,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(t){ki.center.set(0,0,0);let e=fg.distanceTo(t.center);return ki.radius=.7071067811865476+e,ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Sa.x=s.normal.x>0?t.max.x:t.min.x,Sa.y=s.normal.y>0?t.max.y:t.min.y,Sa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var fr=class extends Ve{constructor(t=[],e=wi,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var _i=class extends Ve{constructor(t,e,i=xn,s,r,a,o=Ae,l=Ae,c,h=Tn,d=1){if(h!==Tn&&h!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},$a=class extends _i{constructor(t,e=xn,i=wi,s,r,a=Ae,o=Ae,l,c=Tn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},mr=class extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ls=class n extends Qe{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(d,2));function g(b,m,p,y,E,S,C,T,I,_,w){let q=S/I,A=C/_,k=S/2,V=C/2,G=T/2,z=I+1,B=_+1,O=0,Q=0,J=new F;for(let ct=0;ct<B;ct++){let ft=ct*A-V;for(let ut=0;ut<z;ut++){let Ut=ut*q-k;J[b]=Ut*y,J[m]=ft*E,J[p]=G,c.push(J.x,J.y,J.z),J[b]=0,J[m]=0,J[p]=T>0?1:-1,h.push(J.x,J.y,J.z),d.push(ut/I),d.push(1-ct/_),O+=1}}for(let ct=0;ct<_;ct++)for(let ft=0;ft<I;ft++){let ut=u+ft+z*ct,Ut=u+ft+z*(ct+1),ce=u+(ft+1)+z*(ct+1),oe=u+(ft+1)+z*ct;l.push(ut,Ut,oe),l.push(Ut,ce,oe),Q+=6}o.addGroup(f,Q,w),f+=Q,u+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Za=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Tt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],u=i[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Wt:new F);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new F,s=[],r=[],a=[],o=new F,l=new _e;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new F)}r[0]=new F,a[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ht(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ht(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}};function Hc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Ea=new F,lc=new Hc,cc=new Hc,hc=new Hc,gr=class extends Za{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new F){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Ea.subVectors(s[0],s[1]).add(s[0]),c=Ea);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ea.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ea),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),b=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);b<1e-4&&(b=1),g<1e-4&&(g=b),m<1e-4&&(m=b),lc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,b,m),cc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,b,m),hc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,b,m)}else this.curveType==="catmullrom"&&(lc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),cc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),hc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(lc.calc(l),cc.calc(l),hc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};var Zn=class n extends Qe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],b=[],m=[];for(let p=0;p<h;p++){let y=p*u-a;for(let E=0;E<c;E++){let S=E*d-r;g.push(S,-y,0),b.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){let E=y+c*p,S=y+c*(p+1),C=y+1+c*(p+1),T=y+1+c*p;f.push(E,S,T),f.push(S,C,T)}this.setIndex(f),this.setAttribute("position",new Ie(g,3)),this.setAttribute("normal",new Ie(b,3)),this.setAttribute("uv",new Ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var vr=class n extends Qe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new F,u=new F,f=[],g=[],b=[],m=[];for(let p=0;p<=i;p++){let y=[],E=p/i,S=0;p===0&&a===0?S=.5/e:p===i&&l===Math.PI&&(S=-.5/e);for(let C=0;C<=e;C++){let T=C/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+E*o),d.y=t*Math.cos(a+E*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),b.push(u.x,u.y,u.z),m.push(T+S,1-E),y.push(c++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<e;y++){let E=h[p][y+1],S=h[p][y],C=h[p+1][y],T=h[p+1][y+1];(p!==0||a>0)&&f.push(E,S,T),(p!==i-1||l<Math.PI)&&f.push(S,C,T)}this.setIndex(f),this.setAttribute("position",new Ie(g,3)),this.setAttribute("normal",new Ie(b,3)),this.setAttribute("uv",new Ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Yi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Be(n){let t={};for(let e=0;e<n.length;e++){let i=Yi(n[e]);for(let s in i)t[s]=i[s]}return t}function mg(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Gc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}var bp={clone:Yi,merge:Be},gg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ze=class extends vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gg,this.fragmentShader=vg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=mg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Ja=class extends ze{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_r=class extends vi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bc,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ja=class extends vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=op,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ka=class extends vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ta(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}var xi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qa=class extends xi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dc,endingEnd:dc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case pc:r=t,o=2*e-i;break;case fc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case pc:a=t,l=2*i-e;break;case fc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),b=g*g,m=b*g,p=-u*m+2*u*b-u*g,y=(1+u)*m+(-1.5-2*u)*b+(-.5+u)*g+1,E=(-1-f)*m+(1.5+f)*b+.5*g,S=f*m-f*b;for(let C=0;C!==o;++C)r[C]=p*a[h+C]+y*a[c+C]+E*a[l+C]+S*a[d+C];return r}},to=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},eo=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},no=class extends xi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){let b=(i-e)/(s-e),m=1-b;for(let p=0;p!==o;++p)r[p]=a[c+p]*m+a[l+p]*b;return r}let f=o*2,g=t-1;for(let b=0;b!==o;++b){let m=a[c+b],p=a[l+b],y=g*f+b*2,E=u[y],S=u[y+1],C=t*f+b*2,T=d[C],I=d[C+1],_=(i-e)/(s-e),w,q,A,k,V;for(let G=0;G<8;G++){w=_*_,q=w*_,A=1-_,k=A*A,V=k*A;let B=V*e+3*k*_*E+3*A*w*T+q*s-i;if(Math.abs(B)<1e-10)break;let O=3*k*(E-e)+6*A*_*(T-E)+3*w*(s-T);if(Math.abs(O)<1e-10)break;_=_-B/O,_=Math.max(0,Math.min(1,_))}r[b]=V*m+3*k*_*S+3*A*w*I+q*p}return r}},tn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ta(e,this.TimeBufferType),this.values=Ta(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Ta(t.times,Array),values:Ta(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new eo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new to(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new no(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.settings=this.settings),e}setInterpolation(t){let e;switch(t){case rr:e=this.InterpolantFactoryMethodDiscrete;break;case Ha:e=this.InterpolantFactoryMethodLinear;break;case Pa:e=this.InterpolantFactoryMethodSmooth;break;case uc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Tt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rr;case this.InterpolantFactoryMethodLinear:return Ha;case this.InterpolantFactoryMethodSmooth:return Pa;case this.InterpolantFactoryMethodBezier:return uc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(At("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(At("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){At("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){At("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Fm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){At("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Pa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let b=e[d+g];if(b!==e[u+g]||b!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};tn.prototype.ValueTypeName="";tn.prototype.TimeBufferType=Float32Array;tn.prototype.ValueBufferType=Float32Array;tn.prototype.DefaultInterpolation=Ha;var bi=class extends tn{constructor(t,e,i){super(t,e,i)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=rr;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var io=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}};io.prototype.ValueTypeName="color";var so=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}};so.prototype.ValueTypeName="number";var ro=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Cn.slerpFlat(r,0,a,c-o,a,c,l);return r}},xr=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new ro(this.times,this.values,this.getValueSize(),t)}};xr.prototype.ValueTypeName="quaternion";xr.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends tn{constructor(t,e,i){super(t,e,i)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=rr;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}};ao.prototype.ValueTypeName="vector";var Ra={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(Fd(n)||(this.files[n]=t))},get:function(n){if(this.enabled!==!1&&!Fd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Fd(n){try{let t=n.slice(n.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var oo=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},yp=new oo,Fs=class{constructor(t){this.manager=t!==void 0?t:yp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Fs.DEFAULT_MATERIAL_NAME="__DEFAULT";var ws=new WeakMap,lo=class extends Fs{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=Ra.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let d=ws.get(a);d===void 0&&(d=[],ws.set(a,d)),d.push({onLoad:e,onError:s})}return a}let o=Cs("img");function l(){h(),e&&e(this);let d=ws.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}ws.delete(this),r.manager.itemEnd(t)}function c(d){h(),s&&s(d),Ra.remove(`image:${t}`);let u=ws.get(this)||[];for(let f=0;f<u.length;f++){let g=u[f];g.onError&&g.onError(d)}ws.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ra.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}};var br=class extends Fs{constructor(t){super(t)}load(t,e,i,s){let r=new Ve,a=new lo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}};var Ca=new F,Aa=new Cn,Mn=new F,yr=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ca,Aa,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Aa,Mn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Ca,Aa,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Aa,Mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pi=new F,Nd=new Wt,Ud=new Wt,Oe=class extends yr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,Nd,Ud),e.subVectors(Ud,Nd)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ir*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Wi=class extends yr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Ms=-90,Ss=1,co=class extends an{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(Ms,Ss,t,e);s.layers=this.layers,this.add(s);let r=new Oe(Ms,Ss,t,e);r.layers=this.layers,this.add(r);let a=new Oe(Ms,Ss,t,e);a.layers=this.layers,this.add(a);let o=new Oe(Ms,Ss,t,e);o.layers=this.layers,this.add(o);let l=new Oe(Ms,Ss,t,e);l.layers=this.layers,this.add(l);let c=new Oe(Ms,Ss,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===or)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ho=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Wc="\\[\\]\\.:\\/",_g=new RegExp("["+Wc+"]","g"),Xc="[^"+Wc+"]",xg="[^"+Wc.replace("\\.","")+"]",bg=/((?:WC+[\/:])*)/.source.replace("WC",Xc),yg=/(WCOD+)?/.source.replace("WCOD",xg),wg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xc),Mg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xc),Sg=new RegExp("^"+bg+yg+wg+Mg+"$"),Eg=["material","materials","bones","map"],vc=class{constructor(t,e,i){let s=i||le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},le=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_g,"")}static parseTrackName(t){let e=Sg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Eg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Tt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){At("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){At("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){At("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){At("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){At("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){At("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){At("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;At("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){At("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){At("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};le.Composite=vc;le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};le.prototype.GetterByBindingType=[le.prototype._getValue_direct,le.prototype._getValue_array,le.prototype._getValue_arrayElement,le.prototype._getValue_toArray];le.prototype.SetterByBindingTypeAndVersioning=[[le.prototype._setValue_direct,le.prototype._setValue_direct_setNeedsUpdate,le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[le.prototype._setValue_array,le.prototype._setValue_array_setNeedsUpdate,le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[le.prototype._setValue_arrayElement,le.prototype._setValue_arrayElement_setNeedsUpdate,le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[le.prototype._setValue_fromArray,le.prototype._setValue_fromArray_setNeedsUpdate,le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var TM=new Float32Array(1);var wr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Tg.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Tg(){this._document.hidden===!1&&this.reset()}function qc(n,t,e,i){let s=Cg(i);switch(e){case Nc:return n*t;case Oc:return n*t/s.components*s.byteLength;case _o:return n*t/s.components*s.byteLength;case qi:return n*t*2/s.components*s.byteLength;case xo:return n*t*2/s.components*s.byteLength;case Uc:return n*t*3/s.components*s.byteLength;case ln:return n*t*4/s.components*s.byteLength;case bo:return n*t*4/s.components*s.byteLength;case Tr:case Cr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ar:case Pr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case wo:case So:return Math.max(n,16)*Math.max(t,8)/4;case yo:case Mo:return Math.max(n,8)*Math.max(t,8)/2;case Eo:case To:case Ao:case Po:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Co:case Ro:case Io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Do:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Fo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case No:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Vo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case zo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Go:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Wo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Xo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qo:case Yo:case $o:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Zo:case Jo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case jo:case Ko:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cg(n){switch(n){case en:case Ic:return{byteLength:1,components:1};case Us:case Dc:case Pn:return{byteLength:2,components:1};case go:case vo:return{byteLength:2,components:4};case xn:case mo:case bn:return{byteLength:4,components:1};case Lc:case Fc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"183"}}));typeof window<"u"&&(window.__THREE__?Tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="183");function Wp(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Pg(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],b=d[f];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,d[u]=b)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let b=d[f];n.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ig=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ug=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Og=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ev=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,iv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,av="gl_FragColor = linearToOutputTexel( gl_FragColor );",ov=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_v=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Mv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ev=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Av=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Iv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ov=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$v=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,r_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,d_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,p_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,f_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,m_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,v_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,__=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,x_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,w_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,M_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,S_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,A_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,P_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,U_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,O_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,B_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,W_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,J_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,j_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,t0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,s0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ot={alphahash_fragment:Rg,alphahash_pars_fragment:Ig,alphamap_fragment:Dg,alphamap_pars_fragment:Lg,alphatest_fragment:Fg,alphatest_pars_fragment:Ng,aomap_fragment:Ug,aomap_pars_fragment:Og,batching_pars_vertex:Bg,batching_vertex:kg,begin_vertex:Vg,beginnormal_vertex:zg,bsdfs:Hg,iridescence_fragment:Gg,bumpmap_pars_fragment:Wg,clipping_planes_fragment:Xg,clipping_planes_pars_fragment:qg,clipping_planes_pars_vertex:Yg,clipping_planes_vertex:$g,color_fragment:Zg,color_pars_fragment:Jg,color_pars_vertex:jg,color_vertex:Kg,common:Qg,cube_uv_reflection_fragment:tv,defaultnormal_vertex:ev,displacementmap_pars_vertex:nv,displacementmap_vertex:iv,emissivemap_fragment:sv,emissivemap_pars_fragment:rv,colorspace_fragment:av,colorspace_pars_fragment:ov,envmap_fragment:lv,envmap_common_pars_fragment:cv,envmap_pars_fragment:hv,envmap_pars_vertex:uv,envmap_physical_pars_fragment:wv,envmap_vertex:dv,fog_vertex:pv,fog_pars_vertex:fv,fog_fragment:mv,fog_pars_fragment:gv,gradientmap_pars_fragment:vv,lightmap_pars_fragment:_v,lights_lambert_fragment:xv,lights_lambert_pars_fragment:bv,lights_pars_begin:yv,lights_toon_fragment:Mv,lights_toon_pars_fragment:Sv,lights_phong_fragment:Ev,lights_phong_pars_fragment:Tv,lights_physical_fragment:Cv,lights_physical_pars_fragment:Av,lights_fragment_begin:Pv,lights_fragment_maps:Rv,lights_fragment_end:Iv,logdepthbuf_fragment:Dv,logdepthbuf_pars_fragment:Lv,logdepthbuf_pars_vertex:Fv,logdepthbuf_vertex:Nv,map_fragment:Uv,map_pars_fragment:Ov,map_particle_fragment:Bv,map_particle_pars_fragment:kv,metalnessmap_fragment:Vv,metalnessmap_pars_fragment:zv,morphinstance_vertex:Hv,morphcolor_vertex:Gv,morphnormal_vertex:Wv,morphtarget_pars_vertex:Xv,morphtarget_vertex:qv,normal_fragment_begin:Yv,normal_fragment_maps:$v,normal_pars_fragment:Zv,normal_pars_vertex:Jv,normal_vertex:jv,normalmap_pars_fragment:Kv,clearcoat_normal_fragment_begin:Qv,clearcoat_normal_fragment_maps:t_,clearcoat_pars_fragment:e_,iridescence_pars_fragment:n_,opaque_fragment:i_,packing:s_,premultiplied_alpha_fragment:r_,project_vertex:a_,dithering_fragment:o_,dithering_pars_fragment:l_,roughnessmap_fragment:c_,roughnessmap_pars_fragment:h_,shadowmap_pars_fragment:u_,shadowmap_pars_vertex:d_,shadowmap_vertex:p_,shadowmask_pars_fragment:f_,skinbase_vertex:m_,skinning_pars_vertex:g_,skinning_vertex:v_,skinnormal_vertex:__,specularmap_fragment:x_,specularmap_pars_fragment:b_,tonemapping_fragment:y_,tonemapping_pars_fragment:w_,transmission_fragment:M_,transmission_pars_fragment:S_,uv_pars_fragment:E_,uv_pars_vertex:T_,uv_vertex:C_,worldpos_vertex:A_,background_vert:P_,background_frag:R_,backgroundCube_vert:I_,backgroundCube_frag:D_,cube_vert:L_,cube_frag:F_,depth_vert:N_,depth_frag:U_,distance_vert:O_,distance_frag:B_,equirect_vert:k_,equirect_frag:V_,linedashed_vert:z_,linedashed_frag:H_,meshbasic_vert:G_,meshbasic_frag:W_,meshlambert_vert:X_,meshlambert_frag:q_,meshmatcap_vert:Y_,meshmatcap_frag:$_,meshnormal_vert:Z_,meshnormal_frag:J_,meshphong_vert:j_,meshphong_frag:K_,meshphysical_vert:Q_,meshphysical_frag:t0,meshtoon_vert:e0,meshtoon_frag:n0,points_vert:i0,points_frag:s0,shadow_vert:r0,shadow_frag:a0,sprite_vert:o0,sprite_frag:l0},at={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},In={basic:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Rt(0)},envMapIntensity:{value:1}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Be([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Be([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Rt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Be([at.points,at.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Be([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Be([at.common,at.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Be([at.sprite,at.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distance:{uniforms:Be([at.common,at.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distance_vert,fragmentShader:Ot.distance_frag},shadow:{uniforms:Be([at.lights,at.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};In.physical={uniforms:Be([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};var el={r:0,b:0,g:0},$i=new vn,c0=new _e;function h0(n,t,e,i,s,r){let a=new Rt(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){let S=y.backgroundBlurriness>0;E=t.get(E,S)}return E}function g(y){let E=!1,S=f(y);S===null?m(a,o):S&&S.isColor&&(m(S,1),E=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?e.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(y,E){let S=f(E);S&&(S.isCubeTexture||S.mapping===Sr)?(c===void 0&&(c=new ye(new Ls(1,1,1),new ze({name:"BackgroundCubeMaterial",uniforms:Yi(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),$i.copy(E.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(c0.makeRotationFromEuler($i)),c.material.toneMapped=Gt.getTransfer(S.colorSpace)!==Jt,(h!==S||d!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ye(new Zn(2,2),new ze({name:"BackgroundMaterial",uniforms:Yi(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Gt.getTransfer(S.colorSpace)!==Jt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,E){y.getRGB(el,Gc(n)),e.buffers.color.setClear(el.r,el.g,el.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:b,dispose:p}}function u0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(A,k,V,G,z){let B=!1,O=d(A,G,V,k);r!==O&&(r=O,c(r.object)),B=f(A,G,V,z),B&&g(A,G,V,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,S(A,k,V,G),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return n.createVertexArray()}function c(A){return n.bindVertexArray(A)}function h(A){return n.deleteVertexArray(A)}function d(A,k,V,G){let z=G.wireframe===!0,B=i[k.id];B===void 0&&(B={},i[k.id]=B);let O=A.isInstancedMesh===!0?A.id:0,Q=B[O];Q===void 0&&(Q={},B[O]=Q);let J=Q[V.id];J===void 0&&(J={},Q[V.id]=J);let ct=J[z];return ct===void 0&&(ct=u(l()),J[z]=ct),ct}function u(A){let k=[],V=[],G=[];for(let z=0;z<e;z++)k[z]=0,V[z]=0,G[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:G,object:A,attributes:{},index:null}}function f(A,k,V,G){let z=r.attributes,B=k.attributes,O=0,Q=V.getAttributes();for(let J in Q)if(Q[J].location>=0){let ft=z[J],ut=B[J];if(ut===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(ut=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(ut=A.instanceColor)),ft===void 0||ft.attribute!==ut||ut&&ft.data!==ut.data)return!0;O++}return r.attributesNum!==O||r.index!==G}function g(A,k,V,G){let z={},B=k.attributes,O=0,Q=V.getAttributes();for(let J in Q)if(Q[J].location>=0){let ft=B[J];ft===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(ft=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(ft=A.instanceColor));let ut={};ut.attribute=ft,ft&&ft.data&&(ut.data=ft.data),z[J]=ut,O++}r.attributes=z,r.attributesNum=O,r.index=G}function b(){let A=r.newAttributes;for(let k=0,V=A.length;k<V;k++)A[k]=0}function m(A){p(A,0)}function p(A,k){let V=r.newAttributes,G=r.enabledAttributes,z=r.attributeDivisors;V[A]=1,G[A]===0&&(n.enableVertexAttribArray(A),G[A]=1),z[A]!==k&&(n.vertexAttribDivisor(A,k),z[A]=k)}function y(){let A=r.newAttributes,k=r.enabledAttributes;for(let V=0,G=k.length;V<G;V++)k[V]!==A[V]&&(n.disableVertexAttribArray(V),k[V]=0)}function E(A,k,V,G,z,B,O){O===!0?n.vertexAttribIPointer(A,k,V,z,B):n.vertexAttribPointer(A,k,V,G,z,B)}function S(A,k,V,G){b();let z=G.attributes,B=V.getAttributes(),O=k.defaultAttributeValues;for(let Q in B){let J=B[Q];if(J.location>=0){let ct=z[Q];if(ct===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(ct=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(ct=A.instanceColor)),ct!==void 0){let ft=ct.normalized,ut=ct.itemSize,Ut=t.get(ct);if(Ut===void 0)continue;let ce=Ut.buffer,oe=Ut.type,$=Ut.bytesPerElement,nt=oe===n.INT||oe===n.UNSIGNED_INT||ct.gpuType===mo;if(ct.isInterleavedBufferAttribute){let rt=ct.data,Nt=rt.stride,Et=ct.offset;if(rt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<J.locationSize;Pt++)p(J.location+Pt,rt.meshPerAttribute);A.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Pt=0;Pt<J.locationSize;Pt++)m(J.location+Pt);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let Pt=0;Pt<J.locationSize;Pt++)E(J.location+Pt,ut/J.locationSize,oe,ft,Nt*$,(Et+ut/J.locationSize*Pt)*$,nt)}else{if(ct.isInstancedBufferAttribute){for(let rt=0;rt<J.locationSize;rt++)p(J.location+rt,ct.meshPerAttribute);A.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let rt=0;rt<J.locationSize;rt++)m(J.location+rt);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let rt=0;rt<J.locationSize;rt++)E(J.location+rt,ut/J.locationSize,oe,ft,ut*$,ut/J.locationSize*rt*$,nt)}}else if(O!==void 0){let ft=O[Q];if(ft!==void 0)switch(ft.length){case 2:n.vertexAttrib2fv(J.location,ft);break;case 3:n.vertexAttrib3fv(J.location,ft);break;case 4:n.vertexAttrib4fv(J.location,ft);break;default:n.vertexAttrib1fv(J.location,ft)}}}}y()}function C(){w();for(let A in i){let k=i[A];for(let V in k){let G=k[V];for(let z in G){let B=G[z];for(let O in B)h(B[O].object),delete B[O];delete G[z]}}delete i[A]}}function T(A){if(i[A.id]===void 0)return;let k=i[A.id];for(let V in k){let G=k[V];for(let z in G){let B=G[z];for(let O in B)h(B[O].object),delete B[O];delete G[z]}}delete i[A.id]}function I(A){for(let k in i){let V=i[k];for(let G in V){let z=V[G];if(z[A.id]===void 0)continue;let B=z[A.id];for(let O in B)h(B[O].object),delete B[O];delete z[A.id]}}}function _(A){for(let k in i){let V=i[k],G=A.isInstancedMesh===!0?A.id:0,z=V[G];if(z!==void 0){for(let B in z){let O=z[B];for(let Q in O)h(O[Q].object),delete O[Q];delete z[B]}delete V[G],Object.keys(V).length===0&&delete i[k]}}}function w(){q(),a=!0,r!==s&&(r=s,c(r.object))}function q(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:q,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:I,initAttributes:b,enableAttribute:m,disableUnusedAttributes:y}}function d0(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,i,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let b=0;b<d;b++)g+=h[b]*u[b];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function p0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==ln&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let _=I===Pn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==en&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==bn&&!_)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Tt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:S,maxSamples:C,samples:T}}function f0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Sn,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,b=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let y=r?0:i,E=y*4,S=p.clippingState||null;l.value=S,S=h(g,u,E,f);for(let C=0;C!==E;++C)S[C]=e[C];p.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let b=d!==null?d.length:0,m=null;if(b!==0){if(m=l.value,g!==!0||m===null){let p=f+b*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,S=f;E!==b;++E,S+=4)a.copy(d[E]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,m}}var Ei=4,wp=[.125,.215,.35,.446,.526,.582],Ji=20,m0=256,Rr=new Wi,Mp=new Rt,Yc=null,$c=0,Zc=0,Jc=!1,g0=new F,il=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=g0}=r;Yc=this._renderer.getRenderTarget(),$c=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Yc,$c,Zc),this._renderer.xr.enabled=Jc,t.scissorTest=!1,ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wi||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yc=this._renderer.getRenderTarget(),$c=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:De,minFilter:De,generateMipmaps:!1,type:Pn,format:ln,colorSpace:Hi,depthBuffer:!1},s=Sp(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sp(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=v0(r)),this._blurMaterial=x0(r,t,e),this._ggxMaterial=_0(r,t,e)}return s}_compileMaterial(t){let e=new ye(new Qe,t);this._renderer.compile(e,Rr)}_sceneToCubeUV(t,e,i,s,r){let l=new Oe(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Mp),d.toneMapping=_n,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ye(new Ls,new $n({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,m=b.material,p=!1,y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(Mp),p=!0);for(let E=0;E<6;E++){let S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let C=this._cubeSize;ks(s,S*C,E>2?C:0,C,C),d.setRenderTarget(s),p&&d.render(b,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===wi||t.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ks(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Rr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,b=this._sizeLods[i],m=3*b*(i>g-Ei?i-g+Ei:0),p=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,ks(r,m,p,3*b,2*b),s.setRenderTarget(r),s.render(o,Rr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,ks(t,m,p,3*b,2*b),s.setRenderTarget(t),s.render(o,Rr)}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&At("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=c;let u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ji-1),b=r/g,m=isFinite(r)?1+Math.floor(h*b):Ji;m>Ji&&Tt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ji}`);let p=[],y=0;for(let I=0;I<Ji;++I){let _=I/b,w=Math.exp(-_*_/2);p.push(w),I===0?y+=w:I<m&&(y+=2*w)}for(let I=0;I<p.length;I++)p[I]=p[I]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-i;let S=this._sizeLods[s],C=3*S*(s>E-Ei?s-E+Ei:0),T=4*(this._cubeSize-S);ks(e,C,T,3*S,2*S),l.setRenderTarget(e),l.render(d,Rr)}};function v0(n){let t=[],e=[],i=[],s=n,r=n-Ei+1+wp.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Ei?l=wp[a-n+Ei-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,b=3,m=2,p=1,y=new Float32Array(b*g*f),E=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let T=0;T<f;T++){let I=T%3*2/3-1,_=T>2?0:-1,w=[I,_,0,I+2/3,_,0,I+2/3,_+1,0,I,_,0,I+2/3,_+1,0,I,_+1,0];y.set(w,b*g*T),E.set(u,m*g*T);let q=[T,T,T,T,T,T];S.set(q,p*g*T)}let C=new Qe;C.setAttribute("position",new je(y,b)),C.setAttribute("uv",new je(E,m)),C.setAttribute("faceIndex",new je(S,p)),i.push(new ye(C,null)),s>Ei&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Sp(n,t,e){let i=new Ke(n,t,e);return i.texture.mapping=Sr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function _0(n,t,e){return new ze({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:m0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:al(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function x0(n,t,e){let i=new Float32Array(Ji),s=new F(0,1,0);return new ze({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Ep(){return new ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Tp(){return new ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function al(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var sl=class extends Ke{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new fr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ls(5,5,5),r=new ze({name:"CubemapFromEquirect",uniforms:Yi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:He,blending:An});r.uniforms.tEquirect.value=e;let a=new ye(s,r),o=e.minFilter;return e.minFilter===Mi&&(e.minFilter=De),new co(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function b0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===uo||f===po)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let b=new sl(g.height);return b.fromEquirectangularTexture(n,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===uo||f===po,b=f===wi||f===Xi;if(g||b){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new il(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let y=u.image;return g&&y&&y.height>0||b&&y&&l(y)?(i===null&&(i=new il(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===uo?u.mapping=wi:f===po&&(u.mapping=Xi),u}function l(u){let f=0,g=6;for(let b=0;b<g;b++)u[b]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function y0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&lr("WebGLRenderer: "+i+" extension not supported."),s}}}function w0(n,t,e,i){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,b=0;if(g===void 0)return;if(f!==null){let y=f.array;b=f.version;for(let E=0,S=y.length;E<S;E+=3){let C=y[E+0],T=y[E+1],I=y[E+2];u.push(C,T,T,I,I,C)}}else{let y=g.array;b=g.version;for(let E=0,S=y.length/3-1;E<S;E+=3){let C=E+0,T=E+1,I=E+2;u.push(C,T,T,I,I,C)}}let m=new(g.count>=65535?dr:ur)(u,1);m.version=b;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function M0(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*a),e.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,u*a,g),e.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function d(u,f,g,b){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],b[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,b,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*b[y];e.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function S0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:At("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function E0(n,t,e){let i=new WeakMap,s=new fe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let w=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],E=0;f===!0&&(E=1),g===!0&&(E=2),b===!0&&(E=3);let S=o.attributes.position.count*E,C=1;S>t.maxTextureSize&&(C=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let T=new Float32Array(S*C*4*d),I=new cr(T,S,C,d);I.type=bn,I.needsUpdate=!0;let _=E*4;for(let q=0;q<d;q++){let A=m[q],k=p[q],V=y[q],G=S*C*4*q;for(let z=0;z<A.count;z++){let B=z*_;f===!0&&(s.fromBufferAttribute(A,z),T[G+B+0]=s.x,T[G+B+1]=s.y,T[G+B+2]=s.z,T[G+B+3]=0),g===!0&&(s.fromBufferAttribute(k,z),T[G+B+4]=s.x,T[G+B+5]=s.y,T[G+B+6]=s.z,T[G+B+7]=0),b===!0&&(s.fromBufferAttribute(V,z),T[G+B+8]=s.x,T[G+B+9]=s.y,T[G+B+10]=s.z,T[G+B+11]=V.itemSize===4?s.w:1)}}u={count:d,texture:I,size:new Wt(S,C)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let b=0;b<c.length;b++)f+=c[b];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function T0(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var C0={[Mc]:"LINEAR_TONE_MAPPING",[Sc]:"REINHARD_TONE_MAPPING",[Ec]:"CINEON_TONE_MAPPING",[Tc]:"ACES_FILMIC_TONE_MAPPING",[Ac]:"AGX_TONE_MAPPING",[Pc]:"NEUTRAL_TONE_MAPPING",[Cc]:"CUSTOM_TONE_MAPPING"};function A0(n,t,e,i,s){let r=new Ke(t,e,{type:n,depthBuffer:i,stencilBuffer:s}),a=new Ke(t,e,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),o=new Qe;o.setAttribute("position",new Ie([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ie([0,2,0,0,2,0],2));let l=new Ja({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new ye(o,l),h=new Wi(-1,1,1,-1,0,1),d=null,u=null,f=!1,g,b=null,m=[],p=!1;this.setSize=function(y,E){r.setSize(y,E),a.setSize(y,E);for(let S=0;S<m.length;S++){let C=m[S];C.setSize&&C.setSize(y,E)}},this.setEffects=function(y){m=y,p=m.length>0&&m[0].isRenderPass===!0;let E=r.width,S=r.height;for(let C=0;C<m.length;C++){let T=m[C];T.setSize&&T.setSize(E,S)}},this.begin=function(y,E){if(f||y.toneMapping===_n&&m.length===0)return!1;if(b=E,E!==null){let S=E.width,C=E.height;(r.width!==S||r.height!==C)&&this.setSize(S,C)}return p===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=_n,!0},this.hasRenderPass=function(){return p},this.end=function(y,E){y.toneMapping=g,f=!0;let S=r,C=a;for(let T=0;T<m.length;T++){let I=m[T];if(I.enabled!==!1&&(I.render(y,C,S,E),I.needsSwap!==!1)){let _=S;S=C,C=_}}if(d!==y.outputColorSpace||u!==y.toneMapping){d=y.outputColorSpace,u=y.toneMapping,l.defines={},Gt.getTransfer(d)===Jt&&(l.defines.SRGB_TRANSFER="");let T=C0[u];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(b),y.render(c,h),b=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}var Xp=new Ve,Qc=new _i(1,1),qp=new cr,Yp=new Xa,$p=new fr,Cp=[],Ap=[],Pp=new Float32Array(16),Rp=new Float32Array(9),Ip=new Float32Array(4);function zs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Cp[s];if(r===void 0&&(r=new Float32Array(s),Cp[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Me(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ol(n,t){let e=Ap[t];e===void 0&&(e=new Int32Array(t),Ap[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function P0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function R0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Me(e,t)}}function I0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Me(e,t)}}function D0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Me(e,t)}}function L0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(we(e,i))return;Ip.set(i),n.uniformMatrix2fv(this.addr,!1,Ip),Me(e,i)}}function F0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(we(e,i))return;Rp.set(i),n.uniformMatrix3fv(this.addr,!1,Rp),Me(e,i)}}function N0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(we(e,i))return;Pp.set(i),n.uniformMatrix4fv(this.addr,!1,Pp),Me(e,i)}}function U0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function O0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Me(e,t)}}function B0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Me(e,t)}}function k0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Me(e,t)}}function V0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function z0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Me(e,t)}}function H0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Me(e,t)}}function G0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Me(e,t)}}function W0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Qc.compareFunction=e.isReversedDepthBuffer()?tl:Qo,r=Qc):r=Xp,e.setTexture2D(t||r,s)}function X0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Yp,s)}function q0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||$p,s)}function Y0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||qp,s)}function $0(n){switch(n){case 5126:return P0;case 35664:return R0;case 35665:return I0;case 35666:return D0;case 35674:return L0;case 35675:return F0;case 35676:return N0;case 5124:case 35670:return U0;case 35667:case 35671:return O0;case 35668:case 35672:return B0;case 35669:case 35673:return k0;case 5125:return V0;case 36294:return z0;case 36295:return H0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return W0;case 35679:case 36299:case 36307:return X0;case 35680:case 36300:case 36308:case 36293:return q0;case 36289:case 36303:case 36311:case 36292:return Y0}}function Z0(n,t){n.uniform1fv(this.addr,t)}function J0(n,t){let e=zs(t,this.size,2);n.uniform2fv(this.addr,e)}function j0(n,t){let e=zs(t,this.size,3);n.uniform3fv(this.addr,e)}function K0(n,t){let e=zs(t,this.size,4);n.uniform4fv(this.addr,e)}function Q0(n,t){let e=zs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function tx(n,t){let e=zs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function ex(n,t){let e=zs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function nx(n,t){n.uniform1iv(this.addr,t)}function ix(n,t){n.uniform2iv(this.addr,t)}function sx(n,t){n.uniform3iv(this.addr,t)}function rx(n,t){n.uniform4iv(this.addr,t)}function ax(n,t){n.uniform1uiv(this.addr,t)}function ox(n,t){n.uniform2uiv(this.addr,t)}function lx(n,t){n.uniform3uiv(this.addr,t)}function cx(n,t){n.uniform4uiv(this.addr,t)}function hx(n,t,e){let i=this.cache,s=t.length,r=ol(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Qc:a=Xp;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function ux(n,t,e){let i=this.cache,s=t.length,r=ol(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Yp,r[a])}function dx(n,t,e){let i=this.cache,s=t.length,r=ol(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||$p,r[a])}function px(n,t,e){let i=this.cache,s=t.length,r=ol(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Me(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||qp,r[a])}function fx(n){switch(n){case 5126:return Z0;case 35664:return J0;case 35665:return j0;case 35666:return K0;case 35674:return Q0;case 35675:return tx;case 35676:return ex;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return sx;case 35669:case 35673:return rx;case 5125:return ax;case 36294:return ox;case 36295:return lx;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return hx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return px}}var th=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=$0(e.type)}},eh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fx(e.type)}},nh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},jc=/(\w+)(\])?(\[|\.)?/g;function Dp(n,t){n.seq.push(t),n.map[t.id]=t}function mx(n,t,e){let i=n.name,s=i.length;for(jc.lastIndex=0;;){let r=jc.exec(i),a=jc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Dp(e,c===void 0?new th(o,n,t):new eh(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new nh(o),Dp(e,d)),e=d}}}var Vs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);mx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Lp(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var gx=37297,vx=0;function _x(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Fp=new Ft;function xx(n){Gt._getMatrix(Fp,Gt.workingColorSpace,n);let t=`mat3( ${Fp.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(n)){case ar:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return Tt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Np(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+_x(n.getShaderSource(t),o)}else return r}function bx(n,t){let e=xx(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var yx={[Mc]:"Linear",[Sc]:"Reinhard",[Ec]:"Cineon",[Tc]:"ACESFilmic",[Ac]:"AgX",[Pc]:"Neutral",[Cc]:"Custom"};function wx(n,t){let e=yx[t];return e===void 0?(Tt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var nl=new F;function Mx(){Gt.getLuminanceCoefficients(nl);let n=nl.x.toFixed(4),t=nl.y.toFixed(4),e=nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function Ex(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Tx(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Dr(n){return n!==""}function Up(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Op(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(n){return n.replace(Cx,Px)}var Ax=new Map;function Px(n,t){let e=Ot[t];if(e===void 0){let i=Ax.get(t);if(i!==void 0)e=Ot[i],Tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ih(e)}var Rx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bp(n){return n.replace(Rx,Ix)}function Ix(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kp(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Dx={[Mr]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function Lx(n){return Dx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Fx={[wi]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[Sr]:"ENVMAP_TYPE_CUBE_UV"};function Nx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Fx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ux={[Xi]:"ENVMAP_MODE_REFRACTION"};function Ox(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ux[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Bx={[wc]:"ENVMAP_BLENDING_MULTIPLY",[sp]:"ENVMAP_BLENDING_MIX",[rp]:"ENVMAP_BLENDING_ADD"};function kx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Bx[n.combine]||"ENVMAP_BLENDING_NONE"}function Vx(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function zx(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Lx(e),c=Nx(e),h=Ox(e),d=kx(e),u=Vx(e),f=Sx(e),g=Ex(r),b=s.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Dr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Dr).join(`
`),p.length>0&&(p+=`
`)):(m=[kp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),p=[kp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_n?"#define TONE_MAPPING":"",e.toneMapping!==_n?Ot.tonemapping_pars_fragment:"",e.toneMapping!==_n?wx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,bx("linearToOutputTexel",e.outputColorSpace),Mx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Dr).join(`
`)),a=ih(a),a=Up(a,e),a=Op(a,e),o=ih(o),o=Up(o,e),o=Op(o,e),a=Bp(a),o=Bp(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=y+m+a,S=y+p+o,C=Lp(s,s.VERTEX_SHADER,E),T=Lp(s,s.FRAGMENT_SHADER,S);s.attachShader(b,C),s.attachShader(b,T),e.index0AttributeName!==void 0?s.bindAttribLocation(b,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function I(A){if(n.debug.checkShaderErrors){let k=s.getProgramInfoLog(b)||"",V=s.getShaderInfoLog(C)||"",G=s.getShaderInfoLog(T)||"",z=k.trim(),B=V.trim(),O=G.trim(),Q=!0,J=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,b,C,T);else{let ct=Np(s,C,"vertex"),ft=Np(s,T,"fragment");At("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+z+`
`+ct+`
`+ft)}else z!==""?Tt("WebGLProgram: Program Info Log:",z):(B===""||O==="")&&(J=!1);J&&(A.diagnostics={runnable:Q,programLog:z,vertexShader:{log:B,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(C),s.deleteShader(T),_=new Vs(s,b),w=Tx(s,b)}let _;this.getUniforms=function(){return _===void 0&&I(this),_};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let q=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=s.getProgramParameter(b,gx)),q},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vx++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=C,this.fragmentShader=T,this}var Hx=0,sh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new rh(t),e.set(t,i)),i}},rh=class{constructor(t){this.id=Hx++,this.code=t,this.usedTimes=0}};function Gx(n,t,e,i,s,r){let a=new hr,o=new sh,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function b(_,w,q,A,k){let V=A.fog,G=k.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,O=t.get(_.envMap||z,B),Q=O&&O.mapping===Sr?O.image.height:null,J=f[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Tt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let ct=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ft=ct!==void 0?ct.length:0,ut=0;G.morphAttributes.position!==void 0&&(ut=1),G.morphAttributes.normal!==void 0&&(ut=2),G.morphAttributes.color!==void 0&&(ut=3);let Ut,ce,oe,$;if(J){let Qt=In[J];Ut=Qt.vertexShader,ce=Qt.fragmentShader}else Ut=_.vertexShader,ce=_.fragmentShader,o.update(_),oe=o.getVertexShaderID(_),$=o.getFragmentShaderID(_);let nt=n.getRenderTarget(),rt=n.state.buffers.depth.getReversed(),Nt=k.isInstancedMesh===!0,Et=k.isBatchedMesh===!0,Pt=!!_.map,Ee=!!_.matcap,Xt=!!O,Kt=!!_.aoMap,ne=!!_.lightMap,Bt=!!_.bumpMap,ge=!!_.normalMap,P=!!_.displacementMap,xe=!!_.emissiveMap,Zt=!!_.metalnessMap,se=!!_.roughnessMap,bt=_.anisotropy>0,M=_.clearcoat>0,v=_.dispersion>0,D=_.iridescence>0,Y=_.sheen>0,Z=_.transmission>0,X=bt&&!!_.anisotropyMap,mt=M&&!!_.clearcoatMap,it=M&&!!_.clearcoatNormalMap,St=M&&!!_.clearcoatRoughnessMap,Ct=D&&!!_.iridescenceMap,j=D&&!!_.iridescenceThicknessMap,tt=Y&&!!_.sheenColorMap,gt=Y&&!!_.sheenRoughnessMap,_t=!!_.specularMap,ht=!!_.specularColorMap,kt=!!_.specularIntensityMap,R=Z&&!!_.transmissionMap,st=Z&&!!_.thicknessMap,et=!!_.gradientMap,pt=!!_.alphaMap,K=_.alphaTest>0,W=!!_.alphaHash,vt=!!_.extensions,It=_n;_.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(It=n.toneMapping);let re={shaderID:J,shaderType:_.type,shaderName:_.name,vertexShader:Ut,fragmentShader:ce,defines:_.defines,customVertexShaderID:oe,customFragmentShaderID:$,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Et,batchingColor:Et&&k._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&k.instanceColor!==null,instancingMorph:Nt&&k.morphTexture!==null,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Hi,alphaToCoverage:!!_.alphaToCoverage,map:Pt,matcap:Ee,envMap:Xt,envMapMode:Xt&&O.mapping,envMapCubeUVHeight:Q,aoMap:Kt,lightMap:ne,bumpMap:Bt,normalMap:ge,displacementMap:P,emissiveMap:xe,normalMapObjectSpace:ge&&_.normalMapType===lp,normalMapTangentSpace:ge&&_.normalMapType===Bc,metalnessMap:Zt,roughnessMap:se,anisotropy:bt,anisotropyMap:X,clearcoat:M,clearcoatMap:mt,clearcoatNormalMap:it,clearcoatRoughnessMap:St,dispersion:v,iridescence:D,iridescenceMap:Ct,iridescenceThicknessMap:j,sheen:Y,sheenColorMap:tt,sheenRoughnessMap:gt,specularMap:_t,specularColorMap:ht,specularIntensityMap:kt,transmission:Z,transmissionMap:R,thicknessMap:st,gradientMap:et,opaque:_.transparent===!1&&_.blending===qn&&_.alphaToCoverage===!1,alphaMap:pt,alphaTest:K,alphaHash:W,combine:_.combine,mapUv:Pt&&g(_.map.channel),aoMapUv:Kt&&g(_.aoMap.channel),lightMapUv:ne&&g(_.lightMap.channel),bumpMapUv:Bt&&g(_.bumpMap.channel),normalMapUv:ge&&g(_.normalMap.channel),displacementMapUv:P&&g(_.displacementMap.channel),emissiveMapUv:xe&&g(_.emissiveMap.channel),metalnessMapUv:Zt&&g(_.metalnessMap.channel),roughnessMapUv:se&&g(_.roughnessMap.channel),anisotropyMapUv:X&&g(_.anisotropyMap.channel),clearcoatMapUv:mt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:gt&&g(_.sheenRoughnessMap.channel),specularMapUv:_t&&g(_.specularMap.channel),specularColorMapUv:ht&&g(_.specularColorMap.channel),specularIntensityMapUv:kt&&g(_.specularIntensityMap.channel),transmissionMapUv:R&&g(_.transmissionMap.channel),thicknessMapUv:st&&g(_.thicknessMap.channel),alphaMapUv:pt&&g(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ge||bt),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(Pt||pt),fog:!!V,useFog:_.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&ge===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:k.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:ut,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&q.length>0,shadowMapType:n.shadowMap.type,toneMapping:It,decodeVideoTexture:Pt&&_.map.isVideoTexture===!0&&Gt.getTransfer(_.map.colorSpace)===Jt,decodeVideoTextureEmissive:xe&&_.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(_.emissiveMap.colorSpace)===Jt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===on,flipSided:_.side===He,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:vt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&_.extensions.multiDraw===!0||Et)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return re.vertexUv1s=l.has(1),re.vertexUv2s=l.has(2),re.vertexUv3s=l.has(3),l.clear(),re}function m(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let q in _.defines)w.push(q),w.push(_.defines[q]);return _.isRawShaderMaterial===!1&&(p(w,_),y(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function p(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function y(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),_.push(a.mask)}function E(_){let w=f[_.type],q;if(w){let A=In[w];q=bp.clone(A.uniforms)}else q=_.uniforms;return q}function S(_,w){let q=h.get(w);return q!==void 0?++q.usedTimes:(q=new zx(n,w,_,s),c.push(q),h.set(w,q)),q}function C(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function I(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:E,acquireProgram:S,releaseProgram:C,releaseShaderCache:T,programs:c,dispose:I}}function Wx(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Xx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Vp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function zp(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,b,m,p){let y=n[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:p},n[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=b,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function l(u,f,g,b,m,p){let y=o(u,f,g,b,m,p);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):e.push(y)}function c(u,f,g,b,m,p){let y=o(u,f,g,b,m,p);g.transmission>0?i.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||Xx),i.length>1&&i.sort(f||Vp),s.length>1&&s.sort(f||Vp)}function d(){for(let u=t,f=n.length;u<f;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function qx(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new zp,n.set(i,[a])):s>=r.length?(a=new zp,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Yx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Rt};break;case"SpotLight":e={position:new F,direction:new F,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function $x(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Zx=0;function Jx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function jx(n){let t=new Yx,e=$x(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let s=new F,r=new _e,a=new _e;function o(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,g=0,b=0,m=0,p=0,y=0,E=0,S=0,C=0,T=0,I=0;c.sort(Jx);for(let w=0,q=c.length;w<q;w++){let A=c[w],k=A.color,V=A.intensity,G=A.distance,z=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===qi?z=A.shadow.map.texture:z=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=k.r*V,d+=k.g*V,u+=k.b*V;else if(A.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(A.sh.coefficients[B],V);I++}else if(A.isDirectionalLight){let B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let O=A.shadow,Q=e.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=z,i.directionalShadowMatrix[f]=A.shadow.matrix,y++}i.directional[f]=B,f++}else if(A.isSpotLight){let B=t.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(k).multiplyScalar(V),B.distance=G,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,i.spot[b]=B;let O=A.shadow;if(A.map&&(i.spotLightMap[C]=A.map,C++,O.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[b]=O.matrix,A.castShadow){let Q=e.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.spotShadow[b]=Q,i.spotShadowMap[b]=z,S++}b++}else if(A.isRectAreaLight){let B=t.get(A);B.color.copy(k).multiplyScalar(V),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=B,m++}else if(A.isPointLight){let B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){let O=A.shadow,Q=e.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=A.shadow.matrix,E++}i.point[g]=B,g++}else if(A.isHemisphereLight){let B=t.get(A);B.skyColor.copy(A.color).multiplyScalar(V),B.groundColor.copy(A.groundColor).multiplyScalar(V),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let _=i.hash;(_.directionalLength!==f||_.pointLength!==g||_.spotLength!==b||_.rectAreaLength!==m||_.hemiLength!==p||_.numDirectionalShadows!==y||_.numPointShadows!==E||_.numSpotShadows!==S||_.numSpotMaps!==C||_.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,_.directionalLength=f,_.pointLength=g,_.spotLength=b,_.rectAreaLength=m,_.hemiLength=p,_.numDirectionalShadows=y,_.numPointShadows=E,_.numSpotShadows=S,_.numSpotMaps=C,_.numLightProbes=I,i.version=Zx++)}function l(c,h){let d=0,u=0,f=0,g=0,b=0,m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){let E=c[p];if(E.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(E.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(E.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){let S=i.point[u];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){let S=i.hemi[b];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),b++}}}return{setup:o,setupView:l,state:i}}function Hp(n){let t=new jx(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Kx(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Hp(n),t.set(s,[o])):r>=a.length?(o=new Hp(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Qx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,eb=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],nb=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Gp=new _e,Ir=new F,Kc=new F;function ib(n,t,e){let i=new pr,s=new Wt,r=new Wt,a=new fe,o=new ja,l=new Ka,c={},h=e.maxTextureSize,d={[Xn]:He,[He]:Xn,[on]:on},u=new ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Qx,fragmentShader:tb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Qe;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ye(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mr;let p=this.type;this.render=function(T,I,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===kd&&(Tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Mr);let w=n.getRenderTarget(),q=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),k=n.state;k.setBlending(An),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let V=p!==this.type;V&&I.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(z=>z.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,z=T.length;G<z;G++){let B=T[G],O=B.shadow;if(O===void 0){Tt("WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let Q=O.getFrameExtents();s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y));let J=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=J,O.map===null||V===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Ns){if(B.isPointLight){Tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Ke(s.x,s.y,{format:qi,type:Pn,minFilter:De,magFilter:De,generateMipmaps:!1}),O.map.texture.name=B.name+".shadowMap",O.map.depthTexture=new _i(s.x,s.y,bn),O.map.depthTexture.name=B.name+".shadowMapDepth",O.map.depthTexture.format=Tn,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ae,O.map.depthTexture.magFilter=Ae}else B.isPointLight?(O.map=new sl(s.x),O.map.depthTexture=new $a(s.x,xn)):(O.map=new Ke(s.x,s.y),O.map.depthTexture=new _i(s.x,s.y,xn)),O.map.depthTexture.name=B.name+".shadowMap",O.map.depthTexture.format=Tn,this.type===Mr?(O.map.depthTexture.compareFunction=J?tl:Qo,O.map.depthTexture.minFilter=De,O.map.depthTexture.magFilter=De):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ae,O.map.depthTexture.magFilter=Ae);O.camera.updateProjectionMatrix()}let ct=O.map.isWebGLCubeRenderTarget?6:1;for(let ft=0;ft<ct;ft++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,ft),n.clear();else{ft===0&&(n.setRenderTarget(O.map),n.clear());let ut=O.getViewport(ft);a.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),k.viewport(a)}if(B.isPointLight){let ut=O.camera,Ut=O.matrix,ce=B.distance||ut.far;ce!==ut.far&&(ut.far=ce,ut.updateProjectionMatrix()),Ir.setFromMatrixPosition(B.matrixWorld),ut.position.copy(Ir),Kc.copy(ut.position),Kc.add(eb[ft]),ut.up.copy(nb[ft]),ut.lookAt(Kc),ut.updateMatrixWorld(),Ut.makeTranslation(-Ir.x,-Ir.y,-Ir.z),Gp.multiplyMatrices(ut.projectionMatrix,ut.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Gp,ut.coordinateSystem,ut.reversedDepth)}else O.updateMatrices(B);i=O.getFrustum(),S(I,_,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===Ns&&y(O,_),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(w,q,A)};function y(T,I){let _=t.update(b);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ke(s.x,s.y,{format:qi,type:Pn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(I,null,_,u,b,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(I,null,_,f,b,null)}function E(T,I,_,w){let q=null,A=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)q=A;else if(q=_.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let k=q.uuid,V=I.uuid,G=c[k];G===void 0&&(G={},c[k]=G);let z=G[V];z===void 0&&(z=q.clone(),G[V]=z,I.addEventListener("dispose",C)),q=z}if(q.visible=I.visible,q.wireframe=I.wireframe,w===Ns?q.side=I.shadowSide!==null?I.shadowSide:I.side:q.side=I.shadowSide!==null?I.shadowSide:d[I.side],q.alphaMap=I.alphaMap,q.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,q.map=I.map,q.clipShadows=I.clipShadows,q.clippingPlanes=I.clippingPlanes,q.clipIntersection=I.clipIntersection,q.displacementMap=I.displacementMap,q.displacementScale=I.displacementScale,q.displacementBias=I.displacementBias,q.wireframeLinewidth=I.wireframeLinewidth,q.linewidth=I.linewidth,_.isPointLight===!0&&q.isMeshDistanceMaterial===!0){let k=n.properties.get(q);k.light=_}return q}function S(T,I,_,w,q){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&q===Ns)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);let V=t.update(T),G=T.material;if(Array.isArray(G)){let z=V.groups;for(let B=0,O=z.length;B<O;B++){let Q=z[B],J=G[Q.materialIndex];if(J&&J.visible){let ct=E(T,J,w,q);T.onBeforeShadow(n,T,I,_,V,ct,Q),n.renderBufferDirect(_,null,V,ct,T,Q),T.onAfterShadow(n,T,I,_,V,ct,Q)}}}else if(G.visible){let z=E(T,G,w,q);T.onBeforeShadow(n,T,I,_,V,z,null),n.renderBufferDirect(_,null,V,z,T,null),T.onAfterShadow(n,T,I,_,V,z,null)}}let k=T.children;for(let V=0,G=k.length;V<G;V++)S(k[V],I,_,w,q)}function C(T){T.target.removeEventListener("dispose",C);for(let _ in c){let w=c[_],q=T.target.uuid;q in w&&(w[q].dispose(),delete w[q])}}}function sb(n,t){function e(){let R=!1,st=new fe,et=null,pt=new fe(0,0,0,0);return{setMask:function(K){et!==K&&!R&&(n.colorMask(K,K,K,K),et=K)},setLocked:function(K){R=K},setClear:function(K,W,vt,It,re){re===!0&&(K*=It,W*=It,vt*=It),st.set(K,W,vt,It),pt.equals(st)===!1&&(n.clearColor(K,W,vt,It),pt.copy(st))},reset:function(){R=!1,et=null,pt.set(-1,0,0,0)}}}function i(){let R=!1,st=!1,et=null,pt=null,K=null;return{setReversed:function(W){if(st!==W){let vt=t.get("EXT_clip_control");W?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),st=W;let It=K;K=null,this.setClear(It)}},getReversed:function(){return st},setTest:function(W){W?nt(n.DEPTH_TEST):rt(n.DEPTH_TEST)},setMask:function(W){et!==W&&!R&&(n.depthMask(W),et=W)},setFunc:function(W){if(st&&(W=_p[W]),pt!==W){switch(W){case La:n.depthFunc(n.NEVER);break;case Fa:n.depthFunc(n.ALWAYS);break;case Na:n.depthFunc(n.LESS);break;case zi:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Oa:n.depthFunc(n.GEQUAL);break;case Ba:n.depthFunc(n.GREATER);break;case ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=W}},setLocked:function(W){R=W},setClear:function(W){K!==W&&(K=W,st&&(W=1-W),n.clearDepth(W))},reset:function(){R=!1,et=null,pt=null,K=null,st=!1}}}function s(){let R=!1,st=null,et=null,pt=null,K=null,W=null,vt=null,It=null,re=null;return{setTest:function(Qt){R||(Qt?nt(n.STENCIL_TEST):rt(n.STENCIL_TEST))},setMask:function(Qt){st!==Qt&&!R&&(n.stencilMask(Qt),st=Qt)},setFunc:function(Qt,On,Bn){(et!==Qt||pt!==On||K!==Bn)&&(n.stencilFunc(Qt,On,Bn),et=Qt,pt=On,K=Bn)},setOp:function(Qt,On,Bn){(W!==Qt||vt!==On||It!==Bn)&&(n.stencilOp(Qt,On,Bn),W=Qt,vt=On,It=Bn)},setLocked:function(Qt){R=Qt},setClear:function(Qt){re!==Qt&&(n.clearStencil(Qt),re=Qt)},reset:function(){R=!1,st=null,et=null,pt=null,K=null,W=null,vt=null,It=null,re=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,b=!1,m=null,p=null,y=null,E=null,S=null,C=null,T=null,I=new Rt(0,0,0),_=0,w=!1,q=null,A=null,k=null,V=null,G=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,O=0,Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Q)[1]),B=O>=1):Q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),B=O>=2);let J=null,ct={},ft=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),Ut=new fe().fromArray(ft),ce=new fe().fromArray(ut);function oe(R,st,et,pt){let K=new Uint8Array(4),W=n.createTexture();n.bindTexture(R,W),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let vt=0;vt<et;vt++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(st,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(st+vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return W}let $={};$[n.TEXTURE_2D]=oe(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=oe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=oe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=oe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(n.DEPTH_TEST),a.setFunc(zi),Bt(!1),ge(_c),nt(n.CULL_FACE),Kt(An);function nt(R){h[R]!==!0&&(n.enable(R),h[R]=!0)}function rt(R){h[R]!==!1&&(n.disable(R),h[R]=!1)}function Nt(R,st){return d[R]!==st?(n.bindFramebuffer(R,st),d[R]=st,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=st),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=st),!0):!1}function Et(R,st){let et=f,pt=!1;if(R){et=u.get(st),et===void 0&&(et=[],u.set(st,et));let K=R.textures;if(et.length!==K.length||et[0]!==n.COLOR_ATTACHMENT0){for(let W=0,vt=K.length;W<vt;W++)et[W]=n.COLOR_ATTACHMENT0+W;et.length=K.length,pt=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,pt=!0);pt&&n.drawBuffers(et)}function Pt(R){return g!==R?(n.useProgram(R),g=R,!0):!1}let Ee={[mi]:n.FUNC_ADD,[zd]:n.FUNC_SUBTRACT,[Hd]:n.FUNC_REVERSE_SUBTRACT};Ee[Gd]=n.MIN,Ee[Wd]=n.MAX;let Xt={[Xd]:n.ZERO,[qd]:n.ONE,[Yd]:n.SRC_COLOR,[Ia]:n.SRC_ALPHA,[Qd]:n.SRC_ALPHA_SATURATE,[jd]:n.DST_COLOR,[Zd]:n.DST_ALPHA,[$d]:n.ONE_MINUS_SRC_COLOR,[Da]:n.ONE_MINUS_SRC_ALPHA,[Kd]:n.ONE_MINUS_DST_COLOR,[Jd]:n.ONE_MINUS_DST_ALPHA,[tp]:n.CONSTANT_COLOR,[ep]:n.ONE_MINUS_CONSTANT_COLOR,[np]:n.CONSTANT_ALPHA,[ip]:n.ONE_MINUS_CONSTANT_ALPHA};function Kt(R,st,et,pt,K,W,vt,It,re,Qt){if(R===An){b===!0&&(rt(n.BLEND),b=!1);return}if(b===!1&&(nt(n.BLEND),b=!0),R!==Vd){if(R!==m||Qt!==w){if((p!==mi||S!==mi)&&(n.blendEquation(n.FUNC_ADD),p=mi,S=mi),Qt)switch(R){case qn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xc:n.blendFunc(n.ONE,n.ONE);break;case bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:At("WebGLState: Invalid blending: ",R);break}else switch(R){case qn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case bc:At("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yc:At("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:At("WebGLState: Invalid blending: ",R);break}y=null,E=null,C=null,T=null,I.set(0,0,0),_=0,m=R,w=Qt}return}K=K||st,W=W||et,vt=vt||pt,(st!==p||K!==S)&&(n.blendEquationSeparate(Ee[st],Ee[K]),p=st,S=K),(et!==y||pt!==E||W!==C||vt!==T)&&(n.blendFuncSeparate(Xt[et],Xt[pt],Xt[W],Xt[vt]),y=et,E=pt,C=W,T=vt),(It.equals(I)===!1||re!==_)&&(n.blendColor(It.r,It.g,It.b,re),I.copy(It),_=re),m=R,w=!1}function ne(R,st){R.side===on?rt(n.CULL_FACE):nt(n.CULL_FACE);let et=R.side===He;st&&(et=!et),Bt(et),R.blending===qn&&R.transparent===!1?Kt(An):Kt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);let pt=R.stencilWrite;o.setTest(pt),pt&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),xe(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):rt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(R){q!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),q=R)}function ge(R){R!==Od?(nt(n.CULL_FACE),R!==A&&(R===_c?n.cullFace(n.BACK):R===Bd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):rt(n.CULL_FACE),A=R}function P(R){R!==k&&(B&&n.lineWidth(R),k=R)}function xe(R,st,et){R?(nt(n.POLYGON_OFFSET_FILL),(V!==st||G!==et)&&(V=st,G=et,a.getReversed()&&(st=-st),n.polygonOffset(st,et))):rt(n.POLYGON_OFFSET_FILL)}function Zt(R){R?nt(n.SCISSOR_TEST):rt(n.SCISSOR_TEST)}function se(R){R===void 0&&(R=n.TEXTURE0+z-1),J!==R&&(n.activeTexture(R),J=R)}function bt(R,st,et){et===void 0&&(J===null?et=n.TEXTURE0+z-1:et=J);let pt=ct[et];pt===void 0&&(pt={type:void 0,texture:void 0},ct[et]=pt),(pt.type!==R||pt.texture!==st)&&(J!==et&&(n.activeTexture(et),J=et),n.bindTexture(R,st||$[R]),pt.type=R,pt.texture=st)}function M(){let R=ct[J];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(R){At("WebGLState:",R)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(R){At("WebGLState:",R)}}function Y(){try{n.texSubImage2D(...arguments)}catch(R){At("WebGLState:",R)}}function Z(){try{n.texSubImage3D(...arguments)}catch(R){At("WebGLState:",R)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(R){At("WebGLState:",R)}}function mt(){try{n.compressedTexSubImage3D(...arguments)}catch(R){At("WebGLState:",R)}}function it(){try{n.texStorage2D(...arguments)}catch(R){At("WebGLState:",R)}}function St(){try{n.texStorage3D(...arguments)}catch(R){At("WebGLState:",R)}}function Ct(){try{n.texImage2D(...arguments)}catch(R){At("WebGLState:",R)}}function j(){try{n.texImage3D(...arguments)}catch(R){At("WebGLState:",R)}}function tt(R){Ut.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),Ut.copy(R))}function gt(R){ce.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),ce.copy(R))}function _t(R,st){let et=c.get(st);et===void 0&&(et=new WeakMap,c.set(st,et));let pt=et.get(R);pt===void 0&&(pt=n.getUniformBlockIndex(st,R.name),et.set(R,pt))}function ht(R,st){let pt=c.get(st).get(R);l.get(st)!==pt&&(n.uniformBlockBinding(st,pt,R.__bindingPointIndex),l.set(st,pt))}function kt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},J=null,ct={},d={},u=new WeakMap,f=[],g=null,b=!1,m=null,p=null,y=null,E=null,S=null,C=null,T=null,I=new Rt(0,0,0),_=0,w=!1,q=null,A=null,k=null,V=null,G=null,Ut.set(0,0,n.canvas.width,n.canvas.height),ce.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Nt,drawBuffers:Et,useProgram:Pt,setBlending:Kt,setMaterial:ne,setFlipSided:Bt,setCullFace:ge,setLineWidth:P,setPolygonOffset:xe,setScissorTest:Zt,activeTexture:se,bindTexture:bt,unbindTexture:M,compressedTexImage2D:v,compressedTexImage3D:D,texImage2D:Ct,texImage3D:j,updateUBOMapping:_t,uniformBlockBinding:ht,texStorage2D:it,texStorage3D:St,texSubImage2D:Y,texSubImage3D:Z,compressedTexSubImage2D:X,compressedTexSubImage3D:mt,scissor:tt,viewport:gt,reset:kt}}function rb(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,v){return f?new OffscreenCanvas(M,v):Cs("canvas")}function b(M,v,D){let Y=1,Z=bt(M);if((Z.width>D||Z.height>D)&&(Y=D/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let X=Math.floor(Y*Z.width),mt=Math.floor(Y*Z.height);d===void 0&&(d=g(X,mt));let it=v?g(X,mt):d;return it.width=X,it.height=mt,it.getContext("2d").drawImage(M,0,0,X,mt),Tt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+mt+")."),it}else return"data"in M&&Tt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function m(M){return M.generateMipmaps}function p(M){n.generateMipmap(M)}function y(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(M,v,D,Y,Z=!1){if(M!==null){if(n[M]!==void 0)return n[M];Tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let X=v;if(v===n.RED&&(D===n.FLOAT&&(X=n.R32F),D===n.HALF_FLOAT&&(X=n.R16F),D===n.UNSIGNED_BYTE&&(X=n.R8)),v===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(X=n.R8UI),D===n.UNSIGNED_SHORT&&(X=n.R16UI),D===n.UNSIGNED_INT&&(X=n.R32UI),D===n.BYTE&&(X=n.R8I),D===n.SHORT&&(X=n.R16I),D===n.INT&&(X=n.R32I)),v===n.RG&&(D===n.FLOAT&&(X=n.RG32F),D===n.HALF_FLOAT&&(X=n.RG16F),D===n.UNSIGNED_BYTE&&(X=n.RG8)),v===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(X=n.RG8UI),D===n.UNSIGNED_SHORT&&(X=n.RG16UI),D===n.UNSIGNED_INT&&(X=n.RG32UI),D===n.BYTE&&(X=n.RG8I),D===n.SHORT&&(X=n.RG16I),D===n.INT&&(X=n.RG32I)),v===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(X=n.RGB8UI),D===n.UNSIGNED_SHORT&&(X=n.RGB16UI),D===n.UNSIGNED_INT&&(X=n.RGB32UI),D===n.BYTE&&(X=n.RGB8I),D===n.SHORT&&(X=n.RGB16I),D===n.INT&&(X=n.RGB32I)),v===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),D===n.UNSIGNED_INT&&(X=n.RGBA32UI),D===n.BYTE&&(X=n.RGBA8I),D===n.SHORT&&(X=n.RGBA16I),D===n.INT&&(X=n.RGBA32I)),v===n.RGB&&(D===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),v===n.RGBA){let mt=Z?ar:Gt.getTransfer(Y);D===n.FLOAT&&(X=n.RGBA32F),D===n.HALF_FLOAT&&(X=n.RGBA16F),D===n.UNSIGNED_BYTE&&(X=mt===Jt?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function S(M,v){let D;return M?v===null||v===xn||v===Os?D=n.DEPTH24_STENCIL8:v===bn?D=n.DEPTH32F_STENCIL8:v===Us&&(D=n.DEPTH24_STENCIL8,Tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===xn||v===Os?D=n.DEPTH_COMPONENT24:v===bn?D=n.DEPTH_COMPONENT32F:v===Us&&(D=n.DEPTH_COMPONENT16),D}function C(M,v){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==Ae&&M.minFilter!==De?Math.log2(Math.max(v.width,v.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?v.mipmaps.length:1}function T(M){let v=M.target;v.removeEventListener("dispose",T),_(v),v.isVideoTexture&&h.delete(v)}function I(M){let v=M.target;v.removeEventListener("dispose",I),q(v)}function _(M){let v=i.get(M);if(v.__webglInit===void 0)return;let D=M.source,Y=u.get(D);if(Y){let Z=Y[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(M),Object.keys(Y).length===0&&u.delete(D)}i.remove(M)}function w(M){let v=i.get(M);n.deleteTexture(v.__webglTexture);let D=M.source,Y=u.get(D);delete Y[v.__cacheKey],a.memory.textures--}function q(M){let v=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let Z=0;Z<v.__webglFramebuffer[Y].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[Y][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[Y]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let D=M.textures;for(let Y=0,Z=D.length;Y<Z;Y++){let X=i.get(D[Y]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(D[Y])}i.remove(M)}let A=0;function k(){A=0}function V(){let M=A;return M>=s.maxTextures&&Tt("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),A+=1,M}function G(M){let v=[];return v.push(M.wrapS),v.push(M.wrapT),v.push(M.wrapR||0),v.push(M.magFilter),v.push(M.minFilter),v.push(M.anisotropy),v.push(M.internalFormat),v.push(M.format),v.push(M.type),v.push(M.generateMipmaps),v.push(M.premultiplyAlpha),v.push(M.flipY),v.push(M.unpackAlignment),v.push(M.colorSpace),v.join()}function z(M,v){let D=i.get(M);if(M.isVideoTexture&&Zt(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&D.__version!==M.version){let Y=M.image;if(Y===null)Tt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Tt("WebGLRenderer: Texture marked for update but image is incomplete");else{$(D,M,v);return}}else M.isExternalTexture&&(D.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+v)}function B(M,v){let D=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&D.__version!==M.version){$(D,M,v);return}else M.isExternalTexture&&(D.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+v)}function O(M,v){let D=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&D.__version!==M.version){$(D,M,v);return}e.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+v)}function Q(M,v){let D=i.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&D.__version!==M.version){nt(D,M,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+v)}let J={[Va]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[za]:n.MIRRORED_REPEAT},ct={[Ae]:n.NEAREST,[ap]:n.NEAREST_MIPMAP_NEAREST,[Er]:n.NEAREST_MIPMAP_LINEAR,[De]:n.LINEAR,[fo]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},ft={[cp]:n.NEVER,[fp]:n.ALWAYS,[hp]:n.LESS,[Qo]:n.LEQUAL,[up]:n.EQUAL,[tl]:n.GEQUAL,[dp]:n.GREATER,[pp]:n.NOTEQUAL};function ut(M,v){if(v.type===bn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===De||v.magFilter===fo||v.magFilter===Er||v.magFilter===Mi||v.minFilter===De||v.minFilter===fo||v.minFilter===Er||v.minFilter===Mi)&&Tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,J[v.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,J[v.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,J[v.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,ct[v.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,ct[v.minFilter]),v.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ae||v.minFilter!==Er&&v.minFilter!==Mi||v.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let D=t.get("EXT_texture_filter_anisotropic");n.texParameterf(M,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ut(M,v){let D=!1;M.__webglInit===void 0&&(M.__webglInit=!0,v.addEventListener("dispose",T));let Y=v.source,Z=u.get(Y);Z===void 0&&(Z={},u.set(Y,Z));let X=G(v);if(X!==M.__cacheKey){Z[X]===void 0&&(Z[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,D=!0),Z[X].usedTimes++;let mt=Z[M.__cacheKey];mt!==void 0&&(Z[M.__cacheKey].usedTimes--,mt.usedTimes===0&&w(v)),M.__cacheKey=X,M.__webglTexture=Z[X].texture}return D}function ce(M,v,D){return Math.floor(Math.floor(M/D)/v)}function oe(M,v,D,Y){let X=M.updateRanges;if(X.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,D,Y,v.data);else{X.sort((j,tt)=>j.start-tt.start);let mt=0;for(let j=1;j<X.length;j++){let tt=X[mt],gt=X[j],_t=tt.start+tt.count,ht=ce(gt.start,v.width,4),kt=ce(tt.start,v.width,4);gt.start<=_t+1&&ht===kt&&ce(gt.start+gt.count-1,v.width,4)===ht?tt.count=Math.max(tt.count,gt.start+gt.count-tt.start):(++mt,X[mt]=gt)}X.length=mt+1;let it=n.getParameter(n.UNPACK_ROW_LENGTH),St=n.getParameter(n.UNPACK_SKIP_PIXELS),Ct=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let j=0,tt=X.length;j<tt;j++){let gt=X[j],_t=Math.floor(gt.start/4),ht=Math.ceil(gt.count/4),kt=_t%v.width,R=Math.floor(_t/v.width),st=ht,et=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,kt),n.pixelStorei(n.UNPACK_SKIP_ROWS,R),e.texSubImage2D(n.TEXTURE_2D,0,kt,R,st,et,D,Y,v.data)}M.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,it),n.pixelStorei(n.UNPACK_SKIP_PIXELS,St),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ct)}}function $(M,v,D){let Y=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=n.TEXTURE_3D);let Z=Ut(M,v),X=v.source;e.bindTexture(Y,M.__webglTexture,n.TEXTURE0+D);let mt=i.get(X);if(X.version!==mt.__version||Z===!0){e.activeTexture(n.TEXTURE0+D);let it=Gt.getPrimaries(Gt.workingColorSpace),St=v.colorSpace===Jn?null:Gt.getPrimaries(v.colorSpace),Ct=v.colorSpace===Jn||it===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let j=b(v.image,!1,s.maxTextureSize);j=se(v,j);let tt=r.convert(v.format,v.colorSpace),gt=r.convert(v.type),_t=E(v.internalFormat,tt,gt,v.colorSpace,v.isVideoTexture);ut(Y,v);let ht,kt=v.mipmaps,R=v.isVideoTexture!==!0,st=mt.__version===void 0||Z===!0,et=X.dataReady,pt=C(v,j);if(v.isDepthTexture)_t=S(v.format===Si,v.type),st&&(R?e.texStorage2D(n.TEXTURE_2D,1,_t,j.width,j.height):e.texImage2D(n.TEXTURE_2D,0,_t,j.width,j.height,0,tt,gt,null));else if(v.isDataTexture)if(kt.length>0){R&&st&&e.texStorage2D(n.TEXTURE_2D,pt,_t,kt[0].width,kt[0].height);for(let K=0,W=kt.length;K<W;K++)ht=kt[K],R?et&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,ht.width,ht.height,tt,gt,ht.data):e.texImage2D(n.TEXTURE_2D,K,_t,ht.width,ht.height,0,tt,gt,ht.data);v.generateMipmaps=!1}else R?(st&&e.texStorage2D(n.TEXTURE_2D,pt,_t,j.width,j.height),et&&oe(v,j,tt,gt)):e.texImage2D(n.TEXTURE_2D,0,_t,j.width,j.height,0,tt,gt,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){R&&st&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,_t,kt[0].width,kt[0].height,j.depth);for(let K=0,W=kt.length;K<W;K++)if(ht=kt[K],v.format!==ln)if(tt!==null)if(R){if(et)if(v.layerUpdates.size>0){let vt=qc(ht.width,ht.height,v.format,v.type);for(let It of v.layerUpdates){let re=ht.data.subarray(It*vt/ht.data.BYTES_PER_ELEMENT,(It+1)*vt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,It,ht.width,ht.height,1,tt,re)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ht.width,ht.height,j.depth,tt,ht.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,_t,ht.width,ht.height,j.depth,0,ht.data,0,0);else Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?et&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ht.width,ht.height,j.depth,tt,gt,ht.data):e.texImage3D(n.TEXTURE_2D_ARRAY,K,_t,ht.width,ht.height,j.depth,0,tt,gt,ht.data)}else{R&&st&&e.texStorage2D(n.TEXTURE_2D,pt,_t,kt[0].width,kt[0].height);for(let K=0,W=kt.length;K<W;K++)ht=kt[K],v.format!==ln?tt!==null?R?et&&e.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,ht.width,ht.height,tt,ht.data):e.compressedTexImage2D(n.TEXTURE_2D,K,_t,ht.width,ht.height,0,ht.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?et&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,ht.width,ht.height,tt,gt,ht.data):e.texImage2D(n.TEXTURE_2D,K,_t,ht.width,ht.height,0,tt,gt,ht.data)}else if(v.isDataArrayTexture)if(R){if(st&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,_t,j.width,j.height,j.depth),et)if(v.layerUpdates.size>0){let K=qc(j.width,j.height,v.format,v.type);for(let W of v.layerUpdates){let vt=j.data.subarray(W*K/j.data.BYTES_PER_ELEMENT,(W+1)*K/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,W,j.width,j.height,1,tt,gt,vt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,tt,gt,j.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,_t,j.width,j.height,j.depth,0,tt,gt,j.data);else if(v.isData3DTexture)R?(st&&e.texStorage3D(n.TEXTURE_3D,pt,_t,j.width,j.height,j.depth),et&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,tt,gt,j.data)):e.texImage3D(n.TEXTURE_3D,0,_t,j.width,j.height,j.depth,0,tt,gt,j.data);else if(v.isFramebufferTexture){if(st)if(R)e.texStorage2D(n.TEXTURE_2D,pt,_t,j.width,j.height);else{let K=j.width,W=j.height;for(let vt=0;vt<pt;vt++)e.texImage2D(n.TEXTURE_2D,vt,_t,K,W,0,tt,gt,null),K>>=1,W>>=1}}else if(kt.length>0){if(R&&st){let K=bt(kt[0]);e.texStorage2D(n.TEXTURE_2D,pt,_t,K.width,K.height)}for(let K=0,W=kt.length;K<W;K++)ht=kt[K],R?et&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,tt,gt,ht):e.texImage2D(n.TEXTURE_2D,K,_t,tt,gt,ht);v.generateMipmaps=!1}else if(R){if(st){let K=bt(j);e.texStorage2D(n.TEXTURE_2D,pt,_t,K.width,K.height)}et&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,tt,gt,j)}else e.texImage2D(n.TEXTURE_2D,0,_t,tt,gt,j);m(v)&&p(Y),mt.__version=X.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function nt(M,v,D){if(v.image.length!==6)return;let Y=Ut(M,v),Z=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+D);let X=i.get(Z);if(Z.version!==X.__version||Y===!0){e.activeTexture(n.TEXTURE0+D);let mt=Gt.getPrimaries(Gt.workingColorSpace),it=v.colorSpace===Jn?null:Gt.getPrimaries(v.colorSpace),St=v.colorSpace===Jn||mt===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let Ct=v.isCompressedTexture||v.image[0].isCompressedTexture,j=v.image[0]&&v.image[0].isDataTexture,tt=[];for(let W=0;W<6;W++)!Ct&&!j?tt[W]=b(v.image[W],!0,s.maxCubemapSize):tt[W]=j?v.image[W].image:v.image[W],tt[W]=se(v,tt[W]);let gt=tt[0],_t=r.convert(v.format,v.colorSpace),ht=r.convert(v.type),kt=E(v.internalFormat,_t,ht,v.colorSpace),R=v.isVideoTexture!==!0,st=X.__version===void 0||Y===!0,et=Z.dataReady,pt=C(v,gt);ut(n.TEXTURE_CUBE_MAP,v);let K;if(Ct){R&&st&&e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,kt,gt.width,gt.height);for(let W=0;W<6;W++){K=tt[W].mipmaps;for(let vt=0;vt<K.length;vt++){let It=K[vt];v.format!==ln?_t!==null?R?et&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,0,0,It.width,It.height,_t,It.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,kt,It.width,It.height,0,It.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,0,0,It.width,It.height,_t,ht,It.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt,kt,It.width,It.height,0,_t,ht,It.data)}}}else{if(K=v.mipmaps,R&&st){K.length>0&&pt++;let W=bt(tt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,kt,W.width,W.height)}for(let W=0;W<6;W++)if(j){R?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,tt[W].width,tt[W].height,_t,ht,tt[W].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,kt,tt[W].width,tt[W].height,0,_t,ht,tt[W].data);for(let vt=0;vt<K.length;vt++){let re=K[vt].image[W].image;R?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,0,0,re.width,re.height,_t,ht,re.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,kt,re.width,re.height,0,_t,ht,re.data)}}else{R?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,_t,ht,tt[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,kt,_t,ht,tt[W]);for(let vt=0;vt<K.length;vt++){let It=K[vt];R?et&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,0,0,_t,ht,It.image[W]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,vt+1,kt,_t,ht,It.image[W])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),X.__version=Z.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function rt(M,v,D,Y,Z,X){let mt=r.convert(D.format,D.colorSpace),it=r.convert(D.type),St=E(D.internalFormat,mt,it,D.colorSpace),Ct=i.get(v),j=i.get(D);if(j.__renderTarget=v,!Ct.__hasExternalTextures){let tt=Math.max(1,v.width>>X),gt=Math.max(1,v.height>>X);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,X,St,tt,gt,v.depth,0,mt,it,null):e.texImage2D(Z,X,St,tt,gt,0,mt,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,M),xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,Z,j.__webglTexture,0,P(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,Z,j.__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Nt(M,v,D){if(n.bindRenderbuffer(n.RENDERBUFFER,M),v.depthBuffer){let Y=v.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,X=S(v.stencilBuffer,Z),mt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(v),X,v.width,v.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(v),X,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,X,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,mt,n.RENDERBUFFER,M)}else{let Y=v.textures;for(let Z=0;Z<Y.length;Z++){let X=Y[Z],mt=r.convert(X.format,X.colorSpace),it=r.convert(X.type),St=E(X.internalFormat,mt,it,X.colorSpace);xe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(v),St,v.width,v.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(v),St,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,St,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(M,v,D){let Y=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,M),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ut(n.TEXTURE_CUBE_MAP,v.depthTexture);let Ct=r.convert(v.depthTexture.format),j=r.convert(v.depthTexture.type),tt;v.depthTexture.format===Tn?tt=n.DEPTH_COMPONENT24:v.depthTexture.format===Si&&(tt=n.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,tt,v.width,v.height,0,Ct,j,null)}}else z(v.depthTexture,0);let X=Z.__webglTexture,mt=P(v),it=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,St=v.depthTexture.format===Si?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Tn)xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,St,it,X,0,mt):n.framebufferTexture2D(n.FRAMEBUFFER,St,it,X,0);else if(v.depthTexture.format===Si)xe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,St,it,X,0,mt):n.framebufferTexture2D(n.FRAMEBUFFER,St,it,X,0);else throw new Error("Unknown depthTexture format")}function Pt(M){let v=i.get(M),D=M.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==M.depthTexture){let Y=M.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){let Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=Y}if(M.depthTexture&&!v.__autoAllocateDepthBuffer)if(D)for(let Y=0;Y<6;Y++)Et(v.__webglFramebuffer[Y],M,Y);else{let Y=M.texture.mipmaps;Y&&Y.length>0?Et(v.__webglFramebuffer[0],M,0):Et(v.__webglFramebuffer,M,0)}else if(D){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=n.createRenderbuffer(),Nt(v.__webglDepthbuffer[Y],M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,X)}}else{let Y=M.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Nt(v.__webglDepthbuffer,M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,X)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(M,v,D){let Y=i.get(M);v!==void 0&&rt(Y.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Pt(M)}function Xt(M){let v=M.texture,D=i.get(M),Y=i.get(v);M.addEventListener("dispose",I);let Z=M.textures,X=M.isWebGLCubeRenderTarget===!0,mt=Z.length>1;if(mt||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=v.version,a.memory.textures++),X){D.__webglFramebuffer=[];for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0){D.__webglFramebuffer[it]=[];for(let St=0;St<v.mipmaps.length;St++)D.__webglFramebuffer[it][St]=n.createFramebuffer()}else D.__webglFramebuffer[it]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){D.__webglFramebuffer=[];for(let it=0;it<v.mipmaps.length;it++)D.__webglFramebuffer[it]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(mt)for(let it=0,St=Z.length;it<St;it++){let Ct=i.get(Z[it]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=n.createTexture(),a.memory.textures++)}if(M.samples>0&&xe(M)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){let St=Z[it];D.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[it]);let Ct=r.convert(St.format,St.colorSpace),j=r.convert(St.type),tt=E(St.internalFormat,Ct,j,St.colorSpace,M.isXRRenderTarget===!0),gt=P(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,tt,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,D.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Nt(D.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ut(n.TEXTURE_CUBE_MAP,v);for(let it=0;it<6;it++)if(v.mipmaps&&v.mipmaps.length>0)for(let St=0;St<v.mipmaps.length;St++)rt(D.__webglFramebuffer[it][St],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St);else rt(D.__webglFramebuffer[it],M,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(v)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let it=0,St=Z.length;it<St;it++){let Ct=Z[it],j=i.get(Ct),tt=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(tt=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(tt,j.__webglTexture),ut(tt,Ct),rt(D.__webglFramebuffer,M,Ct,n.COLOR_ATTACHMENT0+it,tt,0),m(Ct)&&p(tt)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(it=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),ut(it,v),v.mipmaps&&v.mipmaps.length>0)for(let St=0;St<v.mipmaps.length;St++)rt(D.__webglFramebuffer[St],M,v,n.COLOR_ATTACHMENT0,it,St);else rt(D.__webglFramebuffer,M,v,n.COLOR_ATTACHMENT0,it,0);m(v)&&p(it),e.unbindTexture()}M.depthBuffer&&Pt(M)}function Kt(M){let v=M.textures;for(let D=0,Y=v.length;D<Y;D++){let Z=v[D];if(m(Z)){let X=y(M),mt=i.get(Z).__webglTexture;e.bindTexture(X,mt),p(X),e.unbindTexture()}}}let ne=[],Bt=[];function ge(M){if(M.samples>0){if(xe(M)===!1){let v=M.textures,D=M.width,Y=M.height,Z=n.COLOR_BUFFER_BIT,X=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=i.get(M),it=v.length>1;if(it)for(let Ct=0;Ct<v.length;Ct++)e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ct,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ct,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer);let St=M.texture.mipmaps;St&&St.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let Ct=0;Ct<v.length;Ct++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,mt.__webglColorRenderbuffer[Ct]);let j=i.get(v[Ct]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,j,0)}n.blitFramebuffer(0,0,D,Y,0,0,D,Y,Z,n.NEAREST),l===!0&&(ne.length=0,Bt.length=0,ne.push(n.COLOR_ATTACHMENT0+Ct),M.depthBuffer&&M.resolveDepthBuffer===!1&&(ne.push(X),Bt.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let Ct=0;Ct<v.length;Ct++){e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ct,n.RENDERBUFFER,mt.__webglColorRenderbuffer[Ct]);let j=i.get(v[Ct]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ct,n.TEXTURE_2D,j,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){let v=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function P(M){return Math.min(s.maxSamples,M.samples)}function xe(M){let v=i.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Zt(M){let v=a.render.frame;h.get(M)!==v&&(h.set(M,v),M.update())}function se(M,v){let D=M.colorSpace,Y=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||D!==Hi&&D!==Jn&&(Gt.getTransfer(D)===Jt?(Y!==ln||Z!==en)&&Tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):At("WebGLTextures: Unsupported texture color space:",D)),v}function bt(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.setTexture2D=z,this.setTexture2DArray=B,this.setTexture3D=O,this.setTextureCube=Q,this.rebindTextures=Ee,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ab(n,t){function e(i,s=Jn){let r,a=Gt.getTransfer(s);if(i===en)return n.UNSIGNED_BYTE;if(i===go)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Lc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ic)return n.BYTE;if(i===Dc)return n.SHORT;if(i===Us)return n.UNSIGNED_SHORT;if(i===mo)return n.INT;if(i===xn)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===Pn)return n.HALF_FLOAT;if(i===Nc)return n.ALPHA;if(i===Uc)return n.RGB;if(i===ln)return n.RGBA;if(i===Tn)return n.DEPTH_COMPONENT;if(i===Si)return n.DEPTH_STENCIL;if(i===Oc)return n.RED;if(i===_o)return n.RED_INTEGER;if(i===qi)return n.RG;if(i===xo)return n.RG_INTEGER;if(i===bo)return n.RGBA_INTEGER;if(i===Tr||i===Cr||i===Ar||i===Pr)if(a===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===yo||i===wo||i===Mo||i===So)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Eo||i===To||i===Co||i===Ao||i===Po||i===Ro||i===Io)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Eo||i===To)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Co)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ao)return r.COMPRESSED_R11_EAC;if(i===Po)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ro)return r.COMPRESSED_RG11_EAC;if(i===Io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Do||i===Lo||i===Fo||i===No||i===Uo||i===Oo||i===Bo||i===ko||i===Vo||i===zo||i===Ho||i===Go||i===Wo||i===Xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Do)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Lo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===No)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Uo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ko)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ho)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Go)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xo)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qo||i===Yo||i===$o)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===qo)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$o)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zo||i===Jo||i===jo||i===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Os?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var ob=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ah=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new mr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ze({vertexShader:ob,fragmentShader:lb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new Zn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oh=class extends Yn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,b=typeof XRWebGLBinding<"u",m=new ah,p={},y=e.getContextAttributes(),E=null,S=null,C=[],T=[],I=new Wt,_=null,w=new Oe;w.viewport=new fe;let q=new Oe;q.viewport=new fe;let A=[w,q],k=new ho,V=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=C[$];return nt===void 0&&(nt=new Is,C[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=C[$];return nt===void 0&&(nt=new Is,C[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=C[$];return nt===void 0&&(nt=new Is,C[$]=nt),nt.getHandSpace()};function z($){let nt=T.indexOf($.inputSource);if(nt===-1)return;let rt=C[nt];rt!==void 0&&(rt.update($.inputSource,$.frame,c||a),rt.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",O);for(let $=0;$<C.length;$++){let nt=T[$];nt!==null&&(T[$]=null,C[$].disconnect(nt))}V=null,G=null,m.reset();for(let $ in p)delete p[$];t.setRenderTarget(E),f=null,u=null,d=null,s=null,S=null,oe.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&b&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",B),s.addEventListener("inputsourceschange",O),y.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(I),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Nt=null,Et=null;y.depth&&(Et=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=y.stencil?Si:Tn,Nt=y.stencil?Os:xn);let Pt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Pt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Ke(u.textureWidth,u.textureHeight,{format:ln,type:en,depthTexture:new _i(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let rt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ke(f.framebufferWidth,f.framebufferHeight,{format:ln,type:en,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O($){for(let nt=0;nt<$.removed.length;nt++){let rt=$.removed[nt],Nt=T.indexOf(rt);Nt>=0&&(T[Nt]=null,C[Nt].disconnect(rt))}for(let nt=0;nt<$.added.length;nt++){let rt=$.added[nt],Nt=T.indexOf(rt);if(Nt===-1){for(let Pt=0;Pt<C.length;Pt++)if(Pt>=T.length){T.push(rt),Nt=Pt;break}else if(T[Pt]===null){T[Pt]=rt,Nt=Pt;break}if(Nt===-1)break}let Et=C[Nt];Et&&Et.connect(rt)}}let Q=new F,J=new F;function ct($,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),J.setFromMatrixPosition(rt.matrixWorld);let Nt=Q.distanceTo(J),Et=nt.projectionMatrix.elements,Pt=rt.projectionMatrix.elements,Ee=Et[14]/(Et[10]-1),Xt=Et[14]/(Et[10]+1),Kt=(Et[9]+1)/Et[5],ne=(Et[9]-1)/Et[5],Bt=(Et[8]-1)/Et[0],ge=(Pt[8]+1)/Pt[0],P=Ee*Bt,xe=Ee*ge,Zt=Nt/(-Bt+ge),se=Zt*-Bt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(se),$.translateZ(Zt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Et[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let bt=Ee+Zt,M=Xt+Zt,v=P-se,D=xe+(Nt-se),Y=Kt*Xt/M*bt,Z=ne*Xt/M*bt;$.projectionMatrix.makePerspective(v,D,Y,Z,bt,M),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ft($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let nt=$.near,rt=$.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),k.near=q.near=w.near=nt,k.far=q.far=w.far=rt,(V!==k.near||G!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),V=k.near,G=k.far),k.layers.mask=$.layers.mask|6,w.layers.mask=k.layers.mask&-5,q.layers.mask=k.layers.mask&-3;let Nt=$.parent,Et=k.cameras;ft(k,Nt);for(let Pt=0;Pt<Et.length;Pt++)ft(Et[Pt],Nt);Et.length===2?ct(k,w,q):k.projectionMatrix.copy(w.projectionMatrix),ut($,k,Nt)};function ut($,nt,rt){rt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ps*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function($){return p[$]};let Ut=null;function ce($,nt){if(h=nt.getViewerPose(c||a),g=nt,h!==null){let rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Nt=!1;rt.length!==k.cameras.length&&(k.cameras.length=0,Nt=!0);for(let Xt=0;Xt<rt.length;Xt++){let Kt=rt[Xt],ne=null;if(f!==null)ne=f.getViewport(Kt);else{let ge=d.getViewSubImage(u,Kt);ne=ge.viewport,Xt===0&&(t.setRenderTargetTextures(S,ge.colorTexture,ge.depthStencilTexture),t.setRenderTarget(S))}let Bt=A[Xt];Bt===void 0&&(Bt=new Oe,Bt.layers.enable(Xt),Bt.viewport=new fe,A[Xt]=Bt),Bt.matrix.fromArray(Kt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Kt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(ne.x,ne.y,ne.width,ne.height),Xt===0&&(k.matrix.copy(Bt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Nt===!0&&k.cameras.push(Bt)}let Et=s.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){d=i.getBinding();let Xt=d.getDepthInformation(rt[0]);Xt&&Xt.isValid&&Xt.texture&&m.init(Xt,s.renderState)}if(Et&&Et.includes("camera-access")&&b){t.state.unbindTexture(),d=i.getBinding();for(let Xt=0;Xt<rt.length;Xt++){let Kt=rt[Xt].camera;if(Kt){let ne=p[Kt];ne||(ne=new mr,p[Kt]=ne);let Bt=d.getCameraImage(Kt);ne.sourceTexture=Bt}}}}for(let rt=0;rt<C.length;rt++){let Nt=T[rt],Et=C[rt];Nt!==null&&Et!==void 0&&Et.update(Nt,nt,c||a)}Ut&&Ut($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}let oe=new Wp;oe.setAnimationLoop(ce),this.setAnimationLoop=function($){Ut=$},this.dispose=function(){}}},Zi=new vn,cb=new _e;function hb(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Gc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,E,S){p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),b(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===He&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===He&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),E=y.envMap,S=y.envMapRotation;E&&(m.envMap.value=E,Zi.copy(S),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),m.envMapRotation.value.setFromMatrix4(cb.makeRotationFromEuler(Zi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function b(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ub(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){let S=E.program;i.uniformBlockBinding(y,S)}function c(y,E){let S=s[y.id];S===void 0&&(g(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",m));let C=E.program;i.updateUBOMapping(y,C);let T=t.render.frame;r[y.id]!==T&&(u(y),r[y.id]=T)}function h(y){let E=d();y.__bindingPointIndex=E;let S=n.createBuffer(),C=y.__size,T=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return At("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let E=s[y.id],S=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let T=0,I=S.length;T<I;T++){let _=Array.isArray(S[T])?S[T]:[S[T]];for(let w=0,q=_.length;w<q;w++){let A=_[w];if(f(A,T,w,C)===!0){let k=A.__offset,V=Array.isArray(A.value)?A.value:[A.value],G=0;for(let z=0;z<V.length;z++){let B=V[z],O=b(B);typeof B=="number"||typeof B=="boolean"?(A.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,k+G,A.__data)):B.isMatrix3?(A.__data[0]=B.elements[0],A.__data[1]=B.elements[1],A.__data[2]=B.elements[2],A.__data[3]=0,A.__data[4]=B.elements[3],A.__data[5]=B.elements[4],A.__data[6]=B.elements[5],A.__data[7]=0,A.__data[8]=B.elements[6],A.__data[9]=B.elements[7],A.__data[10]=B.elements[8],A.__data[11]=0):(B.toArray(A.__data,G),G+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,E,S,C){let T=y.value,I=E+"_"+S;if(C[I]===void 0)return typeof T=="number"||typeof T=="boolean"?C[I]=T:C[I]=T.clone(),!0;{let _=C[I];if(typeof T=="number"||typeof T=="boolean"){if(_!==T)return C[I]=T,!0}else if(_.equals(T)===!1)return _.copy(T),!0}return!1}function g(y){let E=y.uniforms,S=0,C=16;for(let I=0,_=E.length;I<_;I++){let w=Array.isArray(E[I])?E[I]:[E[I]];for(let q=0,A=w.length;q<A;q++){let k=w[q],V=Array.isArray(k.value)?k.value:[k.value];for(let G=0,z=V.length;G<z;G++){let B=V[G],O=b(B),Q=S%C,J=Q%O.boundary,ct=Q+J;S+=J,ct!==0&&C-ct<O.storage&&(S+=C-ct),k.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=O.storage}}}let T=S%C;return T>0&&(S+=C-T),y.__size=S,y.__cache={},this}function b(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Tt("WebGLRenderer: Unsupported uniform value type.",y),E}function m(y){let E=y.target;E.removeEventListener("dispose",m);let S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var db=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Rn=null;function pb(){return Rn===null&&(Rn=new Ya(db,16,16,qi,Pn),Rn.name="DFG_LUT",Rn.minFilter=De,Rn.magFilter=De,Rn.wrapS=En,Rn.wrapT=En,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}var rl=class{constructor(t={}){let{canvas:e=mp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=en}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let b=f,m=new Set([bo,xo,_o]),p=new Set([en,xn,Us,Os,go,vo]),y=new Uint32Array(4),E=new Int32Array(4),S=null,C=null,T=[],I=[],_=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,q=!1;this._outputColorSpace=Ue;let A=0,k=0,V=null,G=-1,z=null,B=new fe,O=new fe,Q=null,J=new Rt(0),ct=0,ft=e.width,ut=e.height,Ut=1,ce=null,oe=null,$=new fe(0,0,ft,ut),nt=new fe(0,0,ft,ut),rt=!1,Nt=new pr,Et=!1,Pt=!1,Ee=new _e,Xt=new F,Kt=new fe,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Bt=!1;function ge(){return V===null?Ut:1}let P=i;function xe(x,L){return e.getContext(x,L)}try{let x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"183"}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",It,!1),e.addEventListener("webglcontextcreationerror",re,!1),P===null){let L="webgl2";if(P=xe(L,x),P===null)throw xe(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw At("WebGLRenderer: "+x.message),x}let Zt,se,bt,M,v,D,Y,Z,X,mt,it,St,Ct,j,tt,gt,_t,ht,kt,R,st,et,pt;function K(){Zt=new y0(P),Zt.init(),st=new ab(P,Zt),se=new p0(P,Zt,t,st),bt=new sb(P,Zt),se.reversedDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),M=new S0(P),v=new Wx,D=new rb(P,Zt,bt,v,se,st,M),Y=new b0(w),Z=new Pg(P),et=new u0(P,Z),X=new w0(P,Z,M,et),mt=new T0(P,X,Z,et,M),ht=new E0(P,se,D),tt=new f0(v),it=new Gx(w,Y,Zt,se,et,tt),St=new hb(w,v),Ct=new qx,j=new Kx(Zt),_t=new h0(w,Y,bt,mt,g,l),gt=new ib(w,mt,se),pt=new ub(P,M,se,bt),kt=new d0(P,Zt,M),R=new M0(P,Zt,M),M.programs=it.programs,w.capabilities=se,w.extensions=Zt,w.properties=v,w.renderLists=Ct,w.shadowMap=gt,w.state=bt,w.info=M}K(),b!==en&&(_=new A0(b,e.width,e.height,s,r));let W=new oh(w,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let x=Zt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Zt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ut},this.setPixelRatio=function(x){x!==void 0&&(Ut=x,this.setSize(ft,ut,!1))},this.getSize=function(x){return x.set(ft,ut)},this.setSize=function(x,L,H=!0){if(W.isPresenting){Tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ft=x,ut=L,e.width=Math.floor(x*Ut),e.height=Math.floor(L*Ut),H===!0&&(e.style.width=x+"px",e.style.height=L+"px"),_!==null&&_.setSize(e.width,e.height),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(ft*Ut,ut*Ut).floor()},this.setDrawingBufferSize=function(x,L,H){ft=x,ut=L,Ut=H,e.width=Math.floor(x*H),e.height=Math.floor(L*H),this.setViewport(0,0,x,L)},this.setEffects=function(x){if(b===en){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let L=0;L<x.length;L++)if(x[L].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(B)},this.getViewport=function(x){return x.copy($)},this.setViewport=function(x,L,H,U){x.isVector4?$.set(x.x,x.y,x.z,x.w):$.set(x,L,H,U),bt.viewport(B.copy($).multiplyScalar(Ut).round())},this.getScissor=function(x){return x.copy(nt)},this.setScissor=function(x,L,H,U){x.isVector4?nt.set(x.x,x.y,x.z,x.w):nt.set(x,L,H,U),bt.scissor(O.copy(nt).multiplyScalar(Ut).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(x){bt.setScissorTest(rt=x)},this.setOpaqueSort=function(x){ce=x},this.setTransparentSort=function(x){oe=x},this.getClearColor=function(x){return x.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,H=!0){let U=0;if(x){let N=!1;if(V!==null){let ot=V.texture.format;N=m.has(ot)}if(N){let ot=V.texture.type,dt=p.has(ot),lt=_t.getClearColor(),xt=_t.getClearAlpha(),wt=lt.r,Lt=lt.g,Vt=lt.b;dt?(y[0]=wt,y[1]=Lt,y[2]=Vt,y[3]=xt,P.clearBufferuiv(P.COLOR,0,y)):(E[0]=wt,E[1]=Lt,E[2]=Vt,E[3]=xt,P.clearBufferiv(P.COLOR,0,E))}else U|=P.COLOR_BUFFER_BIT}L&&(U|=P.DEPTH_BUFFER_BIT),H&&(U|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U!==0&&P.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",It,!1),e.removeEventListener("webglcontextcreationerror",re,!1),_t.dispose(),Ct.dispose(),j.dispose(),v.dispose(),Y.dispose(),mt.dispose(),et.dispose(),pt.dispose(),it.dispose(),W.dispose(),W.removeEventListener("sessionstart",rd),W.removeEventListener("sessionend",ad),Li.stop()};function vt(x){x.preventDefault(),Vc("WebGLRenderer: Context Lost."),q=!0}function It(){Vc("WebGLRenderer: Context Restored."),q=!1;let x=M.autoReset,L=gt.enabled,H=gt.autoUpdate,U=gt.needsUpdate,N=gt.type;K(),M.autoReset=x,gt.enabled=L,gt.autoUpdate=H,gt.needsUpdate=U,gt.type=N}function re(x){At("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Qt(x){let L=x.target;L.removeEventListener("dispose",Qt),On(L)}function On(x){Bn(x),v.remove(x)}function Bn(x){let L=v.get(x).programs;L!==void 0&&(L.forEach(function(H){it.releaseProgram(H)}),x.isShaderMaterial&&it.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,H,U,N,ot){L===null&&(L=ne);let dt=N.isMesh&&N.matrixWorld.determinant()<0,lt=Tm(x,L,H,U,N);bt.setMaterial(U,dt);let xt=H.index,wt=1;if(U.wireframe===!0){if(xt=X.getWireframeAttribute(H),xt===void 0)return;wt=2}let Lt=H.drawRange,Vt=H.attributes.position,Mt=Lt.start*wt,te=(Lt.start+Lt.count)*wt;ot!==null&&(Mt=Math.max(Mt,ot.start*wt),te=Math.min(te,(ot.start+ot.count)*wt)),xt!==null?(Mt=Math.max(Mt,0),te=Math.min(te,xt.count)):Vt!=null&&(Mt=Math.max(Mt,0),te=Math.min(te,Vt.count));let ve=te-Mt;if(ve<0||ve===1/0)return;et.setup(N,U,lt,H,xt);let de,ee=kt;if(xt!==null&&(de=Z.get(xt),ee=R,ee.setIndex(de)),N.isMesh)U.wireframe===!0?(bt.setLineWidth(U.wireframeLinewidth*ge()),ee.setMode(P.LINES)):ee.setMode(P.TRIANGLES);else if(N.isLine){let Le=U.linewidth;Le===void 0&&(Le=1),bt.setLineWidth(Le*ge()),N.isLineSegments?ee.setMode(P.LINES):N.isLineLoop?ee.setMode(P.LINE_LOOP):ee.setMode(P.LINE_STRIP)}else N.isPoints?ee.setMode(P.POINTS):N.isSprite&&ee.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)lr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ee.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))ee.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Le=N._multiDrawStarts,yt=N._multiDrawCounts,$e=N._multiDrawCount,Yt=xt?Z.get(xt).bytesPerElement:1,un=v.get(U).currentProgram.getUniforms();for(let yn=0;yn<$e;yn++)un.setValue(P,"_gl_DrawID",yn),ee.render(Le[yn]/Yt,yt[yn])}else if(N.isInstancedMesh)ee.renderInstances(Mt,ve,N.count);else if(H.isInstancedBufferGeometry){let Le=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,yt=Math.min(H.instanceCount,Le);ee.renderInstances(Mt,ve,yt)}else ee.render(Mt,ve)};function sd(x,L,H){x.transparent===!0&&x.side===on&&x.forceSinglePass===!1?(x.side=He,x.needsUpdate=!0,aa(x,L,H),x.side=Xn,x.needsUpdate=!0,aa(x,L,H),x.side=on):aa(x,L,H)}this.compile=function(x,L,H=null){H===null&&(H=x),C=j.get(H),C.init(L),I.push(C),H.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(C.pushLight(N),N.castShadow&&C.pushShadow(N))}),x!==H&&x.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(C.pushLight(N),N.castShadow&&C.pushShadow(N))}),C.setupLights();let U=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let ot=N.material;if(ot)if(Array.isArray(ot))for(let dt=0;dt<ot.length;dt++){let lt=ot[dt];sd(lt,H,N),U.add(lt)}else sd(ot,H,N),U.add(ot)}),C=I.pop(),U},this.compileAsync=function(x,L,H=null){let U=this.compile(x,L,H);return new Promise(N=>{function ot(){if(U.forEach(function(dt){v.get(dt).currentProgram.isReady()&&U.delete(dt)}),U.size===0){N(x);return}setTimeout(ot,10)}Zt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Ol=null;function Em(x){Ol&&Ol(x)}function rd(){Li.stop()}function ad(){Li.start()}let Li=new Wp;Li.setAnimationLoop(Em),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(x){Ol=x,W.setAnimationLoop(x),x===null?Li.stop():Li.start()},W.addEventListener("sessionstart",rd),W.addEventListener("sessionend",ad),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){At("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;let H=W.enabled===!0&&W.isPresenting===!0,U=_!==null&&(V===null||H)&&_.begin(w,V);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(L),L=W.getCamera()),x.isScene===!0&&x.onBeforeRender(w,x,L,V),C=j.get(x,I.length),C.init(L),I.push(C),Ee.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Nt.setFromProjectionMatrix(Ee,mn,L.reversedDepth),Pt=this.localClippingEnabled,Et=tt.init(this.clippingPlanes,Pt),S=Ct.get(x,T.length),S.init(),T.push(S),W.enabled===!0&&W.isPresenting===!0){let dt=w.xr.getDepthSensingMesh();dt!==null&&Bl(dt,L,-1/0,w.sortObjects)}Bl(x,L,0,w.sortObjects),S.finish(),w.sortObjects===!0&&S.sort(ce,oe),Bt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Bt&&_t.addToRenderList(S,x),this.info.render.frame++,Et===!0&&tt.beginShadows();let N=C.state.shadowsArray;if(gt.render(N,x,L),Et===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(U&&_.hasRenderPass())===!1){let dt=S.opaque,lt=S.transmissive;if(C.setupLights(),L.isArrayCamera){let xt=L.cameras;if(lt.length>0)for(let wt=0,Lt=xt.length;wt<Lt;wt++){let Vt=xt[wt];ld(dt,lt,x,Vt)}Bt&&_t.render(x);for(let wt=0,Lt=xt.length;wt<Lt;wt++){let Vt=xt[wt];od(S,x,Vt,Vt.viewport)}}else lt.length>0&&ld(dt,lt,x,L),Bt&&_t.render(x),od(S,x,L)}V!==null&&k===0&&(D.updateMultisampleRenderTarget(V),D.updateRenderTargetMipmap(V)),U&&_.end(w),x.isScene===!0&&x.onAfterRender(w,x,L),et.resetDefaultState(),G=-1,z=null,I.pop(),I.length>0?(C=I[I.length-1],Et===!0&&tt.setGlobalState(w.clippingPlanes,C.state.camera)):C=null,T.pop(),T.length>0?S=T[T.length-1]:S=null};function Bl(x,L,H,U){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)H=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)C.pushLight(x),x.castShadow&&C.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Nt.intersectsSprite(x)){U&&Kt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ee);let dt=mt.update(x),lt=x.material;lt.visible&&S.push(x,dt,lt,H,Kt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Nt.intersectsObject(x))){let dt=mt.update(x),lt=x.material;if(U&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Kt.copy(x.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Kt.copy(dt.boundingSphere.center)),Kt.applyMatrix4(x.matrixWorld).applyMatrix4(Ee)),Array.isArray(lt)){let xt=dt.groups;for(let wt=0,Lt=xt.length;wt<Lt;wt++){let Vt=xt[wt],Mt=lt[Vt.materialIndex];Mt&&Mt.visible&&S.push(x,dt,Mt,H,Kt.z,Vt)}}else lt.visible&&S.push(x,dt,lt,H,Kt.z,null)}}let ot=x.children;for(let dt=0,lt=ot.length;dt<lt;dt++)Bl(ot[dt],L,H,U)}function od(x,L,H,U){let{opaque:N,transmissive:ot,transparent:dt}=x;C.setupLightsView(H),Et===!0&&tt.setGlobalState(w.clippingPlanes,H),U&&bt.viewport(B.copy(U)),N.length>0&&ra(N,L,H),ot.length>0&&ra(ot,L,H),dt.length>0&&ra(dt,L,H),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function ld(x,L,H,U){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[U.id]===void 0){let Mt=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[U.id]=new Ke(1,1,{generateMipmaps:!0,type:Mt?Pn:en,minFilter:Mi,samples:se.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}let ot=C.state.transmissionRenderTarget[U.id],dt=U.viewport||B;ot.setSize(dt.z*w.transmissionResolutionScale,dt.w*w.transmissionResolutionScale);let lt=w.getRenderTarget(),xt=w.getActiveCubeFace(),wt=w.getActiveMipmapLevel();w.setRenderTarget(ot),w.getClearColor(J),ct=w.getClearAlpha(),ct<1&&w.setClearColor(16777215,.5),w.clear(),Bt&&_t.render(H);let Lt=w.toneMapping;w.toneMapping=_n;let Vt=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),C.setupLightsView(U),Et===!0&&tt.setGlobalState(w.clippingPlanes,U),ra(x,H,U),D.updateMultisampleRenderTarget(ot),D.updateRenderTargetMipmap(ot),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let te=0,ve=L.length;te<ve;te++){let de=L[te],{object:ee,geometry:Le,material:yt,group:$e}=de;if(yt.side===on&&ee.layers.test(U.layers)){let Yt=yt.side;yt.side=He,yt.needsUpdate=!0,cd(ee,H,U,Le,yt,$e),yt.side=Yt,yt.needsUpdate=!0,Mt=!0}}Mt===!0&&(D.updateMultisampleRenderTarget(ot),D.updateRenderTargetMipmap(ot))}w.setRenderTarget(lt,xt,wt),w.setClearColor(J,ct),Vt!==void 0&&(U.viewport=Vt),w.toneMapping=Lt}function ra(x,L,H){let U=L.isScene===!0?L.overrideMaterial:null;for(let N=0,ot=x.length;N<ot;N++){let dt=x[N],{object:lt,geometry:xt,group:wt}=dt,Lt=dt.material;Lt.allowOverride===!0&&U!==null&&(Lt=U),lt.layers.test(H.layers)&&cd(lt,L,H,xt,Lt,wt)}}function cd(x,L,H,U,N,ot){x.onBeforeRender(w,L,H,U,N,ot),x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(w,L,H,U,x,ot),N.transparent===!0&&N.side===on&&N.forceSinglePass===!1?(N.side=He,N.needsUpdate=!0,w.renderBufferDirect(H,L,U,N,x,ot),N.side=Xn,N.needsUpdate=!0,w.renderBufferDirect(H,L,U,N,x,ot),N.side=on):w.renderBufferDirect(H,L,U,N,x,ot),x.onAfterRender(w,L,H,U,N,ot)}function aa(x,L,H){L.isScene!==!0&&(L=ne);let U=v.get(x),N=C.state.lights,ot=C.state.shadowsArray,dt=N.state.version,lt=it.getParameters(x,N.state,ot,L,H),xt=it.getProgramCacheKey(lt),wt=U.programs;U.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,U.fog=L.fog;let Lt=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;U.envMap=Y.get(x.envMap||U.environment,Lt),U.envMapRotation=U.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,wt===void 0&&(x.addEventListener("dispose",Qt),wt=new Map,U.programs=wt);let Vt=wt.get(xt);if(Vt!==void 0){if(U.currentProgram===Vt&&U.lightsStateVersion===dt)return ud(x,lt),Vt}else lt.uniforms=it.getUniforms(x),x.onBeforeCompile(lt,w),Vt=it.acquireProgram(lt,xt),wt.set(xt,Vt),U.uniforms=lt.uniforms;let Mt=U.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Mt.clippingPlanes=tt.uniform),ud(x,lt),U.needsLights=Am(x),U.lightsStateVersion=dt,U.needsLights&&(Mt.ambientLightColor.value=N.state.ambient,Mt.lightProbe.value=N.state.probe,Mt.directionalLights.value=N.state.directional,Mt.directionalLightShadows.value=N.state.directionalShadow,Mt.spotLights.value=N.state.spot,Mt.spotLightShadows.value=N.state.spotShadow,Mt.rectAreaLights.value=N.state.rectArea,Mt.ltc_1.value=N.state.rectAreaLTC1,Mt.ltc_2.value=N.state.rectAreaLTC2,Mt.pointLights.value=N.state.point,Mt.pointLightShadows.value=N.state.pointShadow,Mt.hemisphereLights.value=N.state.hemi,Mt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Mt.spotLightMatrix.value=N.state.spotLightMatrix,Mt.spotLightMap.value=N.state.spotLightMap,Mt.pointShadowMatrix.value=N.state.pointShadowMatrix),U.currentProgram=Vt,U.uniformsList=null,Vt}function hd(x){if(x.uniformsList===null){let L=x.currentProgram.getUniforms();x.uniformsList=Vs.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function ud(x,L){let H=v.get(x);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function Tm(x,L,H,U,N){L.isScene!==!0&&(L=ne),D.resetTextureUnits();let ot=L.fog,dt=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?L.environment:null,lt=V===null?w.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Hi,xt=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap,wt=Y.get(U.envMap||dt,xt),Lt=U.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Vt=!!H.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Mt=!!H.morphAttributes.position,te=!!H.morphAttributes.normal,ve=!!H.morphAttributes.color,de=_n;U.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(de=w.toneMapping);let ee=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Le=ee!==void 0?ee.length:0,yt=v.get(U),$e=C.state.lights;if(Et===!0&&(Pt===!0||x!==z)){let Te=x===z&&U.id===G;tt.setState(U,x,Te)}let Yt=!1;U.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==$e.state.version||yt.outputColorSpace!==lt||N.isBatchedMesh&&yt.batching===!1||!N.isBatchedMesh&&yt.batching===!0||N.isBatchedMesh&&yt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&yt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&yt.instancing===!1||!N.isInstancedMesh&&yt.instancing===!0||N.isSkinnedMesh&&yt.skinning===!1||!N.isSkinnedMesh&&yt.skinning===!0||N.isInstancedMesh&&yt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&yt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&yt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&yt.instancingMorph===!1&&N.morphTexture!==null||yt.envMap!==wt||U.fog===!0&&yt.fog!==ot||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==tt.numPlanes||yt.numIntersection!==tt.numIntersection)||yt.vertexAlphas!==Lt||yt.vertexTangents!==Vt||yt.morphTargets!==Mt||yt.morphNormals!==te||yt.morphColors!==ve||yt.toneMapping!==de||yt.morphTargetsCount!==Le)&&(Yt=!0):(Yt=!0,yt.__version=U.version);let un=yt.currentProgram;Yt===!0&&(un=aa(U,L,N));let yn=!1,Fi=!1,ls=!1,ie=un.getUniforms(),Re=yt.uniforms;if(bt.useProgram(un.program)&&(yn=!0,Fi=!0,ls=!0),U.id!==G&&(G=U.id,Fi=!0),yn||z!==x){bt.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ie.setValue(P,"projectionMatrix",x.projectionMatrix),ie.setValue(P,"viewMatrix",x.matrixWorldInverse);let oi=ie.map.cameraPosition;oi!==void 0&&oi.setValue(P,Xt.setFromMatrixPosition(x.matrixWorld)),se.logarithmicDepthBuffer&&ie.setValue(P,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&ie.setValue(P,"isOrthographic",x.isOrthographicCamera===!0),z!==x&&(z=x,Fi=!0,ls=!0)}if(yt.needsLights&&($e.state.directionalShadowMap.length>0&&ie.setValue(P,"directionalShadowMap",$e.state.directionalShadowMap,D),$e.state.spotShadowMap.length>0&&ie.setValue(P,"spotShadowMap",$e.state.spotShadowMap,D),$e.state.pointShadowMap.length>0&&ie.setValue(P,"pointShadowMap",$e.state.pointShadowMap,D)),N.isSkinnedMesh){ie.setOptional(P,N,"bindMatrix"),ie.setOptional(P,N,"bindMatrixInverse");let Te=N.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ie.setValue(P,"boneTexture",Te.boneTexture,D))}N.isBatchedMesh&&(ie.setOptional(P,N,"batchingTexture"),ie.setValue(P,"batchingTexture",N._matricesTexture,D),ie.setOptional(P,N,"batchingIdTexture"),ie.setValue(P,"batchingIdTexture",N._indirectTexture,D),ie.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&ie.setValue(P,"batchingColorTexture",N._colorsTexture,D));let ai=H.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&ht.update(N,H,un),(Fi||yt.receiveShadow!==N.receiveShadow)&&(yt.receiveShadow=N.receiveShadow,ie.setValue(P,"receiveShadow",N.receiveShadow)),(U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial)&&U.envMap===null&&L.environment!==null&&(Re.envMapIntensity.value=L.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=pb()),Fi&&(ie.setValue(P,"toneMappingExposure",w.toneMappingExposure),yt.needsLights&&Cm(Re,ls),ot&&U.fog===!0&&St.refreshFogUniforms(Re,ot),St.refreshMaterialUniforms(Re,U,Ut,ut,C.state.transmissionRenderTarget[x.id]),Vs.upload(P,hd(yt),Re,D)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Vs.upload(P,hd(yt),Re,D),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&ie.setValue(P,"center",N.center),ie.setValue(P,"modelViewMatrix",N.modelViewMatrix),ie.setValue(P,"normalMatrix",N.normalMatrix),ie.setValue(P,"modelMatrix",N.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let Te=U.uniformsGroups;for(let oi=0,cs=Te.length;oi<cs;oi++){let dd=Te[oi];pt.update(dd,un),pt.bind(dd,un)}}return un}function Cm(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Am(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(x,L,H){let U=v.get(x);U.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),v.get(x.texture).__webglTexture=L,v.get(x.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:H,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){let H=v.get(x);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0};let Pm=P.createFramebuffer();this.setRenderTarget=function(x,L=0,H=0){V=x,A=L,k=H;let U=null,N=!1,ot=!1;if(x){let lt=v.get(x);if(lt.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(P.FRAMEBUFFER,lt.__webglFramebuffer),B.copy(x.viewport),O.copy(x.scissor),Q=x.scissorTest,bt.viewport(B),bt.scissor(O),bt.setScissorTest(Q),G=-1;return}else if(lt.__webglFramebuffer===void 0)D.setupRenderTarget(x);else if(lt.__hasExternalTextures)D.rebindTextures(x,v.get(x.texture).__webglTexture,v.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Lt=x.depthTexture;if(lt.__boundDepthTexture!==Lt){if(Lt!==null&&v.has(Lt)&&(x.width!==Lt.image.width||x.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(x)}}let xt=x.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(ot=!0);let wt=v.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(wt[L])?U=wt[L][H]:U=wt[L],N=!0):x.samples>0&&D.useMultisampledRTT(x)===!1?U=v.get(x).__webglMultisampledFramebuffer:Array.isArray(wt)?U=wt[H]:U=wt,B.copy(x.viewport),O.copy(x.scissor),Q=x.scissorTest}else B.copy($).multiplyScalar(Ut).floor(),O.copy(nt).multiplyScalar(Ut).floor(),Q=rt;if(H!==0&&(U=Pm),bt.bindFramebuffer(P.FRAMEBUFFER,U)&&bt.drawBuffers(x,U),bt.viewport(B),bt.scissor(O),bt.setScissorTest(Q),N){let lt=v.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+L,lt.__webglTexture,H)}else if(ot){let lt=L;for(let xt=0;xt<x.textures.length;xt++){let wt=v.get(x.textures[xt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+xt,wt.__webglTexture,H,lt)}}else if(x!==null&&H!==0){let lt=v.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,lt.__webglTexture,H)}G=-1},this.readRenderTargetPixels=function(x,L,H,U,N,ot,dt,lt=0){if(!(x&&x.isWebGLRenderTarget)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&dt!==void 0&&(xt=xt[dt]),xt){bt.bindFramebuffer(P.FRAMEBUFFER,xt);try{let wt=x.textures[lt],Lt=wt.format,Vt=wt.type;if(x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+lt),!se.textureFormatReadable(Lt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!se.textureTypeReadable(Vt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-U&&H>=0&&H<=x.height-N&&P.readPixels(L,H,U,N,st.convert(Lt),st.convert(Vt),ot)}finally{let wt=V!==null?v.get(V).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(x,L,H,U,N,ot,dt,lt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&dt!==void 0&&(xt=xt[dt]),xt)if(L>=0&&L<=x.width-U&&H>=0&&H<=x.height-N){bt.bindFramebuffer(P.FRAMEBUFFER,xt);let wt=x.textures[lt],Lt=wt.format,Vt=wt.type;if(x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+lt),!se.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!se.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Mt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Mt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(L,H,U,N,st.convert(Lt),st.convert(Vt),0);let te=V!==null?v.get(V).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,te);let ve=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await vp(P,ve,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Mt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Mt),P.deleteSync(ve),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,L=null,H=0){let U=Math.pow(2,-H),N=Math.floor(x.image.width*U),ot=Math.floor(x.image.height*U),dt=L!==null?L.x:0,lt=L!==null?L.y:0;D.setTexture2D(x,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,dt,lt,N,ot),bt.unbindTexture()};let Rm=P.createFramebuffer(),Im=P.createFramebuffer();this.copyTextureToTexture=function(x,L,H=null,U=null,N=0,ot=0){let dt,lt,xt,wt,Lt,Vt,Mt,te,ve,de=x.isCompressedTexture?x.mipmaps[ot]:x.image;if(H!==null)dt=H.max.x-H.min.x,lt=H.max.y-H.min.y,xt=H.isBox3?H.max.z-H.min.z:1,wt=H.min.x,Lt=H.min.y,Vt=H.isBox3?H.min.z:0;else{let Re=Math.pow(2,-N);dt=Math.floor(de.width*Re),lt=Math.floor(de.height*Re),x.isDataArrayTexture?xt=de.depth:x.isData3DTexture?xt=Math.floor(de.depth*Re):xt=1,wt=0,Lt=0,Vt=0}U!==null?(Mt=U.x,te=U.y,ve=U.z):(Mt=0,te=0,ve=0);let ee=st.convert(L.format),Le=st.convert(L.type),yt;L.isData3DTexture?(D.setTexture3D(L,0),yt=P.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(D.setTexture2DArray(L,0),yt=P.TEXTURE_2D_ARRAY):(D.setTexture2D(L,0),yt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,L.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,L.unpackAlignment);let $e=P.getParameter(P.UNPACK_ROW_LENGTH),Yt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),un=P.getParameter(P.UNPACK_SKIP_PIXELS),yn=P.getParameter(P.UNPACK_SKIP_ROWS),Fi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,de.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,de.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,wt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Lt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Vt);let ls=x.isDataArrayTexture||x.isData3DTexture,ie=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){let Re=v.get(x),ai=v.get(L),Te=v.get(Re.__renderTarget),oi=v.get(ai.__renderTarget);bt.bindFramebuffer(P.READ_FRAMEBUFFER,Te.__webglFramebuffer),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let cs=0;cs<xt;cs++)ls&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(x).__webglTexture,N,Vt+cs),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(L).__webglTexture,ot,ve+cs)),P.blitFramebuffer(wt,Lt,dt,lt,Mt,te,dt,lt,P.DEPTH_BUFFER_BIT,P.NEAREST);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||x.isRenderTargetTexture||v.has(x)){let Re=v.get(x),ai=v.get(L);bt.bindFramebuffer(P.READ_FRAMEBUFFER,Rm),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Im);for(let Te=0;Te<xt;Te++)ls?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Re.__webglTexture,N,Vt+Te):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Re.__webglTexture,N),ie?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ai.__webglTexture,ot,ve+Te):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ai.__webglTexture,ot),N!==0?P.blitFramebuffer(wt,Lt,dt,lt,Mt,te,dt,lt,P.COLOR_BUFFER_BIT,P.NEAREST):ie?P.copyTexSubImage3D(yt,ot,Mt,te,ve+Te,wt,Lt,dt,lt):P.copyTexSubImage2D(yt,ot,Mt,te,wt,Lt,dt,lt);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ie?x.isDataTexture||x.isData3DTexture?P.texSubImage3D(yt,ot,Mt,te,ve,dt,lt,xt,ee,Le,de.data):L.isCompressedArrayTexture?P.compressedTexSubImage3D(yt,ot,Mt,te,ve,dt,lt,xt,ee,de.data):P.texSubImage3D(yt,ot,Mt,te,ve,dt,lt,xt,ee,Le,de):x.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ot,Mt,te,dt,lt,ee,Le,de.data):x.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ot,Mt,te,de.width,de.height,ee,de.data):P.texSubImage2D(P.TEXTURE_2D,ot,Mt,te,dt,lt,ee,Le,de);P.pixelStorei(P.UNPACK_ROW_LENGTH,$e),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Yt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,un),P.pixelStorei(P.UNPACK_SKIP_ROWS,yn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fi),ot===0&&L.generateMipmaps&&P.generateMipmap(yt),bt.unbindTexture()},this.initRenderTarget=function(x){v.get(x).__webglFramebuffer===void 0&&D.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?D.setTextureCube(x,0):x.isData3DTexture?D.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?D.setTexture2DArray(x,0):D.setTexture2D(x,0),bt.unbindTexture()},this.resetState=function(){A=0,k=0,V=null,bt.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Gt._getUnpackColorSpace()}};var Lr=function(){var n=0,t=document.createElement("div");t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",function(h){h.preventDefault(),i(++n%t.children.length)},!1);function e(h){return t.appendChild(h.dom),h}function i(h){for(var d=0;d<t.children.length;d++)t.children[d].style.display=d===h?"block":"none";n=h}var s=(performance||Date).now(),r=s,a=0,o=e(new Lr.Panel("FPS","#0ff","#002")),l=e(new Lr.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=e(new Lr.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:t,addPanel:e,showPanel:i,begin:function(){s=(performance||Date).now()},end:function(){a++;var h=(performance||Date).now();if(l.update(h-s,200),h>=r+1e3&&(o.update(a*1e3/(h-r),100),r=h,a=0,c)){var d=performance.memory;c.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return h},update:function(){s=this.end()},domElement:t,setMode:i}};Lr.Panel=function(n,t,e){var i=1/0,s=0,r=Math.round,a=r(window.devicePixelRatio||1),o=80*a,l=48*a,c=3*a,h=2*a,d=3*a,u=15*a,f=74*a,g=30*a,b=document.createElement("canvas");b.width=o,b.height=l,b.style.cssText="width:80px;height:48px";var m=b.getContext("2d");return m.font="bold "+9*a+"px Helvetica,Arial,sans-serif",m.textBaseline="top",m.fillStyle=e,m.fillRect(0,0,o,l),m.fillStyle=t,m.fillText(n,c,h),m.fillRect(d,u,f,g),m.fillStyle=e,m.globalAlpha=.9,m.fillRect(d,u,f,g),{dom:b,update:function(p,y){i=Math.min(i,p),s=Math.max(s,p),m.fillStyle=e,m.globalAlpha=1,m.fillRect(0,0,o,u),m.fillStyle=t,m.fillText(r(p)+" "+n+" ("+r(i)+"-"+r(s)+")",c,h),m.drawImage(b,d+a,u,f-a,g,d,u,f-a,g),m.fillRect(d+f-a,u,a,g),m.fillStyle=e,m.globalAlpha=.9,m.fillRect(d+f-a,u,a,r((1-p/y)*g))}}};var Zp=Lr;var Jp="./assets/flower-01-CDLT5V4R.webp";var jp="./assets/flower-02-VOEEGLU6.webp";var Kp="./assets/flower-03-KTWBWJXL.webp";var Qp="./assets/flower-04-HNBLQCYR.webp";var tf="./assets/flower-05-QEHM2PYT.webp";var ef=[{fallbackColor:"#feca4f",accentColor:"#feca4f",textureSrc:Jp,position:{x:-.9,y:0},backgroundColor:"#fffaf0",blob1Color:"#ffdf94",blob2Color:"#fce7c4",label:{word:"golden",pms:"PMS 135 C",color:"#2e2e2e"}},{fallbackColor:"#80455a",accentColor:"#80455a",textureSrc:jp,position:{x:.8,y:0},backgroundColor:"#fffaf0",blob1Color:"#d29a41",blob2Color:"#bb96af",label:{word:"violet",pms:"PMS 4985 C",color:"#2e2e2e"}},{fallbackColor:"#fa7b71",accentColor:"#fa7b71",textureSrc:Kp,position:{x:-.7,y:0},backgroundColor:"#5f81ab",blob1Color:"#f88b8d",blob2Color:"#cfbbdd",label:{word:"afterglow",pms:"PMS 170 C",color:"#f4f4f4"}},{fallbackColor:"#3c72c6",accentColor:"#3c72c6",textureSrc:Qp,position:{x:1,y:0},backgroundColor:"#5b9bc2",blob1Color:"#ffaa00",blob2Color:"#00e1ff",label:{word:"cobalt",pms:"PMS 660 C",color:"#f4f4f4"}},{fallbackColor:"#fdd895",accentColor:"#fdd895",textureSrc:tf,position:{x:-.7,y:0},backgroundColor:"#7d936e",blob1Color:"#fdd895",blob2Color:"#a5b599",label:{word:"meadow",pms:"PMS 7507 C",color:"#f4f4f4"}}];var ll=class{constructor(t=null){this.isInitialized=!1,this.isDebugBound=!1,this.debug=t,this.planes=[],this.texturesBySource=new Map,this.useTextures=!0,this.planeGap=5,this.desktopPlaneScale=1,this.mobilePlaneScale=.65,this.mobileXSpreadFactor=.25,this.mobileBreakpoint=768,this.planeConfig=ef,this.moodSampleOffset=1,this.planeFadeSampleOffset=1,this.planeFadeSmoothing=.14,this.parallaxEnabled=!0,this.parallaxAmountX=.16,this.parallaxAmountY=.08,this.parallaxSmoothing=.08,this.pointerTarget=new Wt(0,0),this.pointerCurrent=new Wt(0,0),this.breathEnabled=!0,this.breathTiltAmount=.045,this.breathScaleAmount=.03,this.breathSmoothing=.14,this.breathGain=1.1,this.breathIntensity=0,this.targetBreathIntensity=0,this.gestureParallaxEnabled=!0,this.gestureParallaxAmountY=.05,this.gestureParallaxSmoothing=.05,this.driftCurrent=0,this.driftTarget=0,this.onPointerMove=e=>{let i=e.clientX/window.innerWidth*2-1,s=e.clientY/window.innerHeight*2-1;this.pointerTarget.set(i,-s)},this.onPointerLeave=()=>{this.pointerTarget.set(0,0)}}async init(t){this.isInitialized||(this.setPlanes(t),this.updatePlaneMaterialMode(),this.updatePlaneScale(),this.layoutPlanes(),this.bindPointerEvents(),this.bindDebug(),this.isInitialized=!0)}setPlanes(t){let e=new Zn(3,3);this.planeConfig.forEach((i,s)=>{let r=this.texturesBySource.get(i.textureSrc)||null,a=r?.image,o=a&&a.width>0&&a.height>0?a.width/a.height:1,l=i.fallbackColor||"#ffffff",c=i.accentColor||l,h=i.backgroundColor||l,d=i.blob1Color||l,u=i.blob2Color||l,f=this.getPlaneLabelData(i,this.planes.length),g=new $n({color:l,map:r,side:on,transparent:!0,depthWrite:!1,opacity:s===0?1:0}),b=new ye(e,g);b.userData.basePosition=i.position,b.userData.baseColor=l,b.userData.accentColor=c,b.userData.backgroundColor=h,b.userData.blob1Color=d,b.userData.blob2Color=u,b.userData.label=f,b.userData.texture=r,b.userData.aspectRatio=o,t.add(b),this.planes.push(b)})}getPlaneLabelData(t,e){let i={word:`tone ${String(e+1).padStart(2,"0")}`,pms:"N/A",color:""},s=t.label||i;return{word:s.word||i.word,pms:s.pms||i.pms,color:s.color||i.color}}updatePlaneScale(){let e=window.innerWidth<=this.mobileBreakpoint?this.mobilePlaneScale:this.desktopPlaneScale;this.planes.forEach(i=>{let s=i.userData.aspectRatio||1;i.scale.set(e*s,e,1)})}layoutPlanes(){let t=this.getXSpreadFactor();this.planes.forEach((e,i)=>{let s=e.userData.basePosition||{x:0,y:0},r=s.x*t;e.position.set(r,s.y,-i*this.planeGap)})}getXSpreadFactor(){return window.innerWidth<=this.mobileBreakpoint?this.mobileXSpreadFactor:1}getDepthRange(){if(!this.planes.length)return{nearestZ:0,deepestZ:0};let t=this.planes.map(e=>e.position.z);return{nearestZ:Math.max(...t),deepestZ:Math.min(...t)}}getDepthProgress(t){let{nearestZ:e,deepestZ:i}=this.getDepthRange(),s=e-i;return s<=0?0:Dt.clamp((e-t)/s,0,1)}getActivePlaneIndex(t){if(!this.planes.length)return-1;let e=0,i=1/0;return this.planes.forEach((s,r)=>{let a=Math.abs(t-s.position.z);a<i&&(i=a,e=r)}),e}getMoodColorsByIndex(t){if(t<0||t>=this.planes.length)return null;let{backgroundColor:e,blob1Color:i,blob2Color:s}=this.planes[t].userData;return e?{background:e,blob1:i,blob2:s}:null}getMoodBlendData(t){if(!this.planes.length)return null;let i=(Number.isFinite(t)?t:this.planes[0].position.z)-this.planeGap*this.moodSampleOffset,s=this.planes.length-1;if(s===0||this.planeGap<=0){let u=this.getMoodColorsByIndex(0);return u?{currentMood:u,nextMood:u,blend:0}:null}let r=this.planes[0].position.z,a=Dt.clamp((r-i)/this.planeGap,0,s),o=Math.floor(a),l=Math.min(o+1,s),c=a-o,h=this.getMoodColorsByIndex(o),d=this.getMoodColorsByIndex(l)||h;return!h||!d?null:{currentMood:h,nextMood:d,blend:c}}getPlaneBlendData(t){if(!this.planes.length)return null;let e=Math.max(this.planeGap,1e-4),i=this.planes[0].position.z,s=this.planes.length-1,r=t-e*this.planeFadeSampleOffset,a=Dt.clamp((i-r)/e,0,s),o=Math.floor(a),l=Math.min(o+1,s),c=a-o;return{currentPlaneIndex:o,nextPlaneIndex:l,blend:c}}getActiveMoodColors(t){return this.getMoodBlendData(t)?.currentMood||null}getTextureSources(){let t=this.planeConfig.map(e=>e.textureSrc).filter(Boolean);return[...new Set(t)]}setPreloadedTextures(t){this.texturesBySource=t instanceof Map?t:new Map}updatePlaneMaterialMode(){this.planes.forEach(t=>{let e=t.material,i=t.userData.texture||null,s=!!i;e.map=this.useTextures&&s?i:null,e.color.set(this.useTextures&&s?"#ffffff":t.userData.baseColor),e.needsUpdate=!0})}bindDebug(){!this.debug||this.isDebugBound||(this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"planeGap",label:"Gap",options:{min:.4,max:10,step:.1},onChange:()=>{this.layoutPlanes()}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"useTextures",label:"Use Textures",onChange:()=>{this.updatePlaneMaterialMode()}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"moodSampleOffset",label:"Mood Offset",options:{min:0,max:1.5,step:.01}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"parallaxEnabled",label:"Plane Parallax"}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"parallaxAmountX",label:"Parallax X",options:{min:0,max:.5,step:.01}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"parallaxAmountY",label:"Parallax Y",options:{min:0,max:.3,step:.01}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"gestureParallaxEnabled",label:"Gesture Parallax"}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"gestureParallaxAmountY",label:"Gesture Y",options:{min:0,max:.5,step:.01}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"breathEnabled",label:"Plane Breath"}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"breathTiltAmount",label:"Breath Tilt",options:{min:0,max:.2,step:.005}}),this.debug.addBinding({folderTitle:"Gallery",targetObject:this,property:"breathScaleAmount",label:"Breath Scale",options:{min:0,max:.1,step:.001}}),this.isDebugBound=!0)}updatePlaneVisibility(t){let e=this.getPlaneBlendData(t);if(!e)return;let{currentPlaneIndex:i,nextPlaneIndex:s,blend:r}=e;this.planes.forEach((a,o)=>{let l=0;o===i&&(l=1-r),o===s&&(l=Math.max(l,r));let c=Number.isFinite(a.material.opacity)?a.material.opacity:0;a.material.opacity=Dt.lerp(c,l,this.planeFadeSmoothing),a.material.needsUpdate=!0})}bindPointerEvents(){window.addEventListener("pointermove",this.onPointerMove,{passive:!0}),window.addEventListener("pointerleave",this.onPointerLeave,{passive:!0})}updatePlaneMotion(t=null){this.pointerCurrent.lerp(this.pointerTarget,this.parallaxSmoothing);let e=Math.max(t?.velocityMax||1,1e-4),i=Dt.clamp(Math.abs(t?.velocity||0)/e,0,1),s=Dt.clamp((t?.velocity||0)/e,-1,1);this.targetBreathIntensity=this.breathEnabled?Dt.clamp(i*this.breathGain,0,1):0,this.breathIntensity=Dt.lerp(this.breathIntensity,this.targetBreathIntensity,this.breathSmoothing),this.driftTarget=this.gestureParallaxEnabled?s:0,this.driftCurrent=Dt.lerp(this.driftCurrent,this.driftTarget,this.gestureParallaxSmoothing);let r=this.getXSpreadFactor();this.planes.forEach((a,o)=>{let l=a.userData.basePosition||{x:0,y:0},c=l.x*r,h=l.y,d=-o*this.planeGap,u=Number.isFinite(a.material.opacity)?a.material.opacity:0,f=1+o*.05,g=this.parallaxEnabled?u*f:0,b=this.pointerCurrent.x*this.parallaxAmountX*g,m=this.pointerCurrent.y*this.parallaxAmountY*g,p=this.driftCurrent*this.gestureParallaxAmountY;a.position.x=c+b,a.position.y=h+m+p,a.position.z=d;let y=this.breathEnabled?this.breathIntensity*u:0,E=-this.pointerCurrent.y*this.breathTiltAmount*y,S=this.pointerCurrent.x*this.breathTiltAmount*y;a.rotation.x=E,a.rotation.y=S,a.rotation.z=0;let C=a.userData.aspectRatio||1,T=window.innerWidth<=this.mobileBreakpoint?this.mobilePlaneScale:this.desktopPlaneScale,I=1+this.breathScaleAmount*y;a.scale.x=T*C*I,a.scale.y=T*I,a.scale.z=1})}update(t=null,e=null){t&&(this.updatePlaneVisibility(t.position.z),this.updatePlaneMotion(e))}dispose(){window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerleave",this.onPointerLeave)}};var nf=`varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;var sf=`varying vec2 vUv;

uniform vec3 uBackgroundColor;
uniform vec3 uBlob1Color;
uniform vec3 uBlob2Color;
uniform float uNoiseStrength;
uniform float uBlobRadius;
uniform float uBlobRadiusSecondary;
uniform float uBlobStrength;
uniform float uTime;
uniform float uVelocityIntensity;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Flat background color
  vec3 color = uBackgroundColor;

  // Blob centers subtely animated
  float animTime = uTime * 0.00028;
  vec2 blob1Center = vec2(
    0.50 + sin(animTime * 1.000) * 0.13 + sin(animTime * 1.618) * 0.05,
    0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
  );
  vec2 blob2Center = vec2(
    0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
    0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
  );

  // Two blobs: 1 at center, 0 at edge
  float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
  float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));

  // Soften blob colors toward background before applying
  vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
  vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
  color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
  color = mix(color, blob2SoftColor, blob2 * uBlobStrength);

  // Velocity luminance lift
  color += uVelocityIntensity * 0.10;

  // Film grain
  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += grain * uNoiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;var cl=class{constructor(t=null){this.debug=t,this.isInitialized=!1,this.isDebugBound=!1,this.scene=null,this.camera=null,this.material=null,this.mesh=null,this.backgroundColor=new Rt("#FBE8CD"),this.blob1Color=new Rt("#FFD56D"),this.blob2Color=new Rt("#5D816A"),this.nextBackgroundColor=new Rt,this.nextBlob1Color=new Rt,this.nextBlob2Color=new Rt,this.baseBlobRadius=.65,this.secondaryBlobRadiusRatio=.78,this.baseBlobStrength=.9,this.depthToRadiusAmount=.08,this.velocityToStrengthAmount=.1,this.motionSmoothing=.1,this.motionDepthProgress=0,this.motionVelocityIntensity=0,this.smoothedDepthProgress=0,this.smoothedVelocityIntensity=0,this.blobRadius=this.baseBlobRadius,this.blobStrength=this.baseBlobStrength,this.noiseStrength=.04}init(){if(this.isInitialized)return;this.scene=new Gi,this.camera=new Wi(-1,1,1,-1,0,1),this.material=new ze({vertexShader:nf,fragmentShader:sf,depthWrite:!1,depthTest:!1,uniforms:{uBackgroundColor:{value:this.backgroundColor},uBlob1Color:{value:this.blob1Color},uBlob2Color:{value:this.blob2Color},uNoiseStrength:{value:this.noiseStrength},uBlobRadius:{value:this.blobRadius},uBlobRadiusSecondary:{value:this.blobRadius*this.secondaryBlobRadiusRatio},uBlobStrength:{value:this.blobStrength},uTime:{value:0},uVelocityIntensity:{value:0}}});let t=new Zn(2,2);this.mesh=new ye(t,this.material),this.scene.add(this.mesh),this.applyMotionToBlob(),this.bindDebug(),this.isInitialized=!0}setMoodColors({background:t,blob1:e,blob2:i}={}){t&&this.backgroundColor.set(t),e&&this.blob1Color.set(e),i&&this.blob2Color.set(i),this.updateUniformColors()}setMoodBlend({currentMood:t,nextMood:e,blend:i}={}){if(!t)return;let s=Dt.clamp(i??0,0,1);if(!e||s<=0){this.setMoodColors(t);return}this.backgroundColor.set(t.background).lerp(this.nextBackgroundColor.set(e.background),s),this.blob1Color.set(t.blob1).lerp(this.nextBlob1Color.set(e.blob1),s),this.blob2Color.set(t.blob2).lerp(this.nextBlob2Color.set(e.blob2),s),this.updateUniformColors()}updateUniformColors(){this.material&&(this.material.uniforms.uBackgroundColor.value.copy(this.backgroundColor),this.material.uniforms.uBlob1Color.value.copy(this.blob1Color),this.material.uniforms.uBlob2Color.value.copy(this.blob2Color),this.material.uniforms.uNoiseStrength.value=this.noiseStrength)}updateBlobUniforms(){this.material&&(this.material.uniforms.uBlobRadius.value=this.blobRadius,this.material.uniforms.uBlobRadiusSecondary.value=this.blobRadius*this.secondaryBlobRadiusRatio,this.material.uniforms.uBlobStrength.value=this.blobStrength)}setMotionResponse({depthProgress:t,velocityIntensity:e}={}){Number.isFinite(t)&&(this.motionDepthProgress=Dt.clamp(t,0,1)),Number.isFinite(e)&&(this.motionVelocityIntensity=Dt.clamp(e,0,1))}applyMotionToBlob(){let t=this.baseBlobRadius+this.smoothedDepthProgress*this.depthToRadiusAmount,e=this.baseBlobStrength+this.smoothedVelocityIntensity*this.velocityToStrengthAmount;this.blobRadius=Dt.clamp(t,.05,1),this.blobStrength=Dt.clamp(e,0,1),this.updateBlobUniforms()}bindDebug(){!this.debug||this.isDebugBound||(this.debug.addBinding({folderTitle:"Background",targetObject:this,property:"baseBlobRadius",label:"Blob Radius",options:{min:.1,max:1,step:.01},onChange:()=>{this.applyMotionToBlob()}}),this.debug.addBinding({folderTitle:"Background",targetObject:this,property:"secondaryBlobRadiusRatio",label:"Blob 2 Size",options:{min:.3,max:1.2,step:.01},onChange:()=>{this.applyMotionToBlob()}}),this.debug.addBinding({folderTitle:"Background",targetObject:this,property:"baseBlobStrength",label:"Blob Strength",options:{min:0,max:1,step:.01},onChange:()=>{this.applyMotionToBlob()}}),this.debug.addBinding({folderTitle:"Background",targetObject:this,property:"noiseStrength",label:"Noise",options:{min:0,max:.2,step:.005},onChange:()=>{this.updateUniformColors()}}),this.isDebugBound=!0)}update(t=0){this.smoothedDepthProgress=Dt.lerp(this.smoothedDepthProgress,this.motionDepthProgress,this.motionSmoothing),this.smoothedVelocityIntensity=Dt.lerp(this.smoothedVelocityIntensity,this.motionVelocityIntensity,this.motionSmoothing),this.material&&(this.material.uniforms.uTime.value=t,this.material.uniforms.uVelocityIntensity.value=this.smoothedVelocityIntensity),this.applyMotionToBlob()}render(t){this.isInitialized&&t.render(this.scene,this.camera)}dispose(){this.isInitialized&&(this.mesh.geometry.dispose(),this.material.dispose(),this.scene.clear(),this.scene=null,this.camera=null,this.mesh=null,this.material=null,this.isInitialized=!1)}};function ae(n){return n==null}function zu(n){return n!==null&&typeof n=="object"}function gh(n){return n!==null&&typeof n=="object"}function yb(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;e++)if(n[e]!==t[e])return!1;return!0}function Qi(n,t){return Array.from(new Set([...Object.keys(n),...Object.keys(t)])).reduce((i,s)=>{let r=n[s],a=t[s];return gh(r)&&gh(a)?Object.assign(Object.assign({},i),{[s]:Qi(r,a)}):Object.assign(Object.assign({},i),{[s]:s in t?a:r})},{})}function Hu(n){return zu(n)?"target"in n:!1}var wb={alreadydisposed:()=>"View has been already disposed",invalidparams:n=>`Invalid parameters for '${n.name}'`,nomatchingcontroller:n=>`No matching controller for '${n.key}'`,nomatchingview:n=>`No matching view for '${JSON.stringify(n.params)}'`,notbindable:()=>"Value is not bindable",notcompatible:n=>`Not compatible with  plugin '${n.id}'`,propertynotfound:n=>`Property '${n.name}' not found`,shouldneverhappen:()=>"This error should never happen"},Pe=class n{static alreadyDisposed(){return new n({type:"alreadydisposed"})}static notBindable(){return new n({type:"notbindable"})}static notCompatible(t,e){return new n({type:"notcompatible",context:{id:`${t}.${e}`}})}static propertyNotFound(t){return new n({type:"propertynotfound",context:{name:t}})}static shouldNeverHappen(){return new n({type:"shouldneverhappen"})}constructor(t){var e;this.message=(e=wb[t.type](t.context))!==null&&e!==void 0?e:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=t.type}toString(){return this.message}},pl=class n{constructor(t,e){this.obj_=t,this.key=e}static isBindable(t){return!(t===null||typeof t!="object"&&typeof t!="function")}read(){return this.obj_[this.key]}write(t){this.obj_[this.key]=t}writeProperty(t,e){let i=this.read();if(!n.isBindable(i))throw Pe.notBindable();if(!(t in i))throw Pe.propertyNotFound(t);i[t]=e}},me=class{constructor(){this.observers_={}}on(t,e,i){var s;let r=this.observers_[t];return r||(r=this.observers_[t]=[]),r.push({handler:e,key:(s=i?.key)!==null&&s!==void 0?s:e}),this}off(t,e){let i=this.observers_[t];return i&&(this.observers_[t]=i.filter(s=>s.key!==e)),this}emit(t,e){let i=this.observers_[t];i&&i.forEach(s=>{s.handler(e)})}},vh=class{constructor(t,e){var i;this.constraint_=e?.constraint,this.equals_=(i=e?.equals)!==null&&i!==void 0?i:((s,r)=>s===r),this.emitter=new me,this.rawValue_=t}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){let i=e??{forceEmit:!1,last:!0},s=this.constraint_?this.constraint_.constrain(t):t,r=this.rawValue_;this.equals_(r,s)&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=s,this.emitter.emit("change",{options:i,previousRawValue:r,rawValue:s,sender:this}))}},_h=class{constructor(t){this.emitter=new me,this.value_=t}get rawValue(){return this.value_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){let i=e??{forceEmit:!1,last:!0},s=this.value_;s===t&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=t,this.emitter.emit("change",{options:i,previousRawValue:s,rawValue:this.value_,sender:this}))}},xh=class{constructor(t){this.emitter=new me,this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_)}get rawValue(){return this.value_.rawValue}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}};function he(n,t){let e=t?.constraint,i=t?.equals;return!e&&!i?new _h(n):new vh(n,t)}function Mb(n){return[new xh(n),(t,e)=>{n.setRawValue(t,e)}]}var zt=class n{constructor(t){this.emitter=new me,this.valMap_=t;for(let e in this.valMap_)this.valMap_[e].emitter.on("change",()=>{this.emitter.emit("change",{key:e,sender:this})})}static createCore(t){return Object.keys(t).reduce((i,s)=>Object.assign(i,{[s]:he(t[s])}),{})}static fromObject(t){let e=this.createCore(t);return new n(e)}get(t){return this.valMap_[t].rawValue}set(t,e){this.valMap_[t].rawValue=e}value(t){return this.valMap_[t]}},ts=class{constructor(t){this.values=zt.fromObject({max:t.max,min:t.min})}constrain(t){let e=this.values.get("max"),i=this.values.get("min");return Math.min(Math.max(t,i),e)}},bh=class{constructor(t){this.values=zt.fromObject({max:t.max,min:t.min})}constrain(t){let e=this.values.get("max"),i=this.values.get("min"),s=t;return ae(i)||(s=Math.max(s,i)),ae(e)||(s=Math.min(s,e)),s}},yh=class{constructor(t,e=0){this.step=t,this.origin=e}constrain(t){let e=this.origin%this.step,i=Math.round((t-e)/this.step);return e+i*this.step}},wh=class{constructor(t){this.text=t}evaluate(){return Number(this.text)}toString(){return this.text}},Sb={"**":(n,t)=>Math.pow(n,t),"*":(n,t)=>n*t,"/":(n,t)=>n/t,"%":(n,t)=>n%t,"+":(n,t)=>n+t,"-":(n,t)=>n-t,"<<":(n,t)=>n<<t,">>":(n,t)=>n>>t,">>>":(n,t)=>n>>>t,"&":(n,t)=>n&t,"^":(n,t)=>n^t,"|":(n,t)=>n|t},Mh=class{constructor(t,e,i){this.left=e,this.operator=t,this.right=i}evaluate(){let t=Sb[this.operator];if(!t)throw new Error(`unexpected binary operator: '${this.operator}`);return t(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}},Eb={"+":n=>n,"-":n=>-n,"~":n=>~n},Sh=class{constructor(t,e){this.operator=t,this.expression=e}evaluate(){let t=Eb[this.operator];if(!t)throw new Error(`unexpected unary operator: '${this.operator}`);return t(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}};function Gu(n){return(t,e)=>{for(let i=0;i<n.length;i++){let s=n[i](t,e);if(s!=="")return s}return""}}function Br(n,t){var e;let i=n.substr(t).match(/^\s+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Tb(n,t){let e=n.substr(t,1);return e.match(/^[1-9]$/)?e:""}function kr(n,t){var e;let i=n.substr(t).match(/^[0-9]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Cb(n,t){let e=kr(n,t);if(e!=="")return e;let i=n.substr(t,1);if(t+=1,i!=="-"&&i!=="+")return"";let s=kr(n,t);return s===""?"":i+s}function Wu(n,t){let e=n.substr(t,1);if(t+=1,e.toLowerCase()!=="e")return"";let i=Cb(n,t);return i===""?"":e+i}function Pf(n,t){let e=n.substr(t,1);if(e==="0")return e;let i=Tb(n,t);return t+=i.length,i===""?"":i+kr(n,t)}function Ab(n,t){let e=Pf(n,t);if(t+=e.length,e==="")return"";let i=n.substr(t,1);if(t+=i.length,i!==".")return"";let s=kr(n,t);return t+=s.length,e+i+s+Wu(n,t)}function Pb(n,t){let e=n.substr(t,1);if(t+=e.length,e!==".")return"";let i=kr(n,t);return t+=i.length,i===""?"":e+i+Wu(n,t)}function Rb(n,t){let e=Pf(n,t);return t+=e.length,e===""?"":e+Wu(n,t)}var Ib=Gu([Ab,Pb,Rb]);function Db(n,t){var e;let i=n.substr(t).match(/^[01]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Lb(n,t){let e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0b")return"";let i=Db(n,t);return i===""?"":e+i}function Fb(n,t){var e;let i=n.substr(t).match(/^[0-7]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Nb(n,t){let e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0o")return"";let i=Fb(n,t);return i===""?"":e+i}function Ub(n,t){var e;let i=n.substr(t).match(/^[0-9a-f]+/i);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Ob(n,t){let e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0x")return"";let i=Ub(n,t);return i===""?"":e+i}var Bb=Gu([Lb,Nb,Ob]),kb=Gu([Bb,Ib]);function Vb(n,t){let e=kb(n,t);return t+=e.length,e===""?null:{evaluable:new wh(e),cursor:t}}function zb(n,t){let e=n.substr(t,1);if(t+=e.length,e!=="(")return null;let i=If(n,t);if(!i)return null;t=i.cursor,t+=Br(n,t).length;let s=n.substr(t,1);return t+=s.length,s!==")"?null:{evaluable:i.evaluable,cursor:t}}function Hb(n,t){var e;return(e=Vb(n,t))!==null&&e!==void 0?e:zb(n,t)}function Rf(n,t){let e=Hb(n,t);if(e)return e;let i=n.substr(t,1);if(t+=i.length,i!=="+"&&i!=="-"&&i!=="~")return null;let s=Rf(n,t);return s?(t=s.cursor,{cursor:t,evaluable:new Sh(i,s.evaluable)}):null}function Gb(n,t,e){e+=Br(t,e).length;let i=n.filter(s=>t.startsWith(s,e))[0];return i?(e+=i.length,e+=Br(t,e).length,{cursor:e,operator:i}):null}function Wb(n,t){return(e,i)=>{let s=n(e,i);if(!s)return null;i=s.cursor;let r=s.evaluable;for(;;){let a=Gb(t,e,i);if(!a)break;i=a.cursor;let o=n(e,i);if(!o)return null;i=o.cursor,r=new Mh(a.operator,r,o.evaluable)}return r?{cursor:i,evaluable:r}:null}}var Xb=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce((n,t)=>Wb(n,t),Rf);function If(n,t){return t+=Br(n,t).length,Xb(n,t)}function qb(n){let t=If(n,0);return!t||t.cursor+Br(n,t.cursor).length!==n.length?null:t.evaluable}function ti(n){var t;let e=qb(n);return(t=e?.evaluate())!==null&&t!==void 0?t:null}function Df(n){if(typeof n=="number")return n;if(typeof n=="string"){let t=ti(n);if(!ae(t))return t}return 0}function Yb(n){return String(n)}function qe(n){return t=>t.toFixed(Math.max(Math.min(n,20),0))}function jt(n,t,e,i,s){let r=(n-t)/(e-t);return i+r*(s-i)}function rf(n){return String(n.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function Se(n,t,e){return Math.min(Math.max(n,t),e)}function Lf(n,t){return(n%t+t)%t}function $b(n,t){return ae(n.step)?Math.max(rf(t),2):rf(n.step)}function Ff(n){var t;return(t=n.step)!==null&&t!==void 0?t:1}function Nf(n,t){var e;let i=Math.abs((e=n.step)!==null&&e!==void 0?e:t);return i===0?.1:Math.pow(10,Math.floor(Math.log10(i))-1)}function Uf(n,t){return ae(n.step)?null:new yh(n.step,t)}function Of(n){return!ae(n.max)&&!ae(n.min)?new ts({max:n.max,min:n.min}):!ae(n.max)||!ae(n.min)?new bh({max:n.max,min:n.min}):null}function Bf(n,t){var e,i,s;return{formatter:(e=n.format)!==null&&e!==void 0?e:qe($b(n,t)),keyScale:(i=n.keyScale)!==null&&i!==void 0?i:Ff(n),pointerScale:(s=n.pointerScale)!==null&&s!==void 0?s:Nf(n,t)}}function kf(n){return{format:n.optional.function,keyScale:n.optional.number,max:n.optional.number,min:n.optional.number,pointerScale:n.optional.number,step:n.optional.number}}function Xu(n){return{constraint:n.constraint,textProps:zt.fromObject(Bf(n.params,n.initialValue))}}var ei=class{constructor(t){this.controller=t}get element(){return this.controller.view.element}get disabled(){return this.controller.viewProps.get("disabled")}set disabled(t){this.controller.viewProps.set("disabled",t)}get hidden(){return this.controller.viewProps.get("hidden")}set hidden(t){this.controller.viewProps.set("hidden",t)}dispose(){this.controller.viewProps.set("disposed",!0)}importState(t){return this.controller.importState(t)}exportState(){return this.controller.exportState()}},Ws=class{constructor(t){this.target=t}},es=class extends Ws{constructor(t,e,i){super(t),this.value=e,this.last=i??!0}},Eh=class extends Ws{constructor(t,e){super(t),this.expanded=e}},Th=class extends Ws{constructor(t,e){super(t),this.index=e}},Ch=class extends Ws{constructor(t,e){super(t),this.native=e}},ns=class extends ei{constructor(t){super(t),this.onValueChange_=this.onValueChange_.bind(this),this.emitter_=new me,this.controller.value.emitter.on("change",this.onValueChange_)}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get key(){return this.controller.value.binding.target.key}get tag(){return this.controller.tag}set tag(t){this.controller.tag=t}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.controller.value.fetch()}onValueChange_(t){let e=this.controller.value;this.emitter_.emit("change",new es(this,e.binding.target.read(),t.options.last))}},Ah=class{constructor(t,e){this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=e,this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.emitter=new me}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=this.binding.read()}push(){this.binding.write(this.value_.rawValue)}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.push(),this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}};function Zb(n){if(!("binding"in n))return!1;let t=n.binding;return Hu(t)&&"read"in t&&"write"in t}function Jb(n,t){let i=Object.keys(t).reduce((s,r)=>{if(s===void 0)return;let a=t[r],o=a(n[r]);return o.succeeded?Object.assign(Object.assign({},s),{[r]:o.value}):void 0},{});return i}function jb(n,t){return n.reduce((e,i)=>{if(e===void 0)return;let s=t(i);if(!(!s.succeeded||s.value===void 0))return[...e,s.value]},[])}function Kb(n){return n===null?!1:typeof n=="object"}function jn(n){return t=>e=>{if(!t&&e===void 0)return{succeeded:!1,value:void 0};if(t&&e===void 0)return{succeeded:!0,value:void 0};let i=n(e);return i!==void 0?{succeeded:!0,value:i}:{succeeded:!1,value:void 0}}}function af(n){return{custom:t=>jn(t)(n),boolean:jn(t=>typeof t=="boolean"?t:void 0)(n),number:jn(t=>typeof t=="number"?t:void 0)(n),string:jn(t=>typeof t=="string"?t:void 0)(n),function:jn(t=>typeof t=="function"?t:void 0)(n),constant:t=>jn(e=>e===t?t:void 0)(n),raw:jn(t=>t)(n),object:t=>jn(e=>{if(Kb(e))return Jb(e,t)})(n),array:t=>jn(e=>{if(Array.isArray(e))return jb(e,t)})(n)}}var Ph={optional:af(!0),required:af(!1)};function ue(n,t){let e=t(Ph),i=Ph.required.object(e)(n);return i.succeeded?i.value:void 0}function nn(n,t,e,i){if(t&&!t(n))return!1;let s=ue(n,e);return s?i(s):!1}function sn(n,t){var e;return Qi((e=n?.())!==null&&e!==void 0?e:{},t)}function Ki(n){return"value"in n}function Vf(n){if(!zu(n)||!("binding"in n))return!1;let t=n.binding;return Hu(t)}var Dn="http://www.w3.org/2000/svg";function fl(n){n.offsetHeight}function Qb(n,t){let e=n.style.transition;n.style.transition="none",t(),n.style.transition=e}function qu(n){return n.ontouchstart!==void 0}function ty(){return globalThis}function ey(){return ty().document}function ny(n){let t=n.ownerDocument.defaultView;return t&&"document"in t?n.getContext("2d",{willReadFrequently:!0}):null}var iy={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function Al(n,t){let e=n.createElementNS(Dn,"svg");return e.innerHTML=iy[t],e}function zf(n,t,e){n.insertBefore(t,n.children[e])}function Yu(n){n.parentElement&&n.parentElement.removeChild(n)}function Hf(n){for(;n.children.length>0;)n.removeChild(n.children[0])}function sy(n){for(;n.childNodes.length>0;)n.removeChild(n.childNodes[0])}function Gf(n){return n.relatedTarget?n.relatedTarget:"explicitOriginalTarget"in n?n.explicitOriginalTarget:null}function Qn(n,t){n.emitter.on("change",e=>{t(e.rawValue)}),t(n.rawValue)}function Fn(n,t,e){Qn(n.value(t),e)}var ry="tp";function qt(n){return(e,i)=>[ry,"-",n,"v",e?`_${e}`:"",i?`-${i}`:""].join("")}var Fr=qt("lbl");function ay(n,t){let e=n.createDocumentFragment();return t.split(`
`).map(s=>n.createTextNode(s)).forEach((s,r)=>{r>0&&e.appendChild(n.createElement("br")),e.appendChild(s)}),e}var ml=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Fr()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(Fr("l")),Fn(e.props,"label",r=>{ae(r)?this.element.classList.add(Fr(void 0,"nol")):(this.element.classList.remove(Fr(void 0,"nol")),sy(i),i.appendChild(ay(t,r)))}),this.element.appendChild(i),this.labelElement=i;let s=t.createElement("div");s.classList.add(Fr("v")),this.element.appendChild(s),this.valueElement=s}},gl=class{constructor(t,e){this.props=e.props,this.valueController=e.valueController,this.viewProps=e.valueController.viewProps,this.view=new ml(t,{props:e.props,viewProps:this.viewProps}),this.view.valueElement.appendChild(this.valueController.view.element)}importProps(t){return nn(t,null,e=>({label:e.optional.string}),e=>(this.props.set("label",e.label),!0))}exportProps(){return sn(null,{label:this.props.get("label")})}};function oy(){return["veryfirst","first","last","verylast"]}var of=qt(""),lf={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"},Xs=class{constructor(t){this.parent_=null,this.blade=t.blade,this.view=t.view,this.viewProps=t.viewProps;let e=this.view.element;this.blade.value("positions").emitter.on("change",()=>{oy().forEach(i=>{e.classList.remove(of(void 0,lf[i]))}),this.blade.get("positions").forEach(i=>{e.classList.add(of(void 0,lf[i]))})}),this.viewProps.handleDispose(()=>{Yu(e)})}get parent(){return this.parent_}set parent(t){this.parent_=t,this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}importState(t){return nn(t,null,e=>({disabled:e.required.boolean,hidden:e.required.boolean}),e=>(this.viewProps.importState(e),!0))}exportState(){return sn(null,Object.assign({},this.viewProps.exportState()))}},ni=class extends Xs{constructor(t,e){if(e.value!==e.valueController.value)throw Pe.shouldNeverHappen();let i=e.valueController.viewProps,s=new gl(t,{blade:e.blade,props:e.props,valueController:e.valueController});super(Object.assign(Object.assign({},e),{view:new ml(t,{props:e.props,viewProps:i}),viewProps:i})),this.labelController=s,this.value=e.value,this.valueController=e.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}importState(t){return nn(t,e=>{var i,s,r;return super.importState(e)&&this.labelController.importProps(e)&&((r=(s=(i=this.valueController).importProps)===null||s===void 0?void 0:s.call(i,t))!==null&&r!==void 0?r:!0)},e=>({value:e.optional.raw}),e=>(e.value&&(this.value.rawValue=e.value),!0))}exportState(){var t,e,i;return sn(()=>super.exportState(),Object.assign(Object.assign({value:this.value.rawValue},this.labelController.exportProps()),(i=(e=(t=this.valueController).exportProps)===null||e===void 0?void 0:e.call(t))!==null&&i!==void 0?i:{}))}};function cf(n){let t=Object.assign({},n);return delete t.value,t}var vl=class extends ni{constructor(t,e){super(t,e),this.tag=e.tag}importState(t){return nn(t,e=>super.importState(cf(t)),e=>({tag:e.optional.string}),e=>(this.tag=e.tag,!0))}exportState(){return sn(()=>cf(super.exportState()),{binding:{key:this.value.binding.target.key,value:this.value.binding.target.read()},tag:this.tag})}};function ly(n){return Ki(n)&&Vf(n.value)}var Rh=class extends vl{importState(t){return nn(t,e=>super.importState(e),e=>({binding:e.required.object({value:e.required.raw})}),e=>(this.value.binding.inject(e.binding.value),this.value.fetch(),!0))}};function cy(n){return Ki(n)&&Zb(n.value)}function Wf(n,t){for(;n.length<t;)n.push(void 0)}function hy(n){let t=[];return Wf(t,n),t}function uy(n){let t=n.indexOf(void 0);return t<0?n:n.slice(0,t)}function dy(n,t){let e=[...uy(n),t];return e.length>n.length?e.splice(0,e.length-n.length):Wf(e,n.length),e}var Ih=class{constructor(t){this.emitter=new me,this.onTick_=this.onTick_.bind(this),this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=t.binding,this.value_=he(hy(t.bufferSize)),this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.ticker=t.ticker,this.ticker.emitter.on("tick",this.onTick_),this.fetch()}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=dy(this.value_.rawValue,this.binding.read())}onTick_(){this.fetch()}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}};function py(n){if(!("binding"in n))return!1;let t=n.binding;return Hu(t)&&"read"in t&&!("write"in t)}var Dh=class extends vl{exportState(){return sn(()=>super.exportState(),{binding:{readonly:!0}})}};function fy(n){return Ki(n)&&py(n.value)}var Lh=class extends ei{get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get title(){var t;return(t=this.controller.buttonController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.buttonController.props.set("title",t)}on(t,e){let i=e.bind(this);return this.controller.buttonController.emitter.on(t,r=>{i(new Ch(this,r.nativeEvent))}),this}off(t,e){return this.controller.buttonController.emitter.off(t,e),this}};function my(n,t,e){e?n.classList.add(t):n.classList.remove(t)}function $s(n,t){return e=>{my(n,t,e)}}function $u(n,t){Qn(n,e=>{t.textContent=e??""})}var lh=qt("btn"),Fh=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(lh()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("button");i.classList.add(lh("b")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;let s=t.createElement("div");s.classList.add(lh("t")),$u(e.props.value("title"),s),this.buttonElement.appendChild(s)}},Nh=class{constructor(t,e){this.emitter=new me,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new Fh(t,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}importProps(t){return nn(t,null,e=>({title:e.optional.string}),e=>(this.props.set("title",e.title),!0))}exportProps(){return sn(null,{title:this.props.get("title")})}onClick_(t){this.emitter.emit("click",{nativeEvent:t,sender:this})}},_l=class extends Xs{constructor(t,e){let i=new Nh(t,{props:e.buttonProps,viewProps:e.viewProps}),s=new gl(t,{blade:e.blade,props:e.labelProps,valueController:i});super({blade:e.blade,view:s.view,viewProps:e.viewProps}),this.buttonController=i,this.labelController=s}importState(t){return nn(t,e=>super.importState(e)&&this.buttonController.importProps(e)&&this.labelController.importProps(e),()=>({}),()=>!0)}exportState(){return sn(()=>super.exportState(),Object.assign(Object.assign({},this.buttonController.exportProps()),this.labelController.exportProps()))}},xl=class{constructor(t){let[e,i]=t.split("-"),s=e.split(".");this.major=parseInt(s[0],10),this.minor=parseInt(s[1],10),this.patch=parseInt(s[2],10),this.prerelease=i??null}toString(){let t=[this.major,this.minor,this.patch].join(".");return this.prerelease!==null?[t,this.prerelease].join("-"):t}},Zs=new xl("2.0.5");function We(n){return Object.assign({core:Zs},n)}var gy=We({id:"button",type:"blade",accept(n){let t=ue(n,e=>({title:e.required.string,view:e.required.constant("button"),label:e.optional.string}));return t?{params:t}:null},controller(n){return new _l(n.document,{blade:n.blade,buttonProps:zt.fromObject({title:n.params.title}),labelProps:zt.fromObject({label:n.params.label}),viewProps:n.viewProps})},api(n){return n.controller instanceof _l?new Lh(n.controller):null}});function vy(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"button"}))}function _y(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"folder"}))}function xy(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"tab"}))}function by(n){return zu(n)?"refresh"in n&&typeof n.refresh=="function":!1}function yy(n,t){if(!pl.isBindable(n))throw Pe.notBindable();return new pl(n,t)}var Uh=class{constructor(t,e){this.onRackValueChange_=this.onRackValueChange_.bind(this),this.controller_=t,this.emitter_=new me,this.pool_=e,this.controller_.rack.emitter.on("valuechange",this.onRackValueChange_)}get children(){return this.controller_.rack.children.map(t=>this.pool_.createApi(t))}addBinding(t,e,i){let s=i??{},r=this.controller_.element.ownerDocument,a=this.pool_.createBinding(r,yy(t,e),s),o=this.pool_.createBindingApi(a);return this.add(o,s.index)}addFolder(t){return _y(this,t)}addButton(t){return vy(this,t)}addTab(t){return xy(this,t)}add(t,e){let i=t.controller;return this.controller_.rack.add(i,e),t}remove(t){this.controller_.rack.remove(t.controller)}addBlade(t){let e=this.controller_.element.ownerDocument,i=this.pool_.createBlade(e,t),s=this.pool_.createApi(i);return this.add(s,t.index)}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.children.forEach(t=>{by(t)&&t.refresh()})}onRackValueChange_(t){let e=t.bladeController,i=this.pool_.createApi(e),s=Vf(e.value)?e.value.binding:null;this.emitter_.emit("change",new es(i,s?s.target.read():e.value.rawValue,t.options.last))}},Vr=class extends ei{constructor(t,e){super(t),this.rackApi_=new Uh(t.rackController,e)}refresh(){this.rackApi_.refresh()}},zr=class extends Xs{constructor(t){super({blade:t.blade,view:t.view,viewProps:t.rackController.viewProps}),this.rackController=t.rackController}importState(t){return nn(t,e=>super.importState(e),e=>({children:e.required.array(e.required.raw)}),e=>this.rackController.rack.children.every((i,s)=>i.importState(e.children[s])))}exportState(){return sn(()=>super.exportState(),{children:this.rackController.rack.children.map(t=>t.exportState())})}};function Oh(n){return"rackController"in n}var Bh=class{constructor(t){this.emitter=new me,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=t}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(t){for(let e of this.allItems())if(t(e))return e;return null}includes(t){return this.cache_.has(t)}add(t,e){if(this.includes(t))throw Pe.shouldNeverHappen();let i=e!==void 0?e:this.items_.length;this.items_.splice(i,0,t),this.cache_.add(t);let s=this.extract_(t);s&&(s.emitter.on("add",this.onSubListAdd_),s.emitter.on("remove",this.onSubListRemove_),s.allItems().forEach(r=>{this.cache_.add(r)})),this.emitter.emit("add",{index:i,item:t,root:this,target:this})}remove(t){let e=this.items_.indexOf(t);if(e<0)return;this.items_.splice(e,1),this.cache_.delete(t);let i=this.extract_(t);i&&(i.allItems().forEach(s=>{this.cache_.delete(s)}),i.emitter.off("add",this.onSubListAdd_),i.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:e,item:t,root:this,target:this})}onSubListAdd_(t){this.cache_.add(t.item),this.emitter.emit("add",{index:t.index,item:t.item,root:this,target:t.target})}onSubListRemove_(t){this.cache_.delete(t.item),this.emitter.emit("remove",{index:t.index,item:t.item,root:this,target:t.target})}};function wy(n,t){for(let e=0;e<n.length;e++){let i=n[e];if(Ki(i)&&i.value===t)return i}return null}function My(n){return Oh(n)?n.rackController.rack.bcSet_:null}var kh=class{constructor(t){var e,i;this.emitter=new me,this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onRackLayout_=this.onRackLayout_.bind(this),this.onRackValueChange_=this.onRackValueChange_.bind(this),this.blade_=(e=t.blade)!==null&&e!==void 0?e:null,(i=this.blade_)===null||i===void 0||i.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=t.viewProps,this.bcSet_=new Bh(My),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(t,e){var i;(i=t.parent)===null||i===void 0||i.remove(t),t.parent=this,this.bcSet_.add(t,e)}remove(t){t.parent=null,this.bcSet_.remove(t)}find(t){return this.bcSet_.allItems().filter(t)}onSetAdd_(t){this.updatePositions_();let e=t.target===t.root;if(this.emitter.emit("add",{bladeController:t.item,index:t.index,root:e,sender:this}),!e)return;let i=t.item;if(i.viewProps.emitter.on("change",this.onChildViewPropsChange_),i.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),i.viewProps.handleDispose(this.onChildDispose_),Ki(i))i.value.emitter.on("change",this.onChildValueChange_);else if(Oh(i)){let s=i.rackController.rack;if(s){let r=s.emitter;r.on("layout",this.onRackLayout_),r.on("valuechange",this.onRackValueChange_)}}}onSetRemove_(t){this.updatePositions_();let e=t.target===t.root;if(this.emitter.emit("remove",{bladeController:t.item,root:e,sender:this}),!e)return;let i=t.item;if(Ki(i))i.value.emitter.off("change",this.onChildValueChange_);else if(Oh(i)){let s=i.rackController.rack;if(s){let r=s.emitter;r.off("layout",this.onRackLayout_),r.off("valuechange",this.onRackValueChange_)}}}updatePositions_(){let t=this.bcSet_.items.filter(s=>!s.viewProps.get("hidden")),e=t[0],i=t[t.length-1];this.bcSet_.items.forEach(s=>{let r=[];s===e&&(r.push("first"),(!this.blade_||this.blade_.get("positions").includes("veryfirst"))&&r.push("veryfirst")),s===i&&(r.push("last"),(!this.blade_||this.blade_.get("positions").includes("verylast"))&&r.push("verylast")),s.blade.set("positions",r)})}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{this.bcSet_.remove(e)})}onChildValueChange_(t){let e=wy(this.find(Ki),t.sender);if(!e)throw Pe.alreadyDisposed();this.emitter.emit("valuechange",{bladeController:e,options:t.options,sender:this})}onRackLayout_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onRackValueChange_(t){this.emitter.emit("valuechange",{bladeController:t.bladeController,options:t.options,sender:this})}onBladePositionsChange_(){this.updatePositions_()}},Hr=class{constructor(t){this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.element=t.element,this.viewProps=t.viewProps;let e=new kh({blade:t.root?void 0:t.blade,viewProps:t.viewProps});e.emitter.on("add",this.onRackAdd_),e.emitter.on("remove",this.onRackRemove_),this.rack=e,this.viewProps.handleDispose(()=>{for(let i=this.rack.children.length-1;i>=0;i--)this.rack.children[i].viewProps.set("disposed",!0)})}onRackAdd_(t){t.root&&zf(this.element,t.bladeController.view.element,t.index)}onRackRemove_(t){t.root&&Yu(t.bladeController.view.element)}};function Js(){return new zt({positions:he([],{equals:yb})})}var Gr=class n extends zt{constructor(t){super(t)}static create(t){let e={completed:!0,expanded:t,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},i=zt.createCore(e);return new n(i)}get styleExpanded(){var t;return(t=this.get("temporaryExpanded"))!==null&&t!==void 0?t:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";let t=this.get("expandedHeight");return this.get("shouldFixHeight")&&!ae(t)?`${t}px`:"auto"}bindExpandedClass(t,e){let i=()=>{this.styleExpanded?t.classList.add(e):t.classList.remove(e)};Fn(this,"expanded",i),Fn(this,"temporaryExpanded",i)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}};function Sy(n,t){let e=0;return Qb(t,()=>{n.set("expandedHeight",null),n.set("temporaryExpanded",!0),fl(t),e=t.clientHeight,n.set("temporaryExpanded",null),fl(t)}),e}function hf(n,t){t.style.height=n.styleHeight}function Zu(n,t){n.value("expanded").emitter.on("beforechange",()=>{if(n.set("completed",!1),ae(n.get("expandedHeight"))){let e=Sy(n,t);e>0&&n.set("expandedHeight",e)}n.set("shouldFixHeight",!0),fl(t)}),n.emitter.on("change",()=>{hf(n,t)}),hf(n,t),t.addEventListener("transitionend",e=>{e.propertyName==="height"&&n.cleanUpTransition()})}var bl=class extends Vr{constructor(t,e){super(t,e),this.emitter_=new me,this.controller.foldable.value("expanded").emitter.on("change",i=>{this.emitter_.emit("fold",new Eh(this,i.sender.rawValue))}),this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)})}get expanded(){return this.controller.foldable.get("expanded")}set expanded(t){this.controller.foldable.set("expanded",t)}get title(){return this.controller.props.get("title")}set title(t){this.controller.props.set("title",t)}get children(){return this.rackApi_.children}addBinding(t,e,i){return this.rackApi_.addBinding(t,e,i)}addFolder(t){return this.rackApi_.addFolder(t)}addButton(t){return this.rackApi_.addButton(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){return this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBlade(t){return this.rackApi_.addBlade(t)}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}},Xf=qt("cnt"),Vh=class{constructor(t,e){var i;this.className_=qt((i=e.viewName)!==null&&i!==void 0?i:"fld"),this.element=t.createElement("div"),this.element.classList.add(this.className_(),Xf()),e.viewProps.bindClassModifiers(this.element),this.foldable_=e.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),Fn(this.foldable_,"completed",$s(this.element,this.className_(void 0,"cpl")));let s=t.createElement("button");s.classList.add(this.className_("b")),Fn(e.props,"title",c=>{ae(c)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))}),e.viewProps.bindDisabled(s),this.element.appendChild(s),this.buttonElement=s;let r=t.createElement("div");r.classList.add(this.className_("i")),this.element.appendChild(r);let a=t.createElement("div");a.classList.add(this.className_("t")),$u(e.props.value("title"),a),this.buttonElement.appendChild(a),this.titleElement=a;let o=t.createElement("div");o.classList.add(this.className_("m")),this.buttonElement.appendChild(o);let l=t.createElement("div");l.classList.add(this.className_("c")),this.element.appendChild(l),this.containerElement=l}},Wr=class extends zr{constructor(t,e){var i;let s=Gr.create((i=e.expanded)!==null&&i!==void 0?i:!0),r=new Vh(t,{foldable:s,props:e.props,viewName:e.root?"rot":void 0,viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new Hr({blade:e.blade,element:r.containerElement,root:e.root,viewProps:e.viewProps}),view:r})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=e.props,this.foldable=s,Zu(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",()=>{this.foldable.cleanUpTransition()}),this.rackController.rack.emitter.on("remove",()=>{this.foldable.cleanUpTransition()}),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}importState(t){return nn(t,e=>super.importState(e),e=>({expanded:e.required.boolean,title:e.optional.string}),e=>(this.foldable.set("expanded",e.expanded),this.props.set("title",e.title),!0))}exportState(){return sn(()=>super.exportState(),{expanded:this.foldable.get("expanded"),title:this.props.get("title")})}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}},Ey=We({id:"folder",type:"blade",accept(n){let t=ue(n,e=>({title:e.required.string,view:e.required.constant("folder"),expanded:e.optional.boolean}));return t?{params:t}:null},controller(n){return new Wr(n.document,{blade:n.blade,expanded:n.params.expanded,props:zt.fromObject({title:n.params.title}),viewProps:n.viewProps})},api(n){return n.controller instanceof Wr?new bl(n.controller,n.pool):null}}),Ty=qt("");function uf(n,t){return $s(n,Ty(void 0,t))}var ii=class n extends zt{constructor(t){var e;super(t),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=Mb(he(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(t){var e,i,s;let r=t??{};return new n(zt.createCore({disabled:(e=r.disabled)!==null&&e!==void 0?e:!1,disposed:!1,hidden:(i=r.hidden)!==null&&i!==void 0?i:!1,parent:(s=r.parent)!==null&&s!==void 0?s:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(t){Qn(this.globalDisabled_,uf(t,"disabled")),Fn(this,"hidden",uf(t,"hidden"))}bindDisabled(t){Qn(this.globalDisabled_,e=>{t.disabled=e})}bindTabIndex(t){Qn(this.globalDisabled_,e=>{t.tabIndex=e?-1:0})}handleDispose(t){this.value("disposed").emitter.on("change",e=>{e&&t()})}importState(t){this.set("disabled",t.disabled),this.set("hidden",t.hidden)}exportState(){return{disabled:this.get("disabled"),hidden:this.get("hidden")}}getGlobalDisabled_(){let t=this.get("parent");return(t?t.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(t){var e;let i=t.previousRawValue;i?.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}},df=qt("tbp"),zh=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(df()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(df("c")),this.element.appendChild(i),this.containerElement=i}},Nr=qt("tbi"),Hh=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Nr()),e.viewProps.bindClassModifiers(this.element),Fn(e.props,"selected",r=>{r?this.element.classList.add(Nr(void 0,"sel")):this.element.classList.remove(Nr(void 0,"sel"))});let i=t.createElement("button");i.classList.add(Nr("b")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;let s=t.createElement("div");s.classList.add(Nr("t")),$u(e.props.value("title"),s),this.buttonElement.appendChild(s),this.titleElement=s}},Gh=class{constructor(t,e){this.emitter=new me,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new Hh(t,{props:e.props,viewProps:e.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}},Xr=class extends zr{constructor(t,e){let i=new zh(t,{viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new Hr({blade:e.blade,element:i.containerElement,viewProps:e.viewProps}),view:i})),this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new Gh(t,{props:e.itemProps,viewProps:ii.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.props=e.props,Fn(this.props,"selected",s=>{this.itemController.props.set("selected",s),this.viewProps.set("hidden",!s)})}get itemController(){return this.ic_}importState(t){return nn(t,e=>super.importState(e),e=>({selected:e.required.boolean,title:e.required.string}),e=>(this.ic_.props.set("selected",e.selected),this.ic_.props.set("title",e.title),!0))}exportState(){return sn(()=>super.exportState(),{selected:this.ic_.props.get("selected"),title:this.ic_.props.get("title")})}onItemClick_(){this.props.set("selected",!0)}},Wh=class extends Vr{constructor(t,e){super(t,e),this.emitter_=new me,this.onSelect_=this.onSelect_.bind(this),this.pool_=e,this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)}),this.controller.tab.selectedIndex.emitter.on("change",this.onSelect_)}get pages(){return this.rackApi_.children}addPage(t){let e=this.controller.view.element.ownerDocument,i=new Xr(e,{blade:Js(),itemProps:zt.fromObject({selected:!1,title:t.title}),props:zt.fromObject({selected:!1}),viewProps:ii.create()}),s=this.pool_.createApi(i);return this.rackApi_.add(s,t.index)}removePage(t){this.rackApi_.remove(this.rackApi_.children[t])}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}onSelect_(t){this.emitter_.emit("select",new Th(this,t.rawValue))}},Xh=class extends Vr{get title(){var t;return(t=this.controller.itemController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.itemController.props.set("title",t)}get selected(){return this.controller.props.get("selected")}set selected(t){this.controller.props.set("selected",t)}get children(){return this.rackApi_.children}addButton(t){return this.rackApi_.addButton(t)}addFolder(t){return this.rackApi_.addFolder(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBinding(t,e,i){return this.rackApi_.addBinding(t,e,i)}addBlade(t){return this.rackApi_.addBlade(t)}},pf=-1,qh=class{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=he(!0),this.selectedIndex=he(pf),this.items_=[]}add(t,e){let i=e??this.items_.length;this.items_.splice(i,0,t),t.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(t){let e=this.items_.indexOf(t);e<0||(this.items_.splice(e,1),t.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(this.items_.length===0){this.selectedIndex.rawValue=pf,this.empty.rawValue=!0;return}let t=this.items_.findIndex(e=>e.rawValue);t<0?(this.items_.forEach((e,i)=>{e.rawValue=i===0}),this.selectedIndex.rawValue=0):(this.items_.forEach((e,i)=>{e.rawValue=i===t}),this.selectedIndex.rawValue=t),this.empty.rawValue=!1}onItemSelectedChange_(t){if(t.rawValue){let e=this.items_.findIndex(i=>i===t.sender);this.items_.forEach((i,s)=>{i.rawValue=s===e}),this.selectedIndex.rawValue=e}else this.keepSelection_()}},Ur=qt("tab"),Yh=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Ur(),Xf()),e.viewProps.bindClassModifiers(this.element),Qn(e.empty,$s(this.element,Ur(void 0,"nop")));let i=t.createElement("div");i.classList.add(Ur("t")),this.element.appendChild(i),this.itemsElement=i;let s=t.createElement("div");s.classList.add(Ur("i")),this.element.appendChild(s);let r=t.createElement("div");r.classList.add(Ur("c")),this.element.appendChild(r),this.contentsElement=r}},yl=class extends zr{constructor(t,e){let i=new qh,s=new Yh(t,{empty:i.empty,viewProps:e.viewProps});super({blade:e.blade,rackController:new Hr({blade:e.blade,element:s.contentsElement,viewProps:e.viewProps}),view:s}),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);let r=this.rackController.rack;r.emitter.on("add",this.onRackAdd_),r.emitter.on("remove",this.onRackRemove_),this.tab=i}add(t,e){this.rackController.rack.add(t,e)}remove(t){this.rackController.rack.remove(this.rackController.rack.children[t])}onRackAdd_(t){if(!t.root)return;let e=t.bladeController;zf(this.view.itemsElement,e.itemController.view.element,t.index),e.itemController.viewProps.set("parent",this.viewProps),this.tab.add(e.props.value("selected"))}onRackRemove_(t){if(!t.root)return;let e=t.bladeController;Yu(e.itemController.view.element),e.itemController.viewProps.set("parent",null),this.tab.remove(e.props.value("selected"))}},qf=We({id:"tab",type:"blade",accept(n){let t=ue(n,e=>({pages:e.required.array(e.required.object({title:e.required.string})),view:e.required.constant("tab")}));return!t||t.pages.length===0?null:{params:t}},controller(n){let t=new yl(n.document,{blade:n.blade,viewProps:n.viewProps});return n.params.pages.forEach(e=>{let i=new Xr(n.document,{blade:Js(),itemProps:zt.fromObject({selected:!1,title:e.title}),props:zt.fromObject({selected:!1}),viewProps:ii.create()});t.add(i)}),t},api(n){return n.controller instanceof yl?new Wh(n.controller,n.pool):n.controller instanceof Xr?new Xh(n.controller,n.pool):null}});function Cy(n,t){let e=n.accept(t.params);if(!e)return null;let i=ue(t.params,s=>({disabled:s.optional.boolean,hidden:s.optional.boolean}));return n.controller({blade:Js(),document:t.document,params:Object.assign(Object.assign({},e.params),{disabled:i?.disabled,hidden:i?.hidden}),viewProps:ii.create({disabled:i?.disabled,hidden:i?.hidden})})}var qr=class extends ns{get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}},$h=class{constructor(){this.disabled=!1,this.emitter=new me}dispose(){}tick(){this.disabled||this.emitter.emit("tick",{sender:this})}},Zh=class{constructor(t,e){this.disabled_=!1,this.timerId_=null,this.onTick_=this.onTick_.bind(this),this.doc_=t,this.emitter=new me,this.interval_=e,this.setTimer_()}get disabled(){return this.disabled_}set disabled(t){this.disabled_=t,this.disabled_?this.clearTimer_():this.setTimer_()}dispose(){this.clearTimer_()}clearTimer_(){if(this.timerId_===null)return;let t=this.doc_.defaultView;t&&t.clearInterval(this.timerId_),this.timerId_=null}setTimer_(){if(this.clearTimer_(),this.interval_<=0)return;let t=this.doc_.defaultView;t&&(this.timerId_=t.setInterval(this.onTick_,this.interval_))}onTick_(){this.disabled_||this.emitter.emit("tick",{sender:this})}},is=class{constructor(t){this.constraints=t}constrain(t){return this.constraints.reduce((e,i)=>i.constrain(e),t)}};function wl(n,t){if(n instanceof t)return n;if(n instanceof is){let e=n.constraints.reduce((i,s)=>i||(s instanceof t?s:null),null);if(e)return e}return null}var ss=class{constructor(t){this.values=zt.fromObject({options:t})}constrain(t){let e=this.values.get("options");return e.length===0||e.filter(s=>s.value===t).length>0?t:e[0].value}};function ea(n){var t;let e=Ph;if(Array.isArray(n))return(t=ue({items:n},i=>({items:i.required.array(i.required.object({text:i.required.string,value:i.required.raw}))})))===null||t===void 0?void 0:t.items;if(typeof n=="object")return e.required.raw(n).value}function Ju(n){if(Array.isArray(n))return n;let t=[];return Object.keys(n).forEach(e=>{t.push({text:e,value:n[e]})}),t}function ju(n){return ae(n)?null:new ss(Ju(n))}var ch=qt("lst"),Jh=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.element=t.createElement("div"),this.element.classList.add(ch()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("select");i.classList.add(ch("s")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.selectElement=i;let s=t.createElement("div");s.classList.add(ch("m")),s.appendChild(Al(t,"dropdown")),this.element.appendChild(s),e.value.emitter.on("change",this.onValueChange_),this.value_=e.value,Fn(this.props_,"options",r=>{Hf(this.selectElement),r.forEach(a=>{let o=t.createElement("option");o.textContent=a.text,this.selectElement.appendChild(o)}),this.update_()})}update_(){let t=this.props_.get("options").map(e=>e.value);this.selectElement.selectedIndex=t.indexOf(this.value_.rawValue)}onValueChange_(){this.update_()}},Nn=class{constructor(t,e){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new Jh(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(t){let e=t.currentTarget;this.value.rawValue=this.props.get("options")[e.selectedIndex].value}importProps(t){return nn(t,null,e=>({options:e.required.custom(ea)}),e=>(this.props.set("options",Ju(e.options)),!0))}exportProps(){return sn(null,{options:this.props.get("options")})}},ff=qt("pop"),jh=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ff()),e.viewProps.bindClassModifiers(this.element),Qn(e.shows,$s(this.element,ff(void 0,"v")))}},Ml=class{constructor(t,e){this.shows=he(!1),this.viewProps=e.viewProps,this.view=new jh(t,{shows:this.shows,viewProps:this.viewProps})}},mf=qt("txt"),Kh=class{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(mf()),e.viewProps.bindClassModifiers(this.element),this.props_=e.props,this.props_.emitter.on("change",this.onChange_);let i=t.createElement("input");i.classList.add(mf("i")),i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,e.value.emitter.on("change",this.onChange_),this.value_=e.value,this.refresh()}refresh(){let t=this.props_.get("formatter");this.inputElement.value=t(this.value_.rawValue)}onChange_(){this.refresh()}},rs=class{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=e.parser,this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new Kh(t,{props:e.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(t){let i=t.currentTarget.value,s=this.parser_(i);ae(s)||(this.value.rawValue=s),this.view.refresh()}};function Ay(n){return String(n)}function Yf(n){return n==="false"?!1:!!n}function gf(n){return Ay(n)}function Py(n){return t=>n.reduce((e,i)=>e!==null?e:i(t),null)}var Ry=qe(0);function Sl(n){return Ry(n)+"%"}function $f(n){return String(n)}function Qh(n){return n}function js({primary:n,secondary:t,forward:e,backward:i}){let s=!1;function r(a){s||(s=!0,a(),s=!1)}n.emitter.on("change",a=>{r(()=>{t.setRawValue(e(n.rawValue,t.rawValue),a.options)})}),t.emitter.on("change",a=>{r(()=>{n.setRawValue(i(n.rawValue,t.rawValue),a.options)}),r(()=>{t.setRawValue(e(n.rawValue,t.rawValue),a.options)})}),r(()=>{t.setRawValue(e(n.rawValue,t.rawValue),{forceEmit:!1,last:!0})})}function Xe(n,t){let e=n*(t.altKey?.1:1)*(t.shiftKey?10:1);return t.upKey?+e:t.downKey?-e:0}function Yr(n){return{altKey:n.altKey,downKey:n.key==="ArrowDown",shiftKey:n.shiftKey,upKey:n.key==="ArrowUp"}}function si(n){return{altKey:n.altKey,downKey:n.key==="ArrowLeft",shiftKey:n.shiftKey,upKey:n.key==="ArrowRight"}}function Iy(n){return n==="ArrowUp"||n==="ArrowDown"}function Zf(n){return Iy(n)||n==="ArrowLeft"||n==="ArrowRight"}function hh(n,t){var e,i;let s=t.ownerDocument.defaultView,r=t.getBoundingClientRect();return{x:n.pageX-(((e=s&&s.scrollX)!==null&&e!==void 0?e:0)+r.left),y:n.pageY-(((i=s&&s.scrollY)!==null&&i!==void 0?i:0)+r.top)}}var ri=class{constructor(t){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=t,this.emitter=new me,t.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),t.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),t.addEventListener("touchend",this.onTouchEnd_),t.addEventListener("mousedown",this.onMouseDown_)}computePosition_(t){let e=this.elem_.getBoundingClientRect();return{bounds:{width:e.width,height:e.height},point:t?{x:t.x,y:t.y}:null}}onMouseDown_(t){var e;t.preventDefault(),(e=t.currentTarget)===null||e===void 0||e.focus();let i=this.elem_.ownerDocument;i.addEventListener("mousemove",this.onDocumentMouseMove_),i.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(hh(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseMove_(t){this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(hh(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseUp_(t){let e=this.elem_.ownerDocument;e.removeEventListener("mousemove",this.onDocumentMouseMove_),e.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(hh(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onTouchStart_(t){t.preventDefault();let e=t.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-i.left,y:e.clientY-i.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchMove_(t){let e=t.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-i.left,y:e.clientY-i.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchEnd_(t){var e;let i=(e=t.targetTouches.item(0))!==null&&e!==void 0?e:this.lastTouch_,s=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(i?{x:i.clientX-s.left,y:i.clientY-s.top}:void 0),sender:this,shiftKey:t.shiftKey})}},cn=qt("txt"),tu=class{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(cn(),cn(void 0,"num")),e.arrayPosition&&this.element.classList.add(cn(void 0,e.arrayPosition)),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("input");i.classList.add(cn("i")),i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=e.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(cn()),this.inputElement.classList.add(cn("i"));let s=t.createElement("div");s.classList.add(cn("k")),this.element.appendChild(s),this.knobElement=s;let r=t.createElementNS(Dn,"svg");r.classList.add(cn("g")),this.knobElement.appendChild(r);let a=t.createElementNS(Dn,"path");a.classList.add(cn("gb")),r.appendChild(a),this.guideBodyElem_=a;let o=t.createElementNS(Dn,"path");o.classList.add(cn("gh")),r.appendChild(o),this.guideHeadElem_=o;let l=t.createElement("div");l.classList.add(qt("tt")()),this.knobElement.appendChild(l),this.tooltipElem_=l,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.refresh()}onDraggingChange_(t){if(t.rawValue===null){this.element.classList.remove(cn(void 0,"drg"));return}this.element.classList.add(cn(void 0,"drg"));let e=t.rawValue/this.props_.get("pointerScale"),i=e+(e>0?-1:e<0?1:0),s=Se(-i,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${i+s},0 L${i},4 L${i+s},8`,`M ${e},-1 L${e},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${e},4`);let r=this.props_.get("formatter");this.tooltipElem_.textContent=r(this.value.rawValue),this.tooltipElem_.style.left=`${e}px`}refresh(){let t=this.props_.get("formatter");this.inputElement.value=t(this.value.rawValue)}onChange_(){this.refresh()}},as=class{constructor(t,e){var i;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.parser_=e.parser,this.props=e.props,this.sliderProps_=(i=e.sliderProps)!==null&&i!==void 0?i:null,this.value=e.value,this.viewProps=e.viewProps,this.dragging_=he(null),this.view=new tu(t,{arrayPosition:e.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);let s=new ri(this.view.knobElement);s.emitter.on("down",this.onPointerDown_),s.emitter.on("move",this.onPointerMove_),s.emitter.on("up",this.onPointerUp_)}constrainValue_(t){var e,i;let s=(e=this.sliderProps_)===null||e===void 0?void 0:e.get("min"),r=(i=this.sliderProps_)===null||i===void 0?void 0:i.get("max"),a=t;return s!==void 0&&(a=Math.max(a,s)),r!==void 0&&(a=Math.min(a,r)),a}onInputChange_(t){let i=t.currentTarget.value,s=this.parser_(i);ae(s)||(this.value.rawValue=this.constrainValue_(s)),this.view.refresh()}onInputKeyDown_(t){let e=Xe(this.props.get("keyScale"),Yr(t));e!==0&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+e),{forceEmit:!1,last:!1})}onInputKeyUp_(t){Xe(this.props.get("keyScale"),Yr(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(t){if(!t.point)return null;let e=t.point.x-t.bounds.width/2;return this.constrainValue_(this.originRawValue_+e*this.props.get("pointerScale"))}onPointerMove_(t){let e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(t){let e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}},uh=qt("sld"),eu=class{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(uh()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(uh("t")),e.viewProps.bindTabIndex(i),this.element.appendChild(i),this.trackElement=i;let s=t.createElement("div");s.classList.add(uh("k")),this.trackElement.appendChild(s),this.knobElement=s,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.update_()}update_(){let t=Se(jt(this.value.rawValue,this.props_.get("min"),this.props_.get("max"),0,100),0,100);this.knobElement.style.width=`${t}%`}onChange_(){this.update_()}},nu=class{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.props=e.props,this.view=new eu(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new ri(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){t.point&&this.value.setRawValue(jt(Se(t.point.x,0,t.bounds.width),0,t.bounds.width,this.props.get("min"),this.props.get("max")),e)}onPointerDownOrMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){let e=Xe(this.props.get("keyScale"),si(t));e!==0&&this.value.setRawValue(this.value.rawValue+e,{forceEmit:!1,last:!1})}onKeyUp_(t){Xe(this.props.get("keyScale"),si(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}},dh=qt("sldtxt"),iu=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(dh());let i=t.createElement("div");i.classList.add(dh("s")),this.sliderView_=e.sliderView,i.appendChild(this.sliderView_.element),this.element.appendChild(i);let s=t.createElement("div");s.classList.add(dh("t")),this.textView_=e.textView,s.appendChild(this.textView_.element),this.element.appendChild(s)}},qs=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.sliderC_=new nu(t,{props:e.sliderProps,value:e.value,viewProps:this.viewProps}),this.textC_=new as(t,{parser:e.parser,props:e.textProps,sliderProps:e.sliderProps,value:e.value,viewProps:e.viewProps}),this.view=new iu(t,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}importProps(t){return nn(t,null,e=>({max:e.required.number,min:e.required.number}),e=>{let i=this.sliderC_.props;return i.set("max",e.max),i.set("min",e.min),!0})}exportProps(){let t=this.sliderC_.props;return sn(null,{max:t.get("max"),min:t.get("min")})}};function Jf(n){return{sliderProps:new zt({keyScale:n.keyScale,max:n.max,min:n.min}),textProps:new zt({formatter:he(n.formatter),keyScale:n.keyScale,pointerScale:he(n.pointerScale)})}}var Dy={containerUnitSize:"cnt-usz"};function jf(n){return`--${Dy[n]}`}function $r(n){return kf(n)}function Ri(n){if(gh(n))return ue(n,$r)}function Kn(n,t){if(!n)return;let e=[],i=Uf(n,t);i&&e.push(i);let s=Of(n);return s&&e.push(s),new is(e)}function Ly(n){return n?n.major===Zs.major:!1}function Kf(n){if(n==="inline"||n==="popup")return n}function na(n,t){n.write(t)}var hl=qt("ckb"),su=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(hl()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("label");i.classList.add(hl("l")),this.element.appendChild(i),this.labelElement=i;let s=t.createElement("input");s.classList.add(hl("i")),s.type="checkbox",this.labelElement.appendChild(s),this.inputElement=s,e.viewProps.bindDisabled(this.inputElement);let r=t.createElement("div");r.classList.add(hl("w")),this.labelElement.appendChild(r);let a=Al(t,"check");r.appendChild(a),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}},ru=class{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.onLabelMouseDown_=this.onLabelMouseDown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new su(t,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.labelElement.addEventListener("mousedown",this.onLabelMouseDown_)}onInputChange_(t){let e=t.currentTarget;this.value.rawValue=e.checked,t.preventDefault(),t.stopPropagation()}onLabelMouseDown_(t){t.preventDefault()}};function Fy(n){let t=[],e=ju(n.options);return e&&t.push(e),new is(t)}var Ny=We({id:"input-bool",type:"input",accept:(n,t)=>{if(typeof n!="boolean")return null;let e=ue(t,i=>({options:i.optional.custom(ea),readonly:i.optional.constant(!1)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Yf,constraint:n=>Fy(n.params),writer:n=>na},controller:n=>{let t=n.document,e=n.value,i=n.constraint,s=i&&wl(i,ss);return s?new Nn(t,{props:new zt({options:s.values.value("options")}),value:e,viewProps:n.viewProps}):new ru(t,{value:e,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="boolean"?null:n.controller.valueController instanceof Nn?new qr(n.controller):null}}),ji=qt("col"),au=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ji()),e.foldable.bindExpandedClass(this.element,ji(void 0,"expanded")),Fn(e.foldable,"completed",$s(this.element,ji(void 0,"cpl")));let i=t.createElement("div");i.classList.add(ji("h")),this.element.appendChild(i);let s=t.createElement("div");s.classList.add(ji("s")),i.appendChild(s),this.swatchElement=s;let r=t.createElement("div");if(r.classList.add(ji("t")),i.appendChild(r),this.textElement=r,e.pickerLayout==="inline"){let a=t.createElement("div");a.classList.add(ji("p")),this.element.appendChild(a),this.pickerElement=a}else this.pickerElement=null}};function Uy(n,t,e){let i=Se(n/255,0,1),s=Se(t/255,0,1),r=Se(e/255,0,1),a=Math.max(i,s,r),o=Math.min(i,s,r),l=a-o,c=0,h=0,d=(o+a)/2;return l!==0&&(h=l/(1-Math.abs(a+o-1)),i===a?c=(s-r)/l:s===a?c=2+(r-i)/l:c=4+(i-s)/l,c=c/6+(c<0?1:0)),[c*360,h*100,d*100]}function Oy(n,t,e){let i=(n%360+360)%360,s=Se(t/100,0,1),r=Se(e/100,0,1),a=(1-Math.abs(2*r-1))*s,o=a*(1-Math.abs(i/60%2-1)),l=r-a/2,c,h,d;return i>=0&&i<60?[c,h,d]=[a,o,0]:i>=60&&i<120?[c,h,d]=[o,a,0]:i>=120&&i<180?[c,h,d]=[0,a,o]:i>=180&&i<240?[c,h,d]=[0,o,a]:i>=240&&i<300?[c,h,d]=[o,0,a]:[c,h,d]=[a,0,o],[(c+l)*255,(h+l)*255,(d+l)*255]}function By(n,t,e){let i=Se(n/255,0,1),s=Se(t/255,0,1),r=Se(e/255,0,1),a=Math.max(i,s,r),o=Math.min(i,s,r),l=a-o,c;l===0?c=0:a===i?c=60*(((s-r)/l%6+6)%6):a===s?c=60*((r-i)/l+2):c=60*((i-s)/l+4);let h=a===0?0:l/a,d=a;return[c,h*100,d*100]}function Qf(n,t,e){let i=Lf(n,360),s=Se(t/100,0,1),r=Se(e/100,0,1),a=r*s,o=a*(1-Math.abs(i/60%2-1)),l=r-a,c,h,d;return i>=0&&i<60?[c,h,d]=[a,o,0]:i>=60&&i<120?[c,h,d]=[o,a,0]:i>=120&&i<180?[c,h,d]=[0,a,o]:i>=180&&i<240?[c,h,d]=[0,o,a]:i>=240&&i<300?[c,h,d]=[o,0,a]:[c,h,d]=[a,0,o],[(c+l)*255,(h+l)*255,(d+l)*255]}function ky(n,t,e){let i=e+t*(100-Math.abs(2*e-100))/200;return[n,i!==0?t*(100-Math.abs(2*e-100))/i:0,e+t*(100-Math.abs(2*e-100))/200]}function Vy(n,t,e){let i=100-Math.abs(e*(200-t)/100-100);return[n,i!==0?t*e/i:0,e*(200-t)/200]}function Un(n){return[n[0],n[1],n[2]]}function Pl(n,t){return[n[0],n[1],n[2],t]}var zy={hsl:{hsl:(n,t,e)=>[n,t,e],hsv:ky,rgb:Oy},hsv:{hsl:Vy,hsv:(n,t,e)=>[n,t,e],rgb:Qf},rgb:{hsl:Uy,hsv:By,rgb:(n,t,e)=>[n,t,e]}};function Ys(n,t){return[t==="float"?1:n==="rgb"?255:360,t==="float"?1:n==="rgb"?255:100,t==="float"?1:n==="rgb"?255:100]}function Hy(n,t){return n===t?t:Lf(n,t)}function tm(n,t,e){var i;let s=Ys(t,e);return[t==="rgb"?Se(n[0],0,s[0]):Hy(n[0],s[0]),Se(n[1],0,s[1]),Se(n[2],0,s[2]),Se((i=n[3])!==null&&i!==void 0?i:1,0,1)]}function vf(n,t,e,i){let s=Ys(t,e),r=Ys(t,i);return n.map((a,o)=>a/s[o]*r[o])}function em(n,t,e){let i=vf(n,t.mode,t.type,"int"),s=zy[t.mode][e.mode](...i);return vf(s,e.mode,"int",e.type)}var $t=class n{static black(){return new n([0,0,0],"rgb")}constructor(t,e){this.type="int",this.mode=e,this.comps_=tm(t,e,this.type)}getComponents(t){return Pl(em(Un(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){let t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}},Ci=qt("colp"),ou=class{constructor(t,e){this.alphaViews_=null,this.element=t.createElement("div"),this.element.classList.add(Ci()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(Ci("hsv"));let s=t.createElement("div");s.classList.add(Ci("sv")),this.svPaletteView_=e.svPaletteView,s.appendChild(this.svPaletteView_.element),i.appendChild(s);let r=t.createElement("div");r.classList.add(Ci("h")),this.hPaletteView_=e.hPaletteView,r.appendChild(this.hPaletteView_.element),i.appendChild(r),this.element.appendChild(i);let a=t.createElement("div");if(a.classList.add(Ci("rgb")),this.textsView_=e.textsView,a.appendChild(this.textsView_.element),this.element.appendChild(a),e.alphaViews){this.alphaViews_={palette:e.alphaViews.palette,text:e.alphaViews.text};let o=t.createElement("div");o.classList.add(Ci("a"));let l=t.createElement("div");l.classList.add(Ci("ap")),l.appendChild(this.alphaViews_.palette.element),o.appendChild(l);let c=t.createElement("div");c.classList.add(Ci("at")),c.appendChild(this.alphaViews_.text.element),o.appendChild(c),this.element.appendChild(o)}}get allFocusableElements(){let t=[this.svPaletteView_.element,this.hPaletteView_.element,this.textsView_.modeSelectElement,...this.textsView_.inputViews.map(e=>e.inputElement)];return this.alphaViews_&&t.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),t}};function Gy(n){return n==="int"?"int":n==="float"?"float":void 0}function Ku(n){return ue(n,t=>({color:t.optional.object({alpha:t.optional.boolean,type:t.optional.custom(Gy)}),expanded:t.optional.boolean,picker:t.optional.custom(Kf),readonly:t.optional.constant(!1)}))}function os(n){return n?.1:1}function nm(n){var t;return(t=n.color)===null||t===void 0?void 0:t.type}var Zr=class{constructor(t,e){this.type="float",this.mode=e,this.comps_=tm(t,e,this.type)}getComponents(t){return Pl(em(Un(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){let t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}},Wy={int:(n,t)=>new $t(n,t),float:(n,t)=>new Zr(n,t)};function Qu(n,t,e){return Wy[e](n,t)}function Xy(n){return n.type==="float"}function qy(n){return n.type==="int"}function Yy(n){let t=n.getComponents(),e=Ys(n.mode,"int");return new $t([Math.round(jt(t[0],0,1,0,e[0])),Math.round(jt(t[1],0,1,0,e[1])),Math.round(jt(t[2],0,1,0,e[2])),t[3]],n.mode)}function $y(n){let t=n.getComponents(),e=Ys(n.mode,"int");return new Zr([jt(t[0],0,e[0],0,1),jt(t[1],0,e[1],0,1),jt(t[2],0,e[2],0,1),t[3]],n.mode)}function Ge(n,t){if(n.type===t)return n;if(qy(n)&&t==="float")return $y(n);if(Xy(n)&&t==="int")return Yy(n);throw Pe.shouldNeverHappen()}function Zy(n,t){return n.alpha===t.alpha&&n.mode===t.mode&&n.notation===t.notation&&n.type===t.type}function hn(n,t){let e=n.match(/^(.+)%$/);return Math.min(e?parseFloat(e[1])*.01*t:parseFloat(n),t)}var Jy={deg:n=>n,grad:n=>n*360/400,rad:n=>n*360/(2*Math.PI),turn:n=>n*360};function im(n){let t=n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!t)return parseFloat(n);let e=parseFloat(t[1]),i=t[2];return Jy[i](e)}function sm(n){let t=n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;let e=[hn(t[1],255),hn(t[2],255),hn(t[3],255)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function jy(n){let t=sm(n);return t?new $t(t,"rgb"):null}function rm(n){let t=n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;let e=[hn(t[1],255),hn(t[2],255),hn(t[3],255),hn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function Ky(n){let t=rm(n);return t?new $t(t,"rgb"):null}function am(n){let t=n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;let e=[im(t[1]),hn(t[2],100),hn(t[3],100)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function Qy(n){let t=am(n);return t?new $t(t,"hsl"):null}function om(n){let t=n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;let e=[im(t[1]),hn(t[2],100),hn(t[3],100),hn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function tw(n){let t=om(n);return t?new $t(t,"hsl"):null}function lm(n){let t=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)];let e=n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}function ew(n){let t=lm(n);return t?new $t(t,"rgb"):null}function cm(n){let t=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),jt(parseInt(t[4]+t[4],16),0,255,0,1)];let e=n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),jt(parseInt(e[4],16),0,255,0,1)]:null}function nw(n){let t=cm(n);return t?new $t(t,"rgb"):null}function hm(n){let t=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;let e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function _f(n){return t=>{let e=hm(t);return e?Qu(e,"rgb",n):null}}function um(n){let t=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;let e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]),parseFloat(t[4])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function xf(n){return t=>{let e=um(t);return e?Qu(e,"rgb",n):null}}var iw=[{parser:lm,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:cm,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:sm,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:rm,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:am,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:om,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:hm,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:um,result:{alpha:!0,mode:"rgb",notation:"object"}}];function sw(n){return iw.reduce((t,{parser:e,result:i})=>t||(e(n)?i:null),null)}function rw(n,t="int"){let e=sw(n);return e?e.notation==="hex"&&t!=="float"?Object.assign(Object.assign({},e),{type:"int"}):e.notation==="func"?Object.assign(Object.assign({},e),{type:t}):null:null}function ia(n){let t=[ew,nw,jy,Ky,Qy,tw];n==="int"&&t.push(_f("int"),xf("int")),n==="float"&&t.push(_f("float"),xf("float"));let e=Py(t);return i=>{let s=e(i);return s?Ge(s,n):null}}function aw(n){let t=ia("int");if(typeof n!="string")return $t.black();let e=t(n);return e??$t.black()}function dm(n){let t=Se(Math.floor(n),0,255).toString(16);return t.length===1?`0${t}`:t}function td(n,t="#"){let e=Un(n.getComponents("rgb")).map(dm).join("");return`${t}${e}`}function ed(n,t="#"){let e=n.getComponents("rgb"),i=[e[0],e[1],e[2],e[3]*255].map(dm).join("");return`${t}${i}`}function pm(n){let t=qe(0),e=Ge(n,"int");return`rgb(${Un(e.getComponents("rgb")).map(s=>t(s)).join(", ")})`}function ul(n){let t=qe(2),e=qe(0);return`rgba(${Ge(n,"int").getComponents("rgb").map((r,a)=>(a===3?t:e)(r)).join(", ")})`}function ow(n){let t=[qe(0),Sl,Sl],e=Ge(n,"int");return`hsl(${Un(e.getComponents("hsl")).map((s,r)=>t[r](s)).join(", ")})`}function lw(n){let t=[qe(0),Sl,Sl,qe(2)];return`hsla(${Ge(n,"int").getComponents("hsl").map((s,r)=>t[r](s)).join(", ")})`}function fm(n,t){let e=qe(t==="float"?2:0),i=["r","g","b"],s=Ge(n,t);return`{${Un(s.getComponents("rgb")).map((a,o)=>`${i[o]}: ${e(a)}`).join(", ")}}`}function cw(n){return t=>fm(t,n)}function mm(n,t){let e=qe(2),i=qe(t==="float"?2:0),s=["r","g","b","a"];return`{${Ge(n,t).getComponents("rgb").map((o,l)=>{let c=l===3?e:i;return`${s[l]}: ${c(o)}`}).join(", ")}}`}function hw(n){return t=>mm(t,n)}var uw=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:td},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:ed},{format:{alpha:!1,mode:"rgb",notation:"func",type:"int"},stringifier:pm},{format:{alpha:!0,mode:"rgb",notation:"func",type:"int"},stringifier:ul},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:ow},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:lw},...["int","float"].reduce((n,t)=>[...n,{format:{alpha:!1,mode:"rgb",notation:"object",type:t},stringifier:cw(t)},{format:{alpha:!0,mode:"rgb",notation:"object",type:t},stringifier:hw(t)}],[])];function gm(n){return uw.reduce((t,e)=>t||(Zy(e.format,n)?e.stringifier:null),null)}var Or=qt("apl"),lu=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(Or()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);let i=t.createElement("div");i.classList.add(Or("b")),this.element.appendChild(i);let s=t.createElement("div");s.classList.add(Or("c")),i.appendChild(s),this.colorElem_=s;let r=t.createElement("div");r.classList.add(Or("m")),this.element.appendChild(r),this.markerElem_=r;let a=t.createElement("div");a.classList.add(Or("p")),this.markerElem_.appendChild(a),this.previewElem_=a,this.update_()}update_(){let t=this.value.rawValue,e=t.getComponents("rgb"),i=new $t([e[0],e[1],e[2],0],"rgb"),s=new $t([e[0],e[1],e[2],255],"rgb"),r=["to right",ul(i),ul(s)];this.colorElem_.style.background=`linear-gradient(${r.join(",")})`,this.previewElem_.style.backgroundColor=ul(t);let a=jt(e[3],0,1,0,100);this.markerElem_.style.left=`${a}%`}onValueChange_(){this.update_()}},cu=class{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new lu(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new ri(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;let i=t.point.x/t.bounds.width,s=this.value.rawValue,[r,a,o]=s.getComponents("hsv");this.value.setRawValue(new $t([r,a,o,i],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){let e=Xe(os(!0),si(t));if(e===0)return;let i=this.value.rawValue,[s,r,a,o]=i.getComponents("hsv");this.value.setRawValue(new $t([s,r,a,o+e],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){Xe(os(!0),si(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}},Hs=qt("coltxt");function dw(n){let t=n.createElement("select"),e=[{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"},{text:"HEX",value:"hex"}];return t.appendChild(e.reduce((i,s)=>{let r=n.createElement("option");return r.textContent=s.text,r.value=s.value,i.appendChild(r),i},n.createDocumentFragment())),t}var hu=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Hs()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(Hs("m")),this.modeElem_=dw(t),this.modeElem_.classList.add(Hs("ms")),i.appendChild(this.modeSelectElement),e.viewProps.bindDisabled(this.modeElem_);let s=t.createElement("div");s.classList.add(Hs("mm")),s.appendChild(Al(t,"dropdown")),i.appendChild(s),this.element.appendChild(i);let r=t.createElement("div");r.classList.add(Hs("w")),this.element.appendChild(r),this.inputsElem_=r,this.inputViews_=e.inputViews,this.applyInputViews_(),Qn(e.mode,a=>{this.modeElem_.value=a})}get modeSelectElement(){return this.modeElem_}get inputViews(){return this.inputViews_}set inputViews(t){this.inputViews_=t,this.applyInputViews_()}applyInputViews_(){Hf(this.inputsElem_);let t=this.element.ownerDocument;this.inputViews_.forEach(e=>{let i=t.createElement("div");i.classList.add(Hs("c")),i.appendChild(e.element),this.inputsElem_.appendChild(i)})}};function pw(n){return qe(n==="float"?2:0)}function fw(n,t,e){let i=Ys(n,t)[e];return new ts({min:0,max:i})}function mw(n,t,e){return new as(n,{arrayPosition:e===0?"fst":e===2?"lst":"mid",parser:t.parser,props:zt.fromObject({formatter:pw(t.colorType),keyScale:os(!1),pointerScale:t.colorType==="float"?.01:1}),value:he(0,{constraint:fw(t.colorMode,t.colorType,e)}),viewProps:t.viewProps})}function gw(n,t){let e={colorMode:t.colorMode,colorType:t.colorType,parser:ti,viewProps:t.viewProps};return[0,1,2].map(i=>{let s=mw(n,e,i);return js({primary:t.value,secondary:s.value,forward(r){return Ge(r,t.colorType).getComponents(t.colorMode)[i]},backward(r,a){let o=t.colorMode,c=Ge(r,t.colorType).getComponents(o);c[i]=a;let h=Qu(Pl(Un(c),c[3]),o,t.colorType);return Ge(h,"int")}}),s})}function vw(n,t){let e=new rs(n,{parser:ia("int"),props:zt.fromObject({formatter:td}),value:he($t.black()),viewProps:t.viewProps});return js({primary:t.value,secondary:e.value,forward:i=>new $t(Un(i.getComponents()),i.mode),backward:(i,s)=>new $t(Pl(Un(s.getComponents(i.mode)),i.getComponents()[3]),i.mode)}),[e]}function _w(n){return n!=="hex"}var uu=class{constructor(t,e){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=e.colorType,this.value=e.value,this.viewProps=e.viewProps,this.colorMode=he(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(t),this.view=new hu(t,{mode:this.colorMode,inputViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(t){let e=this.colorMode.rawValue;return _w(e)?gw(t,{colorMode:e,colorType:this.colorType_,value:this.value,viewProps:this.viewProps}):vw(t,{value:this.value,viewProps:this.viewProps})}onModeSelectChange_(t){let e=t.currentTarget;this.colorMode.rawValue=e.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.inputViews=this.ccs_.map(i=>i.view)}},ph=qt("hpl"),du=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(ph()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);let i=t.createElement("div");i.classList.add(ph("c")),this.element.appendChild(i);let s=t.createElement("div");s.classList.add(ph("m")),this.element.appendChild(s),this.markerElem_=s,this.update_()}update_(){let t=this.value.rawValue,[e]=t.getComponents("hsv");this.markerElem_.style.backgroundColor=pm(new $t([e,100,100],"hsv"));let i=jt(e,0,360,0,100);this.markerElem_.style.left=`${i}%`}onValueChange_(){this.update_()}},pu=class{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new du(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new ri(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;let i=jt(Se(t.point.x,0,t.bounds.width),0,t.bounds.width,0,360),s=this.value.rawValue,[,r,a,o]=s.getComponents("hsv");this.value.setRawValue(new $t([i,r,a,o],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){let e=Xe(os(!1),si(t));if(e===0)return;let i=this.value.rawValue,[s,r,a,o]=i.getComponents("hsv");this.value.setRawValue(new $t([s+e,r,a,o],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){Xe(os(!1),si(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}},fh=qt("svp"),bf=64,fu=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(fh()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);let i=t.createElement("canvas");i.height=bf,i.width=bf,i.classList.add(fh("c")),this.element.appendChild(i),this.canvasElement=i;let s=t.createElement("div");s.classList.add(fh("m")),this.element.appendChild(s),this.markerElem_=s,this.update_()}update_(){let t=ny(this.canvasElement);if(!t)return;let i=this.value.rawValue.getComponents("hsv"),s=this.canvasElement.width,r=this.canvasElement.height,a=t.getImageData(0,0,s,r),o=a.data;for(let h=0;h<r;h++)for(let d=0;d<s;d++){let u=jt(d,0,s,0,100),f=jt(h,0,r,100,0),g=Qf(i[0],u,f),b=(h*s+d)*4;o[b]=g[0],o[b+1]=g[1],o[b+2]=g[2],o[b+3]=255}t.putImageData(a,0,0);let l=jt(i[1],0,100,0,100);this.markerElem_.style.left=`${l}%`;let c=jt(i[2],0,100,100,0);this.markerElem_.style.top=`${c}%`}onValueChange_(){this.update_()}},mu=class{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new fu(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new ri(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;let i=jt(t.point.x,0,t.bounds.width,0,100),s=jt(t.point.y,0,t.bounds.height,100,0),[r,,,a]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new $t([r,i,s,a],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){Zf(t.key)&&t.preventDefault();let[e,i,s,r]=this.value.rawValue.getComponents("hsv"),a=os(!1),o=Xe(a,si(t)),l=Xe(a,Yr(t));o===0&&l===0||this.value.setRawValue(new $t([e,i+o,s+l,r],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){let e=os(!1),i=Xe(e,si(t)),s=Xe(e,Yr(t));i===0&&s===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}},gu=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.hPaletteC_=new pu(t,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new mu(t,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=e.supportsAlpha?{palette:new cu(t,{value:this.value,viewProps:this.viewProps}),text:new as(t,{parser:ti,props:zt.fromObject({pointerScale:.01,keyScale:.1,formatter:qe(2)}),value:he(0,{constraint:new ts({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&js({primary:this.value,secondary:this.alphaIcs_.text.value,forward:i=>i.getComponents()[3],backward:(i,s)=>{let r=i.getComponents();return r[3]=s,new $t(r,i.mode)}}),this.textsC_=new uu(t,{colorType:e.colorType,value:this.value,viewProps:this.viewProps}),this.view=new ou(t,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:e.supportsAlpha,svPaletteView:this.svPaletteC_.view,textsView:this.textsC_.view,viewProps:this.viewProps})}get textsController(){return this.textsC_}},mh=qt("colsw"),vu=class{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.element=t.createElement("div"),this.element.classList.add(mh()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(mh("sw")),this.element.appendChild(i),this.swatchElem_=i;let s=t.createElement("button");s.classList.add(mh("b")),e.viewProps.bindDisabled(s),this.element.appendChild(s),this.buttonElement=s,this.update_()}update_(){let t=this.value.rawValue;this.swatchElem_.style.backgroundColor=ed(t)}onValueChange_(){this.update_()}},_u=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new vu(t,{value:this.value,viewProps:this.viewProps})}},Jr=class{constructor(t,e){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=Gr.create(e.expanded),this.swatchC_=new _u(t,{value:this.value,viewProps:this.viewProps});let i=this.swatchC_.view.buttonElement;i.addEventListener("blur",this.onButtonBlur_),i.addEventListener("click",this.onButtonClick_),this.textC_=new rs(t,{parser:e.parser,props:zt.fromObject({formatter:e.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new au(t,{foldable:this.foldable_,pickerLayout:e.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_=e.pickerLayout==="popup"?new Ml(t,{viewProps:this.viewProps}):null;let s=new gu(t,{colorType:e.colorType,supportsAlpha:e.supportsAlpha,value:this.value,viewProps:this.viewProps});s.view.allFocusableElements.forEach(r=>{r.addEventListener("blur",this.onPopupChildBlur_),r.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=s,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(s.view.element),js({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:r=>r,backward:(r,a)=>a})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),Zu(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(t){if(!this.popC_)return;let e=this.view.element,i=t.relatedTarget;(!i||!e.contains(i))&&(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;let e=this.popC_.view.element,i=Gf(t);i&&e.contains(i)||i&&i===this.swatchC_.view.buttonElement&&!qu(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.swatchC_.view.buttonElement.focus()}};function xw(n){return Un(n.getComponents("rgb")).reduce((t,e)=>t<<8|Math.floor(e)&255,0)}function bw(n){return n.getComponents("rgb").reduce((t,e,i)=>{let s=Math.floor(i===3?e*255:e)&255;return t<<8|s},0)>>>0}function yw(n){return new $t([n>>16&255,n>>8&255,n&255],"rgb")}function ww(n){return new $t([n>>24&255,n>>16&255,n>>8&255,jt(n&255,0,255,0,1)],"rgb")}function Mw(n){return typeof n!="number"?$t.black():yw(n)}function Sw(n){return typeof n!="number"?$t.black():ww(n)}function dl(n,t){return typeof n!="object"||ae(n)?!1:t in n&&typeof n[t]=="number"}function vm(n){return dl(n,"r")&&dl(n,"g")&&dl(n,"b")}function _m(n){return vm(n)&&dl(n,"a")}function xm(n){return vm(n)}function nd(n,t){if(n.mode!==t.mode||n.type!==t.type)return!1;let e=n.getComponents(),i=t.getComponents();for(let s=0;s<e.length;s++)if(e[s]!==i[s])return!1;return!0}function yf(n){return"a"in n?[n.r,n.g,n.b,n.a]:[n.r,n.g,n.b]}function Ew(n){let t=gm(n);return t?(e,i)=>{na(e,t(i))}:null}function Tw(n){let t=n?bw:xw;return(e,i)=>{na(e,t(i))}}function Cw(n,t,e){let s=Ge(t,e).toRgbaObject();n.writeProperty("r",s.r),n.writeProperty("g",s.g),n.writeProperty("b",s.b),n.writeProperty("a",s.a)}function Aw(n,t,e){let s=Ge(t,e).toRgbaObject();n.writeProperty("r",s.r),n.writeProperty("g",s.g),n.writeProperty("b",s.b)}function Pw(n,t){return(e,i)=>{n?Cw(e,i,t):Aw(e,i,t)}}function Rw(n){var t;return!!(!((t=n?.color)===null||t===void 0)&&t.alpha)}function Iw(n){return n?t=>ed(t,"0x"):t=>td(t,"0x")}function Dw(n){return"color"in n||n.view==="color"}var Lw=We({id:"input-color-number",type:"input",accept:(n,t)=>{if(typeof n!="number"||!Dw(t))return null;let e=Ku(t);return e?{initialValue:n,params:Object.assign(Object.assign({},e),{supportsAlpha:Rw(t)})}:null},binding:{reader:n=>n.params.supportsAlpha?Sw:Mw,equals:nd,writer:n=>Tw(n.params.supportsAlpha)},controller:n=>{var t,e;return new Jr(n.document,{colorType:"int",expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:Iw(n.params.supportsAlpha),parser:ia("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:n.params.supportsAlpha,value:n.value,viewProps:n.viewProps})}});function Fw(n,t){if(!xm(n))return Ge($t.black(),t);if(t==="int"){let e=yf(n);return new $t(e,"rgb")}if(t==="float"){let e=yf(n);return new Zr(e,"rgb")}return Ge($t.black(),"int")}function Nw(n){return _m(n)}function Uw(n){return t=>{let e=Fw(t,n);return Ge(e,"int")}}function Ow(n,t){return e=>n?mm(e,t):fm(e,t)}var Bw=We({id:"input-color-object",type:"input",accept:(n,t)=>{var e;if(!xm(n))return null;let i=Ku(t);return i?{initialValue:n,params:Object.assign(Object.assign({},i),{colorType:(e=nm(t))!==null&&e!==void 0?e:"int"})}:null},binding:{reader:n=>Uw(n.params.colorType),equals:nd,writer:n=>Pw(Nw(n.initialValue),n.params.colorType)},controller:n=>{var t,e;let i=_m(n.initialValue);return new Jr(n.document,{colorType:n.params.colorType,expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:Ow(i,n.params.colorType),parser:ia("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:i,value:n.value,viewProps:n.viewProps})}}),kw=We({id:"input-color-string",type:"input",accept:(n,t)=>{if(typeof n!="string"||t.view==="text")return null;let e=rw(n,nm(t));if(!e)return null;let i=gm(e);if(!i)return null;let s=Ku(t);return s?{initialValue:n,params:Object.assign(Object.assign({},s),{format:e,stringifier:i})}:null},binding:{reader:()=>aw,equals:nd,writer:n=>{let t=Ew(n.params.format);if(!t)throw Pe.notBindable();return t}},controller:n=>{var t,e;return new Jr(n.document,{colorType:n.params.format.type,expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:n.params.stringifier,parser:ia("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:n.params.format.alpha,value:n.value,viewProps:n.viewProps})}}),jr=class{constructor(t){this.components=t.components,this.asm_=t.assembly}constrain(t){let e=this.asm_.toComponents(t).map((i,s)=>{var r,a;return(a=(r=this.components[s])===null||r===void 0?void 0:r.constrain(i))!==null&&a!==void 0?a:i});return this.asm_.fromComponents(e)}},wf=qt("pndtxt"),xu=class{constructor(t,e){this.textViews=e.textViews,this.element=t.createElement("div"),this.element.classList.add(wf()),this.textViews.forEach(i=>{let s=t.createElement("div");s.classList.add(wf("a")),s.appendChild(i.element),this.element.appendChild(s)})}};function Vw(n,t,e){return new as(n,{arrayPosition:e===0?"fst":e===t.axes.length-1?"lst":"mid",parser:t.parser,props:t.axes[e].textProps,value:he(0,{constraint:t.axes[e].constraint}),viewProps:t.viewProps})}var Kr=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.acs_=e.axes.map((i,s)=>Vw(t,e,s)),this.acs_.forEach((i,s)=>{js({primary:this.value,secondary:i.value,forward:r=>e.assembly.toComponents(r)[s],backward:(r,a)=>{let o=e.assembly.toComponents(r);return o[s]=a,e.assembly.fromComponents(o)}})}),this.view=new xu(t,{textViews:this.acs_.map(i=>i.view)})}get textControllers(){return this.acs_}},bu=class extends ns{get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}};function zw(n,t){let e=[],i=Uf(n,t);i&&e.push(i);let s=Of(n);s&&e.push(s);let r=ju(n.options);return r&&e.push(r),new is(e)}var Hw=We({id:"input-number",type:"input",accept:(n,t)=>{if(typeof n!="number")return null;let e=ue(t,i=>Object.assign(Object.assign({},kf(i)),{options:i.optional.custom(ea),readonly:i.optional.constant(!1)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Df,constraint:n=>zw(n.params,n.initialValue),writer:n=>na},controller:n=>{let t=n.value,e=n.constraint,i=e&&wl(e,ss);if(i)return new Nn(n.document,{props:new zt({options:i.values.value("options")}),value:t,viewProps:n.viewProps});let s=Bf(n.params,t.rawValue),r=e&&wl(e,ts);return r?new qs(n.document,Object.assign(Object.assign({},Jf(Object.assign(Object.assign({},s),{keyScale:he(s.keyScale),max:r.values.value("max"),min:r.values.value("min")}))),{parser:ti,value:t,viewProps:n.viewProps})):new as(n.document,{parser:ti,props:zt.fromObject(s),value:t,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="number"?null:n.controller.valueController instanceof qs?new bu(n.controller):n.controller.valueController instanceof Nn?new qr(n.controller):null}}),Ln=class{constructor(t=0,e=0){this.x=t,this.y=e}getComponents(){return[this.x,this.y]}static isObject(t){if(ae(t))return!1;let e=t.x,i=t.y;return!(typeof e!="number"||typeof i!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y}toObject(){return{x:this.x,y:this.y}}},bm={toComponents:n=>n.getComponents(),fromComponents:n=>new Ln(...n)},Gs=qt("p2d"),yu=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Gs()),e.viewProps.bindClassModifiers(this.element),Qn(e.expanded,$s(this.element,Gs(void 0,"expanded")));let i=t.createElement("div");i.classList.add(Gs("h")),this.element.appendChild(i);let s=t.createElement("button");s.classList.add(Gs("b")),s.appendChild(Al(t,"p2dpad")),e.viewProps.bindDisabled(s),i.appendChild(s),this.buttonElement=s;let r=t.createElement("div");if(r.classList.add(Gs("t")),i.appendChild(r),this.textElement=r,e.pickerLayout==="inline"){let a=t.createElement("div");a.classList.add(Gs("p")),this.element.appendChild(a),this.pickerElement=a}else this.pickerElement=null}},Ai=qt("p2dp"),wu=class{constructor(t,e){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onPropsChange_=this.onPropsChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onPropsChange_),this.element=t.createElement("div"),this.element.classList.add(Ai()),e.layout==="popup"&&this.element.classList.add(Ai(void 0,"p")),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("div");i.classList.add(Ai("p")),e.viewProps.bindTabIndex(i),this.element.appendChild(i),this.padElement=i;let s=t.createElementNS(Dn,"svg");s.classList.add(Ai("g")),this.padElement.appendChild(s),this.svgElem_=s;let r=t.createElementNS(Dn,"line");r.classList.add(Ai("ax")),r.setAttributeNS(null,"x1","0"),r.setAttributeNS(null,"y1","50%"),r.setAttributeNS(null,"x2","100%"),r.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(r);let a=t.createElementNS(Dn,"line");a.classList.add(Ai("ax")),a.setAttributeNS(null,"x1","50%"),a.setAttributeNS(null,"y1","0"),a.setAttributeNS(null,"x2","50%"),a.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(a);let o=t.createElementNS(Dn,"line");o.classList.add(Ai("l")),o.setAttributeNS(null,"x1","50%"),o.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(o),this.lineElem_=o;let l=t.createElement("div");l.classList.add(Ai("m")),this.padElement.appendChild(l),this.markerElem_=l,e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){let[t,e]=this.value.rawValue.getComponents(),i=this.props_.get("max"),s=jt(t,-i,+i,0,100),r=jt(e,-i,+i,0,100),a=this.props_.get("invertsY")?100-r:r;this.lineElem_.setAttributeNS(null,"x2",`${s}%`),this.lineElem_.setAttributeNS(null,"y2",`${a}%`),this.markerElem_.style.left=`${s}%`,this.markerElem_.style.top=`${a}%`}onValueChange_(){this.update_()}onPropsChange_(){this.update_()}onFoldableChange_(){this.update_()}};function Mf(n,t,e){return[Xe(t[0],si(n)),Xe(t[1],Yr(n))*(e?1:-1)]}var Mu=class{constructor(t,e){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new wu(t,{layout:e.layout,props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new ri(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;let i=this.props.get("max"),s=jt(t.point.x,0,t.bounds.width,-i,+i),r=jt(this.props.get("invertsY")?t.bounds.height-t.point.y:t.point.y,0,t.bounds.height,-i,+i);this.value.setRawValue(new Ln(s,r),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onPadKeyDown_(t){Zf(t.key)&&t.preventDefault();let[e,i]=Mf(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&i===0||this.value.setRawValue(new Ln(this.value.rawValue.x+e,this.value.rawValue.y+i),{forceEmit:!1,last:!1})}onPadKeyUp_(t){let[e,i]=Mf(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&i===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}},Su=class{constructor(t,e){var i,s;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=Gr.create(e.expanded),this.popC_=e.pickerLayout==="popup"?new Ml(t,{viewProps:this.viewProps}):null;let r=new Mu(t,{layout:e.pickerLayout,props:new zt({invertsY:he(e.invertsY),max:he(e.max),xKeyScale:e.axes[0].textProps.value("keyScale"),yKeyScale:e.axes[1].textProps.value("keyScale")}),value:this.value,viewProps:this.viewProps});r.view.allFocusableElements.forEach(a=>{a.addEventListener("blur",this.onPopupChildBlur_),a.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=r,this.textC_=new Kr(t,{assembly:bm,axes:e.axes,parser:e.parser,value:this.value,viewProps:this.viewProps}),this.view=new yu(t,{expanded:this.foldable_.value("expanded"),pickerLayout:e.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),(i=this.view.buttonElement)===null||i===void 0||i.addEventListener("blur",this.onPadButtonBlur_),(s=this.view.buttonElement)===null||s===void 0||s.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),js({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:a=>a,backward:(a,o)=>o})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),Zu(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onPadButtonBlur_(t){if(!this.popC_)return;let e=this.view.element,i=t.relatedTarget;(!i||!e.contains(i))&&(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;let e=this.popC_.view.element,i=Gf(t);i&&e.contains(i)||i&&i===this.view.buttonElement&&!qu(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.view.buttonElement.focus()}};function Gw(n){return Ln.isObject(n)?new Ln(n.x,n.y):new Ln}function Ww(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y)}function Xw(n,t){return new jr({assembly:bm,components:[Kn(Object.assign(Object.assign({},n),n.x),t.x),Kn(Object.assign(Object.assign({},n),n.y),t.y)]})}function Sf(n,t){var e,i;if(!ae(n.min)||!ae(n.max))return Math.max(Math.abs((e=n.min)!==null&&e!==void 0?e:0),Math.abs((i=n.max)!==null&&i!==void 0?i:0));let s=Ff(n);return Math.max(Math.abs(s)*10,Math.abs(t)*10)}function qw(n,t){var e,i;let s=Sf(Qi(n,(e=n.x)!==null&&e!==void 0?e:{}),t.x),r=Sf(Qi(n,(i=n.y)!==null&&i!==void 0?i:{}),t.y);return Math.max(s,r)}function Yw(n){if(!("y"in n))return!1;let t=n.y;return t&&"inverted"in t?!!t.inverted:!1}var $w=We({id:"input-point2d",type:"input",accept:(n,t)=>{if(!Ln.isObject(n))return null;let e=ue(t,i=>Object.assign(Object.assign({},$r(i)),{expanded:i.optional.boolean,picker:i.optional.custom(Kf),readonly:i.optional.constant(!1),x:i.optional.custom(Ri),y:i.optional.object(Object.assign(Object.assign({},$r(i)),{inverted:i.optional.boolean}))}));return e?{initialValue:n,params:e}:null},binding:{reader:()=>Gw,constraint:n=>Xw(n.params,n.initialValue),equals:Ln.equals,writer:()=>Ww},controller:n=>{var t,e;let i=n.document,s=n.value,r=n.constraint,a=[n.params.x,n.params.y];return new Su(i,{axes:s.rawValue.getComponents().map((o,l)=>{var c;return Xu({constraint:r.components[l],initialValue:o,params:Qi(n.params,(c=a[l])!==null&&c!==void 0?c:{})})}),expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,invertsY:Yw(n.params),max:qw(n.params,s.rawValue),parser:ti,pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",value:s,viewProps:n.viewProps})}}),Ii=class{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}getComponents(){return[this.x,this.y,this.z]}static isObject(t){if(ae(t))return!1;let e=t.x,i=t.y,s=t.z;return!(typeof e!="number"||typeof i!="number"||typeof s!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z}toObject(){return{x:this.x,y:this.y,z:this.z}}},ym={toComponents:n=>n.getComponents(),fromComponents:n=>new Ii(...n)};function Zw(n){return Ii.isObject(n)?new Ii(n.x,n.y,n.z):new Ii}function Jw(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y),n.writeProperty("z",t.z)}function jw(n,t){return new jr({assembly:ym,components:[Kn(Object.assign(Object.assign({},n),n.x),t.x),Kn(Object.assign(Object.assign({},n),n.y),t.y),Kn(Object.assign(Object.assign({},n),n.z),t.z)]})}var Kw=We({id:"input-point3d",type:"input",accept:(n,t)=>{if(!Ii.isObject(n))return null;let e=ue(t,i=>Object.assign(Object.assign({},$r(i)),{readonly:i.optional.constant(!1),x:i.optional.custom(Ri),y:i.optional.custom(Ri),z:i.optional.custom(Ri)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Zw,constraint:n=>jw(n.params,n.initialValue),equals:Ii.equals,writer:n=>Jw},controller:n=>{let t=n.value,e=n.constraint,i=[n.params.x,n.params.y,n.params.z];return new Kr(n.document,{assembly:ym,axes:t.rawValue.getComponents().map((s,r)=>{var a;return Xu({constraint:e.components[r],initialValue:s,params:Qi(n.params,(a=i[r])!==null&&a!==void 0?a:{})})}),parser:ti,value:t,viewProps:n.viewProps})}}),Di=class{constructor(t=0,e=0,i=0,s=0){this.x=t,this.y=e,this.z=i,this.w=s}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(t){if(ae(t))return!1;let e=t.x,i=t.y,s=t.z,r=t.w;return!(typeof e!="number"||typeof i!="number"||typeof s!="number"||typeof r!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z&&t.w===e.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}},wm={toComponents:n=>n.getComponents(),fromComponents:n=>new Di(...n)};function Qw(n){return Di.isObject(n)?new Di(n.x,n.y,n.z,n.w):new Di}function tM(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y),n.writeProperty("z",t.z),n.writeProperty("w",t.w)}function eM(n,t){return new jr({assembly:wm,components:[Kn(Object.assign(Object.assign({},n),n.x),t.x),Kn(Object.assign(Object.assign({},n),n.y),t.y),Kn(Object.assign(Object.assign({},n),n.z),t.z),Kn(Object.assign(Object.assign({},n),n.w),t.w)]})}var nM=We({id:"input-point4d",type:"input",accept:(n,t)=>{if(!Di.isObject(n))return null;let e=ue(t,i=>Object.assign(Object.assign({},$r(i)),{readonly:i.optional.constant(!1),w:i.optional.custom(Ri),x:i.optional.custom(Ri),y:i.optional.custom(Ri),z:i.optional.custom(Ri)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Qw,constraint:n=>eM(n.params,n.initialValue),equals:Di.equals,writer:n=>tM},controller:n=>{let t=n.value,e=n.constraint,i=[n.params.x,n.params.y,n.params.z,n.params.w];return new Kr(n.document,{assembly:wm,axes:t.rawValue.getComponents().map((s,r)=>{var a;return Xu({constraint:e.components[r],initialValue:s,params:Qi(n.params,(a=i[r])!==null&&a!==void 0?a:{})})}),parser:ti,value:t,viewProps:n.viewProps})}});function iM(n){let t=[],e=ju(n.options);return e&&t.push(e),new is(t)}var sM=We({id:"input-string",type:"input",accept:(n,t)=>{if(typeof n!="string")return null;let e=ue(t,i=>({readonly:i.optional.constant(!1),options:i.optional.custom(ea)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>$f,constraint:n=>iM(n.params),writer:n=>na},controller:n=>{let t=n.document,e=n.value,i=n.constraint,s=i&&wl(i,ss);return s?new Nn(t,{props:new zt({options:s.values.value("options")}),value:e,viewProps:n.viewProps}):new rs(t,{parser:r=>r,props:zt.fromObject({formatter:Qh}),value:e,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="string"?null:n.controller.valueController instanceof Nn?new qr(n.controller):null}}),sa={monitor:{defaultInterval:200,defaultRows:3}},Ef=qt("mll"),Eu=class{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(Ef()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("textarea");i.classList.add(Ef("i")),i.style.height=`calc(var(${jf("containerUnitSize")}) * ${e.rows})`,i.readOnly=!0,e.viewProps.bindDisabled(i),this.element.appendChild(i),this.textareaElem_=i,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){let t=this.textareaElem_,e=t.scrollTop===t.scrollHeight-t.clientHeight,i=[];this.value.rawValue.forEach(s=>{s!==void 0&&i.push(this.formatter_(s))}),t.textContent=i.join(`
`),e&&(t.scrollTop=t.scrollHeight)}onValueUpdate_(){this.update_()}},Qr=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new Eu(t,{formatter:e.formatter,rows:e.rows,value:this.value,viewProps:this.viewProps})}},Tf=qt("sgl"),Tu=class{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(Tf()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("input");i.classList.add(Tf("i")),i.readOnly=!0,i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){let t=this.value.rawValue,e=t[t.length-1];this.inputElement.value=e!==void 0?this.formatter_(e):""}onValueUpdate_(){this.update_()}},ta=class{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new Tu(t,{formatter:e.formatter,value:this.value,viewProps:this.viewProps})}},rM=We({id:"monitor-bool",type:"monitor",accept:(n,t)=>{if(typeof n!="boolean")return null;let e=ue(t,i=>({readonly:i.required.constant(!0),rows:i.optional.number}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Yf},controller:n=>{var t;return n.value.rawValue.length===1?new ta(n.document,{formatter:gf,value:n.value,viewProps:n.viewProps}):new Qr(n.document,{formatter:gf,rows:(t=n.params.rows)!==null&&t!==void 0?t:sa.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}}),Cu=class extends ns{get max(){return this.controller.valueController.props.get("max")}set max(t){this.controller.valueController.props.set("max",t)}get min(){return this.controller.valueController.props.get("min")}set min(t){this.controller.valueController.props.set("min",t)}},Pi=qt("grl"),Au=class{constructor(t,e){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=t.createElement("div"),this.element.classList.add(Pi()),e.viewProps.bindClassModifiers(this.element),this.formatter_=e.formatter,this.props_=e.props,this.cursor_=e.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);let i=t.createElementNS(Dn,"svg");i.classList.add(Pi("g")),i.style.height=`calc(var(${jf("containerUnitSize")}) * ${e.rows})`,this.element.appendChild(i),this.svgElem_=i;let s=t.createElementNS(Dn,"polyline");this.svgElem_.appendChild(s),this.lineElem_=s;let r=t.createElement("div");r.classList.add(Pi("t"),qt("tt")()),this.element.appendChild(r),this.tooltipElem_=r,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}get graphElement(){return this.svgElem_}update_(){let{clientWidth:t,clientHeight:e}=this.element,i=this.value.rawValue.length-1,s=this.props_.get("min"),r=this.props_.get("max"),a=[];this.value.rawValue.forEach((d,u)=>{if(d===void 0)return;let f=jt(u,0,i,0,t),g=jt(d,s,r,e,0);a.push([f,g].join(","))}),this.lineElem_.setAttributeNS(null,"points",a.join(" "));let o=this.tooltipElem_,l=this.value.rawValue[this.cursor_.rawValue];if(l===void 0){o.classList.remove(Pi("t","a"));return}let c=jt(this.cursor_.rawValue,0,i,0,t),h=jt(l,s,r,e,0);o.style.left=`${c}px`,o.style.top=`${h}px`,o.textContent=`${this.formatter_(l)}`,o.classList.contains(Pi("t","a"))||(o.classList.add(Pi("t","a"),Pi("t","in")),fl(o),o.classList.remove(Pi("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}},El=class{constructor(t,e){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.cursor_=he(-1),this.view=new Au(t,{cursor:this.cursor_,formatter:e.formatter,rows:e.rows,props:this.props,value:this.value,viewProps:this.viewProps}),!qu(t))this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_);else{let i=new ri(this.view.element);i.emitter.on("down",this.onGraphPointerDown_),i.emitter.on("move",this.onGraphPointerMove_),i.emitter.on("up",this.onGraphPointerUp_)}}importProps(t){return nn(t,null,e=>({max:e.required.number,min:e.required.number}),e=>(this.props.set("max",e.max),this.props.set("min",e.min),!0))}exportProps(){return sn(null,{max:this.props.get("max"),min:this.props.get("min")})}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(t){let{clientWidth:e}=this.view.element;this.cursor_.rawValue=Math.floor(jt(t.offsetX,0,e,0,this.value.rawValue.length))}onGraphPointerDown_(t){this.onGraphPointerMove_(t)}onGraphPointerMove_(t){if(!t.data.point){this.cursor_.rawValue=-1;return}this.cursor_.rawValue=Math.floor(jt(t.data.point.x,0,t.data.bounds.width,0,this.value.rawValue.length))}onGraphPointerUp_(){this.cursor_.rawValue=-1}};function Pu(n){return ae(n.format)?qe(2):n.format}function aM(n){var t;return n.value.rawValue.length===1?new ta(n.document,{formatter:Pu(n.params),value:n.value,viewProps:n.viewProps}):new Qr(n.document,{formatter:Pu(n.params),rows:(t=n.params.rows)!==null&&t!==void 0?t:sa.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}function oM(n){var t,e,i;return new El(n.document,{formatter:Pu(n.params),rows:(t=n.params.rows)!==null&&t!==void 0?t:sa.monitor.defaultRows,props:zt.fromObject({max:(e=n.params.max)!==null&&e!==void 0?e:100,min:(i=n.params.min)!==null&&i!==void 0?i:0}),value:n.value,viewProps:n.viewProps})}function Cf(n){return n.view==="graph"}var lM=We({id:"monitor-number",type:"monitor",accept:(n,t)=>{if(typeof n!="number")return null;let e=ue(t,i=>({format:i.optional.function,max:i.optional.number,min:i.optional.number,readonly:i.required.constant(!0),rows:i.optional.number,view:i.optional.string}));return e?{initialValue:n,params:e}:null},binding:{defaultBufferSize:n=>Cf(n)?64:1,reader:n=>Df},controller:n=>Cf(n.params)?oM(n):aM(n),api:n=>n.controller.valueController instanceof El?new Cu(n.controller):null}),cM=We({id:"monitor-string",type:"monitor",accept:(n,t)=>{if(typeof n!="string")return null;let e=ue(t,i=>({multiline:i.optional.boolean,readonly:i.required.constant(!0),rows:i.optional.number}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>$f},controller:n=>{var t;let e=n.value;return e.rawValue.length>1||n.params.multiline?new Qr(n.document,{formatter:Qh,rows:(t=n.params.rows)!==null&&t!==void 0?t:sa.monitor.defaultRows,value:e,viewProps:n.viewProps}):new ta(n.document,{formatter:Qh,value:e,viewProps:n.viewProps})}}),Ru=class{constructor(){this.map_=new Map}get(t){var e;return(e=this.map_.get(t))!==null&&e!==void 0?e:null}has(t){return this.map_.has(t)}add(t,e){return this.map_.set(t,e),t.viewProps.handleDispose(()=>{this.map_.delete(t)}),e}},Iu=class{constructor(t){this.target=t.target,this.reader_=t.reader,this.writer_=t.writer}read(){return this.reader_(this.target.read())}write(t){this.writer_(this.target,t)}inject(t){this.write(this.reader_(t))}};function hM(n,t){var e;let i=n.accept(t.target.read(),t.params);if(ae(i))return null;let s={target:t.target,initialValue:i.initialValue,params:i.params},r=ue(t.params,d=>({disabled:d.optional.boolean,hidden:d.optional.boolean,label:d.optional.string,tag:d.optional.string})),a=n.binding.reader(s),o=n.binding.constraint?n.binding.constraint(s):void 0,l=new Iu({reader:a,target:t.target,writer:n.binding.writer(s)}),c=new Ah(he(a(i.initialValue),{constraint:o,equals:n.binding.equals}),l),h=n.controller({constraint:o,document:t.document,initialValue:i.initialValue,params:i.params,value:c,viewProps:ii.create({disabled:r?.disabled,hidden:r?.hidden})});return new Rh(t.document,{blade:Js(),props:zt.fromObject({label:"label"in t.params?(e=r?.label)!==null&&e!==void 0?e:null:t.target.key}),tag:r?.tag,value:c,valueController:h})}var Du=class{constructor(t){this.target=t.target,this.reader_=t.reader}read(){return this.reader_(this.target.read())}};function uM(n,t){return t===0?new $h:new Zh(n,t??sa.monitor.defaultInterval)}function dM(n,t){var e,i,s;let r=n.accept(t.target.read(),t.params);if(ae(r))return null;let a={target:t.target,initialValue:r.initialValue,params:r.params},o=ue(t.params,u=>({bufferSize:u.optional.number,disabled:u.optional.boolean,hidden:u.optional.boolean,interval:u.optional.number,label:u.optional.string})),l=n.binding.reader(a),c=(i=(e=o?.bufferSize)!==null&&e!==void 0?e:n.binding.defaultBufferSize&&n.binding.defaultBufferSize(r.params))!==null&&i!==void 0?i:1,h=new Ih({binding:new Du({reader:l,target:t.target}),bufferSize:c,ticker:uM(t.document,o?.interval)}),d=n.controller({document:t.document,params:r.params,value:h,viewProps:ii.create({disabled:o?.disabled,hidden:o?.hidden})});return d.viewProps.bindDisabled(h.ticker),d.viewProps.handleDispose(()=>{h.ticker.dispose()}),new Dh(t.document,{blade:Js(),props:zt.fromObject({label:"label"in t.params?(s=o?.label)!==null&&s!==void 0?s:null:t.target.key}),value:h,valueController:d})}var Lu=class{constructor(t){this.pluginsMap_={blades:[],inputs:[],monitors:[]},this.apiCache_=t}getAll(){return[...this.pluginsMap_.blades,...this.pluginsMap_.inputs,...this.pluginsMap_.monitors]}register(t,e){if(!Ly(e.core))throw Pe.notCompatible(t,e.id);e.type==="blade"?this.pluginsMap_.blades.unshift(e):e.type==="input"?this.pluginsMap_.inputs.unshift(e):e.type==="monitor"&&this.pluginsMap_.monitors.unshift(e)}createInput_(t,e,i){return this.pluginsMap_.inputs.reduce((s,r)=>s??hM(r,{document:t,target:e,params:i}),null)}createMonitor_(t,e,i){return this.pluginsMap_.monitors.reduce((s,r)=>s??dM(r,{document:t,params:i,target:e}),null)}createBinding(t,e,i){let s=e.read();if(ae(s))throw new Pe({context:{key:e.key},type:"nomatchingcontroller"});let r=this.createInput_(t,e,i);if(r)return r;let a=this.createMonitor_(t,e,i);if(a)return a;throw new Pe({context:{key:e.key},type:"nomatchingcontroller"})}createBlade(t,e){let i=this.pluginsMap_.blades.reduce((s,r)=>s??Cy(r,{document:t,params:e}),null);if(!i)throw new Pe({type:"nomatchingview",context:{params:e}});return i}createInputBindingApi_(t){let e=this.pluginsMap_.inputs.reduce((i,s)=>{var r,a;return i||((a=(r=s.api)===null||r===void 0?void 0:r.call(s,{controller:t}))!==null&&a!==void 0?a:null)},null);return this.apiCache_.add(t,e??new ns(t))}createMonitorBindingApi_(t){let e=this.pluginsMap_.monitors.reduce((i,s)=>{var r,a;return i||((a=(r=s.api)===null||r===void 0?void 0:r.call(s,{controller:t}))!==null&&a!==void 0?a:null)},null);return this.apiCache_.add(t,e??new ns(t))}createBindingApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(cy(t))return this.createInputBindingApi_(t);if(fy(t))return this.createMonitorBindingApi_(t);throw Pe.shouldNeverHappen()}createApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(ly(t))return this.createBindingApi(t);let e=this.pluginsMap_.blades.reduce((i,s)=>i??s.api({controller:t,pool:this}),null);if(!e)throw Pe.shouldNeverHappen();return this.apiCache_.add(t,e)}},pM=new Ru;function fM(){let n=new Lu(pM);return[$w,Kw,nM,sM,Hw,kw,Bw,Lw,Ny,rM,cM,lM,gy,Ey,qf].forEach(t=>{n.register("core",t)}),n}var Fu=class extends ei{constructor(t){super(t),this.emitter_=new me,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new es(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}},Nu=class extends ei{},Uu=class extends ei{constructor(t){super(t),this.emitter_=new me,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new es(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}},Ou=class extends ei{constructor(t){super(t),this.emitter_=new me,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new es(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get formatter(){return this.controller.valueController.props.get("formatter")}set formatter(t){this.controller.valueController.props.set("formatter",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){let i=e.bind(this);return this.emitter_.on(t,s=>{i(s)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}},mM=(function(){return{id:"list",type:"blade",core:Zs,accept(n){let t=ue(n,e=>({options:e.required.custom(ea),value:e.required.raw,view:e.required.constant("list"),label:e.optional.string}));return t?{params:t}:null},controller(n){let t=new ss(Ju(n.params.options)),e=he(n.params.value,{constraint:t}),i=new Nn(n.document,{props:new zt({options:t.values.value("options")}),value:e,viewProps:n.viewProps});return new ni(n.document,{blade:n.blade,props:zt.fromObject({label:n.params.label}),value:e,valueController:i})},api(n){return!(n.controller instanceof ni)||!(n.controller.valueController instanceof Nn)?null:new Fu(n.controller)}}})(),Bu=class extends bl{constructor(t,e){super(t,e)}get element(){return this.controller.view.element}},ku=class extends Wr{constructor(t,e){super(t,{expanded:e.expanded,blade:e.blade,props:e.props,root:!0,viewProps:e.viewProps})}},Af=qt("spr"),Vu=class{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Af()),e.viewProps.bindClassModifiers(this.element);let i=t.createElement("hr");i.classList.add(Af("r")),this.element.appendChild(i)}},Tl=class extends Xs{constructor(t,e){super(Object.assign(Object.assign({},e),{view:new Vu(t,{viewProps:e.viewProps})}))}},gM={id:"separator",type:"blade",core:Zs,accept(n){let t=ue(n,e=>({view:e.required.constant("separator")}));return t?{params:t}:null},controller(n){return new Tl(n.document,{blade:n.blade,viewProps:n.viewProps})},api(n){return n.controller instanceof Tl?new Nu(n.controller):null}},vM={id:"slider",type:"blade",core:Zs,accept(n){let t=ue(n,e=>({max:e.required.number,min:e.required.number,view:e.required.constant("slider"),format:e.optional.function,label:e.optional.string,value:e.optional.number}));return t?{params:t}:null},controller(n){var t,e;let i=(t=n.params.value)!==null&&t!==void 0?t:0,s=new ts({max:n.params.max,min:n.params.min}),r=he(i,{constraint:s}),a=new qs(n.document,Object.assign(Object.assign({},Jf({formatter:(e=n.params.format)!==null&&e!==void 0?e:Yb,keyScale:he(1),max:s.values.value("max"),min:s.values.value("min"),pointerScale:Nf(n.params,i)})),{parser:ti,value:r,viewProps:n.viewProps}));return new ni(n.document,{blade:n.blade,props:zt.fromObject({label:n.params.label}),value:r,valueController:a})},api(n){return!(n.controller instanceof ni)||!(n.controller.valueController instanceof qs)?null:new Uu(n.controller)}},_M=(function(){return{id:"text",type:"blade",core:Zs,accept(n){let t=ue(n,e=>({parse:e.required.function,value:e.required.raw,view:e.required.constant("text"),format:e.optional.function,label:e.optional.string}));return t?{params:t}:null},controller(n){var t;let e=he(n.params.value),i=new rs(n.document,{parser:n.params.parse,props:zt.fromObject({formatter:(t=n.params.format)!==null&&t!==void 0?t:(s=>String(s))}),value:e,viewProps:n.viewProps});return new ni(n.document,{blade:n.blade,props:zt.fromObject({label:n.params.label}),value:e,valueController:i})},api(n){return!(n.controller instanceof ni)||!(n.controller.valueController instanceof rs)?null:new Ou(n.controller)}}})();function xM(n){let t=n.createElement("div");return t.classList.add(qt("dfw")()),n.body&&n.body.appendChild(t),t}function bM(n,t,e){if(n.querySelector(`style[data-tp-style=${t}]`))return;let i=n.createElement("style");i.dataset.tpStyle=t,i.textContent=e,n.head.appendChild(i)}var Cl=class extends Bu{constructor(t){var e,i;let s=t??{},r=(e=s.document)!==null&&e!==void 0?e:ey(),a=fM(),o=new ku(r,{expanded:s.expanded,blade:Js(),props:zt.fromObject({title:s.title}),viewProps:ii.create()});super(o,a),this.pool_=a,this.containerElem_=(i=s.container)!==null&&i!==void 0?i:xM(r),this.containerElem_.appendChild(this.element),this.doc_=r,this.usesDefaultWrapper_=!s.container,this.setUpDefaultPlugins_()}get document(){if(!this.doc_)throw Pe.alreadyDisposed();return this.doc_}dispose(){let t=this.containerElem_;if(!t)throw Pe.alreadyDisposed();if(this.usesDefaultWrapper_){let e=t.parentElement;e&&e.removeChild(t)}this.containerElem_=null,this.doc_=null,super.dispose()}registerPlugin(t){t.css&&bM(this.document,`plugin-${t.id}`,t.css),("plugin"in t?[t.plugin]:"plugins"in t?t.plugins:[]).forEach(i=>{this.pool_.register(t.id,i)})}setUpDefaultPlugins_(){this.registerPlugin({id:"default",css:'.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{display:block;height:16px;inset:0;margin:auto;opacity:0;position:absolute;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{inset:0;position:absolute}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;inset:0;position:absolute}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);content:"";display:block;inset:0;position:absolute}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin:auto;position:absolute}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin-bottom:auto;margin-top:auto;position:absolute}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);content:"";inset:0 0 2px;pointer-events:none;position:absolute}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',plugins:[mM,gM,vM,qf,_M]})}},ST=new xl("4.0.5");var Rl=class{constructor(){this.pane=null,this.folders=new Map,this.isVisible=!1}init(){return this.pane?this.pane:(this.pane=new Cl({title:"Debug"}),this.pane.element.classList.add("debug-pane"),this.setVisible(this.isVisible),this.pane)}setVisible(t){this.isVisible=t,this.pane&&(this.pane.element.style.display=t?"block":"none")}getFolder(t){if(this.init(),this.folders.has(t))return this.folders.get(t);let e=this.pane.addFolder({title:t,expanded:!0});return this.folders.set(t,e),e}addBinding({folderTitle:t,targetObject:e,property:i,label:s,options:r={},onChange:a}){let l=this.getFolder(t).addBinding(e,i,{label:s,...r});return l.on("change",c=>{a&&a(c.value)}),l}dispose(){this.pane&&(this.pane.dispose(),this.pane=null,this.folders.clear())}};var Il=class{constructor(t){this.gallery=t,this.overlayElement=null,this.leftIndexElement=null,this.wordElement=null,this.chipElement=null,this.cmykValueElement=null,this.rgbValueElement=null,this.hexValueElement=null,this.pmsValueElement=null,this.activePlaneIndex=-1}createElement(){let t=document.createElement("section");return t.className="plane-label-overlay",t.innerHTML=`
      <div class="plane-label-overlay__left">
        <p class="plane-label-overlay__index"></p>
        <p class="plane-label-card__word"></p>
        <span class="plane-label-overlay__chip"></span>
      </div>
      <article class="plane-label-card plane-label-overlay__right">
        <dl class="plane-label-card__specs">
          <div class="plane-label-card__row">
            <dt>CMYK</dt>
            <dd class="plane-label-card__value plane-label-card__value--cmyk"></dd>
          </div>
          <div class="plane-label-card__row">
            <dt>RGB</dt>
            <dd class="plane-label-card__value plane-label-card__value--rgb"></dd>
          </div>
          <div class="plane-label-card__row">
            <dt>HEX</dt>
            <dd class="plane-label-card__value plane-label-card__value--hex"></dd>
          </div>
          <div class="plane-label-card__row">
            <dt>PMS</dt>
            <dd class="plane-label-card__value plane-label-card__value--pms"></dd>
          </div>
        </dl>
      </article>
    `,{element:t,leftIndexElement:t.querySelector(".plane-label-overlay__index"),wordElement:t.querySelector(".plane-label-card__word"),chipElement:t.querySelector(".plane-label-overlay__chip"),cmykValueElement:t.querySelector(".plane-label-card__value--cmyk"),rgbValueElement:t.querySelector(".plane-label-card__value--rgb"),hexValueElement:t.querySelector(".plane-label-card__value--hex"),pmsValueElement:t.querySelector(".plane-label-card__value--pms")}}init(){if(this.overlayElement)return;let{element:t,leftIndexElement:e,wordElement:i,chipElement:s,cmykValueElement:r,rgbValueElement:a,hexValueElement:o,pmsValueElement:l}=this.createElement();this.overlayElement=t,this.leftIndexElement=e,this.wordElement=i,this.chipElement=s,this.cmykValueElement=r,this.rgbValueElement=a,this.hexValueElement=o,this.pmsValueElement=l,this.overlayElement.style.opacity="0",document.body.append(this.overlayElement)}normalizeHexColor(t){let e="#ffffff";if(typeof t!="string")return e;let i=t.trim();return!i||(i.startsWith("#")||(i=`#${i}`),/^#[0-9a-fA-F]{3}$/.test(i)&&(i=`#${i.slice(1).split("").map(r=>`${r}${r}`).join("")}`),!/^#[0-9a-fA-F]{6}$/.test(i))?e:i.toLowerCase()}hexToRgb(t){let e=this.normalizeHexColor(t).slice(1),i=Number.parseInt(e.slice(0,2),16),s=Number.parseInt(e.slice(2,4),16),r=Number.parseInt(e.slice(4,6),16);return{r:i,g:s,b:r}}rgbToCmyk({r:t,g:e,b:i}){let s=t/255,r=e/255,a=i/255,o=1-Math.max(s,r,a);if(o>=.999)return{c:0,m:0,y:0,k:100};let l=(1-s-o)/(1-o)*100,c=(1-r-o)/(1-o)*100,h=(1-a-o)/(1-o)*100;return{c:Math.round(l),m:Math.round(c),y:Math.round(h),k:Math.round(o*100)}}buildColorSpecs(t,e){let i=this.normalizeHexColor(t),s=this.hexToRgb(i),r=this.rgbToCmyk(s);return{chipHex:i,cmyk:`${r.c}, ${r.m}, ${r.y}, ${r.k}`,rgb:`${s.r}, ${s.g}, ${s.b}`,hex:i.slice(1).toUpperCase(),pms:e||"N/A"}}getTargetPlaneIndex(t){let e=this.gallery.getPlaneBlendData(t);return e?e.blend>=.5?e.nextPlaneIndex:e.currentPlaneIndex:-1}applyPlaneContent(t){let e=this.gallery.planes[t];if(!e||this.activePlaneIndex===t)return;let i=e.userData.label||{},s=this.buildColorSpecs(e.userData.accentColor,i.pms);this.leftIndexElement.textContent=String(t+1).padStart(2,"0"),this.wordElement.textContent=i.word||"tone",this.chipElement.style.backgroundColor=s.chipHex,this.cmykValueElement.textContent=s.cmyk,this.rgbValueElement.textContent=s.rgb,this.hexValueElement.textContent=s.hex,this.pmsValueElement.textContent=s.pms,this.overlayElement.style.color=i.color||"",this.activePlaneIndex=t}resize(){}update(t=null){if(!t||!this.overlayElement)return;let e=this.getTargetPlaneIndex(t.position.z);if(e<0){this.overlayElement.style.opacity="0";return}this.applyPlaneContent(e),this.overlayElement.style.opacity="1"}render(){}dispose(){this.overlayElement?.remove(),this.overlayElement=null,this.leftIndexElement=null,this.wordElement=null,this.chipElement=null,this.cmykValueElement=null,this.rgbValueElement=null,this.hexValueElement=null,this.pmsValueElement=null,this.activePlaneIndex=-1}};var Dl=class{constructor(){this.group=new gn,this.points=[],this.mesh=null,this.minDistance=.006,this.maxPoints=220,this.curveTension=.5,this.curveSegments=220,this.radialSegments=8,this.radiusHead=.012,this.radiusTail=.003,this.pointSmoothing=.3,this.maxTrimPerFrame=4,this.jumpResetDistance=999,this.material=new _r({color:new Rt("#f6f9ff"),emissive:new Rt("#7fd5ff"),emissiveIntensity:1.35,roughness:.2,metalness:.05,transparent:!0,opacity:.84,depthWrite:!1,depthTest:!1,blending:qn})}get object(){return this.group}addPoint(t){if(!(t instanceof F))return;let e=this.points[this.points.length-1]||null;if(e&&t.distanceToSquared(e)<this.minDistance*this.minDistance)return;let i=t.clone();if(e&&i.distanceTo(e)>this.jumpResetDistance){this.points=[i],this.mesh&&(this.mesh.geometry.dispose(),this.group.remove(this.mesh),this.mesh=null);return}let s=e?e.clone().lerp(i,this.pointSmoothing):i;this.points.push(s);let r=this.maxTrimPerFrame;for(;this.points.length>this.maxPoints&&r>0;)this.points.shift(),r-=1;if(this.points.length<2)return;let a=new gr(this.points,!1,"centripetal",this.curveTension),o=Math.max(24,Math.min(this.curveSegments,this.points.length*4)),l=this.createTaperedTube(a,o,this.radiusHead,this.radiusTail);if(!this.mesh){this.mesh=new ye(l,this.material),this.mesh.renderOrder=1200,this.group.add(this.mesh);return}this.mesh.geometry.dispose(),this.mesh.geometry=l}createTaperedTube(t,e,i,s){let r=t.getSpacedPoints(e),a=this.radialSegments,o=a+1,l=[],c=[],h=new F(0,0,1),d=new F,u=new F,f=new F,g=new F,b=new F;for(let p=0;p<r.length;p+=1){let y=p/Math.max(r.length-1,1),E=i+(s-i)*Math.pow(y,1.5);t.getTangent(y,d).normalize(),u.crossVectors(h,d).normalize(),u.lengthSq()===0&&u.set(1,0,0),f.crossVectors(d,u).normalize();for(let S=0;S<=a;S+=1){let C=S/a*Math.PI*2,T=-Math.cos(C)*E,I=Math.sin(C)*E;g.copy(u).multiplyScalar(T).addScaledVector(f,I),b.copy(r[p]).add(g),l.push(b.x,b.y,b.z)}}for(let p=0;p<r.length-1;p+=1)for(let y=0;y<a;y+=1){let E=p*o+y;c.push(E,E+o,E+1),c.push(E+o,E+o+1,E+1)}let m=new Qe;return m.setAttribute("position",new Ie(l,3)),m.setIndex(c),m.computeVertexNormals(),m}dispose(){this.reset(),this.material.dispose()}reset(){this.mesh&&(this.mesh.geometry.dispose(),this.group.remove(this.mesh),this.mesh=null),this.points=[]}};var Ll=class{constructor(){this.group=new gn,this.group.renderOrder=1300,this.isEnabled=!0,this.maxParticles=18,this.spawnPerSecond=20,this.spawnRadius=.52,this.speedMin=.05,this.speedMax=.22,this.lifeMin=.25,this.lifeMax=.6,this.sizeMin=.007,this.sizeMax=.02,this.dragPerFrame=.94,this.spawnAccumulator=0,this.nextSpawnIndex=0,this.sharedGeometry=new vr(1,5,4),this.particles=[];for(let t=0;t<this.maxParticles;t+=1){let e=new $n({color:new Rt("#f6f9ff"),transparent:!0,opacity:0,depthWrite:!1,depthTest:!1}),i=new ye(this.sharedGeometry,e);i.visible=!1,this.group.add(i),this.particles.push({mesh:i,velocity:new F,lifeRemaining:0,totalLife:0})}}get object(){return this.group}setEnabled(t){this.isEnabled&&!t&&this.clear(),this.isEnabled=!!t,this.group.visible=this.isEnabled}update(t,e,i=1,s=!0){let r=Math.min(Math.max(t||0,0),.1);if(this.isEnabled&&s&&r>0){this.spawnAccumulator+=r*this.spawnPerSecond;let l=Math.floor(this.spawnAccumulator);this.spawnAccumulator-=l;for(let c=0;c<l;c+=1)this.spawnParticle(e)}else this.spawnAccumulator=0;let a=Dt.clamp(i,0,1),o=Math.pow(this.dragPerFrame,r*60);this.particles.forEach(l=>{if(l.lifeRemaining<=0)return;if(l.lifeRemaining-=r,l.lifeRemaining<=0){l.lifeRemaining=0,l.mesh.visible=!1,l.mesh.material.opacity=0;return}l.velocity.multiplyScalar(o),l.mesh.position.addScaledVector(l.velocity,r);let c=l.lifeRemaining/l.totalLife;l.mesh.material.opacity=c*a*.75})}spawnParticle(t){let e=this.particles[this.nextSpawnIndex];this.nextSpawnIndex=(this.nextSpawnIndex+1)%this.particles.length;let i=Math.random()*Math.PI*2,s=Math.random()*this.spawnRadius;e.mesh.position.set(t.x+Math.cos(i)*s,t.y+(Math.random()-.5)*this.spawnRadius*.6,t.z+Math.sin(i)*s);let r=Dt.lerp(this.sizeMin,this.sizeMax,Math.random());e.mesh.scale.setScalar(r),e.mesh.visible=!0;let a=Dt.lerp(this.speedMin,this.speedMax,Math.random());e.velocity.set((Math.random()-.5)*a,(Math.random()-.5)*a*.6,(Math.random()-.5)*a),e.totalLife=Dt.lerp(this.lifeMin,this.lifeMax,Math.random()),e.lifeRemaining=e.totalLife,e.mesh.material.opacity=.4}dispose(){this.clear(),this.particles.forEach(t=>{t.mesh.material.dispose()}),this.sharedGeometry.dispose(),this.group.clear(),this.particles=[]}clear(){this.spawnAccumulator=0,this.particles.forEach(t=>{t.lifeRemaining=0,t.totalLife=0,t.mesh.visible=!1,t.mesh.material.opacity=0})}};var Mm=Math.PI*2,Fl=class{constructor({gallery:t,debug:e=null}){this.trail=new Dl,this.trailHeadParticles=new Ll,this.gallery=t,this.debug=e,this.hasBoundDebug=!1,this.trailHeadPosition=new F,this.timer=new wr,this.configuration={isEnabled:!0,pathSettings:{startXPosition:-.96,startYPosition:-1.05,horizontalWidth:3,horizontalCycles:1.85,verticalAmplitude:.78,verticalCycles:2.1,distanceAheadOfCamera:1.65,baseDepthOffset:4.78,depthSpan:6.52,progressDepthOffset:-.1},responsiveSettings:{mobileBreakpoint:768,mobileWidthScale:.35,mobileStartXOffset:.35},pointSettings:{minimumPointCount:14,maximumPointCount:220,reverseLengthScale:.55,initialSeedPointCount:10,initialSeedStepZ:.12,trimPerFrameForward:4,trimPerFrameReverse:32},opacitySettings:{baseOpacity:.51,idleOpacityAtStart:.55,idleProgressThreshold:.01,startVisibilityBias:.1,edgeFadeStart:.04,edgeFadeEnd:.2,opacitySmoothing:.12},visualSettings:{trailColor:"#f6f9ff",glowColor:"#ffffff",glowIntensity:1.35,curveTension:.67,pointSmoothing:.53},specialEffectsSettings:{showHeadParticles:!0},directionChangeEpsilon:5e-4},this.runtimeState={hasSeededInitialPoints:!1,hasUserMovedFromStart:!1,previousProgress:null,previousDirection:0,currentOpacity:this.configuration.opacitySettings.baseOpacity},this.applyVisualSettings()}applyVisualSettings(){let{visualSettings:t,opacitySettings:e}=this.configuration;this.trail.material.color.set(t.trailColor),this.trail.material.emissive.set(t.glowColor),this.trail.material.emissiveIntensity=t.glowIntensity,this.trail.material.opacity=e.baseOpacity,this.trail.material.needsUpdate=!0,this.trail.curveTension=t.curveTension,this.trail.pointSmoothing=t.pointSmoothing,this.trailHeadParticles.particles.forEach(i=>{i.mesh.material.color.set(t.trailColor)})}init(t,e){t.add(this.trail.object),t.add(this.trailHeadParticles.object),this.seedInitialPoints(e),this.bindDebug()}dispose(){this.trail.dispose(),this.trailHeadParticles.dispose(),this.runtimeState.hasSeededInitialPoints=!1,this.runtimeState.hasUserMovedFromStart=!1,this.runtimeState.previousProgress=null,this.runtimeState.previousDirection=0,this.hasBoundDebug=!1}update(t=null,e=null,i=null){if(!t)return;Number.isFinite(i)?this.timer.update(i):this.timer.update();let s=this.timer.getDelta();this.trail.object.visible=this.configuration.isEnabled;let r=this.configuration.isEnabled&&this.configuration.specialEffectsSettings.showHeadParticles;if(this.trailHeadParticles.setEnabled(r),!this.configuration.isEnabled)return;let a=this.getProgress(t,e);a>this.configuration.opacitySettings.idleProgressThreshold&&(this.runtimeState.hasUserMovedFromStart=!0);let o=this.getDirection(a),l=o!==0&&this.runtimeState.previousDirection!==0&&o!==this.runtimeState.previousDirection;this.updateLength(a,o||this.runtimeState.previousDirection);let c=this.computeHeadPosition(t.position.z,a);if(this.updateOpacity(a),l){this.trail.reset();let h=c.clone();h.z+=o*this.configuration.pointSettings.initialSeedStepZ,this.trail.addPoint(h)}this.trail.addPoint(c),o!==0&&(this.runtimeState.previousDirection=o),this.runtimeState.previousProgress=a,this.trailHeadParticles.update(s,c,this.runtimeState.currentOpacity,!0)}bindDebug(){!this.debug||this.hasBoundDebug||(this.debug.addBinding({folderTitle:"Trail",targetObject:this.configuration,property:"isEnabled",label:"Enabled",onChange:t=>{this.trail.object.visible=!!t}}),this.debug.addBinding({folderTitle:"Trail",targetObject:this.configuration.pathSettings,property:"horizontalWidth",label:"Width",options:{min:.2,max:6,step:.01}}),this.debug.addBinding({folderTitle:"Trail",targetObject:this.configuration.pathSettings,property:"horizontalCycles",label:"Curves",options:{min:.2,max:4,step:.01}}),this.debug.addBinding({folderTitle:"Trail",targetObject:this.configuration.opacitySettings,property:"baseOpacity",label:"Opacity",options:{min:0,max:1,step:.01}}),this.debug.addBinding({folderTitle:"Trail",targetObject:this.configuration.specialEffectsSettings,property:"showHeadParticles",label:"Particles"}),this.hasBoundDebug=!0)}getProgress(t,e){let i=(e?.maxCameraZ??0)-(e?.minCameraZ??0);if(Number.isFinite(i)&&i>0)return Dt.clamp(((e?.maxCameraZ??t.position.z)-t.position.z)/i,0,1);let s=this.gallery.getPlaneBlendData(t.position.z);if(s){let r=Math.max(this.gallery.planes.length-1,1);return Dt.clamp((s.currentPlaneIndex+s.blend)/r,0,1)}return this.gallery.getDepthProgress(t.position.z)}computeHeadPosition(t,e){let i=Dt.clamp(e,0,1),{pathSettings:s,responsiveSettings:r}=this.configuration,a=Math.max(s.horizontalCycles,1e-4),o=Math.max(s.verticalCycles,1e-4),l=typeof window<"u"&&window.innerWidth<=r.mobileBreakpoint,c=s.startXPosition+(l?r.mobileStartXOffset:0),h=s.horizontalWidth*(l?r.mobileWidthScale:1),d=c+Math.sin(i*Mm*a)*h,u=s.startYPosition+Math.sin(i*Mm*o)*s.verticalAmplitude,f=s.progressDepthOffset+i*(1-s.progressDepthOffset),g=t+s.distanceAheadOfCamera-(s.baseDepthOffset+f*s.depthSpan);return this.trailHeadPosition.set(d,u,g),this.trailHeadPosition}seedInitialPoints(t){if(this.runtimeState.hasSeededInitialPoints||!t)return;let e=this.computeHeadPosition(t.position.z,0).clone();for(let i=this.configuration.pointSettings.initialSeedPointCount;i>=0;i-=1){let s=e.clone();s.z-=i*this.configuration.pointSettings.initialSeedStepZ,this.trail.addPoint(s)}this.runtimeState.hasSeededInitialPoints=!0}getDirection(t){if(this.runtimeState.previousProgress===null)return 0;let e=t-this.runtimeState.previousProgress;return Math.abs(e)<=this.configuration.directionChangeEpsilon?0:Math.sign(e)}updateLength(t,e){let{pointSettings:i}=this.configuration,s=e<0?t*i.reverseLengthScale:t;this.trail.maxPoints=Math.round(Dt.lerp(i.minimumPointCount,i.maximumPointCount,Dt.clamp(s,0,1))),this.trail.maxTrimPerFrame=e<0?i.trimPerFrameReverse:i.trimPerFrameForward}updateOpacity(t){let{opacitySettings:e}=this.configuration,i=Dt.clamp(t+e.startVisibilityBias,0,1),s=1-t,r=Math.min(i,s),a=Dt.smoothstep(r,e.edgeFadeStart,e.edgeFadeEnd),o=!this.runtimeState.hasUserMovedFromStart&&t<=e.idleProgressThreshold?e.idleOpacityAtStart:0,l=Math.max(a,o),c=e.baseOpacity*l;this.runtimeState.currentOpacity=Dt.lerp(this.runtimeState.currentOpacity,c,e.opacitySmoothing),this.trail.material.opacity=this.runtimeState.currentOpacity}};var id=class{constructor(){this.isInitialized=!1,this.isDisposed=!1,this.frameDarkPlaneCount=2,this.isFrameTextDark=null,this.debug=new Rl,this.gallery=new ll(this.debug),this.label=new Il(this.gallery),this.background=new cl(this.debug),this.trailController=new Fl({gallery:this.gallery,debug:this.debug})}async init(t,e){if(this.isInitialized)return;await this.gallery.init(t),this.label.init(),this.background.init(),this.trailController.init(t,e);let i=this.gallery.getPlaneBlendData(e.position.z);this.updateFrameTextTone(i),this.isInitialized=!0}updateFrameTextTone(t){if(!t)return;let i=(t.blend>=.5?t.nextPlaneIndex:t.currentPlaneIndex)<this.frameDarkPlaneCount;this.isFrameTextDark!==i&&(this.isFrameTextDark=i,document.body.classList.toggle("frame-text-dark",i))}update(t,e=null,i=null){if(this.trailController.update(e,i,t),this.gallery.update(e,i),this.label.update(e),e){let s=this.gallery.getPlaneBlendData(e.position.z);this.updateFrameTextTone(s);let r=this.gallery.getMoodBlendData(e.position.z);r&&this.background.setMoodBlend(r);let a=this.gallery.getDepthProgress(e.position.z),o=i?.velocityMax||1,l=Dt.clamp(Math.abs(i?.velocity||0)/Math.max(o,1e-4),0,1),c=s?.blend??0,h=Math.abs(c-.5)*2,d=Dt.smoothstep(h,.35,1),u=l*d;this.background.setMotionResponse({depthProgress:a,velocityIntensity:u})}this.background.update(t)}dispose(){this.isDisposed||(this.trailController.dispose(),this.gallery.dispose(),this.label.dispose(),this.background.dispose(),this.isDisposed=!0)}},Sm=new id;var Nl=class{constructor(t,e,i=null){this.isInitialized=!1,this.isDebugBound=!1,this.camera=t,this.gallery=e,this.debug=i,this.scrollTarget=0,this.scrollCurrent=0,this.scrollSmoothing=.08,this.scrollToWorldFactor=.01,this.wheelScrollSpeed=1,this.touchScrollSpeed=1.8,this.previousScrollCurrent=0,this.invertScroll=!1,this.rawVelocity=0,this.velocity=0,this.velocityDamping=.12,this.velocityMax=1.5,this.velocityStopThreshold=1e-4,this.useScrollBounds=!0,this.firstPlaneViewOffset=5,this.lastPlaneViewOffset=5,this.minCameraZ=-1/0,this.maxCameraZ=1/0,this.cameraStartZ=this.camera.position.z,this.showVelocityVisualizer=!0,this.debugUiVisible=!1,this.touchY=0,this.velocityVisualizerElement=null,this.velocityVisualizerFillElement=null,this.velocityVisualizerValueElement=null,this.onWheel=s=>{s.preventDefault();let r=this.normalizeWheelDelta(s)*this.wheelScrollSpeed;this.addScrollInput(r)},this.onTouchStart=s=>{this.touchY=s.touches[0]?.clientY??0},this.onTouchMove=s=>{s.preventDefault();let r=s.touches[0]?.clientY??this.touchY,a=this.touchY-r;this.addScrollInput(a*this.touchScrollSpeed),this.touchY=r}}init(){this.isInitialized||(this.updateCameraBounds(),this.cameraStartZ=this.maxCameraZ,this.camera.position.z=this.cameraStartZ,this.scrollTarget=0,this.scrollCurrent=0,this.previousScrollCurrent=this.scrollCurrent,this.rawVelocity=0,this.velocity=0,this.createVelocityVisualizer(),this.updateVelocityVisualizer(),this.bindDebug(),this.isInitialized=!0)}bindEvents(){window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("touchstart",this.onTouchStart,{passive:!0}),window.addEventListener("touchmove",this.onTouchMove,{passive:!1})}updateCameraBounds(){let t=this.gallery.getDepthRange();this.maxCameraZ=t.nearestZ+this.firstPlaneViewOffset,this.minCameraZ=t.deepestZ+this.lastPlaneViewOffset,this.minCameraZ>this.maxCameraZ&&(this.minCameraZ=this.maxCameraZ)}cameraZFromScroll(t){return this.cameraStartZ-t*this.scrollToWorldFactor}scrollFromCameraZ(t){return this.scrollToWorldFactor===0?0:(this.cameraStartZ-t)/this.scrollToWorldFactor}normalizeWheelDelta(t){return t.deltaMode===1?t.deltaY*16:t.deltaMode===2?t.deltaY*window.innerHeight:t.deltaY}addScrollInput(t){let e=this.invertScroll?-1:1;this.scrollTarget+=t*e}updateVelocity(){this.rawVelocity=this.scrollCurrent-this.previousScrollCurrent,this.velocity=Dt.lerp(this.velocity,this.rawVelocity,this.velocityDamping),this.velocity=Dt.clamp(this.velocity,-this.velocityMax,this.velocityMax),Math.abs(this.velocity)<this.velocityStopThreshold&&(this.velocity=0),this.previousScrollCurrent=this.scrollCurrent}createVelocityVisualizer(){if(this.velocityVisualizerElement)return;let t=document.createElement("div");t.className="velocity-visualizer";let e=document.createElement("p");e.className="velocity-visualizer__label",e.textContent="Velocity";let i=document.createElement("p");i.className="velocity-visualizer__value",i.textContent="0.0000";let s=document.createElement("div");s.className="velocity-visualizer__track";let r=document.createElement("div");r.className="velocity-visualizer__fill",s.append(r),t.append(e,i,s),document.body.append(t),this.velocityVisualizerElement=t,this.velocityVisualizerFillElement=r,this.velocityVisualizerValueElement=i,this.setVelocityVisualizerVisible(this.showVelocityVisualizer)}setVelocityVisualizerVisible(t){if(!this.velocityVisualizerElement)return;let e=!!t&&this.debugUiVisible;this.velocityVisualizerElement.style.display=e?"block":"none"}setDebugUiVisible(t){this.debugUiVisible=!!t,this.setVelocityVisualizerVisible(this.showVelocityVisualizer)}updateVelocityVisualizer(){if(!this.velocityVisualizerElement||!this.velocityVisualizerFillElement||!this.velocityVisualizerValueElement)return;let t=this.velocity===0?0:Math.sign(this.velocity),i=Dt.clamp(Math.abs(this.velocity)/this.velocityMax,0,1)*50;t>=0?(this.velocityVisualizerFillElement.style.left="50%",this.velocityVisualizerFillElement.style.width=`${i}%`):(this.velocityVisualizerFillElement.style.left=`${50-i}%`,this.velocityVisualizerFillElement.style.width=`${i}%`),this.velocityVisualizerFillElement.style.backgroundColor=t>=0?"#7fffd4":"#ff8fab",this.velocityVisualizerValueElement.textContent=this.velocity.toFixed(4)}update(){if(this.updateCameraBounds(),this.scrollCurrent=Dt.lerp(this.scrollCurrent,this.scrollTarget,this.scrollSmoothing),this.useScrollBounds){let e=this.scrollFromCameraZ(this.maxCameraZ),i=this.scrollFromCameraZ(this.minCameraZ);this.scrollTarget=Dt.clamp(this.scrollTarget,e,i),this.scrollCurrent=Dt.clamp(this.scrollCurrent,e,i)}this.updateVelocity(),this.updateVelocityVisualizer();let t=this.cameraZFromScroll(this.scrollCurrent);if(this.useScrollBounds){this.camera.position.z=Dt.clamp(t,this.minCameraZ,this.maxCameraZ);return}this.camera.position.z=t}bindDebug(){!this.debug||this.isDebugBound||(this.debug.addBinding({folderTitle:"Scroll",targetObject:this,property:"useScrollBounds",label:"Use Bounds"}),this.debug.addBinding({folderTitle:"Scroll",targetObject:this,property:"invertScroll",label:"Invert Scroll"}),this.debug.addBinding({folderTitle:"Scroll",targetObject:this,property:"showVelocityVisualizer",label:"Debug Velocity",onChange:t=>{this.setVelocityVisualizerVisible(t)}}),this.debug.addBinding({folderTitle:"Scroll",targetObject:this,property:"velocityDamping",label:"Velocity Damping",options:{min:.01,max:1,step:.01}}),this.debug.addBinding({folderTitle:"Scroll",targetObject:this,property:"velocityMax",label:"Velocity Max",options:{min:.1,max:5,step:.1}}),this.isDebugBound=!0)}dispose(){window.removeEventListener("wheel",this.onWheel),window.removeEventListener("touchstart",this.onTouchStart),window.removeEventListener("touchmove",this.onTouchMove),this.velocityVisualizerElement&&this.velocityVisualizerElement.remove(),this.velocityVisualizerElement=null,this.velocityVisualizerFillElement=null,this.velocityVisualizerValueElement=null}};var Ul=class{constructor(t,e=Sm){if(!(t instanceof HTMLCanvasElement))throw new Error("Engine requires a valid canvas element");this.canvas=t,this.experience=e,this.debug=this.experience.debug,this.isInitialized=!1,this.isDisposed=!1,this.isRunning=!1,this.isDebugBound=!1,this.animationFrameRequestId=null,this.preloadedTextures=new Map,this.stats=null,this.showFps=!0,this.isDebugUiVisible=!1,this.scene=new Gi,this.camera=new Oe(45,1,.1,100),this.camera.position.set(0,0,6),this.scroll=new Nl(this.camera,this.experience.gallery,this.debug),this.renderer=new rl({canvas:this.canvas,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.outputColorSpace=Ue,this.renderer.autoClear=!1,this.onResize=()=>{this.resize()},this.onKeyDown=i=>{i.repeat||i.key.toLowerCase()==="d"&&this.setDebugUiVisible(!this.isDebugUiVisible)},this.animate=this.update.bind(this)}async init({autoStart:t=!0}={}){if(!this.isInitialized){document.body.classList.add("loading");try{if(this.preloadedTextures=await this.preloadTextures(),this.isDisposed)throw new DOMException("Disposed","AbortError");if(this.experience.gallery.setPreloadedTextures(this.preloadedTextures),await this.experience.init(this.scene,this.camera),this.isDisposed)throw new DOMException("Disposed","AbortError");this.scroll.init(),this.initStats(),this.bindDebug(),this.setDebugUiVisible(!1),this.resize(),window.addEventListener("resize",this.onResize),window.addEventListener("keydown",this.onKeyDown),this.scroll.bindEvents(),this.isInitialized=!0,t&&this.start()}finally{document.body.classList.remove("loading")}}}start(){this.isDisposed||!this.isInitialized||this.isRunning||(this.isRunning=!0,this.update())}resize(){let t=this.canvas.clientWidth||window.innerWidth||1,e=this.canvas.clientHeight||window.innerHeight||1;t<=0||e<=0||(this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1),this.experience.gallery.updatePlaneScale(),this.experience.gallery.layoutPlanes(),this.experience.label.resize(t,e))}async preloadTextures(){let t=this.experience.gallery.getTextureSources();if(!t.length)return new Map;let e=new br,i=new Map;return this.preloadedTextures=i,await Promise.all(t.map(async s=>{try{let r=await e.loadAsync(s);if(this.isDisposed)throw r.dispose(),new DOMException("Disposed","AbortError");r.colorSpace=Ue,i.set(s,r)}catch(r){throw new Error(`Texture failed to load: ${s}: ${r.message}`)}})),i}update(){this.isRunning&&(this.animationFrameRequestId=requestAnimationFrame(this.animate),this.renderFrame())}renderFrame(){if(this.isDisposed||!this.isInitialized)return;this.stats?.begin();let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:performance.now();this.scroll.update(),this.experience.update(t,this.camera,this.scroll),this.renderer.clear(!0,!0,!0),this.experience.background.render(this.renderer),this.renderer.clearDepth(),this.renderer.render(this.scene,this.camera),this.experience.label.render(),this.stats?.end()}initStats(){this.stats||(this.stats=new Zp,this.stats.showPanel(0),this.stats.dom.classList.add("fps-stats"),document.body.append(this.stats.dom),this.setFpsVisible(this.showFps))}setFpsVisible(t){if(!this.stats)return;let e=!!t&&this.isDebugUiVisible;this.stats.dom.style.display=e?"block":"none"}setDebugUiVisible(t){this.isDebugUiVisible=!!t,this.debug?.setVisible(this.isDebugUiVisible),this.scroll?.setDebugUiVisible(this.isDebugUiVisible),this.setFpsVisible(this.showFps)}bindDebug(){!this.debug||this.isDebugBound||(this.debug.addBinding({folderTitle:"Engine",targetObject:this,property:"showFps",label:"Show FPS",onChange:t=>{this.setFpsVisible(t)}}),this.isDebugBound=!0)}dispose(){this.isDisposed||(this.isDisposed=!0,this.isRunning=!1,this.animationFrameRequestId!==null&&(cancelAnimationFrame(this.animationFrameRequestId),this.animationFrameRequestId=null),window.removeEventListener("resize",this.onResize),window.removeEventListener("keydown",this.onKeyDown),this.scroll.dispose(),this.preloadedTextures.forEach(t=>{t.dispose()}),this.preloadedTextures.clear(),this.stats?.dom.remove(),this.stats=null,this.experience.dispose?.(),this.debug?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss())}};var Ye;pe.setHandlers({stop(){Ye&&(Ye.isRunning=!1,cancelAnimationFrame(Ye.animationFrameRequestId))},resume(){Ye?.isInitialized&&Ye.start()},dispose(){Ye?.dispose()},inspect(){return{renderer:"Three183 WebGL2",input:["native pointer parallax","native wheel","native touch scroll"],rafActive:!!Ye?.isRunning,resources:"five local WebP textures",reducedMotionBehavior:"time-driven background/trail frozen; direct scroll and parallax retained"}}});(async()=>{Ye=new Ul(document.querySelector(".webgl")),gd(Ye.renderer),await Ye.init({autoStart:!1}),!pe.disposed&&(Ye.renderFrame(),vd(Ye.renderer),pe.succeed({textures:Ye.preloadedTextures.size,sceneInitialized:!0,firstFrameSubmitted:!0}),pe.running&&Ye.start())})().catch(n=>pe.fail(n));})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

tweakpane/dist/tweakpane.js:
  (*! Tweakpane 4.0.5 (c) 2016 cocopon, licensed under the MIT license. *)
*/
