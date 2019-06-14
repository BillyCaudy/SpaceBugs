const MovingObject = require("./moving_object");
const Bullet = require("./bullet");
const Util = require("./util");
const hexDigits = "0123456789ABCDEF";
let normVel = [1,0];

function randomColor() {

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

function colorIncrease(colorVal) {
  if(colorVal==="F") return "F";
  return hexDigits[ hexDigits.indexOf(colorVal) + 1 ]
}

function colorDecrease(colorVal) {
  if (colorVal === "0") return "0";
  return hexDigits[hexDigits.indexOf(colorVal) - 1]
}

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);

    this.otherColor = options.otherColor;
    this.resetColorRandomly = this.resetColorRandomly.bind(this);
    this.resetColorsSequentially = this.resetColorsSequentially.bind(this);
  }
  
  resetColorRandomly() {
    this.color = randomColor();
  }

  resetColorsSequentially() {
    this.color = this.advanceColorSequentially(this.color);
    this.otherColor = this.advanceColorSequentially(this.otherColor);
  }
  
  advanceColorSequentially(color) {
    let colors = color.split("");
    let red = colors[1];
    let green = colors[2];
    let blue = colors[3];
    if (red === "F") {
      if (blue === "0") {
        if (green === "F") {
          red = colorDecrease(red);
        } else {
          green = colorIncrease(green);
        }
      } else {
        blue = colorDecrease(blue);
      }
    } else if (green === "F") {
      if (red === "0") {
        if (blue === "F") {
          green = colorDecrease(green);
        } else {
          blue = colorIncrease(blue);
        }
      } else {
        red = colorDecrease(red);
      }
    } else if (blue === "F") {
      if (green === "0") {
        if (red === "F") {
          blue = colorDecrease(blue);
        } else {
          red = colorIncrease(red);
        }
      } else {
        green = colorDecrease(green);
      }
    }
    return "#" + red + green + blue;
  }

  draw(ctx) {
    if(Util.norm(this.vel) !== 0) normVel = Util.dir(this.vel);
    console.log(normVel);
    let xi = this.pos[0] - this.radius / 2 * normVel[0];
    let yi = this.pos[1] - this.radius / 2 * normVel[1];
    let xf = this.pos[0] + this.radius / 2 * normVel[0];
    let yf = this.pos[1] + this.radius / 2 * normVel[1];
    let shipGradient = ctx.createLinearGradient(xi, yi, xf, yf);
    shipGradient.addColorStop(0, this.color);
    shipGradient.addColorStop(1, this.otherColor);
    ctx.fillStyle = shipGradient; // gradient(this.color, this.otherColor);

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
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
