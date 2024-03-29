const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
  
  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 5;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.stroke();

  }
}

Bullet.RADIUS = 16;
Bullet.SPEED = 4;

module.exports = Bullet;
