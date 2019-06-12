const MovingObject = require("./moving_object");
const Bullet = require("./bullet");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
  }

  fireBullet() {
    // const norm = Util.norm(this.vel);

    // if (norm === 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    // const relVel = Util.scale(
    //   Util.dir(this.vel),
    //   Bullet.SPEED
    // );

    // const bulletVel = [
    //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    // ];

    const bullet1 = new Bullet({
      pos: this.pos,
      vel: [25, 0],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1);

    const bullet2 = new Bullet({
      pos: this.pos,
      vel: [20, 15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet2);

    const bullet3 = new Bullet({
      pos: this.pos,
      vel: [15, 20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet3);

    const bullet4 = new Bullet({
      pos: this.pos,
      vel: [0, 25],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet4);

    const bullet5 = new Bullet({
      pos: this.pos,
      vel: [-15, 20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet5);

    const bullet6 = new Bullet({
      pos: this.pos,
      vel: [-20, 15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet6);

    const bullet7 = new Bullet({
      pos: this.pos,
      vel: [-25, 0],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet7);

    const bullet8 = new Bullet({
      pos: this.pos,
      vel: [-20, -15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet8);

    const bullet9 = new Bullet({
      pos: this.pos,
      vel: [-15, -20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet9);

    const bullet10 = new Bullet({
      pos: this.pos,
      vel: [0, -25],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet10);

    const bullet11 = new Bullet({
      pos: this.pos,
      vel: [15, -20],
      color: this.color,
      game: this.game
    });

    this.game.add(bullet11);

    const bullet12 = new Bullet({
      pos: this.pos,
      vel: [20, -15],
      color: this.color,
      game: this.game
    });

    this.game.add(bullet12);
    
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Ship.RADIUS = 16;
module.exports = Ship;
