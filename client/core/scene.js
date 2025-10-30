import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, DirectionalLight } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

export function createScene(canvas) {
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // TEMPORARY dummy camera to prevent "No camera defined"
    const dummyCamera = new FreeCamera('dummyCam', new Vector3(0, 10, -10), scene);
    scene.activeCamera = dummyCamera; // will be replaced by player camera later

    // Ground
    const ground = MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, scene);
    const groundMat = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.3, 0.8, 0.3);
    ground.material = groundMat;

    // Lighting
    //const light = new DirectionalLight('dirLight', new Vector3(-1, -2, -1), scene);
    //light.position = new Vector3(20, 40, 20);

    // Babylon GUI for name tags
    const gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());

    return { scene, engine, gui };
}