uniform sampler2D tDiffuse;
uniform float uTime;

varying vec2 vUv;

float rand(vec2 co) {
	vec3 p = fract(vec3(co.xyx) * 0.1031);
	p += dot(p, p.yzx + 33.33);
	return fract((p.x + p.y) * p.z);
}

void main() {
	vec3 color = texture2D(tDiffuse, vUv).rgb;

	// Film grain
	float grain = rand(gl_FragCoord.xy + fract(uTime * 20.0) * 1000.0) * 0.01;
	color += grain;

	// Scan lines
	color *= 1.0 + sin(vUv.y * 1250.0) * 0.3;

	// Desaturation
	float lum = dot(color, vec3(0.299, 0.587, 0.114));
	color = mix(vec3(lum), color, 0.85);

	// Blue tint
	color += vec3(0.012, 0.014, 0.035) * 4.0;

	gl_FragColor = vec4(color, 1.0);
}
