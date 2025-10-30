import { MeshBuilder, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';
import { TextBlock } from '@babylonjs/gui';

export class Player {
    constructor(scene, gui, data) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.vy = 0;

        // Cube mesh
        this.mesh = MeshBuilder.CreateBox(`player_${this.id}`, { size: 1 }, scene);
        this.mesh.position = new Vector3(data.x, data.y, data.z);

        // Color
        this.mesh.material = new StandardMaterial(`mat_${this.id}`, scene);
        this.mesh.material.diffuseColor = new Color3(this.color.r, this.color.g, this.color.b);

        // Name tag
        this.nameTag = new TextBlock();
        this.nameTag.text = this.name;
        this.nameTag.color = 'white';
        this.nameTag.fontSize = 16;
        gui.addControl(this.nameTag);
        this.nameTag.linkWithMesh(this.mesh);
        this.nameTag.linkOffsetY = -50;
    }

    updatePosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    jump() {
        if (this.mesh.position.y <= 0.5) this.vy = 0.2;
    }

    applyGravity(gravity = -0.01) {
        this.vy += gravity;
        this.mesh.position.y += this.vy;
        if (this.mesh.position.y < 0.5) {
            this.mesh.position.y = 0.5;
            this.vy = 0;
        }
    }

    dispose() {
        this.mesh.dispose();
        this.nameTag.dispose();
    }
}