const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl2");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

function compileShader(source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(shader));
  return shader;
}

const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

// Attributes
const a_position = gl.getAttribLocation(program, "a_position");
const a_velocity = gl.getAttribLocation(program, "a_velocity");
const a_life = gl.getAttribLocation(program, "a_life");
const a_color = gl.getAttribLocation(program, "a_color");
const u_time = gl.getUniformLocation(program, "u_time");

// Particle data
const MAX = 1000;
const floatsPerParticle = 2 + 2 + 1 + 4;
const particleData = new Float32Array(MAX * floatsPerParticle);

function spawnBurst(x, y) {
  for (let i = 0; i < MAX; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const lifetime = 2 + Math.random();
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    const a = 1.0;

    const offset = i * floatsPerParticle;
    particleData.set([x, y, vx, vy, lifetime, r, g, b, a], offset);
  }
}

spawnBurst(0.0, 0.0); // Start burst

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, particleData, gl.STATIC_DRAW);

// Enable attributes
gl.vertexAttribPointer(
  a_position,
  2,
  gl.FLOAT,
  false,
  floatsPerParticle * 4,
  0
);
gl.enableVertexAttribArray(a_position);

gl.vertexAttribPointer(
  a_velocity,
  2,
  gl.FLOAT,
  false,
  floatsPerParticle * 4,
  2 * 4
);
gl.enableVertexAttribArray(a_velocity);

gl.vertexAttribPointer(
  a_life,
  1,
  gl.FLOAT,
  false,
  floatsPerParticle * 4,
  4 * 4
);
gl.enableVertexAttribArray(a_life);

gl.vertexAttribPointer(
  a_color,
  4,
  gl.FLOAT,
  false,
  floatsPerParticle * 4,
  5 * 4
);
gl.enableVertexAttribArray(a_color);

// Animation
let startTime = performance.now() / 1000;
function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  const t = performance.now() / 1000 - startTime;
  gl.uniform1f(u_time, t);
  gl.drawArrays(gl.POINTS, 0, MAX);
  requestAnimationFrame(draw);
}
draw();

// Interactivity
canvas.addEventListener("click", (e) => {
  const x = (e.clientX / canvas.width) * 2 - 1;
  const y = -((e.clientY / canvas.height) * 2 - 1);
  spawnBurst(x, y);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, particleData);
  startTime = performance.now() / 1000;
});
