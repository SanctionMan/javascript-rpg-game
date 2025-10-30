// Main render loop for Babylon.js RPG
export function startRenderLoop(engine, scene, updatables = []) {
  engine.runRenderLoop(() => {
    updatables.forEach((obj) => {
      if (obj && typeof obj.update === 'function') obj.update();
    });
    scene.render();
  });

  window.addEventListener('resize', () => engine.resize());
}