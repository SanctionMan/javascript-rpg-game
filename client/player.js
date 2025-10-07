// Player class - minimal controllable player
export default class Player {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.size = 32; // 32x32 box
    this.color = '#ffcc00';
    this.speed = 160; // pixels per second
  }

  update(dt, input) {
    let dx = 0;
    let dy = 0;
    if (input['KeyA'] || input['ArrowLeft']) dx -= 1;
    if (input['KeyD'] || input['ArrowRight']) dx += 1;
    if (input['KeyW'] || input['ArrowUp']) dy -= 1;
    if (input['KeyS'] || input['ArrowDown']) dy += 1;

    // normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const inv = Math.SQRT1_2; // 1/sqrt(2)
      dx *= inv;
      dy *= inv;
    }

    this.x += dx * this.speed * dt;
    this.y += dy * this.speed * dt;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.round(this.x - this.size / 2), Math.round(this.y - this.size / 2), this.size, this.size);
  }
}
