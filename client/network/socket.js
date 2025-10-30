import { io } from 'socket.io-client';
import { Player } from '../entities/player.js';
import { getRandomColor } from '../utils/colors.js';

export class Network {
    constructor(scene, gui, inputHandler, dayNightCycle = null, hud = null) {
        this.scene = scene;
        this.gui = gui;
        this.input = inputHandler;
        this.players = {};
        this.dayNightCycle = dayNightCycle; // optional lighting controller
        this.hud = hud; // optional HUD for time display

        this.socket = io('http://localhost:3000');
        this.localPlayerId = null;

        this.setupSocketEvents();
    }

    setupSocketEvents() {
        this.socket.on('connect', () => {
            this.localPlayerId = this.socket.id;
            const name = `Player${Math.floor(Math.random() * 1000)}`;
            this.socket.emit('setName', name);
    });

    this.socket.on('currentPlayers', (serverPlayers) => {
        Object.values(serverPlayers).forEach((p) => this.addPlayer(p));
    });

    this.socket.on('playerJoined', (playerData) => this.addPlayer(playerData));
    this.socket.on('playerMoved', (playerData) => this.movePlayer(playerData));
    this.socket.on('playerLeft', (id) => this.removePlayer(id));

    // Listen for server time updates for day/night cycle
    this.socket.on('timeUpdate', (time) => {
        if (this.dayNightCycle) {
            this.dayNightCycle.setTargetTime(time);
            // Show time in HUD if available
            if (this.hud && this.dayNightCycle.getTimeString) {
              this.hud.setTimeString(this.dayNightCycle.getTimeString());
            }
        }
    });
    }

    addPlayer(data) {
        if (!this.players[data.id]) {
            this.players[data.id] = new Player(this.scene, this.gui, data);
        }
    }

    removePlayer(id) {
        if (this.players[id]) {
            this.players[id].dispose();
            delete this.players[id];
        }
    }

    movePlayer(data) {
        if (this.players[data.id]) {
            this.players[data.id].updatePosition(data.x, data.y, data.z);
        }
    }

    updateLocalPlayer() {
        const player = this.players[this.localPlayerId];
        if (!player) return;

        // Handle movement input
        let moved = false;
        const moveSpeed = 0.1;
        const gravity = -0.01;

        if (this.input.isKeyPressed('w')) { player.mesh.position.z += moveSpeed; moved = true; }
        if (this.input.isKeyPressed('s')) { player.mesh.position.z -= moveSpeed; moved = true; }
        if (this.input.isKeyPressed('a')) { player.mesh.position.x -= moveSpeed; moved = true; }
        if (this.input.isKeyPressed('d')) { player.mesh.position.x += moveSpeed; moved = true; }

        // Jump
        if (this.input.isKeyPressed(' ')) { player.jump(); }

        player.applyGravity(gravity);

        // Send movement to server
        if (moved || player.vy !== 0) {
            this.socket.emit('move', {
                x: player.mesh.position.x,
                y: player.mesh.position.y,
                z: player.mesh.position.z
            });
        }
    }
}