import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { TexturePass } from "three/addons/postprocessing/TexturePass.js";
import effectVert from "../shaders/effectPass.vert.glsl";
import compositeFrag from "../shaders/compositePass.frag.glsl";
import crtFrag from "../shaders/crt.frag.glsl";

export default class PostProcessing {
	constructor(renderer, width, height) {
		this.composer = new EffectComposer(renderer);

		this.solidTexturePass = new TexturePass(null);
		this.composer.addPass(this.solidTexturePass);

		this.bloomPass = new UnrealBloomPass(
			new THREE.Vector2(width, height),
			0.3,
			0.05,
			0.0,
		);

		this.composer.addPass(this.bloomPass);

		this.compositePass = new ShaderPass({
			uniforms: {
				tDiffuse: { value: null },
				uWireScene: { value: null },
				uFluidMask: { value: null },
			},
			vertexShader: effectVert,
			fragmentShader: compositeFrag,
		});

		this.composer.addPass(this.compositePass);

		this.crtPass = new ShaderPass({
			uniforms: {
				tDiffuse: { value: null },
				uTime: { value: 0 },
			},
			vertexShader: effectVert,
			fragmentShader: crtFrag,
		});
		this.composer.addPass(this.crtPass);
	}

	render(solidTexture, wireTexture, fluidMaskTexture, elapsed) {
		this.solidTexturePass.map = solidTexture;
		this.compositePass.uniforms.uWireScene.value = wireTexture;
		this.compositePass.uniforms.uFluidMask.value = fluidMaskTexture;
		this.crtPass.uniforms.uTime.value = elapsed;
		this.composer.render();
	}

	onResize(width, height) {
		this.composer.setSize(width, height);
		this.bloomPass.resolution.set(width, height);
	}

	dispose() {
		this.composer.dispose();
	}
}
