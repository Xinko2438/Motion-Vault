uniform sampler2D uPrevFluid;
uniform sampler2D uTrailTexture;
uniform vec2 uAspect;

varying vec2 vUv;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u * u * (3.0 - 2.0 * u);

	float res = mix(
		mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
		mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
		u.y
	);
	return res * res;
}

float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100.0);
	float angle = 0.5;
	float c = cos(angle);
	float s = sin(angle);
	mat2 rot = mat2(c, s, -s, c);

	for (int i = 0; i < 4; i++) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

void main() {
	vec2 disp = fbm(vUv * 20.0) * uAspect * 0.01;

	vec3 texel  = texture2D(uPrevFluid, vUv).rgb;
	vec3 texel2 = texture2D(uPrevFluid, vec2(vUv.x + disp.x, vUv.y)).rgb;
	vec3 texel3 = texture2D(uPrevFluid, vec2(vUv.x - disp.x, vUv.y)).rgb;
	vec3 texel4 = texture2D(uPrevFluid, vec2(vUv.x, vUv.y + disp.y)).rgb;
	vec3 texel5 = texture2D(uPrevFluid, vec2(vUv.x, vUv.y - disp.y)).rgb;

	vec3 floodcolor = texel;
	floodcolor = min(floodcolor, texel2);
	floodcolor = min(floodcolor, texel3);
	floodcolor = min(floodcolor, texel4);
	floodcolor = min(floodcolor, texel5);

	vec3 input_ = texture2D(uTrailTexture, vUv).rgb;
	vec3 combined = min(floodcolor, input_);

	gl_FragColor = vec4(min(vec3(1.0), combined + vec3(0.015)), 1.0);
}
