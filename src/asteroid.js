const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");
// import { randomColor } from './ship.js';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 32,
  SPEED: 2
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = "rgba(255, 255, 255, 0.3)";
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
    this.startGlow = Math.floor(10*Math.random());
    console.log(this.startGlow);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 1;
    // ctx.shadowBlur = 0;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
    // ctx.stroke();
    let spaceFlyX = 0, spaceFlyY = 0;
    // note that asteroids always have nonzero velocity
    if(this.vel[0]===0) {
      spaceFlyX = 0;
      if(this.vel[1] < 0) {
        spaceFlyY = 0;
      } else {
        spaceFlyY = 500;
      }
    } else if (this.vel[1] === 0) {
      spaceFlyX = 0;
      if (this.vel[0] > 0) {
        spaceFlyY = 250;
      } else {
        spaceFlyY = 750;
      }
    } else {
      let angle = Math.abs(Math.atan(this.vel[1] / this.vel[0])) * 32 / Math.PI;
      if (this.vel[0] > 0){
        if (this.vel[1] < 0){
          spaceFlyY = 0;
          spaceFlyX = 250 * Math.floor(125 * (17 - angle) / 250); 
        } else {
          spaceFlyY = 250;
          spaceFlyX = 250 * Math.floor(125 * angle / 250);
        }
      } else {
        if (this.vel[1] < 0) {
          spaceFlyY = 750;
          spaceFlyX = 250 * Math.floor(125 * angle / 250);
        } else {
          spaceFlyY = 500;
          spaceFlyX = 250 * Math.floor(125 * (17 - angle) / 250);
        }
      }
    }
    if (spaceFlyX < 0) spaceFlyX = 0;
    if (spaceFlyX > 1750) spaceFlyX = 1750;
    // console.log(spaceFlyX,spaceFlyY);
    let myShadowBlur = (this.startGlow + Math.floor(this.game.framesCounter/3)) % 10 + 2;
    if(myShadowBlur > 6) myShadowBlur = 14 - myShadowBlur;
    ctx.shadowBlur = myShadowBlur;
    ctx.shadowColor = "#9D0";
    ctx.drawImage(this.game.spaceFly,spaceFlyX,spaceFlyY,250,250,this.pos[0]-63,this.pos[1]-63,125,125);
  }
  
}

module.exports = Asteroid;
