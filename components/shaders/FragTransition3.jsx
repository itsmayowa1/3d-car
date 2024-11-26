export default /* glsl */ ` 
uniform float uProgress;
uniform vec3 prevColor;
uniform vec3 newColor;
varying vec3 csm_vPosition;
varying vec2 vUv;
uniform vec2 iResolution;

float rand2(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

float noise(vec2 p) {
    vec2 ip = floor(p), u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    return mix(
        mix(rand2(ip), rand2(ip + vec2(1.0, 0.0)), u.x),
        mix(rand2(ip + vec2(0.0, 1.0)), rand2(ip + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p, int octaves) {
    float n = 0.0, a = 1.0, norm = 0.0;
    for (int i = 0; i < octaves; ++i) {
        n += noise(p) * a; norm += a; p *= 2.0; a *= 0.5;
    }
    return n / norm;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
  uv.y *= iResolution.y/iResolution.x;  
  float angle = atan(uv.y, uv.x);
  angle += fbm(uv * 4.0, 2) * 0.5;
  vec2 p = vec2(cos(angle), sin(angle));
  float t = uProgress * 0.5;
  t *= t * 2.;
  float l = dot(uv / t, uv / t);
  l -= (fbm(uv * 30.0, 8) - 0.5);
  float ink = fbm(p * 16.0, 1) + 1.5 - l;
  vec3 col = mix(prevColor, newColor, clamp(0.0, 1.0, clamp(ink, 0.0, 1.0)));
  csm_DiffuseColor = vec4(csm_DiffuseColor.rgb * col, 1.0);
}
`
