import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import { useState, useEffect } from "react";
import { createVaultRenderer, rendererState } from "../../renderer.js";

function App() {
  const [frameloop, setFrameloop] = useState("never");
  useEffect(()=>{rendererState.setFrameloop=setFrameloop;return()=>{rendererState.setFrameloop=null;};},[]);
  return (
    <>
      <Canvas
        dpr={[1,1.5]}
        shadows
        camera={{ position: [3, 3, 3], fov: 30 }}
        frameloop={frameloop}
        gl={createVaultRenderer}
      >
        <color attach="background" args={["#333"]} />
        <Experience />
      </Canvas>

    </>
  );
}

export default App;
