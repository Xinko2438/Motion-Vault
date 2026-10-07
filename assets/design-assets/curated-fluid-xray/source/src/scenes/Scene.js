import * as THREE from "three";
import WebGLContext from "../core/WebGLContext";
import { CameraRig } from "../utils/CameraRig";
import InstancedModel from "../utils/InstancedModel";

export default class Scene {
	constructor() {
		this.context = new WebGLContext();
		const { width, height } = this.context.getFullScreenDimensions();
		this.width = width;
		this.height = height;
		this.aspectRatio = width / height;

		this.solidScene = this.#createScene();
		this.wireScene = this.#createScene();

		this.#createInstancedModels();
		this.#createRenderTargets();
		this.#createCamera();
	}

	#createInstancedModels() {
		new InstancedModel(this.solidScene, {
			url: `${import.meta.env.BASE_URL}man_comp-transformed.glb`,
			meshName: "Low_Poly_Male_bodyGroup2_lambert1_0",
			heightMax: 1.0,
			roughness: 1.0,
			emissiveIntensity: 0.6,
		});

		new InstancedModel(this.wireScene, {
			url: `${import.meta.env.BASE_URL}skeleton_comp-transformed.glb`,
			meshName: "skeleton",
			heightMax: 0.9,
			roughness: 0.9,
			color: new THREE.Color(0.4, 0.7, 1.0),
			emissive: new THREE.Color(0.7, 0.9, 1.0),
			emissiveIntensity: 1,
		});
	}

	#createRenderTargets() {
		const pr = this.context.pixelRatio;

		this.solidRT = new THREE.WebGLRenderTarget(
			this.width * pr,
			this.height * pr,
			{
				type: THREE.HalfFloatType,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
			},
		);

		this.wireRT = new THREE.WebGLRenderTarget(
			this.width * pr,
			this.height * pr,
			{
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
			},
		);
	}

	#createScene() {
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x000000, 1, 3);
		scene.background = new THREE.Color(0x000000);

		const dir = new THREE.DirectionalLight(0xffffff, 1.0);
		dir.position.set(1, 3, 1);
		scene.add(dir);

		return scene;
	}

	#createCamera() {
		this.camera = new THREE.PerspectiveCamera(17, this.aspectRatio, 0.1, 100);
		this.cameraRig = new CameraRig(this.camera);
	}

	animate(delta, elapsed) {
		this.cameraRig?.update(delta, elapsed);
	}

	onResize(width, height) {
		this.width = width;
		this.height = height;
		this.aspectRatio = width / height;
		this.camera.aspect = this.aspectRatio;
		this.camera.updateProjectionMatrix();

		const pr = this.context.pixelRatio;
		this.solidRT.setSize(width * pr, height * pr);
		this.wireRT.setSize(width * pr, height * pr);
	}
}
