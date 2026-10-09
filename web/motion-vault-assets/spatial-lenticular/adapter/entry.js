import React from 'react';
import { _roots, unmountComponentAtNode } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import App from './author/src/App.jsx';
import './author/src/index.css';
import { lifecycle } from './lifecycle.js';
import { rendererState, setRenderMode } from './renderer.js';
class Boundary extends React.Component {
  constructor(props){super(props);this.state={failed:false};}
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(error){lifecycle.fail(error);document.getElementById('status').textContent=String(error);}
  render(){return this.state.failed?null:this.props.children;}
}
const root=createRoot(document.getElementById('root'));
lifecycle.setHandlers({
  stop(){setRenderMode('never');rendererState.renderer?._animation?.stop();},
  resume(){if(lifecycle.isReady){setRenderMode('demand');rendererState.scene?.invalidate();}},
  dispose(){
    const state=rendererState.scene,canvas=rendererState.renderer?.domElement;
    state?.events.disconnect?.();
    if(!canvas||!_roots.has(canvas)){root.unmount();return;}
    // Await R3F's actual unmount completion (including its existing 500ms cleanup), never readiness.
    return new Promise(resolve=>unmountComponentAtNode(canvas,()=>{root.unmount();resolve();}));
  },
  inspect(){return {renderer:'Three175 WebGPURenderer forced WebGL2; private housekeeping RAF adapter-owned',input:['native OrbitControls pointer drag','native wheel zoom'],resources:'four local PNGs and Venice Sunset HDR',reducedMotionBehavior:'no autonomous motion; live media change disables OrbitControls damping',rendererRafActive:rendererState.renderer?._animation?._requestId!=null};}
});
lifecycle.ready.then(()=>{document.getElementById('status').textContent='';},error=>{if(!lifecycle.disposed)document.getElementById('status').textContent=String(error);});
root.render(React.createElement(Boundary,null,React.createElement(App)));
