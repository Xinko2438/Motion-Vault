import * as THREE from "three";

export function createFresnelMaterial({
	heightMax = 1.0,
	roughness = 1.0,
	color = new THREE.Color(0.2, 0.6, 1.0),
	emissive = new THREE.Color(0.6, 0.85, 1.0),
	emissiveIntensity = 0.2,
}) {
	const material = new THREE.MeshStandardMaterial({
		metalness: 0,
		roughness,
		color,
		emissive,
		emissiveIntensity,
	});

	material.onBeforeCompile = (shader) => {
		shader.uniforms.uHeightMax = { value: heightMax };

		// vertex
		shader.vertexShader = shader.vertexShader.replace(
			"#include <common>",
			`#include <common>
varying float vLocalY;`,
		);

		shader.vertexShader = shader.vertexShader.replace(
			"#include <begin_vertex>",
			`#include <begin_vertex>
vLocalY = position.y;`,
		);

		// fragment
		shader.fragmentShader = shader.fragmentShader.replace(
			"#include <common>",
			`#include <common>
uniform float uHeightMax;
varying float vLocalY;`,
		);

		shader.fragmentShader = shader.fragmentShader.replace(
			"#include <lights_fragment_end>",
			`
#include <lights_fragment_end>

float heightFade = smoothstep(0.5, uHeightMax, vLocalY);

reflectedLight.directDiffuse *= heightFade;
reflectedLight.indirectDiffuse *= heightFade;
reflectedLight.directSpecular *= heightFade;
reflectedLight.indirectSpecular *= heightFade;

totalEmissiveRadiance *= heightFade;
`,
		);
	};

	return material;
}
