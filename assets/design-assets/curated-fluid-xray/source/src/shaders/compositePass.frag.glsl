uniform sampler2D tDiffuse;
uniform sampler2D uWireScene;
uniform sampler2D uFluidMask;

varying vec2 vUv;

void main() {
	vec3 solid = texture2D(tDiffuse, vUv).rgb;
	vec3 wire = texture2D(uWireScene, vUv).rgb;
	float mask = 1.0 - texture2D(uFluidMask, vUv).r;
	gl_FragColor = vec4(mix(solid, wire, mask), 1.0);
}
