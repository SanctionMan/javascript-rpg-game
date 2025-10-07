// Minimal main.js for the RPG project
// Initializes canvas, handles resize, provides a basic game loop using requestAnimationFrame
import Player from './player.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Virtual resolution for pixel-art games. Change TILE_SIZE or resolution as needed.
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

function resizeCanvas() {
  const container = document.getElementById('game-container');
  const rect = container.getBoundingClientRect();

  // Fit canvas while preserving aspect ratio
  const scale = Math.min(rect.width / GAME_WIDTH, rect.height / GAME_HEIGHT);
  canvas.style.width = Math.floor(GAME_WIDTH * scale) + 'px';
  canvas.style.height = Math.floor(GAME_HEIGHT * scale) + 'px';
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);

// Simple game state
const state = {
  lastTime: performance.now(),
  fps: 0,
  frames: 0,
  accumulator: 0,
};

// Input state (keys pressed)
const input = {};

// Create player
const player = new Player(GAME_WIDTH / 2, GAME_HEIGHT / 2);

// Keyboard handlers
window.addEventListener('keydown', (e) => { input[e.code] = true; });
window.addEventListener('keyup', (e) => { input[e.code] = false; });

function update(dt) {
  // Update player with current input
  player.update(dt, input);
}

function render() {
  // clear
  ctx.fillStyle = '#0b0b0b';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // simple grid background
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 1;
  for (let x = 0; x < GAME_WIDTH; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, GAME_HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < GAME_HEIGHT; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(GAME_WIDTH, y + 0.5);
    ctx.stroke();
  }

  // draw player
  player.draw(ctx);

  // fps
  ctx.fillStyle = '#fff';
  ctx.font = '16px sans-serif';
  ctx.fillText('FPS: ' + Math.round(state.fps), 10, 20);
}

function gameLoop(now) {
  const dt = (now - state.lastTime) / 1000; // seconds
  state.lastTime = now;

  state.frames++;
  state.accumulator += dt;
  if (state.accumulator >= 0.5) {
    state.fps = state.frames / state.accumulator;
    state.frames = 0;
    state.accumulator = 0;
  }

  update(dt);
  // render to an offscreen virtual resolution, then scale via CSS to keep pixels crisp
  // We'll keep canvas internal size at virtual resolution
  render();

  requestAnimationFrame(gameLoop);
}

function start() {
  // set canvas internal pixel resolution
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  resizeCanvas();
  canvas.focus();
  requestAnimationFrame((t) => {
    state.lastTime = t;
    gameLoop(t);
  });
}

start();

export { canvas, ctx, state };
