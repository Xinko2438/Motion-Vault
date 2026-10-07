import * as THREE from "three";
import FullscreenQuad from "../utils/FullscreenQuad";
import passthroughVert from "../shaders/passthrough.vert.glsl";
import fluidFrag from "../shaders/fluid.frag.glsl";

export default class FluidSim {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.#createRenderTargets();
		this.#createFullscreenPass();
	}

	#createRenderTargets() {
		const rtOptions = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			depthBuffer: false,
			stencilBuffer: false,
		};

		this.targetA = new THREE.WebGLRenderTarget(
			this.width,
			this.height,
			rtOptions,
		);

		this.targetB = new THREE.WebGLRenderTarget(
			this.width,
			this.height,
			rtOptions,
		);
	}

	#createFullscreenPass() {
		const aspect = this.height / this.width;
		const aspectVec =
			this.width < this.height
				? new THREE.Vector2(1.0, 1.0 / aspect)
				: new THREE.Vector2(aspect, 1.0);

		this.material = new THREE.ShaderMaterial({
			vertexShader: passthroughVert,
			fragmentShader: fluidFrag,
			depthTest: false,
			depthWrite: false,
			uniforms: {
				uPrevFluid: { value: this.targetA.texture },
				uTrailTexture: { value: null },
				uAspect: { value: aspectVec },
			},
		});

		this.quad = new FullscreenQuad(this.material);
	}

	get texture() {
		return this.targetA.texture;
	}

	update(renderer, trailTexture) {
		this.material.uniforms.uPrevFluid.value = this.targetA.texture;
		this.material.uniforms.uTrailTexture.value = trailTexture;

		renderer.setRenderTarget(this.targetB);
		this.quad.render(renderer);
		renderer.setRenderTarget(null);

		// Swap
		const temp = this.targetA;
		this.targetA = this.targetB;
		this.targetB = temp;
	}

	onResize(width, height) {
		this.targetA.setSize(width, height);
		this.targetB.setSize(width, height);

		const aspect = height / width;
		this.material.uniforms.uAspect.value =
			width < height
				? new THREE.Vector2(1.0, 1.0 / aspect)
				: new THREE.Vector2(aspect, 1.0);
	}

	dispose() {
		this.targetA.dispose();
		this.targetB.dispose();
		this.material.dispose();
		this.quad.dispose();
	}
}
