
export class InputHandler {
    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (event) => {
            this.keys[event.key.toLowerCase()] = true;
        });
        window.addEventListener('keyup', (event) => {
            this.keys[event.key.toLowerCase()] = false;
        });
    }

    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }
}