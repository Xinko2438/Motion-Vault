import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {configureTextBuilder} from 'troika-three-text';
import {lifetime,preference,prepareAssets,motionChanged,fail} from './runtime.jsx';
async function boot(){
 await prepareAssets();if(lifetime.disposed)return;
 configureTextBuilder({defaultFontURL:window.VaultFontUrls['fonts/Poppins-Regular.woff']});
 const {default:App}=await import('../source/src/App.jsx');
 if(lifetime.disposed)return;
 function Root(){const [revision,setRevision]=useState(0);useEffect(()=>{const change=()=>{motionChanged();setRevision(v=>v+1);};preference.addEventListener('change',change);return()=>preference.removeEventListener('change',change);},[]);return <App vaultMotionRevision={revision}/>;}
 lifetime.root=createRoot(document.getElementById('root'));lifetime.root.render(<Root/>);
}
boot().catch(fail);
