import { Environment } from '@react-three/drei/core/Environment.js';
import { OrbitControls } from '@react-three/drei/core/OrbitControls.js';
import { useTexture } from '@react-three/drei/core/Texture.js';
import { useEffect, useState } from 'react';
import { useEnvironment } from '@react-three/drei/core/useEnvironment.js';
import { lifecycle, assertFirstFrame } from '../../../lifecycle.js';
import { rendererState, setRenderMode } from '../../../renderer.js';
import { useThree } from '@react-three/fiber';
import { useControls } from "leva";
import { LenticularMaterial } from "./LenticularMaterial";

export const Experience = () => {
  const { textureSet, nbDivisions, height } = useControls({
    textureSet: {
      value: "summer-winter",
      options: ["evil-angel", "summer-winter"],
    },
    nbDivisions: {
      min: 10,
      max: 90,
      value: 90,
      step: 10,
      label: "Number of Divisions",
    },
    height: {
      min: 0.001,
      max: 0.2,
      value: 0.05,
      step: 0.001,
      label: "Height",
    },
  });

  const textureEvilAngelA = useTexture("textures/evil-angel/evil.png");
  const textureEvilAngelB = useTexture("textures/evil-angel/angel.png");

  const textureSummerWinterA = useTexture("textures/summer-winter/summer.png");
  const textureSummerWinterB = useTexture("textures/summer-winter/winter.png");

  const textureA = {
    ["evil-angel"]: textureEvilAngelA,
    ["summer-winter"]: textureSummerWinterA,
  }[textureSet];

  const textureB = {
    ["evil-angel"]: textureEvilAngelB,
    ["summer-winter"]: textureSummerWinterB,
  }[textureSet];

  const state = useThree();
  const environment=useEnvironment({files:"./environment/venice_sunset_1k.hdr"});
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const onChange=()=>setReduced(media.matches);media.addEventListener('change',onChange);
    return()=>media.removeEventListener('change',onChange);
  },[]);
  useEffect(()=>{
    let cancelled=false;
    rendererState.scene=state;
    (async()=>{
      const renderer=await rendererState.initialized;
      if(cancelled||lifecycle.disposed)return;
      // Child Environment's layout effect has installed the decoded local HDR before this effect.
      rendererState.compiling=renderer.compileAsync(state.scene,state.camera);
      await rendererState.compiling;
      if(cancelled||lifecycle.disposed)return;
      renderer.render(state.scene,state.camera);assertFirstFrame(renderer);
      lifecycle.succeed({textures:4,environmentLoaded:true,sceneCompiled:true,firstFrameSubmitted:true});
      if(lifecycle.running){setRenderMode('demand');state.invalidate();}
    })().catch(error=>lifecycle.fail(error));
    return()=>{cancelled=true;};
  },[state.gl,state.scene,state.camera,environment]);
  useEffect(()=>()=>{
    for(const texture of [textureEvilAngelA,textureEvilAngelB,textureSummerWinterA,textureSummerWinterB])texture.dispose();
    for(const url of ['textures/evil-angel/evil.png','textures/evil-angel/angel.png','textures/summer-winter/summer.png','textures/summer-winter/winter.png'])useTexture.clear(url);
    environment.dispose();
    useEnvironment.clear({files:"./environment/venice_sunset_1k.hdr"});
    rendererState.scene=null;
  },[]);
  return (
    <>
      <OrbitControls enableDamping={!reduced} minDistance={1.5} maxDistance={10} />
      <Environment map={environment} />
      <mesh>
        <planeGeometry args={[1, 1, nbDivisions * 2, 1]} />
        <LenticularMaterial
          key={textureSet}
          textureA={textureA}
          textureB={textureB}
          nbDivisions={nbDivisions}
          height={height}
        />
      </mesh>
    </>
  );
};
