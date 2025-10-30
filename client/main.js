import { createScene } from './core/scene.js';
import { createFollowCamera } from './core/camera.js';
import { InputHandler } from './utils/input.js';
import { Network } from './network/socket.js';
import { DayNightCycle } from './core/lighting.js';
import { HUD } from './ui/hud.js';
import { startRenderLoop } from './core/renderer.js'; // <-- import renderer

const canvas = document.getElementById('gameCanvas');
const { scene, engine, gui } = createScene(canvas);

const hud = new HUD(gui);
const dayNightCycle = new DayNightCycle(scene);
const input = new InputHandler();
const network = new Network(scene, gui, input, dayNightCycle, hud);

let followCamera = null;

// Modular render loop using renderer.js
startRenderLoop(engine, scene, [
  dayNightCycle, // will call dayNightCycle.update()
  {
    update: () => {
      network.updateLocalPlayer();

      // Attach camera to local player once it exists
      if (!followCamera && network.players[network.localPlayerId]) {
        const localPlayerMesh = network.players[network.localPlayerId].mesh;
        followCamera = createFollowCamera(scene, canvas, localPlayerMesh);
        scene.activeCamera = followCamera;
        followCamera.attachControl(canvas, true);
        console.log('✅ Follow camera activated for local player');
      }
      if (followCamera && scene.activeCamera !== followCamera) {
        scene.activeCamera = followCamera;
      }

      // Update HUD time string smoothly
      if (hud && dayNightCycle.getTimeString) {
        hud.setTimeString(dayNightCycle.getTimeString());
      }
    }
  }
]);