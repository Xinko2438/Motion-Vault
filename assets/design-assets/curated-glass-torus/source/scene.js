import * as THREE from 'three';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';

// Independently authored, locally runnable studies. No original-site code is claimed here.
const ID=document.documentElement.dataset.study;
const root=document.getElementById('canvas');
const scene=new THREE.Scene();scene.background=new THREE.Color('#eeefef');
const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,60);camera.position.set(0,.25,8.8);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;root.append(renderer.domElement);
const group=new THREE.Group();scene.add(group);
scene.add(new THREE.HemisphereLight(0xf9faff,0x7d7b80,2.5));
for(const [color,intensity,x,y,z]of [[0xffffff,4,3,5,4],[0xd8ccff,3,-4,2,-3],[0xffe9d3,2,1,-3,2]]){const light=new THREE.DirectionalLight(color,intensity);light.position.set(x,y,z);scene.add(light);}
const pmrem=new THREE.PMREMGenerator(renderer);let envTarget;
new RGBELoader().load('./environment.hdr',tex=>{envTarget=pmrem.fromEquirectangular(tex);scene.environment=envTarget.texture;tex.dispose();document.body.dataset.environment='ready';},undefined,e=>{document.getElementById('status').textContent='本地环境贴图未读取';console.error(e)});
const clock=new THREE.Clock();let disposed=false,frame=0,time=0,auto=true,down=null;
const pointer=new THREE.Vector2(),target=new THREE.Vector2(),velocity=new THREE.Vector2();
const resources=new Set(),track=o=>{resources.add(o);return o};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const own=o=>{if(o.geometry)track(o.geometry);if(o.material)track(o.material);group.add(o);return o};
function texText(text,color='#202027',size=90){const c=document.createElement('canvas');c.width=2048;c.height=256;const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.fillStyle=color;x.font=`600 ${size}px Arial`;x.textAlign='center';x.textBaseline='middle';x.fillText(text,c.width/2,c.height/2);const tex=track(new THREE.CanvasTexture(c));tex.colorSpace=THREE.SRGBColorSpace;return tex;}
function meshText(text,w,h,color){const t=texText(text,color),m=track(new THREE.MeshBasicMaterial({map:t,alphaTest:.25,transparent:false,depthWrite:true,side:THREE.DoubleSide}));return new THREE.Mesh(track(new THREE.PlaneGeometry(w,h)),m);}
function controls(html){document.getElementById('controls').innerHTML=html;}
function label(kicker,title,sub){document.getElementById('kicker').textContent=kicker;document.getElementById('title').textContent=title;document.getElementById('subtitle').textContent=sub;}
let tick=()=>{},onTap=()=>{},onWheel=()=>{},onDrag=()=>{};

if(ID==='curated-glass-torus'){
 label('OPTICAL STUDY','Words, refracted.','字体、透明体与光照，共同形成一个视觉对象。');
 const glass=track(new THREE.MeshPhysicalMaterial({color:'#fdfcff',metalness:0,roughness:.035,transmission:1,thickness:.85,ior:1.46,clearcoat:1,clearcoatRoughness:.03,dispersion:.05,envMapIntensity:1.1}));
 const torus=own(new THREE.Mesh(new THREE.TorusGeometry(1.47,.43,48,160),glass));torus.rotation.x=.45;torus.rotation.y=-.35;
 const text=meshText('BEYOND THE SURFACE',7.1,.9,'#32293e');text.position.set(0,.15,-.85);scene.add(text);
 const bandCanvas=document.createElement('canvas');bandCanvas.width=2048;bandCanvas.height=128;const x=bandCanvas.getContext('2d');x.fillStyle='#232129';x.font='bold 68px Arial';x.textBaseline='middle';x.fillText('MOTION   /   FORM   /   LIGHT   /   MOTION   /   FORM   /   LIGHT',0,64);
 const bandTex=track(new THREE.CanvasTexture(bandCanvas));bandTex.colorSpace=THREE.SRGBColorSpace;
 const band=new THREE.Mesh(track(new THREE.CylinderGeometry(1.47,1.47,.24,160,1,true)),track(new THREE.MeshBasicMaterial({map:bandTex,alphaTest:.25,transparent:false,depthWrite:true,side:THREE.DoubleSide})));band.rotation.x=Math.PI/2;band.position.z=-.18;torus.add(band);
 controls('<label>折射<input id="ior" type="range" min="1.1" max="2" step=".01" value="1.46"></label><button id="rotate">暂停旋转</button>');
 document.getElementById('ior').oninput=e=>glass.ior=Number(e.target.value);document.getElementById('rotate').onclick=()=>{auto=!auto;document.getElementById('rotate').textContent=auto?'暂停旋转':'继续旋转'};
 tick=(t,dt)=>{torus.rotation.x=.4+Math.sin(t*.28)*.22+pointer.y*.12;torus.rotation.y=-.35+Math.sin(t*.18)*.55+pointer.x*.2;if(auto)band.rotation.y=t*.22;};
}

if(ID==='curated-metal-name'){
 label('GENERATIVE IDENTITY','Built from a name.','同一个字形，在连续截面与扭转中形成结构。');
 const material=track(new THREE.MeshStandardMaterial({color:'#c5c8ce',metalness:1,roughness:.21,envMapIntensity:1.5}));const stack=new THREE.Group();group.add(stack);let parts=[],twist=.48;
 function contours(text){
  const c=document.createElement('canvas');c.width=620;c.height=190;const x=c.getContext('2d');x.font='900 146px Arial';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.fillText(text.slice(0,7)||'FORM',310,101,598);const d=x.getImageData(0,0,c.width,c.height).data;const solid=(u,v)=>u>=0&&v>=0&&u<c.width&&v<c.height&&d[(v*c.width+u)*4+3]>150;const edges=new Map();
  const add=(a,b)=>{const k=a.join(',');if(!edges.has(k))edges.set(k,[]);edges.get(k).push(b)};
  for(let v=0;v<c.height;v++)for(let u=0;u<c.width;u++)if(solid(u,v)){if(!solid(u,v-1))add([u,v],[u+1,v]);if(!solid(u+1,v))add([u+1,v],[u+1,v+1]);if(!solid(u,v+1))add([u+1,v+1],[u,v+1]);if(!solid(u-1,v))add([u,v+1],[u,v]);}
  const loops=[];while(edges.size){const first=edges.keys().next().value,start=first.split(',').map(Number),points=[start];let at=first,n=0;do{const list=edges.get(at);if(!list?.length)break;const next=list.pop();if(!list.length)edges.delete(at);points.push(next);at=next.join(',');}while(at!==first&&++n<10000);if(points.length>18)loops.push(points.filter((_,i)=>i%3===0).map(([u,v])=>new THREE.Vector2((u-310)/100,(100-v)/100)));}
  const area=ps=>ps.reduce((sum,p,i)=>{const q=ps[(i+1)%ps.length];return sum+p.x*q.y-q.x*p.y},0)/2;
  const outer=loops.filter(p=>area(p)<0),holes=loops.filter(p=>area(p)>0);const inside=(p,poly)=>{let k=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)k=!k;}return k;};
  return outer.map(ps=>{const shape=new THREE.Shape(ps);for(const h of holes)if(inside(h[0],ps))shape.holes.push(new THREE.Path(h));return shape;});
 }
 function rebuild(value){for(const p of parts){stack.remove(p);p.geometry.dispose();resources.delete(p.geometry);}parts=[];const shapes=contours(value.toUpperCase());for(let i=0;i<34;i++){const g=track(new THREE.ExtrudeGeometry(shapes,{depth:.023,bevelEnabled:true,bevelThickness:.008,bevelSize:.011,bevelSegments:1,steps:1,curveSegments:8}));const m=new THREE.Mesh(g,material);m.position.z=(i-16.5)*.064;m.userData.layer=i;stack.add(m);parts.push(m);}document.body.dataset.word=value.toUpperCase();}
 controls('<label class="word-label">字形<input id="word" maxlength="7" value="FORM" aria-label="生成结构的名字"></label><label>扭转<input id="twist" type="range" min="0" max="1.3" step=".01" value=".48"></label><button id="finish">切换材质</button>');
 document.getElementById('word').onchange=e=>rebuild(e.target.value);document.getElementById('twist').oninput=e=>twist=Number(e.target.value);let gold=false;document.getElementById('finish').onclick=()=>{gold=!gold;material.color.set(gold?'#d8bc97':'#c5c8ce')};rebuild('FORM');
 tick=t=>{for(const m of parts){const n=m.userData.layer/33-.5;m.rotation.z=n*twist;m.position.x=Math.sin(n*2+t*.28)*.09;}stack.rotation.x=-.65+pointer.y*.18;stack.rotation.y=-.5+Math.sin(t*.17)*.16+pointer.x*.25;stack.rotation.z=.12;stack.scale.setScalar(.72);};
}

if(ID==='curated-liquid-grid'){
 label('SPATIAL COLLECTION','A field of images.','拖动这个空间，观察图像、折射与回弹的关系。');
 const field=new THREE.Group();group.add(field);const cards=[],loader=new THREE.TextureLoader();
 const glass=track(new THREE.MeshPhysicalMaterial({color:'#f2f3ff',transmission:.96,roughness:.025,thickness:.38,ior:1.25,metalness:0,envMapIntensity:.8,clearcoat:1,dispersion:.025}));
 const shell=own(new THREE.Mesh(new THREE.SphereGeometry(2.0,72,48),glass));shell.renderOrder=2;
 const photos=Array.from({length:12},(_,i)=>'./images/'+(i%6+1)+'.jpg');
 photos.forEach((file,i)=>{const texture=track(loader.load(file));texture.colorSpace=THREE.SRGBColorSpace;const phi=Math.acos(1-2*(i+.5)/photos.length),theta=i*2.399963;const p=new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta)).multiplyScalar(1.48);const g=track(new THREE.PlaneGeometry(.9,1.08,16,16));const m=track(new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));const card=new THREE.Mesh(g,m);card.position.copy(p);card.lookAt(p.clone().multiplyScalar(2));card.userData.base=p.clone();field.add(card);cards.push(card);});
 let angleX=0,angleY=.4,dragVX=0,dragVY=0;onDrag=(dx,dy)=>{angleY+=dx*.006;angleX+=dy*.004;dragVX=dx*.0006;dragVY=dy*.0006;};
 controls('<span>按住画面拖动</span><button id="glass">折射：开启</button><button id="reset">复位</button>');
 document.getElementById('glass').onclick=()=>{shell.visible=!shell.visible;document.getElementById('glass').textContent='折射：'+(shell.visible?'开启':'关闭')};document.getElementById('reset').onclick=()=>{angleX=0;angleY=.4;dragVX=dragVY=0};
 tick=(t,dt)=>{if(!down){angleY+=dt*.1+dragVX;angleX+=dragVY;dragVX*=.94;dragVY*=.94;}field.rotation.set(angleX,angleY,0);const bend=Math.min(.13,Math.abs(dragVX)+Math.abs(dragVY));cards.forEach((m,i)=>{m.position.copy(m.userData.base).multiplyScalar(1+Math.sin(t*1.2+i)*.014+bend);m.rotation.z=Math.sin(t*.3+i)*.028});shell.scale.set(1+bend*.14,1-bend*.12,1);};
}

if(ID==='curated-depth'){
 label('ONE OBJECT / THREE CHAPTERS','Form. Surface. Light.','滚动或拖动进度，观察同一对象如何贯穿叙事。');
 const geometry=track(new THREE.SphereGeometry(1.4,96,64));const base=geometry.attributes.position.array.slice(),uv=geometry.attributes.uv.array;const m=track(new THREE.MeshPhysicalMaterial({color:'#d5d5dd',metalness:.25,roughness:.3,clearcoat:1}));const object=own(new THREE.Mesh(geometry,m));let progress=0,manualUntil=0;
 controls('<label class="progress-label">叙事进度<input id="progress" type="range" min="0" max="1" step=".001" value="0"></label><button id="auto">自动演示</button>');
 const pInput=document.getElementById('progress');pInput.oninput=e=>{progress=Number(e.target.value);manualUntil=Infinity;};document.getElementById('auto').onclick=()=>{manualUntil=0;};onWheel=dy=>{progress=clamp(progress+dy*.0005);manualUntil=Infinity;};
 const chapters=['01 / FORM','02 / SURFACE','03 / LIGHT'];
 tick=t=>{if(t>manualUntil)progress=(1-Math.cos(t*.29))/2;pInput.value=progress;const b=smooth((progress-.12)/.35),c=smooth((progress-.55)/.33),pos=geometry.attributes.position.array;
 for(let i=0,j=0,k=0;i<pos.length;i+=3,j++,k+=2){const x=base[i],y=base[i+1],z=base[i+2],max=Math.max(Math.abs(x),Math.abs(y),Math.abs(z)),cx=x/max*1.08,cy=y/max*1.08,cz=z/max*1.08;const u=uv[k]*Math.PI*2,v=uv[k+1]*Math.PI*2;const tx=(1.1+.46*Math.cos(v))*Math.cos(u),ty=(1.1+.46*Math.cos(v))*Math.sin(u),tz=.46*Math.sin(v);pos[i]=THREE.MathUtils.lerp(THREE.MathUtils.lerp(x,cx,b),tx,c);pos[i+1]=THREE.MathUtils.lerp(THREE.MathUtils.lerp(y,cy,b),ty,c);pos[i+2]=THREE.MathUtils.lerp(THREE.MathUtils.lerp(z,cz,b),tz,c);}
 geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();m.metalness=.12+.86*b;m.roughness=.38-.25*b;m.color.setHSL(.69-.04*c,.06+.2*c,.78-.2*b);m.envMapIntensity=1+b*.8;object.rotation.set(t*.12+pointer.y*.18,t*.22+pointer.x*.25,.14);document.getElementById('status').textContent=chapters[Math.min(2,Math.floor(progress*3))];document.body.dataset.progress=progress.toFixed(3);};
}

function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}addEventListener('resize',resize);
renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0)return;down={id:e.pointerId,x:e.clientX,y:e.clientY};renderer.domElement.setPointerCapture(e.pointerId);e.preventDefault();});
renderer.domElement.addEventListener('pointermove',e=>{target.set((e.clientX/innerWidth-.5)*2,(e.clientY/innerHeight-.5)*2);if(down?.id===e.pointerId){onDrag(e.clientX-down.x,e.clientY-down.y);down.x=e.clientX;down.y=e.clientY;}});
for(const event of ['pointerup','pointercancel','lostpointercapture'])renderer.domElement.addEventListener(event,()=>down=null);
renderer.domElement.addEventListener('wheel',e=>{if(ID==='curated-depth'){e.preventDefault();onWheel(e.deltaY)}},{passive:false});
function paint(t){time=t;pointer.lerp(target,.085);tick(time,1/60);renderer.render(scene,camera);document.body.dataset.frame=String(Math.round(time*60));}
function loop(){if(disposed)return;const dt=Math.min(clock.getDelta(),.04);paint(time+dt);frame=requestAnimationFrame(loop)}loop();
window.SourceDemo={ready:true,paint,scroll:p=>{if(ID==='curated-depth'){document.getElementById('progress').value=p;document.getElementById('progress').dispatchEvent(new Event('input'))}},stop:()=>{cancelAnimationFrame(frame)},resume:()=>{cancelAnimationFrame(frame);clock.getDelta();loop()}};
addEventListener('pagehide',()=>{disposed=true;cancelAnimationFrame(frame);for(const r of resources)r.dispose?.();envTarget?.dispose();pmrem.dispose();renderer.dispose();});
