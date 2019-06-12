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

    const bullet300 = new Bullet({
      pos: this.pos,
      vel: [25, 0],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet300);

    const bullet336 = new Bullet({
      pos: this.pos,
      vel: [23.7, 7.9],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet336);

    const bullet412 = new Bullet({
      pos: this.pos,
      vel: [20, 15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet412);

    const bullet448 = new Bullet({
      pos: this.pos,
      vel: [15, 20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet448);

    const bullet524 = new Bullet({
      pos: this.pos,
      vel: [7.9, 23.7],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet524);

    const bullet600 = new Bullet({
      pos: this.pos,
      vel: [0, 25],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet600);

    const bullet636 = new Bullet({
      pos: this.pos,
      vel: [-7.9, 23.7],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet636);

    const bullet712 = new Bullet({
      pos: this.pos,
      vel: [-15, 20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet712);

    const bullet748 = new Bullet({
      pos: this.pos,
      vel: [-20, 15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet748);

    const bullet824 = new Bullet({
      pos: this.pos,
      vel: [-23.7, 7.9],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet824);

    const bullet900 = new Bullet({
      pos: this.pos,
      vel: [-25, 0],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet900);

    const bullet936 = new Bullet({
      pos: this.pos,
      vel: [-23.7, -7.9],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet936);

    const bullet1012 = new Bullet({
      pos: this.pos,
      vel: [-20, -15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1012);

    const bullet1048 = new Bullet({
      pos: this.pos,
      vel: [-15, -20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1048);

    const bullet1124 = new Bullet({
      pos: this.pos,
      vel: [-7.9, -23.7],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1124);

    const bullet1200 = new Bullet({
      pos: this.pos,
      vel: [0, -25],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1200);

    const bullet1236 = new Bullet({
      pos: this.pos,
      vel: [7.9, -23.7],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet1236);

    const bullet112 = new Bullet({
      pos: this.pos,
      vel: [15, -20],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet112);

    const bullet148 = new Bullet({
      pos: this.pos,
      vel: [20, -15],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet148);

    const bullet224 = new Bullet({
      pos: this.pos,
      vel: [23.7, -7.9],
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet224);
    
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
