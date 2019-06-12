const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Bullet.RADIUS = 64;
Bullet.SPEED = 32;

module.exports = Bullet;
