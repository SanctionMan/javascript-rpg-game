import { MeshBuilder, StandardMaterial, Color3, DirectionalLight, Vector3 } from '@babylonjs/core';

// Day/night cycle controller with smooth interpolation
export class DayNightCycle {
  constructor(scene) {
    this.scene = scene;
    this.currentTime = 0; // 0..1
    this.targetTime = 0;
    this.lerpSpeed = 0.05;

    // Sun light
    this.sun = new DirectionalLight('sun', new Vector3(0, -1, 0), scene);
    this.sun.position = new Vector3(0, 40, 0);
    this.sun.intensity = 1.0;

    // Sky dome
    this.sky = MeshBuilder.CreateSphere('sky', { diameter: 200, sideOrientation: 1 }, scene);
    this.skyMaterial = new StandardMaterial('skyMat', scene);
    this.skyMaterial.backFaceCulling = false;
    this.sky.material = this.skyMaterial;
    this.updateLighting(0);
  }

  setTargetTime(time) {
    this.targetTime = time;
  }

  update() {
    // Smoothly interpolate currentTime toward targetTime
    this.currentTime += (this.targetTime - this.currentTime) * this.lerpSpeed;
    this.updateLighting(this.currentTime);
  }

  updateLighting(time) {
    // Sun position: rotates around Y axis
    const sunAngle = (time - 0.25) * Math.PI * 2;
    this.sun.direction = new Vector3(Math.cos(sunAngle), -Math.sin(sunAngle), 0);

    // Sun intensity and color
    const day = time > 0.23 && time < 0.73;
    this.sun.intensity = day ? 1.0 : 0.2;
    this.sun.diffuse = day
      ? new Color3(1, 0.95, 0.8)
      : new Color3(0.2, 0.2, 0.5);

    // Sky color
    let color;
    if (time < 0.23 || time > 0.77) {
      color = new Color3(0.05, 0.07, 0.2); // night
    } else if (time < 0.25) {
      color = Color3.Lerp(new Color3(0.05, 0.07, 0.2), new Color3(0.8, 0.5, 0.2), (time - 0.23) / 0.02); // sunrise
    } else if (time < 0.73) {
      color = new Color3(0.4, 0.7, 1.0); // day
    } else {
      color = Color3.Lerp(new Color3(0.4, 0.7, 1.0), new Color3(0.05, 0.07, 0.2), (time - 0.73) / 0.04); // sunset
    }
    this.skyMaterial.diffuseColor = color;
    this.skyMaterial.emissiveColor = color;
  }

  getTimeString() {
    // Converts currentTime (0..1) to 12-hour clock string
    const totalMinutes = Math.floor(this.currentTime * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
}