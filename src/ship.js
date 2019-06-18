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
    // this.resetColorRandomly = this.resetColorRandomly.bind(this);
    // this.resetColorsSequentially = this.resetColorsSequentially.bind(this);
    this.cornersRelPos = [[0, 0], [0, 0], [0, 0]];
    this.cornersAbsPos = [[0,0],[0,0],[0,0]];
    // this.calcCornersAbsolutePosition = this.calcCornersAbsolutePosition.bind(this);
    this.rotateCorners();
    this.calcCornersAbsolutePosition();
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
    let xi = this.pos[0] - this.radius * normVel[0];
    let yi = this.pos[1] - this.radius * normVel[1];
    let xf = this.pos[0] + 2*this.radius * normVel[0];
    let yf = this.pos[1] + 2*this.radius * normVel[1];
    let shipGradient = ctx.createLinearGradient(xi, yi, xf, yf);
    shipGradient.addColorStop(0, this.color);
    shipGradient.addColorStop(1, this.otherColor);
    ctx.fillStyle = shipGradient; // gradient(this.color, this.otherColor);
    ctx.shadowBlur = 7;
    ctx.shadowColor = this.otherColor;
    ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    this.rotateCorners();
    this.calcCornersAbsolutePosition();
    ctx.moveTo(this.cornersAbsPos[0][0], this.cornersAbsPos[0][1]);
    ctx.lineTo(this.cornersAbsPos[1][0], this.cornersAbsPos[1][1]);
    ctx.lineTo(this.cornersAbsPos[2][0], this.cornersAbsPos[2][1]);
    ctx.fill();
  }
  
  rotateCorners() { // this.cornersRelPos = [[-this.radius, this.radius], [this.radius, 0], [-this.radius, -this.radius]];
    let dirAngle = Math.atan(this.vel[1]/this.vel[0]);
    if (isNaN(dirAngle)) dirAngle = 0;
    let signController = 1;
    if(this.vel[0]<0) signController = -1;
    let zeroAngleCorners = [[-this.radius, this.radius], [2*this.radius, 0], [-this.radius, -this.radius]];
    this.cornersRelPos[0][0] = (zeroAngleCorners[0][0] * Math.cos(dirAngle) + zeroAngleCorners[0][1] * Math.sin(dirAngle))*signController;
    this.cornersRelPos[0][1] = (-zeroAngleCorners[0][1] * Math.cos(dirAngle) + zeroAngleCorners[0][0] * Math.sin(dirAngle))*signController;
    this.cornersRelPos[1][0] = (zeroAngleCorners[1][0] * Math.cos(dirAngle) + zeroAngleCorners[1][1] * Math.sin(dirAngle))*signController;
    this.cornersRelPos[1][1] = (-zeroAngleCorners[1][1] * Math.cos(dirAngle) + zeroAngleCorners[1][0] * Math.sin(dirAngle))*signController;
    this.cornersRelPos[2][0] = (zeroAngleCorners[2][0] * Math.cos(dirAngle) + zeroAngleCorners[2][1] * Math.sin(dirAngle))*signController;
    this.cornersRelPos[2][1] = (-zeroAngleCorners[2][1] * Math.cos(dirAngle) + zeroAngleCorners[2][0] * Math.sin(dirAngle))*signController;
  }
  
  calcCornersAbsolutePosition() {
    this.cornersAbsPos[0][0] = this.pos[0] + this.cornersRelPos[0][0];
    this.cornersAbsPos[0][1] = this.pos[1] + this.cornersRelPos[0][1];
    this.cornersAbsPos[1][0] = this.pos[0] + this.cornersRelPos[1][0];
    this.cornersAbsPos[1][1] = this.pos[1] + this.cornersRelPos[1][1];
    this.cornersAbsPos[2][0] = this.pos[0] + this.cornersRelPos[2][0];
    this.cornersAbsPos[2][1] = this.pos[1] + this.cornersRelPos[2][1];
    console.log(this.cornersAbsPos, this.cornersAbsPos);
  }

  fireVolly() {
    const vollyCount = 5;
    let bulletPos = this.pos;
    // const bulletStep = 1.5;
    const bulletVelStep = 2;
    let bulletColor = this.color;
    
    const normShipVel = Util.norm(this.vel);

    let relVel = [Bullet.SPEED, 0];
    let relDir = [1,0];
    
    if (normShipVel !== 0) {
      relDir = Util.dir(this.vel);
      relVel = Util.scale(relDir, Bullet.SPEED);
    }

    let bulletVel = [
      relVel[0] + this.vel[0],
      relVel[1] + this.vel[1]
    ];
    
    for (let i = 0; i < vollyCount; i++) {   
      this.fireBullet(bulletPos, bulletVel, bulletColor);
      let bulletVelStepVector = Util.scale(relDir, bulletVelStep);
      // console.log(bulletVel, bulletVelStepVector);
      bulletVel = [
        bulletVel[0] + bulletVelStepVector[0],
        bulletVel[1] + bulletVelStepVector[1]
      ];
      // console.log(bulletVel);
      bulletColor = this.advanceColorSequentially(bulletColor);
      bulletColor = this.advanceColorSequentially(bulletColor);
      bulletColor = this.advanceColorSequentially(bulletColor);
      bulletColor = this.advanceColorSequentially(bulletColor);
    }
  }
  
  fireBullet(bulletPos,bulletVel,bulletColor) {

    let bullet1200 = new Bullet({
      pos: bulletPos,
      vel: bulletVel,
      color: bulletColor,
      game: this.game
    });
    
    this.game.add(bullet1200);
    
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.centerPosition();
    // console.log(this.pos);
    this.vel = [0, 0];
  }
}

Ship.RADIUS = 16;
module.exports = Ship;
