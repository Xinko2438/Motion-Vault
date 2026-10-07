import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class ImportGltf {
	constructor(url, { onLoad }) {
		this.loader = new GLTFLoader();

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
		this.loader.setDRACOLoader(dracoLoader);

		this.loader.load(
			url,
			(gltf) => onLoad?.(gltf.scene),
			undefined,
			(error) => console.error("GLTF load error:", error),
		);
	}
}
