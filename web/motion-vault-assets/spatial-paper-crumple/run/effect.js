(()=>{var _m=Object.defineProperty;var Ie=(s,t)=>()=>(s&&(t=s(s=0)),t);var wm=(s,t)=>{for(var e in t)_m(s,e,{get:t[e],enumerable:!0})};function Mu(s){On||!ee.running||s.id!==null||(s.started=performance.now(),s.id=setTimeout(()=>{s.id=null,ss.delete(s),!On&&ee.running&&s.callback()},s.remaining))}function Eu(s){return new Promise((t,e)=>{if(On){e(Sl());return}let n=new Image,i=()=>{n.onload=n.onerror=null,Ar.signal.removeEventListener("abort",r)},r=()=>{i(),n.removeAttribute("src"),e(Sl())};n.onload=()=>{i(),t(n)},n.onerror=()=>{i(),e(new Error("Image failed to load: "+String(s).slice(0,180)))},Ar.signal.addEventListener("abort",r,{once:!0}),n.src=s})}function Au(s){s.debug&&(s.debug.checkShaderErrors=!0,s.debug.onShaderError=(t,e,n,i)=>{let r=new Error("Shader compilation/link failed: "+[t.getProgramInfoLog(e),t.getShaderInfoLog(n),t.getShaderInfoLog(i)].filter(Boolean).join(`
`));throw ee.fail(r),r})}function Tu(s){let t=s.getContext();if(t.isContextLost())throw new Error("WebGL context lost during first frame");let e=t.getError();if(e!==t.NO_ERROR)throw new Error("WebGL first frame error: 0x"+e.toString(16))}var Ar,_o,ss,As,Ts,On,Er,bu,bl,Su,Sl,ee,wo=Ie(()=>{Ar=new AbortController,_o=new Set,ss=new Set,As={},Ts=!1,On=!1,Su=new Promise((s,t)=>{bu=s,bl=t});Su.catch(()=>{});window.sourceErrors=[];Sl=()=>new DOMException("Source disposed before readiness","AbortError");ee={ready:Su,isReady:!1,status:"loading",running:!document.hidden,signal:Ar.signal,get disposed(){return On},setHandlers(s){As={...As,...s}},addCleanup(s){return _o.add(s),()=>_o.delete(s)},listen(s,t,e,n={}){s.addEventListener(t,e,{...n,signal:Ar.signal})},schedule(s,t){let e={callback:s,remaining:t,started:0,id:null};return ss.add(e),Mu(e),e},succeed(s){On||Ts||(Ts=!0,this.isReady=!0,this.status="ready",this.evidence=s,bu(s))},fail(s){let t=s instanceof Error?s:new Error(String(s));On&&t.name==="AbortError"||(window.sourceErrors.push(t.message),On||(this.status="error"),Ts||(Ts=!0,bl(t)),this.stop(),console.error(t))},stop(){this.running=!1;for(let s of ss)s.id!==null&&(clearTimeout(s.id),s.id=null,s.remaining=Math.max(0,s.remaining-(performance.now()-s.started)));As.stop?.()},resume(){if(!(On||this.status==="error")){this.running=!0;for(let s of ss)Mu(s);As.resume?.()}},paint(){return this.isReady&&!On},dispose(){if(Er)return Er;On=!0,this.stop(),Ar.abort(),Ts||(Ts=!0,bl(Sl()));let s=[];for(let t of _o)try{s.push(t())}catch(e){s.push(Promise.reject(e))}_o.clear(),ss.clear();try{s.push(As.dispose?.())}catch(t){s.push(Promise.reject(t))}return window.dispatchEvent(new Event("vault-source-dispose")),this.isReady=!1,this.status="disposed",Er=Promise.allSettled(s).then(t=>{let e=t.find(n=>n.status==="rejected");if(e)throw this.status="dispose-error",e.reason}),Er.catch(t=>console.error(t)),Er},inspect(){return{status:this.status,ready:this.isReady,running:this.running,disposed:On,scheduledTimers:ss.size,activeTimers:[...ss].filter(s=>s.id!==null).length,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,viewport:{width:innerWidth,height:innerHeight},evidence:this.evidence||null,errors:[...window.sourceErrors],...As.inspect?.()}}};window.SourceDemo=ee;ee.listen(window,"error",s=>ee.fail(s.error||s.message));ee.listen(window,"unhandledrejection",s=>ee.fail(s.reason));ee.listen(window,"pagehide",s=>s.persisted?ee.stop():ee.dispose());ee.listen(window,"pageshow",()=>{document.hidden||ee.resume()});ee.listen(document,"visibilitychange",()=>document.hidden?ee.stop():ee.resume())});function Yi(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[s&255]+hn[s>>8&255]+hn[s>>16&255]+hn[s>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[e&63|128]+hn[e>>8&255]+"-"+hn[e>>16&255]+hn[e>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function Ze(s,t,e){return Math.max(t,Math.min(e,s))}function Qc(s,t){return(s%t+t)%t}function ug(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function dg(s,t,e){return s!==t?(e-s)/(t-s):0}function Nr(s,t,e){return(1-e)*s+e*t}function fg(s,t,e,n){return Nr(s,t,1-Math.exp(-e*n))}function pg(s,t=1){return t-Math.abs(Qc(s,t*2)-t)}function mg(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function gg(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function vg(s,t){return s+Math.floor(Math.random()*(t-s+1))}function yg(s,t){return s+Math.random()*(t-s)}function xg(s){return s*(.5-Math.random())}function _g(s){s!==void 0&&(fd=s);let t=fd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wg(s){return s*Lr}function Mg(s){return s*er}function hc(s){return(s&s-1)===0&&s!==0}function bg(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function na(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Sg(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ws(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function mn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function Tf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Eg(){let s=Br("canvas");return s.style.display="block",s}function Dr(s){s in pd||(pd[s]=!0,console.warn(s))}function js(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Nl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function Dl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ia.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function Ul(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){os.fromArray(s,r);let a=i.x*Math.abs(os.x)+i.y*Math.abs(os.y)+i.z*Math.abs(os.z),l=t.dot(os),c=e.dot(os),h=n.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}function Xl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}function Og(){let s=new ArrayBuffer(4),t=new Float32Array(s),e=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function zg(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Ze(s,-65504,65504),mi.floatView[0]=s;let t=mi.uint32View[0],e=t>>23&511;return mi.baseTable[e]+((t&8388607)>>mi.shiftTable[e])}function kg(s){let t=s>>10;return mi.uint32View[0]=mi.mantissaTable[mi.offsetTable[t]+(s&1023)]+mi.exponentTable[t],mi.floatView[0]}function Hg(s,t,e,n,i,r,o,a){let l;if(t.side===Sn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Bi,a),l===null)return null;zo.copy(a),zo.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(zo);return c<e.near||c>e.far?null:{distance:c,point:zo.clone(),object:s}}function ko(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Os),s.getVertexPosition(l,zs),s.getVertexPosition(c,ks);let h=Hg(s,t,e,n,Os,zs,ks,Oo);if(h){i&&(Fo.fromBufferAttribute(i,a),Uo.fromBufferAttribute(i,l),Bo.fromBufferAttribute(i,c),h.uv=Xs.getInterpolation(Oo,Os,zs,ks,Fo,Uo,Bo,new jt)),r&&(Fo.fromBufferAttribute(r,a),Uo.fromBufferAttribute(r,l),Bo.fromBufferAttribute(r,c),h.uv1=Xs.getInterpolation(Oo,Os,zs,ks,Fo,Uo,Bo,new jt),h.uv2=h.uv1),o&&(Td.fromBufferAttribute(o,a),Cd.fromBufferAttribute(o,l),Rd.fromBufferAttribute(o,c),h.normal=Xs.getInterpolation(Oo,Os,zs,ks,Td,Cd,Rd,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new H,materialIndex:0};Xs.getNormal(Os,zs,ks,d.normal),h.face=d}return h}function rr(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function gn(s){let t={};for(let e=0;e<s.length;e++){let n=rr(s[e]);for(let i in n)t[i]=n[i]}return t}function Gg(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Rf(s){return s.getRenderTarget()===null?s.outputColorSpace:fe.workingColorSpace}function Pf(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Zg(s,t){let e=t.isWebGL2,n=new WeakMap;function i(c,h){let d=c.array,u=c.usage,f=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,u),c.onUploadCallback();let v;if(d instanceof Float32Array)v=s.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=s.SHORT;else if(d instanceof Uint32Array)v=s.UNSIGNED_INT;else if(d instanceof Int32Array)v=s.INT;else if(d instanceof Int8Array)v=s.BYTE;else if(d instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,d){let u=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,c),f.count===-1&&g.length===0&&s.bufferSubData(d,0,u),g.length!==0){for(let v=0,p=g.length;v<p;v++){let m=g[v];e?s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=n.get(c);if(d===void 0)n.set(c,i(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:o,remove:a,update:l}}function Cy(s,t,e,n,i,r,o){let a=new zt(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(p,m){let x=!1,y=m.isScene===!0?m.background:null;y&&y.isTexture&&(y=(m.backgroundBlurriness>0?e:t).get(y)),y===null?v(a,l):y&&y.isColor&&(v(y,1),x=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===La)?(h===void 0&&(h=new Fe(new zr(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:rr(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=fe.getTransfer(y.colorSpace)!==Me,(d!==y||u!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Fe(new or(2,2),new Ke({name:"BackgroundMaterial",uniforms:rr(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=fe.getTransfer(y.colorSpace)!==Me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function v(p,m){p.getRGB(Ho,Rf(s)),n.buffers.color.setClear(Ho.r,Ho.g,Ho.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,v(a,l)},render:g}}function Ry(s,t,e,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=p(null),c=l,h=!1;function d(I,F,z,et,Z){let Y=!1;if(o){let nt=v(et,z,F);c!==nt&&(c=nt,f(c.object)),Y=m(I,et,z,Z),Y&&x(I,et,z,Z)}else{let nt=F.wireframe===!0;(c.geometry!==et.id||c.program!==z.id||c.wireframe!==nt)&&(c.geometry=et.id,c.program=z.id,c.wireframe=nt,Y=!0)}Z!==null&&e.update(Z,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,G(I,F,z,et),Z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(I){return n.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function v(I,F,z){let et=z.wireframe===!0,Z=a[I.id];Z===void 0&&(Z={},a[I.id]=Z);let Y=Z[F.id];Y===void 0&&(Y={},Z[F.id]=Y);let nt=Y[et];return nt===void 0&&(nt=p(u()),Y[et]=nt),nt}function p(I){let F=[],z=[],et=[];for(let Z=0;Z<i;Z++)F[Z]=0,z[Z]=0,et[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:et,object:I,attributes:{},index:null}}function m(I,F,z,et){let Z=c.attributes,Y=F.attributes,nt=0,rt=z.getAttributes();for(let tt in rt)if(rt[tt].location>=0){let ot=Z[tt],gt=Y[tt];if(gt===void 0&&(tt==="instanceMatrix"&&I.instanceMatrix&&(gt=I.instanceMatrix),tt==="instanceColor"&&I.instanceColor&&(gt=I.instanceColor)),ot===void 0||ot.attribute!==gt||gt&&ot.data!==gt.data)return!0;nt++}return c.attributesNum!==nt||c.index!==et}function x(I,F,z,et){let Z={},Y=F.attributes,nt=0,rt=z.getAttributes();for(let tt in rt)if(rt[tt].location>=0){let ot=Y[tt];ot===void 0&&(tt==="instanceMatrix"&&I.instanceMatrix&&(ot=I.instanceMatrix),tt==="instanceColor"&&I.instanceColor&&(ot=I.instanceColor));let gt={};gt.attribute=ot,ot&&ot.data&&(gt.data=ot.data),Z[tt]=gt,nt++}c.attributes=Z,c.attributesNum=nt,c.index=et}function y(){let I=c.newAttributes;for(let F=0,z=I.length;F<z;F++)I[F]=0}function M(I){P(I,0)}function P(I,F){let z=c.newAttributes,et=c.enabledAttributes,Z=c.attributeDivisors;z[I]=1,et[I]===0&&(s.enableVertexAttribArray(I),et[I]=1),Z[I]!==F&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,F),Z[I]=F)}function T(){let I=c.newAttributes,F=c.enabledAttributes;for(let z=0,et=F.length;z<et;z++)F[z]!==I[z]&&(s.disableVertexAttribArray(z),F[z]=0)}function R(I,F,z,et,Z,Y,nt){nt===!0?s.vertexAttribIPointer(I,F,z,Z,Y):s.vertexAttribPointer(I,F,z,et,Z,Y)}function G(I,F,z,et){if(n.isWebGL2===!1&&(I.isInstancedMesh||et.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();let Z=et.attributes,Y=z.getAttributes(),nt=F.defaultAttributeValues;for(let rt in Y){let tt=Y[rt];if(tt.location>=0){let J=Z[rt];if(J===void 0&&(rt==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),rt==="instanceColor"&&I.instanceColor&&(J=I.instanceColor)),J!==void 0){let ot=J.normalized,gt=J.itemSize,pt=e.get(J);if(pt===void 0)continue;let vt=pt.buffer,bt=pt.type,it=pt.bytesPerElement,at=n.isWebGL2===!0&&(bt===s.INT||bt===s.UNSIGNED_INT||J.gpuType===yf);if(J.isInterleavedBufferAttribute){let wt=J.data,X=wt.stride,Vt=J.offset;if(wt.isInstancedInterleavedBuffer){for(let Tt=0;Tt<tt.locationSize;Tt++)P(tt.location+Tt,wt.meshPerAttribute);I.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let Tt=0;Tt<tt.locationSize;Tt++)M(tt.location+Tt);s.bindBuffer(s.ARRAY_BUFFER,vt);for(let Tt=0;Tt<tt.locationSize;Tt++)R(tt.location+Tt,gt/tt.locationSize,bt,ot,X*it,(Vt+gt/tt.locationSize*Tt)*it,at)}else{if(J.isInstancedBufferAttribute){for(let wt=0;wt<tt.locationSize;wt++)P(tt.location+wt,J.meshPerAttribute);I.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let wt=0;wt<tt.locationSize;wt++)M(tt.location+wt);s.bindBuffer(s.ARRAY_BUFFER,vt);for(let wt=0;wt<tt.locationSize;wt++)R(tt.location+wt,gt/tt.locationSize,bt,ot,gt*it,gt/tt.locationSize*wt*it,at)}}else if(nt!==void 0){let ot=nt[rt];if(ot!==void 0)switch(ot.length){case 2:s.vertexAttrib2fv(tt.location,ot);break;case 3:s.vertexAttrib3fv(tt.location,ot);break;case 4:s.vertexAttrib4fv(tt.location,ot);break;default:s.vertexAttrib1fv(tt.location,ot)}}}}T()}function b(){q();for(let I in a){let F=a[I];for(let z in F){let et=F[z];for(let Z in et)g(et[Z].object),delete et[Z];delete F[z]}delete a[I]}}function E(I){if(a[I.id]===void 0)return;let F=a[I.id];for(let z in F){let et=F[z];for(let Z in et)g(et[Z].object),delete et[Z];delete F[z]}delete a[I.id]}function V(I){for(let F in a){let z=a[F];if(z[I.id]===void 0)continue;let et=z[I.id];for(let Z in et)g(et[Z].object),delete et[Z];delete z[I.id]}}function q(){W(),h=!0,c!==l&&(c=l,f(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:q,resetDefaultState:W,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfProgram:V,initAttributes:y,enableAttribute:M,disableUnusedAttributes:T}}function Py(s,t,e,n){let i=n.isWebGL2,r;function o(h){r=h}function a(h,d){s.drawArrays(r,h,d),e.update(d,r,1)}function l(h,d,u){if(u===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,d,u),e.update(d,r,u)}function c(h,d,u){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Iy(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),m=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,M=o||t.has("OES_texture_float"),P=y&&M,T=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:M,floatVertexTextures:P,maxSamples:T}}function Ly(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Hn,a=new re,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=s.get(d);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{let x=r?0:n,y=x*4,M=m.clippingState||null;l.value=M,M=h(g,u,y,f);for(let P=0;P!==y;++P)M[P]=e[P];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let m=f+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,M=f;y!==v;++y,M+=4)o.copy(d[y]).applyMatrix4(x,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Ny(s){let t=new WeakMap;function e(o,a){return a===Ur?o.mapping=Js:a===ac&&(o.mapping=Qs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ur||a===ac)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new pc(l.height/2);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}function Dy(s){let t=[],e=[],n=[],i=s,r=s-qs+1+Pd.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-qs?l=Pd[o-s+qs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,x=new Float32Array(v*g*f),y=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let T=0;T<f;T++){let R=T%3*2/3-1,G=T>2?0:-1,b=[R,G,0,R+2/3,G,0,R+2/3,G+1,0,R,G,0,R+2/3,G+1,0,R,G+1,0];x.set(b,v*g*T),y.set(u,p*g*T);let E=[T,T,T,T,T,T];M.set(E,m*g*T)}let P=new on;P.setAttribute("position",new rn(x,v)),P.setAttribute("uv",new rn(y,p)),P.setAttribute("faceIndex",new rn(M,m)),t.push(P),i>qs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Nd(s,t,e){let n=new En(s,t,e);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Go(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Fy(s,t,e){let n=new Float32Array(hs),i=new H(0,1,0);return new Ke({name:"SphericalGaussianBlur",defines:{n:hs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:eh(),fragmentShader:`

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
		`,blending:$e,depthTest:!1,depthWrite:!1})}function Dd(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eh(),fragmentShader:`

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
		`,blending:$e,depthTest:!1,depthWrite:!1})}function Fd(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$e,depthTest:!1,depthWrite:!1})}function eh(){return`

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
	`}function Uy(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ur||l===ac,h=l===Js||l===Qs;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new ca(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{let d=a.image;if(c&&d&&d.height>0||h&&d&&i(d)){e===null&&(e=new ca(s));let u=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function By(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Oy(s,t,e,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);for(let g in u.morphAttributes){let v=u.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)t.remove(v[p])}u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let g in u)t.update(u[g],s.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let v=f[g];for(let p=0,m=v.length;p<m;p++)t.update(v[p],s.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(f!==null){let x=f.array;v=f.version;for(let y=0,M=x.length;y<M;y+=3){let P=x[y+0],T=x[y+1],R=x[y+2];u.push(P,T,T,R,R,P)}}else if(g!==void 0){let x=g.array;v=g.version;for(let y=0,M=x.length/3-1;y<M;y+=3){let P=y+0,T=y+1,R=y+2;u.push(P,T,T,R,R,P)}}else return;let p=new(Tf(u)?oa:sr)(u,1);p.version=v;let m=r.get(d);m&&t.remove(m),r.set(d,p)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function zy(s,t,e,n){let i=n.isWebGL2,r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,a,f*l),e.update(g,r,1)}function d(f,g,v){if(v===0)return;let p,m;if(i)p=s,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,a,f*l,v),e.update(g,r,v)}function u(f,g,v){if(v===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<v;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let m=0;for(let x=0;x<v;x++)m+=g[x];e.update(m,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function ky(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Vy(s,t){return s[0]-t[0]}function Hy(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Gy(s,t,e){let n={},i=new Float32Array(8),r=new WeakMap,o=new ce,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){let u=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,v=r.get(h);if(v===void 0||v.count!==g){let I=function(){q.dispose(),r.delete(h),h.removeEventListener("dispose",I)};v!==void 0&&v.texture.dispose();let x=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,P=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],G=0;x===!0&&(G=1),y===!0&&(G=2),M===!0&&(G=3);let b=h.attributes.position.count*G,E=1;b>t.maxTextureSize&&(E=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let V=new Float32Array(b*E*4*g),q=new ra(V,b,E,g);q.type=sn,q.needsUpdate=!0;let W=G*4;for(let F=0;F<g;F++){let z=P[F],et=T[F],Z=R[F],Y=b*E*4*F;for(let nt=0;nt<z.count;nt++){let rt=nt*W;x===!0&&(o.fromBufferAttribute(z,nt),V[Y+rt+0]=o.x,V[Y+rt+1]=o.y,V[Y+rt+2]=o.z,V[Y+rt+3]=0),y===!0&&(o.fromBufferAttribute(et,nt),V[Y+rt+4]=o.x,V[Y+rt+5]=o.y,V[Y+rt+6]=o.z,V[Y+rt+7]=0),M===!0&&(o.fromBufferAttribute(Z,nt),V[Y+rt+8]=o.x,V[Y+rt+9]=o.y,V[Y+rt+10]=o.z,V[Y+rt+11]=Z.itemSize===4?o.w:1)}}v={count:g,texture:q,size:new jt(b,E)},r.set(h,v),h.addEventListener("dispose",I)}let p=0;for(let x=0;x<u.length;x++)p+=u[x];let m=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(s,"morphTargetBaseInfluence",m),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",v.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}else{let f=u===void 0?0:u.length,g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let y=0;y<f;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<f;y++){let M=g[y];M[0]=y,M[1]=u[y]}g.sort(Hy);for(let y=0;y<8;y++)y<f&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(Vy);let v=h.morphAttributes.position,p=h.morphAttributes.normal,m=0;for(let y=0;y<8;y++){let M=a[y],P=M[0],T=M[1];P!==Number.MAX_SAFE_INTEGER&&T?(v&&h.getAttribute("morphTarget"+y)!==v[P]&&h.setAttribute("morphTarget"+y,v[P]),p&&h.getAttribute("morphNormal"+y)!==p[P]&&h.setAttribute("morphNormal"+y,p[P]),i[y]=T,m+=T):(v&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),p&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}let x=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Wy(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}function pr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Ud[i];if(r===void 0&&(r=new Float32Array(i),Ud[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Da(s,t){let e=Bd[t];e===void 0&&(e=new Int32Array(t),Bd[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Xy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function qy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function Yy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function Zy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function $y(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;kd.set(n),s.uniformMatrix2fv(this.addr,!1,kd),We(e,n)}}function jy(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;zd.set(n),s.uniformMatrix3fv(this.addr,!1,zd),We(e,n)}}function Ky(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Od.set(n),s.uniformMatrix4fv(this.addr,!1,Od),We(e,n)}}function Jy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Qy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function tx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function ex(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function nx(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function ix(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function sx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function rx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function ox(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?Lf:If;e.setTexture2D(t||r,i)}function ax(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Df,i)}function lx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ff,i)}function cx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Nf,i)}function hx(s){switch(s){case 5126:return Xy;case 35664:return qy;case 35665:return Yy;case 35666:return Zy;case 35674:return $y;case 35675:return jy;case 35676:return Ky;case 5124:case 35670:return Jy;case 35667:case 35671:return Qy;case 35668:case 35672:return tx;case 35669:case 35673:return ex;case 5125:return nx;case 36294:return ix;case 36295:return sx;case 36296:return rx;case 35678:case 36198:case 36298:case 36306:case 35682:return ox;case 35679:case 36299:case 36307:return ax;case 35680:case 36300:case 36308:case 36293:return lx;case 36289:case 36303:case 36311:case 36292:return cx}}function ux(s,t){s.uniform1fv(this.addr,t)}function dx(s,t){let e=pr(t,this.size,2);s.uniform2fv(this.addr,e)}function fx(s,t){let e=pr(t,this.size,3);s.uniform3fv(this.addr,e)}function px(s,t){let e=pr(t,this.size,4);s.uniform4fv(this.addr,e)}function mx(s,t){let e=pr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function gx(s,t){let e=pr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function vx(s,t){let e=pr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function yx(s,t){s.uniform1iv(this.addr,t)}function xx(s,t){s.uniform2iv(this.addr,t)}function _x(s,t){s.uniform3iv(this.addr,t)}function wx(s,t){s.uniform4iv(this.addr,t)}function Mx(s,t){s.uniform1uiv(this.addr,t)}function bx(s,t){s.uniform2uiv(this.addr,t)}function Sx(s,t){s.uniform3uiv(this.addr,t)}function Ex(s,t){s.uniform4uiv(this.addr,t)}function Ax(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ge(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||If,r[o])}function Tx(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ge(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Df,r[o])}function Cx(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ge(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Ff,r[o])}function Rx(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ge(n,r)||(s.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Nf,r[o])}function Px(s){switch(s){case 5126:return ux;case 35664:return dx;case 35665:return fx;case 35666:return px;case 35674:return mx;case 35675:return gx;case 35676:return vx;case 5124:case 35670:return yx;case 35667:case 35671:return xx;case 35668:case 35672:return _x;case 35669:case 35673:return wx;case 5125:return Mx;case 36294:return bx;case 36295:return Sx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Ax;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Cx;case 36289:case 36303:case 36311:case 36292:return Rx}}function Vd(s,t){s.seq.push(t),s.map[t.id]=t}function Ix(s,t,e){let n=s.name,i=n.length;for(Ql.lastIndex=0;;){let r=Ql.exec(n),o=Ql.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Vd(e,c===void 0?new mc(a,s,t):new gc(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new vc(a),Vd(e,d)),e=d}}}function Hd(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}function Dx(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Fx(s){let t=fe.getPrimaries(fe.workingColorSpace),e=fe.getPrimaries(s),n;switch(t===e?n="":t===ta&&e===Qo?n="LinearDisplayP3ToLinearSRGB":t===Qo&&e===ta&&(n="LinearSRGBToLinearDisplayP3"),s){case Nn:case Na:return[n,"LinearTransferOETF"];case Ee:case Kc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Gd(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Dx(s.getShaderSource(t),o)}else return i}function Ux(s,t){let e=Fx(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Bx(s,t){let e;switch(t){case Wc:e="Linear";break;case Xc:e="Reinhard";break;case qc:e="OptimizedCineon";break;case Yc:e="ACESFilmic";break;case Zc:e="AgX";break;case Xm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Ox(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ys).join(`
`)}function zx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ys).join(`
`)}function kx(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vx(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ys(s){return s!==""}function Wd(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function yc(s){return s.replace(Hx,Wx)}function Wx(s,t){let e=se[t];if(e===void 0){let n=Gx.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return yc(e)}function qd(s){return s.replace(Xx,qx)}function qx(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Yd(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Yx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===gf?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===kc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===pi&&(t="SHADOWMAP_TYPE_VSM"),t}function Zx(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Js:case Qs:t="ENVMAP_TYPE_CUBE";break;case La:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $x(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Qs:t="ENVMAP_MODE_REFRACTION";break}return t}function jx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ia:t="ENVMAP_BLENDING_MULTIPLY";break;case Gm:t="ENVMAP_BLENDING_MIX";break;case Wm:t="ENVMAP_BLENDING_ADD";break}return t}function Kx(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Jx(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Yx(e),c=Zx(e),h=$x(e),d=jx(e),u=Kx(e),f=e.isWebGL2?"":Ox(e),g=zx(e),v=kx(r),p=i.createProgram(),m,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ys).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ys).join(`
`),x.length>0&&(x+=`
`)):(m=[Yd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),x=[f,Yd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fi?"#define TONE_MAPPING":"",e.toneMapping!==Fi?se.tonemapping_pars_fragment:"",e.toneMapping!==Fi?Bx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Ux("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),o=yc(o),o=Wd(o,e),o=Xd(o,e),a=yc(a),a=Wd(a,e),a=Xd(a,e),o=qd(o),a=qd(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===dd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let M=y+m+o,P=y+x+a,T=Hd(i,i.VERTEX_SHADER,M),R=Hd(i,i.FRAGMENT_SHADER,P);i.attachShader(p,T),i.attachShader(p,R),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function G(q){if(s.debug.checkShaderErrors){let W=i.getProgramInfoLog(p).trim(),I=i.getShaderInfoLog(T).trim(),F=i.getShaderInfoLog(R).trim(),z=!0,et=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,T,R);else{let Z=Gd(i,T,"vertex"),Y=Gd(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+W+`
`+Z+`
`+Y)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(I===""||F==="")&&(et=!1);et&&(q.diagnostics={runnable:z,programLog:W,vertexShader:{log:I,prefix:m},fragmentShader:{log:F,prefix:x}})}i.deleteShader(T),i.deleteShader(R),b=new Ks(i,p),E=Vx(i,p)}let b;this.getUniforms=function(){return b===void 0&&G(this),b};let E;this.getAttributes=function(){return E===void 0&&G(this),E};let V=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(p,Lx)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nx++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=R,this}function t_(s,t,e,n,i,r,o){let a=new Or,l=new xc,c=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return b===0?"uv":`uv${b}`}function p(b,E,V,q,W){let I=q.fog,F=W.geometry,z=b.isMeshStandardMaterial?q.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||z),Z=et&&et.mapping===La?et.image.height:null,Y=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let nt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,rt=nt!==void 0?nt.length:0,tt=0;F.morphAttributes.position!==void 0&&(tt=1),F.morphAttributes.normal!==void 0&&(tt=2),F.morphAttributes.color!==void 0&&(tt=3);let J,ot,gt,pt;if(Y){let tn=Jn[Y];J=tn.vertexShader,ot=tn.fragmentShader}else J=b.vertexShader,ot=b.fragmentShader,l.update(b),gt=l.getVertexShaderID(b),pt=l.getFragmentShaderID(b);let vt=s.getRenderTarget(),bt=W.isInstancedMesh===!0,it=W.isBatchedMesh===!0,at=!!b.map,wt=!!b.matcap,X=!!et,Vt=!!b.aoMap,Tt=!!b.lightMap,Ft=!!b.bumpMap,Ct=!!b.normalMap,ae=!!b.displacementMap,Gt=!!b.emissiveMap,L=!!b.metalnessMap,A=!!b.roughnessMap,j=b.anisotropy>0,ht=b.clearcoat>0,lt=b.iridescence>0,ft=b.sheen>0,Rt=b.transmission>0,yt=j&&!!b.anisotropyMap,St=ht&&!!b.clearcoatMap,Dt=ht&&!!b.clearcoatNormalMap,kt=ht&&!!b.clearcoatRoughnessMap,ut=lt&&!!b.iridescenceMap,le=lt&&!!b.iridescenceThicknessMap,ne=ft&&!!b.sheenColorMap,Wt=ft&&!!b.sheenRoughnessMap,Pt=!!b.specularMap,Lt=!!b.specularColorMap,qt=!!b.specularIntensityMap,Yt=Rt&&!!b.transmissionMap,Kt=Rt&&!!b.thicknessMap,$t=!!b.gradientMap,K=!!b.alphaMap,k=b.alphaTest>0,Et=!!b.alphaHash,At=!!b.extensions,Zt=!!F.attributes.uv1,Xt=!!F.attributes.uv2,ve=!!F.attributes.uv3,ye=Fi;return b.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(ye=s.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:b.type,shaderName:b.name,vertexShader:J,fragmentShader:ot,defines:b.defines,customVertexShaderID:gt,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:it,instancing:bt,instancingColor:bt&&W.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Nn,map:at,matcap:wt,envMap:X,envMapMode:X&&et.mapping,envMapCubeUVHeight:Z,aoMap:Vt,lightMap:Tt,bumpMap:Ft,normalMap:Ct,displacementMap:u&&ae,emissiveMap:Gt,normalMapObjectSpace:Ct&&b.normalMapType===ig,normalMapTangentSpace:Ct&&b.normalMapType===jr,metalnessMap:L,roughnessMap:A,anisotropy:j,anisotropyMap:yt,clearcoat:ht,clearcoatMap:St,clearcoatNormalMap:Dt,clearcoatRoughnessMap:kt,iridescence:lt,iridescenceMap:ut,iridescenceThicknessMap:le,sheen:ft,sheenColorMap:ne,sheenRoughnessMap:Wt,specularMap:Pt,specularColorMap:Lt,specularIntensityMap:qt,transmission:Rt,transmissionMap:Yt,thicknessMap:Kt,gradientMap:$t,opaque:b.transparent===!1&&b.blending===$s,alphaMap:K,alphaTest:k,alphaHash:Et,combine:b.combine,mapUv:at&&v(b.map.channel),aoMapUv:Vt&&v(b.aoMap.channel),lightMapUv:Tt&&v(b.lightMap.channel),bumpMapUv:Ft&&v(b.bumpMap.channel),normalMapUv:Ct&&v(b.normalMap.channel),displacementMapUv:ae&&v(b.displacementMap.channel),emissiveMapUv:Gt&&v(b.emissiveMap.channel),metalnessMapUv:L&&v(b.metalnessMap.channel),roughnessMapUv:A&&v(b.roughnessMap.channel),anisotropyMapUv:yt&&v(b.anisotropyMap.channel),clearcoatMapUv:St&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:kt&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:le&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&v(b.sheenRoughnessMap.channel),specularMapUv:Pt&&v(b.specularMap.channel),specularColorMapUv:Lt&&v(b.specularColorMap.channel),specularIntensityMapUv:qt&&v(b.specularIntensityMap.channel),transmissionMapUv:Yt&&v(b.transmissionMap.channel),thicknessMapUv:Kt&&v(b.thicknessMap.channel),alphaMapUv:K&&v(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Ct||j),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Zt,vertexUv2s:Xt,vertexUv3s:ve,pointsUvs:W.isPoints===!0&&!!F.attributes.uv&&(at||K),fog:!!I,useFog:b.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:W.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:tt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:ye,useLegacyLights:s._useLegacyLights,decodeVideoTexture:at&&b.map.isVideoTexture===!0&&fe.getTransfer(b.map.colorSpace)===Me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Gn,flipSided:b.side===Sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:At&&b.extensions.derivatives===!0,extensionFragDepth:At&&b.extensions.fragDepth===!0,extensionDrawBuffers:At&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:At&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:At&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function m(b){let E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(let V in b.defines)E.push(V),E.push(b.defines[V]);return b.isRawShaderMaterial===!1&&(x(E,b),y(E,b),E.push(s.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function x(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function y(b,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function M(b){let E=g[b.type],V;if(E){let q=Jn[E];V=ei.clone(q.uniforms)}else V=b.uniforms;return V}function P(b,E){let V;for(let q=0,W=c.length;q<W;q++){let I=c[q];if(I.cacheKey===E){V=I,++V.usedTimes;break}}return V===void 0&&(V=new Jx(s,E,b,r),c.push(V)),V}function T(b){if(--b.usedTimes===0){let E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),b.destroy()}}function R(b){l.remove(b)}function G(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:M,acquireProgram:P,releaseProgram:T,releaseShaderCache:R,programs:c,dispose:G}}function e_(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function n_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Zd(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function $d(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,v,p){let m=s[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},s[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=v,m.group=p),t++,m}function a(d,u,f,g,v,p){let m=o(d,u,f,g,v,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(d,u,f,g,v,p){let m=o(d,u,f,g,v,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(d,u){e.length>1&&e.sort(d||n_),n.length>1&&n.sort(u||Zd),i.length>1&&i.sort(u||Zd)}function h(){for(let d=t,u=s.length;d<u;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function i_(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new $d,s.set(n,[o])):i>=r.length?(o=new $d,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function s_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new zt};break;case"SpotLight":e={position:new H,direction:new H,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new H,halfWidth:new H,halfHeight:new H};break}return s[t.id]=e,e}}}function r_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}function a_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function l_(s,t){let e=new s_,n=r_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new H);let r=new H,o=new Ut,a=new Ut;function l(h,d){let u=0,f=0,g=0;for(let q=0;q<9;q++)i.probe[q].set(0,0,0);let v=0,p=0,m=0,x=0,y=0,M=0,P=0,T=0,R=0,G=0,b=0;h.sort(a_);let E=d===!0?Math.PI:1;for(let q=0,W=h.length;q<W;q++){let I=h[q],F=I.color,z=I.intensity,et=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*z*E,f+=F.g*z*E,g+=F.b*z*E;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(I.sh.coefficients[Y],z);b++}else if(I.isDirectionalLight){let Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){let nt=I.shadow,rt=n.get(I);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,i.directionalShadow[v]=rt,i.directionalShadowMap[v]=Z,i.directionalShadowMatrix[v]=I.shadow.matrix,M++}i.directional[v]=Y,v++}else if(I.isSpotLight){let Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(F).multiplyScalar(z*E),Y.distance=et,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,i.spot[m]=Y;let nt=I.shadow;if(I.map&&(i.spotLightMap[R]=I.map,R++,nt.updateMatrices(I),I.castShadow&&G++),i.spotLightMatrix[m]=nt.matrix,I.castShadow){let rt=n.get(I);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,i.spotShadow[m]=rt,i.spotShadowMap[m]=Z,T++}m++}else if(I.isRectAreaLight){let Y=e.get(I);Y.color.copy(F).multiplyScalar(z),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),i.rectArea[x]=Y,x++}else if(I.isPointLight){let Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity*E),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){let nt=I.shadow,rt=n.get(I);rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,rt.shadowCameraNear=nt.camera.near,rt.shadowCameraFar=nt.camera.far,i.pointShadow[p]=rt,i.pointShadowMap[p]=Z,i.pointShadowMatrix[p]=I.shadow.matrix,P++}i.point[p]=Y,p++}else if(I.isHemisphereLight){let Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar(z*E),Y.groundColor.copy(I.groundColor).multiplyScalar(z*E),i.hemi[y]=Y,y++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=g;let V=i.hash;(V.directionalLength!==v||V.pointLength!==p||V.spotLength!==m||V.rectAreaLength!==x||V.hemiLength!==y||V.numDirectionalShadows!==M||V.numPointShadows!==P||V.numSpotShadows!==T||V.numSpotMaps!==R||V.numLightProbes!==b)&&(i.directional.length=v,i.spot.length=m,i.rectArea.length=x,i.point.length=p,i.hemi.length=y,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=P,i.pointShadowMap.length=P,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=P,i.spotLightMatrix.length=T+R-G,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=G,i.numLightProbes=b,V.directionalLength=v,V.pointLength=p,V.spotLength=m,V.rectAreaLength=x,V.hemiLength=y,V.numDirectionalShadows=M,V.numPointShadows=P,V.numSpotShadows=T,V.numSpotMaps=R,V.numLightProbes=b,i.version=o_++)}function c(h,d){let u=0,f=0,g=0,v=0,p=0,m=d.matrixWorldInverse;for(let x=0,y=h.length;x<y;x++){let M=h[x];if(M.isDirectionalLight){let P=i.directional[u];P.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(m),u++}else if(M.isSpotLight){let P=i.spot[g];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),P.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let P=i.rectArea[v];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),a.identity(),o.copy(M.matrixWorld),o.premultiply(m),a.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),v++}else if(M.isPointLight){let P=i.point[f];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let P=i.hemi[p];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function jd(s,t){let e=new l_(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function c_(s,t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),l;return a===void 0?(l=new jd(s,t),e.set(r,[l])):o>=a.length?(l=new jd(s,t),a.push(l)):l=a[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}function d_(s,t,e){let n=new kr,i=new jt,r=new jt,o=new ce,a=new wc({depthPacking:ng}),l=new Mc,c={},h=e.maxTextureSize,d={[Bi]:Sn,[Sn]:Bi,[Gn]:Gn},u=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:h_,fragmentShader:u_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new on;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Fe(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gf;let m=this.type;this.render=function(T,R,G){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let b=s.getRenderTarget(),E=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),q=s.state;q.setBlending($e),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let W=m!==pi&&this.type===pi,I=m===pi&&this.type!==pi;for(let F=0,z=T.length;F<z;F++){let et=T[F],Z=et.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);let Y=Z.getFrameExtents();if(i.multiply(Y),r.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,Z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,Z.mapSize.y=r.y)),Z.map===null||W===!0||I===!0){let rt=this.type!==pi?{minFilter:ze,magFilter:ze}:{};Z.map!==null&&Z.map.dispose(),Z.map=new En(i.x,i.y,rt),Z.map.texture.name=et.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();let nt=Z.getViewportCount();for(let rt=0;rt<nt;rt++){let tt=Z.getViewport(rt);o.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),q.viewport(o),Z.updateMatrices(et,rt),n=Z.getFrustum(),M(R,G,Z.camera,et,this.type)}Z.isPointLightShadow!==!0&&this.type===pi&&x(Z,G),Z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(b,E,V)};function x(T,R){let G=t.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new En(i.x,i.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(R,null,G,u,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(R,null,G,f,v,null)}function y(T,R,G,b){let E=null,V=G.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(V!==void 0)E=V;else if(E=G.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let q=E.uuid,W=R.uuid,I=c[q];I===void 0&&(I={},c[q]=I);let F=I[W];F===void 0&&(F=E.clone(),I[W]=F,R.addEventListener("dispose",P)),E=F}if(E.visible=R.visible,E.wireframe=R.wireframe,b===pi?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:d[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,G.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let q=s.properties.get(E);q.light=G}return E}function M(T,R,G,b,E){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===pi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld);let W=t.update(T),I=T.material;if(Array.isArray(I)){let F=W.groups;for(let z=0,et=F.length;z<et;z++){let Z=F[z],Y=I[Z.materialIndex];if(Y&&Y.visible){let nt=y(T,Y,b,E);T.onBeforeShadow(s,T,R,G,W,nt,Z),s.renderBufferDirect(G,null,W,nt,T,Z),T.onAfterShadow(s,T,R,G,W,nt,Z)}}}else if(I.visible){let F=y(T,I,b,E);T.onBeforeShadow(s,T,R,G,W,F,null),s.renderBufferDirect(G,null,W,F,T,null),T.onAfterShadow(s,T,R,G,W,F,null)}}let q=T.children;for(let W=0,I=q.length;W<I;W++)M(q[W],R,G,b,E)}function P(T){T.target.removeEventListener("dispose",P);for(let G in c){let b=c[G],E=T.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}function f_(s,t,e){let n=e.isWebGL2;function i(){let k=!1,Et=new ce,At=null,Zt=new ce(0,0,0,0);return{setMask:function(Xt){At!==Xt&&!k&&(s.colorMask(Xt,Xt,Xt,Xt),At=Xt)},setLocked:function(Xt){k=Xt},setClear:function(Xt,ve,ye,Be,tn){tn===!0&&(Xt*=Be,ve*=Be,ye*=Be),Et.set(Xt,ve,ye,Be),Zt.equals(Et)===!1&&(s.clearColor(Xt,ve,ye,Be),Zt.copy(Et))},reset:function(){k=!1,At=null,Zt.set(-1,0,0,0)}}}function r(){let k=!1,Et=null,At=null,Zt=null;return{setTest:function(Xt){Xt?it(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(Xt){Et!==Xt&&!k&&(s.depthMask(Xt),Et=Xt)},setFunc:function(Xt){if(At!==Xt){switch(Xt){case Um:s.depthFunc(s.NEVER);break;case Bm:s.depthFunc(s.ALWAYS);break;case Om:s.depthFunc(s.LESS);break;case $o:s.depthFunc(s.LEQUAL);break;case zm:s.depthFunc(s.EQUAL);break;case km:s.depthFunc(s.GEQUAL);break;case Vm:s.depthFunc(s.GREATER);break;case Hm:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}At=Xt}},setLocked:function(Xt){k=Xt},setClear:function(Xt){Zt!==Xt&&(s.clearDepth(Xt),Zt=Xt)},reset:function(){k=!1,Et=null,At=null,Zt=null}}}function o(){let k=!1,Et=null,At=null,Zt=null,Xt=null,ve=null,ye=null,Be=null,tn=null;return{setTest:function(xe){k||(xe?it(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(xe){Et!==xe&&!k&&(s.stencilMask(xe),Et=xe)},setFunc:function(xe,en,In){(At!==xe||Zt!==en||Xt!==In)&&(s.stencilFunc(xe,en,In),At=xe,Zt=en,Xt=In)},setOp:function(xe,en,In){(ve!==xe||ye!==en||Be!==In)&&(s.stencilOp(xe,en,In),ve=xe,ye=en,Be=In)},setLocked:function(xe){k=xe},setClear:function(xe){tn!==xe&&(s.clearStencil(xe),tn=xe)},reset:function(){k=!1,Et=null,At=null,Zt=null,Xt=null,ve=null,ye=null,Be=null,tn=null}}}let a=new i,l=new r,c=new o,h=new WeakMap,d=new WeakMap,u={},f={},g=new WeakMap,v=[],p=null,m=!1,x=null,y=null,M=null,P=null,T=null,R=null,G=null,b=new zt(0,0,0),E=0,V=!1,q=null,W=null,I=null,F=null,z=null,et=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,Y=0,nt=s.getParameter(s.VERSION);nt.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(nt)[1]),Z=Y>=1):nt.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),Z=Y>=2);let rt=null,tt={},J=s.getParameter(s.SCISSOR_BOX),ot=s.getParameter(s.VIEWPORT),gt=new ce().fromArray(J),pt=new ce().fromArray(ot);function vt(k,Et,At,Zt){let Xt=new Uint8Array(4),ve=s.createTexture();s.bindTexture(k,ve),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ye=0;ye<At;ye++)n&&(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)?s.texImage3D(Et,0,s.RGBA,1,1,Zt,0,s.RGBA,s.UNSIGNED_BYTE,Xt):s.texImage2D(Et+ye,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Xt);return ve}let bt={};bt[s.TEXTURE_2D]=vt(s.TEXTURE_2D,s.TEXTURE_2D,1),bt[s.TEXTURE_CUBE_MAP]=vt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(bt[s.TEXTURE_2D_ARRAY]=vt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),bt[s.TEXTURE_3D]=vt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),it(s.DEPTH_TEST),l.setFunc($o),Gt(!1),L(Cu),it(s.CULL_FACE),Ct($e);function it(k){u[k]!==!0&&(s.enable(k),u[k]=!0)}function at(k){u[k]!==!1&&(s.disable(k),u[k]=!1)}function wt(k,Et){return f[k]!==Et?(s.bindFramebuffer(k,Et),f[k]=Et,n&&(k===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=Et),k===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=Et)),!0):!1}function X(k,Et){let At=v,Zt=!1;if(k)if(At=g.get(Et),At===void 0&&(At=[],g.set(Et,At)),k.isWebGLMultipleRenderTargets){let Xt=k.texture;if(At.length!==Xt.length||At[0]!==s.COLOR_ATTACHMENT0){for(let ve=0,ye=Xt.length;ve<ye;ve++)At[ve]=s.COLOR_ATTACHMENT0+ve;At.length=Xt.length,Zt=!0}}else At[0]!==s.COLOR_ATTACHMENT0&&(At[0]=s.COLOR_ATTACHMENT0,Zt=!0);else At[0]!==s.BACK&&(At[0]=s.BACK,Zt=!0);Zt&&(e.isWebGL2?s.drawBuffers(At):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(At))}function Vt(k){return p!==k?(s.useProgram(k),p=k,!0):!1}let Tt={[Qn]:s.FUNC_ADD,[Sm]:s.FUNC_SUBTRACT,[Em]:s.FUNC_REVERSE_SUBTRACT};if(n)Tt[Lu]=s.MIN,Tt[Nu]=s.MAX;else{let k=t.get("EXT_blend_minmax");k!==null&&(Tt[Lu]=k.MIN_EXT,Tt[Nu]=k.MAX_EXT)}let Ft={[Pa]:s.ZERO,[Am]:s.ONE,[Tm]:s.SRC_COLOR,[rc]:s.SRC_ALPHA,[Im]:s.SRC_ALPHA_SATURATE,[Gc]:s.DST_COLOR,[Hc]:s.DST_ALPHA,[Cm]:s.ONE_MINUS_SRC_COLOR,[oc]:s.ONE_MINUS_SRC_ALPHA,[Pm]:s.ONE_MINUS_DST_COLOR,[Rm]:s.ONE_MINUS_DST_ALPHA,[Lm]:s.CONSTANT_COLOR,[Nm]:s.ONE_MINUS_CONSTANT_COLOR,[Dm]:s.CONSTANT_ALPHA,[Fm]:s.ONE_MINUS_CONSTANT_ALPHA};function Ct(k,Et,At,Zt,Xt,ve,ye,Be,tn,xe){if(k===$e){m===!0&&(at(s.BLEND),m=!1);return}if(m===!1&&(it(s.BLEND),m=!0),k!==Vc){if(k!==x||xe!==V){if((y!==Qn||T!==Qn)&&(s.blendEquation(s.FUNC_ADD),y=Qn,T=Qn),xe)switch(k){case $s:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ru:s.blendFunc(s.ONE,s.ONE);break;case Pu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Iu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case $s:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ru:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Pu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Iu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}M=null,P=null,R=null,G=null,b.set(0,0,0),E=0,x=k,V=xe}return}Xt=Xt||Et,ve=ve||At,ye=ye||Zt,(Et!==y||Xt!==T)&&(s.blendEquationSeparate(Tt[Et],Tt[Xt]),y=Et,T=Xt),(At!==M||Zt!==P||ve!==R||ye!==G)&&(s.blendFuncSeparate(Ft[At],Ft[Zt],Ft[ve],Ft[ye]),M=At,P=Zt,R=ve,G=ye),(Be.equals(b)===!1||tn!==E)&&(s.blendColor(Be.r,Be.g,Be.b,tn),b.copy(Be),E=tn),x=k,V=!1}function ae(k,Et){k.side===Gn?at(s.CULL_FACE):it(s.CULL_FACE);let At=k.side===Sn;Et&&(At=!At),Gt(At),k.blending===$s&&k.transparent===!1?Ct($e):Ct(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),a.setMask(k.colorWrite);let Zt=k.stencilWrite;c.setTest(Zt),Zt&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),j(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?it(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(k){q!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),q=k)}function L(k){k!==Mm?(it(s.CULL_FACE),k!==W&&(k===Cu?s.cullFace(s.BACK):k===bm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),W=k}function A(k){k!==I&&(Z&&s.lineWidth(k),I=k)}function j(k,Et,At){k?(it(s.POLYGON_OFFSET_FILL),(F!==Et||z!==At)&&(s.polygonOffset(Et,At),F=Et,z=At)):at(s.POLYGON_OFFSET_FILL)}function ht(k){k?it(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function lt(k){k===void 0&&(k=s.TEXTURE0+et-1),rt!==k&&(s.activeTexture(k),rt=k)}function ft(k,Et,At){At===void 0&&(rt===null?At=s.TEXTURE0+et-1:At=rt);let Zt=tt[At];Zt===void 0&&(Zt={type:void 0,texture:void 0},tt[At]=Zt),(Zt.type!==k||Zt.texture!==Et)&&(rt!==At&&(s.activeTexture(At),rt=At),s.bindTexture(k,Et||bt[k]),Zt.type=k,Zt.texture=Et)}function Rt(){let k=tt[rt];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function yt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{s.compressedTexImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Dt(){try{s.texSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{s.texSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ne(){try{s.texStorage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(){try{s.texStorage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{s.texImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{s.texImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function qt(k){gt.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),gt.copy(k))}function Yt(k){pt.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),pt.copy(k))}function Kt(k,Et){let At=d.get(Et);At===void 0&&(At=new WeakMap,d.set(Et,At));let Zt=At.get(k);Zt===void 0&&(Zt=s.getUniformBlockIndex(Et,k.name),At.set(k,Zt))}function $t(k,Et){let Zt=d.get(Et).get(k);h.get(Et)!==Zt&&(s.uniformBlockBinding(Et,Zt,k.__bindingPointIndex),h.set(Et,Zt))}function K(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},rt=null,tt={},f={},g=new WeakMap,v=[],p=null,m=!1,x=null,y=null,M=null,P=null,T=null,R=null,G=null,b=new zt(0,0,0),E=0,V=!1,q=null,W=null,I=null,F=null,z=null,gt.set(0,0,s.canvas.width,s.canvas.height),pt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:it,disable:at,bindFramebuffer:wt,drawBuffers:X,useProgram:Vt,setBlending:Ct,setMaterial:ae,setFlipSided:Gt,setCullFace:L,setLineWidth:A,setPolygonOffset:j,setScissorTest:ht,activeTexture:lt,bindTexture:ft,unbindTexture:Rt,compressedTexImage2D:yt,compressedTexImage3D:St,texImage2D:Pt,texImage3D:Lt,updateUBOMapping:Kt,uniformBlockBinding:$t,texStorage2D:ne,texStorage3D:Wt,texSubImage2D:Dt,texSubImage3D:kt,compressedTexSubImage2D:ut,compressedTexSubImage3D:le,scissor:qt,viewport:Yt,reset:K}}function p_(s,t,e,n,i,r,o){let a=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,A){return f?new OffscreenCanvas(L,A):Br("canvas")}function v(L,A,j,ht){let lt=1;if((L.width>ht||L.height>ht)&&(lt=ht/Math.max(L.width,L.height)),lt<1||A===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){let ft=A?na:Math.floor,Rt=ft(lt*L.width),yt=ft(lt*L.height);d===void 0&&(d=g(Rt,yt));let St=j?g(Rt,yt):d;return St.width=Rt,St.height=yt,St.getContext("2d").drawImage(L,0,0,Rt,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Rt+"x"+yt+")."),St}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function p(L){return hc(L.width)&&hc(L.height)}function m(L){return a?!1:L.wrapS!==dn||L.wrapT!==dn||L.minFilter!==ze&&L.minFilter!==Ye}function x(L,A){return L.generateMipmaps&&A&&L.minFilter!==ze&&L.minFilter!==Ye}function y(L){s.generateMipmap(L)}function M(L,A,j,ht,lt=!1){if(a===!1)return A;if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ft=A;if(A===s.RED&&(j===s.FLOAT&&(ft=s.R32F),j===s.HALF_FLOAT&&(ft=s.R16F),j===s.UNSIGNED_BYTE&&(ft=s.R8)),A===s.RED_INTEGER&&(j===s.UNSIGNED_BYTE&&(ft=s.R8UI),j===s.UNSIGNED_SHORT&&(ft=s.R16UI),j===s.UNSIGNED_INT&&(ft=s.R32UI),j===s.BYTE&&(ft=s.R8I),j===s.SHORT&&(ft=s.R16I),j===s.INT&&(ft=s.R32I)),A===s.RG&&(j===s.FLOAT&&(ft=s.RG32F),j===s.HALF_FLOAT&&(ft=s.RG16F),j===s.UNSIGNED_BYTE&&(ft=s.RG8)),A===s.RGBA){let Rt=lt?Jo:fe.getTransfer(ht);j===s.FLOAT&&(ft=s.RGBA32F),j===s.HALF_FLOAT&&(ft=s.RGBA16F),j===s.UNSIGNED_BYTE&&(ft=Rt===Me?s.SRGB8_ALPHA8:s.RGBA8),j===s.UNSIGNED_SHORT_4_4_4_4&&(ft=s.RGBA4),j===s.UNSIGNED_SHORT_5_5_5_1&&(ft=s.RGB5_A1)}return(ft===s.R16F||ft===s.R32F||ft===s.RG16F||ft===s.RG32F||ft===s.RGBA16F||ft===s.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function P(L,A,j){return x(L,j)===!0||L.isFramebufferTexture&&L.minFilter!==ze&&L.minFilter!==Ye?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function T(L){return L===ze||L===Fu||L===El?s.NEAREST:s.LINEAR}function R(L){let A=L.target;A.removeEventListener("dispose",R),b(A),A.isVideoTexture&&h.delete(A)}function G(L){let A=L.target;A.removeEventListener("dispose",G),V(A)}function b(L){let A=n.get(L);if(A.__webglInit===void 0)return;let j=L.source,ht=u.get(j);if(ht){let lt=ht[A.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&E(L),Object.keys(ht).length===0&&u.delete(j)}n.remove(L)}function E(L){let A=n.get(L);s.deleteTexture(A.__webglTexture);let j=L.source,ht=u.get(j);delete ht[A.__cacheKey],o.memory.textures--}function V(L){let A=L.texture,j=n.get(L),ht=n.get(A);if(ht.__webglTexture!==void 0&&(s.deleteTexture(ht.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(j.__webglFramebuffer[lt]))for(let ft=0;ft<j.__webglFramebuffer[lt].length;ft++)s.deleteFramebuffer(j.__webglFramebuffer[lt][ft]);else s.deleteFramebuffer(j.__webglFramebuffer[lt]);j.__webglDepthbuffer&&s.deleteRenderbuffer(j.__webglDepthbuffer[lt])}else{if(Array.isArray(j.__webglFramebuffer))for(let lt=0;lt<j.__webglFramebuffer.length;lt++)s.deleteFramebuffer(j.__webglFramebuffer[lt]);else s.deleteFramebuffer(j.__webglFramebuffer);if(j.__webglDepthbuffer&&s.deleteRenderbuffer(j.__webglDepthbuffer),j.__webglMultisampledFramebuffer&&s.deleteFramebuffer(j.__webglMultisampledFramebuffer),j.__webglColorRenderbuffer)for(let lt=0;lt<j.__webglColorRenderbuffer.length;lt++)j.__webglColorRenderbuffer[lt]&&s.deleteRenderbuffer(j.__webglColorRenderbuffer[lt]);j.__webglDepthRenderbuffer&&s.deleteRenderbuffer(j.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let lt=0,ft=A.length;lt<ft;lt++){let Rt=n.get(A[lt]);Rt.__webglTexture&&(s.deleteTexture(Rt.__webglTexture),o.memory.textures--),n.remove(A[lt])}n.remove(A),n.remove(L)}let q=0;function W(){q=0}function I(){let L=q;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),q+=1,L}function F(L){let A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function z(L,A){let j=n.get(L);if(L.isVideoTexture&&ae(L),L.isRenderTargetTexture===!1&&L.version>0&&j.__version!==L.version){let ht=L.image;if(ht===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{gt(j,L,A);return}}e.bindTexture(s.TEXTURE_2D,j.__webglTexture,s.TEXTURE0+A)}function et(L,A){let j=n.get(L);if(L.version>0&&j.__version!==L.version){gt(j,L,A);return}e.bindTexture(s.TEXTURE_2D_ARRAY,j.__webglTexture,s.TEXTURE0+A)}function Z(L,A){let j=n.get(L);if(L.version>0&&j.__version!==L.version){gt(j,L,A);return}e.bindTexture(s.TEXTURE_3D,j.__webglTexture,s.TEXTURE0+A)}function Y(L,A){let j=n.get(L);if(L.version>0&&j.__version!==L.version){pt(j,L,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture,s.TEXTURE0+A)}let nt={[xi]:s.REPEAT,[dn]:s.CLAMP_TO_EDGE,[lc]:s.MIRRORED_REPEAT},rt={[ze]:s.NEAREST,[Fu]:s.NEAREST_MIPMAP_NEAREST,[El]:s.NEAREST_MIPMAP_LINEAR,[Ye]:s.LINEAR,[Ym]:s.LINEAR_MIPMAP_NEAREST,[tr]:s.LINEAR_MIPMAP_LINEAR},tt={[sg]:s.NEVER,[hg]:s.ALWAYS,[rg]:s.LESS,[Af]:s.LEQUAL,[og]:s.EQUAL,[cg]:s.GEQUAL,[ag]:s.GREATER,[lg]:s.NOTEQUAL};function J(L,A,j){if(j?(s.texParameteri(L,s.TEXTURE_WRAP_S,nt[A.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,nt[A.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,nt[A.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,rt[A.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,rt[A.minFilter])):(s.texParameteri(L,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(L,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(A.wrapS!==dn||A.wrapT!==dn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(L,s.TEXTURE_MAG_FILTER,T(A.magFilter)),s.texParameteri(L,s.TEXTURE_MIN_FILTER,T(A.minFilter)),A.minFilter!==ze&&A.minFilter!==Ye&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,tt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ht=t.get("EXT_texture_filter_anisotropic");if(A.magFilter===ze||A.minFilter!==El&&A.minFilter!==tr||A.type===sn&&t.has("OES_texture_float_linear")===!1||a===!1&&A.type===vn&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(s.texParameterf(L,ht.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function ot(L,A){let j=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",R));let ht=A.source,lt=u.get(ht);lt===void 0&&(lt={},u.set(ht,lt));let ft=F(A);if(ft!==L.__cacheKey){lt[ft]===void 0&&(lt[ft]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,j=!0),lt[ft].usedTimes++;let Rt=lt[L.__cacheKey];Rt!==void 0&&(lt[L.__cacheKey].usedTimes--,Rt.usedTimes===0&&E(A)),L.__cacheKey=ft,L.__webglTexture=lt[ft].texture}return j}function gt(L,A,j){let ht=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ht=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ht=s.TEXTURE_3D);let lt=ot(L,A),ft=A.source;e.bindTexture(ht,L.__webglTexture,s.TEXTURE0+j);let Rt=n.get(ft);if(ft.version!==Rt.__version||lt===!0){e.activeTexture(s.TEXTURE0+j);let yt=fe.getPrimaries(fe.workingColorSpace),St=A.colorSpace===bn?null:fe.getPrimaries(A.colorSpace),Dt=A.colorSpace===bn||yt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let kt=m(A)&&p(A.image)===!1,ut=v(A.image,kt,!1,i.maxTextureSize);ut=Gt(A,ut);let le=p(ut)||a,ne=r.convert(A.format,A.colorSpace),Wt=r.convert(A.type),Pt=M(A.internalFormat,ne,Wt,A.colorSpace,A.isVideoTexture);J(ht,A,le);let Lt,qt=A.mipmaps,Yt=a&&A.isVideoTexture!==!0&&Pt!==Sf,Kt=Rt.__version===void 0||lt===!0,$t=P(A,ut,le);if(A.isDepthTexture)Pt=s.DEPTH_COMPONENT,a?A.type===sn?Pt=s.DEPTH_COMPONENT32F:A.type===Di?Pt=s.DEPTH_COMPONENT24:A.type===yi?Pt=s.DEPTH24_STENCIL8:Pt=s.DEPTH_COMPONENT16:A.type===sn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===us&&Pt===s.DEPTH_COMPONENT&&A.type!==$c&&A.type!==Di&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Di,Wt=r.convert(A.type)),A.format===Oi&&Pt===s.DEPTH_COMPONENT&&(Pt=s.DEPTH_STENCIL,A.type!==yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=yi,Wt=r.convert(A.type))),Kt&&(Yt?e.texStorage2D(s.TEXTURE_2D,1,Pt,ut.width,ut.height):e.texImage2D(s.TEXTURE_2D,0,Pt,ut.width,ut.height,0,ne,Wt,null));else if(A.isDataTexture)if(qt.length>0&&le){Yt&&Kt&&e.texStorage2D(s.TEXTURE_2D,$t,Pt,qt[0].width,qt[0].height);for(let K=0,k=qt.length;K<k;K++)Lt=qt[K],Yt?e.texSubImage2D(s.TEXTURE_2D,K,0,0,Lt.width,Lt.height,ne,Wt,Lt.data):e.texImage2D(s.TEXTURE_2D,K,Pt,Lt.width,Lt.height,0,ne,Wt,Lt.data);A.generateMipmaps=!1}else Yt?(Kt&&e.texStorage2D(s.TEXTURE_2D,$t,Pt,ut.width,ut.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut.width,ut.height,ne,Wt,ut.data)):e.texImage2D(s.TEXTURE_2D,0,Pt,ut.width,ut.height,0,ne,Wt,ut.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Yt&&Kt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,$t,Pt,qt[0].width,qt[0].height,ut.depth);for(let K=0,k=qt.length;K<k;K++)Lt=qt[K],A.format!==Mn?ne!==null?Yt?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,Lt.width,Lt.height,ut.depth,ne,Lt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,Pt,Lt.width,Lt.height,ut.depth,0,Lt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?e.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,Lt.width,Lt.height,ut.depth,ne,Wt,Lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,K,Pt,Lt.width,Lt.height,ut.depth,0,ne,Wt,Lt.data)}else{Yt&&Kt&&e.texStorage2D(s.TEXTURE_2D,$t,Pt,qt[0].width,qt[0].height);for(let K=0,k=qt.length;K<k;K++)Lt=qt[K],A.format!==Mn?ne!==null?Yt?e.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,Lt.width,Lt.height,ne,Lt.data):e.compressedTexImage2D(s.TEXTURE_2D,K,Pt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?e.texSubImage2D(s.TEXTURE_2D,K,0,0,Lt.width,Lt.height,ne,Wt,Lt.data):e.texImage2D(s.TEXTURE_2D,K,Pt,Lt.width,Lt.height,0,ne,Wt,Lt.data)}else if(A.isDataArrayTexture)Yt?(Kt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,$t,Pt,ut.width,ut.height,ut.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,ne,Wt,ut.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Pt,ut.width,ut.height,ut.depth,0,ne,Wt,ut.data);else if(A.isData3DTexture)Yt?(Kt&&e.texStorage3D(s.TEXTURE_3D,$t,Pt,ut.width,ut.height,ut.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,ne,Wt,ut.data)):e.texImage3D(s.TEXTURE_3D,0,Pt,ut.width,ut.height,ut.depth,0,ne,Wt,ut.data);else if(A.isFramebufferTexture){if(Kt)if(Yt)e.texStorage2D(s.TEXTURE_2D,$t,Pt,ut.width,ut.height);else{let K=ut.width,k=ut.height;for(let Et=0;Et<$t;Et++)e.texImage2D(s.TEXTURE_2D,Et,Pt,K,k,0,ne,Wt,null),K>>=1,k>>=1}}else if(qt.length>0&&le){Yt&&Kt&&e.texStorage2D(s.TEXTURE_2D,$t,Pt,qt[0].width,qt[0].height);for(let K=0,k=qt.length;K<k;K++)Lt=qt[K],Yt?e.texSubImage2D(s.TEXTURE_2D,K,0,0,ne,Wt,Lt):e.texImage2D(s.TEXTURE_2D,K,Pt,ne,Wt,Lt);A.generateMipmaps=!1}else Yt?(Kt&&e.texStorage2D(s.TEXTURE_2D,$t,Pt,ut.width,ut.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,ne,Wt,ut)):e.texImage2D(s.TEXTURE_2D,0,Pt,ne,Wt,ut);x(A,le)&&y(ht),Rt.__version=ft.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function pt(L,A,j){if(A.image.length!==6)return;let ht=ot(L,A),lt=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+j);let ft=n.get(lt);if(lt.version!==ft.__version||ht===!0){e.activeTexture(s.TEXTURE0+j);let Rt=fe.getPrimaries(fe.workingColorSpace),yt=A.colorSpace===bn?null:fe.getPrimaries(A.colorSpace),St=A.colorSpace===bn||Rt===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let Dt=A.isCompressedTexture||A.image[0].isCompressedTexture,kt=A.image[0]&&A.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!Dt&&!kt?ut[K]=v(A.image[K],!1,!0,i.maxCubemapSize):ut[K]=kt?A.image[K].image:A.image[K],ut[K]=Gt(A,ut[K]);let le=ut[0],ne=p(le)||a,Wt=r.convert(A.format,A.colorSpace),Pt=r.convert(A.type),Lt=M(A.internalFormat,Wt,Pt,A.colorSpace),qt=a&&A.isVideoTexture!==!0,Yt=ft.__version===void 0||ht===!0,Kt=P(A,le,ne);J(s.TEXTURE_CUBE_MAP,A,ne);let $t;if(Dt){qt&&Yt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Kt,Lt,le.width,le.height);for(let K=0;K<6;K++){$t=ut[K].mipmaps;for(let k=0;k<$t.length;k++){let Et=$t[k];A.format!==Mn?Wt!==null?qt?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k,0,0,Et.width,Et.height,Wt,Et.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k,Lt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k,0,0,Et.width,Et.height,Wt,Pt,Et.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k,Lt,Et.width,Et.height,0,Wt,Pt,Et.data)}}}else{$t=A.mipmaps,qt&&Yt&&($t.length>0&&Kt++,e.texStorage2D(s.TEXTURE_CUBE_MAP,Kt,Lt,ut[0].width,ut[0].height));for(let K=0;K<6;K++)if(kt){qt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Wt,Pt,ut[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Lt,ut[K].width,ut[K].height,0,Wt,Pt,ut[K].data);for(let k=0;k<$t.length;k++){let At=$t[k].image[K].image;qt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k+1,0,0,At.width,At.height,Wt,Pt,At.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k+1,Lt,At.width,At.height,0,Wt,Pt,At.data)}}else{qt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Wt,Pt,ut[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Lt,Wt,Pt,ut[K]);for(let k=0;k<$t.length;k++){let Et=$t[k];qt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k+1,0,0,Wt,Pt,Et.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,k+1,Lt,Wt,Pt,Et.image[K])}}}x(A,ne)&&y(s.TEXTURE_CUBE_MAP),ft.__version=lt.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function vt(L,A,j,ht,lt,ft){let Rt=r.convert(j.format,j.colorSpace),yt=r.convert(j.type),St=M(j.internalFormat,Rt,yt,j.colorSpace);if(!n.get(A).__hasExternalTextures){let kt=Math.max(1,A.width>>ft),ut=Math.max(1,A.height>>ft);lt===s.TEXTURE_3D||lt===s.TEXTURE_2D_ARRAY?e.texImage3D(lt,ft,St,kt,ut,A.depth,0,Rt,yt,null):e.texImage2D(lt,ft,St,kt,ut,0,Rt,yt,null)}e.bindFramebuffer(s.FRAMEBUFFER,L),Ct(A)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,lt,n.get(j).__webglTexture,0,Ft(A)):(lt===s.TEXTURE_2D||lt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ht,lt,n.get(j).__webglTexture,ft),e.bindFramebuffer(s.FRAMEBUFFER,null)}function bt(L,A,j){if(s.bindRenderbuffer(s.RENDERBUFFER,L),A.depthBuffer&&!A.stencilBuffer){let ht=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(j||Ct(A)){let lt=A.depthTexture;lt&&lt.isDepthTexture&&(lt.type===sn?ht=s.DEPTH_COMPONENT32F:lt.type===Di&&(ht=s.DEPTH_COMPONENT24));let ft=Ft(A);Ct(A)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,ht,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,ht,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,ht,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,L)}else if(A.depthBuffer&&A.stencilBuffer){let ht=Ft(A);j&&Ct(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,s.DEPTH24_STENCIL8,A.width,A.height):Ct(A)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,L)}else{let ht=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let lt=0;lt<ht.length;lt++){let ft=ht[lt],Rt=r.convert(ft.format,ft.colorSpace),yt=r.convert(ft.type),St=M(ft.internalFormat,Rt,yt,ft.colorSpace),Dt=Ft(A);j&&Ct(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,St,A.width,A.height):Ct(A)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,St,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,St,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function it(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),z(A.depthTexture,0);let ht=n.get(A.depthTexture).__webglTexture,lt=Ft(A);if(A.depthTexture.format===us)Ct(A)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ht,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ht,0);else if(A.depthTexture.format===Oi)Ct(A)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ht,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function at(L){let A=n.get(L),j=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");it(A.__webglFramebuffer,L)}else if(j){A.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[ht]),A.__webglDepthbuffer[ht]=s.createRenderbuffer(),bt(A.__webglDepthbuffer[ht],L,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),bt(A.__webglDepthbuffer,L,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function wt(L,A,j){let ht=n.get(L);A!==void 0&&vt(ht.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),j!==void 0&&at(L)}function X(L){let A=L.texture,j=n.get(L),ht=n.get(A);L.addEventListener("dispose",G),L.isWebGLMultipleRenderTargets!==!0&&(ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture()),ht.__version=A.version,o.memory.textures++);let lt=L.isWebGLCubeRenderTarget===!0,ft=L.isWebGLMultipleRenderTargets===!0,Rt=p(L)||a;if(lt){j.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(a&&A.mipmaps&&A.mipmaps.length>0){j.__webglFramebuffer[yt]=[];for(let St=0;St<A.mipmaps.length;St++)j.__webglFramebuffer[yt][St]=s.createFramebuffer()}else j.__webglFramebuffer[yt]=s.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){j.__webglFramebuffer=[];for(let yt=0;yt<A.mipmaps.length;yt++)j.__webglFramebuffer[yt]=s.createFramebuffer()}else j.__webglFramebuffer=s.createFramebuffer();if(ft)if(i.drawBuffers){let yt=L.texture;for(let St=0,Dt=yt.length;St<Dt;St++){let kt=n.get(yt[St]);kt.__webglTexture===void 0&&(kt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&Ct(L)===!1){let yt=ft?A:[A];j.__webglMultisampledFramebuffer=s.createFramebuffer(),j.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let St=0;St<yt.length;St++){let Dt=yt[St];j.__webglColorRenderbuffer[St]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,j.__webglColorRenderbuffer[St]);let kt=r.convert(Dt.format,Dt.colorSpace),ut=r.convert(Dt.type),le=M(Dt.internalFormat,kt,ut,Dt.colorSpace,L.isXRRenderTarget===!0),ne=Ft(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,ne,le,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,j.__webglColorRenderbuffer[St])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&(j.__webglDepthRenderbuffer=s.createRenderbuffer(),bt(j.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){e.bindTexture(s.TEXTURE_CUBE_MAP,ht.__webglTexture),J(s.TEXTURE_CUBE_MAP,A,Rt);for(let yt=0;yt<6;yt++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)vt(j.__webglFramebuffer[yt][St],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,St);else vt(j.__webglFramebuffer[yt],L,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);x(A,Rt)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){let yt=L.texture;for(let St=0,Dt=yt.length;St<Dt;St++){let kt=yt[St],ut=n.get(kt);e.bindTexture(s.TEXTURE_2D,ut.__webglTexture),J(s.TEXTURE_2D,kt,Rt),vt(j.__webglFramebuffer,L,kt,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,0),x(kt,Rt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let yt=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?yt=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(yt,ht.__webglTexture),J(yt,A,Rt),a&&A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)vt(j.__webglFramebuffer[St],L,A,s.COLOR_ATTACHMENT0,yt,St);else vt(j.__webglFramebuffer,L,A,s.COLOR_ATTACHMENT0,yt,0);x(A,Rt)&&y(yt),e.unbindTexture()}L.depthBuffer&&at(L)}function Vt(L){let A=p(L)||a,j=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let ht=0,lt=j.length;ht<lt;ht++){let ft=j[ht];if(x(ft,A)){let Rt=L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,yt=n.get(ft).__webglTexture;e.bindTexture(Rt,yt),y(Rt),e.unbindTexture()}}}function Tt(L){if(a&&L.samples>0&&Ct(L)===!1){let A=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],j=L.width,ht=L.height,lt=s.COLOR_BUFFER_BIT,ft=[],Rt=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=n.get(L),St=L.isWebGLMultipleRenderTargets===!0;if(St)for(let Dt=0;Dt<A.length;Dt++)e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let Dt=0;Dt<A.length;Dt++){ft.push(s.COLOR_ATTACHMENT0+Dt),L.depthBuffer&&ft.push(Rt);let kt=yt.__ignoreDepthValues!==void 0?yt.__ignoreDepthValues:!1;if(kt===!1&&(L.depthBuffer&&(lt|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&(lt|=s.STENCIL_BUFFER_BIT)),St&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,yt.__webglColorRenderbuffer[Dt]),kt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Rt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Rt])),St){let ut=n.get(A[Dt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ut,0)}s.blitFramebuffer(0,0,j,ht,0,0,j,ht,lt,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ft)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),St)for(let Dt=0;Dt<A.length;Dt++){e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,yt.__webglColorRenderbuffer[Dt]);let kt=n.get(A[Dt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,kt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}}function Ft(L){return Math.min(i.maxSamples,L.samples)}function Ct(L){let A=n.get(L);return a&&L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ae(L){let A=o.render.frame;h.get(L)!==A&&(h.set(L,A),L.update())}function Gt(L,A){let j=L.colorSpace,ht=L.format,lt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===cc||j!==Nn&&j!==bn&&(fe.getTransfer(j)===Me?a===!1?t.has("EXT_sRGB")===!0&&ht===Mn?(L.format=cc,L.minFilter=Ye,L.generateMipmaps=!1):A=ia.sRGBToLinear(A):(ht!==Mn||lt!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),A}this.allocateTextureUnit=I,this.resetTextureUnits=W,this.setTexture2D=z,this.setTexture2DArray=et,this.setTexture3D=Z,this.setTextureCube=Y,this.rebindTextures=wt,this.setupRenderTarget=X,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Ct}function m_(s,t,e){let n=e.isWebGL2;function i(r,o=bn){let a,l=fe.getTransfer(o);if(r===Ui)return s.UNSIGNED_BYTE;if(r===xf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===_f)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Zm)return s.BYTE;if(r===$m)return s.SHORT;if(r===$c)return s.UNSIGNED_SHORT;if(r===yf)return s.INT;if(r===Di)return s.UNSIGNED_INT;if(r===sn)return s.FLOAT;if(r===vn)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===jm)return s.ALPHA;if(r===Mn)return s.RGBA;if(r===jc)return s.LUMINANCE;if(r===Km)return s.LUMINANCE_ALPHA;if(r===us)return s.DEPTH_COMPONENT;if(r===Oi)return s.DEPTH_STENCIL;if(r===cc)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===$r)return s.RED;if(r===wf)return s.RED_INTEGER;if(r===Jm)return s.RG;if(r===Mf)return s.RG_INTEGER;if(r===bf)return s.RGBA_INTEGER;if(r===Al||r===Tl||r===Cl||r===Rl)if(l===Me)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Al)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Tl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Cl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Rl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Al)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Tl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Cl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Rl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Uu||r===Bu||r===Ou||r===zu)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Uu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Bu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ou)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===zu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Sf)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ku||r===Vu)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===ku)return l===Me?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Vu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Hu||r===Gu||r===Wu||r===Xu||r===qu||r===Yu||r===Zu||r===$u||r===ju||r===Ku||r===Ju||r===Qu||r===td||r===ed)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Hu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Gu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Wu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Xu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===qu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Yu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Zu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===$u)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ju)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ku)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ju)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Qu)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===td)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ed)return l===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Pl||r===nd||r===id)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Pl)return l===Me?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===nd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===id)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Qm||r===sd||r===rd||r===od)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Pl)return a.COMPRESSED_RED_RGTC1_EXT;if(r===sd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===rd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===od)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===yi?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}function v_(s,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Rf(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,y,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,x,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Sn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Sn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let x=t.get(m).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;let y=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*y,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,x,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=y*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Sn&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){let x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function y_(s,t,e,n){let i={},r={},o=[],a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,y){let M=y.program;n.uniformBlockBinding(x,M)}function c(x,y){let M=i[x.id];M===void 0&&(g(x),M=h(x),i[x.id]=M,x.addEventListener("dispose",p));let P=y.program;n.updateUBOMapping(x,P);let T=t.render.frame;r[x.id]!==T&&(u(x),r[x.id]=T)}function h(x){let y=d();x.__bindingPointIndex=y;let M=s.createBuffer(),P=x.__size,T=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,P,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,M),M}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let y=i[x.id],M=x.uniforms,P=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let T=0,R=M.length;T<R;T++){let G=Array.isArray(M[T])?M[T]:[M[T]];for(let b=0,E=G.length;b<E;b++){let V=G[b];if(f(V,T,b,P)===!0){let q=V.__offset,W=Array.isArray(V.value)?V.value:[V.value],I=0;for(let F=0;F<W.length;F++){let z=W[F],et=v(z);typeof z=="number"||typeof z=="boolean"?(V.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,q+I,V.__data)):z.isMatrix3?(V.__data[0]=z.elements[0],V.__data[1]=z.elements[1],V.__data[2]=z.elements[2],V.__data[3]=0,V.__data[4]=z.elements[3],V.__data[5]=z.elements[4],V.__data[6]=z.elements[5],V.__data[7]=0,V.__data[8]=z.elements[6],V.__data[9]=z.elements[7],V.__data[10]=z.elements[8],V.__data[11]=0):(z.toArray(V.__data,I),I+=et.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,q,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,M,P){let T=x.value,R=y+"_"+M;if(P[R]===void 0)return typeof T=="number"||typeof T=="boolean"?P[R]=T:P[R]=T.clone(),!0;{let G=P[R];if(typeof T=="number"||typeof T=="boolean"){if(G!==T)return P[R]=T,!0}else if(G.equals(T)===!1)return G.copy(T),!0}return!1}function g(x){let y=x.uniforms,M=0,P=16;for(let R=0,G=y.length;R<G;R++){let b=Array.isArray(y[R])?y[R]:[y[R]];for(let E=0,V=b.length;E<V;E++){let q=b[E],W=Array.isArray(q.value)?q.value:[q.value];for(let I=0,F=W.length;I<F;I++){let z=W[I],et=v(z),Z=M%P;Z!==0&&P-Z<et.boundary&&(M+=P-Z),q.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=M,M+=et.storage}}}let T=M%P;return T>0&&(M+=P-T),x.__size=M,x.__cache={},this}function v(x){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function p(x){let y=x.target;y.removeEventListener("dispose",p);let M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(let x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}function Uf(s,t,e,n,i){let r,o;if(i===B_(s,t,e,n)>0)for(r=t;r<e;r+=n)o=af(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=af(r,s[r],s[r+1],o);return o&&Fa(o,o.next)&&(Xr(o),o=o.next),o}function fs(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Fa(e,e.next)||Le(e.prev,e,e.next)===0)){if(Xr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Gr(s,t,e,n,i,r,o){if(!s)return;!o&&r&&I_(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?b_(s,n,i,r):M_(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Xr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=S_(fs(s),t,e),Gr(s,t,e,n,i,r,2)):o===2&&E_(s,t,e,n,i,r):Gr(fs(s),t,e,n,i,r,1);break}}}function M_(s){let t=s.prev,e=s,n=s.next;if(Le(t,e,n)>=0)return!1;let i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,d=a<l?a<c?a:c:l<c?l:c,u=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Zs(i,a,r,l,o,c,g.x,g.y)&&Le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function b_(s,t,e,n){let i=s.prev,r=s,o=s.next;if(Le(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,v=a>l?a>c?a:c:l>c?l:c,p=h>d?h>u?h:u:d>u?d:u,m=Ac(f,g,t,e,n),x=Ac(v,p,t,e,n),y=s.prevZ,M=s.nextZ;for(;y&&y.z>=m&&M&&M.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=p&&y!==i&&y!==o&&Zs(a,h,l,d,c,u,y.x,y.y)&&Le(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=f&&M.x<=v&&M.y>=g&&M.y<=p&&M!==i&&M!==o&&Zs(a,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=p&&y!==i&&y!==o&&Zs(a,h,l,d,c,u,y.x,y.y)&&Le(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=p&&M!==i&&M!==o&&Zs(a,h,l,d,c,u,M.x,M.y)&&Le(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function S_(s,t,e){let n=s;do{let i=n.prev,r=n.next.next;!Fa(i,r)&&Bf(i,n,n.next,r)&&Wr(i,r)&&Wr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Xr(n),Xr(n.next),n=s=r),n=n.next}while(n!==s);return fs(n)}function E_(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&D_(o,a)){let l=Of(o,a);o=fs(o,o.next),l=fs(l,l.next),Gr(o,t,e,n,i,r,0),Gr(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function A_(s,t,e,n){let i=[],r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Uf(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(N_(c));for(i.sort(T_),r=0;r<i.length;r++)e=C_(i[r],e);return e}function T_(s,t){return s.x-t.x}function C_(s,t){let e=R_(s,t);if(!e)return t;let n=Of(e,s);return fs(n,n.next),fs(e,e.next)}function R_(s,t){let e=t,n=-1/0,i,r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;let a=i,l=i.x,c=i.y,h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Zs(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),Wr(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&P_(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function P_(s,t){return Le(s.prev,s,t.prev)<0&&Le(t.next,s,s.next)<0}function I_(s,t,e,n){let i=s;do i.z===0&&(i.z=Ac(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,L_(i)}function L_(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Ac(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function N_(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Zs(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function D_(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!F_(s,t)&&(Wr(s,t)&&Wr(t,s)&&U_(s,t)&&(Le(s.prev,s,t.prev)||Le(s,t.prev,t))||Fa(s,t)&&Le(s.prev,s,s.next)>0&&Le(t.prev,t,t.next)>0)}function Le(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Fa(s,t){return s.x===t.x&&s.y===t.y}function Bf(s,t,e,n){let i=Yo(Le(s,t,e)),r=Yo(Le(s,t,n)),o=Yo(Le(e,n,s)),a=Yo(Le(e,n,t));return!!(i!==r&&o!==a||i===0&&qo(s,e,t)||r===0&&qo(s,n,t)||o===0&&qo(e,s,n)||a===0&&qo(e,t,n))}function qo(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Yo(s){return s>0?1:s<0?-1:0}function F_(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Bf(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Wr(s,t){return Le(s.prev,s,s.next)<0?Le(s,t,s.next)>=0&&Le(s,s.prev,t)>=0:Le(s,t,s.prev)<0||Le(s,s.next,t)<0}function U_(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Of(s,t){let e=new Tc(s.i,s.x,s.y),n=new Tc(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function af(s,t,e,n){let i=new Tc(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Xr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Tc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function B_(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}function lf(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function cf(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}function Zo(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function O_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function z_(s){function t(i,r){return s[i]-s[r]}let e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function hf(s,t,e){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)i[o++]=s[a+l]}return i}function zf(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}function k_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wi;case"vector":case"vector2":case"vector3":case"vector4":return qi;case"color":return wa;case"quaternion":return ti;case"bool":case"boolean":return Gi;case"string":return Xi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function V_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=k_(s.type);if(s.times===void 0){let e=[],n=[];zf(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}function pf(){return(typeof performance>"u"?Date:performance).now()}function mf(s,t){return s.distance-t.distance}function zc(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)zc(i[r],t,e,!0)}}var Mm,Cu,bm,gf,kc,pi,Bi,Sn,Gn,$e,$s,Ru,Pu,Iu,Vc,Qn,Sm,Em,Lu,Nu,Pa,Am,Tm,Cm,rc,oc,Hc,Rm,Gc,Pm,Im,Lm,Nm,Dm,Fm,Um,Bm,Om,$o,zm,km,Vm,Hm,Ia,Gm,Wm,Fi,Wc,Xc,qc,Yc,Xm,Zc,Du,qm,vf,Js,Qs,Ur,ac,La,xi,dn,lc,ze,Fu,El,Ye,Ym,tr,Ui,Zm,$m,$c,yf,Di,sn,vn,xf,_f,yi,jm,Mn,jc,Km,us,Oi,$r,wf,Jm,Mf,bf,Al,Tl,Cl,Rl,Uu,Bu,Ou,zu,Sf,ku,Vu,Hu,Gu,Wu,Xu,qu,Yu,Zu,$u,ju,Ku,Ju,Qu,td,ed,Pl,nd,id,Qm,sd,rd,od,jo,Ko,Il,ad,ld,cd,tg,Ef,ds,eg,ng,jr,ig,bn,Ee,Nn,Kc,Na,Jo,Me,Qo,ta,Cs,hd,sg,rg,og,Af,ag,lg,cg,hg,ud,Jc,dd,cc,gi,ea,zi,hn,fd,Lr,er,ke,jt,re,Ll,pd,md,gd,Mo,Ag,fe,Rs,ia,Tg,sa,Cg,je,ce,uc,En,ra,dc,He,H,Fl,vd,ki,li,zn,bo,Ps,Is,Ls,Ri,Pi,rs,Tr,So,Eo,os,Rg,Cr,Bl,Vi,ci,Ol,Ao,Ii,zl,To,kl,nr,Ut,Ns,kn,Pg,Ig,Li,Co,Tn,yd,xd,yn,Or,Lg,_d,Ds,hi,Ro,Rr,Ng,Dg,wd,Md,bd,Fg,Ug,De,Vn,ui,Vl,di,Fs,Us,Sd,Hl,Gl,Wl,Po,Xs,Cf,Ni,Io,zt,un,Bg,Wn,ir,mi,th,Oe,Lo,rn,sr,oa,Ne,Vg,Ln,ql,Bs,Cn,Pr,qe,on,Ed,as,No,Ad,Os,zs,ks,Yl,Do,Fo,Uo,Bo,Td,Cd,Rd,Oo,zo,Fe,zr,ei,Wg,Xg,Ke,aa,Ve,Vs,Hs,fc,la,pc,Zl,qg,Yg,Hn,ls,Vo,kr,or,$g,jg,Kg,Jg,Qg,t0,e0,n0,i0,s0,r0,o0,a0,l0,c0,h0,u0,d0,f0,p0,m0,g0,v0,y0,x0,_0,w0,M0,b0,S0,E0,A0,T0,C0,R0,P0,I0,L0,N0,D0,F0,U0,B0,O0,z0,k0,V0,H0,G0,W0,X0,q0,Y0,Z0,$0,j0,K0,J0,Q0,tv,ev,nv,iv,sv,rv,ov,av,lv,cv,hv,uv,dv,fv,pv,mv,gv,vv,yv,xv,_v,wv,Mv,bv,Sv,Ev,Av,Tv,Cv,Rv,Pv,Iv,Lv,Nv,Dv,Fv,Uv,Bv,Ov,zv,kv,Vv,Hv,Gv,Wv,Xv,qv,Yv,Zv,$v,jv,Kv,Jv,Qv,ty,ey,ny,iy,sy,ry,oy,ay,ly,cy,hy,uy,dy,fy,py,my,gy,vy,yy,xy,_y,wy,My,by,Sy,Ey,Ay,Ty,se,Mt,Jn,Ho,Hi,qs,Pd,hs,$l,Id,jl,Kl,Jl,cs,Gs,Ld,ca,ar,If,Lf,Nf,Df,Ff,Ud,Bd,Od,zd,kd,mc,gc,vc,Ql,Ks,Lx,Nx,Hx,Gx,Xx,Qx,xc,_c,o_,wc,Mc,h_,u_,bc,vi,g_,Fr,Sc,Vr,Ec,ha,Kd,Jd,Qd,x_,tf,Wo,tc,ef,ec,ua,lr,cr,nf,__,da,Hr,sf,rf,of,nc,Xo,fa,pa,ma,w_,ga,va,ya,ps,hr,xa,_a,ur,Cc,Rc,Pc,Dn,Gi,wa,Wi,Ic,ti,Xi,qi,Ma,ba,Lc,H_,Xn,fi,Nc,qr,Dc,Sa,Ea,dr,ic,uf,df,Yr,Fc,Aa,ff,Ir,sc,Uc,Zr,Bc,ms,fr,Ta,Ca,nh,G_,ih,W_,X_,q_,Y_,Z_,$_,j_,Oc,ge,RS,Ra,xn=Ie(()=>{Mm=0,Cu=1,bm=2,gf=1,kc=2,pi=3,Bi=0,Sn=1,Gn=2,$e=0,$s=1,Ru=2,Pu=3,Iu=4,Vc=5,Qn=100,Sm=101,Em=102,Lu=103,Nu=104,Pa=200,Am=201,Tm=202,Cm=203,rc=204,oc=205,Hc=206,Rm=207,Gc=208,Pm=209,Im=210,Lm=211,Nm=212,Dm=213,Fm=214,Um=0,Bm=1,Om=2,$o=3,zm=4,km=5,Vm=6,Hm=7,Ia=0,Gm=1,Wm=2,Fi=0,Wc=1,Xc=2,qc=3,Yc=4,Xm=5,Zc=6,Du="attached",qm="detached",vf=300,Js=301,Qs=302,Ur=303,ac=304,La=306,xi=1e3,dn=1001,lc=1002,ze=1003,Fu=1004,El=1005,Ye=1006,Ym=1007,tr=1008,Ui=1009,Zm=1010,$m=1011,$c=1012,yf=1013,Di=1014,sn=1015,vn=1016,xf=1017,_f=1018,yi=1020,jm=1021,Mn=1023,jc=1024,Km=1025,us=1026,Oi=1027,$r=1028,wf=1029,Jm=1030,Mf=1031,bf=1033,Al=33776,Tl=33777,Cl=33778,Rl=33779,Uu=35840,Bu=35841,Ou=35842,zu=35843,Sf=36196,ku=37492,Vu=37496,Hu=37808,Gu=37809,Wu=37810,Xu=37811,qu=37812,Yu=37813,Zu=37814,$u=37815,ju=37816,Ku=37817,Ju=37818,Qu=37819,td=37820,ed=37821,Pl=36492,nd=36494,id=36495,Qm=36283,sd=36284,rd=36285,od=36286,jo=2300,Ko=2301,Il=2302,ad=2400,ld=2401,cd=2402,tg=2500,Ef=3e3,ds=3001,eg=3200,ng=3201,jr=0,ig=1,bn="",Ee="srgb",Nn="srgb-linear",Kc="display-p3",Na="display-p3-linear",Jo="linear",Me="srgb",Qo="rec709",ta="p3",Cs=7680,hd=519,sg=512,rg=513,og=514,Af=515,ag=516,lg=517,cg=518,hg=519,ud=35044,Jc=35048,dd="300 es",cc=1035,gi=2e3,ea=2001,zi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fd=1234567,Lr=Math.PI/180,er=180/Math.PI;ke={DEG2RAD:Lr,RAD2DEG:er,generateUUID:Yi,clamp:Ze,euclideanModulo:Qc,mapLinear:ug,inverseLerp:dg,lerp:Nr,damp:fg,pingpong:pg,smoothstep:mg,smootherstep:gg,randInt:vg,randFloat:yg,randFloatSpread:xg,seededRandom:_g,degToRad:wg,radToDeg:Mg,isPowerOfTwo:hc,ceilPowerOfTwo:bg,floorPowerOfTwo:na,setQuaternionFromProperEuler:Sg,normalize:mn,denormalize:Ws},jt=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},re=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],p=i[3],m=i[6],x=i[1],y=i[4],M=i[7],P=i[2],T=i[5],R=i[8];return r[0]=o*v+a*x+l*P,r[3]=o*p+a*y+l*T,r[6]=o*m+a*M+l*R,r[1]=c*v+h*x+d*P,r[4]=c*p+h*y+d*T,r[7]=c*m+h*M+d*R,r[2]=u*v+f*x+g*P,r[5]=u*p+f*y+g*T,r[8]=u*m+f*M+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=d*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=u*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ll.makeScale(t,e)),this}rotate(t){return this.premultiply(Ll.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ll.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ll=new re;pd={};md=new re().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gd=new re().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Mo={[Nn]:{transfer:Jo,primaries:Qo,toReference:s=>s,fromReference:s=>s},[Ee]:{transfer:Me,primaries:Qo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Na]:{transfer:Jo,primaries:ta,toReference:s=>s.applyMatrix3(gd),fromReference:s=>s.applyMatrix3(md)},[Kc]:{transfer:Me,primaries:ta,toReference:s=>s.convertSRGBToLinear().applyMatrix3(gd),fromReference:s=>s.applyMatrix3(md).convertLinearToSRGB()}},Ag=new Set([Nn,Na]),fe={enabled:!0,_workingColorSpace:Nn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ag.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;let n=Mo[t].toReference,i=Mo[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Mo[s].primaries},getTransfer:function(s){return s===bn?Jo:Mo[s].transfer}};ia=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Rs===void 0&&(Rs=Br("canvas")),Rs.width=t.width,Rs.height=t.height;let n=Rs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Rs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Br("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=js(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(js(e[n]/255)*255):e[n]=js(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Tg=0,sa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Yi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Dl(i[o].image)):r.push(Dl(i[o]))}else r=Dl(i);n.url=r}return e||(t.images[this.uuid]=n),n}};Cg=0,je=class s extends zi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=dn,i=dn,r=Ye,o=tr,a=Mn,l=Ui,c=s.DEFAULT_ANISOTROPY,h=bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Yi(),this.name="",this.source=new sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ds?Ee:bn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xi:t.x=t.x-Math.floor(t.x);break;case dn:t.x=t.x<0?0:1;break;case lc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xi:t.y=t.y-Math.floor(t.y);break;case dn:t.y=t.y<0?0:1;break;case lc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ee?ds:Ef}set encoding(t){Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===ds?Ee:bn}};je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=vf;je.DEFAULT_ANISOTROPY=1;ce=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,M=(f+1)/2,P=(m+1)/2,T=(h+u)/4,R=(d+v)/4,G=(g+p)/4;return y>M&&y>P?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=T/n,r=R/n):M>P?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=T/i,r=G/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=R/r,i=G/r),this.set(n,i,r,e),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},uc=class extends zi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);let i={width:t,height:e,depth:1};n.encoding!==void 0&&(Dr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ds?Ee:bn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ye,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new je(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new sa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},En=class extends uc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ra=class extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},dc=class extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},He=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==g){let p=1-a,m=l*u+c*f+h*g+d*v,x=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){let P=Math.sqrt(y),T=Math.atan2(P,m*x);p=Math.sin(p*T)/P,a=Math.sin(a*T)/P}let M=a*x;if(l=l*p+u*M,c=c*p+f*M,h=h*p+g*M,d=d*p+v*M,p===1-a){let P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fl.copy(this).projectOnVector(t),this.sub(Fl)}reflect(t){return this.sub(Fl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fl=new H,vd=new He,ki=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bo.copy(n.boundingBox)),bo.applyMatrix4(t.matrixWorld),this.union(bo)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Tr),So.subVectors(this.max,Tr),Ps.subVectors(t.a,Tr),Is.subVectors(t.b,Tr),Ls.subVectors(t.c,Tr),Ri.subVectors(Is,Ps),Pi.subVectors(Ls,Is),rs.subVectors(Ps,Ls);let e=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-rs.z,rs.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,rs.z,0,-rs.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-rs.y,rs.x,0];return!Ul(e,Ps,Is,Ls,So)||(e=[1,0,0,0,1,0,0,0,1],!Ul(e,Ps,Is,Ls,So))?!1:(Eo.crossVectors(Ri,Pi),e=[Eo.x,Eo.y,Eo.z],Ul(e,Ps,Is,Ls,So))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},li=[new H,new H,new H,new H,new H,new H,new H,new H],zn=new H,bo=new ki,Ps=new H,Is=new H,Ls=new H,Ri=new H,Pi=new H,rs=new H,Tr=new H,So=new H,Eo=new H,os=new H;Rg=new ki,Cr=new H,Bl=new H,Vi=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rg.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cr.subVectors(t,this.center);let e=Cr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Cr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cr.copy(t.center).add(Bl)),this.expandByPoint(Cr.copy(t.center).sub(Bl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},ci=new H,Ol=new H,Ao=new H,Ii=new H,zl=new H,To=new H,kl=new H,nr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ci.copy(this.origin).addScaledVector(this.direction,e),ci.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ol.copy(t).add(e).multiplyScalar(.5),Ao.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(Ol);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ao),a=Ii.dot(this.direction),l=-Ii.dot(Ao),c=Ii.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ol).addScaledVector(Ao,u),f}intersectSphere(t,e){ci.subVectors(t.center,this.origin);let n=ci.dot(this.direction),i=ci.dot(ci)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,ci)!==null}intersectTriangle(t,e,n,i,r){zl.subVectors(e,t),To.subVectors(n,t),kl.crossVectors(zl,To);let o=this.direction.dot(kl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,t);let l=a*this.direction.dot(To.crossVectors(Ii,To));if(l<0)return null;let c=a*this.direction.dot(zl.cross(Ii));if(c<0||l+c>o)return null;let h=-a*Ii.dot(kl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ut=class s{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,p){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,p)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Ns.setFromMatrixColumn(t,0).length(),r=1/Ns.setFromMatrixColumn(t,1).length(),o=1/Ns.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pg,t,Ig)}lookAt(t,e,n){let i=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Li.crossVectors(n,Tn),Li.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Li.crossVectors(n,Tn)),Li.normalize(),Co.crossVectors(Tn,Li),i[0]=Li.x,i[4]=Co.x,i[8]=Tn.x,i[1]=Li.y,i[5]=Co.y,i[9]=Tn.y,i[2]=Li.z,i[6]=Co.z,i[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],p=n[10],m=n[14],x=n[3],y=n[7],M=n[11],P=n[15],T=i[0],R=i[4],G=i[8],b=i[12],E=i[1],V=i[5],q=i[9],W=i[13],I=i[2],F=i[6],z=i[10],et=i[14],Z=i[3],Y=i[7],nt=i[11],rt=i[15];return r[0]=o*T+a*E+l*I+c*Z,r[4]=o*R+a*V+l*F+c*Y,r[8]=o*G+a*q+l*z+c*nt,r[12]=o*b+a*W+l*et+c*rt,r[1]=h*T+d*E+u*I+f*Z,r[5]=h*R+d*V+u*F+f*Y,r[9]=h*G+d*q+u*z+f*nt,r[13]=h*b+d*W+u*et+f*rt,r[2]=g*T+v*E+p*I+m*Z,r[6]=g*R+v*V+p*F+m*Y,r[10]=g*G+v*q+p*z+m*nt,r[14]=g*b+v*W+p*et+m*rt,r[3]=x*T+y*E+M*I+P*Z,r[7]=x*R+y*V+M*F+P*Y,r[11]=x*G+y*q+M*z+P*nt,r[15]=x*b+y*W+M*et+P*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+v*(+e*l*f-e*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+p*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],p=t[14],m=t[15],x=d*p*c-v*u*c+v*l*f-a*p*f-d*l*m+a*u*m,y=g*u*c-h*p*c-g*l*f+o*p*f+h*l*m-o*u*m,M=h*v*c-g*d*c+g*a*f-o*v*f-h*a*m+o*d*m,P=g*d*l-h*v*l-g*a*u+o*v*u+h*a*p-o*d*p,T=e*x+n*y+i*M+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return t[0]=x*R,t[1]=(v*u*r-d*p*r-v*i*f+n*p*f+d*i*m-n*u*m)*R,t[2]=(a*p*r-v*l*r+v*i*c-n*p*c-a*i*m+n*l*m)*R,t[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*R,t[4]=y*R,t[5]=(h*p*r-g*u*r+g*i*f-e*p*f-h*i*m+e*u*m)*R,t[6]=(g*l*r-o*p*r-g*i*c+e*p*c+o*i*m-e*l*m)*R,t[7]=(o*u*r-h*l*r+h*i*c-e*u*c-o*i*f+e*l*f)*R,t[8]=M*R,t[9]=(g*d*r-h*v*r-g*n*f+e*v*f+h*n*m-e*d*m)*R,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*m+e*a*m)*R,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*R,t[12]=P*R,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*p+e*d*p)*R,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*p-e*a*p)*R,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*R,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,p=o*d,m=a*d,x=l*c,y=l*h,M=l*d,P=n.x,T=n.y,R=n.z;return i[0]=(1-(v+m))*P,i[1]=(f+M)*P,i[2]=(g-y)*P,i[3]=0,i[4]=(f-M)*T,i[5]=(1-(u+m))*T,i[6]=(p+x)*T,i[7]=0,i[8]=(g+y)*R,i[9]=(p-x)*R,i[10]=(1-(u+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Ns.set(i[0],i[1],i[2]).length(),o=Ns.set(i[4],i[5],i[6]).length(),a=Ns.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],kn.copy(this);let c=1/r,h=1/o,d=1/a;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=d,kn.elements[9]*=d,kn.elements[10]*=d,e.setFromRotationMatrix(kn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=gi){let l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i),f,g;if(a===gi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ea)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=gi){let l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*c,f=(n+i)*h,g,v;if(a===gi)g=(o+r)*d,v=-2*d;else if(a===ea)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ns=new H,kn=new Ut,Pg=new H(0,0,0),Ig=new H(1,1,1),Li=new H,Co=new H,Tn=new H,yd=new Ut,xd=new He,yn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xd.setFromEuler(this),this.setFromQuaternion(xd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yn.DEFAULT_ORDER="XYZ";Or=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Lg=0,_d=new H,Ds=new He,hi=new Ut,Ro=new H,Rr=new H,Ng=new H,Dg=new He,wd=new H(1,0,0),Md=new H(0,1,0),bd=new H(0,0,1),Fg={type:"added"},Ug={type:"removed"},De=class s extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new H,e=new yn,n=new He,i=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ut},normalMatrix:{value:new re}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ds.setFromAxisAngle(t,e),this.quaternion.multiply(Ds),this}rotateOnWorldAxis(t,e){return Ds.setFromAxisAngle(t,e),this.quaternion.premultiply(Ds),this}rotateX(t){return this.rotateOnAxis(wd,t)}rotateY(t){return this.rotateOnAxis(Md,t)}rotateZ(t){return this.rotateOnAxis(bd,t)}translateOnAxis(t,e){return _d.copy(t).applyQuaternion(this.quaternion),this.position.add(_d.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wd,t)}translateY(t){return this.translateOnAxis(Md,t)}translateZ(t){return this.translateOnAxis(bd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ro.copy(t):Ro.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Rr,Ro,this.up):hi.lookAt(Ro,Rr,this.up),this.quaternion.setFromRotationMatrix(hi),i&&(hi.extractRotation(i.matrixWorld),Ds.setFromRotationMatrix(hi),this.quaternion.premultiply(Ds.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Fg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ug)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,t,Ng),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,Dg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};De.DEFAULT_UP=new H(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Vn=new H,ui=new H,Vl=new H,di=new H,Fs=new H,Us=new H,Sd=new H,Hl=new H,Gl=new H,Wl=new H,Po=!1,Xs=class s{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Vn.subVectors(t,e),i.cross(Vn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Vn.subVectors(i,e),ui.subVectors(n,e),Vl.subVectors(t,e);let o=Vn.dot(Vn),a=Vn.dot(ui),l=Vn.dot(Vl),c=ui.dot(ui),h=ui.dot(Vl),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getUV(t,e,n,i,r,o,a,l){return Po===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Po=!0),this.getInterpolation(t,e,n,i,r,o,a,l)}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,di.x),l.addScaledVector(o,di.y),l.addScaledVector(a,di.z),l)}static isFrontFacing(t,e,n,i){return Vn.subVectors(n,e),ui.subVectors(t,e),Vn.cross(ui).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Vn.cross(ui).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return Po===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Po=!0),s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Fs.subVectors(i,n),Us.subVectors(r,n),Hl.subVectors(t,n);let l=Fs.dot(Hl),c=Us.dot(Hl);if(l<=0&&c<=0)return e.copy(n);Gl.subVectors(t,i);let h=Fs.dot(Gl),d=Us.dot(Gl);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Fs,o);Wl.subVectors(t,r);let f=Fs.dot(Wl),g=Us.dot(Wl);if(g>=0&&f<=g)return e.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Us,a);let p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Sd.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(Sd,a);let m=1/(p+v+u);return o=v*m,a=u*m,e.copy(n).addScaledVector(Fs,o).addScaledVector(Us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Io={h:0,s:0,l:0};zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=fe.workingColorSpace){if(t=Qc(t,1),e=Ze(e,0,1),n=Ze(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Xl(o,r,t+1/3),this.g=Xl(o,r,t),this.b=Xl(o,r,t-1/3)}return fe.toWorkingColorSpace(this,i),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=Cf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=js(t.r),this.g=js(t.g),this.b=js(t.b),this}copyLinearToSRGB(t){return this.r=Nl(t.r),this.g=Nl(t.g),this.b=Nl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return fe.fromWorkingColorSpace(un.copy(this),t),Math.round(Ze(un.r*255,0,255))*65536+Math.round(Ze(un.g*255,0,255))*256+Math.round(Ze(un.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(un.copy(this),e);let n=un.r,i=un.g,r=un.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=Ee){fe.fromWorkingColorSpace(un.copy(this),t);let e=un.r,n=un.g,i=un.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ni),this.setHSL(Ni.h+t,Ni.s+e,Ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ni),t.getHSL(Io);let n=Nr(Ni.h,Io.h,e),i=Nr(Ni.s,Io.s,e),r=Nr(Ni.l,Io.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new zt;zt.NAMES=Cf;Bg=0,Wn=class extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=$s,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rc,this.blendDst=oc,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$s&&(n.blending=this.blending),this.side!==Bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rc&&(n.blendSrc=this.blendSrc),this.blendDst!==oc&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ir=class extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},mi=Og();th={toHalfFloat:zg,fromHalfFloat:kg},Oe=new H,Lo=new jt,rn=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ud,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lo.fromBufferAttribute(this,e),Lo.applyMatrix3(t),this.setXY(e,Lo.x,Lo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ws(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ws(e,this.array)),e}setX(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ws(e,this.array)),e}setY(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ws(e,this.array)),e}setZ(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ws(e,this.array)),e}setW(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array),i=mn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array),i=mn(i,this.array),r=mn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ud&&(t.usage=this.usage),t}},sr=class extends rn{constructor(t,e,n){super(new Uint16Array(t),e,n)}},oa=class extends rn{constructor(t,e,n){super(new Uint32Array(t),e,n)}},Ne=class extends rn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Vg=0,Ln=new Ut,ql=new De,Bs=new H,Cn=new ki,Pr=new ki,qe=new H,on=class s extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Tf(t)?oa:sr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new re().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return ql.lookAt(t),ql.updateMatrix(),this.applyMatrix4(ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Pr.setFromBufferAttribute(a),this.morphTargetsRelative?(qe.addVectors(Cn.min,Pr.min),Cn.expandByPoint(qe),qe.addVectors(Cn.max,Pr.max),Cn.expandByPoint(qe)):(Cn.expandByPoint(Pr.min),Cn.expandByPoint(Pr.max))}Cn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)qe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)qe.fromBufferAttribute(a,c),l&&(Bs.fromBufferAttribute(t,c),qe.add(Bs)),i=Math.max(i,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<a;E++)c[E]=new H,h[E]=new H;let d=new H,u=new H,f=new H,g=new jt,v=new jt,p=new jt,m=new H,x=new H;function y(E,V,q){d.fromArray(i,E*3),u.fromArray(i,V*3),f.fromArray(i,q*3),g.fromArray(o,E*2),v.fromArray(o,V*2),p.fromArray(o,q*2),u.sub(d),f.sub(d),v.sub(g),p.sub(g);let W=1/(v.x*p.y-p.x*v.y);isFinite(W)&&(m.copy(u).multiplyScalar(p.y).addScaledVector(f,-v.y).multiplyScalar(W),x.copy(f).multiplyScalar(v.x).addScaledVector(u,-p.x).multiplyScalar(W),c[E].add(m),c[V].add(m),c[q].add(m),h[E].add(x),h[V].add(x),h[q].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let E=0,V=M.length;E<V;++E){let q=M[E],W=q.start,I=q.count;for(let F=W,z=W+I;F<z;F+=3)y(n[F+0],n[F+1],n[F+2])}let P=new H,T=new H,R=new H,G=new H;function b(E){R.fromArray(r,E*3),G.copy(R);let V=c[E];P.copy(V),P.sub(R.multiplyScalar(R.dot(V))).normalize(),T.crossVectors(G,V);let W=T.dot(h[E])<0?-1:1;l[E*4]=P.x,l[E*4+1]=P.y,l[E*4+2]=P.z,l[E*4+3]=W}for(let E=0,V=M.length;E<V;++E){let q=M[E],W=q.start,I=q.count;for(let F=W,z=W+I;F<z;F+=3)b(n[F+0]),b(n[F+1]),b(n[F+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new H,r=new H,o=new H,a=new H,l=new H,c=new H,h=new H,d=new H;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new rn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ed=new Ut,as=new nr,No=new Vi,Ad=new H,Os=new H,zs=new H,ks=new H,Yl=new H,Do=new H,Fo=new jt,Uo=new jt,Bo=new jt,Td=new H,Cd=new H,Rd=new H,Oo=new H,zo=new H,Fe=class extends De{constructor(t=new on,e=new ir){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Yl.fromBufferAttribute(d,t),o?Do.addScaledVector(Yl,h):Do.addScaledVector(Yl.sub(e),h))}e.add(Do)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(r),as.copy(t.ray).recast(t.near),!(No.containsPoint(as.origin)===!1&&(as.intersectSphere(No,Ad)===null||as.origin.distanceToSquared(Ad)>(t.far-t.near)**2))&&(Ed.copy(r).invert(),as.copy(t.ray).applyMatrix4(Ed),!(n.boundingBox!==null&&as.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,as)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=o[p.materialIndex],x=Math.max(p.start,f.start),y=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,P=y;M<P;M+=3){let T=a.getX(M),R=a.getX(M+1),G=a.getX(M+2);i=ko(this,m,t,n,c,h,d,T,R,G),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let x=a.getX(p),y=a.getX(p+1),M=a.getX(p+2);i=ko(this,o,t,n,c,h,d,x,y,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){let p=u[g],m=o[p.materialIndex],x=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,P=y;M<P;M+=3){let T=M,R=M+1,G=M+2;i=ko(this,m,t,n,c,h,d,T,R,G),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){let x=p,y=p+1,M=p+2;i=ko(this,o,t,n,c,h,d,x,y,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};zr=class s extends on{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(d,2));function g(v,p,m,x,y,M,P,T,R,G,b){let E=M/R,V=P/G,q=M/2,W=P/2,I=T/2,F=R+1,z=G+1,et=0,Z=0,Y=new H;for(let nt=0;nt<z;nt++){let rt=nt*V-W;for(let tt=0;tt<F;tt++){let J=tt*E-q;Y[v]=J*x,Y[p]=rt*y,Y[m]=I,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[p]=0,Y[m]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(tt/R),d.push(1-nt/G),et+=1}}for(let nt=0;nt<G;nt++)for(let rt=0;rt<R;rt++){let tt=u+rt+F*nt,J=u+rt+F*(nt+1),ot=u+(rt+1)+F*(nt+1),gt=u+(rt+1)+F*nt;l.push(tt,J,gt),l.push(J,ot,gt),Z+=6}a.addGroup(f,Z,b),f+=Z,u+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};ei={clone:rr,merge:gn},Wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wg,this.fragmentShader=Xg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rr(t.uniforms),this.uniformsGroups=Gg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},aa=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=gi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ve=class extends aa{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=er*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Lr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return er*2*Math.atan(Math.tan(Lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Lr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Vs=-90,Hs=1,fc=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ve(Vs,Hs,t,e);i.layers=this.layers,this.add(i);let r=new Ve(Vs,Hs,t,e);r.layers=this.layers,this.add(r);let o=new Ve(Vs,Hs,t,e);o.layers=this.layers,this.add(o);let a=new Ve(Vs,Hs,t,e);a.layers=this.layers,this.add(a);let l=new Ve(Vs,Hs,t,e);l.layers=this.layers,this.add(l);let c=new Ve(Vs,Hs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},la=class extends je{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Js,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},pc=class extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Dr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===ds?Ee:bn),this.texture=new la(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ye}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new zr(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:$e});r.uniforms.tEquirect.value=e;let o=new Fe(i,r),a=e.minFilter;return e.minFilter===tr&&(e.minFilter=Ye),new fc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},Zl=new H,qg=new H,Yg=new re,Hn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Zl.subVectors(n,e).cross(qg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Zl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Yg.getNormalMatrix(t),i=this.coplanarPoint(Zl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ls=new Vi,Vo=new H,kr=class{constructor(t=new Hn,e=new Hn,n=new Hn,i=new Hn,r=new Hn,o=new Hn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gi){let n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],p=i[11],m=i[12],x=i[13],y=i[14],M=i[15];if(n[0].setComponents(l-r,u-c,p-f,M-m).normalize(),n[1].setComponents(l+r,u+c,p+f,M+m).normalize(),n[2].setComponents(l+o,u+h,p+g,M+x).normalize(),n[3].setComponents(l-o,u-h,p-g,M-x).normalize(),n[4].setComponents(l-a,u-d,p-v,M-y).normalize(),e===gi)n[5].setComponents(l+a,u+d,p+v,M+y).normalize();else if(e===ea)n[5].setComponents(a,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){return ls.center.set(0,0,0),ls.radius=.7071067811865476,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Vo.x=i.normal.x>0?t.max.x:t.min.x,Vo.y=i.normal.y>0?t.max.y:t.min.y,Vo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Vo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};or=class s extends on{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){let x=m*u-o;for(let y=0;y<c;y++){let M=y*d-r;g.push(M,-x,0),v.push(0,0,1),p.push(y/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<a;x++){let y=x+c*m,M=x+c*(m+1),P=x+1+c*(m+1),T=x+1+c*m;f.push(y,M,T),f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},$g=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jg=`#ifdef USE_ALPHAHASH
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
#endif`,Kg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,t0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
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
#endif`,n0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,i0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,s0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,r0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,o0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,l0=`#ifdef USE_IRIDESCENCE
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
#endif`,c0=`#ifdef USE_BUMPMAP
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
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,v0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,y0=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,x0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_0=`vec3 transformedNormal = objectNormal;
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
#endif`,w0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,E0="gl_FragColor = linearToOutputTexel( gl_FragColor );",A0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,T0=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,P0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I0=`#ifdef USE_ENVMAP
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
#endif`,L0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,F0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
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
}`,B0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,z0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,V0=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,H0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,G0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,X0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Y0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Z0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$0=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,j0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Q0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ev=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,nv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rv=`#if defined( USE_POINTS_UV )
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
#endif`,ov=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,av=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,hv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,uv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vv=`#ifdef USE_NORMALMAP
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
#endif`,yv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_v=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ev=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Av=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Iv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fv=`#ifdef USE_SKINNING
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
#endif`,Uv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bv=`#ifdef USE_SKINNING
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
#endif`,Ov=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vv=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hv=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gv=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$v=`uniform sampler2D t2D;
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
}`,jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ty=`#include <common>
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
}`,ey=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ny=`#define DISTANCE
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
}`,iy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ry=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ay=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ly=`#include <common>
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
}`,cy=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,hy=`#define LAMBERT
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
}`,uy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,dy=`#define MATCAP
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
}`,fy=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,py=`#define NORMAL
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
}`,my=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gy=`#define PHONG
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
}`,vy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,yy=`#define STANDARD
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
}`,xy=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,_y=`#define TOON
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
}`,wy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,My=`uniform float size;
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
}`,by=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Sy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Ey=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Ay=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Ty=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,se={alphahash_fragment:$g,alphahash_pars_fragment:jg,alphamap_fragment:Kg,alphamap_pars_fragment:Jg,alphatest_fragment:Qg,alphatest_pars_fragment:t0,aomap_fragment:e0,aomap_pars_fragment:n0,batching_pars_vertex:i0,batching_vertex:s0,begin_vertex:r0,beginnormal_vertex:o0,bsdfs:a0,iridescence_fragment:l0,bumpmap_pars_fragment:c0,clipping_planes_fragment:h0,clipping_planes_pars_fragment:u0,clipping_planes_pars_vertex:d0,clipping_planes_vertex:f0,color_fragment:p0,color_pars_fragment:m0,color_pars_vertex:g0,color_vertex:v0,common:y0,cube_uv_reflection_fragment:x0,defaultnormal_vertex:_0,displacementmap_pars_vertex:w0,displacementmap_vertex:M0,emissivemap_fragment:b0,emissivemap_pars_fragment:S0,colorspace_fragment:E0,colorspace_pars_fragment:A0,envmap_fragment:T0,envmap_common_pars_fragment:C0,envmap_pars_fragment:R0,envmap_pars_vertex:P0,envmap_physical_pars_fragment:H0,envmap_vertex:I0,fog_vertex:L0,fog_pars_vertex:N0,fog_fragment:D0,fog_pars_fragment:F0,gradientmap_pars_fragment:U0,lightmap_fragment:B0,lightmap_pars_fragment:O0,lights_lambert_fragment:z0,lights_lambert_pars_fragment:k0,lights_pars_begin:V0,lights_toon_fragment:G0,lights_toon_pars_fragment:W0,lights_phong_fragment:X0,lights_phong_pars_fragment:q0,lights_physical_fragment:Y0,lights_physical_pars_fragment:Z0,lights_fragment_begin:$0,lights_fragment_maps:j0,lights_fragment_end:K0,logdepthbuf_fragment:J0,logdepthbuf_pars_fragment:Q0,logdepthbuf_pars_vertex:tv,logdepthbuf_vertex:ev,map_fragment:nv,map_pars_fragment:iv,map_particle_fragment:sv,map_particle_pars_fragment:rv,metalnessmap_fragment:ov,metalnessmap_pars_fragment:av,morphcolor_vertex:lv,morphnormal_vertex:cv,morphtarget_pars_vertex:hv,morphtarget_vertex:uv,normal_fragment_begin:dv,normal_fragment_maps:fv,normal_pars_fragment:pv,normal_pars_vertex:mv,normal_vertex:gv,normalmap_pars_fragment:vv,clearcoat_normal_fragment_begin:yv,clearcoat_normal_fragment_maps:xv,clearcoat_pars_fragment:_v,iridescence_pars_fragment:wv,opaque_fragment:Mv,packing:bv,premultiplied_alpha_fragment:Sv,project_vertex:Ev,dithering_fragment:Av,dithering_pars_fragment:Tv,roughnessmap_fragment:Cv,roughnessmap_pars_fragment:Rv,shadowmap_pars_fragment:Pv,shadowmap_pars_vertex:Iv,shadowmap_vertex:Lv,shadowmask_pars_fragment:Nv,skinbase_vertex:Dv,skinning_pars_vertex:Fv,skinning_vertex:Uv,skinnormal_vertex:Bv,specularmap_fragment:Ov,specularmap_pars_fragment:zv,tonemapping_fragment:kv,tonemapping_pars_fragment:Vv,transmission_fragment:Hv,transmission_pars_fragment:Gv,uv_pars_fragment:Wv,uv_pars_vertex:Xv,uv_vertex:qv,worldpos_vertex:Yv,background_vert:Zv,background_frag:$v,backgroundCube_vert:jv,backgroundCube_frag:Kv,cube_vert:Jv,cube_frag:Qv,depth_vert:ty,depth_frag:ey,distanceRGBA_vert:ny,distanceRGBA_frag:iy,equirect_vert:sy,equirect_frag:ry,linedashed_vert:oy,linedashed_frag:ay,meshbasic_vert:ly,meshbasic_frag:cy,meshlambert_vert:hy,meshlambert_frag:uy,meshmatcap_vert:dy,meshmatcap_frag:fy,meshnormal_vert:py,meshnormal_frag:my,meshphong_vert:gy,meshphong_frag:vy,meshphysical_vert:yy,meshphysical_frag:xy,meshtoon_vert:_y,meshtoon_frag:wy,points_vert:My,points_frag:by,shadow_vert:Sy,shadow_frag:Ey,sprite_vert:Ay,sprite_frag:Ty},Mt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Jn={basic:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new zt(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:gn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:gn([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:gn([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new zt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:gn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:gn([Mt.points,Mt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:gn([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:gn([Mt.common,Mt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:gn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:gn([Mt.sprite,Mt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:gn([Mt.common,Mt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:gn([Mt.lights,Mt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Jn.physical={uniforms:gn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};Ho={r:0,b:0,g:0};Hi=class extends aa{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},qs=4,Pd=[.125,.215,.35,.446,.526,.582],hs=20,$l=new Hi,Id=new zt,jl=null,Kl=0,Jl=0,cs=(1+Math.sqrt(5))/2,Gs=1/cs,Ld=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,cs,Gs),new H(0,cs,-Gs),new H(Gs,0,cs),new H(-Gs,0,cs),new H(cs,Gs,0),new H(-cs,Gs,0)],ca=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){jl=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jl,Kl,Jl),t.scissorTest=!1,Go(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Js||t.mapping===Qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jl=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ye,minFilter:Ye,generateMipmaps:!1,type:vn,format:Mn,colorSpace:Nn,depthBuffer:!1},i=Nd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dy(r)),this._blurMaterial=Fy(r,t,e)}return i}_compileMaterial(t){let e=new Fe(this._lodPlanes[0],t);this._renderer.compile(e,$l)}_sceneToCubeUV(t,e,n,i){let a=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Id),h.toneMapping=Fi,h.autoClear=!1;let f=new ir({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1}),g=new Fe(new zr,f),v=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,v=!0):(f.color.copy(Id),v=!0);for(let m=0;m<6;m++){let x=m%3;x===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):x===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let y=this._cubeSize;Go(i,x*y,m>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Js||t.mapping===Qs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Go(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,$l)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ld[(i-1)%Ld.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Fe(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hs-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):hs;p>hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hs}`);let m=[],x=0;for(let R=0;R<hs;++R){let G=R/v,b=Math.exp(-G*G/2);m.push(b),R===0?x+=b:R<p&&(x+=2*b)}for(let R=0;R<m.length;R++)m[R]=m[R]/x;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;let M=this._sizeLods[i],P=3*M*(i>y-qs?i-y+qs:0),T=4*(this._cubeSize-M);Go(e,P,T,3*M,2*M),l.setRenderTarget(e),l.render(d,$l)}};ar=class extends je{constructor(t,e,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:us,h!==us&&h!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===us&&(n=Di),n===void 0&&h===Oi&&(n=yi),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=l!==void 0?l:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},If=new je,Lf=new ar(1,1);Lf.compareFunction=Af;Nf=new ra,Df=new dc,Ff=new la,Ud=[],Bd=[],Od=new Float32Array(16),zd=new Float32Array(9),kd=new Float32Array(4);mc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=hx(e.type)}},gc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Px(e.type)}},vc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Ql=/(\w+)(\])?(\[|\.)?/g;Ks=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Ix(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};Lx=37297,Nx=0;Hx=/^[ \t]*#include +<([\w\d./]+)>/gm;Gx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);Xx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;Qx=0,xc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _c(t),e.set(t,n)),n}},_c=class{constructor(t){this.id=Qx++,this.code=t,this.usedTimes=0}};o_=0;wc=class extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Mc=class extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},h_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;bc=class extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},vi=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},g_={type:"move"},Fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,n),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(g_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new vi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Sc=class extends zi{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,v=e.getContextAttributes(),p=null,m=null,x=[],y=[],M=new jt,P=null,T=new Ve;T.layers.enable(1),T.viewport=new ce;let R=new Ve;R.layers.enable(2),R.viewport=new ce;let G=[T,R],b=new bc;b.layers.enable(1),b.layers.enable(2);let E=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ot=x[J];return ot===void 0&&(ot=new Fr,x[J]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(J){let ot=x[J];return ot===void 0&&(ot=new Fr,x[J]=ot),ot.getGripSpace()},this.getHand=function(J){let ot=x[J];return ot===void 0&&(ot=new Fr,x[J]=ot),ot.getHandSpace()};function q(J){let ot=y.indexOf(J.inputSource);if(ot===-1)return;let gt=x[ot];gt!==void 0&&(gt.update(J.inputSource,J.frame,c||o),gt.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",I);for(let J=0;J<x.length;J++){let ot=y[J];ot!==null&&(y[J]=null,x[J].disconnect(ot))}E=null,V=null,t.setRenderTarget(p),f=null,u=null,d=null,i=null,m=null,tt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",W),i.addEventListener("inputsourceschange",I),v.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(M),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let ot={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new En(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:Ui,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let ot=null,gt=null,pt=null;v.depth&&(pt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=v.stencil?Oi:us,gt=v.stencil?yi:Di);let vt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(vt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new En(u.textureWidth,u.textureHeight,{format:Mn,type:Ui,depthTexture:new ar(u.textureWidth,u.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});let bt=t.properties.get(m);bt.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function I(J){for(let ot=0;ot<J.removed.length;ot++){let gt=J.removed[ot],pt=y.indexOf(gt);pt>=0&&(y[pt]=null,x[pt].disconnect(gt))}for(let ot=0;ot<J.added.length;ot++){let gt=J.added[ot],pt=y.indexOf(gt);if(pt===-1){for(let bt=0;bt<x.length;bt++)if(bt>=y.length){y.push(gt),pt=bt;break}else if(y[bt]===null){y[bt]=gt,pt=bt;break}if(pt===-1)break}let vt=x[pt];vt&&vt.connect(gt)}}let F=new H,z=new H;function et(J,ot,gt){F.setFromMatrixPosition(ot.matrixWorld),z.setFromMatrixPosition(gt.matrixWorld);let pt=F.distanceTo(z),vt=ot.projectionMatrix.elements,bt=gt.projectionMatrix.elements,it=vt[14]/(vt[10]-1),at=vt[14]/(vt[10]+1),wt=(vt[9]+1)/vt[5],X=(vt[9]-1)/vt[5],Vt=(vt[8]-1)/vt[0],Tt=(bt[8]+1)/bt[0],Ft=it*Vt,Ct=it*Tt,ae=pt/(-Vt+Tt),Gt=ae*-Vt;ot.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Gt),J.translateZ(ae),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();let L=it+ae,A=at+ae,j=Ft-Gt,ht=Ct+(pt-Gt),lt=wt*at/A*L,ft=X*at/A*L;J.projectionMatrix.makePerspective(j,ht,lt,ft,L,A),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function Z(J,ot){ot===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ot.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;b.near=R.near=T.near=J.near,b.far=R.far=T.far=J.far,(E!==b.near||V!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),E=b.near,V=b.far);let ot=J.parent,gt=b.cameras;Z(b,ot);for(let pt=0;pt<gt.length;pt++)Z(gt[pt],ot);gt.length===2?et(b,T,R):b.projectionMatrix.copy(T.projectionMatrix),Y(J,b,ot)};function Y(J,ot,gt){gt===null?J.matrix.copy(ot.matrixWorld):(J.matrix.copy(gt.matrixWorld),J.matrix.invert(),J.matrix.multiply(ot.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=er*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)};let nt=null;function rt(J,ot){if(h=ot.getViewerPose(c||o),g=ot,h!==null){let gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let pt=!1;gt.length!==b.cameras.length&&(b.cameras.length=0,pt=!0);for(let vt=0;vt<gt.length;vt++){let bt=gt[vt],it=null;if(f!==null)it=f.getViewport(bt);else{let wt=d.getViewSubImage(u,bt);it=wt.viewport,vt===0&&(t.setRenderTargetTextures(m,wt.colorTexture,u.ignoreDepthValues?void 0:wt.depthStencilTexture),t.setRenderTarget(m))}let at=G[vt];at===void 0&&(at=new Ve,at.layers.enable(vt),at.viewport=new ce,G[vt]=at),at.matrix.fromArray(bt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(bt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(it.x,it.y,it.width,it.height),vt===0&&(b.matrix.copy(at.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),pt===!0&&b.cameras.push(at)}}for(let gt=0;gt<x.length;gt++){let pt=y[gt],vt=x[gt];pt!==null&&vt!==void 0&&vt.update(pt,ot,c||o)}nt&&nt(J,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}let tt=new Pf;tt.setAnimationLoop(rt),this.setAnimationLoop=function(J){nt=J},this.dispose=function(){}}};Vr=class{constructor(t={}){let{canvas:e=Eg(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;let f=new Uint32Array(4),g=new Int32Array(4),v=null,p=null,m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this._useLegacyLights=!1,this.toneMapping=Fi,this.toneMappingExposure=1;let y=this,M=!1,P=0,T=0,R=null,G=-1,b=null,E=new ce,V=new ce,q=null,W=new zt(0),I=0,F=e.width,z=e.height,et=1,Z=null,Y=null,nt=new ce(0,0,F,z),rt=new ce(0,0,F,z),tt=!1,J=new kr,ot=!1,gt=!1,pt=null,vt=new Ut,bt=new jt,it=new H,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function wt(){return R===null?et:1}let X=n;function Vt(_,N){for(let D=0;D<_.length;D++){let U=_[D],B=e.getContext(U,N);if(B!==null)return B}return null}try{let _={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",k,!1),e.addEventListener("webglcontextcreationerror",Et,!1),X===null){let N=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&N.shift(),X=Vt(N,_),X===null)throw Vt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&X instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Tt,Ft,Ct,ae,Gt,L,A,j,ht,lt,ft,Rt,yt,St,Dt,kt,ut,le,ne,Wt,Pt,Lt,qt,Yt;function Kt(){Tt=new By(X),Ft=new Iy(X,Tt,t),Tt.init(Ft),Lt=new m_(X,Tt,Ft),Ct=new f_(X,Tt,Ft),ae=new ky(X),Gt=new e_,L=new p_(X,Tt,Ct,Gt,Ft,Lt,ae),A=new Ny(y),j=new Uy(y),ht=new Zg(X,Ft),qt=new Ry(X,Tt,ht,Ft),lt=new Oy(X,ht,ae,qt),ft=new Wy(X,lt,ht,ae),ne=new Gy(X,Ft,L),kt=new Ly(Gt),Rt=new t_(y,A,j,Tt,Ft,qt,kt),yt=new v_(y,Gt),St=new i_,Dt=new c_(Tt,Ft),le=new Cy(y,A,j,Ct,ft,u,l),ut=new d_(y,ft,Ft),Yt=new y_(X,ae,Ft,Ct),Wt=new Py(X,Tt,ae,Ft),Pt=new zy(X,Tt,ae,Ft),ae.programs=Rt.programs,y.capabilities=Ft,y.extensions=Tt,y.properties=Gt,y.renderLists=St,y.shadowMap=ut,y.state=Ct,y.info=ae}Kt();let $t=new Sc(y,X);this.xr=$t,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let _=Tt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Tt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(_){_!==void 0&&(et=_,this.setSize(F,z,!1))},this.getSize=function(_){return _.set(F,z)},this.setSize=function(_,N,D=!0){if($t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=_,z=N,e.width=Math.floor(_*et),e.height=Math.floor(N*et),D===!0&&(e.style.width=_+"px",e.style.height=N+"px"),this.setViewport(0,0,_,N)},this.getDrawingBufferSize=function(_){return _.set(F*et,z*et).floor()},this.setDrawingBufferSize=function(_,N,D){F=_,z=N,et=D,e.width=Math.floor(_*D),e.height=Math.floor(N*D),this.setViewport(0,0,_,N)},this.getCurrentViewport=function(_){return _.copy(E)},this.getViewport=function(_){return _.copy(nt)},this.setViewport=function(_,N,D,U){_.isVector4?nt.set(_.x,_.y,_.z,_.w):nt.set(_,N,D,U),Ct.viewport(E.copy(nt).multiplyScalar(et).floor())},this.getScissor=function(_){return _.copy(rt)},this.setScissor=function(_,N,D,U){_.isVector4?rt.set(_.x,_.y,_.z,_.w):rt.set(_,N,D,U),Ct.scissor(V.copy(rt).multiplyScalar(et).floor())},this.getScissorTest=function(){return tt},this.setScissorTest=function(_){Ct.setScissorTest(tt=_)},this.setOpaqueSort=function(_){Z=_},this.setTransparentSort=function(_){Y=_},this.getClearColor=function(_){return _.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor.apply(le,arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha.apply(le,arguments)},this.clear=function(_=!0,N=!0,D=!0){let U=0;if(_){let B=!1;if(R!==null){let Q=R.texture.format;B=Q===bf||Q===Mf||Q===wf}if(B){let Q=R.texture.type,$=Q===Ui||Q===Di||Q===$c||Q===yi||Q===xf||Q===_f,st=le.getClearColor(),ct=le.getClearAlpha(),dt=st.r,mt=st.g,xt=st.b;$?(f[0]=dt,f[1]=mt,f[2]=xt,f[3]=ct,X.clearBufferuiv(X.COLOR,0,f)):(g[0]=dt,g[1]=mt,g[2]=xt,g[3]=ct,X.clearBufferiv(X.COLOR,0,g))}else U|=X.COLOR_BUFFER_BIT}N&&(U|=X.DEPTH_BUFFER_BIT),D&&(U|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",k,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),St.dispose(),Dt.dispose(),Gt.dispose(),A.dispose(),j.dispose(),ft.dispose(),qt.dispose(),Yt.dispose(),Rt.dispose(),$t.dispose(),$t.removeEventListener("sessionstart",tn),$t.removeEventListener("sessionend",xe),pt&&(pt.dispose(),pt=null),en.stop()};function K(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let _=ae.autoReset,N=ut.enabled,D=ut.autoUpdate,U=ut.needsUpdate,B=ut.type;Kt(),ae.autoReset=_,ut.enabled=N,ut.autoUpdate=D,ut.needsUpdate=U,ut.type=B}function Et(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function At(_){let N=_.target;N.removeEventListener("dispose",At),Zt(N)}function Zt(_){Xt(_),Gt.remove(_)}function Xt(_){let N=Gt.get(_).programs;N!==void 0&&(N.forEach(function(D){Rt.releaseProgram(D)}),_.isShaderMaterial&&Rt.releaseShaderCache(_))}this.renderBufferDirect=function(_,N,D,U,B,Q){N===null&&(N=at);let $=B.isMesh&&B.matrixWorld.determinant()<0,st=w(_,N,D,U,B);Ct.setMaterial(U,$);let ct=D.index,dt=1;if(U.wireframe===!0){if(ct=lt.getWireframeAttribute(D),ct===void 0)return;dt=2}let mt=D.drawRange,xt=D.attributes.position,_t=mt.start*dt,It=(mt.start+mt.count)*dt;Q!==null&&(_t=Math.max(_t,Q.start*dt),It=Math.min(It,(Q.start+Q.count)*dt)),ct!==null?(_t=Math.max(_t,0),It=Math.min(It,ct.count)):xt!=null&&(_t=Math.max(_t,0),It=Math.min(It,xt.count));let Bt=It-_t;if(Bt<0||Bt===1/0)return;qt.setup(B,U,st,D,ct);let ue,Jt=Wt;if(ct!==null&&(ue=ht.get(ct),Jt=Pt,Jt.setIndex(ue)),B.isMesh)U.wireframe===!0?(Ct.setLineWidth(U.wireframeLinewidth*wt()),Jt.setMode(X.LINES)):Jt.setMode(X.TRIANGLES);else if(B.isLine){let Ht=U.linewidth;Ht===void 0&&(Ht=1),Ct.setLineWidth(Ht*wt()),B.isLineSegments?Jt.setMode(X.LINES):B.isLineLoop?Jt.setMode(X.LINE_LOOP):Jt.setMode(X.LINE_STRIP)}else B.isPoints?Jt.setMode(X.POINTS):B.isSprite&&Jt.setMode(X.TRIANGLES);if(B.isBatchedMesh)Jt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)Jt.renderInstances(_t,Bt,B.count);else if(D.isInstancedBufferGeometry){let Ht=D._maxInstanceCount!==void 0?D._maxInstanceCount:1/0,me=Math.min(D.instanceCount,Ht);Jt.renderInstances(_t,Bt,me)}else Jt.render(_t,Bt)};function ve(_,N,D){_.transparent===!0&&_.side===Gn&&_.forceSinglePass===!1?(_.side=Sn,_.needsUpdate=!0,ie(_,N,D),_.side=Bi,_.needsUpdate=!0,ie(_,N,D),_.side=Gn):ie(_,N,D)}this.compile=function(_,N,D=null){D===null&&(D=_),p=Dt.get(D),p.init(),x.push(p),D.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),_!==D&&_.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights(y._useLegacyLights);let U=new Set;return _.traverse(function(B){let Q=B.material;if(Q)if(Array.isArray(Q))for(let $=0;$<Q.length;$++){let st=Q[$];ve(st,D,B),U.add(st)}else ve(Q,D,B),U.add(Q)}),x.pop(),p=null,U},this.compileAsync=function(_,N,D=null){let U=this.compile(_,N,D);return new Promise(B=>{function Q(){if(U.forEach(function($){Gt.get($).currentProgram.isReady()&&U.delete($)}),U.size===0){B(_);return}setTimeout(Q,10)}Tt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ye=null;function Be(_){ye&&ye(_)}function tn(){en.stop()}function xe(){en.start()}let en=new Pf;en.setAnimationLoop(Be),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(_){ye=_,$t.setAnimationLoop(_),_===null?en.stop():en.start()},$t.addEventListener("sessionstart",tn),$t.addEventListener("sessionend",xe),this.render=function(_,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$t.enabled===!0&&$t.isPresenting===!0&&($t.cameraAutoUpdate===!0&&$t.updateCamera(N),N=$t.getCamera()),_.isScene===!0&&_.onBeforeRender(y,_,N,R),p=Dt.get(_,x.length),p.init(),x.push(p),vt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),J.setFromProjectionMatrix(vt),gt=this.localClippingEnabled,ot=kt.init(this.clippingPlanes,gt),v=St.get(_,m.length),v.init(),m.push(v),In(_,N,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(Z,Y),this.info.render.frame++,ot===!0&&kt.beginShadows();let D=p.state.shadowsArray;if(ut.render(D,_,N),ot===!0&&kt.endShadows(),this.info.autoReset===!0&&this.info.reset(),le.render(v,_),p.setupLights(y._useLegacyLights),N.isArrayCamera){let U=N.cameras;for(let B=0,Q=U.length;B<Q;B++){let $=U[B];is(v,_,$,$.viewport)}}else is(v,_,N);R!==null&&(L.updateMultisampleRenderTarget(R),L.updateRenderTargetMipmap(R)),_.isScene===!0&&_.onAfterRender(y,_,N),qt.resetDefaultState(),G=-1,b=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function In(_,N,D,U){if(_.visible===!1)return;if(_.layers.test(N.layers)){if(_.isGroup)D=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(N);else if(_.isLight)p.pushLight(_),_.castShadow&&p.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||J.intersectsSprite(_)){U&&it.setFromMatrixPosition(_.matrixWorld).applyMatrix4(vt);let $=ft.update(_),st=_.material;st.visible&&v.push(_,$,st,D,it.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||J.intersectsObject(_))){let $=ft.update(_),st=_.material;if(U&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),it.copy(_.boundingSphere.center)):($.boundingSphere===null&&$.computeBoundingSphere(),it.copy($.boundingSphere.center)),it.applyMatrix4(_.matrixWorld).applyMatrix4(vt)),Array.isArray(st)){let ct=$.groups;for(let dt=0,mt=ct.length;dt<mt;dt++){let xt=ct[dt],_t=st[xt.materialIndex];_t&&_t.visible&&v.push(_,$,_t,D,it.z,xt)}}else st.visible&&v.push(_,$,st,D,it.z,null)}}let Q=_.children;for(let $=0,st=Q.length;$<st;$++)In(Q[$],N,D,U)}function is(_,N,D,U){let B=_.opaque,Q=_.transmissive,$=_.transparent;p.setupLightsView(D),ot===!0&&kt.setGlobalState(y.clippingPlanes,D),Q.length>0&&Ml(B,Q,N,D),U&&Ct.viewport(E.copy(U)),B.length>0&&Kn(B,N,D),Q.length>0&&Kn(Q,N,D),$.length>0&&Kn($,N,D),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function Ml(_,N,D,U){if((D.isScene===!0?D.overrideMaterial:null)!==null)return;let Q=Ft.isWebGL2;pt===null&&(pt=new En(1,1,{generateMipmaps:!0,type:Tt.has("EXT_color_buffer_half_float")?vn:Ui,minFilter:tr,samples:Q?4:0})),y.getDrawingBufferSize(bt),Q?pt.setSize(bt.x,bt.y):pt.setSize(na(bt.x),na(bt.y));let $=y.getRenderTarget();y.setRenderTarget(pt),y.getClearColor(W),I=y.getClearAlpha(),I<1&&y.setClearColor(16777215,.5),y.clear();let st=y.toneMapping;y.toneMapping=Fi,Kn(_,D,U),L.updateMultisampleRenderTarget(pt),L.updateRenderTargetMipmap(pt);let ct=!1;for(let dt=0,mt=N.length;dt<mt;dt++){let xt=N[dt],_t=xt.object,It=xt.geometry,Bt=xt.material,ue=xt.group;if(Bt.side===Gn&&_t.layers.test(U.layers)){let Jt=Bt.side;Bt.side=Sn,Bt.needsUpdate=!0,Ti(_t,D,U,It,Bt,ue),Bt.side=Jt,Bt.needsUpdate=!0,ct=!0}}ct===!0&&(L.updateMultisampleRenderTarget(pt),L.updateRenderTargetMipmap(pt)),y.setRenderTarget($),y.setClearColor(W,I),y.toneMapping=st}function Kn(_,N,D){let U=N.isScene===!0?N.overrideMaterial:null;for(let B=0,Q=_.length;B<Q;B++){let $=_[B],st=$.object,ct=$.geometry,dt=U===null?$.material:U,mt=$.group;st.layers.test(D.layers)&&Ti(st,N,D,ct,dt,mt)}}function Ti(_,N,D,U,B,Q){_.onBeforeRender(y,N,D,U,B,Q),_.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),B.onBeforeRender(y,N,D,U,_,Q),B.transparent===!0&&B.side===Gn&&B.forceSinglePass===!1?(B.side=Sn,B.needsUpdate=!0,y.renderBufferDirect(D,N,U,B,_,Q),B.side=Bi,B.needsUpdate=!0,y.renderBufferDirect(D,N,U,B,_,Q),B.side=Gn):y.renderBufferDirect(D,N,U,B,_,Q),_.onAfterRender(y,N,D,U,B,Q)}function ie(_,N,D){N.isScene!==!0&&(N=at);let U=Gt.get(_),B=p.state.lights,Q=p.state.shadowsArray,$=B.state.version,st=Rt.getParameters(_,B.state,Q,N,D),ct=Rt.getProgramCacheKey(st),dt=U.programs;U.environment=_.isMeshStandardMaterial?N.environment:null,U.fog=N.fog,U.envMap=(_.isMeshStandardMaterial?j:A).get(_.envMap||U.environment),dt===void 0&&(_.addEventListener("dispose",At),dt=new Map,U.programs=dt);let mt=dt.get(ct);if(mt!==void 0){if(U.currentProgram===mt&&U.lightsStateVersion===$)return xo(_,st),mt}else st.uniforms=Rt.getUniforms(_),_.onBuild(D,st,y),_.onBeforeCompile(st,y),mt=Rt.acquireProgram(st,ct),dt.set(ct,mt),U.uniforms=st.uniforms;let xt=U.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(xt.clippingPlanes=kt.uniform),xo(_,st),U.needsLights=O(_),U.lightsStateVersion=$,U.needsLights&&(xt.ambientLightColor.value=B.state.ambient,xt.lightProbe.value=B.state.probe,xt.directionalLights.value=B.state.directional,xt.directionalLightShadows.value=B.state.directionalShadow,xt.spotLights.value=B.state.spot,xt.spotLightShadows.value=B.state.spotShadow,xt.rectAreaLights.value=B.state.rectArea,xt.ltc_1.value=B.state.rectAreaLTC1,xt.ltc_2.value=B.state.rectAreaLTC2,xt.pointLights.value=B.state.point,xt.pointLightShadows.value=B.state.pointShadow,xt.hemisphereLights.value=B.state.hemi,xt.directionalShadowMap.value=B.state.directionalShadowMap,xt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,xt.spotShadowMap.value=B.state.spotShadowMap,xt.spotLightMatrix.value=B.state.spotLightMatrix,xt.spotLightMap.value=B.state.spotLightMap,xt.pointShadowMap.value=B.state.pointShadowMap,xt.pointShadowMatrix.value=B.state.pointShadowMatrix),U.currentProgram=mt,U.uniformsList=null,mt}function Sr(_){if(_.uniformsList===null){let N=_.currentProgram.getUniforms();_.uniformsList=Ks.seqWithValue(N.seq,_.uniforms)}return _.uniformsList}function xo(_,N){let D=Gt.get(_);D.outputColorSpace=N.outputColorSpace,D.batching=N.batching,D.instancing=N.instancing,D.instancingColor=N.instancingColor,D.skinning=N.skinning,D.morphTargets=N.morphTargets,D.morphNormals=N.morphNormals,D.morphColors=N.morphColors,D.morphTargetsCount=N.morphTargetsCount,D.numClippingPlanes=N.numClippingPlanes,D.numIntersection=N.numClipIntersection,D.vertexAlphas=N.vertexAlphas,D.vertexTangents=N.vertexTangents,D.toneMapping=N.toneMapping}function w(_,N,D,U,B){N.isScene!==!0&&(N=at),L.resetTextureUnits();let Q=N.fog,$=U.isMeshStandardMaterial?N.environment:null,st=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Nn,ct=(U.isMeshStandardMaterial?j:A).get(U.envMap||$),dt=U.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,mt=!!D.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),xt=!!D.morphAttributes.position,_t=!!D.morphAttributes.normal,It=!!D.morphAttributes.color,Bt=Fi;U.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Bt=y.toneMapping);let ue=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Jt=ue!==void 0?ue.length:0,Ht=Gt.get(U),me=p.state.lights;if(ot===!0&&(gt===!0||_!==b)){let Pe=_===b&&U.id===G;kt.setState(U,_,Pe)}let Ot=!1;U.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==me.state.version||Ht.outputColorSpace!==st||B.isBatchedMesh&&Ht.batching===!1||!B.isBatchedMesh&&Ht.batching===!0||B.isInstancedMesh&&Ht.instancing===!1||!B.isInstancedMesh&&Ht.instancing===!0||B.isSkinnedMesh&&Ht.skinning===!1||!B.isSkinnedMesh&&Ht.skinning===!0||B.isInstancedMesh&&Ht.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ht.instancingColor===!1&&B.instanceColor!==null||Ht.envMap!==ct||U.fog===!0&&Ht.fog!==Q||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==kt.numPlanes||Ht.numIntersection!==kt.numIntersection)||Ht.vertexAlphas!==dt||Ht.vertexTangents!==mt||Ht.morphTargets!==xt||Ht.morphNormals!==_t||Ht.morphColors!==It||Ht.toneMapping!==Bt||Ft.isWebGL2===!0&&Ht.morphTargetsCount!==Jt)&&(Ot=!0):(Ot=!0,Ht.__version=U.version);let we=Ht.currentProgram;Ot===!0&&(we=ie(U,N,B));let pn=!1,Te=!1,he=!1,te=we.getUniforms(),nn=Ht.uniforms;if(Ct.useProgram(we.program)&&(pn=!0,Te=!0,he=!0),U.id!==G&&(G=U.id,Te=!0),pn||b!==_){te.setValue(X,"projectionMatrix",_.projectionMatrix),te.setValue(X,"viewMatrix",_.matrixWorldInverse);let Pe=te.map.cameraPosition;Pe!==void 0&&Pe.setValue(X,it.setFromMatrixPosition(_.matrixWorld)),Ft.logarithmicDepthBuffer&&te.setValue(X,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&te.setValue(X,"isOrthographic",_.isOrthographicCamera===!0),b!==_&&(b=_,Te=!0,he=!0)}if(B.isSkinnedMesh){te.setOptional(X,B,"bindMatrix"),te.setOptional(X,B,"bindMatrixInverse");let Pe=B.skeleton;Pe&&(Ft.floatVertexTextures?(Pe.boneTexture===null&&Pe.computeBoneTexture(),te.setValue(X,"boneTexture",Pe.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(te.setOptional(X,B,"batchingTexture"),te.setValue(X,"batchingTexture",B._matricesTexture,L));let ai=D.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0&&Ft.isWebGL2===!0)&&ne.update(B,D,we),(Te||Ht.receiveShadow!==B.receiveShadow)&&(Ht.receiveShadow=B.receiveShadow,te.setValue(X,"receiveShadow",B.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(nn.envMap.value=ct,nn.flipEnvMap.value=ct.isCubeTexture&&ct.isRenderTargetTexture===!1?-1:1),Te&&(te.setValue(X,"toneMappingExposure",y.toneMappingExposure),Ht.needsLights&&C(nn,he),Q&&U.fog===!0&&yt.refreshFogUniforms(nn,Q),yt.refreshMaterialUniforms(nn,U,et,z,pt),Ks.upload(X,Sr(Ht),nn,L)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Ks.upload(X,Sr(Ht),nn,L),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&te.setValue(X,"center",B.center),te.setValue(X,"modelViewMatrix",B.modelViewMatrix),te.setValue(X,"normalMatrix",B.normalMatrix),te.setValue(X,"modelMatrix",B.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){let Pe=U.uniformsGroups;for(let Ci=0,xm=Pe.length;Ci<xm;Ci++)if(Ft.isWebGL2){let wu=Pe[Ci];Yt.update(wu,we),Yt.bind(wu,we)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return we}function C(_,N){_.ambientLightColor.needsUpdate=N,_.lightProbe.needsUpdate=N,_.directionalLights.needsUpdate=N,_.directionalLightShadows.needsUpdate=N,_.pointLights.needsUpdate=N,_.pointLightShadows.needsUpdate=N,_.spotLights.needsUpdate=N,_.spotLightShadows.needsUpdate=N,_.rectAreaLights.needsUpdate=N,_.hemisphereLights.needsUpdate=N}function O(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(_,N,D){Gt.get(_.texture).__webglTexture=N,Gt.get(_.depthTexture).__webglTexture=D;let U=Gt.get(_);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=D===void 0,U.__autoAllocateDepthBuffer||Tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(_,N){let D=Gt.get(_);D.__webglFramebuffer=N,D.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(_,N=0,D=0){R=_,P=N,T=D;let U=!0,B=null,Q=!1,$=!1;if(_){let ct=Gt.get(_);ct.__useDefaultFramebuffer!==void 0?(Ct.bindFramebuffer(X.FRAMEBUFFER,null),U=!1):ct.__webglFramebuffer===void 0?L.setupRenderTarget(_):ct.__hasExternalTextures&&L.rebindTextures(_,Gt.get(_.texture).__webglTexture,Gt.get(_.depthTexture).__webglTexture);let dt=_.texture;(dt.isData3DTexture||dt.isDataArrayTexture||dt.isCompressedArrayTexture)&&($=!0);let mt=Gt.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(mt[N])?B=mt[N][D]:B=mt[N],Q=!0):Ft.isWebGL2&&_.samples>0&&L.useMultisampledRTT(_)===!1?B=Gt.get(_).__webglMultisampledFramebuffer:Array.isArray(mt)?B=mt[D]:B=mt,E.copy(_.viewport),V.copy(_.scissor),q=_.scissorTest}else E.copy(nt).multiplyScalar(et).floor(),V.copy(rt).multiplyScalar(et).floor(),q=tt;if(Ct.bindFramebuffer(X.FRAMEBUFFER,B)&&Ft.drawBuffers&&U&&Ct.drawBuffers(_,B),Ct.viewport(E),Ct.scissor(V),Ct.setScissorTest(q),Q){let ct=Gt.get(_.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+N,ct.__webglTexture,D)}else if($){let ct=Gt.get(_.texture),dt=N||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,ct.__webglTexture,D||0,dt)}G=-1},this.readRenderTargetPixels=function(_,N,D,U,B,Q,$){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let st=Gt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&$!==void 0&&(st=st[$]),st){Ct.bindFramebuffer(X.FRAMEBUFFER,st);try{let ct=_.texture,dt=ct.format,mt=ct.type;if(dt!==Mn&&Lt.convert(dt)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let xt=mt===vn&&(Tt.has("EXT_color_buffer_half_float")||Ft.isWebGL2&&Tt.has("EXT_color_buffer_float"));if(mt!==Ui&&Lt.convert(mt)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_TYPE)&&!(mt===sn&&(Ft.isWebGL2||Tt.has("OES_texture_float")||Tt.has("WEBGL_color_buffer_float")))&&!xt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=_.width-U&&D>=0&&D<=_.height-B&&X.readPixels(N,D,U,B,Lt.convert(dt),Lt.convert(mt),Q)}finally{let ct=R!==null?Gt.get(R).__webglFramebuffer:null;Ct.bindFramebuffer(X.FRAMEBUFFER,ct)}}},this.copyFramebufferToTexture=function(_,N,D=0){let U=Math.pow(2,-D),B=Math.floor(N.image.width*U),Q=Math.floor(N.image.height*U);L.setTexture2D(N,0),X.copyTexSubImage2D(X.TEXTURE_2D,D,0,0,_.x,_.y,B,Q),Ct.unbindTexture()},this.copyTextureToTexture=function(_,N,D,U=0){let B=N.image.width,Q=N.image.height,$=Lt.convert(D.format),st=Lt.convert(D.type);L.setTexture2D(D,0),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,D.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,D.unpackAlignment),N.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,U,_.x,_.y,B,Q,$,st,N.image.data):N.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,U,_.x,_.y,N.mipmaps[0].width,N.mipmaps[0].height,$,N.mipmaps[0].data):X.texSubImage2D(X.TEXTURE_2D,U,_.x,_.y,$,st,N.image),U===0&&D.generateMipmaps&&X.generateMipmap(X.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(_,N,D,U,B=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Q=_.max.x-_.min.x+1,$=_.max.y-_.min.y+1,st=_.max.z-_.min.z+1,ct=Lt.convert(U.format),dt=Lt.convert(U.type),mt;if(U.isData3DTexture)L.setTexture3D(U,0),mt=X.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)L.setTexture2DArray(U,0),mt=X.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,U.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,U.unpackAlignment);let xt=X.getParameter(X.UNPACK_ROW_LENGTH),_t=X.getParameter(X.UNPACK_IMAGE_HEIGHT),It=X.getParameter(X.UNPACK_SKIP_PIXELS),Bt=X.getParameter(X.UNPACK_SKIP_ROWS),ue=X.getParameter(X.UNPACK_SKIP_IMAGES),Jt=D.isCompressedTexture?D.mipmaps[B]:D.image;X.pixelStorei(X.UNPACK_ROW_LENGTH,Jt.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Jt.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,_.min.x),X.pixelStorei(X.UNPACK_SKIP_ROWS,_.min.y),X.pixelStorei(X.UNPACK_SKIP_IMAGES,_.min.z),D.isDataTexture||D.isData3DTexture?X.texSubImage3D(mt,B,N.x,N.y,N.z,Q,$,st,ct,dt,Jt.data):D.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D(mt,B,N.x,N.y,N.z,Q,$,st,ct,Jt.data)):X.texSubImage3D(mt,B,N.x,N.y,N.z,Q,$,st,ct,dt,Jt),X.pixelStorei(X.UNPACK_ROW_LENGTH,xt),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,_t),X.pixelStorei(X.UNPACK_SKIP_PIXELS,It),X.pixelStorei(X.UNPACK_SKIP_ROWS,Bt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,ue),B===0&&U.generateMipmaps&&X.generateMipmap(mt),Ct.unbindTexture()},this.initTexture=function(_){_.isCubeTexture?L.setTextureCube(_,0):_.isData3DTexture?L.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?L.setTexture2DArray(_,0):L.setTexture2D(_,0),Ct.unbindTexture()},this.resetState=function(){P=0,T=0,R=null,Ct.reset(),qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Kc?"display-p3":"srgb",e.unpackColorSpace=fe.workingColorSpace===Na?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ee?ds:Ef}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===ds?Ee:Nn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Ec=class extends Vr{};Ec.prototype.isWebGL1Renderer=!0;ha=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}},Kd=new H,Jd=new ce,Qd=new ce,x_=new H,tf=new Ut,Wo=new H,tc=new Vi,ef=new Ut,ec=new nr,ua=class extends Fe{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Du,this.bindMatrix=new Ut,this.bindMatrixInverse=new Ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ki),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wo),this.boundingBox.expandByPoint(Wo)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vi),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wo),this.boundingSphere.expandByPoint(Wo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tc.copy(this.boundingSphere),tc.applyMatrix4(i),t.ray.intersectsSphere(tc)!==!1&&(ef.copy(i).invert(),ec.copy(t.ray).applyMatrix4(ef),!(this.boundingBox!==null&&ec.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ec)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ce,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Du?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===qm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;Jd.fromBufferAttribute(i.attributes.skinIndex,t),Qd.fromBufferAttribute(i.attributes.skinWeight,t),Kd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=Qd.getComponent(r);if(o!==0){let a=Jd.getComponent(r);tf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(x_.copy(Kd).applyMatrix4(tf),o)}}return e.applyMatrix4(this.bindMatrixInverse)}boneTransform(t,e){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(t,e)}},lr=class extends De{constructor(){super(),this.isBone=!0,this.type="Bone"}},cr=class extends je{constructor(t=null,e=1,n=1,i,r,o,a,l,c=ze,h=ze,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},nf=new Ut,__=new Ut,da=class s{constructor(t=[],e=[]){this.uuid=Yi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ut)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Ut;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:__;nf.multiplyMatrices(a,e[r]),nf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new cr(e,t,t,Mn,sn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new lr),this.bones.push(o),this.boneInverses.push(new Ut().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let o=e[i];t.bones.push(o.uuid);let a=n[i];t.boneInverses.push(a.toArray())}return t}},Hr=class extends Wn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},sf=new H,rf=new H,of=new Ut,nc=new nr,Xo=new Vi,fa=class extends De{constructor(t=new on,e=new Hr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)sf.fromBufferAttribute(e,i-1),rf.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=sf.distanceTo(rf);t.setAttribute("lineDistance",new Ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xo.copy(n.boundingSphere),Xo.applyMatrix4(i),Xo.radius+=r,t.ray.intersectsSphere(Xo)===!1)return;of.copy(i).invert(),nc.copy(t.ray).applyMatrix4(of);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new H,h=new H,d=new H,u=new H,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){let m=Math.max(0,o.start),x=Math.min(g.count,o.start+o.count);for(let y=m,M=x-1;y<M;y+=f){let P=g.getX(y),T=g.getX(y+1);if(c.fromBufferAttribute(p,P),h.fromBufferAttribute(p,T),nc.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);let G=t.ray.origin.distanceTo(u);G<t.near||G>t.far||e.push({distance:G,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let y=m,M=x-1;y<M;y+=f){if(c.fromBufferAttribute(p,y),h.fromBufferAttribute(p,y+1),nc.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);let T=t.ray.origin.distanceTo(u);T<t.near||T>t.far||e.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},pa=class extends je{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ma=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new jt:new H);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new H,i=[],r=[],o=[],a=new H,l=new Ut;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new H)}r[0]=new H,o[0]=new H;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ze(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ze(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},w_={triangulate:function(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Uf(s,0,i,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,d,u,f;if(n&&(r=A_(s,t,r,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Gr(r,o,e,a,l,f,0),o}};ga=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];lf(t),cf(n,t);let o=t.length;e.forEach(lf);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,cf(n,e[l]);let a=w_.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};va=class s extends on{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new H,u=new H,f=[],g=[],v=[],p=[];for(let m=0;m<=n;m++){let x=[],y=m/n,M=0;m===0&&o===0?M=.5/e:m===n&&l===Math.PI&&(M=-.5/e);for(let P=0;P<=e;P++){let T=P/e;d.x=-t*Math.cos(i+T*r)*Math.sin(o+y*a),d.y=t*Math.cos(o+y*a),d.z=t*Math.sin(i+T*r)*Math.sin(o+y*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(T+M,1-y),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){let y=h[m][x+1],M=h[m][x],P=h[m+1][x],T=h[m+1][x+1];(m!==0||o>0)&&f.push(y,M,T),(m!==n-1||l<Math.PI)&&f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ya=class extends Ke{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ps=class extends Wn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jr,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},hr=class extends Wn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new zt(16777215),this.specular=new zt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jr,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},xa=class extends Wn{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jr,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}},_a=class extends Wn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jr,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};ur=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Cc=class extends ur{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ad,endingEnd:ad}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ld:r=t,a=2*e-n;break;case cd:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ld:o=t,l=2*n-e;break;case cd:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),v=g*g,p=v*g,m=-u*p+2*u*v-u*g,x=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*g+1,y=(-1-f)*p+(1.5+f)*v+.5*g,M=f*p-f*v;for(let P=0;P!==a;++P)r[P]=m*o[h+P]+x*o[c+P]+y*o[l+P]+M*o[d+P];return r}},Rc=class extends ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Pc=class extends ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Dn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Zo(e,this.TimeBufferType),this.values=Zo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Zo(t.times,Array),values:Zo(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Rc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Cc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case jo:e=this.InterpolantFactoryMethodDiscrete;break;case Ko:e=this.InterpolantFactoryMethodLinear;break;case Il:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return jo;case this.InterpolantFactoryMethodLinear:return Ko;case this.InterpolantFactoryMethodSmooth:return Il}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&O_(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Il,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let v=e[d+g];if(v!==e[u+g]||v!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=Ko;Gi=class extends Dn{};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=jo;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;wa=class extends Dn{};wa.prototype.ValueTypeName="color";Wi=class extends Dn{};Wi.prototype.ValueTypeName="number";Ic=class extends ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)He.slerpFlat(r,0,o,c-a,o,c,l);return r}},ti=class extends Dn{InterpolantFactoryMethodLinear(t){return new Ic(this.times,this.values,this.getValueSize(),t)}};ti.prototype.ValueTypeName="quaternion";ti.prototype.DefaultInterpolation=Ko;ti.prototype.InterpolantFactoryMethodSmooth=void 0;Xi=class extends Dn{};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=jo;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;qi=class extends Dn{};qi.prototype.ValueTypeName="vector";Ma=class{constructor(t,e=-1,n,i=tg){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Yi(),this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(V_(n[o]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Dn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=z_(l);l=hf(l,1,h),c=hf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Wi(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(d,u,f,g,v){if(f.length!==0){let p=[],m=[];zf(f,p,m,g),p.length!==0&&v.push(new d(u,p,m))}},i=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,l=t.length||-1,c=t.hierarchy||[];for(let d=0;d<c.length;d++){let u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let v=0;v<u[g].morphTargets.length;v++)f[u[g].morphTargets[v]]=-1;for(let v in f){let p=[],m=[];for(let x=0;x!==u[g].morphTargets.length;++x){let y=u[g];p.push(y.time),m.push(y.morphTarget===v?1:0)}i.push(new Wi(".morphTargetInfluence["+v+"]",p,m))}l=f.length*o}else{let f=".bones["+e[d].name+"]";n(qi,f+".position",u,"pos",i),n(ti,f+".quaternion",u,"rot",i),n(qi,f+".scale",u,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};ba={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Lc=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},H_=new Lc,Xn=class{constructor(t){this.manager=t!==void 0?t:H_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Xn.DEFAULT_MATERIAL_NAME="__DEFAULT";fi={},Nc=class extends Error{constructor(t,e){super(t),this.response=e}},qr=class extends Xn{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=ba.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(fi[t]!==void 0){fi[t].push({onLoad:e,onProgress:n,onError:i});return}fi[t]=[],fi[t].push({onLoad:e,onProgress:n,onError:i});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=fi[t],d=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,g=f!==0,v=0,p=new ReadableStream({start(m){x();function x(){d.read().then(({done:y,value:M})=>{if(y)m.close();else{v+=M.byteLength;let P=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let T=0,R=h.length;T<R;T++){let G=h[T];G.onProgress&&G.onProgress(P)}m.enqueue(M),x()}})}}});return new Response(p)}else throw new Nc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ba.add(t,c);let h=fi[t];delete fi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=fi[t];if(h===void 0)throw this.manager.itemError(t),c;delete fi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}},Dc=class extends Xn{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=ba.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Br("img");function l(){h(),ba.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}},Sa=class extends Xn{constructor(t){super(t)}load(t,e,n,i){let r=this,o=new cr,a=new qr(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:dn,o.wrapT=c.wrapT!==void 0?c.wrapT:dn,o.magFilter=c.magFilter!==void 0?c.magFilter:Ye,o.minFilter=c.minFilter!==void 0?c.minFilter:Ye,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?o.colorSpace=c.colorSpace:c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=tr),c.mipmapCount===1&&(o.minFilter=Ye),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,e&&e(o,c)},n,i),o}},Ea=class extends Xn{constructor(t){super(t)}load(t,e,n,i){let r=new je,o=new Dc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},dr=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},ic=new Ut,uf=new H,df=new H,Yr=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kr,this._frameExtents=new jt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;uf.setFromMatrixPosition(t.matrixWorld),e.position.copy(uf),df.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(df),e.updateMatrixWorld(),ic.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ic),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ic)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Fc=class extends Yr{constructor(){super(new Ve(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=er*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Aa=class extends dr{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Fc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},ff=new Ut,Ir=new H,sc=new H,Uc=class extends Yr{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new jt(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ir.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ir),sc.copy(n.position),sc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(sc),n.updateMatrixWorld(),i.makeTranslation(-Ir.x,-Ir.y,-Ir.z),ff.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ff)}},Zr=class extends dr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Uc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Bc=class extends Yr{constructor(){super(new Hi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ms=class extends dr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Bc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},fr=class extends dr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}},Ta=class{static decodeText(t){if(typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Ca=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=pf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=pf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};nh="\\[\\]\\.:\\/",G_=new RegExp("["+nh+"]","g"),ih="[^"+nh+"]",W_="[^"+nh.replace("\\.","")+"]",X_=/((?:WC+[\/:])*)/.source.replace("WC",ih),q_=/(WCOD+)?/.source.replace("WCOD",W_),Y_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ih),Z_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ih),$_=new RegExp("^"+X_+q_+Y_+Z_+"$"),j_=["material","materials","bones","map"],Oc=class{constructor(t,e,n){let i=n||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ge=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(G_,"")}static parseTrackName(t){let e=$_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);j_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=Oc;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];RS=new Float32Array(1),Ra=class{constructor(t,e,n=0,i=1/0){this.ray=new nr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Or,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return zc(t,this,n,e),n.sort(mf),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)zc(t[i],this,n,e);return n.sort(mf),n}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160")});var Gf={};wm(Gf,{PAPER_DESIGNS:()=>gs,createPaper:()=>oh,preparePaperImages:()=>K_,updatePaperFrame:()=>qn});async function K_(){await Promise.all(gs.map(async s=>{let t=await Eu(new URL(s.image,document.baseURI).href);ee.disposed||rh.set(s.image,t)}))}function Vf(s,t){s.fillStyle="#eae8e1",s.fillRect(0,0,ni,Zi),s.strokeStyle="rgba(130, 150, 135, 0.3)",s.lineWidth=2;let e=64;s.beginPath();for(let n=e/2;n<=ni;n+=e)s.moveTo(n,0),s.lineTo(n,Zi);for(let n=e/2;n<=Zi;n+=e)s.moveTo(0,n),s.lineTo(ni,n);s.stroke(),s.fillStyle=kf,s.textBaseline="alphabetic",J_(s,t.title),s.fillStyle="#d9d7d0",s.fillRect(Ce.x,Ce.y,Ce.w,Ce.h),s.strokeStyle="#3a3a38",s.lineWidth=3,s.strokeRect(Ce.x,Ce.y,Ce.w,Ce.h),s.fillStyle=kf,s.font=`62px ${mr}`,s.fillText(t.url,ni*.11,Ce.y+Ce.h+95)}function J_(s,t){let e=ni*.78,n=ni*.11,i=170;for(s.font=`${i}px ${mr}`;s.measureText(t).width>e&&i>100;)i-=6,s.font=`${i}px ${mr}`;let r=t.split(" ");if(s.measureText(t).width<=e||r.length<2){for(;s.measureText(t).width>e&&i>60;)i-=6,s.font=`${i}px ${mr}`;s.fillText(t,n,Zi*.245);return}let o=null;for(let a=1;a<r.length;a++){let l=r.slice(0,a).join(" "),c=r.slice(a).join(" "),h=Math.max(s.measureText(l).width,s.measureText(c).width);(!o||h<o.width)&&(o={line1:l,line2:c,width:h})}for(i=120,s.font=`${i}px ${mr}`;Math.max(s.measureText(o.line1).width,s.measureText(o.line2).width)>e&&i>60;)i-=6,s.font=`${i}px ${mr}`;s.fillText(o.line1,n,Zi*.16),s.fillText(o.line2,n,Zi*.255)}function Hf(s){let{ctx:t,image:e}=s;if(!e.complete||!e.naturalWidth)return;let n=Math.max(Ce.w/e.naturalWidth,Ce.h/e.naturalHeight),i=e.naturalWidth*n,r=e.naturalHeight*n;t.save(),t.beginPath(),t.rect(Ce.x,Ce.y,Ce.w,Ce.h),t.clip(),t.drawImage(e,Ce.x+(Ce.w-i)/2,Ce.y+(Ce.h-r)/2,i,r),t.restore(),t.strokeStyle="#3a3a38",t.lineWidth=3,t.strokeRect(Ce.x,Ce.y,Ce.w,Ce.h),s.texture.needsUpdate=!0}function Q_(s){let t=s%gs.length;if(Kr[t])return Kr[t].material;let e=gs[t],n=document.createElement("canvas");n.width=ni,n.height=Zi;let i=n.getContext("2d");Vf(i,e);let r=new pa(n);r.colorSpace=Ee,r.rotation=Math.PI,r.center.set(.5,.5),r.repeat.set(1,-1);let o=new ps({map:r,roughness:.9,metalness:0,side:Gn}),a=rh.get(e.image);if(!a)throw new Error("Paper design was not loaded: "+e.image);let l={design:e,canvas:n,ctx:i,texture:r,material:o,image:a};return Hf(l),Kr[t]=l,o}function oh(s,t=0){let{vertexCount:e,indices:n,uvs:i,positions:r,normals:o}=s,a=new on,l=new Float32Array(e*3);for(let v=0;v<e*3;v++)l[v]=r[v];let c=new rn(l,3);c.setUsage(Jc),a.setAttribute("position",c);let h=new Float32Array(e*3);for(let v=0;v<e*3;v++)h[v]=o[v];let d=new rn(h,3);d.setUsage(Jc),a.setAttribute("normal",d);let u=new Float32Array(i.length);for(let v=0;v<i.length;v++)u[v]=i[v];a.setAttribute("uv",new rn(u,2));let f=new Uint16Array(n);return a.setIndex(new rn(f,1)),{mesh:new Fe(a,Q_(t)),positionAttr:c,normalAttr:d}}function qn(s,t,e){let{vertexCount:n,frameCount:i,positions:r,normals:o}=t,{positionAttr:a,normalAttr:l}=s,c=n*3,h=Math.floor(e),d=e-h,u=h*c,f=a.array,g=l.array;if(d<1e-6)for(let v=0;v<c;v++)f[v]=r[u+v],g[v]=o[u+v];else{let p=(h+1)%i*c,m=1-d;for(let x=0;x<c;x++)f[x]=r[u+x]*m+r[p+x]*d,g[x]=o[u+x]*m+o[p+x]*d}a.needsUpdate=!0,l.needsUpdate=!0,s.mesh.geometry.computeBoundingSphere(),s.mesh.geometry.computeBoundingBox()}var gs,ni,Zi,mr,kf,Ce,Kr,rh,ah=Ie(()=>{wo();xn();gs=[{title:"PAPER PROTOCOL",url:"https://paper-protocol.example",image:"data/paper-protocol.svg"},{title:"CRUMPLE LAB",url:"https://crumple-lab.example",image:"data/crumple-lab.svg"},{title:"FOLD & TOSS",url:"https://fold-toss.example",image:"data/fold-toss.svg"},{title:"ORIGAMI ENGINE",url:"https://origami-engine.example",image:"data/origami-engine.svg"},{title:"WASTEBASKET CLUB",url:"https://wastebasket.example",image:"data/wastebasket-club.svg"},{title:"GRID PAPER WORKS",url:"https://gridpaper.example",image:"data/grid-paper-works.svg"},{title:"THROWAWAY STUDIO",url:"https://throwaway.example",image:"data/throwaway-studio.svg"}],ni=1024,Zi=1400,mr='"Caveat", "Yomogi", "Comic Sans MS", cursive',kf="#1d1d1b",Ce={x:Math.round(ni*.11),y:Math.round(Zi*.33),w:Math.round(ni*.78),h:Math.round(ni*.78*9/16)},Kr=[],rh=new Map;ee.addCleanup(()=>{rh.clear(),Kr.length=0});document.fonts&&Promise.all([document.fonts.load('100px "Caveat"'),document.fonts.load('100px "Yomogi"',"\u4E00\u6B69\u306E\u5192\u967A")]).then(()=>{for(let s of Kr)s&&(Vf(s.ctx,s.design),Hf(s),s.texture.needsUpdate=!0)})});function Ww(s,t,e){e.vsub(s,ys);let n=ys.dot(t);return t.scale(n,Ba),Ba.vadd(s,Ba),e.distanceTo(Ba)}function PM(s,t,e){let n=null,i=s.length;for(let r=0;r!==i;r++){let o=s[r],a=TM;s[(r+1)%i].vsub(o,a);let l=CM;a.cross(t,l);let c=RM;e.vsub(o,c);let h=l.dot(c);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}function sp(s,t){s.push((t&4294901760)>>16,t&65535)}var ji,tw,S,ew,nw,Wf,Rn,Xf,qf,Va,Ha,an,iw,sw,rw,Nt,pe,Yf,ph,lh,ch,ow,aw,lw,mh,$i,ii,Ah,Th,Qt,cw,hw,uw,dw,fw,pw,mw,gw,vw,yw,xw,_w,ww,Mw,gh,bw,Sw,Ew,Aw,IS,vh,yr,rp,op,ap,lp,cp,hp,up,Ch,Fn,Zf,hh,Jr,uh,Tw,Cw,An,Yn,si,ri,$f,Ua,Rw,Pw,Iw,Lw,Nw,Dw,Fw,jf,Uw,Bw,Ow,zw,kw,Vw,Hw,Gw,ys,Ba,Ga,yh,Wa,no,Kf,Jf,Qf,tp,Oa,Xw,xh,qw,Yw,Zw,$w,jw,Kw,Jw,Qw,LS,NS,DS,FS,US,BS,OS,zS,Xa,tM,eM,xs,_s,kS,VS,HS,GS,WS,XS,qS,YS,ZS,$S,jS,KS,JS,QS,t1,e1,n1,i1,s1,r1,o1,a1,l1,c1,h1,u1,d1,f1,p1,m1,qa,g1,v1,y1,x1,_1,w1,M1,b1,S1,Ya,_i,E1,A1,T1,C1,R1,P1,I1,L1,N1,D1,F1,U1,B1,O1,z1,k1,V1,H1,G1,W1,X1,q1,Y1,Z1,_h,wh,nM,iM,sM,$1,Mh,bh,Ae,Sh,vs,gr,vr,rM,oM,aM,lM,cM,hM,uM,dM,fM,pM,mM,gM,vM,yM,xM,_M,wM,MM,bM,SM,EM,AM,za,ep,TM,CM,RM,ka,IM,LM,NM,DM,FM,UM,BM,OM,zM,kM,VM,HM,GM,WM,XM,qM,YM,ZM,$M,jM,KM,JM,QM,tb,eb,nb,ib,sb,np,rb,ob,ip,ab,lb,cb,hb,ub,db,Za,dh,Eh,$a,fh,Xe,fb,pb,Qr,mb,gb,vb,yb,wi,Mi,to,eo,bi,Si,dp=Ie(()=>{ji=class s{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){let t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){let t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){let e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new S);let e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new S);let n=this.elements,i=t.x,r=t.y,o=t.z;return e.x=n[0]*i+n[1]*r+n[2]*o,e.y=n[3]*i+n[4]*r+n[5]*o,e.z=n[6]*i+n[7]*r+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new s);let n=this.elements,i=t.elements,r=e.elements,o=n[0],a=n[1],l=n[2],c=n[3],h=n[4],d=n[5],u=n[6],f=n[7],g=n[8],v=i[0],p=i[1],m=i[2],x=i[3],y=i[4],M=i[5],P=i[6],T=i[7],R=i[8];return r[0]=o*v+a*x+l*P,r[1]=o*p+a*y+l*T,r[2]=o*m+a*M+l*R,r[3]=c*v+h*x+d*P,r[4]=c*p+h*y+d*T,r[5]=c*m+h*M+d*R,r[6]=u*v+f*x+g*P,r[7]=u*p+f*y+g*T,r[8]=u*m+f*M+g*R,e}scale(t,e){e===void 0&&(e=new s);let n=this.elements,i=e.elements;for(let r=0;r!==3;r++)i[3*r+0]=t.x*n[3*r+0],i[3*r+1]=t.y*n[3*r+1],i[3*r+2]=t.z*n[3*r+2];return e}solve(t,e){e===void 0&&(e=new S);let n=3,i=4,r=[],o,a;for(o=0;o<n*i;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+i*a]=this.elements[o+3*a];r[3]=t.x,r[7]=t.y,r[11]=t.z;let l=3,c=l,h,d=4,u;do{if(o=c-l,r[o+i*o]===0){for(a=o+1;a<c;a++)if(r[o+i*a]!==0){h=d;do u=d-h,r[u+i*o]+=r[u+i*a];while(--h);break}}if(r[o+i*o]!==0)for(a=o+1;a<c;a++){let f=r[o+i*a]/r[o+i*o];h=d;do u=d-h,r[u+i*a]=u<=o?0:r[u+i*a]-r[u+i*o]*f;while(--h)}}while(--l);if(e.z=r[2*i+3]/r[2*i+2],e.y=(r[1*i+3]-r[1*i+2]*e.z)/r[1*i+1],e.x=(r[0*i+3]-r[0*i+2]*e.z-r[0*i+1]*e.y)/r[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new s);let e=3,n=6,i=tw,r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)i[r+n*o]=this.elements[r+3*o];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3,l=a,c,h=n,d;do{if(r=l-a,i[r+n*r]===0){for(o=r+1;o<l;o++)if(i[r+n*o]!==0){c=h;do d=h-c,i[d+n*r]+=i[d+n*o];while(--c);break}}if(i[r+n*r]!==0)for(o=r+1;o<l;o++){let u=i[r+n*o]/i[r+n*r];c=h;do d=h-c,i[d+n*o]=d<=r?0:i[d+n*o]-i[d+n*r]*u;while(--c)}}while(--a);r=2;do{o=r-1;do{let u=i[r+n*o]/i[r+n*r];c=n;do d=n-c,i[d+n*o]=i[d+n*o]-i[d+n*r]*u;while(--c)}while(o--)}while(--r);r=2;do{let u=1/i[r+n*r];c=n;do d=n-c,i[d+n*r]=i[d+n*r]*u;while(--c)}while(r--);r=2;do{o=2;do{if(d=i[e+o+n*r],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,o,d)}while(o--)}while(r--);return t}setRotationFromQuaternion(t){let e=t.x,n=t.y,i=t.z,r=t.w,o=e+e,a=n+n,l=i+i,c=e*o,h=e*a,d=e*l,u=n*a,f=n*l,g=i*l,v=r*o,p=r*a,m=r*l,x=this.elements;return x[0]=1-(u+g),x[1]=h-m,x[2]=d+p,x[3]=h+m,x[4]=1-(c+g),x[5]=f-v,x[6]=d-p,x[7]=f+v,x[8]=1-(c+u),this}transpose(t){t===void 0&&(t=new s);let e=this.elements,n=t.elements,i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}},tw=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],S=class s{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new s);let n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,l=this.z;return e.x=a*r-l*i,e.y=l*n-o*r,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new s(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new s(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new ji([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){let t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){let r=1/i;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new s);let e=this.x,n=this.y,i=this.z,r=Math.sqrt(e*e+n*n+i*i);return r>0?(r=1/r,t.x=e*r,t.y=n*r,t.z=i*r):(t.x=1,t.y=0,t.z=0),t}length(){let t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return Math.sqrt((r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return(r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new s);let n=this.x,i=this.y,r=this.z;return e.x=t*n,e.y=t*i,e.z=t*r,e}vmul(t,e){return e===void 0&&(e=new s),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new s),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new s),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){let n=this.length();if(n>0){let i=ew,r=1/n;i.set(this.x*r,this.y*r,this.z*r);let o=nw;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){let i=this.x,r=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=r+(t.y-r)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Wf),Wf.almostEquals(t,e)}clone(){return new s(this.x,this.y,this.z)}};S.ZERO=new S(0,0,0);S.UNIT_X=new S(1,0,0);S.UNIT_Y=new S(0,1,0);S.UNIT_Z=new S(0,0,1);ew=new S,nw=new S,Wf=new S,Rn=class s{constructor(t){t===void 0&&(t={}),this.lowerBound=new S,this.upperBound=new S,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){let r=this.lowerBound,o=this.upperBound,a=n;r.copy(t[0]),a&&a.vmult(r,r),o.copy(r);for(let l=1;l<t.length;l++){let c=t[l];a&&(a.vmult(c,Xf),c=Xf),c.x>o.x&&(o.x=c.x),c.x<r.x&&(r.x=c.x),c.y>o.y&&(o.y=c.y),c.y<r.y&&(r.y=c.y),c.z>o.z&&(o.z=c.z),c.z<r.z&&(r.z=c.z)}return e&&(e.vadd(r,r),e.vadd(o,o)),i&&(r.x-=i,r.y-=i,r.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new s().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound,o=i.x<=n.x&&n.x<=r.x||e.x<=r.x&&r.x<=n.x,a=i.y<=n.y&&n.y<=r.y||e.y<=r.y&&r.y<=n.y,l=i.z<=n.z&&n.z<=r.z||e.z<=r.z&&r.z<=n.z;return o&&a&&l}volume(){let t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound;return e.x<=i.x&&n.x>=r.x&&e.y<=i.y&&n.y>=r.y&&e.z<=i.z&&n.z>=r.z}getCorners(t,e,n,i,r,o,a,l){let c=this.lowerBound,h=this.upperBound;t.copy(c),e.set(h.x,c.y,c.z),n.set(h.x,h.y,c.z),i.set(c.x,h.y,h.z),r.set(h.x,c.y,h.z),o.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(t,e){let n=qf,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){let f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){let n=qf,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){let f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){let{direction:e,from:n}=t,i=1/e.x,r=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,l=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*r,h=(this.upperBound.y-n.y)*r,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(d,u));return!(g<0||f>g)}},Xf=new S,qf=[new S,new S,new S,new S,new S,new S,new S,new S],Va=class{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){let r=i;i=n,n=r}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:r}=e;if(r>i){let o=r;r=i,i=o}this.matrix[(i*(i+1)>>1)+r-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}},Ha=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;let n=this._listeners;if(n[t]===void 0)return this;let i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;let n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,r=n.length;i<r;i++)n[i].call(this,t)}return this}},an=class s{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){let n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new S),this.normalize();let e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){let n=iw,i=sw;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{let n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new s);let n=this.x,i=this.y,r=this.z,o=this.w,a=t.x,l=t.y,c=t.z,h=t.w;return e.x=n*h+o*a+i*c-r*l,e.y=i*h+o*l+r*a-n*c,e.z=r*h+o*c+n*l-i*a,e.w=o*h-n*a-i*l-r*c,e}inverse(t){t===void 0&&(t=new s);let e=this.x,n=this.y,i=this.z,r=this.w;this.conjugate(t);let o=1/(e*e+n*n+i*i+r*r);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new s),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){let t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new S);let n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,l=this.z,c=this.w,h=c*n+a*r-l*i,d=c*i+l*n-o*r,u=c*r+o*i-a*n,f=-o*n-a*i-l*r;return e.x=h*c+f*-o+d*-l-u*-a,e.y=d*c+f*-a+u*-o-h*-l,e.z=u*c+f*-l+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,r,o=this.x,a=this.y,l=this.z,c=this.w;switch(e){case"YZX":let h=o*a+l*c;if(h>.499&&(n=2*Math.atan2(o,c),i=Math.PI/2,r=0),h<-.499&&(n=-2*Math.atan2(o,c),i=-Math.PI/2,r=0),n===void 0){let d=o*o,u=a*a,f=l*l;n=Math.atan2(2*a*c-2*o*l,1-2*u-2*f),i=Math.asin(2*h),r=Math.atan2(2*o*c-2*a*l,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=r}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");let r=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),l=Math.sin(t/2),c=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):i==="YXZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):i==="ZXY"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):i==="ZYX"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):i==="YZX"?(this.x=l*o*a+r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a-l*c*h):i==="XZY"&&(this.x=l*o*a-r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a+l*c*h),this}clone(){return new s(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new s);let i=this.x,r=this.y,o=this.z,a=this.w,l=t.x,c=t.y,h=t.z,d=t.w,u,f,g,v,p;return f=i*l+r*c+o*h+a*d,f<0&&(f=-f,l=-l,c=-c,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),v=Math.sin((1-e)*u)/g,p=Math.sin(e*u)/g):(v=1-e,p=e),n.x=v*i+p*l,n.y=v*r+p*c,n.z=v*o+p*h,n.w=v*a+p*d,n}integrate(t,e,n,i){i===void 0&&(i=new s);let r=t.x*n.x,o=t.y*n.y,a=t.z*n.z,l=this.x,c=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(r*d+o*h-a*c),i.y+=u*(o*d+a*l-r*h),i.z+=u*(a*d+r*c-o*l),i.w+=u*(-r*l-o*c-a*h),i}},iw=new S,sw=new S,rw={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256},Nt=class s{constructor(t){t===void 0&&(t={}),this.id=s.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};Nt.idCounter=0;Nt.types=rw;pe=class s{constructor(t){t===void 0&&(t={}),this.position=new S,this.quaternion=new an,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return s.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return s.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),n.vsub(t,i),e.conjugate(Yf),Yf.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new S),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new S),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),e.w*=-1,e.vmult(n,i),e.w*=-1,i}},Yf=new an,ph=class s extends Nt{constructor(t){t===void 0&&(t={});let{vertices:e=[],faces:n=[],normals:i=[],axes:r,boundingSphereRadius:o}=t;super({type:Nt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){let t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;let i=new S;for(let r=0;r!==t.length;r++){let o=t[r],a=o.length;for(let l=0;l!==a;l++){let c=(l+1)%a;e[o[l]].vsub(e[o[c]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);let e=this.faceNormals[t]||new S;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;let n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){let n=this.faces[t],i=this.vertices[n[0]],r=this.vertices[n[1]],o=this.vertices[n[2]];s.computeNormal(i,r,o,e)}static computeNormal(t,e,n,i){let r=new S,o=new S;e.vsub(t,o),n.vsub(e,r),r.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,r,o,a,l,c){let h=new S,d=-1,u=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),r.vmult(h,h);let v=h.dot(o);v>u&&(u=v,d=g)}let f=[];for(let g=0;g<n.faces[d].length;g++){let v=n.vertices[n.faces[d][g]],p=new S;p.copy(v),r.vmult(p,p),i.vadd(p,p),f.push(p)}d>=0&&this.clipFaceAgainstHull(o,t,e,f,a,l,c)}findSeparatingAxis(t,e,n,i,r,o,a,l){let c=new S,h=new S,d=new S,u=new S,f=new S,g=new S,v=Number.MAX_VALUE,p=this;if(p.uniqueAxes)for(let m=0;m!==p.uniqueAxes.length;m++){n.vmult(p.uniqueAxes[m],c);let x=p.testSepAxis(c,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(c))}else{let m=a?a.length:p.faces.length;for(let x=0;x<m;x++){let y=a?a[x]:x;c.copy(p.faceNormals[y]),n.vmult(c,c);let M=p.testSepAxis(c,t,e,n,i,r);if(M===!1)return!1;M<v&&(v=M,o.copy(c))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){r.vmult(t.uniqueAxes[m],h);let x=p.testSepAxis(h,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(h))}else{let m=l?l.length:t.faces.length;for(let x=0;x<m;x++){let y=l?l[x]:x;h.copy(t.faceNormals[y]),r.vmult(h,h);let M=p.testSepAxis(h,t,e,n,i,r);if(M===!1)return!1;M<v&&(v=M,o.copy(h))}}for(let m=0;m!==p.uniqueEdges.length;m++){n.vmult(p.uniqueEdges[m],u);for(let x=0;x!==t.uniqueEdges.length;x++)if(r.vmult(t.uniqueEdges[x],f),u.cross(f,g),!g.almostZero()){g.normalize();let y=p.testSepAxis(g,t,e,n,i,r);if(y===!1)return!1;y<v&&(v=y,o.copy(g))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,r,o){let a=this;s.project(a,t,n,i,lh),s.project(e,t,r,o,ch);let l=lh[0],c=lh[1],h=ch[0],d=ch[1];if(l<d||h<c)return!1;let u=l-d,f=h-c;return u<f?u:f}calculateLocalInertia(t,e){let n=new S,i=new S;this.computeLocalAABB(i,n);let r=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*r*2*r+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(t){let e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,r,o,a){let l=new S,c=new S,h=new S,d=new S,u=new S,f=new S,g=new S,v=new S,p=this,m=[],x=i,y=m,M=-1,P=Number.MAX_VALUE;for(let E=0;E<p.faces.length;E++){l.copy(p.faceNormals[E]),n.vmult(l,l);let V=l.dot(t);V<P&&(P=V,M=E)}if(M<0)return;let T=p.faces[M];T.connectedFaces=[];for(let E=0;E<p.faces.length;E++)for(let V=0;V<p.faces[E].length;V++)T.indexOf(p.faces[E][V])!==-1&&E!==M&&T.connectedFaces.indexOf(E)===-1&&T.connectedFaces.push(E);let R=T.length;for(let E=0;E<R;E++){let V=p.vertices[T[E]],q=p.vertices[T[(E+1)%R]];V.vsub(q,c),h.copy(c),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[M]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(V),n.vmult(f,f),e.vadd(f,f);let W=T.connectedFaces[E];g.copy(this.faceNormals[W]);let I=this.getPlaneConstantOfFace(W);v.copy(g),n.vmult(v,v);let F=I-v.dot(e);for(this.clipFaceAgainstPlane(x,y,v,F);x.length;)x.shift();for(;y.length;)x.push(y.shift())}g.copy(this.faceNormals[M]);let G=this.getPlaneConstantOfFace(M);v.copy(g),n.vmult(v,v);let b=G-v.dot(e);for(let E=0;E<x.length;E++){let V=v.dot(x[E])+b;if(V<=r&&(console.log(`clamped: depth=${V} to minDist=${r}`),V=r),V<=o){let q=x[E];if(V<=1e-6){let W={point:q,normal:v,depth:V};a.push(W)}}}}clipFaceAgainstPlane(t,e,n,i){let r,o,a=t.length;if(a<2)return e;let l=t[t.length-1],c=t[0];r=n.dot(l)+i;for(let h=0;h<a;h++){if(c=t[h],o=n.dot(c)+i,r<0)if(o<0){let d=new S;d.copy(c),e.push(d)}else{let d=new S;l.lerp(c,r/(r-o),d),e.push(d)}else if(o<0){let d=new S;l.lerp(c,r/(r-o),d),e.push(d),e.push(c)}l=c,r=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new S);let n=this.vertices,i=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)e.vmult(n[r],i[r]),t.vadd(i[r],i[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){let n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){let r=n[i];r.x<t.x?t.x=r.x:r.x>e.x&&(e.x=r.x),r.y<t.y?t.y=r.y:r.y>e.y&&(e.y=r.y),r.z<t.z?t.z=r.z:r.z>e.z&&(e.z=r.z)}}computeWorldFaceNormals(t){let e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new S);let n=this.faceNormals,i=this.worldFaceNormals;for(let r=0;r!==e;r++)t.vmult(n[r],i[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0,e=this.vertices;for(let n=0;n!==e.length;n++){let i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){let r=this.vertices,o,a,l,c,h,d,u=new S;for(let f=0;f<r.length;f++){u.copy(r[f]),e.vmult(u,u),t.vadd(u,u);let g=u;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(o,a,l),i.set(c,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new S);let e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){let n=this.vertices.length,i=this.vertices;if(e){for(let r=0;r<n;r++){let o=i[r];e.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){let o=this.faceNormals[r];e.vmult(o,o)}}if(t)for(let r=0;r<n;r++){let o=i[r];o.vadd(t,o)}}pointIsInside(t){let e=this.vertices,n=this.faces,i=this.faceNormals,r=null,o=new S;this.getAveragePointLocal(o);for(let a=0;a<this.faces.length;a++){let l=i[a],c=e[n[a][0]],h=new S;t.vsub(c,h);let d=l.dot(h),u=new S;o.vsub(c,u);let f=l.dot(u);if(d<0&&f>0||d>0&&f<0)return!1}return r?1:-1}static project(t,e,n,i,r){let o=t.vertices.length,a=aw,l=0,c=0,h=lw,d=t.vertices;h.setZero(),pe.vectorToLocalFrame(n,i,e,a),pe.pointToLocalFrame(n,i,h,h);let u=h.dot(a);c=l=d[0].dot(a);for(let f=1;f<o;f++){let g=d[f].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=u,l-=u,c>l){let f=c;c=l,l=f}r[0]=l,r[1]=c}},lh=[],ch=[],ow=new S,aw=new S,lw=new S,mh=class s extends Nt{constructor(t){super({type:Nt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){let t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=S,r=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],l=new ph({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new S),s.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){let i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){let n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let r=0;r!==n.length;r++)e.vmult(n[r],n[r]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){let i=this.halfExtents,r=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<r.length;o++)$i.set(r[o][0],r[o][1],r[o][2]),e.vmult($i,$i),t.vadd($i,$i),n($i.x,$i.y,$i.z)}calculateWorldAABB(t,e,n,i){let r=this.halfExtents;ii[0].set(r.x,r.y,r.z),ii[1].set(-r.x,r.y,r.z),ii[2].set(-r.x,-r.y,r.z),ii[3].set(-r.x,-r.y,-r.z),ii[4].set(r.x,-r.y,-r.z),ii[5].set(r.x,r.y,-r.z),ii[6].set(-r.x,r.y,-r.z),ii[7].set(r.x,-r.y,r.z);let o=ii[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){let l=ii[a];e.vmult(l,l),t.vadd(l,l);let c=l.x,h=l.y,d=l.z;c>i.x&&(i.x=c),h>i.y&&(i.y=h),d>i.z&&(i.z=d),c<n.x&&(n.x=c),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}},$i=new S,ii=[new S,new S,new S,new S,new S,new S,new S,new S],Ah={DYNAMIC:1,STATIC:2,KINEMATIC:4},Th={AWAKE:0,SLEEPY:1,SLEEPING:2},Qt=class s extends Ha{constructor(t){t===void 0&&(t={}),super(),this.id=s.idCounter++,this.index=-1,this.world=null,this.vlambda=new S,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new S,this.previousPosition=new S,this.interpolatedPosition=new S,this.initPosition=new S,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new S,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new S,this.force=new S;let e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?s.STATIC:s.DYNAMIC,typeof t.type==typeof s.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=s.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new S,this.quaternion=new an,this.initQuaternion=new an,this.previousQuaternion=new an,this.interpolatedQuaternion=new an,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new S,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new S,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new S,this.invInertia=new S,this.invInertiaWorld=new ji,this.invMassSolve=0,this.invInertiaSolve=new S,this.invInertiaWorldSolve=new ji,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new S(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new S(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Rn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new S,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){let t=this.sleepState;this.sleepState=s.AWAKE,this.wakeUpAfterNarrowphase=!1,t===s.SLEEPING&&this.dispatchEvent(s.wakeupEvent)}sleep(){this.sleepState=s.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){let e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===s.AWAKE&&n<i?(this.sleepState=s.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(s.sleepyEvent)):e===s.SLEEPY&&n>i?this.wakeUp():e===s.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(s.sleepEvent))}}updateSolveMassProperties(){this.sleepState===s.SLEEPING||this.type===s.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new S),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new S),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}addShape(t,e,n){let i=new S,r=new an;return e&&i.copy(e),n&&r.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){let e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){let t=this.shapes,e=this.shapeOffsets,n=t.length,i=0;for(let r=0;r!==n;r++){let o=t[r];o.updateBoundingSphereRadius();let a=e[r].length(),l=o.boundingSphereRadius;a+l>i&&(i=a+l)}this.boundingRadius=i}updateAABB(){let t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,r=cw,o=hw,a=this.quaternion,l=this.aabb,c=uw;for(let h=0;h!==i;h++){let d=t[h];a.vmult(e[h],r),r.vadd(this.position,r),a.mult(n[h],o),d.calculateWorldAABB(r,o,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){let e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){let n=dw,i=fw;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;this.sleepState===s.SLEEPING&&this.wakeUp();let n=mw;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;let n=gw,i=vw;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===s.DYNAMIC&&(this.sleepState===s.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;this.sleepState===s.SLEEPING&&this.wakeUp();let n=e,i=yw;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);let r=xw;n.cross(t,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new S),this.type!==s.DYNAMIC)return;let n=_w,i=ww;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){let t=Mw;this.invMass=this.mass>0?1/this.mass:0;let e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),mh.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){let n=new S;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===s.DYNAMIC||this.type===s.KINEMATIC)||this.sleepState===s.SLEEPING)return;let i=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;let g=d.elements,v=this.angularFactor,p=l.x*v.x,m=l.y*v.y,x=l.z*v.z;r.x+=t*(g[0]*p+g[1]*m+g[2]*x),r.y+=t*(g[3]*p+g[4]*m+g[5]*x),r.z+=t*(g[6]*p+g[7]*m+g[8]*x),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,c.integrate(this.angularVelocity,t,this.angularFactor,c),e&&(n?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}};Qt.idCounter=0;Qt.COLLIDE_EVENT_NAME="collide";Qt.DYNAMIC=Ah.DYNAMIC;Qt.STATIC=Ah.STATIC;Qt.KINEMATIC=Ah.KINEMATIC;Qt.AWAKE=Th.AWAKE;Qt.SLEEPY=Th.SLEEPY;Qt.SLEEPING=Th.SLEEPING;Qt.wakeupEvent={type:"wakeup"};Qt.sleepyEvent={type:"sleepy"};Qt.sleepEvent={type:"sleep"};cw=new S,hw=new an,uw=new Rn,dw=new ji,fw=new ji,pw=new ji,mw=new S,gw=new S,vw=new S,yw=new S,xw=new S,_w=new S,ww=new S,Mw=new S,gh=class{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&Qt.STATIC)!==0||t.sleepState===Qt.SLEEPING)&&((e.type&Qt.STATIC)!==0||e.sleepState===Qt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){let r=bw;e.position.vsub(t.position,r);let o=(t.boundingRadius+e.boundingRadius)**2;r.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){let n=Sw,i=Ew,r=Aw,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],r[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){let l=i[a].id,c=r[a].id,h=l<c?`${l},${c}`:`${c},${l}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){let l=n.keys.pop(),c=n[l];t.push(i[c]),e.push(r[c]),delete n[l]}}setWorld(t){}static boundingSphereCheck(t,e){let n=new S;t.position.vsub(e.position,n);let i=t.shapes[0],r=e.shapes[0];return Math.pow(i.boundingSphereRadius+r.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},bw=new S;new S;new an;new S;Sw={keys:[]},Ew=[],Aw=[];new S;IS=new S;new S;vh=class extends gh{constructor(){super()}collisionPairs(t,e,n){let i=t.bodies,r=i.length,o,a;for(let l=0;l!==r;l++)for(let c=0;c!==l;c++)o=i[l],a=i[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){let r=t.bodies[i];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(e)&&n.push(r)}return n}},yr=class{constructor(){this.rayFromWorld=new S,this.rayToWorld=new S,this.hitNormalWorld=new S,this.hitPointWorld=new S,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,r,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=r,this.body=o,this.distance=a}},Ch={CLOSEST:1,ANY:2,ALL:4};rp=Nt.types.SPHERE;op=Nt.types.PLANE;ap=Nt.types.BOX;lp=Nt.types.CYLINDER;cp=Nt.types.CONVEXPOLYHEDRON;hp=Nt.types.HEIGHTFIELD;up=Nt.types.TRIMESH;Fn=class s{get[rp](){return this._intersectSphere}get[op](){return this._intersectPlane}get[ap](){return this._intersectBox}get[lp](){return this._intersectConvex}get[cp](){return this._intersectConvex}get[hp](){return this._intersectHeightfield}get[up](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new S),e===void 0&&(e=new S),this.from=t.clone(),this.to=e.clone(),this.direction=new S,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=s.ANY,this.result=new yr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||s.ANY,this.result=e.result||new yr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Zf),hh.length=0,t.broadphase.aabbQuery(t,Zf,hh),this.intersectBodies(hh),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());let n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;let i=Tw,r=Cw;for(let o=0,a=t.shapes.length;o<a;o++){let l=t.shapes[o];if(!(n&&!l.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],r),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(l,r,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){let r=this.from;if(Ww(r,this.direction,n)>t.boundingSphereRadius)return;let a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,r){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,r)}_intersectPlane(t,e,n,i,r){let o=this.from,a=this.to,l=this.direction,c=new S(0,0,1);e.vmult(c,c);let h=new S;o.vsub(n,h);let d=h.dot(c);a.vsub(n,h);let u=h.dot(c);if(d*u>0||o.distanceTo(a)<d)return;let f=c.dot(l);if(Math.abs(f)<this.precision)return;let g=new S,v=new S,p=new S;o.vsub(n,g);let m=-c.dot(g)/f;l.scale(m,v),o.vadd(v,p),this.reportIntersection(c,p,r,i,-1)}getAABB(t){let{lowerBound:e,upperBound:n}=t,i=this.to,r=this.from;e.x=Math.min(i.x,r.x),e.y=Math.min(i.y,r.y),e.z=Math.min(i.z,r.z),n.x=Math.max(i.x,r.x),n.y=Math.max(i.y,r.y),n.z=Math.max(i.z,r.z)}_intersectHeightfield(t,e,n,i,r){t.data,t.elementSize;let o=Rw;o.from.copy(this.from),o.to.copy(this.to),pe.pointToLocalFrame(n,e,o.from,o.from),pe.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();let a=Pw,l,c,h,d;l=c=0,h=d=t.data.length-1;let u=new Rn;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=l;f<h;f++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(f,g,!1),pe.pointToWorldFrame(n,e,t.pillarOffset,Ua),this._intersectConvex(t.pillarConvex,e,Ua,i,r,$f),this.result.shouldStop)return;t.getConvexTrianglePillar(f,g,!0),pe.pointToWorldFrame(n,e,t.pillarOffset,Ua),this._intersectConvex(t.pillarConvex,e,Ua,i,r,$f)}}}_intersectSphere(t,e,n,i,r){let o=this.from,a=this.to,l=t.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-l**2,u=h**2-4*c*d,f=Iw,g=Lw;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1);else{let v=(-h-Math.sqrt(u))/(2*c),p=(-h+Math.sqrt(u))/(2*c);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(o.lerp(a,p,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1))}}_intersectConvex(t,e,n,i,r,o){let a=Nw,l=jf,c=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,g=this.from,v=this.to,p=g.distanceTo(v),m=c?c.length:h.length,x=this.result;for(let y=0;!x.shouldStop&&y<m;y++){let M=c?c[y]:y,P=h[M],T=u[M],R=e,G=n;l.copy(d[P[0]]),R.vmult(l,l),l.vadd(G,l),l.vsub(g,l),R.vmult(T,a);let b=f.dot(a);if(Math.abs(b)<this.precision)continue;let E=a.dot(l)/b;if(!(E<0)){f.scale(E,An),An.vadd(g,An),Yn.copy(d[P[0]]),R.vmult(Yn,Yn),G.vadd(Yn,Yn);for(let V=1;!x.shouldStop&&V<P.length-1;V++){si.copy(d[P[V]]),ri.copy(d[P[V+1]]),R.vmult(si,si),R.vmult(ri,ri),G.vadd(si,si),G.vadd(ri,ri);let q=An.distanceTo(g);!(s.pointInTriangle(An,Yn,si,ri)||s.pointInTriangle(An,si,Yn,ri))||q>p||this.reportIntersection(a,An,r,i,M)}}}}_intersectTrimesh(t,e,n,i,r,o){let a=Uw,l=Hw,c=Gw,h=jf,d=Bw,u=Ow,f=zw,g=Vw,v=kw,p=t.indices;t.vertices;let m=this.from,x=this.to,y=this.direction;c.position.copy(n),c.quaternion.copy(e),pe.vectorToLocalFrame(n,e,y,d),pe.pointToLocalFrame(n,e,m,u),pe.pointToLocalFrame(n,e,x,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();let M=u.distanceSquared(f);t.tree.rayQuery(this,c,l);for(let P=0,T=l.length;!this.result.shouldStop&&P!==T;P++){let R=l[P];t.getNormal(R,a),t.getVertex(p[R*3],Yn),Yn.vsub(u,h);let G=d.dot(a),b=a.dot(h)/G;if(b<0)continue;d.scale(b,An),An.vadd(u,An),t.getVertex(p[R*3+1],si),t.getVertex(p[R*3+2],ri);let E=An.distanceSquared(u);!(s.pointInTriangle(An,si,Yn,ri)||s.pointInTriangle(An,Yn,si,ri))||E>M||(pe.vectorToWorldFrame(e,a,v),pe.pointToWorldFrame(n,e,An,g),this.reportIntersection(v,g,r,i,R))}l.length=0}reportIntersection(t,e,n,i,r){let o=this.from,a=this.to,l=o.distanceTo(e),c=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(c.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case s.ALL:this.hasHit=!0,c.set(o,a,t,e,n,i,l),c.hasHit=!0,this.callback(c);break;case s.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l));break;case s.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l),c.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ys),n.vsub(e,Jr),t.vsub(e,uh);let r=ys.dot(ys),o=ys.dot(Jr),a=ys.dot(uh),l=Jr.dot(Jr),c=Jr.dot(uh),h,d;return(h=l*a-o*c)>=0&&(d=r*c-o*a)>=0&&h+d<r*l-o*o}};Fn.CLOSEST=Ch.CLOSEST;Fn.ANY=Ch.ANY;Fn.ALL=Ch.ALL;Zf=new Rn,hh=[],Jr=new S,uh=new S,Tw=new S,Cw=new an,An=new S,Yn=new S,si=new S,ri=new S;new S;new yr;$f={faceList:[0]},Ua=new S,Rw=new Fn,Pw=[],Iw=new S,Lw=new S,Nw=new S,Dw=new S,Fw=new S,jf=new S,Uw=new S,Bw=new S,Ow=new S,zw=new S,kw=new S,Vw=new S;new Rn;Hw=[],Gw=new pe,ys=new S,Ba=new S;Ga=class{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}},yh=class s{constructor(t,e,n){n===void 0&&(n={}),n=Ga.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=s.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}};yh.idCounter=0;Wa=class{constructor(){this.spatial=new S,this.rotational=new S}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}},no=class s{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=s.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Wa,this.jacobianElementB=new Wa,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){let i=e,r=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*r*(1+4*i))}computeB(t,e,n){let i=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*t-i*e-o*n}computeGq(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.position,o=i.position;return t.spatial.dot(r)+e.spatial.dot(o)}computeGW(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.velocity,o=i.velocity,a=n.angularVelocity,l=i.angularVelocity;return t.multiplyVectors(r,a)+e.multiplyVectors(o,l)}computeGWlambda(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.vlambda,o=i.vlambda,a=n.wlambda,l=i.wlambda;return t.multiplyVectors(r,a)+e.multiplyVectors(o,l)}computeGiMf(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.force,o=n.torque,a=i.force,l=i.torque,c=n.invMassSolve,h=i.invMassSolve;return r.scale(c,Kf),a.scale(h,Jf),n.invInertiaWorldSolve.vmult(o,Qf),i.invInertiaWorldSolve.vmult(l,tp),t.multiplyVectors(Kf,Qf)+e.multiplyVectors(Jf,tp)}computeGiMGt(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,l=i.invInertiaWorldSolve,c=r+o;return a.vmult(t.rotational,Oa),c+=Oa.dot(t.rotational),l.vmult(e.rotational,Oa),c+=Oa.dot(e.rotational),c}addToWlambda(t){let e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,r=this.bj,o=Xw;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),r.vlambda.addScaledVector(r.invMassSolve*t,n.spatial,r.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),r.invInertiaWorldSolve.vmult(n.rotational,o),r.wlambda.addScaledVector(t,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}};no.idCounter=0;Kf=new S,Jf=new S,Qf=new S,tp=new S,Oa=new S,Xw=new S,xh=class extends no{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new S,this.rj=new S,this.ni=new S}computeB(t){let e=this.a,n=this.b,i=this.bi,r=this.bj,o=this.ri,a=this.rj,l=qw,c=Yw,h=i.velocity,d=i.angularVelocity;i.force,i.torque;let u=r.velocity,f=r.angularVelocity;r.force,r.torque;let g=Zw,v=this.jacobianElementA,p=this.jacobianElementB,m=this.ni;o.cross(m,l),a.cross(m,c),m.negate(v.spatial),l.negate(v.rotational),p.spatial.copy(m),p.rotational.copy(c),g.copy(r.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);let x=m.dot(g),y=this.restitution+1,M=y*u.dot(m)-y*h.dot(m)+f.dot(c)-d.dot(l),P=this.computeGiMf();return-x*e-M*n-t*P}getImpactVelocityAlongNormal(){let t=$w,e=jw,n=Kw,i=Jw,r=Qw;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,r),this.ni.dot(r)}},qw=new S,Yw=new S,Zw=new S,$w=new S,jw=new S,Kw=new S,Jw=new S,Qw=new S,LS=new S,NS=new S,DS=new S,FS=new S;new S;new S;US=new S,BS=new S,OS=new S,zS=new S,Xa=class extends no{constructor(t,e,n){super(t,e,-n,n),this.ri=new S,this.rj=new S,this.t=new S}computeB(t){this.a;let e=this.b;this.bi,this.bj;let n=this.ri,i=this.rj,r=tM,o=eM,a=this.t;n.cross(a,r),i.cross(a,o);let l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),r.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);let h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}},tM=new S,eM=new S,xs=class s{constructor(t,e,n){n=Ga.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=s.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}};xs.idCounter=0;_s=class s{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=s.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}};_s.idCounter=0;kS=new S,VS=new S,HS=new S,GS=new S,WS=new S,XS=new S,qS=new S,YS=new S,ZS=new S,$S=new S,jS=new S,KS=new S,JS=new S;new S;new S;new S;QS=new S,t1=new S,e1=new S;new Fn;new S;n1=new S,i1=new S,s1=[new S(1,0,0),new S(0,1,0),new S(0,0,1)],r1=new S,o1=new S,a1=new S,l1=new S,c1=new S,h1=new S,u1=new S,d1=new S,f1=new S,p1=new S,m1=new S,qa=class extends Nt{constructor(t){if(super({type:Nt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new S);let n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){let r=this.radius,o=["x","y","z"];for(let a=0;a<o.length;a++){let l=o[a];n[l]=t[l]-r,i[l]=t[l]+r}}},g1=new S,v1=new S,y1=new S,x1=new S,_1=new S,w1=new S,M1=new S,b1=new S,S1=new S,Ya=class extends Nt{constructor(){super({type:Nt.types.PLANE}),this.worldNormal=new S,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){let e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new S),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){_i.set(0,0,1),e.vmult(_i,_i);let r=Number.MAX_VALUE;n.set(-r,-r,-r),i.set(r,r,r),_i.x===1?i.x=t.x:_i.x===-1&&(n.x=t.x),_i.y===1?i.y=t.y:_i.y===-1&&(n.y=t.y),_i.z===1?i.z=t.z:_i.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}},_i=new S,E1=new S,A1=new S,T1=new S,C1=new S,R1=new S,P1=new S,I1=new S,L1=new S,N1=new S,D1=new S,F1=new Rn,U1=new S,B1=new Rn,O1=new S,z1=new S,k1=new S,V1=new S,H1=new S,G1=new S,W1=new S,X1=new Rn,q1=new S,Y1=new pe,Z1=new Rn,_h=class{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){let e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}},wh=class extends _h{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0,i=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=e.bodies,c=l.length,h=t,d,u,f,g,v,p;if(a!==0)for(let M=0;M!==c;M++)l[M].updateSolveMassProperties();let m=iM,x=sM,y=nM;m.length=a,x.length=a,y.length=a;for(let M=0;M!==a;M++){let P=o[M];y[M]=0,x[M]=P.computeB(h),m[M]=1/P.computeC()}if(a!==0){for(let T=0;T!==c;T++){let R=l[T],G=R.vlambda,b=R.wlambda;G.set(0,0,0),b.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let T=0;T!==a;T++){let R=o[T];d=x[T],u=m[T],p=y[T],v=R.computeGWlambda(),f=u*(d-v-R.eps*p),p+f<R.minForce?f=R.minForce-p:p+f>R.maxForce&&(f=R.maxForce-p),y[T]+=f,g+=f>0?f:-f,R.addToWlambda(f)}if(g*g<r)break}for(let T=0;T!==c;T++){let R=l[T],G=R.velocity,b=R.angularVelocity;R.vlambda.vmul(R.linearFactor,R.vlambda),G.vadd(R.vlambda,G),R.wlambda.vmul(R.angularFactor,R.wlambda),b.vadd(R.wlambda,b)}let M=o.length,P=1/h;for(;M--;)o[M].multiplier=y[M]*P}return n}},nM=[],iM=[],sM=[],$1=Qt.STATIC,Mh=class{constructor(){this.objects=[],this.type=Object}release(){let t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){let e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}},bh=class extends Mh{constructor(){super(...arguments),this.type=S}constructObject(){return new S}},Ae={sphereSphere:Nt.types.SPHERE,spherePlane:Nt.types.SPHERE|Nt.types.PLANE,boxBox:Nt.types.BOX|Nt.types.BOX,sphereBox:Nt.types.SPHERE|Nt.types.BOX,planeBox:Nt.types.PLANE|Nt.types.BOX,convexConvex:Nt.types.CONVEXPOLYHEDRON,sphereConvex:Nt.types.SPHERE|Nt.types.CONVEXPOLYHEDRON,planeConvex:Nt.types.PLANE|Nt.types.CONVEXPOLYHEDRON,boxConvex:Nt.types.BOX|Nt.types.CONVEXPOLYHEDRON,sphereHeightfield:Nt.types.SPHERE|Nt.types.HEIGHTFIELD,boxHeightfield:Nt.types.BOX|Nt.types.HEIGHTFIELD,convexHeightfield:Nt.types.CONVEXPOLYHEDRON|Nt.types.HEIGHTFIELD,sphereParticle:Nt.types.PARTICLE|Nt.types.SPHERE,planeParticle:Nt.types.PLANE|Nt.types.PARTICLE,boxParticle:Nt.types.BOX|Nt.types.PARTICLE,convexParticle:Nt.types.PARTICLE|Nt.types.CONVEXPOLYHEDRON,cylinderCylinder:Nt.types.CYLINDER,sphereCylinder:Nt.types.SPHERE|Nt.types.CYLINDER,planeCylinder:Nt.types.PLANE|Nt.types.CYLINDER,boxCylinder:Nt.types.BOX|Nt.types.CYLINDER,convexCylinder:Nt.types.CONVEXPOLYHEDRON|Nt.types.CYLINDER,heightfieldCylinder:Nt.types.HEIGHTFIELD|Nt.types.CYLINDER,particleCylinder:Nt.types.PARTICLE|Nt.types.CYLINDER,sphereTrimesh:Nt.types.SPHERE|Nt.types.TRIMESH,planeTrimesh:Nt.types.PLANE|Nt.types.TRIMESH},Sh=class{get[Ae.sphereSphere](){return this.sphereSphere}get[Ae.spherePlane](){return this.spherePlane}get[Ae.boxBox](){return this.boxBox}get[Ae.sphereBox](){return this.sphereBox}get[Ae.planeBox](){return this.planeBox}get[Ae.convexConvex](){return this.convexConvex}get[Ae.sphereConvex](){return this.sphereConvex}get[Ae.planeConvex](){return this.planeConvex}get[Ae.boxConvex](){return this.boxConvex}get[Ae.sphereHeightfield](){return this.sphereHeightfield}get[Ae.boxHeightfield](){return this.boxHeightfield}get[Ae.convexHeightfield](){return this.convexHeightfield}get[Ae.sphereParticle](){return this.sphereParticle}get[Ae.planeParticle](){return this.planeParticle}get[Ae.boxParticle](){return this.boxParticle}get[Ae.convexParticle](){return this.convexParticle}get[Ae.cylinderCylinder](){return this.convexConvex}get[Ae.sphereCylinder](){return this.sphereConvex}get[Ae.planeCylinder](){return this.planeConvex}get[Ae.boxCylinder](){return this.boxConvex}get[Ae.convexCylinder](){return this.convexConvex}get[Ae.heightfieldCylinder](){return this.heightfieldCylinder}get[Ae.particleCylinder](){return this.particleCylinder}get[Ae.sphereTrimesh](){return this.sphereTrimesh}get[Ae.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new bh,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new xh(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;let l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);let c=n.material||t.material,h=i.material||e.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=r||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){let n=t.bi,i=t.bj,r=t.si,o=t.sj,a=this.world,l=this.currentContactMaterial,c=l.friction,h=r.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(c=h.friction*d.friction),c>0){let u=c*(a.frictionGravity||a.gravity).length(),f=n.invMass+i.invMass;f>0&&(f=1/f);let g=this.frictionEquationPool,v=g.length?g.pop():new Xa(n,i,u*f),p=g.length?g.pop():new Xa(n,i,u*f);return v.bi=p.bi=n,v.bj=p.bj=i,v.minForce=p.minForce=-u*f,v.maxForce=p.maxForce=u*f,v.ri.copy(t.ri),v.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(v.t,p.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),p.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=p.enabled=t.enabled,e.push(v,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;let n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];vs.setZero(),gr.setZero(),vr.setZero();let r=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==r?(vs.vadd(e.ni,vs),gr.vadd(e.ri,gr),vr.vadd(e.rj,vr)):(vs.vsub(e.ni,vs),gr.vadd(e.rj,gr),vr.vadd(e.ri,vr));let o=1/t;gr.scale(o,n.ri),vr.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),vs.normalize(),vs.tangents(n.t,i.t)}getContacts(t,e,n,i,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;let l=aM,c=lM,h=rM,d=oM;for(let u=0,f=t.length;u!==f;u++){let g=t[u],v=e[u],p=null;g.material&&v.material&&(p=n.getContactMaterial(g.material,v.material)||null);let m=g.type&Qt.KINEMATIC&&v.type&Qt.STATIC||g.type&Qt.STATIC&&v.type&Qt.KINEMATIC||g.type&Qt.KINEMATIC&&v.type&Qt.KINEMATIC;for(let x=0;x<g.shapes.length;x++){g.quaternion.mult(g.shapeOrientations[x],l),g.quaternion.vmult(g.shapeOffsets[x],h),h.vadd(g.position,h);let y=g.shapes[x];for(let M=0;M<v.shapes.length;M++){v.quaternion.mult(v.shapeOrientations[M],c),v.quaternion.vmult(v.shapeOffsets[M],d),d.vadd(v.position,d);let P=v.shapes[M];if(!(y.collisionFilterMask&P.collisionFilterGroup&&P.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(d)>y.boundingSphereRadius+P.boundingSphereRadius)continue;let T=null;y.material&&P.material&&(T=n.getContactMaterial(y.material,P.material)||null),this.currentContactMaterial=T||p||n.defaultContactMaterial;let R=y.type|P.type,G=this[R];if(G){let b=!1;y.type<P.type?b=G.call(this,y,P,h,d,l,c,g,v,y,P,m):b=G.call(this,P,y,d,h,c,l,v,g,y,P,m),b&&m&&(n.shapeOverlapKeeper.set(y.id,P.id),n.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(t,e,n,i,r,o,a,l,c,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;let u=this.createContactEquation(a,l,t,e,c,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(l.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,r,o,a,l,c,h,d){let u=this.createContactEquation(a,l,t,e,c,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,za),u.ni.scale(u.ni.dot(za),ep),za.vsub(ep,u.rj),-za.dot(u.ni)<=t.radius){if(d)return!0;let f=u.ri,g=u.rj;f.vadd(n,f),f.vsub(a.position,f),g.vadd(i,g),g.vsub(l.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,r,o,a,l,t,e,d)}sphereBox(t,e,n,i,r,o,a,l,c,h,d){let u=this.v3pool,f=DM;n.vsub(i,ka),e.getSideNormals(f,o);let g=t.radius,v=!1,p=UM,m=BM,x=OM,y=null,M=0,P=0,T=0,R=null;for(let z=0,et=f.length;z!==et&&v===!1;z++){let Z=IM;Z.copy(f[z]);let Y=Z.length();Z.normalize();let nt=ka.dot(Z);if(nt<Y+g&&nt>0){let rt=LM,tt=NM;rt.copy(f[(z+1)%3]),tt.copy(f[(z+2)%3]);let J=rt.length(),ot=tt.length();rt.normalize(),tt.normalize();let gt=ka.dot(rt),pt=ka.dot(tt);if(gt<J&&gt>-J&&pt<ot&&pt>-ot){let vt=Math.abs(nt-Y-g);if((R===null||vt<R)&&(R=vt,P=gt,T=pt,y=Y,p.copy(Z),m.copy(rt),x.copy(tt),M++,d))return!0}}}if(M){v=!0;let z=this.createContactEquation(a,l,t,e,c,h);p.scale(-g,z.ri),z.ni.copy(p),z.ni.negate(z.ni),p.scale(y,p),m.scale(P,m),p.vadd(m,p),x.scale(T,x),p.vadd(x,z.rj),z.ri.vadd(n,z.ri),z.ri.vsub(a.position,z.ri),z.rj.vadd(i,z.rj),z.rj.vsub(l.position,z.rj),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}let G=u.get(),b=FM;for(let z=0;z!==2&&!v;z++)for(let et=0;et!==2&&!v;et++)for(let Z=0;Z!==2&&!v;Z++)if(G.set(0,0,0),z?G.vadd(f[0],G):G.vsub(f[0],G),et?G.vadd(f[1],G):G.vsub(f[1],G),Z?G.vadd(f[2],G):G.vsub(f[2],G),i.vadd(G,b),b.vsub(n,b),b.lengthSquared()<g*g){if(d)return!0;v=!0;let Y=this.createContactEquation(a,l,t,e,c,h);Y.ri.copy(b),Y.ri.normalize(),Y.ni.copy(Y.ri),Y.ri.scale(g,Y.ri),Y.rj.copy(G),Y.ri.vadd(n,Y.ri),Y.ri.vsub(a.position,Y.ri),Y.rj.vadd(i,Y.rj),Y.rj.vsub(l.position,Y.rj),this.result.push(Y),this.createFrictionEquationsFromContact(Y,this.frictionResult)}u.release(G),G=null;let E=u.get(),V=u.get(),q=u.get(),W=u.get(),I=u.get(),F=f.length;for(let z=0;z!==F&&!v;z++)for(let et=0;et!==F&&!v;et++)if(z%3!==et%3){f[et].cross(f[z],E),E.normalize(),f[z].vadd(f[et],V),q.copy(n),q.vsub(V,q),q.vsub(i,q);let Z=q.dot(E);E.scale(Z,W);let Y=0;for(;Y===z%3||Y===et%3;)Y++;I.copy(n),I.vsub(W,I),I.vsub(V,I),I.vsub(i,I);let nt=Math.abs(Z),rt=I.length();if(nt<f[Y].length()&&rt<g){if(d)return!0;v=!0;let tt=this.createContactEquation(a,l,t,e,c,h);V.vadd(W,tt.rj),tt.rj.copy(tt.rj),I.negate(tt.ni),tt.ni.normalize(),tt.ri.copy(tt.rj),tt.ri.vadd(i,tt.ri),tt.ri.vsub(n,tt.ri),tt.ri.normalize(),tt.ri.scale(g,tt.ri),tt.ri.vadd(n,tt.ri),tt.ri.vsub(a.position,tt.ri),tt.rj.vadd(i,tt.rj),tt.rj.vsub(l.position,tt.rj),this.result.push(tt),this.createFrictionEquationsFromContact(tt,this.frictionResult)}}u.release(E,V,q,W,I)}planeBox(t,e,n,i,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,r,o,a,l,t,e,d)}convexConvex(t,e,n,i,r,o,a,l,c,h,d,u,f){let g=QM;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,r,i,o,g,u,f)){let v=[],p=tb;t.clipAgainstHull(n,r,e,i,o,g,-100,100,v);let m=0;for(let x=0;x!==v.length;x++){if(d)return!0;let y=this.createContactEquation(a,l,t,e,c,h),M=y.ri,P=y.rj;g.negate(y.ni),v[x].normal.negate(p),p.scale(v[x].depth,p),v[x].point.vadd(p,M),P.copy(v[x].point),M.vsub(n,M),P.vsub(i,P),M.vadd(n,M),M.vsub(a.position,M),P.vadd(i,P),P.vsub(l.position,P),this.result.push(y),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,r,o,a,l,c,h,d){let u=this.v3pool;n.vsub(i,zM);let f=e.faceNormals,g=e.faces,v=e.vertices,p=t.radius,m=!1;for(let x=0;x!==v.length;x++){let y=v[x],M=GM;o.vmult(y,M),i.vadd(M,M);let P=HM;if(M.vsub(n,P),P.lengthSquared()<p*p){if(d)return!0;m=!0;let T=this.createContactEquation(a,l,t,e,c,h);T.ri.copy(P),T.ri.normalize(),T.ni.copy(T.ri),T.ri.scale(p,T.ri),M.vsub(i,T.rj),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(l.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);return}}for(let x=0,y=g.length;x!==y&&m===!1;x++){let M=f[x],P=g[x],T=WM;o.vmult(M,T);let R=XM;o.vmult(v[P[0]],R),R.vadd(i,R);let G=qM;T.scale(-p,G),n.vadd(G,G);let b=YM;G.vsub(R,b);let E=b.dot(T),V=ZM;if(n.vsub(R,V),E<0&&V.dot(T)>0){let q=[];for(let W=0,I=P.length;W!==I;W++){let F=u.get();o.vmult(v[P[W]],F),i.vadd(F,F),q.push(F)}if(PM(q,T,n)){if(d)return!0;m=!0;let W=this.createContactEquation(a,l,t,e,c,h);T.scale(-p,W.ri),T.negate(W.ni);let I=u.get();T.scale(-E,I);let F=u.get();T.scale(-p,F),n.vsub(i,W.rj),W.rj.vadd(F,W.rj),W.rj.vadd(I,W.rj),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),u.release(I),u.release(F),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult);for(let z=0,et=q.length;z!==et;z++)u.release(q[z]);return}else for(let W=0;W!==P.length;W++){let I=u.get(),F=u.get();o.vmult(v[P[(W+1)%P.length]],I),o.vmult(v[P[(W+2)%P.length]],F),i.vadd(I,I),i.vadd(F,F);let z=kM;F.vsub(I,z);let et=VM;z.unit(et);let Z=u.get(),Y=u.get();n.vsub(I,Y);let nt=Y.dot(et);et.scale(nt,Z),Z.vadd(I,Z);let rt=u.get();if(Z.vsub(n,rt),nt>0&&nt*nt<z.lengthSquared()&&rt.lengthSquared()<p*p){if(d)return!0;let tt=this.createContactEquation(a,l,t,e,c,h);Z.vsub(i,tt.rj),Z.vsub(n,tt.ni),tt.ni.normalize(),tt.ni.scale(p,tt.ri),tt.rj.vadd(i,tt.rj),tt.rj.vsub(l.position,tt.rj),tt.ri.vadd(n,tt.ri),tt.ri.vsub(a.position,tt.ri),this.result.push(tt),this.createFrictionEquationsFromContact(tt,this.frictionResult);for(let J=0,ot=q.length;J!==ot;J++)u.release(q[J]);u.release(I),u.release(F),u.release(Z),u.release(rt),u.release(Y);return}u.release(I),u.release(F),u.release(Z),u.release(rt),u.release(Y)}for(let W=0,I=q.length;W!==I;W++)u.release(q[W])}}}planeConvex(t,e,n,i,r,o,a,l,c,h,d){let u=$M,f=jM;f.set(0,0,1),r.vmult(f,f);let g=0,v=KM;for(let p=0;p!==e.vertices.length;p++)if(u.copy(e.vertices[p]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,v),f.dot(v)<=0){if(d)return!0;let x=this.createContactEquation(a,l,t,e,c,h),y=JM;f.scale(f.dot(v),y),u.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(f),u.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(l.position,x.rj),this.result.push(x),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,d)}sphereHeightfield(t,e,n,i,r,o,a,l,c,h,d){let u=e.data,f=t.radius,g=e.elementSize,v=db,p=ub;pe.pointToLocalFrame(i,o,n,p);let m=Math.floor((p.x-f)/g)-1,x=Math.ceil((p.x+f)/g)+1,y=Math.floor((p.y-f)/g)-1,M=Math.ceil((p.y+f)/g)+1;if(x<0||M<0||m>u.length||y>u[0].length)return;m<0&&(m=0),x<0&&(x=0),y<0&&(y=0),M<0&&(M=0),m>=u.length&&(m=u.length-1),x>=u.length&&(x=u.length-1),M>=u[0].length&&(M=u[0].length-1),y>=u[0].length&&(y=u[0].length-1);let P=[];e.getRectMinMax(m,y,x,M,P);let T=P[0],R=P[1];if(p.z-f>R||p.z+f<T)return;let G=this.result;for(let b=m;b<x;b++)for(let E=y;E<M;E++){let V=G.length,q=!1;if(e.getConvexTrianglePillar(b,E,!1),pe.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(q=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,l,t,e,d)),d&&q||(e.getConvexTrianglePillar(b,E,!0),pe.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(q=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,l,t,e,d)),d&&q))return!0;if(G.length-V>2)return}}boxHeightfield(t,e,n,i,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,d)}convexHeightfield(t,e,n,i,r,o,a,l,c,h,d){let u=e.data,f=e.elementSize,g=t.boundingSphereRadius,v=cb,p=hb,m=lb;pe.pointToLocalFrame(i,o,n,m);let x=Math.floor((m.x-g)/f)-1,y=Math.ceil((m.x+g)/f)+1,M=Math.floor((m.y-g)/f)-1,P=Math.ceil((m.y+g)/f)+1;if(y<0||P<0||x>u.length||M>u[0].length)return;x<0&&(x=0),y<0&&(y=0),M<0&&(M=0),P<0&&(P=0),x>=u.length&&(x=u.length-1),y>=u.length&&(y=u.length-1),P>=u[0].length&&(P=u[0].length-1),M>=u[0].length&&(M=u[0].length-1);let T=[];e.getRectMinMax(x,M,y,P,T);let R=T[0],G=T[1];if(!(m.z-g>G||m.z+g<R))for(let b=x;b<y;b++)for(let E=M;E<P;E++){let V=!1;if(e.getConvexTrianglePillar(b,E,!1),pe.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(V=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,l,null,null,d,p,null)),d&&V||(e.getConvexTrianglePillar(b,E,!0),pe.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(V=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,l,null,null,d,p,null)),d&&V))return!0}}sphereParticle(t,e,n,i,r,o,a,l,c,h,d){let u=sb;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;let g=this.createContactEquation(l,a,e,t,c,h);u.normalize(),g.rj.copy(u),g.rj.scale(t.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,r,o,a,l,c,h,d){let u=eb;u.set(0,0,1),a.quaternion.vmult(u,u);let f=nb;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;let v=this.createContactEquation(l,a,e,t,c,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);let p=ib;u.scale(u.dot(i),p),i.vsub(p,p),v.rj.copy(p),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,d)}convexParticle(t,e,n,i,r,o,a,l,c,h,d){let u=-1,f=ob,g=ab,v=null,p=rb;if(p.copy(i),p.vsub(n,p),r.conjugate(np),np.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,r),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(r);for(let m=0,x=t.faces.length;m!==x;m++){let y=[t.worldVertices[t.faces[m][0]]],M=t.worldFaceNormals[m];i.vsub(y[0],ip);let P=-M.dot(ip);if(v===null||Math.abs(P)<Math.abs(v)){if(d)return!0;v=P,u=m,f.copy(M)}}if(u!==-1){let m=this.createContactEquation(l,a,e,t,c,h);f.scale(v,g),g.vadd(i,g),g.vsub(n,g),m.rj.copy(g),f.negate(m.ni),m.ri.set(0,0,0);let x=m.ri,y=m.rj;x.vadd(i,x),x.vsub(l.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,r,o,a,l,c,h,d){return this.convexHeightfield(e,t,i,n,o,r,l,a,c,h,d)}particleCylinder(t,e,n,i,r,o,a,l,c,h,d){return this.convexParticle(e,t,i,n,o,r,l,a,c,h,d)}sphereTrimesh(t,e,n,i,r,o,a,l,c,h,d){let u=gM,f=vM,g=yM,v=xM,p=_M,m=wM,x=EM,y=mM,M=fM,P=AM;pe.pointToLocalFrame(i,o,n,p);let T=t.radius;x.lowerBound.set(p.x-T,p.y-T,p.z-T),x.upperBound.set(p.x+T,p.y+T,p.z+T),e.getTrianglesInAABB(x,P);let R=pM,G=t.radius*t.radius;for(let W=0;W<P.length;W++)for(let I=0;I<3;I++)if(e.getVertex(e.indices[P[W]*3+I],R),R.vsub(p,M),M.lengthSquared()<=G){if(y.copy(R),pe.pointToWorldFrame(i,o,y,R),R.vsub(n,M),d)return!0;let F=this.createContactEquation(a,l,t,e,c,h);F.ni.copy(M),F.ni.normalize(),F.ri.copy(F.ni),F.ri.scale(t.radius,F.ri),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),F.rj.copy(R),F.rj.vsub(l.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}for(let W=0;W<P.length;W++)for(let I=0;I<3;I++){e.getVertex(e.indices[P[W]*3+I],u),e.getVertex(e.indices[P[W]*3+(I+1)%3],f),f.vsub(u,g),p.vsub(f,m);let F=m.dot(g);p.vsub(u,m);let z=m.dot(g);if(z>0&&F<0&&(p.vsub(u,m),v.copy(g),v.normalize(),z=m.dot(v),v.scale(z,m),m.vadd(u,m),m.distanceTo(p)<t.radius)){if(d)return!0;let Z=this.createContactEquation(a,l,t,e,c,h);m.vsub(p,Z.ni),Z.ni.normalize(),Z.ni.scale(t.radius,Z.ri),Z.ri.vadd(n,Z.ri),Z.ri.vsub(a.position,Z.ri),pe.pointToWorldFrame(i,o,m,m),m.vsub(l.position,Z.rj),pe.vectorToWorldFrame(o,Z.ni,Z.ni),pe.vectorToWorldFrame(o,Z.ri,Z.ri),this.result.push(Z),this.createFrictionEquationsFromContact(Z,this.frictionResult)}}let b=MM,E=bM,V=SM,q=dM;for(let W=0,I=P.length;W!==I;W++){e.getTriangleVertices(P[W],b,E,V),e.getNormal(P[W],q),p.vsub(b,m);let F=m.dot(q);if(q.scale(F,m),p.vsub(m,m),F=m.distanceTo(p),Fn.pointInTriangle(m,b,E,V)&&F<t.radius){if(d)return!0;let z=this.createContactEquation(a,l,t,e,c,h);m.vsub(p,z.ni),z.ni.normalize(),z.ni.scale(t.radius,z.ri),z.ri.vadd(n,z.ri),z.ri.vsub(a.position,z.ri),pe.pointToWorldFrame(i,o,m,m),m.vsub(l.position,z.rj),pe.vectorToWorldFrame(o,z.ni,z.ni),pe.vectorToWorldFrame(o,z.ri,z.ri),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}}P.length=0}planeTrimesh(t,e,n,i,r,o,a,l,c,h,d){let u=new S,f=cM;f.set(0,0,1),r.vmult(f,f);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,u);let v=new S;v.copy(u),pe.pointToWorldFrame(i,o,v,u);let p=hM;if(u.vsub(n,p),f.dot(p)<=0){if(d)return!0;let x=this.createContactEquation(a,l,t,e,c,h);x.ni.copy(f);let y=uM;f.scale(p.dot(f),y),u.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(u),x.rj.vsub(l.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}},vs=new S,gr=new S,vr=new S,rM=new S,oM=new S,aM=new an,lM=new an,cM=new S,hM=new S,uM=new S,dM=new S,fM=new S;new S;pM=new S,mM=new S,gM=new S,vM=new S,yM=new S,xM=new S,_M=new S,wM=new S,MM=new S,bM=new S,SM=new S,EM=new Rn,AM=[],za=new S,ep=new S,TM=new S,CM=new S,RM=new S;ka=new S,IM=new S,LM=new S,NM=new S,DM=[new S,new S,new S,new S,new S,new S],FM=new S,UM=new S,BM=new S,OM=new S,zM=new S,kM=new S,VM=new S,HM=new S,GM=new S,WM=new S,XM=new S,qM=new S,YM=new S,ZM=new S;new S;new S;$M=new S,jM=new S,KM=new S,JM=new S,QM=new S,tb=new S,eb=new S,nb=new S,ib=new S,sb=new S,np=new an,rb=new S;new S;ob=new S,ip=new S,ab=new S,lb=new S,cb=new S,hb=[0],ub=new S,db=new S,Za=class{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){let n=e;e=t,t=n}return t<<16|e}set(t,e){let n=this.getKey(t,e),i=this.current,r=0;for(;n>i[r];)r++;if(n!==i[r]){for(let o=i.length-1;o>=r;o--)i[o+1]=i[o];i[r]=n}}tick(){let t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){let n=this.current,i=this.previous,r=n.length,o=i.length,a=0;for(let l=0;l<r;l++){let c=!1,h=n[l];for(;h>i[a];)a++;c=h===i[a],c||sp(t,h)}a=0;for(let l=0;l<o;l++){let c=!1,h=i[l];for(;h>n[a];)a++;c=n[a]===h,c||sp(e,h)}}};dh=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`,Eh=class{constructor(){this.data={keys:[]}}get(t,e){let n=dh(t,e);return this.data[n]}set(t,e,n){let i=dh(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){let n=dh(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){let t=this.data,e=t.keys;for(;e.length>0;){let n=e.pop();delete t[n]}}},$a=class extends Ha{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new S,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new S,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new vh,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new wh,this.constraints=[],this.narrowphase=new Sh(this),this.collisionMatrix=new Va,this.collisionMatrixPrevious=new Va,this.bodyOverlapKeeper=new Za,this.shapeOverlapKeeper=new Za,this.contactmaterials=[],this.contactMaterialTable=new Eh,this.defaultMaterial=new _s("default"),this.defaultContactMaterial=new xs(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){let t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){let e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof yr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Fn.ALL,n.from=t,n.to=e,n.callback=i,fh.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Fn.ANY,n.from=t,n.to=e,n.result=i,fh.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Fn.CLOSEST,n.from=t,n.to=e,n.result=i,fh.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof Qt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;let e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let r=0;r!==n.length;r++)n[r].index=r;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){let e=this.bodies;for(let n=0;n<e.length;n++){let i=e[n].shapes;for(let r=0;r<i.length;r++){let o=i[r];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){let e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);let n=Xe.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{let i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;let i=Xe.now(),r=0;for(;this.accumulator>=t&&r<n&&(this.internalStep(t),this.accumulator-=t,r++,!(Xe.now()-i>t*1e3)););this.accumulator=this.accumulator%t;let o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){let l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;let e=this.contacts,n=vb,i=yb,r=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,d=Qt.DYNAMIC,u=-1/0,f=this.constraints,g=gb;l.length();let v=l.x,p=l.y,m=l.z,x=0;for(c&&(u=Xe.now()),x=0;x!==r;x++){let W=o[x];if(W.type===d){let I=W.force,F=W.mass;I.x+=F*v,I.y+=F*p,I.z+=F*m}}for(let W=0,I=this.subsystems.length;W!==I;W++)this.subsystems[W].update();c&&(u=Xe.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),c&&(h.broadphase=Xe.now()-u);let y=f.length;for(x=0;x!==y;x++){let W=f[x];if(!W.collideConnected)for(let I=n.length-1;I>=0;I-=1)(W.bodyA===n[I]&&W.bodyB===i[I]||W.bodyB===n[I]&&W.bodyA===i[I])&&(n.splice(I,1),i.splice(I,1))}this.collisionMatrixTick(),c&&(u=Xe.now());let M=mb,P=e.length;for(x=0;x!==P;x++)M.push(e[x]);e.length=0;let T=this.frictionEquations.length;for(x=0;x!==T;x++)g.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,M,this.frictionEquations,g),c&&(h.narrowphase=Xe.now()-u),c&&(u=Xe.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);let R=e.length;for(let W=0;W!==R;W++){let I=e[W],F=I.bi,z=I.bj,et=I.si,Z=I.sj,Y;if(F.material&&z.material?Y=this.getContactMaterial(F.material,z.material)||this.defaultContactMaterial:Y=this.defaultContactMaterial,Y.friction,F.material&&z.material&&(F.material.friction>=0&&z.material.friction>=0&&F.material.friction*z.material.friction,F.material.restitution>=0&&z.material.restitution>=0&&(I.restitution=F.material.restitution*z.material.restitution)),a.addEquation(I),F.allowSleep&&F.type===Qt.DYNAMIC&&F.sleepState===Qt.SLEEPING&&z.sleepState===Qt.AWAKE&&z.type!==Qt.STATIC){let nt=z.velocity.lengthSquared()+z.angularVelocity.lengthSquared(),rt=z.sleepSpeedLimit**2;nt>=rt*2&&(F.wakeUpAfterNarrowphase=!0)}if(z.allowSleep&&z.type===Qt.DYNAMIC&&z.sleepState===Qt.SLEEPING&&F.sleepState===Qt.AWAKE&&F.type!==Qt.STATIC){let nt=F.velocity.lengthSquared()+F.angularVelocity.lengthSquared(),rt=F.sleepSpeedLimit**2;nt>=rt*2&&(z.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(F,z,!0),this.collisionMatrixPrevious.get(F,z)||(Qr.body=z,Qr.contact=I,F.dispatchEvent(Qr),Qr.body=F,z.dispatchEvent(Qr)),this.bodyOverlapKeeper.set(F.id,z.id),this.shapeOverlapKeeper.set(et.id,Z.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=Xe.now()-u,u=Xe.now()),x=0;x!==r;x++){let W=o[x];W.wakeUpAfterNarrowphase&&(W.wakeUp(),W.wakeUpAfterNarrowphase=!1)}for(y=f.length,x=0;x!==y;x++){let W=f[x];W.update();for(let I=0,F=W.equations.length;I!==F;I++){let z=W.equations[I];a.addEquation(z)}}a.solve(t,this),c&&(h.solve=Xe.now()-u),a.removeAllEquations();let G=Math.pow;for(x=0;x!==r;x++){let W=o[x];if(W.type&d){let I=G(1-W.linearDamping,t),F=W.velocity;F.scale(I,F);let z=W.angularVelocity;if(z){let et=G(1-W.angularDamping,t);z.scale(et,z)}}}this.dispatchEvent(pb),c&&(u=Xe.now());let E=this.stepnumber%(this.quatNormalizeSkip+1)===0,V=this.quatNormalizeFast;for(x=0;x!==r;x++)o[x].integrate(t,E,V);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=Xe.now()-u),this.stepnumber+=1,this.dispatchEvent(fb);let q=!0;if(this.allowSleep)for(q=!1,x=0;x!==r;x++){let W=o[x];W.sleepTick(this.time),W.sleepState!==Qt.SLEEPING&&(q=!0)}this.hasActiveBodies=q}emitContactEvents(){let t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(wi,Mi),t){for(let r=0,o=wi.length;r<o;r+=2)to.bodyA=this.getBodyById(wi[r]),to.bodyB=this.getBodyById(wi[r+1]),this.dispatchEvent(to);to.bodyA=to.bodyB=null}if(e){for(let r=0,o=Mi.length;r<o;r+=2)eo.bodyA=this.getBodyById(Mi[r]),eo.bodyB=this.getBodyById(Mi[r+1]),this.dispatchEvent(eo);eo.bodyA=eo.bodyB=null}wi.length=Mi.length=0;let n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(wi,Mi),n){for(let r=0,o=wi.length;r<o;r+=2){let a=this.getShapeById(wi[r]),l=this.getShapeById(wi[r+1]);bi.shapeA=a,bi.shapeB=l,a&&(bi.bodyA=a.body),l&&(bi.bodyB=l.body),this.dispatchEvent(bi)}bi.bodyA=bi.bodyB=bi.shapeA=bi.shapeB=null}if(i){for(let r=0,o=Mi.length;r<o;r+=2){let a=this.getShapeById(Mi[r]),l=this.getShapeById(Mi[r+1]);Si.shapeA=a,Si.shapeB=l,a&&(Si.bodyA=a.body),l&&(Si.bodyB=l.body),this.dispatchEvent(Si)}Si.bodyA=Si.bodyB=Si.shapeA=Si.shapeB=null}}clearForces(){let t=this.bodies,e=t.length;for(let n=0;n!==e;n++){let i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}};new Rn;fh=new Fn,Xe=globalThis.performance||{};if(!Xe.now){let s=Date.now();Xe.timing&&Xe.timing.navigationStart&&(s=Xe.timing.navigationStart),Xe.now=()=>Date.now()-s}new S;fb={type:"postStep"},pb={type:"preStep"},Qr={type:Qt.COLLIDE_EVENT_NAME,body:null,contact:null},mb=[],gb=[],vb=[],yb=[],wi=[],Mi=[],to={type:"beginContact",bodyA:null,bodyB:null},eo={type:"endContact",bodyA:null,bodyB:null},bi={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Si={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null}});function Ph(s){let t,e;return(t=s.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),!!e&&"#"+e}var Ki,Rh,_b,so,wb,Mb,bb,Ih,io,Lh,Nh,Dh,fp,ja,pp=Ie(()=>{Ki=class s{constructor(t,e,n,i,r="div"){this.parent=t,this.object=e,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),s.nextNameID=s.nextNameID||0,this.$name.id="lil-gui-name-"+ ++s.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled||(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t)),this}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){let e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},Rh=class extends Ki{constructor(t,e,n){super(t,e,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};_b={isPrimitive:!0,match:s=>typeof s=="string",fromHexString:Ph,toHexString:Ph},so={isPrimitive:!0,match:s=>typeof s=="number",fromHexString:s=>parseInt(s.substring(1),16),toHexString:s=>"#"+s.toString(16).padStart(6,0)},wb={isPrimitive:!1,match:Array.isArray,fromHexString(s,t,e=1){let n=so.fromHexString(s);t[0]=(n>>16&255)/255*e,t[1]=(n>>8&255)/255*e,t[2]=(255&n)/255*e},toHexString:([s,t,e],n=1)=>so.toHexString(s*(n=255/n)<<16^t*n<<8^e*n<<0)},Mb={isPrimitive:!1,match:s=>Object(s)===s,fromHexString(s,t,e=1){let n=so.fromHexString(s);t.r=(n>>16&255)/255*e,t.g=(n>>8&255)/255*e,t.b=(255&n)/255*e},toHexString:({r:s,g:t,b:e},n=1)=>so.toHexString(s*(n=255/n)<<16^t*n<<8^e*n<<0)},bb=[_b,so,wb,Mb],Ih=class extends Ki{constructor(t,e,n,i){var r;super(t,e,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,bb.find(o=>o.match(r))),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let o=Ph(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){let e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},io=class extends Ki{constructor(t,e,n){super(t,e,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},Lh=class extends Ki{constructor(t,e,n,i,r,o){super(t,e,n,"number"),this._initInput(),this.min(i),this.max(r);let a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){let t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=100*e+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=h=>{let d=parseFloat(this.$input.value);isNaN(d)||(this._snapClampSetValue(d+h),this.$input.value=this.getValue())},e,n,i,r,o,a=!1,l=h=>{if(a){let d=h.clientX-e,u=h.clientY-n;Math.abs(u)>5?(h.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(d)>5&&c()}if(!a){let d=h.clientY-i;o-=d*this._step*this._arrowKeyMultiplier(h),r+o>this._max?o=this._max-r:r+o<this._min&&(o=this._min-r),this._snapClampSetValue(r+o)}i=h.clientY},c=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",c)};this.$input.addEventListener("input",()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))}),this.$input.addEventListener("keydown",h=>{h.code==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),t(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),t(this._step*this._arrowKeyMultiplier(h)*-1))}),this.$input.addEventListener("wheel",h=>{this._inputFocused&&(h.preventDefault(),t(this._step*this._normalizeMouseWheel(h)))},{passive:!1}),this.$input.addEventListener("mousedown",h=>{e=h.clientX,n=i=h.clientY,a=!0,r=this.getValue(),o=0,window.addEventListener("mousemove",l),window.addEventListener("mouseup",c)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let t=u=>{let f=this.$slider.getBoundingClientRect(),g=(v=u,p=f.left,m=f.right,x=this._min,y=this._max,(v-p)/(m-p)*(y-x)+x);var v,p,m,x,y;this._snapClampSetValue(g)},e=u=>{t(u.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",n)},i,r,o=!1,a=u=>{u.preventDefault(),this._setDraggingStyle(!0),t(u.touches[0].clientX),o=!1},l=u=>{if(o){let f=u.touches[0].clientX-i,g=u.touches[0].clientY-r;Math.abs(f)>Math.abs(g)?a(u):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c))}else u.preventDefault(),t(u.touches[0].clientX)},c=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c)},h=this._callOnFinishChange.bind(this),d;this.$slider.addEventListener("mousedown",u=>{this._setDraggingStyle(!0),t(u.clientX),window.addEventListener("mousemove",e),window.addEventListener("mouseup",n)}),this.$slider.addEventListener("touchstart",u=>{u.touches.length>1||(this._hasScrollBar?(i=u.touches[0].clientX,r=u.touches[0].clientY,o=!0):a(u),window.addEventListener("touchmove",l,{passive:!1}),window.addEventListener("touchend",c))},{passive:!1}),this.$slider.addEventListener("wheel",u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();let f=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+f),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(h,400)},{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle("lil-gui-"+e,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),e+-n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=Math.round(t/this._step)*this._step;return parseFloat(e.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){let t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},Nh=class extends Ki{constructor(t,e,n,i){super(t,e,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{let o=document.createElement("option");o.innerHTML=r,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){let t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.innerHTML=e===-1?t:this._names[e],this}},Dh=class extends Ki{constructor(t,e,n){super(t,e,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},fp=!1,ja=class s{constructor({parent:t,autoPlace:e=t===void 0,container:n,width:i,title:r="Controls",injectStyles:o=!0,touchStyles:a=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{l.code!=="Enter"&&l.code!=="Space"||(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!fp&&o&&((function(l){let c=document.createElement("style");c.innerHTML=l;let h=document.querySelector("head link[rel=stylesheet], head style");h?document.head.insertBefore(c,h):document.head.appendChild(c)})('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"\u2195";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"\u25BE";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"\u25B8"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"\u2713";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),fp=!0),n?n.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(t,e,n,i,r){if(Object(n)===n)return new Nh(this,t,e,n);let o=t[e];switch(typeof o){case"number":return new Lh(this,t,e,n,i,r);case"boolean":return new Rh(this,t,e);case"string":return new Dh(this,t,e);case"function":return new io(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,o)}addColor(t,e,n=1){return new Ih(this,t,e,n)}addFolder(t){return new s({parent:this,title:t})}load(t,e=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof io||n._name in t.controllers&&n.load(t.controllers[n._name])}),e&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){let e={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof io)){if(n._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);e.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);e.folders[n._title]=n.save()}),e}open(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");let n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}});var xr,Fh=Ie(()=>{xr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`}});var Pn,Sb,Uh,Eb,Ji,_r=Ie(()=>{xn();Pn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Sb=new Hi(-1,1,1,-1,0,1),Uh=class extends on{constructor(){super(),this.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ne([0,2,0,0,2,0],2))}},Eb=new Uh,Ji=class{constructor(t){this._mesh=new Fe(Eb,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Sb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}});var Ka,mp=Ie(()=>{xn();_r();Ka=class extends Pn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ei.clone(t.uniforms),this.material=new Ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ji(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}});var ro,Ja,Bh=Ie(()=>{_r();ro=class extends Pn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},Ja=class extends Pn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}});var Qa,gp=Ie(()=>{xn();Fh();mp();Bh();Bh();Qa=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new jt);this._width=n.width,this._height=n.height,e=new En(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ka(xr),this.copyPass.material.blending=$e,this.clock=new Ca}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ro!==void 0&&(o instanceof ro?n=!0:o instanceof Ja&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new jt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}});var tl,vp=Ie(()=>{xn();_r();tl=class extends Pn{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new zt}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}});var el,yp=Ie(()=>{el=class{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,n){return t[0]*e+t[1]*n}dot3(t,e,n,i){return t[0]*e+t[1]*n+t[2]*i}dot4(t,e,n,i,r){return t[0]*e+t[1]*n+t[2]*i+t[3]*r}noise(t,e){let n,i,r,o=.5*(Math.sqrt(3)-1),a=(t+e)*o,l=Math.floor(t+a),c=Math.floor(e+a),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,g=t-u,v=e-f,p,m;g>v?(p=1,m=0):(p=0,m=1);let x=g-p+h,y=v-m+h,M=g-1+2*h,P=v-1+2*h,T=l&255,R=c&255,G=this.perm[T+this.perm[R]]%12,b=this.perm[T+p+this.perm[R+m]]%12,E=this.perm[T+1+this.perm[R+1]]%12,V=.5-g*g-v*v;V<0?n=0:(V*=V,n=V*V*this.dot(this.grad3[G],g,v));let q=.5-x*x-y*y;q<0?i=0:(q*=q,i=q*q*this.dot(this.grad3[b],x,y));let W=.5-M*M-P*P;return W<0?r=0:(W*=W,r=W*W*this.dot(this.grad3[E],M,P)),70*(n+i+r)}noise3d(t,e,n){let i,r,o,a,c=(t+e+n)*.3333333333333333,h=Math.floor(t+c),d=Math.floor(e+c),u=Math.floor(n+c),f=1/6,g=(h+d+u)*f,v=h-g,p=d-g,m=u-g,x=t-v,y=e-p,M=n-m,P,T,R,G,b,E;x>=y?y>=M?(P=1,T=0,R=0,G=1,b=1,E=0):x>=M?(P=1,T=0,R=0,G=1,b=0,E=1):(P=0,T=0,R=1,G=1,b=0,E=1):y<M?(P=0,T=0,R=1,G=0,b=1,E=1):x<M?(P=0,T=1,R=0,G=0,b=1,E=1):(P=0,T=1,R=0,G=1,b=1,E=0);let V=x-P+f,q=y-T+f,W=M-R+f,I=x-G+2*f,F=y-b+2*f,z=M-E+2*f,et=x-1+3*f,Z=y-1+3*f,Y=M-1+3*f,nt=h&255,rt=d&255,tt=u&255,J=this.perm[nt+this.perm[rt+this.perm[tt]]]%12,ot=this.perm[nt+P+this.perm[rt+T+this.perm[tt+R]]]%12,gt=this.perm[nt+G+this.perm[rt+b+this.perm[tt+E]]]%12,pt=this.perm[nt+1+this.perm[rt+1+this.perm[tt+1]]]%12,vt=.6-x*x-y*y-M*M;vt<0?i=0:(vt*=vt,i=vt*vt*this.dot3(this.grad3[J],x,y,M));let bt=.6-V*V-q*q-W*W;bt<0?r=0:(bt*=bt,r=bt*bt*this.dot3(this.grad3[ot],V,q,W));let it=.6-I*I-F*F-z*z;it<0?o=0:(it*=it,o=it*it*this.dot3(this.grad3[gt],I,F,z));let at=.6-et*et-Z*Z-Y*Y;return at<0?a=0:(at*=at,a=at*at*this.dot3(this.grad3[pt],et,Z,Y)),32*(i+r+o+a)}noise4d(t,e,n,i){let r=this.grad4,o=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,d,u,f,g,v=(t+e+n+i)*l,p=Math.floor(t+v),m=Math.floor(e+v),x=Math.floor(n+v),y=Math.floor(i+v),M=(p+m+x+y)*c,P=p-M,T=m-M,R=x-M,G=y-M,b=t-P,E=e-T,V=n-R,q=i-G,W=b>E?32:0,I=b>V?16:0,F=E>V?8:0,z=b>q?4:0,et=E>q?2:0,Z=V>q?1:0,Y=W+I+F+z+et+Z,nt=o[Y][0]>=3?1:0,rt=o[Y][1]>=3?1:0,tt=o[Y][2]>=3?1:0,J=o[Y][3]>=3?1:0,ot=o[Y][0]>=2?1:0,gt=o[Y][1]>=2?1:0,pt=o[Y][2]>=2?1:0,vt=o[Y][3]>=2?1:0,bt=o[Y][0]>=1?1:0,it=o[Y][1]>=1?1:0,at=o[Y][2]>=1?1:0,wt=o[Y][3]>=1?1:0,X=b-nt+c,Vt=E-rt+c,Tt=V-tt+c,Ft=q-J+c,Ct=b-ot+2*c,ae=E-gt+2*c,Gt=V-pt+2*c,L=q-vt+2*c,A=b-bt+3*c,j=E-it+3*c,ht=V-at+3*c,lt=q-wt+3*c,ft=b-1+4*c,Rt=E-1+4*c,yt=V-1+4*c,St=q-1+4*c,Dt=p&255,kt=m&255,ut=x&255,le=y&255,ne=a[Dt+a[kt+a[ut+a[le]]]]%32,Wt=a[Dt+nt+a[kt+rt+a[ut+tt+a[le+J]]]]%32,Pt=a[Dt+ot+a[kt+gt+a[ut+pt+a[le+vt]]]]%32,Lt=a[Dt+bt+a[kt+it+a[ut+at+a[le+wt]]]]%32,qt=a[Dt+1+a[kt+1+a[ut+1+a[le+1]]]]%32,Yt=.6-b*b-E*E-V*V-q*q;Yt<0?h=0:(Yt*=Yt,h=Yt*Yt*this.dot4(r[ne],b,E,V,q));let Kt=.6-X*X-Vt*Vt-Tt*Tt-Ft*Ft;Kt<0?d=0:(Kt*=Kt,d=Kt*Kt*this.dot4(r[Wt],X,Vt,Tt,Ft));let $t=.6-Ct*Ct-ae*ae-Gt*Gt-L*L;$t<0?u=0:($t*=$t,u=$t*$t*this.dot4(r[Pt],Ct,ae,Gt,L));let K=.6-A*A-j*j-ht*ht-lt*lt;K<0?f=0:(K*=K,f=K*K*this.dot4(r[Lt],A,j,ht,lt));let k=.6-ft*ft-Rt*Rt-yt*yt-St*St;return k<0?g=0:(k*=k,g=k*k*this.dot4(r[qt],ft,Rt,yt,St)),27*(h+d+u+f+g)}}});var oo,ao,lo,nl=Ie(()=>{xn();oo={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new jt},cameraProjectionMatrix:{value:new Ut},cameraInverseProjectionMatrix:{value:new Ut},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background
				
			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},ao={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},lo={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new jt}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`}});var co,xp=Ie(()=>{xn();_r();yp();nl();nl();nl();Fh();co=class s extends Pn{constructor(t,e,n,i,r=32){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=e,this.scene=t,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=new Map,this.generateSampleKernel(r),this.generateRandomKernelRotations();let o=new ar;o.format=Oi,o.type=yi,this.normalRenderTarget=new En(this.width,this.height,{minFilter:ze,magFilter:ze,type:vn,depthTexture:o}),this.ssaoRenderTarget=new En(this.width,this.height,{type:vn}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Ke({defines:Object.assign({},oo.defines),uniforms:ei.clone(oo.uniforms),vertexShader:oo.vertexShader,fragmentShader:oo.fragmentShader,blending:$e}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new xa,this.normalMaterial.blending=$e,this.blurMaterial=new Ke({defines:Object.assign({},lo.defines),uniforms:ei.clone(lo.uniforms),vertexShader:lo.vertexShader,fragmentShader:lo.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Ke({defines:Object.assign({},ao.defines),uniforms:ei.clone(ao.uniforms),vertexShader:ao.vertexShader,fragmentShader:ao.fragmentShader,blending:$e}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ke({uniforms:ei.clone(xr.uniforms),vertexShader:xr.vertexShader,fragmentShader:xr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Gc,blendDst:Pa,blendEquation:Qn,blendSrcAlpha:Hc,blendDstAlpha:Pa,blendEquationAlpha:Qn}),this.fsQuad=new Ji(null),this.originalClearColor=new zt}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(t,e,n){switch(t.capabilities.isWebGL2===!1&&(this.noiseTexture.format=jc),this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this.renderPass(t,this.ssaoMaterial,this.ssaoRenderTarget),this.renderPass(t,this.blurMaterial,this.blurRenderTarget),this.output){case s.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=$e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case s.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=$e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case s.OUTPUT.Depth:this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case s.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=$e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case s.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=$e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Vc,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}renderPass(t,e,n,i,r){t.getClearColor(this.originalClearColor);let o=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i!=null&&(t.setClearColor(i),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(o)}renderOverride(t,e,n,i,r){t.getClearColor(this.originalClearColor);let o=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i=e.clearColor||i,r=e.clearAlpha||r,i!=null&&(t.setClearColor(i),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(o)}setSize(t,e){this.width=t,this.height=e,this.ssaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.blurRenderTarget.setSize(t,e),this.ssaoMaterial.uniforms.resolution.value.set(t,e),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(t,e)}generateSampleKernel(t){let e=this.kernel;for(let n=0;n<t;n++){let i=new H;i.x=Math.random()*2-1,i.y=Math.random()*2-1,i.z=Math.random(),i.normalize();let r=n/t;r=ke.lerp(.1,1,r*r),i.multiplyScalar(r),e.push(i)}}generateRandomKernelRotations(){let n=new el,i=16,r=new Float32Array(i);for(let o=0;o<i;o++){let a=Math.random()*2-1,l=Math.random()*2-1,c=0;r[o]=n.noise3d(a,l,c)}this.noiseTexture=new cr(r,4,4,$r,sn),this.noiseTexture.wrapS=xi,this.noiseTexture.wrapT=xi,this.noiseTexture.needsUpdate=!0}overrideVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(n){e.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(n){let i=e.get(n);n.visible=i}),e.clear()}};co.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4}});var _p,wp=Ie(()=>{_p={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`}});var il,Mp=Ie(()=>{xn();_r();wp();il=class extends Pn{constructor(){super();let t=_p;this.uniforms=ei.clone(t.uniforms),this.material=new ya({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ji(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},fe.getTransfer(this._outputColorSpace)===Me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Wc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Xc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===qc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Yc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Zc&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}});function ws(s,t){return Db((Ub(s),s.subarray(2,-4)),t)}var bp,Ab,Un,Qi,kh,Sp,Ep,Tb,Ap,Tp,Cp,Cb,Rp,Rb,PE,Vh,Ei,de,ho,uo,de,de,de,de,Pp,de,Pb,Ib,Oh,Zn,zh,Lb,Nb,Db,Fb,Ub,Bb,Ob,Hh=Ie(()=>{bp=function(s){return URL.createObjectURL(new Blob([s],{type:"text/javascript"}))},Ab=function(s){return new Worker(s)};try{URL.revokeObjectURL(bp(""))}catch{bp=function(t){return"data:application/javascript;charset=UTF-8,"+encodeURI(t)},Ab=function(t){return new Worker(t,{type:"module"})}}Un=Uint8Array,Qi=Uint16Array,kh=Uint32Array,Sp=new Un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ep=new Un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Tb=new Un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ap=function(s,t){for(var e=new Qi(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var i=new kh(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return[e,i]},Tp=Ap(Sp,2),Cp=Tp[0],Cb=Tp[1];Cp[28]=258,Cb[258]=28;Rp=Ap(Ep,0),Rb=Rp[0],PE=Rp[1],Vh=new Qi(32768);for(de=0;de<32768;++de)Ei=(de&43690)>>>1|(de&21845)<<1,Ei=(Ei&52428)>>>2|(Ei&13107)<<2,Ei=(Ei&61680)>>>4|(Ei&3855)<<4,Vh[de]=((Ei&65280)>>>8|(Ei&255)<<8)>>>1;ho=(function(s,t,e){for(var n=s.length,i=0,r=new Qi(t);i<n;++i)++r[s[i]-1];var o=new Qi(t);for(i=0;i<t;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(e){a=new Qi(1<<t);var l=15-t;for(i=0;i<n;++i)if(s[i])for(var c=i<<4|s[i],h=t-s[i],d=o[s[i]-1]++<<h,u=d|(1<<h)-1;d<=u;++d)a[Vh[d]>>>l]=c}else for(a=new Qi(n),i=0;i<n;++i)s[i]&&(a[i]=Vh[o[s[i]-1]++]>>>15-s[i]);return a}),uo=new Un(288);for(de=0;de<144;++de)uo[de]=8;for(de=144;de<256;++de)uo[de]=9;for(de=256;de<280;++de)uo[de]=7;for(de=280;de<288;++de)uo[de]=8;Pp=new Un(32);for(de=0;de<32;++de)Pp[de]=5;Pb=ho(uo,9,1),Ib=ho(Pp,5,1),Oh=function(s){for(var t=s[0],e=1;e<s.length;++e)s[e]>t&&(t=s[e]);return t},Zn=function(s,t,e){var n=t/8|0;return(s[n]|s[n+1]<<8)>>(t&7)&e},zh=function(s,t){var e=t/8|0;return(s[e]|s[e+1]<<8|s[e+2]<<16)>>(t&7)},Lb=function(s){return(s/8|0)+(s&7&&1)},Nb=function(s,t,e){(t==null||t<0)&&(t=0),(e==null||e>s.length)&&(e=s.length);var n=new(s instanceof Qi?Qi:s instanceof kh?kh:Un)(e-t);return n.set(s.subarray(t,e)),n},Db=function(s,t,e){var n=s.length;if(!n||e&&!e.l&&n<5)return t||new Un(0);var i=!t||e,r=!e||e.i;e||(e={}),t||(t=new Un(n*3));var o=function(pt){var vt=t.length;if(pt>vt){var bt=new Un(Math.max(vt*2,pt));bt.set(t),t=bt}},a=e.f||0,l=e.p||0,c=e.b||0,h=e.l,d=e.d,u=e.m,f=e.n,g=n*8;do{if(!h){e.f=a=Zn(s,l,1);var v=Zn(s,l+1,3);if(l+=3,v)if(v==1)h=Pb,d=Ib,u=9,f=5;else if(v==2){var y=Zn(s,l,31)+257,M=Zn(s,l+10,15)+4,P=y+Zn(s,l+5,31)+1;l+=14;for(var T=new Un(P),R=new Un(19),G=0;G<M;++G)R[Tb[G]]=Zn(s,l+G*3,7);l+=M*3;for(var b=Oh(R),E=(1<<b)-1,V=ho(R,b,1),G=0;G<P;){var q=V[Zn(s,l,E)];l+=q&15;var p=q>>>4;if(p<16)T[G++]=p;else{var W=0,I=0;for(p==16?(I=3+Zn(s,l,3),l+=2,W=T[G-1]):p==17?(I=3+Zn(s,l,7),l+=3):p==18&&(I=11+Zn(s,l,127),l+=7);I--;)T[G++]=W}}var F=T.subarray(0,y),z=T.subarray(y);u=Oh(F),f=Oh(z),h=ho(F,u,1),d=ho(z,f,1)}else throw"invalid block type";else{var p=Lb(l)+4,m=s[p-4]|s[p-3]<<8,x=p+m;if(x>n){if(r)throw"unexpected EOF";break}i&&o(c+m),t.set(s.subarray(p,x),c),e.b=c+=m,e.p=l=x*8;continue}if(l>g){if(r)throw"unexpected EOF";break}}i&&o(c+131072);for(var et=(1<<u)-1,Z=(1<<f)-1,Y=l;;Y=l){var W=h[zh(s,l)&et],nt=W>>>4;if(l+=W&15,l>g){if(r)throw"unexpected EOF";break}if(!W)throw"invalid length/literal";if(nt<256)t[c++]=nt;else if(nt==256){Y=l,h=null;break}else{var rt=nt-254;if(nt>264){var G=nt-257,tt=Sp[G];rt=Zn(s,l,(1<<tt)-1)+Cp[G],l+=tt}var J=d[zh(s,l)&Z],ot=J>>>4;if(!J)throw"invalid distance";l+=J&15;var z=Rb[ot];if(ot>3){var tt=Ep[ot];z+=zh(s,l)&(1<<tt)-1,l+=tt}if(l>g){if(r)throw"unexpected EOF";break}i&&o(c+131072);for(var gt=c+rt;c<gt;c+=4)t[c]=t[c-z],t[c+1]=t[c+1-z],t[c+2]=t[c+2-z],t[c+3]=t[c+3-z];c=gt}}e.l=h,e.p=Y,e.b=c,h&&(a=1,e.m=u,e.d=d,e.n=f)}while(!a);return c==t.length?t:Nb(t,0,c)},Fb=new Un(0),Ub=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};Bb=typeof TextDecoder<"u"&&new TextDecoder,Ob=0;try{Bb.decode(Fb,{stream:!0}),Ob=1}catch{}});function Lp(s,t,e){let n=e.length-s-1;if(t>=e[n])return n-1;if(t<=e[s])return s;let i=s,r=n,o=Math.floor((i+r)/2);for(;t<e[o]||t>=e[o+1];)t<e[o]?r=o:i=o,o=Math.floor((i+r)/2);return o}function zb(s,t,e,n){let i=[],r=[],o=[];i[0]=1;for(let a=1;a<=e;++a){r[a]=t-n[s+1-a],o[a]=n[s+a]-t;let l=0;for(let c=0;c<a;++c){let h=o[c+1],d=r[a-c],u=i[c]/(h+d);i[c]=l+h*u,l=d*u}i[a]=l}return i}function Np(s,t,e,n){let i=Lp(s,n,t),r=zb(i,n,s,t),o=new ce(0,0,0,0);for(let a=0;a<=s;++a){let l=e[i-s+a],c=r[a],h=l.w*c;o.x+=l.x*h,o.y+=l.y*h,o.z+=l.z*h,o.w+=l.w*c}return o}function kb(s,t,e,n,i){let r=[];for(let d=0;d<=e;++d)r[d]=0;let o=[];for(let d=0;d<=n;++d)o[d]=r.slice(0);let a=[];for(let d=0;d<=e;++d)a[d]=r.slice(0);a[0][0]=1;let l=r.slice(0),c=r.slice(0);for(let d=1;d<=e;++d){l[d]=t-i[s+1-d],c[d]=i[s+d]-t;let u=0;for(let f=0;f<d;++f){let g=c[f+1],v=l[d-f];a[d][f]=g+v;let p=a[f][d-1]/a[d][f];a[f][d]=u+g*p,u=v*p}a[d][d]=u}for(let d=0;d<=e;++d)o[0][d]=a[d][e];for(let d=0;d<=e;++d){let u=0,f=1,g=[];for(let v=0;v<=e;++v)g[v]=r.slice(0);g[0][0]=1;for(let v=1;v<=n;++v){let p=0,m=d-v,x=e-v;d>=v&&(g[f][0]=g[u][0]/a[x+1][m],p=g[f][0]*a[m][x]);let y=m>=-1?1:-m,M=d-1<=x?v-1:e-d;for(let T=y;T<=M;++T)g[f][T]=(g[u][T]-g[u][T-1])/a[x+1][m+T],p+=g[f][T]*a[m+T][x];d<=x&&(g[f][v]=-g[u][v-1]/a[x+1][d],p+=g[f][v]*a[d][x]),o[v][d]=p;let P=u;u=f,f=P}}let h=e;for(let d=1;d<=n;++d){for(let u=0;u<=e;++u)o[d][u]*=h;h*=e-d}return o}function Vb(s,t,e,n,i){let r=i<s?i:s,o=[],a=Lp(s,n,t),l=kb(a,n,s,r,t),c=[];for(let h=0;h<e.length;++h){let d=e[h].clone(),u=d.w;d.x*=u,d.y*=u,d.z*=u,c[h]=d}for(let h=0;h<=r;++h){let d=c[a-s].clone().multiplyScalar(l[h][0]);for(let u=1;u<=s;++u)d.add(c[a-s+u].clone().multiplyScalar(l[h][u]));o[h]=d}for(let h=r+1;h<=i+1;++h)o[h]=new ce(0,0,0);return o}function Hb(s,t){let e=1;for(let i=2;i<=s;++i)e*=i;let n=1;for(let i=2;i<=t;++i)n*=i;for(let i=2;i<=s-t;++i)n*=i;return e/n}function Gb(s){let t=s.length,e=[],n=[];for(let r=0;r<t;++r){let o=s[r];e[r]=new H(o.x,o.y,o.z),n[r]=o.w}let i=[];for(let r=0;r<t;++r){let o=e[r].clone();for(let a=1;a<=r;++a)o.sub(i[r-a].clone().multiplyScalar(Hb(r,a)*n[a]));i[r]=o.divideScalar(n[0])}return i}function Dp(s,t,e,n,i){let r=Vb(s,t,e,n,i);return Gb(r)}var Fp=Ie(()=>{xn()});var sl,Up=Ie(()=>{xn();Fp();sl=class extends ma{constructor(t,e,n,i,r){super(),this.degree=t,this.knots=e,this.controlPoints=[],this.startKnot=i||0,this.endKnot=r||this.knots.length-1;for(let o=0;o<n.length;++o){let a=n[o];this.controlPoints[o]=new ce(a.x,a.y,a.z,a.w)}}getPoint(t,e=new H){let n=e,i=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),r=Np(this.degree,this.knots,this.controlPoints,i);return r.w!==1&&r.divideScalar(r.w),n.set(r.x,r.y,r.z)}getTangent(t,e=new H){let n=e,i=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),r=Dp(this.degree,this.knots,this.controlPoints,i,1);return n.copy(r[1]).normalize(),n}}});function Xb(s){let t="Kaydara FBX Binary  \0";return s.byteLength>=t.length&&t===kp(s,0,t.length)}function qb(s){let t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],e=0;function n(i){let r=s[i-1];return s=s.slice(e+i),e++,r}for(let i=0;i<t.length;++i)if(n(1)===t[i])return!1;return!0}function Bp(s){let t=/FBXVersion: (\d+)/,e=s.match(t);if(e)return parseInt(e[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Yb(s){return s/46186158e3}function rl(s,t,e,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=s;break;case"ByPolygon":i=t;break;case"ByVertice":i=e;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);let r=i*n.dataSize,o=r+n.dataSize;return jb(Zb,n.buffer,r,o)}function Op(s){let t=new Ut,e=new Ut,n=new Ut,i=new Ut,r=new Ut,o=new Ut,a=new Ut,l=new Ut,c=new Ut,h=new Ut,d=new Ut,u=new Ut,f=s.inheritType?s.inheritType:0;if(s.translation&&t.setPosition(wr.fromArray(s.translation)),s.preRotation){let E=s.preRotation.map(ke.degToRad);E.push(s.eulerOrder||yn.DEFAULT_ORDER),e.makeRotationFromEuler(Gh.fromArray(E))}if(s.rotation){let E=s.rotation.map(ke.degToRad);E.push(s.eulerOrder||yn.DEFAULT_ORDER),n.makeRotationFromEuler(Gh.fromArray(E))}if(s.postRotation){let E=s.postRotation.map(ke.degToRad);E.push(s.eulerOrder||yn.DEFAULT_ORDER),i.makeRotationFromEuler(Gh.fromArray(E)),i.invert()}s.scale&&r.scale(wr.fromArray(s.scale)),s.scalingOffset&&a.setPosition(wr.fromArray(s.scalingOffset)),s.scalingPivot&&o.setPosition(wr.fromArray(s.scalingPivot)),s.rotationOffset&&l.setPosition(wr.fromArray(s.rotationOffset)),s.rotationPivot&&c.setPosition(wr.fromArray(s.rotationPivot)),s.parentMatrixWorld&&(d.copy(s.parentMatrix),h.copy(s.parentMatrixWorld));let g=e.clone().multiply(n).multiply(i),v=new Ut;v.extractRotation(h);let p=new Ut;p.copyPosition(h);let m=p.clone().invert().multiply(h),x=v.clone().invert().multiply(m),y=r,M=new Ut;if(f===0)M.copy(v).multiply(g).multiply(x).multiply(y);else if(f===1)M.copy(v).multiply(x).multiply(g).multiply(y);else{let V=new Ut().scale(new H().setFromMatrixScale(d)).clone().invert(),q=x.clone().multiply(V);M.copy(v).multiply(g).multiply(q).multiply(y)}let P=c.clone().invert(),T=o.clone().invert(),R=t.clone().multiply(l).multiply(c).multiply(e).multiply(n).multiply(i).multiply(P).multiply(a).multiply(o).multiply(r).multiply(T),G=new Ut().copyPosition(R),b=h.clone().multiply(G);return u.copyPosition(b),R=u.clone().multiply(M),R.premultiply(h.invert()),R}function zp(s){s=s||0;let t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return s===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[s]}function Wh(s){return s.split(",").map(function(e){return parseFloat(e)})}function kp(s,t,e){return t===void 0&&(t=0),e===void 0&&(e=s.byteLength),new TextDecoder().decode(new Uint8Array(s,t,e))}function $b(s,t){for(let e=0,n=s.length,i=t.length;e<i;e++,n++)s[n]=t[e]}function jb(s,t,e,n){for(let i=e,r=0;i<n;i++,r++)s[r]=t[i];return s}var oe,Ue,_n,ol,Xh,qh,Yh,Zh,$h,al,ll,Zb,Gh,wr,Vp=Ie(()=>{xn();Hh();Up();ol=class extends Xn{constructor(t){super(t)}load(t,e,n,i){let r=this,o=r.path===""?Ta.extractUrlBase(t):r.path,a=new qr(this.manager);a.setPath(r.path),a.setResponseType("arraybuffer"),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(l){try{e(r.parse(l,o))}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t,e){if(Xb(t))oe=new $h().parse(t);else{let i=kp(t);if(!qb(i))throw new Error("THREE.FBXLoader: Unknown format.");if(Bp(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Bp(i));oe=new Zh().parse(i)}let n=new Ea(this.manager).setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);return new Xh(n,this.manager).parse(oe)}},Xh=class{constructor(t,e){this.textureLoader=t,this.manager=e}parse(){Ue=this.parseConnections();let t=this.parseImages(),e=this.parseTextures(t),n=this.parseMaterials(e),i=this.parseDeformers(),r=new qh().parse(i);return this.parseScene(i,r,n),_n}parseConnections(){let t=new Map;return"Connections"in oe&&oe.Connections.connections.forEach(function(n){let i=n[0],r=n[1],o=n[2];t.has(i)||t.set(i,{parents:[],children:[]});let a={ID:r,relationship:o};t.get(i).parents.push(a),t.has(r)||t.set(r,{parents:[],children:[]});let l={ID:i,relationship:o};t.get(r).children.push(l)}),t}parseImages(){let t={},e={};if("Video"in oe.Objects){let n=oe.Objects.Video;for(let i in n){let r=n[i],o=parseInt(i);if(t[o]=r.RelativeFilename||r.Filename,"Content"in r){let a=r.Content instanceof ArrayBuffer&&r.Content.byteLength>0,l=typeof r.Content=="string"&&r.Content!=="";if(a||l){let c=this.parseImage(n[i]);e[r.RelativeFilename||r.Filename]=c}}}}for(let n in t){let i=t[n];e[i]!==void 0?t[n]=e[i]:t[n]=t[n].split("\\").pop()}return t}parseImage(t){let e=t.Content,n=t.RelativeFilename||t.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase(),r;switch(i){case"bmp":r="image/bmp";break;case"jpg":case"jpeg":r="image/jpeg";break;case"png":r="image/png";break;case"tif":r="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),r="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof e=="string")return"data:"+r+";base64,"+e;{let o=new Uint8Array(e);return window.URL.createObjectURL(new Blob([o],{type:r}))}}parseTextures(t){let e=new Map;if("Texture"in oe.Objects){let n=oe.Objects.Texture;for(let i in n){let r=this.parseTexture(n[i],t);e.set(parseInt(i),r)}}return e}parseTexture(t,e){let n=this.loadTexture(t,e);n.ID=t.id,n.name=t.attrName;let i=t.WrapModeU,r=t.WrapModeV,o=i!==void 0?i.value:0,a=r!==void 0?r.value:0;if(n.wrapS=o===0?xi:dn,n.wrapT=a===0?xi:dn,"Scaling"in t){let l=t.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in t){let l=t.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(t,e){let n,i=this.textureLoader.path,r=Ue.get(t.id).children;r!==void 0&&r.length>0&&e[r[0].ID]!==void 0&&(n=e[r[0].ID],(n.indexOf("blob:")===0||n.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let o,a=t.FileName.slice(-3).toLowerCase();if(a==="tga"){let l=this.manager.getHandler(".tga");l===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",t.RelativeFilename),o=new je):(l.setPath(this.textureLoader.path),o=l.load(n))}else if(a==="dds"){let l=this.manager.getHandler(".dds");l===null?(console.warn("FBXLoader: DDS loader not found, creating placeholder texture for",t.RelativeFilename),o=new je):(l.setPath(this.textureLoader.path),o=l.load(n))}else a==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",t.RelativeFilename),o=new je):o=this.textureLoader.load(n);return this.textureLoader.setPath(i),o}parseMaterials(t){let e=new Map;if("Material"in oe.Objects){let n=oe.Objects.Material;for(let i in n){let r=this.parseMaterial(n[i],t);r!==null&&e.set(parseInt(i),r)}}return e}parseMaterial(t,e){let n=t.id,i=t.attrName,r=t.ShadingModel;if(typeof r=="object"&&(r=r.value),!Ue.has(n))return null;let o=this.parseParameters(t,e,n),a;switch(r.toLowerCase()){case"phong":a=new hr;break;case"lambert":a=new _a;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',r),a=new hr;break}return a.setValues(o),a.name=i,a}parseParameters(t,e,n){let i={};t.BumpFactor&&(i.bumpScale=t.BumpFactor.value),t.Diffuse?i.color=new zt().fromArray(t.Diffuse.value).convertSRGBToLinear():t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(i.color=new zt().fromArray(t.DiffuseColor.value).convertSRGBToLinear()),t.DisplacementFactor&&(i.displacementScale=t.DisplacementFactor.value),t.Emissive?i.emissive=new zt().fromArray(t.Emissive.value).convertSRGBToLinear():t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(i.emissive=new zt().fromArray(t.EmissiveColor.value).convertSRGBToLinear()),t.EmissiveFactor&&(i.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),t.Opacity&&(i.opacity=parseFloat(t.Opacity.value)),i.opacity<1&&(i.transparent=!0),t.ReflectionFactor&&(i.reflectivity=t.ReflectionFactor.value),t.Shininess&&(i.shininess=t.Shininess.value),t.Specular?i.specular=new zt().fromArray(t.Specular.value).convertSRGBToLinear():t.SpecularColor&&t.SpecularColor.type==="Color"&&(i.specular=new zt().fromArray(t.SpecularColor.value).convertSRGBToLinear());let r=this;return Ue.get(n).children.forEach(function(o){let a=o.relationship;switch(a){case"Bump":i.bumpMap=r.getTexture(e,o.ID);break;case"Maya|TEX_ao_map":i.aoMap=r.getTexture(e,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=r.getTexture(e,o.ID),i.map!==void 0&&(i.map.colorSpace=Ee);break;case"DisplacementColor":i.displacementMap=r.getTexture(e,o.ID);break;case"EmissiveColor":i.emissiveMap=r.getTexture(e,o.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=Ee);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=r.getTexture(e,o.ID);break;case"ReflectionColor":i.envMap=r.getTexture(e,o.ID),i.envMap!==void 0&&(i.envMap.mapping=Ur,i.envMap.colorSpace=Ee);break;case"SpecularColor":i.specularMap=r.getTexture(e,o.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=Ee);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=r.getTexture(e,o.ID),i.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(t,e){return"LayeredTexture"in oe.Objects&&e in oe.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),e=Ue.get(e).children[0].ID),t.get(e)}parseDeformers(){let t={},e={};if("Deformer"in oe.Objects){let n=oe.Objects.Deformer;for(let i in n){let r=n[i],o=Ue.get(parseInt(i));if(r.attrType==="Skin"){let a=this.parseSkeleton(o,n);a.ID=i,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,t[i]=a}else if(r.attrType==="BlendShape"){let a={id:i};a.rawTargets=this.parseMorphTargets(o,n),a.id=i,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),e[i]=a}}}return{skeletons:t,morphTargets:e}}parseSkeleton(t,e){let n=[];return t.children.forEach(function(i){let r=e[i.ID];if(r.attrType!=="Cluster")return;let o={ID:i.ID,indices:[],weights:[],transformLink:new Ut().fromArray(r.TransformLink.a)};"Indexes"in r&&(o.indices=r.Indexes.a,o.weights=r.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(t,e){let n=[];for(let i=0;i<t.children.length;i++){let r=t.children[i],o=e[r.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=Ue.get(parseInt(r.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(t,e,n){_n=new vi;let i=this.parseModels(t.skeletons,e,n),r=oe.Objects.Model,o=this;i.forEach(function(l){let c=r[l.ID];o.setLookAtProperties(l,c),Ue.get(l.ID).parents.forEach(function(d){let u=i.get(d.ID);u!==void 0&&u.add(l)}),l.parent===null&&_n.add(l)}),this.bindSkeleton(t.skeletons,e,i),this.addGlobalSceneSettings(),_n.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);let c=Op(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});let a=new Yh().parse();_n.children.length===1&&_n.children[0].isGroup&&(_n.children[0].animations=a,_n=_n.children[0]),_n.animations=a}parseModels(t,e,n){let i=new Map,r=oe.Objects.Model;for(let o in r){let a=parseInt(o),l=r[o],c=Ue.get(a),h=this.buildSkeleton(c,t,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,e,n);break;case"NurbsCurve":h=this.createCurve(c,e);break;case"LimbNode":case"Root":h=new lr;break;case"Null":default:h=new vi;break}h.name=l.attrName?ge.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),i.set(a,h)}return i}buildSkeleton(t,e,n,i){let r=null;return t.parents.forEach(function(o){for(let a in e){let l=e[a];l.rawBones.forEach(function(c,h){if(c.ID===o.ID){let d=r;r=new lr,r.matrixWorld.copy(c.transformLink),r.name=i?ge.sanitizeNodeName(i):"",r.userData.originalName=i,r.ID=n,l.bones[h]=r,d!==null&&r.add(d)}})}}),r}createCamera(t){let e,n;if(t.children.forEach(function(i){let r=oe.Objects.NodeAttribute[i.ID];r!==void 0&&(n=r)}),n===void 0)e=new De;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let r=1;n.NearPlane!==void 0&&(r=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);let c=a/l,h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);let d=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:e=new Ve(h,c,r,o),d!==null&&e.setFocalLength(d);break;case 1:e=new Hi(-a/2,a/2,l/2,-l/2,r,o);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),e=new De;break}}return e}createLight(t){let e,n;if(t.children.forEach(function(i){let r=oe.Objects.NodeAttribute[i.ID];r!==void 0&&(n=r)}),n===void 0)e=new De;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let r=16777215;n.Color!==void 0&&(r=new zt().fromArray(n.Color.value).convertSRGBToLinear());let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);let l=1;switch(i){case 0:e=new Zr(r,o,a,l);break;case 1:e=new ms(r,o);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=ke.degToRad(n.InnerAngle.value));let h=0;n.OuterAngle!==void 0&&(h=ke.degToRad(n.OuterAngle.value),h=Math.max(h,1)),e=new Aa(r,o,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),e=new Zr(r,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(e.castShadow=!0)}return e}createMesh(t,e,n){let i,r=null,o=null,a=[];return t.children.forEach(function(l){e.has(l.ID)&&(r=e.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new hr({name:Xn.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in r.attributes&&a.forEach(function(l){l.vertexColors=!0}),r.FBX_Deformer?(i=new ua(r,o),i.normalizeSkinWeights()):i=new Fe(r,o),i}createCurve(t,e){let n=t.children.reduce(function(r,o){return e.has(o.ID)&&(r=e.get(o.ID)),r},null),i=new Hr({name:Xn.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new fa(n,i)}getTransformData(t,e){let n={};"InheritType"in e&&(n.inheritType=parseInt(e.InheritType.value)),"RotationOrder"in e?n.eulerOrder=zp(e.RotationOrder.value):n.eulerOrder="ZYX","Lcl_Translation"in e&&(n.translation=e.Lcl_Translation.value),"PreRotation"in e&&(n.preRotation=e.PreRotation.value),"Lcl_Rotation"in e&&(n.rotation=e.Lcl_Rotation.value),"PostRotation"in e&&(n.postRotation=e.PostRotation.value),"Lcl_Scaling"in e&&(n.scale=e.Lcl_Scaling.value),"ScalingOffset"in e&&(n.scalingOffset=e.ScalingOffset.value),"ScalingPivot"in e&&(n.scalingPivot=e.ScalingPivot.value),"RotationOffset"in e&&(n.rotationOffset=e.RotationOffset.value),"RotationPivot"in e&&(n.rotationPivot=e.RotationPivot.value),t.userData.transformData=n}setLookAtProperties(t,e){"LookAtProperty"in e&&Ue.get(t.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){let r=oe.Objects.Model[i.ID];if("Lcl_Translation"in r){let o=r.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(o),_n.add(t.target)):t.lookAt(new H().fromArray(o))}}})}bindSkeleton(t,e,n){let i=this.parsePoseNodes();for(let r in t){let o=t[r];Ue.get(parseInt(o.ID)).parents.forEach(function(l){if(e.has(l.ID)){let c=l.ID;Ue.get(c).parents.forEach(function(d){n.has(d.ID)&&n.get(d.ID).bind(new da(o.bones),i[d.ID])})}})}}parsePoseNodes(){let t={};if("Pose"in oe.Objects){let e=oe.Objects.Pose;for(let n in e)if(e[n].attrType==="BindPose"&&e[n].NbPoseNodes>0){let i=e[n].PoseNode;Array.isArray(i)?i.forEach(function(r){t[r.Node]=new Ut().fromArray(r.Matrix.a)}):t[i.Node]=new Ut().fromArray(i.Matrix.a)}}return t}addGlobalSceneSettings(){if("GlobalSettings"in oe){if("AmbientColor"in oe.GlobalSettings){let t=oe.GlobalSettings.AmbientColor.value,e=t[0],n=t[1],i=t[2];if(e!==0||n!==0||i!==0){let r=new zt(e,n,i).convertSRGBToLinear();_n.add(new fr(r,1))}}"UnitScaleFactor"in oe.GlobalSettings&&(_n.userData.unitScaleFactor=oe.GlobalSettings.UnitScaleFactor.value)}}},qh=class{constructor(){this.negativeMaterialIndices=!1}parse(t){let e=new Map;if("Geometry"in oe.Objects){let n=oe.Objects.Geometry;for(let i in n){let r=Ue.get(parseInt(i)),o=this.parseGeometry(r,n[i],t);e.set(parseInt(i),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),e}parseGeometry(t,e,n){switch(e.attrType){case"Mesh":return this.parseMeshGeometry(t,e,n);case"NurbsCurve":return this.parseNurbsGeometry(e)}}parseMeshGeometry(t,e,n){let i=n.skeletons,r=[],o=t.parents.map(function(d){return oe.Objects.Model[d.ID]});if(o.length===0)return;let a=t.children.reduce(function(d,u){return i[u.ID]!==void 0&&(d=i[u.ID]),d},null);t.children.forEach(function(d){n.morphTargets[d.ID]!==void 0&&r.push(n.morphTargets[d.ID])});let l=o[0],c={};"RotationOrder"in l&&(c.eulerOrder=zp(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);let h=Op(c);return this.genGeometry(e,a,r,h)}genGeometry(t,e,n,i){let r=new on;t.attrName&&(r.name=t.attrName);let o=this.parseGeoNode(t,e),a=this.genBuffers(o),l=new Ne(a.vertex,3);if(l.applyMatrix4(i),r.setAttribute("position",l),a.colors.length>0&&r.setAttribute("color",new Ne(a.colors,3)),e&&(r.setAttribute("skinIndex",new sr(a.weightsIndices,4)),r.setAttribute("skinWeight",new Ne(a.vertexWeights,4)),r.FBX_Deformer=e),a.normal.length>0){let c=new re().getNormalMatrix(i),h=new Ne(a.normal,3);h.applyNormalMatrix(c),r.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){let d=h===0?"uv":`uv${h}`;r.setAttribute(d,new Ne(a.uvs[h],2))}),o.material&&o.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(d,u){d!==c&&(r.addGroup(h,u-h,c),c=d,h=u)}),r.groups.length>0){let d=r.groups[r.groups.length-1],u=d.start+d.count;u!==a.materialIndex.length&&r.addGroup(u,a.materialIndex.length-u,c)}r.groups.length===0&&r.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(r,t,n,i),r}parseGeoNode(t,e){let n={};if(n.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],n.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&(n.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(n.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(n.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){n.uv=[];let i=0;for(;t.LayerElementUV[i];)t.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(t.LayerElementUV[i])),i++}return n.weightTable={},e!==null&&(n.skeleton=e,e.rawBones.forEach(function(i,r){i.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:r,weight:i.weights[a]})})})),n}genBuffers(t){let e={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]},n=0,i=0,r=!1,o=[],a=[],l=[],c=[],h=[],d=[],u=this;return t.vertexIndices.forEach(function(f,g){let v,p=!1;f<0&&(f=f^-1,p=!0);let m=[],x=[];if(o.push(f*3,f*3+1,f*3+2),t.color){let y=rl(g,n,f,t.color);l.push(y[0],y[1],y[2])}if(t.skeleton){if(t.weightTable[f]!==void 0&&t.weightTable[f].forEach(function(y){x.push(y.weight),m.push(y.id)}),x.length>4){r||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),r=!0);let y=[0,0,0,0],M=[0,0,0,0];x.forEach(function(P,T){let R=P,G=m[T];M.forEach(function(b,E,V){if(R>b){V[E]=R,R=b;let q=y[E];y[E]=G,G=q}})}),m=y,x=M}for(;x.length<4;)x.push(0),m.push(0);for(let y=0;y<4;++y)h.push(x[y]),d.push(m[y])}if(t.normal){let y=rl(g,n,f,t.normal);a.push(y[0],y[1],y[2])}t.material&&t.material.mappingType!=="AllSame"&&(v=rl(g,n,f,t.material)[0],v<0&&(u.negativeMaterialIndices=!0,v=0)),t.uv&&t.uv.forEach(function(y,M){let P=rl(g,n,f,y);c[M]===void 0&&(c[M]=[]),c[M].push(P[0]),c[M].push(P[1])}),i++,p&&(u.genFace(e,t,o,v,a,l,c,h,d,i),n++,i=0,o=[],a=[],l=[],c=[],h=[],d=[])}),e}getNormalNewell(t){let e=new H(0,0,0);for(let n=0;n<t.length;n++){let i=t[n],r=t[(n+1)%t.length];e.x+=(i.y-r.y)*(i.z+r.z),e.y+=(i.z-r.z)*(i.x+r.x),e.z+=(i.x-r.x)*(i.y+r.y)}return e.normalize(),e}getNormalTangentAndBitangent(t){let e=this.getNormalNewell(t),i=(Math.abs(e.z)>.5?new H(0,1,0):new H(0,0,1)).cross(e).normalize(),r=e.clone().cross(i).normalize();return{normal:e,tangent:i,bitangent:r}}flattenVertex(t,e,n){return new jt(t.dot(e),t.dot(n))}genFace(t,e,n,i,r,o,a,l,c,h){let d;if(h>3){let u=[];for(let p=0;p<n.length;p+=3)u.push(new H(e.vertexPositions[n[p]],e.vertexPositions[n[p+1]],e.vertexPositions[n[p+2]]));let{tangent:f,bitangent:g}=this.getNormalTangentAndBitangent(u),v=[];for(let p of u)v.push(this.flattenVertex(p,f,g));d=ga.triangulateShape(v,[])}else d=[[0,1,2]];for(let[u,f,g]of d)t.vertex.push(e.vertexPositions[n[u*3]]),t.vertex.push(e.vertexPositions[n[u*3+1]]),t.vertex.push(e.vertexPositions[n[u*3+2]]),t.vertex.push(e.vertexPositions[n[f*3]]),t.vertex.push(e.vertexPositions[n[f*3+1]]),t.vertex.push(e.vertexPositions[n[f*3+2]]),t.vertex.push(e.vertexPositions[n[g*3]]),t.vertex.push(e.vertexPositions[n[g*3+1]]),t.vertex.push(e.vertexPositions[n[g*3+2]]),e.skeleton&&(t.vertexWeights.push(l[u*4]),t.vertexWeights.push(l[u*4+1]),t.vertexWeights.push(l[u*4+2]),t.vertexWeights.push(l[u*4+3]),t.vertexWeights.push(l[f*4]),t.vertexWeights.push(l[f*4+1]),t.vertexWeights.push(l[f*4+2]),t.vertexWeights.push(l[f*4+3]),t.vertexWeights.push(l[g*4]),t.vertexWeights.push(l[g*4+1]),t.vertexWeights.push(l[g*4+2]),t.vertexWeights.push(l[g*4+3]),t.weightsIndices.push(c[u*4]),t.weightsIndices.push(c[u*4+1]),t.weightsIndices.push(c[u*4+2]),t.weightsIndices.push(c[u*4+3]),t.weightsIndices.push(c[f*4]),t.weightsIndices.push(c[f*4+1]),t.weightsIndices.push(c[f*4+2]),t.weightsIndices.push(c[f*4+3]),t.weightsIndices.push(c[g*4]),t.weightsIndices.push(c[g*4+1]),t.weightsIndices.push(c[g*4+2]),t.weightsIndices.push(c[g*4+3])),e.color&&(t.colors.push(o[u*3]),t.colors.push(o[u*3+1]),t.colors.push(o[u*3+2]),t.colors.push(o[f*3]),t.colors.push(o[f*3+1]),t.colors.push(o[f*3+2]),t.colors.push(o[g*3]),t.colors.push(o[g*3+1]),t.colors.push(o[g*3+2])),e.material&&e.material.mappingType!=="AllSame"&&(t.materialIndex.push(i),t.materialIndex.push(i),t.materialIndex.push(i)),e.normal&&(t.normal.push(r[u*3]),t.normal.push(r[u*3+1]),t.normal.push(r[u*3+2]),t.normal.push(r[f*3]),t.normal.push(r[f*3+1]),t.normal.push(r[f*3+2]),t.normal.push(r[g*3]),t.normal.push(r[g*3+1]),t.normal.push(r[g*3+2])),e.uv&&e.uv.forEach(function(v,p){t.uvs[p]===void 0&&(t.uvs[p]=[]),t.uvs[p].push(a[p][u*2]),t.uvs[p].push(a[p][u*2+1]),t.uvs[p].push(a[p][f*2]),t.uvs[p].push(a[p][f*2+1]),t.uvs[p].push(a[p][g*2]),t.uvs[p].push(a[p][g*2+1])})}addMorphTargets(t,e,n,i){if(n.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];let r=this;n.forEach(function(o){o.rawTargets.forEach(function(a){let l=oe.Objects.Geometry[a.geoID];l!==void 0&&r.genMorphGeometry(t,e,l,i,a.name)})})}genMorphGeometry(t,e,n,i,r){let o=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],a=n.Vertices!==void 0?n.Vertices.a:[],l=n.Indexes!==void 0?n.Indexes.a:[],c=t.attributes.position.count*3,h=new Float32Array(c);for(let g=0;g<l.length;g++){let v=l[g]*3;h[v]=a[g*3],h[v+1]=a[g*3+1],h[v+2]=a[g*3+2]}let d={vertexIndices:o,vertexPositions:h},u=this.genBuffers(d),f=new Ne(u.vertex,3);f.name=r||n.attrName,f.applyMatrix4(i),t.morphAttributes.position.push(f)}parseNormals(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Normals.a,r=[];return n==="IndexToDirect"&&("NormalIndex"in t?r=t.NormalIndex.a:"NormalsIndex"in t&&(r=t.NormalsIndex.a)),{dataSize:3,buffer:i,indices:r,mappingType:e,referenceType:n}}parseUVs(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.UV.a,r=[];return n==="IndexToDirect"&&(r=t.UVIndex.a),{dataSize:2,buffer:i,indices:r,mappingType:e,referenceType:n}}parseVertexColors(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Colors.a,r=[];n==="IndexToDirect"&&(r=t.ColorIndex.a);for(let o=0,a=new zt;o<i.length;o+=4)a.fromArray(i,o).convertSRGBToLinear().toArray(i,o);return{dataSize:4,buffer:i,indices:r,mappingType:e,referenceType:n}}parseMaterialIndices(t){let e=t.MappingInformationType,n=t.ReferenceInformationType;if(e==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};let i=t.Materials.a,r=[];for(let o=0;o<i.length;++o)r.push(o);return{dataSize:1,buffer:i,indices:r,mappingType:e,referenceType:n}}parseNurbsGeometry(t){let e=parseInt(t.Order);if(isNaN(e))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new on;let n=e-1,i=t.KnotVector.a,r=[],o=t.Points.a;for(let d=0,u=o.length;d<u;d+=4)r.push(new ce().fromArray(o,d));let a,l;if(t.Form==="Closed")r.push(r[0]);else if(t.Form==="Periodic"){a=n,l=i.length-1-a;for(let d=0;d<n;++d)r.push(r[d])}let h=new sl(n,i,r,a,l).getPoints(r.length*12);return new on().setFromPoints(h)}},Yh=class{parse(){let t=[],e=this.parseClips();if(e!==void 0)for(let n in e){let i=e[n],r=this.addClip(i);t.push(r)}return t}parseClips(){if(oe.Objects.AnimationCurve===void 0)return;let t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);let e=this.parseAnimationLayers(t);return this.parseAnimStacks(e)}parseAnimationCurveNodes(){let t=oe.Objects.AnimationCurveNode,e=new Map;for(let n in t){let i=t[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){let r={id:i.id,attr:i.attrName,curves:{}};e.set(r.id,r)}}return e}parseAnimationCurves(t){let e=oe.Objects.AnimationCurve;for(let n in e){let i={id:e[n].id,times:e[n].KeyTime.a.map(Yb),values:e[n].KeyValueFloat.a},r=Ue.get(i.id);if(r!==void 0){let o=r.parents[0].ID,a=r.parents[0].relationship;a.match(/X/)?t.get(o).curves.x=i:a.match(/Y/)?t.get(o).curves.y=i:a.match(/Z/)?t.get(o).curves.z=i:a.match(/DeformPercent/)&&t.has(o)&&(t.get(o).curves.morph=i)}}}parseAnimationLayers(t){let e=oe.Objects.AnimationLayer,n=new Map;for(let i in e){let r=[],o=Ue.get(parseInt(i));o!==void 0&&(o.children.forEach(function(l,c){if(t.has(l.ID)){let h=t.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(r[c]===void 0){let d=Ue.get(l.ID).parents.filter(function(u){return u.relationship!==void 0})[0].ID;if(d!==void 0){let u=oe.Objects.Model[d.toString()];if(u===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}let f={modelName:u.attrName?ge.sanitizeNodeName(u.attrName):"",ID:u.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};_n.traverse(function(g){g.ID===u.id&&(f.transform=g.matrix,g.userData.transformData&&(f.eulerOrder=g.userData.transformData.eulerOrder))}),f.transform||(f.transform=new Ut),"PreRotation"in u&&(f.preRotation=u.PreRotation.value),"PostRotation"in u&&(f.postRotation=u.PostRotation.value),r[c]=f}}r[c]&&(r[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(r[c]===void 0){let d=Ue.get(l.ID).parents.filter(function(m){return m.relationship!==void 0})[0].ID,u=Ue.get(d).parents[0].ID,f=Ue.get(u).parents[0].ID,g=Ue.get(f).parents[0].ID,v=oe.Objects.Model[g],p={modelName:v.attrName?ge.sanitizeNodeName(v.attrName):"",morphName:oe.Objects.Deformer[d].attrName};r[c]=p}r[c][h.attr]=h}}}),n.set(parseInt(i),r))}return n}parseAnimStacks(t){let e=oe.Objects.AnimationStack,n={};for(let i in e){let r=Ue.get(parseInt(i)).children;r.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");let o=t.get(r[0].ID);n[i]={name:e[i].attrName,layer:o}}return n}addClip(t){let e=[],n=this;return t.layer.forEach(function(i){e=e.concat(n.generateTracks(i))}),new Ma(t.name,-1,e)}generateTracks(t){let e=[],n=new H,i=new H;if(t.transform&&t.transform.decompose(n,new He,i),n=n.toArray(),i=i.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.T.curves,n,"position");r!==void 0&&e.push(r)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){let r=this.generateRotationTrack(t.modelName,t.R.curves,t.preRotation,t.postRotation,t.eulerOrder);r!==void 0&&e.push(r)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.S.curves,i,"scale");r!==void 0&&e.push(r)}if(t.DeformPercent!==void 0){let r=this.generateMorphTrack(t);r!==void 0&&e.push(r)}return e}generateVectorTrack(t,e,n,i){let r=this.getTimesForAllAxes(e),o=this.getKeyframeTrackValues(r,e,n);return new qi(t+"."+i,r,o)}generateRotationTrack(t,e,n,i,r){let o,a;if(e.x!==void 0&&e.y!==void 0&&e.z!==void 0){let d=this.interpolateRotations(e.x,e.y,e.z,r);o=d[0],a=d[1]}n!==void 0&&(n=n.map(ke.degToRad),n.push(r),n=new yn().fromArray(n),n=new He().setFromEuler(n)),i!==void 0&&(i=i.map(ke.degToRad),i.push(r),i=new yn().fromArray(i),i=new He().setFromEuler(i).invert());let l=new He,c=new yn,h=[];if(!a||!o)return new ti(t+".quaternion",[],[]);for(let d=0;d<a.length;d+=3)c.set(a[d],a[d+1],a[d+2],r),l.setFromEuler(c),n!==void 0&&l.premultiply(n),i!==void 0&&l.multiply(i),d>2&&new He().fromArray(h,(d-3)/3*4).dot(l)<0&&l.set(-l.x,-l.y,-l.z,-l.w),l.toArray(h,d/3*4);return new ti(t+".quaternion",o,h)}generateMorphTrack(t){let e=t.DeformPercent.curves.morph,n=e.values.map(function(r){return r/100}),i=_n.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new Wi(t.modelName+".morphTargetInfluences["+i+"]",e.times,n)}getTimesForAllAxes(t){let e=[];if(t.x!==void 0&&(e=e.concat(t.x.times)),t.y!==void 0&&(e=e.concat(t.y.times)),t.z!==void 0&&(e=e.concat(t.z.times)),e=e.sort(function(n,i){return n-i}),e.length>1){let n=1,i=e[0];for(let r=1;r<e.length;r++){let o=e[r];o!==i&&(e[n]=o,i=o,n++)}e=e.slice(0,n)}return e}getKeyframeTrackValues(t,e,n){let i=n,r=[],o=-1,a=-1,l=-1;return t.forEach(function(c){if(e.x&&(o=e.x.times.indexOf(c)),e.y&&(a=e.y.times.indexOf(c)),e.z&&(l=e.z.times.indexOf(c)),o!==-1){let h=e.x.values[o];r.push(h),i[0]=h}else r.push(i[0]);if(a!==-1){let h=e.y.values[a];r.push(h),i[1]=h}else r.push(i[1]);if(l!==-1){let h=e.z.values[l];r.push(h),i[2]=h}else r.push(i[2])}),r}interpolateRotations(t,e,n,i){let r=[],o=[];r.push(t.times[0]),o.push(ke.degToRad(t.values[0])),o.push(ke.degToRad(e.values[0])),o.push(ke.degToRad(n.values[0]));for(let a=1;a<t.values.length;a++){let l=[t.values[a-1],e.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;let c=l.map(ke.degToRad),h=[t.values[a],e.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;let d=h.map(ke.degToRad),u=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],f=[Math.abs(u[0]),Math.abs(u[1]),Math.abs(u[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){let v=Math.max(...f)/180,p=new yn(...c,i),m=new yn(...d,i),x=new He().setFromEuler(p),y=new He().setFromEuler(m);x.dot(y)&&y.set(-y.x,-y.y,-y.z,-y.w);let M=t.times[a-1],P=t.times[a]-M,T=new He,R=new yn;for(let G=0;G<1;G+=1/v)T.copy(x.clone().slerp(y.clone(),G)),r.push(M+G*P),R.setFromQuaternion(T,i),o.push(R.x),o.push(R.y),o.push(R.z)}else r.push(t.times[a]),o.push(ke.degToRad(t.values[a])),o.push(ke.degToRad(e.values[a])),o.push(ke.degToRad(n.values[a]))}return[r,o]}},Zh=class{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,e){this.currentProp=t,this.currentPropName=e}parse(t){this.currentIndent=0,this.allNodes=new ll,this.nodeStack=[],this.currentProp=[],this.currentPropName="";let e=this,n=t.split(/[\r\n]+/);return n.forEach(function(i,r){let o=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(o||a)return;let l=i.match("^\\t{"+e.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+e.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=i.match("^\\t{"+(e.currentIndent-1)+"}}");l?e.parseNodeBegin(i,l):c?e.parseNodeProperty(i,c,n[++r]):h?e.popStack():i.match(/^[^\s\t}]/)&&e.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(t,e){let n=e[1].trim().replace(/^"/,"").replace(/"$/,""),i=e[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),r={name:n},o=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,r):n in a?(n==="PoseNode"?a.PoseNode.push(r):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=r)):typeof o.id=="number"?(a[n]={},a[n][o.id]=r):n!=="Properties70"&&(n==="PoseNode"?a[n]=[r]:a[n]=r),typeof o.id=="number"&&(r.id=o.id),o.name!==""&&(r.attrName=o.name),o.type!==""&&(r.attrType=o.type),this.pushStack(r)}parseNodeAttr(t){let e=t[0];t[0]!==""&&(e=parseInt(t[0]),isNaN(e)&&(e=t[0]));let n="",i="";return t.length>1&&(n=t[1].replace(/^(\w+)::/,""),i=t[2]),{id:e,name:n,type:i}}parseNodeProperty(t,e,n){let i=e[1].replace(/^"/,"").replace(/"$/,"").trim(),r=e[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&r===","&&(r=n.replace(/"/g,"").replace(/,$/,"").trim());let o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(t,i,r);return}if(i==="C"){let l=r.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]),d=r.split(",").slice(3);d=d.map(function(u){return u.trim().replace(/^"/,"")}),i="connections",r=[c,h],$b(r,d),o[i]===void 0&&(o[i]=[])}i==="Node"&&(o.id=r),i in o&&Array.isArray(o[i])?o[i].push(r):i!=="a"?o[i]=r:o.a=r,this.setCurrentProp(o,i),i==="a"&&r.slice(-1)!==","&&(o.a=Wh(r))}parseNodePropertyContinued(t){let e=this.getCurrentNode();e.a+=t,t.slice(-1)!==","&&(e.a=Wh(e.a))}parseNodeSpecialProperty(t,e,n){let i=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),r=i[0],o=i[1],a=i[2],l=i[3],c=i[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Wh(c);break}this.getPrevNode()[r]={type:o,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),r)}},$h=class{parse(t){let e=new al(t);e.skip(23);let n=e.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);let i=new ll;for(;!this.endOfContent(e);){let r=this.parseNode(e,n);r!==null&&i.add(r.name,r)}return i}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,e){let n={},i=e>=7500?t.getUint64():t.getUint32(),r=e>=7500?t.getUint64():t.getUint32();e>=7500?t.getUint64():t.getUint32();let o=t.getUint8(),a=t.getString(o);if(i===0)return null;let l=[];for(let u=0;u<r;u++)l.push(this.parseProperty(t));let c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",d=l.length>2?l[2]:"";for(n.singleProperty=r===1&&t.getOffset()===i;i>t.getOffset();){let u=this.parseNode(t,e);u!==null&&this.parseSubNode(a,n,u)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),d!==""&&(n.attrType=d),a!==""&&(n.name=a),n}parseSubNode(t,e,n){if(n.singleProperty===!0){let i=n.propertyList[0];Array.isArray(i)?(e[n.name]=n,n.a=i):e[n.name]=i}else if(t==="Connections"&&n.name==="C"){let i=[];n.propertyList.forEach(function(r,o){o!==0&&i.push(r)}),e.connections===void 0&&(e.connections=[]),e.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(r){e[r]=n[r]});else if(t==="Properties70"&&n.name==="P"){let i=n.propertyList[0],r=n.propertyList[1],o=n.propertyList[2],a=n.propertyList[3],l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),r==="Color"||r==="ColorRGB"||r==="Vector"||r==="Vector3D"||r.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],e[i]={type:r,type2:o,flag:a,value:l}}else e[n.name]===void 0?typeof n.id=="number"?(e[n.name]={},e[n.name][n.id]=n):e[n.name]=n:n.name==="PoseNode"?(Array.isArray(e[n.name])||(e[n.name]=[e[n.name]]),e[n.name].push(n)):e[n.name][n.id]===void 0&&(e[n.name][n.id]=n)}parseProperty(t){let e=t.getString(1),n;switch(e){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return n=t.getUint32(),t.getArrayBuffer(n);case"S":return n=t.getUint32(),t.getString(n);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":let i=t.getUint32(),r=t.getUint32(),o=t.getUint32();if(r===0)switch(e){case"b":case"c":return t.getBooleanArray(i);case"d":return t.getFloat64Array(i);case"f":return t.getFloat32Array(i);case"i":return t.getInt32Array(i);case"l":return t.getInt64Array(i)}let a=ws(new Uint8Array(t.getArrayBuffer(o))),l=new al(a.buffer);switch(e){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+e)}}},al=class{constructor(t,e){this.dv=new DataView(t),this.offset=0,this.littleEndian=e!==void 0?e:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){let e=[];for(let n=0;n<t;n++)e.push(this.getBoolean());return e}getUint8(){let t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){let t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){let t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt32());return e}getUint32(){let t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e&2147483648?(e=~e&4294967295,t=~t&4294967295,t===4294967295&&(e=e+1&4294967295),t=t+1&4294967295,-(e*4294967296+t)):e*4294967296+t}getInt64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt64());return e}getUint64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e*4294967296+t}getFloat32(){let t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat32());return e}getFloat64(){let t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat64());return e}getArrayBuffer(t){let e=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}getString(t){let e=this.offset,n=new Uint8Array(this.dv.buffer,e,t);this.skip(t);let i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,e,i)),this._textDecoder.decode(n)}},ll=class{add(t,e){this[t]=e}};Zb=[];Gh=new yn,wr=new H});var cl,Hp=Ie(()=>{xn();Hh();cl=class extends Sa{constructor(t){super(t),this.type=vn}parse(t){let b=Math.pow(2.7182818,2.2);function E(w,C){let O=0;for(let N=0;N<65536;++N)(N==0||w[N>>3]&1<<(N&7))&&(C[O++]=N);let _=O-1;for(;O<65536;)C[O++]=0;return _}function V(w){for(let C=0;C<16384;C++)w[C]={},w[C].len=0,w[C].lit=0,w[C].p=null}let q={l:0,c:0,lc:0};function W(w,C,O,_,N){for(;O<w;)C=C<<8|Lt(_,N),O+=8;O-=w,q.l=C>>O&(1<<w)-1,q.c=C,q.lc=O}let I=new Array(59);function F(w){for(let O=0;O<=58;++O)I[O]=0;for(let O=0;O<65537;++O)I[w[O]]+=1;let C=0;for(let O=58;O>0;--O){let _=C+I[O]>>1;I[O]=C,C=_}for(let O=0;O<65537;++O){let _=w[O];_>0&&(w[O]=_|I[_]++<<6)}}function z(w,C,O,_,N,D){let U=C,B=0,Q=0;for(;_<=N;_++){if(U.value-C.value>O)return!1;W(6,B,Q,w,U);let $=q.l;if(B=q.c,Q=q.lc,D[_]=$,$==63){if(U.value-C.value>O)throw new Error("Something wrong with hufUnpackEncTable");W(8,B,Q,w,U);let st=q.l+6;if(B=q.c,Q=q.lc,_+st>N+1)throw new Error("Something wrong with hufUnpackEncTable");for(;st--;)D[_++]=0;_--}else if($>=59){let st=$-59+2;if(_+st>N+1)throw new Error("Something wrong with hufUnpackEncTable");for(;st--;)D[_++]=0;_--}}F(D)}function et(w){return w&63}function Z(w){return w>>6}function Y(w,C,O,_){for(;C<=O;C++){let N=Z(w[C]),D=et(w[C]);if(N>>D)throw new Error("Invalid table entry");if(D>14){let U=_[N>>D-14];if(U.len)throw new Error("Invalid table entry");if(U.lit++,U.p){let B=U.p;U.p=new Array(U.lit);for(let Q=0;Q<U.lit-1;++Q)U.p[Q]=B[Q]}else U.p=new Array(1);U.p[U.lit-1]=C}else if(D){let U=0;for(let B=1<<14-D;B>0;B--){let Q=_[(N<<14-D)+U];if(Q.len||Q.p)throw new Error("Invalid table entry");Q.len=D,Q.lit=C,U++}}}return!0}let nt={c:0,lc:0};function rt(w,C,O,_){w=w<<8|Lt(O,_),C+=8,nt.c=w,nt.lc=C}let tt={c:0,lc:0};function J(w,C,O,_,N,D,U,B,Q){if(w==C){_<8&&(rt(O,_,N,D),O=nt.c,_=nt.lc),_-=8;let $=O>>_;if($=new Uint8Array([$])[0],B.value+$>Q)return!1;let st=U[B.value-1];for(;$-- >0;)U[B.value++]=st}else if(B.value<Q)U[B.value++]=w;else return!1;tt.c=O,tt.lc=_}function ot(w){return w&65535}function gt(w){let C=ot(w);return C>32767?C-65536:C}let pt={a:0,b:0};function vt(w,C){let O=gt(w),N=gt(C),D=O+(N&1)+(N>>1),U=D,B=D-N;pt.a=U,pt.b=B}function bt(w,C){let O=ot(w),_=ot(C),N=O-(_>>1)&65535,D=_+N-32768&65535;pt.a=D,pt.b=N}function it(w,C,O,_,N,D,U){let B=U<16384,Q=O>N?N:O,$=1,st,ct;for(;$<=Q;)$<<=1;for($>>=1,st=$,$>>=1;$>=1;){ct=0;let dt=ct+D*(N-st),mt=D*$,xt=D*st,_t=_*$,It=_*st,Bt,ue,Jt,Ht;for(;ct<=dt;ct+=xt){let me=ct,Ot=ct+_*(O-st);for(;me<=Ot;me+=It){let we=me+_t,pn=me+mt,Te=pn+_t;B?(vt(w[me+C],w[pn+C]),Bt=pt.a,Jt=pt.b,vt(w[we+C],w[Te+C]),ue=pt.a,Ht=pt.b,vt(Bt,ue),w[me+C]=pt.a,w[we+C]=pt.b,vt(Jt,Ht),w[pn+C]=pt.a,w[Te+C]=pt.b):(bt(w[me+C],w[pn+C]),Bt=pt.a,Jt=pt.b,bt(w[we+C],w[Te+C]),ue=pt.a,Ht=pt.b,bt(Bt,ue),w[me+C]=pt.a,w[we+C]=pt.b,bt(Jt,Ht),w[pn+C]=pt.a,w[Te+C]=pt.b)}if(O&$){let we=me+mt;B?vt(w[me+C],w[we+C]):bt(w[me+C],w[we+C]),Bt=pt.a,w[we+C]=pt.b,w[me+C]=Bt}}if(N&$){let me=ct,Ot=ct+_*(O-st);for(;me<=Ot;me+=It){let we=me+_t;B?vt(w[me+C],w[we+C]):bt(w[me+C],w[we+C]),Bt=pt.a,w[we+C]=pt.b,w[me+C]=Bt}}st=$,$>>=1}return ct}function at(w,C,O,_,N,D,U,B,Q){let $=0,st=0,ct=U,dt=Math.trunc(_.value+(N+7)/8);for(;_.value<dt;)for(rt($,st,O,_),$=nt.c,st=nt.lc;st>=14;){let xt=$>>st-14&16383,_t=C[xt];if(_t.len)st-=_t.len,J(_t.lit,D,$,st,O,_,B,Q,ct),$=tt.c,st=tt.lc;else{if(!_t.p)throw new Error("hufDecode issues");let It;for(It=0;It<_t.lit;It++){let Bt=et(w[_t.p[It]]);for(;st<Bt&&_.value<dt;)rt($,st,O,_),$=nt.c,st=nt.lc;if(st>=Bt&&Z(w[_t.p[It]])==($>>st-Bt&(1<<Bt)-1)){st-=Bt,J(_t.p[It],D,$,st,O,_,B,Q,ct),$=tt.c,st=tt.lc;break}}if(It==_t.lit)throw new Error("hufDecode issues")}}let mt=8-N&7;for($>>=mt,st-=mt;st>0;){let xt=C[$<<14-st&16383];if(xt.len)st-=xt.len,J(xt.lit,D,$,st,O,_,B,Q,ct),$=tt.c,st=tt.lc;else throw new Error("hufDecode issues")}return!0}function wt(w,C,O,_,N,D){let U={value:0},B=O.value,Q=Pt(C,O),$=Pt(C,O);O.value+=4;let st=Pt(C,O);if(O.value+=4,Q<0||Q>=65537||$<0||$>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let ct=new Array(65537),dt=new Array(16384);V(dt);let mt=_-(O.value-B);if(z(w,O,mt,Q,$,ct),st>8*(_-(O.value-B)))throw new Error("Something wrong with hufUncompress");Y(ct,Q,$,dt),at(ct,dt,w,O,st,$,D,N,U)}function X(w,C,O){for(let _=0;_<O;++_)C[_]=w[C[_]]}function Vt(w){for(let C=1;C<w.length;C++){let O=w[C-1]+w[C]-128;w[C]=O}}function Tt(w,C){let O=0,_=Math.floor((w.length+1)/2),N=0,D=w.length-1;for(;!(N>D||(C[N++]=w[O++],N>D));)C[N++]=w[_++]}function Ft(w){let C=w.byteLength,O=new Array,_=0,N=new DataView(w);for(;C>0;){let D=N.getInt8(_++);if(D<0){let U=-D;C-=U+1;for(let B=0;B<U;B++)O.push(N.getUint8(_++))}else{let U=D;C-=2;let B=N.getUint8(_++);for(let Q=0;Q<U+1;Q++)O.push(B)}}return O}function Ct(w,C,O,_,N,D){let U=new DataView(D.buffer),B=O[w.idx[0]].width,Q=O[w.idx[0]].height,$=3,st=Math.floor(B/8),ct=Math.ceil(B/8),dt=Math.ceil(Q/8),mt=B-(ct-1)*8,xt=Q-(dt-1)*8,_t={value:0},It=new Array($),Bt=new Array($),ue=new Array($),Jt=new Array($),Ht=new Array($);for(let Ot=0;Ot<$;++Ot)Ht[Ot]=C[w.idx[Ot]],It[Ot]=Ot<1?0:It[Ot-1]+ct*dt,Bt[Ot]=new Float32Array(64),ue[Ot]=new Uint16Array(64),Jt[Ot]=new Uint16Array(ct*64);for(let Ot=0;Ot<dt;++Ot){let we=8;Ot==dt-1&&(we=xt);let pn=8;for(let he=0;he<ct;++he){he==ct-1&&(pn=mt);for(let te=0;te<$;++te)ue[te].fill(0),ue[te][0]=N[It[te]++],ae(_t,_,ue[te]),Gt(ue[te],Bt[te]),L(Bt[te]);$==3&&A(Bt);for(let te=0;te<$;++te)j(Bt[te],Jt[te],he*64)}let Te=0;for(let he=0;he<$;++he){let te=O[w.idx[he]].type;for(let nn=8*Ot;nn<8*Ot+we;++nn){Te=Ht[he][nn];for(let ai=0;ai<st;++ai){let Pe=ai*64+(nn&7)*8;U.setUint16(Te+0*te,Jt[he][Pe+0],!0),U.setUint16(Te+2*te,Jt[he][Pe+1],!0),U.setUint16(Te+4*te,Jt[he][Pe+2],!0),U.setUint16(Te+6*te,Jt[he][Pe+3],!0),U.setUint16(Te+8*te,Jt[he][Pe+4],!0),U.setUint16(Te+10*te,Jt[he][Pe+5],!0),U.setUint16(Te+12*te,Jt[he][Pe+6],!0),U.setUint16(Te+14*te,Jt[he][Pe+7],!0),Te+=16*te}}if(st!=ct)for(let nn=8*Ot;nn<8*Ot+we;++nn){let ai=Ht[he][nn]+8*st*2*te,Pe=st*64+(nn&7)*8;for(let Ci=0;Ci<pn;++Ci)U.setUint16(ai+Ci*2*te,Jt[he][Pe+Ci],!0)}}}let me=new Uint16Array(B);U=new DataView(D.buffer);for(let Ot=0;Ot<$;++Ot){O[w.idx[Ot]].decoded=!0;let we=O[w.idx[Ot]].type;if(O[Ot].type==2)for(let pn=0;pn<Q;++pn){let Te=Ht[Ot][pn];for(let he=0;he<B;++he)me[he]=U.getUint16(Te+he*2*we,!0);for(let he=0;he<B;++he)U.setFloat32(Te+he*2*we,K(me[he]),!0)}}}function ae(w,C,O){let _,N=1;for(;N<64;)_=C[w.value],_==65280?N=64:_>>8==255?N+=_&255:(O[N]=_,N++),w.value++}function Gt(w,C){C[0]=K(w[0]),C[1]=K(w[1]),C[2]=K(w[5]),C[3]=K(w[6]),C[4]=K(w[14]),C[5]=K(w[15]),C[6]=K(w[27]),C[7]=K(w[28]),C[8]=K(w[2]),C[9]=K(w[4]),C[10]=K(w[7]),C[11]=K(w[13]),C[12]=K(w[16]),C[13]=K(w[26]),C[14]=K(w[29]),C[15]=K(w[42]),C[16]=K(w[3]),C[17]=K(w[8]),C[18]=K(w[12]),C[19]=K(w[17]),C[20]=K(w[25]),C[21]=K(w[30]),C[22]=K(w[41]),C[23]=K(w[43]),C[24]=K(w[9]),C[25]=K(w[11]),C[26]=K(w[18]),C[27]=K(w[24]),C[28]=K(w[31]),C[29]=K(w[40]),C[30]=K(w[44]),C[31]=K(w[53]),C[32]=K(w[10]),C[33]=K(w[19]),C[34]=K(w[23]),C[35]=K(w[32]),C[36]=K(w[39]),C[37]=K(w[45]),C[38]=K(w[52]),C[39]=K(w[54]),C[40]=K(w[20]),C[41]=K(w[22]),C[42]=K(w[33]),C[43]=K(w[38]),C[44]=K(w[46]),C[45]=K(w[51]),C[46]=K(w[55]),C[47]=K(w[60]),C[48]=K(w[21]),C[49]=K(w[34]),C[50]=K(w[37]),C[51]=K(w[47]),C[52]=K(w[50]),C[53]=K(w[56]),C[54]=K(w[59]),C[55]=K(w[61]),C[56]=K(w[35]),C[57]=K(w[36]),C[58]=K(w[48]),C[59]=K(w[49]),C[60]=K(w[57]),C[61]=K(w[58]),C[62]=K(w[62]),C[63]=K(w[63])}function L(w){let C=.5*Math.cos(.7853975),O=.5*Math.cos(3.14159/16),_=.5*Math.cos(3.14159/8),N=.5*Math.cos(3*3.14159/16),D=.5*Math.cos(5*3.14159/16),U=.5*Math.cos(3*3.14159/8),B=.5*Math.cos(7*3.14159/16),Q=new Array(4),$=new Array(4),st=new Array(4),ct=new Array(4);for(let dt=0;dt<8;++dt){let mt=dt*8;Q[0]=_*w[mt+2],Q[1]=U*w[mt+2],Q[2]=_*w[mt+6],Q[3]=U*w[mt+6],$[0]=O*w[mt+1]+N*w[mt+3]+D*w[mt+5]+B*w[mt+7],$[1]=N*w[mt+1]-B*w[mt+3]-O*w[mt+5]-D*w[mt+7],$[2]=D*w[mt+1]-O*w[mt+3]+B*w[mt+5]+N*w[mt+7],$[3]=B*w[mt+1]-D*w[mt+3]+N*w[mt+5]-O*w[mt+7],st[0]=C*(w[mt+0]+w[mt+4]),st[3]=C*(w[mt+0]-w[mt+4]),st[1]=Q[0]+Q[3],st[2]=Q[1]-Q[2],ct[0]=st[0]+st[1],ct[1]=st[3]+st[2],ct[2]=st[3]-st[2],ct[3]=st[0]-st[1],w[mt+0]=ct[0]+$[0],w[mt+1]=ct[1]+$[1],w[mt+2]=ct[2]+$[2],w[mt+3]=ct[3]+$[3],w[mt+4]=ct[3]-$[3],w[mt+5]=ct[2]-$[2],w[mt+6]=ct[1]-$[1],w[mt+7]=ct[0]-$[0]}for(let dt=0;dt<8;++dt)Q[0]=_*w[16+dt],Q[1]=U*w[16+dt],Q[2]=_*w[48+dt],Q[3]=U*w[48+dt],$[0]=O*w[8+dt]+N*w[24+dt]+D*w[40+dt]+B*w[56+dt],$[1]=N*w[8+dt]-B*w[24+dt]-O*w[40+dt]-D*w[56+dt],$[2]=D*w[8+dt]-O*w[24+dt]+B*w[40+dt]+N*w[56+dt],$[3]=B*w[8+dt]-D*w[24+dt]+N*w[40+dt]-O*w[56+dt],st[0]=C*(w[dt]+w[32+dt]),st[3]=C*(w[dt]-w[32+dt]),st[1]=Q[0]+Q[3],st[2]=Q[1]-Q[2],ct[0]=st[0]+st[1],ct[1]=st[3]+st[2],ct[2]=st[3]-st[2],ct[3]=st[0]-st[1],w[0+dt]=ct[0]+$[0],w[8+dt]=ct[1]+$[1],w[16+dt]=ct[2]+$[2],w[24+dt]=ct[3]+$[3],w[32+dt]=ct[3]-$[3],w[40+dt]=ct[2]-$[2],w[48+dt]=ct[1]-$[1],w[56+dt]=ct[0]-$[0]}function A(w){for(let C=0;C<64;++C){let O=w[0][C],_=w[1][C],N=w[2][C];w[0][C]=O+1.5747*N,w[1][C]=O-.1873*_-.4682*N,w[2][C]=O+1.8556*_}}function j(w,C,O){for(let _=0;_<64;++_)C[O+_]=th.toHalfFloat(ht(w[_]))}function ht(w){return w<=1?Math.sign(w)*Math.pow(Math.abs(w),2.2):Math.sign(w)*Math.pow(b,Math.abs(w)-1)}function lt(w){return new DataView(w.array.buffer,w.offset.value,w.size)}function ft(w){let C=w.viewer.buffer.slice(w.offset.value,w.offset.value+w.size),O=new Uint8Array(Ft(C)),_=new Uint8Array(O.length);return Vt(O),Tt(O,_),new DataView(_.buffer)}function Rt(w){let C=w.array.slice(w.offset.value,w.offset.value+w.size),O=ws(C),_=new Uint8Array(O.length);return Vt(O),Tt(O,_),new DataView(_.buffer)}function yt(w){let C=w.viewer,O={value:w.offset.value},_=new Uint16Array(w.width*w.scanlineBlockSize*(w.channels*w.type)),N=new Uint8Array(8192),D=0,U=new Array(w.channels);for(let xt=0;xt<w.channels;xt++)U[xt]={},U[xt].start=D,U[xt].end=U[xt].start,U[xt].nx=w.width,U[xt].ny=w.lines,U[xt].size=w.type,D+=U[xt].nx*U[xt].ny*U[xt].size;let B=k(C,O),Q=k(C,O);if(Q>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(B<=Q)for(let xt=0;xt<Q-B+1;xt++)N[xt+B]=qt(C,O);let $=new Uint16Array(65536),st=E(N,$),ct=Pt(C,O);wt(w.array,C,O,ct,_,D);for(let xt=0;xt<w.channels;++xt){let _t=U[xt];for(let It=0;It<U[xt].size;++It)it(_,_t.start+It,_t.nx,_t.size,_t.ny,_t.nx*_t.size,st)}X($,_,D);let dt=0,mt=new Uint8Array(_.buffer.byteLength);for(let xt=0;xt<w.lines;xt++)for(let _t=0;_t<w.channels;_t++){let It=U[_t],Bt=It.nx*It.size,ue=new Uint8Array(_.buffer,It.end*2,Bt*2);mt.set(ue,dt),dt+=Bt*2,It.end+=Bt}return new DataView(mt.buffer)}function St(w){let C=w.array.slice(w.offset.value,w.offset.value+w.size),O=ws(C),_=w.lines*w.channels*w.width,N=w.type==1?new Uint16Array(_):new Uint32Array(_),D=0,U=0,B=new Array(4);for(let Q=0;Q<w.lines;Q++)for(let $=0;$<w.channels;$++){let st=0;switch(w.type){case 1:B[0]=D,B[1]=B[0]+w.width,D=B[1]+w.width;for(let ct=0;ct<w.width;++ct){let dt=O[B[0]++]<<8|O[B[1]++];st+=dt,N[U]=st,U++}break;case 2:B[0]=D,B[1]=B[0]+w.width,B[2]=B[1]+w.width,D=B[2]+w.width;for(let ct=0;ct<w.width;++ct){let dt=O[B[0]++]<<24|O[B[1]++]<<16|O[B[2]++]<<8;st+=dt,N[U]=st,U++}break}}return new DataView(N.buffer)}function Dt(w){let C=w.viewer,O={value:w.offset.value},_=new Uint8Array(w.width*w.lines*(w.channels*w.type*2)),N={version:Yt(C,O),unknownUncompressedSize:Yt(C,O),unknownCompressedSize:Yt(C,O),acCompressedSize:Yt(C,O),dcCompressedSize:Yt(C,O),rleCompressedSize:Yt(C,O),rleUncompressedSize:Yt(C,O),rleRawSize:Yt(C,O),totalAcUncompressedCount:Yt(C,O),totalDcUncompressedCount:Yt(C,O),acCompression:Yt(C,O)};if(N.version<2)throw new Error("EXRLoader.parse: "+Ti.compression+" version "+N.version+" is unsupported");let D=new Array,U=k(C,O)-2;for(;U>0;){let _t=kt(C.buffer,O),It=qt(C,O),Bt=It>>2&3,ue=(It>>4)-1,Jt=new Int8Array([ue])[0],Ht=qt(C,O);D.push({name:_t,index:Jt,type:Ht,compression:Bt}),U-=_t.length+3}let B=Ti.channels,Q=new Array(w.channels);for(let _t=0;_t<w.channels;++_t){let It=Q[_t]={},Bt=B[_t];It.name=Bt.name,It.compression=0,It.decoded=!1,It.type=Bt.pixelType,It.pLinear=Bt.pLinear,It.width=w.width,It.height=w.lines}let $={idx:new Array(3)};for(let _t=0;_t<w.channels;++_t){let It=Q[_t];for(let Bt=0;Bt<D.length;++Bt){let ue=D[Bt];It.name==ue.name&&(It.compression=ue.compression,ue.index>=0&&($.idx[ue.index]=_t),It.offset=_t)}}let st,ct,dt;if(N.acCompressedSize>0)switch(N.acCompression){case 0:st=new Uint16Array(N.totalAcUncompressedCount),wt(w.array,C,O,N.acCompressedSize,st,N.totalAcUncompressedCount);break;case 1:let _t=w.array.slice(O.value,O.value+N.totalAcUncompressedCount),It=ws(_t);st=new Uint16Array(It.buffer),O.value+=N.totalAcUncompressedCount;break}if(N.dcCompressedSize>0){let _t={array:w.array,offset:O,size:N.dcCompressedSize};ct=new Uint16Array(Rt(_t).buffer),O.value+=N.dcCompressedSize}if(N.rleRawSize>0){let _t=w.array.slice(O.value,O.value+N.rleCompressedSize),It=ws(_t);dt=Ft(It.buffer),O.value+=N.rleCompressedSize}let mt=0,xt=new Array(Q.length);for(let _t=0;_t<xt.length;++_t)xt[_t]=new Array;for(let _t=0;_t<w.lines;++_t)for(let It=0;It<Q.length;++It)xt[It].push(mt),mt+=Q[It].width*w.type*2;Ct($,xt,Q,st,ct,_);for(let _t=0;_t<Q.length;++_t){let It=Q[_t];if(!It.decoded)switch(It.compression){case 2:let Bt=0,ue=0;for(let Jt=0;Jt<w.lines;++Jt){let Ht=xt[_t][Bt];for(let me=0;me<It.width;++me){for(let Ot=0;Ot<2*It.type;++Ot)_[Ht++]=dt[ue+Ot*It.width*It.height];ue++}Bt++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(_.buffer)}function kt(w,C){let O=new Uint8Array(w),_=0;for(;O[C.value+_]!=0;)_+=1;let N=new TextDecoder().decode(O.slice(C.value,C.value+_));return C.value=C.value+_+1,N}function ut(w,C,O){let _=new TextDecoder().decode(new Uint8Array(w).slice(C.value,C.value+O));return C.value=C.value+O,_}function le(w,C){let O=Wt(w,C),_=Pt(w,C);return[O,_]}function ne(w,C){let O=Pt(w,C),_=Pt(w,C);return[O,_]}function Wt(w,C){let O=w.getInt32(C.value,!0);return C.value=C.value+4,O}function Pt(w,C){let O=w.getUint32(C.value,!0);return C.value=C.value+4,O}function Lt(w,C){let O=w[C.value];return C.value=C.value+1,O}function qt(w,C){let O=w.getUint8(C.value);return C.value=C.value+1,O}let Yt=function(w,C){let O;return"getBigInt64"in DataView.prototype?O=Number(w.getBigInt64(C.value,!0)):O=w.getUint32(C.value+4,!0)+Number(w.getUint32(C.value,!0)<<32),C.value+=8,O};function Kt(w,C){let O=w.getFloat32(C.value,!0);return C.value+=4,O}function $t(w,C){return th.toHalfFloat(Kt(w,C))}function K(w){let C=(w&31744)>>10,O=w&1023;return(w>>15?-1:1)*(C?C===31?O?NaN:1/0:Math.pow(2,C-15)*(1+O/1024):6103515625e-14*(O/1024))}function k(w,C){let O=w.getUint16(C.value,!0);return C.value+=2,O}function Et(w,C){return K(k(w,C))}function At(w,C,O,_){let N=O.value,D=[];for(;O.value<N+_-1;){let U=kt(C,O),B=Wt(w,O),Q=qt(w,O);O.value+=3;let $=Wt(w,O),st=Wt(w,O);D.push({name:U,pixelType:B,pLinear:Q,xSampling:$,ySampling:st})}return O.value+=1,D}function Zt(w,C){let O=Kt(w,C),_=Kt(w,C),N=Kt(w,C),D=Kt(w,C),U=Kt(w,C),B=Kt(w,C),Q=Kt(w,C),$=Kt(w,C);return{redX:O,redY:_,greenX:N,greenY:D,blueX:U,blueY:B,whiteX:Q,whiteY:$}}function Xt(w,C){let O=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],_=qt(w,C);return O[_]}function ve(w,C){let O=Pt(w,C),_=Pt(w,C),N=Pt(w,C),D=Pt(w,C);return{xMin:O,yMin:_,xMax:N,yMax:D}}function ye(w,C){let O=["INCREASING_Y"],_=qt(w,C);return O[_]}function Be(w,C){let O=Kt(w,C),_=Kt(w,C);return[O,_]}function tn(w,C){let O=Kt(w,C),_=Kt(w,C),N=Kt(w,C);return[O,_,N]}function xe(w,C,O,_,N){if(_==="string"||_==="stringvector"||_==="iccProfile")return ut(C,O,N);if(_==="chlist")return At(w,C,O,N);if(_==="chromaticities")return Zt(w,O);if(_==="compression")return Xt(w,O);if(_==="box2i")return ve(w,O);if(_==="lineOrder")return ye(w,O);if(_==="float")return Kt(w,O);if(_==="v2f")return Be(w,O);if(_==="v3f")return tn(w,O);if(_==="int")return Wt(w,O);if(_==="rational")return le(w,O);if(_==="timecode")return ne(w,O);if(_==="preview")return O.value+=N,"skipped";O.value+=N}function en(w,C,O){let _={};if(w.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");_.version=w.getUint8(4);let N=w.getUint8(5);_.spec={singleTile:!!(N&2),longName:!!(N&4),deepFormat:!!(N&8),multiPart:!!(N&16)},O.value=8;let D=!0;for(;D;){let U=kt(C,O);if(U==0)D=!1;else{let B=kt(C,O),Q=Pt(w,O),$=xe(w,C,O,B,Q);$===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${B}'.`):_[U]=$}}if((N&-5)!=0)throw console.error("THREE.EXRHeader:",_),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return _}function In(w,C,O,_,N){let D={size:0,viewer:C,array:O,offset:_,width:w.dataWindow.xMax-w.dataWindow.xMin+1,height:w.dataWindow.yMax-w.dataWindow.yMin+1,channels:w.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:w.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:Nn};switch(w.compression){case"NO_COMPRESSION":D.lines=1,D.uncompress=lt;break;case"RLE_COMPRESSION":D.lines=1,D.uncompress=ft;break;case"ZIPS_COMPRESSION":D.lines=1,D.uncompress=Rt;break;case"ZIP_COMPRESSION":D.lines=16,D.uncompress=Rt;break;case"PIZ_COMPRESSION":D.lines=32,D.uncompress=yt;break;case"PXR24_COMPRESSION":D.lines=16,D.uncompress=St;break;case"DWAA_COMPRESSION":D.lines=32,D.uncompress=Dt;break;case"DWAB_COMPRESSION":D.lines=256,D.uncompress=Dt;break;default:throw new Error("EXRLoader.parse: "+w.compression+" is unsupported")}if(D.scanlineBlockSize=D.lines,D.type==1)switch(N){case sn:D.getter=Et,D.inputSize=2;break;case vn:D.getter=k,D.inputSize=2;break}else if(D.type==2)switch(N){case sn:D.getter=Kt,D.inputSize=4;break;case vn:D.getter=$t,D.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+D.type+" for "+w.compression+".");D.blockCount=(w.dataWindow.yMax+1)/D.scanlineBlockSize;for(let B=0;B<D.blockCount;B++)Yt(C,_);D.outputChannels=D.channels==3?4:D.channels;let U=D.width*D.height*D.outputChannels;switch(N){case sn:D.byteArray=new Float32Array(U),D.channels<D.outputChannels&&D.byteArray.fill(1,0,U);break;case vn:D.byteArray=new Uint16Array(U),D.channels<D.outputChannels&&D.byteArray.fill(15360,0,U);break;default:console.error("THREE.EXRLoader: unsupported type: ",N);break}return D.bytesPerLine=D.width*D.inputSize*D.channels,D.outputChannels==4?(D.format=Mn,D.colorSpace=Nn):(D.format=$r,D.colorSpace=bn),D}let is=new DataView(t),Ml=new Uint8Array(t),Kn={value:0},Ti=en(is,t,Kn),ie=In(Ti,is,Ml,Kn,this.type),Sr={value:0},xo={R:0,G:1,B:2,A:3,Y:0};for(let w=0;w<ie.height/ie.scanlineBlockSize;w++){let C=Pt(is,Kn);ie.size=Pt(is,Kn),ie.lines=C+ie.scanlineBlockSize>ie.height?ie.height-C:ie.scanlineBlockSize;let _=ie.size<ie.lines*ie.bytesPerLine?ie.uncompress(ie):lt(ie);Kn.value+=ie.size;for(let N=0;N<ie.scanlineBlockSize;N++){let D=N+w*ie.scanlineBlockSize;if(D>=ie.height)break;for(let U=0;U<ie.channels;U++){let B=xo[Ti.channels[U].name];for(let Q=0;Q<ie.width;Q++){Sr.value=(N*(ie.channels*ie.width)+U*ie.width+Q)*ie.inputSize;let $=(ie.height-1-D)*(ie.width*ie.outputChannels)+Q*ie.outputChannels+B;ie.byteArray[$]=ie.getter(_,Sr)}}}}return{header:Ti,width:ie.width,height:ie.height,data:ie.byteArray,format:ie.format,colorSpace:ie.colorSpace,type:this.type}}setDataType(t){return this.type=t,this}load(t,e,n,i){function r(o,a){o.colorSpace=a.colorSpace,o.minFilter=Ye,o.magFilter=Ye,o.generateMipmaps=!1,o.flipY=!1,e&&e(o,a)}return super.load(t,r,n,i)}}});async function Wp(s){let t=new ol,e=new cl;e.setDataType(sn),console.log("[VAT] loading FBX + EXR from:",s);let[n,i]=await Promise.all([t.loadAsync(s+"geo/vertex_animation_textures1_mesh.fbx"),e.loadAsync(s+"tex/vertex_animation_textures1_pos.exr")]);console.log("[VAT] FBX + EXR loaded");let r=null;if(n.traverse(it=>{it.isMesh&&!r&&(r=it)}),!r)throw new Error("FBX \u306B\u30E1\u30C3\u30B7\u30E5\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let o=r.geometry,a=o.getAttribute("position"),l=o.getAttribute("uv"),c=o.getIndex(),h=a.count;console.log("posAttr.count:",a.count);let d=o.getAttribute("uv2")||o.getAttribute("uv1");console.log("[VAT] vertexCount:",h),console.log("[VAT] has index:",!!c,c?"count="+c.count:""),console.log("[VAT] has uv:",!!l,"has vatUv:",!!d),console.log("[VAT] geometry attributes:",Object.keys(o.attributes)),d&&(console.log("[VAT] vatUv sample v0:",d.getX(0),d.getY(0)),console.log("[VAT] vatUv sample v1:",d.getX(1),d.getY(1)));let u=[];if(c)for(let it=0;it<c.count;it++)u.push(c.getX(it));else for(let it=0;it<h;it+=3)d&&(d.getX(it)===0&&d.getY(it)===0||d.getX(it+1)===0&&d.getY(it+1)===0||d.getX(it+2)===0&&d.getY(it+2)===0)||u.push(it,it+1,it+2);let f=[];if(l)for(let it=0;it<l.count;it++)f.push(l.getX(it),l.getY(it));let g=i.image.data,v=i.image.width,p=i.image.height,m=g.length/(v*p);console.log("[VAT] pos texture:",v,"x",p,"channels:",m),console.log("[VAT] pos sample pixel[0]:",g[0],g[1],g[2]);let x=Kb,y=h;if(d){y=0;for(let it=0;it<h;it++){if(d.getX(it)===0&&d.getY(it)===0)continue;let at=Math.floor(d.getX(it)*v),wt=Math.floor((1-d.getY(it))*p);y=Math.max(y,wt*v+at+1)}}let M=Math.ceil(y/v),P=new Int32Array(h);for(let it=0;it<h;it++){let at;if(d)if(d.getX(it)===0&&d.getY(it)===0)at=0;else{let wt=Math.floor(d.getX(it)*v);at=Math.floor((1-d.getY(it))*p)*v+wt}else at=it;P[it]=Math.max(0,Math.min(at,y-1))}console.log("vertexPointIds:",P);let T=new Float32Array(h*3*x),R=x*M;for(let it=0;it<x;it++)for(let at=0;at<h;at++){let wt=P[at],X=wt%v,Vt=Math.floor(wt/v),Tt;fo==="naive"?Tt=it*M+Vt:fo==="reversed"?Tt=it*M+(M-1-Vt):fo==="noflip"?Tt=(x-1-it)*M+Vt:Tt=R-1-(it*M+Vt);let Ft=(Tt*v+X)*m,Ct=(it*h+at)*3,ae=fo==="nomirror"?1:-1;T[Ct+0]=a.getX(at)+ae*g[Ft+0],T[Ct+1]=a.getY(at)+g[Ft+1],T[Ct+2]=a.getZ(at)+g[Ft+2]}let G=h*3,b=[];for(let it=0;it<x-1;it++){let at=it*G,wt=(it+1)*G,X=0;for(let Vt=0;Vt<G;Vt++){let Tt=Math.abs(T[at+Vt]-T[wt+Vt]);Tt>X&&(X=Tt)}b.push(X)}let E=1e-4,V=b.findIndex(it=>it>E),q=b.length-1;for(;q>=0&&b[q]<=E;)q--;let W=x,I=T;fo==="correct"&&(V>0||q<b.length-1)?(V===-1&&(V=0),W=q+2-V,I=T.slice(V*G,(V+W)*G),console.log("[VAT] trimmed static frames:","keep",V,"-",q+1,"(",x,"->",W,"frames )")):console.log("[VAT] no static frames to trim"),console.log("[VAT] frame deltas:",b.map(it=>+it.toFixed(5)));let F=[];for(let it=0;it<h;it++)d&&d.getX(it)===0&&d.getY(it)===0||F.push(it);let z=1/0,et=-1/0,Z=1/0,Y=-1/0;for(let it of F){let at=I[it*3+0],wt=I[it*3+2];at<z&&(z=at),at>et&&(et=at),wt<Z&&(Z=wt),wt>Y&&(Y=wt)}let nt={width:et-z,depth:Y-Z};console.log("[VAT] flat size:",nt.width.toFixed(3),"x",nt.depth.toFixed(3));let rt=(W-1)*G,tt=0,J=0,ot=0;for(let it of F)tt+=I[rt+it*3+0],J+=I[rt+it*3+1],ot+=I[rt+it*3+2];tt/=F.length,J/=F.length,ot/=F.length;let gt=new Float32Array(F.length);for(let it=0;it<F.length;it++){let at=F[it],wt=I[rt+at*3+0]-tt,X=I[rt+at*3+1]-J,Vt=I[rt+at*3+2]-ot;gt[it]=Math.sqrt(wt*wt+X*X+Vt*Vt)}gt.sort();let pt={center:[tt,J,ot],radius:gt[Math.floor(F.length*.9)]};console.log("[VAT] crumple center:",tt.toFixed(3),J.toFixed(3),ot.toFixed(3),"radius:",pt.radius.toFixed(3));let vt=new Float32Array(h*3*W),bt=new Float32Array(y*3);for(let it=0;it<W;it++){let at=it*h*3;if(Jb==="flat"){for(let wt=0;wt<u.length;wt+=3){let X=u[wt]*3,Vt=u[wt+1]*3,Tt=u[wt+2]*3,Ft=I[at+X],Ct=I[at+X+1],ae=I[at+X+2],Gt=I[at+Vt]-Ft,L=I[at+Vt+1]-Ct,A=I[at+Vt+2]-ae,j=I[at+Tt]-Ft,ht=I[at+Tt+1]-Ct,lt=I[at+Tt+2]-ae,ft=L*lt-A*ht,Rt=A*j-Gt*lt,yt=Gt*ht-L*j,St=Math.hypot(ft,Rt,yt)||1;ft/=St,Rt/=St,yt/=St;for(let Dt=0;Dt<3;Dt++){let kt=at+u[wt+Dt]*3;vt[kt]=ft,vt[kt+1]=Rt,vt[kt+2]=yt}}continue}bt.fill(0);for(let wt=0;wt<u.length;wt+=3){let X=u[wt]*3,Vt=u[wt+1]*3,Tt=u[wt+2]*3,Ft=I[at+X],Ct=I[at+X+1],ae=I[at+X+2],Gt=I[at+Vt]-Ft,L=I[at+Vt+1]-Ct,A=I[at+Vt+2]-ae,j=I[at+Tt]-Ft,ht=I[at+Tt+1]-Ct,lt=I[at+Tt+2]-ae,ft=L*lt-A*ht,Rt=A*j-Gt*lt,yt=Gt*ht-L*j;for(let St=0;St<3;St++){let Dt=P[u[wt+St]]*3;bt[Dt]+=ft,bt[Dt+1]+=Rt,bt[Dt+2]+=yt}}for(let wt=0;wt<y;wt++){let X=wt*3,Vt=Math.hypot(bt[X],bt[X+1],bt[X+2]);Vt>1e-10?(bt[X]/=Vt,bt[X+1]/=Vt,bt[X+2]/=Vt):(bt[X]=0,bt[X+1]=1,bt[X+2]=0)}for(let wt=0;wt<h;wt++){let X=P[wt]*3,Vt=at+wt*3;vt[Vt]=bt[X],vt[Vt+1]=bt[X+1],vt[Vt+2]=bt[X+2]}}return console.log("[VAT] decoded pos frame0 vertex0:",I[0],I[1],I[2]),console.log("[VAT] decoded nrm frame0 vertex0:",vt[0],vt[1],vt[2]),console.log("[VAT] animData ready:",{vertexCount:h,frameCount:W,indicesLen:u.length,uvsLen:f.length}),i.dispose(),n.traverse(it=>{it.geometry?.dispose();for(let at of Array.isArray(it.material)?it.material:[it.material])at?.dispose()}),{vertexCount:h,frameCount:W,indices:u,uvs:f,positions:I,normals:vt,crumple:pt,flat:nt}}var Kb,Gp,fo,Jb,Xp=Ie(()=>{xn();Vp();Hp();Kb=50,Gp=new URLSearchParams(window.location.search),fo=Gp.get("decode")||"correct",Jb=Gp.get("normals")||"smooth"});var AS={};function xl(){ln.position.set(Bn.x,Bn.y,Bn.z),ln.lookAt(0,Bn.targetY,0),mu()}function uu(s,t){return uS.copy(su).multiplyScalar(s).applyQuaternion(t)}function dS(s){let t=uu(Mr,s.mesh.quaternion),e=new Qt({mass:hu,material:gl,shape:new qa(Qe),linearDamping:.15,angularDamping:.35,position:new S(s.mesh.position.x+t.x,s.mesh.position.y+t.y,s.mesh.position.z+t.z)});return e.quaternion.set(s.mesh.quaternion.x,s.mesh.quaternion.y,s.mesh.quaternion.z,s.mesh.quaternion.w),$n.addBody(e),e}function du(s,t){let e=s.body;e.type=t?Qt.DYNAMIC:Qt.KINEMATIC,e.mass=t?hu:0,e.collisionFilterGroup=t?1:0,e.collisionFilterMask=t?1:0,t||(e.velocity.set(0,0,0),e.angularVelocity.set(0,0,0),e.force.set(0,0,0),e.torque.set(0,0,0)),e.updateMassProperties(),e.wakeUp()}function fu(s){let t=uu(s.mesh.scale.x,s.mesh.quaternion);s.body.position.set(s.mesh.position.x+t.x,s.mesh.position.y+t.y,s.mesh.position.z+t.z),s.body.quaternion.set(s.mesh.quaternion.x,s.mesh.quaternion.y,s.mesh.quaternion.z,s.mesh.quaternion.w)}function es(s,t=Mr){s.mesh.quaternion.set(s.body.quaternion.x,s.body.quaternion.y,s.body.quaternion.z,s.body.quaternion.w);let e=uu(t,s.mesh.quaternion);s.mesh.position.set(s.body.position.x-e.x,s.body.position.y-e.y,s.body.position.z-e.z),s.mesh.scale.setScalar(t)}function Jp(s){return s.position.y<=ts+.05}function Qp(s,t){let e=Math.exp(-oS*t),n=Math.exp(-aS*t);s.velocity.x*=e,s.velocity.z*=e,s.angularVelocity.x*=n,s.angularVelocity.y*=n,s.angularVelocity.z*=n}function um(s,t){s.state="closed",s.time=0,s.homePosition.copy(s.mesh.position),s.homeRotation.copy(s.mesh.rotation),s.frameIdx=t,qn(s,be,s.frameIdx),fu(s),es(s)}function fS(s){let t=pu(),e=t.minX+Qe,n=t.maxX-Qe,i=t.minZ+Qe,r=t.maxZ-Qe;for(let o of Je){if(!o.body||o.body.type!==Qt.DYNAMIC)continue;let a=o.body;a.position.x<e?(a.velocity.x<0&&(a.velocity.x=Math.abs(a.velocity.x)*.42),a.velocity.x+=hl*s):a.position.x>n&&(a.velocity.x>0&&(a.velocity.x=-Math.abs(a.velocity.x)*.42),a.velocity.x-=hl*s),a.position.z<i?(a.velocity.z<0&&(a.velocity.z=Math.abs(a.velocity.z)*.42),a.velocity.z+=hl*s):a.position.z>r&&(a.velocity.z>0&&(a.velocity.z=-Math.abs(a.velocity.z)*.42),a.velocity.z-=hl*s)}}function tm(s){return Math.min(Math.max(s,0),1)}function em(s){return 1-Math.pow(1-s,3)}function pS(s){return s*s*s}function ul(s,t,e){return s+(t-s)*e}function fn(s,t){return s+Math.random()*(t-s)}function dm(s){return{position:s.mesh.position.clone(),quaternion:s.mesh.quaternion.clone(),scale:s.mesh.scale.x,frameIdx:s.frameIdx}}function pu(){return iS}function ru(){ln.getWorldDirection(Jh);let s=ln.position.clone().addScaledVector(Jh,$p),t=Jh.clone().negate(),e=new H(0,1,0).applyQuaternion(ln.quaternion),n=new H().crossVectors(t,e),i=new He().setFromRotationMatrix(new Ut().makeBasis(n,t,e)),r=2*Math.tan(ke.degToRad(ln.fov*.5))*$p,o=r*ln.aspect,a=Math.min(r*Zp/pl.depth,o*Zp/pl.width);return{position:s,quaternion:i,scale:a}}function mu(){if(Re){if(Re.state==="opening"&&Re.target){let s=ru();Re.target.position.copy(s.position),Re.target.quaternion.copy(s.quaternion),Re.target.scale=s.scale}else if(Re.state==="open"){let s=ru();Re.mesh.position.copy(s.position),Re.mesh.quaternion.copy(s.quaternion),Re.mesh.scale.setScalar(s.scale)}}}async function mS(){if(nu.textContent="loading VAT data...",be=await Wp(new URL("./vat/",document.baseURI).href),!ee.disposed){if(pl.width=be.flat.width,pl.depth=be.flat.depth,su.fromArray(be.crumple.center),Qe=be.crumple.radius*Mr,ts=go+Qe*1.08,ml=ts-su.y*Mr,hm.position.y=ts-Qe,console.log("[VAT] physics: collisionRadius =",Qe.toFixed(3),"restCenterY =",ts.toFixed(3)),po!==null)for(let s=0;s<Ms.count;s++){let t=Ms.count===1?new H(0,ml,.2):Qh(s),e=dl(t,!1);du(e,!1),e.state="posed",e.frameIdx=Math.max(0,Math.min(po,be.frameCount-1)),qn(e,be,e.frameIdx)}else if(fl.matches)for(let s=0;s<Ms.count;s++)dl(Qh(s),!1);else{let s,t=new Promise((e,n)=>{s=e,ee.signal.addEventListener("abort",()=>n(new DOMException("Disposed","AbortError")),{once:!0})});for(let e=0;e<Ms.count;e++){let n=e*45+fn(0,90);ES(()=>{dl(Qh(e),!0,fn(4.2,8.2)),s()},n)}if(await t,ee.disposed)return}nu.textContent="",ns.render(),Tu(Se),ee.succeed({fonts:2,designImages:gs.length,vatDecoded:!0,firstFrameSubmitted:!0}),ee.running&&yu()}}function Qh(s){return s<jh.length?new H(jh[s][0],ml,jh[s][2]):fm()}function fm(){let s=pu(),t=Qe*1.3,e=new H(0,ml,0);for(let n=0;n<40&&!Je.every(r=>{let o=r.body.position.x-e.x,a=r.body.position.z-e.z;return o*o+a*a>(Qe*2.4)**2});n++);return e}function dl(s,t,e=fn(.8,1.2)){let n=be.frameCount-1,i=oh(be,gS++%gs.length);i.mesh.castShadow=!0,i.mesh.rotation.set(0,Math.PI+fn(-.25,.25),fn(-.18,.18)),i.mesh.position.copy(s),i.mesh.scale.setScalar(Mr),wn.add(i.mesh);let r=dS(i),o={...i,body:r,frameIdx:n,state:"closed",time:0,homePosition:i.mesh.position.clone(),homeRotation:i.mesh.rotation.clone(),start:null,target:null,throw:null};if(qn(o,be,n),Je.push(o),cu){let a=new Fe(new va(Qe,16,12),new ir({color:46438,wireframe:!0}));wn.add(a),o.debugSphere=a}return t&&(o.state="rolling",o.throw={settleTimer:0},r.position.y+=e,r.angularVelocity.set(fn(-1.5,1.5),fn(-.5,.5),fn(-1.5,1.5)),es(o)),o}function vS(){let s=-1;for(let e=Je.length-1;e>=0;e--){let n=Je[e];if(!(n===Re||n.state==="grabbed"||n.state==="opening"||n.state==="open"||n.state==="discarding")){s=e;break}}if(s===-1){for(let e=Je.length-1;e>=0;e--)if(Je[e].state!=="grabbed"){s=e;break}}if(s===-1)return!1;let t=Je[s];return t===Re&&(Re=null),_e&&_e.paper===t&&(_e.paper=null),t.debugSphere&&wn.remove(t.debugSphere),wn.remove(t.mesh),t.mesh.geometry.dispose(),$n.removeBody(t.body),Je.splice(s,1),!0}function yS(){if(!be)return;let s=Math.round(Ms.count);for(;Je.length>s&&vS(););for(;Je.length<s;)dl(fm(),!0)}function pm(s){yl.x=s.clientX/window.innerWidth*2-1,yl.y=-(s.clientY/window.innerHeight)*2+1}function gu(s){pm(s),vl.setFromCamera(yl,ln);let t=vl.intersectObjects(Je.map(e=>e.mesh));return t.length===0?null:Je.find(e=>e.mesh===t[0].object)||null}function mm(s){return s.state==="closed"||s.state==="rolling"}function xS(s){if(!be)return;let t=gu(s);Se.domElement.style.cursor=t?mm(t)?"grab":"pointer":""}function _S(s){let t=gu(s);if(!t)return;let e=Re;e&&(MS(e),Re=null),!(e===t||t.state!=="closed")&&(wS(t),Re=t)}function gm(s,t){_e.grabbing=!0,s.state="grabbed",s.time=0;let e=s.body;e.type=Qt.KINEMATIC,e.mass=0,e.updateMassProperties(),e.velocity.set(0,0,0),e.angularVelocity.set(0,0,0),e.collisionFilterGroup=1,e.collisionFilterMask=1,e.wakeUp(),s.grab={target:new H(e.position.x,ts+iu,e.position.z)},vm(s,t),Se.domElement.style.cursor="grabbing"}function vm(s,t){if(pm(t),vl.setFromCamera(yl,ln),tu.normal.set(0,1,0),tu.constant=-(ts+iu),!vl.ray.intersectPlane(tu,eu))return;let e=pu();s.grab.target.set(Math.min(Math.max(eu.x,e.minX+Qe),e.maxX-Qe),ts+iu,Math.min(Math.max(eu.z,e.minZ+Qe),e.maxZ-Qe))}function vu(s,t){let e=s.body,n=t?e.velocity.x:0,i=t?e.velocity.z:0,r=Math.hypot(n,i);if(r>Kp){let o=Kp/r;n*=o,i*=o}e.type=Qt.DYNAMIC,e.mass=hu,e.updateMassProperties(),e.velocity.set(n,0,i),e.angularVelocity.set(i/Qe*.6,0,-n/Qe*.6),e.wakeUp(),s.state="rolling",s.time=0,s.throw={settleTimer:0},Se.domElement.style.cursor="grab"}function wS(s){du(s,!1),es(s),s.state="opening",s.time=0,s.start=dm(s);let t=ru();s.target={position:t.position,quaternion:t.quaternion,scale:t.scale,frameIdx:bs.openFrame}}function MS(s){if(s.state==="discarding"||s.state==="rolling")return;let t=new H(fn(-1,1),0,fn(-1.3,-.45));t.normalize(),s.state="discarding",s.time=0,s.start=dm(s),du(s,!0),fu(s),s.body.velocity.set(t.x*fn(1.4,2),fn(.5,.9),t.z*fn(1.4,2)),s.body.angularVelocity.set(fn(-2.4,2.4),fn(-.8,.8),fn(-2.4,2.4)),s.throw={settleTimer:0}}function yu(){ou=performance.now()/1e3,Se.setAnimationLoop(SS)}function SS(){if(ee.disposed||!ee.running)return;let s=performance.now()/1e3,t=Math.min(s-ou,.05);if(ou=s,!!be){fl.matches||($n.step(cS,Math.min(t,.05),3),fS(t));for(let e of Je)fl.matches?((e.state==="opening"||e.state==="discarding")&&nm(e,100),e.state==="rolling"&&um(e,be.frameCount-1),e.state==="grabbed"&&(e.body.position.copy(e.grab.target),es(e))):nm(e,t);if(cu)for(let e of Je)e.debugSphere&&e.debugSphere.position.set(e.body.position.x,e.body.position.y,e.body.position.z);ns.render()}}function nm(s,t){let e=be.frameCount-1;if(s.state==="opening"){s.time+=t*bs.speed;let n=tm(s.time/sS),i=em(n),r=pS(n);s.mesh.position.lerpVectors(s.start.position,s.target.position,i),s.mesh.quaternion.slerpQuaternions(s.start.quaternion,s.target.quaternion,i),s.mesh.scale.setScalar(ul(s.start.scale,s.target.scale,i)),s.frameIdx=ul(s.start.frameIdx,s.target.frameIdx,r),qn(s,be,s.frameIdx),n>=1&&(s.state="open",s.frameIdx=s.target.frameIdx,s.mesh.position.copy(s.target.position),s.mesh.quaternion.copy(s.target.quaternion),s.mesh.scale.setScalar(s.target.scale),fu(s),qn(s,be,s.frameIdx));return}if(s.state==="discarding"){s.time+=t*bs.speed;let n=tm(s.time/rS),i=em(n),r=ul(s.start.scale,Mr,i);s.frameIdx=ul(s.start.frameIdx,e,i),es(s,r),qn(s,be,s.frameIdx),n>=1&&(s.state="rolling",s.time=0,s.frameIdx=e,qn(s,be,s.frameIdx));return}if(s.state==="grabbed"){let n=s.body,i=s.grab.target,r=(i.x-n.position.x)*Kh,o=(i.y-n.position.y)*Kh,a=(i.z-n.position.z)*Kh,l=Math.hypot(r,o,a);if(l>jp){let c=jp/l;r*=c,o*=c,a*=c}n.velocity.set(r,o,a),es(s);return}if(s.state==="rolling"){s.time+=t;let n=Jp(s.body);n&&Qp(s.body,t),es(s);let i=s.body.velocity.lengthSquared()+s.body.angularVelocity.lengthSquared()*.02;s.throw.settleTimer=n&&i<lS?s.throw.settleTimer+t:0,s.throw.settleTimer>.35&&um(s,e);return}s.state==="closed"&&(Jp(s.body)&&Qp(s.body,t),es(s))}function xu(){_e?.grabbing&&vu(_e.paper,!1);let s=_e?.pointerId;_e=null,s!==void 0&&Se.domElement.hasPointerCapture(s)&&Se.domElement.releasePointerCapture(s)}var fl,Qb,Es,tS,nu,wn,mo,Bn,ln,Se,go,im,sm,_l,rm,au,om,cn,lu,ns,oi,am,Ss,bs,Ms,eS,qp,po,cu,Yp,jn,br,wl,nS,lm,vo,Ai,yo,Je,be,Re,jh,Zp,$p,Mr,pl,iS,sS,rS,oS,aS,lS,cS,hu,iu,Kh,jp,Kp,hS,Qe,ts,ml,su,$n,gl,cm,hm,uS,hl,Jh,gS,vl,yl,tu,eu,_e,bS,jE,ou,ES,ym=Ie(()=>{wo();xn();dp();pp();gp();vp();xp();Mp();ah();Xp();fl=matchMedia("(prefers-reduced-motion: reduce)"),Qb=s=>ee.fail(s),Es=(...s)=>ee.listen(...s),tS=document.getElementById("app"),nu=document.getElementById("info"),wn=new ha,mo={background:"#ff3838",floor:"#dcdad0"};wn.background=new zt(mo.background);Bn={x:0,y:2.2,z:3.6,targetY:.35},ln=new Ve(40,window.innerWidth/window.innerHeight,.01,100);ln.position.set(Bn.x,Bn.y,Bn.z);ln.lookAt(0,Bn.targetY,0);Se=new Vr({antialias:!0});Au(Se);ee.addCleanup(()=>{Se.dispose(),Se.forceContextLoss()});Se.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));Se.domElement.style.touchAction="none";Se.setSize(window.innerWidth,window.innerHeight);Se.outputColorSpace=Ee;Se.shadowMap.enabled=!0;Se.shadowMap.type=kc;tS.appendChild(Se.domElement);go=-.1,im=-1.1,sm=new ps({color:mo.floor}),_l=new Fe(new or(16,12),sm);_l.rotation.x=-Math.PI/2;_l.position.set(0,go,1);_l.receiveShadow=!0;wn.add(_l);rm=new ps({color:mo.background}),au=new Fe(new or(16,6),rm);au.position.set(0,go+3,im);au.receiveShadow=!0;wn.add(au);om=new fr(16777215,1.25);wn.add(om);cn=new ms(16777215,1.15);cn.position.set(-2,2.6,1.4);cn.castShadow=!0;cn.shadow.mapSize.set(2048,2048);cn.shadow.camera.left=-4;cn.shadow.camera.right=4;cn.shadow.camera.top=4;cn.shadow.camera.bottom=-3;cn.shadow.camera.near=.1;cn.shadow.camera.far=12;cn.shadow.bias=-.001;wn.add(cn);lu=new ms(16777215,0);lu.position.set(-2,1,-1);wn.add(lu);ns=new Qa(Se);ee.addCleanup(()=>{for(let s of ns.passes)s.dispose?.();ns.dispose()});ns.addPass(new tl(wn,ln));oi=new co(wn,ln,window.innerWidth,window.innerHeight);oi.kernelRadius=.01;oi.minDistance=1e-4;oi.maxDistance=.08;ns.addPass(oi);ns.addPass(new il);am=50,Ss=new URLSearchParams(window.location.search),bs={speed:1.5,openFrame:4},Ms={count:Math.min(am,Math.max(1,parseInt(Ss.get("papers"),10)||40))},eS=Ss.get("gui")==="on",qp=Ss.get("frame"),po=qp!==null?parseFloat(qp):null,cu=Ss.get("debug")==="physics",Yp=Ss.get("ssao");Yp!==null&&parseFloat(Yp)<=0&&(oi.enabled=!1);jn=new ja;ee.addCleanup(()=>jn.destroy());eS||jn.hide();br=jn.addFolder("Lighting");br.add(om,"intensity",0,3,.01).name("Ambient");br.add(cn,"intensity",0,4,.01).name("Key Light");br.add(cn.position,"x",-5,5,.1).name("Key X");br.add(cn.position,"y",0,5,.1).name("Key Y");br.add(cn.position,"z",-5,5,.1).name("Key Z");br.add(lu,"intensity",0,2,.01).name("Fill Light");wl=jn.addFolder("SSAO");wl.add(oi,"kernelRadius",.001,.5,.001).name("Radius");wl.add(oi,"minDistance",1e-4,.01,1e-4).name("Min Dist");wl.add(oi,"maxDistance",.01,.5,.001).name("Max Dist");wl.add(oi,"enabled").name("Enabled");nS=jn.addFolder("Shadow");nS.add(cn.shadow,"bias",-.01,.01,1e-4).name("Bias");lm=jn.addFolder("Colors");lm.addColor(mo,"background").name("Background").onChange(s=>{wn.background.set(s),rm.color.set(s)});lm.addColor(mo,"floor").name("Floor").onChange(s=>{sm.color.set(s)});jn.add(bs,"speed",.1,5,.1).name("Speed");jn.add(bs,"openFrame",0,12,.5).name("Open Frame").onChange(()=>{Re&&Re.state==="open"?(Re.frameIdx=bs.openFrame,qn(Re,be,Re.frameIdx)):Re&&Re.target&&(Re.target.frameIdx=bs.openFrame)});jn.add(Ms,"count",1,am,1).name("Papers").onFinishChange(yS);vo=jn.addFolder("Camera");vo.add(Bn,"x",-4,4,.05).name("X").onChange(xl);vo.add(Bn,"y",.2,4,.05).name("Y").onChange(xl);vo.add(Bn,"z",.8,7,.05).name("Z").onChange(xl);vo.add(Bn,"targetY",0,2,.05).name("Target Y").onChange(xl);vo.add(ln,"fov",10,90,1).name("FOV").onChange(()=>{ln.updateProjectionMatrix(),mu()});Ai={decode:Ss.get("decode")||"correct",normals:Ss.get("normals")||"smooth",poseFrame:po!==null?po:-1,physics:cu,apply(){let s=new URLSearchParams(window.location.search);s.set("gui","on"),s.set("papers",String(Ms.count));let t=(e,n,i)=>{n===i?s.delete(e):s.set(e,n)};t("decode",Ai.decode,"correct"),t("normals",Ai.normals,"smooth"),t("frame",String(Ai.poseFrame),"-1"),oi.enabled?s.delete("ssao"):s.set("ssao","0"),Ai.physics?s.set("debug","physics"):s.delete("debug"),window.location.search=s.toString()}},yo=jn.addFolder("Capture (Apply \u3067\u30EA\u30ED\u30FC\u30C9)");yo.add(Ai,"decode",["correct","naive","reversed","noflip","nomirror"]).name("Decode");yo.add(Ai,"normals",["smooth","flat"]).name("Normals");yo.add(Ai,"poseFrame",-1,49,.5).name("Pose Frame (-1=off)").onChange(s=>{if(!(po===null||s<0||!be))for(let t of Je)t.state==="posed"&&(t.frameIdx=Math.max(0,Math.min(s,be.frameCount-1)),qn(t,be,t.frameIdx))});yo.add(Ai,"physics").name("Show Colliders");yo.add(Ai,"apply").name("\u25B6 Apply & Reload");Je=[],be=null,Re=null,jh=[[-1.25,.02,-.1],[0,.02,.12],[1.25,.02,-.06]],Zp=.9,$p=1.5,Mr=.82,pl={width:1,depth:1.4},iS={minX:-2.4,maxX:2.4,minZ:im,maxZ:1.7},sS=1.15,rS=1.25,oS=2.6,aS=4.5,lS=.018,cS=1/60,hu=.16,iu=.5,Kh=14,jp=4.5,Kp=3.2,hS=6,Qe=.25,ts=go+.25,ml=.02,su=new H(0,.2,0),$n=new $a({gravity:new S(0,-7,0)});$n.allowSleep=!1;$n.defaultContactMaterial.friction=.8;$n.defaultContactMaterial.restitution=.15;gl=new _s("paper"),cm=new _s("floor");$n.addContactMaterial(new xs(gl,cm,{friction:1,restitution:.12}));$n.addContactMaterial(new xs(gl,gl,{friction:.6,restitution:.3}));hm=new Qt({mass:0,material:cm,shape:new Ya,position:new S(0,go,0),quaternion:new an().setFromEuler(-Math.PI/2,0,0)});$n.addBody(hm);uS=new H;hl=3;Jh=new H;gS=0;vl=new Ra,yl=new jt,tu=new Hn,eu=new H,_e=null;Se.domElement.style.touchAction="none";Es(Se.domElement,"pointerdown",s=>{if(!be||_e||!ee.running||s.button>0||s.isPrimary===!1)return;let t=gu(s);_e={paper:t,pointerId:s.pointerId,startX:s.clientX,startY:s.clientY,grabbing:!1};try{Se.domElement.setPointerCapture(s.pointerId)}catch{}t&&t.state==="rolling"&&gm(t,s)});Es(Se.domElement,"pointermove",s=>{if(!_e){xS(s);return}if(s.pointerId===_e.pointerId){if(!_e.grabbing){let t=_e.paper,e=Math.hypot(s.clientX-_e.startX,s.clientY-_e.startY);t&&mm(t)&&e>hS&&gm(t,s)}_e.grabbing&&vm(_e.paper,s)}});Es(Se.domElement,"pointerup",s=>{!_e||s.pointerId!==_e.pointerId||(_e.grabbing?vu(_e.paper,!fl.matches):_S(s),_e=null)});Es(Se.domElement,"pointercancel",s=>{!_e||s.pointerId!==_e.pointerId||(_e.grabbing&&vu(_e.paper,!1),_e=null)});bS=24,jE=1/bS,ou=null;Es(window,"resize",()=>{ln.aspect=window.innerWidth/window.innerHeight,ln.updateProjectionMatrix(),Se.setSize(window.innerWidth,window.innerHeight),ns.setSize(window.innerWidth,window.innerHeight),mu()});ES=(s,t)=>ee.schedule(s,t);ee.setHandlers({stop(){Se.setAnimationLoop(null),xu()},resume(){be&&yu()},dispose(){let s=new Set,t=new Set,e=new Set;wn.traverse(n=>{n.geometry&&s.add(n.geometry);for(let i of Array.isArray(n.material)?n.material:[n.material])if(i){t.add(i);for(let r in i)i[r]?.isTexture&&e.add(i[r])}});for(let n of e)n.dispose();for(let n of t)n.dispose();for(let n of s)n.dispose();cn.shadow.dispose(),wn.clear();for(let n of[...$n.bodies])$n.removeBody(n);Je.length=0,be=null},inspect(){return{renderer:"Three160 WebGL with SSAO",input:["native captured pointer click","native captured drag and release"],resources:"two local fonts, seven SVGs, local FBX and EXR decoded on CPU",reducedMotionBehavior:"no falling entrance or physics; direct drag retained; open/discard transitions snap",scenePapers:Je.length}}});Es(Se.domElement,"lostpointercapture",xu);Es(window,"blur",xu);ee.running&&yu();mS().catch(s=>{Qb(s),nu.textContent="ERROR: "+s.message})});wo();var _u=[];ee.addCleanup(()=>{for(let s of _u)document.fonts.delete(s);_u.length=0});(async()=>{for(let t of["Caveat","Yomogi"]){let e=await fetch("./fonts/"+t+".ttf",{signal:ee.signal});if(!e.ok)throw Error("Font unavailable: "+t);let n=new FontFace(t,await e.arrayBuffer());if(await n.load(),ee.disposed)return;document.fonts.add(n),_u.push(n)}await(await Promise.resolve().then(()=>(ah(),Gf))).preparePaperImages(),!ee.disposed&&await Promise.resolve().then(()=>(ym(),AS))})().catch(s=>{ee.fail(s),document.getElementById("info").textContent=String(s)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/lil-gui.module.min.js:
  (**
   * lil-gui
   * https://lil-gui.georgealways.com
   * @version 0.17.0
   * @author George Michael Brower
   * @license MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
