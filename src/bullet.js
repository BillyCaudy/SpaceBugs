const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
  
  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }
}

Bullet.RADIUS = 64;
Bullet.SPEED = 32;

module.exports = Bullet;
