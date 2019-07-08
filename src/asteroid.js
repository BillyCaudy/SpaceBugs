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
    options.pos = options.pos || options.game.boarderPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
    this.boarderDweller = true;
    this.isWrappable = false;
    this.startGlow = Math.floor(10*Math.random());
    this.reCharge = false;
    this.nearestExit = this.game.farCorner();
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
    
    if(!this.game.isPaused) this.adjustCourse();
  }
  
  adjustCourse() {
    let ship = this.game.ships[0];
    let target = ship.pos;
    let relTarget = Util.diff(target, this.pos);
    let targetDistance = Util.norm(relTarget);
    if (!this.reCharge && targetDistance < 180) this.reCharge = true;
    if(this.reCharge) {
      target = this.nearestExit; 
      relTarget = Util.diff(target, this.pos);
    }
    let bestTraj = Util.dir(relTarget);
    let thisTraj = Util.dir(this.vel);
    let bestAng = Math.atan(bestTraj[1] / bestTraj[0]);
    if (bestTraj[0] < 0) bestAng = bestAng + Math.PI;
    let thisAng = Math.atan(thisTraj[1] / thisTraj[0]);
    if (thisTraj[0] < 0) thisAng = thisAng + Math.PI;
    let rotAng = Math.PI/16;
    let diffAng = bestAng - thisAng;
    if ((diffAng > Math.PI && diffAng < 2*Math.PI) || (diffAng < 0 && diffAng > -Math.PI)) rotAng = -rotAng;
    if (Math.abs(diffAng) >= Math.PI / 16) this.vel = Util.rotateVec(this.vel, rotAng);
    // let newTraj = Util.dir(this.vel);
    // let newAng = Math.atan(newTraj[1] / newTraj[0]);
    // if (newTraj[1] < 0) newAng = newAng + Math.PI;
    // if (!this.game.isPaused && this.game.framesCounter % 100 < 10) console.log(bestAng,thisAng,diffAng, Math.sign(rotAng));
  }
  
  fireSpit() {
    this.reCharge = true;
  }
  
}

module.exports = Asteroid;
