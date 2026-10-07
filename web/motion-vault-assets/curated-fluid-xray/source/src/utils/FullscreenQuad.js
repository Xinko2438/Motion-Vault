import * as THREE from "three";

export default class FullscreenQuad {
	constructor(material) {
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.scene = new THREE.Scene();
		this.geometry = new THREE.PlaneGeometry(2, 2);
		this.mesh = new THREE.Mesh(this.geometry, material || new THREE.MeshBasicMaterial());
		this.scene.add(this.mesh);
	}

	get material() {
		return this.mesh.material;
	}

	set material(mat) {
		this.mesh.material = mat;
	}

	render(renderer) {
		renderer.render(this.scene, this.camera);
	}

	dispose() {
		this.geometry.dispose();
	}
}
