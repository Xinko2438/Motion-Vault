import * as THREE from "three";
import WebGLContext from "./WebGLContext";
import Scene from "../scenes/Scene";
import MouseTrail from "../utils/MouseTrail";
import FluidSim from "../postprocessing/FluidSim";
import PostProcessing from "../postprocessing/PostProcessing";

class Three {
	constructor(container) {
		this.container = container;
		this.context = null;
		this.clock = new THREE.Clock();
	}

	run() {
		this.context = new WebGLContext(this.container);

		const { width, height } = this.context.getFullScreenDimensions();
		const pr = this.context.pixelRatio;

		this.scene = new Scene();
		this.mouseTrail = new MouseTrail(width * pr, height * pr);
		this.fluidSim = new FluidSim(width * pr, height * pr);
		this.postProcessing = new PostProcessing(
			this.context.renderer,
			width * pr,
			height * pr,
		);

		this.#animate();
		this.#addResizeListener();
	}

	#animate() {
		const delta = this.clock.getDelta();
		const elapsed = this.clock.elapsedTime;

		this.scene.animate(delta, elapsed);
		this.#render(elapsed);
		requestAnimationFrame(() => this.#animate());
	}

	#render(elapsed) {
		if (!this.context.renderer) return;

		const { solidScene, wireScene, camera, solidRT, wireRT } = this.scene;

		// 1. Update mouse trail
		this.mouseTrail.update(
			this.scene.cameraRig.mouseNormalized.x,
			this.scene.cameraRig.mouseNormalized.y,
		);

		// 2. Update fluid sim
		this.fluidSim.update(this.context.renderer, this.mouseTrail.texture);

		// 3. Render solid scene to RT
		this.context.renderer.setRenderTarget(solidRT);
		this.context.renderer.clear();
		this.context.renderer.render(solidScene, camera);

		// 4. Render wire scene to RT
		this.context.renderer.setRenderTarget(wireRT);
		this.context.renderer.clear();
		this.context.renderer.render(wireScene, camera);

		// 5. Bloom solid, composite with wire, CRT to screen
		this.context.renderer.setRenderTarget(null);
		this.postProcessing.render(
			solidRT.texture,
			wireRT.texture,
			this.fluidSim.texture,
			elapsed,
		);
	}

	#addResizeListener() {
		window.addEventListener("resize", () => this.#onResize());
	}

	#onResize() {
		const { width, height } = this.context.getFullScreenDimensions();
		const pr = this.context.pixelRatio;

		this.context.onResize(width, height);
		this.scene.onResize(width, height);
		this.fluidSim.onResize(width * pr, height * pr);
		this.postProcessing.onResize(width * pr, height * pr);
	}
}

export default Three;
