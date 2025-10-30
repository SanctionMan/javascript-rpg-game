import { 
  MeshBuilder, 
  Vector3, 
  DirectionalLight, 
  HemisphericLight, 
  Color3, 
  StandardMaterial, 
  Texture 
} from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';

/**
 * Creates a dynamic procedural sky with moving sun, moon, stars, and lighting.
 * @param {BABYLON.Scene} scene
 * @param {number} dayDuration - duration of a full day/night cycle in seconds
 */
export function createSky(scene, dayDuration = 120) {
  // 🌌 Skybox
  const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, scene);
  const skyMaterial = new SkyMaterial('skyMaterial', scene);
  skyMaterial.backFaceCulling = false;
  skybox.material = skyMaterial;

  // ☀️ Sun (Directional Light)
  const sun = new DirectionalLight('sunLight', new Vector3(0, -1, 0), scene);
  sun.intensity = 1.2;
  sun.diffuse = new Color3(1, 1, 0.9);
  sun.specular = new Color3(1, 1, 0.9);

  // 🌗 Ambient light to simulate sky glow
  const ambient = new HemisphericLight('ambientLight', new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.6;
  ambient.groundColor = new Color3(0.2, 0.2, 0.25);

  // 🌕 Moon
  const moon = MeshBuilder.CreateSphere('moon', { diameter: 10 }, scene);
  const moonMat = new StandardMaterial('moonMat', scene);
  moonMat.emissiveColor = new Color3(0.9, 0.9, 1.0);
  moon.material = moonMat;

  // 🌟 Stars (now loaded locally from assets)
  const stars = MeshBuilder.CreateSphere('stars', { diameter: 980, sideOrientation: 1 }, scene);
  const starMat = new StandardMaterial('starMat', scene);
  starMat.emissiveTexture = new Texture('/assets/textures/starfield.jpg', scene);
  starMat.backFaceCulling = false;
  starMat.disableLighting = true;
  starMat.alpha = 0; // fade-in controlled dynamically
  stars.material = starMat;

  // ⏱️ Time tracking
  let time = 0;
  const dayLength = dayDuration;

  scene.onBeforeRenderObservable.add(() => {
    const deltaTime = scene.getEngine().getDeltaTime() / 1000;
    time += deltaTime;

    const t = (time % dayLength) / dayLength;
    const sunAngle = t * 2 * Math.PI;

    // 🌅 Move sun + moon
    const sunPos = new Vector3(Math.sin(sunAngle) * 100, Math.cos(sunAngle) * 100, 0);
    const moonPos = new Vector3(-sunPos.x, -sunPos.y, -sunPos.z);

    sun.position.copyFrom(sunPos);
    moon.position.copyFrom(moonPos);
    sun.direction = sunPos.negate().normalize();

    // ☀️ Brightness factor
    const brightness = Math.max(0, Math.sin(sunAngle));

    // Sky and sunlight
    skyMaterial.inclination = 1 - (Math.cos(sunAngle) * 0.5 + 0.5);
    skyMaterial.luminance = 0.3 + brightness * 0.8;
    sun.intensity = 0.6 + brightness * 1.5;

    // 🌗 Ambient adjustment
    ambient.intensity = 0.3 + brightness * 0.7;
    ambient.diffuse = new Color3(
      0.3 + brightness * 0.7,
      0.3 + brightness * 0.6,
      0.4 + brightness * 0.5
    );

    // 🌕 Moon and stars fade
    const nightFactor = 1 - brightness;
    moonMat.alpha = Math.min(1, nightFactor + 0.1);
    starMat.alpha = Math.pow(nightFactor, 1.5);

    // Ground tint for night vs day (optional)
    if (scene.getMeshByName('ground')) {
      const ground = scene.getMeshByName('ground');
      if (ground.material && ground.material.diffuseColor) {
        ground.material.diffuseColor = Color3.Lerp(
          new Color3(0.05, 0.1, 0.2), // cool night
          new Color3(0.3, 0.8, 0.3), // bright day
          brightness
        );
      }
    }
  });

  return { skybox, sun, moon, stars, ambient };
}