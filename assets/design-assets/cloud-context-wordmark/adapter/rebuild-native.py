from pathlib import Path
import re,json,hashlib,base64
B=Path(__file__).resolve().parents[1]
for id in [B.name]:
 d=B;s=(d/'source/index.html').read_text();scripts=list(re.finditer(r'<script>([\s\S]*?)</script>',s));assert len(scripts)==1
 original=scripts[0].group(1);body=original
 if id in ['cloud-context-search','cloud-radial-cover-nav']:
  body=re.sub(r"(\$\('[^']+'\)|document|window|input|openButton|toggle|link|reducedMotion)\.addEventListener\(",r'listenSource(\1,',body)
  body="const sourceEventAbort=new AbortController();\nfunction listenSource(target,type,handler,options={}){target.addEventListener(type,handler,{...options,signal:sourceEventAbort.signal});}\n"+body
 body+='\nwindow.__VaultNativeInitialized=true;\n'
 s=s[:scripts[0].start(1)]+body+s[scripts[0].end(1):]
 s=s.replace('</head>','<script src="./vault-native-input.js"></script><script src="./vault-session.js"></script></head>')
 s=s.replace('</body>','<script src="./vault-native-lifecycle.js"></script></body>')
 hashes=' '.join("'sha256-"+base64.b64encode(hashlib.sha256(x.encode()).digest()).decode()+"'" for x in re.findall(r'<script>([\s\S]*?)</script>',s))
 csp="default-src 'none';script-src 'self' "+hashes+";style-src 'self' 'unsafe-inline';img-src 'self' data: blob:;connect-src blob: data:;font-src 'none';worker-src 'none';object-src 'none';frame-src 'none';media-src 'none';base-uri 'none';form-action 'none'"
 s=s.replace('<head>','<head><meta http-equiv="Content-Security-Policy" content="'+csp+'">',1)
 (d/'run/index.html').write_text(s)
 stop="window.MotionExample?.stop?.();";resume="";dispose="window.MotionExample?.dispose?.();"
 if id=='cloud-context-search':stop="clearTimeout(toastTimer);";dispose="sourceEventAbort.abort();clearTimeout(toastTimer);"
 if id=='cloud-radial-cover-nav':stop="cancelAnimationFrame(frame);frame=0;clearTimeout(feedbackTimer);settle();";dispose="sourceEventAbort.abort();cancelAnimationFrame(frame);frame=0;clearTimeout(feedbackTimer);"
 adapter=f'''// Owned lifecycle adapter for {id}; source initialization is synchronous.
(()=>{{
 let disposed=false,paused=false,readyFrame=0,rejectReady;const animations=new Set();
 const ready=new Promise((resolve,reject)=>{{rejectReady=reject;Promise.resolve(document.fonts.ready).then(()=>{{if(disposed)return;if(!window.__VaultNativeInitialized)throw new Error('Source initialization did not complete');readyFrame=requestAnimationFrame(()=>{{readyFrame=0;if(!disposed)resolve({{kind:'initialized DOM and font layout'}});}});}}).catch(reject);}});ready.catch(()=>{{}});
 const stop=()=>{{if(disposed||paused)return;paused=true;{stop}for(const animation of document.getAnimations())if(animation.playState==='running'){{animation.pause();animations.add(animation);}}}};
 const resume=()=>{{if(disposed||!paused)return;paused=false;for(const animation of animations)if(animation.playState==='paused')animation.play();animations.clear();{resume}}};
 const dispose=()=>{{if(disposed)return;stop();disposed=true;cancelAnimationFrame(readyFrame);readyFrame=0;rejectReady(new DOMException('Source disposed','AbortError'));{dispose}for(const animation of document.getAnimations())animation.cancel();animations.clear();dispatchEvent(new Event('vault-source-dispose'));}};
 window.SourceDemo={{ready,stop,resume,dispose,inspect:()=>({{initialized:window.__VaultNativeInitialized===true,disposed,paused,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,readinessKind:'DOM layout only; runtime acceptance pending'}})}};
 addEventListener('pagehide',dispose,{{once:true}});
}})();
'''
 (d/'run/vault-native-lifecycle.js').write_text(adapter)
 (d/'adapter').mkdir(exist_ok=True)
 (d/'adapter/native-lifecycle.js').write_text(adapter)
 sm=json.loads((d/'source-map.json').read_text());sm=[x for x in sm if x.get('path')!='adapter/native-lifecycle.js'];sm.append({'path':'adapter/native-lifecycle.js','role':'explicit owned ready/dispose contract'});(d/'source-map.json').write_text(json.dumps(sm,indent=2))
 print(id)
