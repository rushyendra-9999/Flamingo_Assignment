const vertexShaderSource = `#version 300 es
precision mediump float;

in vec2 a_position;
in vec2 a_velocity;
in float a_life;
in vec4 a_color;

out vec4 v_color;
out float v_life;

uniform float u_time;

void main() {
    float age = mod(u_time, a_life);
    vec2 pos = a_position + a_velocity * age + vec2(0.0, -0.5) * age * age;
    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = 8.0 * (1.0 - age / a_life);
    v_color = a_color;
    v_color.a *= (1.0 - age / a_life);
    v_life = age;
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;
in vec4 v_color;
out vec4 outColor;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    outColor = v_color;
}
`;
