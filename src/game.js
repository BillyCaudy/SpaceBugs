const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Util = require("./util");
const numFrames = 99;
const bgImgs = new Array(numFrames);
const bgDuration = 1;
let level = 0;
let bgIdx = 0;
const spaceFly = new Image();
spaceFly.src = './pics/spaceFlySprite.png'
let spaceFlyIdx = 0;
let spaceFlyX = 0, spaceFlyY = -63, spaceFlyW = 2000, spaceFlyH = 1000;
const slime = new Image();
slime.src = './pics/slimeSprite.png'
let slimeIdx = 0;
let slimeX = 0, slimeY = 187, slimeW = 2000, slimeH = 1000;

class Game {
  constructor() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.spaceFly = spaceFly;
    this.framesCounter = 0;
    this.isPaused = true;

    for(let i = 0; i < numFrames; i++) {
      let bgImg = new Image();
      bgImg.src = `./pics/${9*(i + 1)}.jpg`;
      bgImg.style = "opacity: 0.2";
      // if(i===0) console.log(bgImg);
      bgImgs[i] = bgImg;
      
    }
    
    this.addAsteroids = this.addAsteroids.bind(this);
  }
  
  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Ship) {
      this.ships.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addAsteroids() {
    for (let i = 0; i < 3 * level; i++) { 
      this.add(new Asteroid({ game: this }));
    }

    level++;
  }

  addShip() {
    const ship = new Ship({
      pos: this.centerPosition(),
      game: this,
      color: "#F00",
      otherColor: "#FF0"
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.ships, this.asteroids, this.bullets);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.shadowBlur = 0;
    
    // ctx.drawImage(bgImgs[16], 5, 5); 
    ctx.drawImage(bgImgs[Math.floor(bgIdx / bgDuration)], 5, 5);
    bgIdx = (bgIdx + 1) % (bgDuration * numFrames);

    let cropW = spaceFlyW / 8, cropH = spaceFlyH / 4;
    let cropX = ((spaceFlyIdx % 8) * cropW) % spaceFlyW;
    let cropY = (Math.floor(spaceFlyIdx / 8) * cropH) % spaceFlyH;
    // ctx.drawImage(spaceFly, cropX, cropY, cropW, cropH, spaceFlyX, spaceFlyY, cropW, cropH);
    spaceFlyIdx = (spaceFlyIdx + 1) % 32;
    if (spaceFlyX === Game.DIM_X - 10) spaceFlyY = (spaceFlyY + 10) % Game.DIM_Y;
    spaceFlyX = (spaceFlyX + 10) % Game.DIM_X;

    
    
    cropW = slimeW / 8, cropH = slimeH / 4;
    cropX = ((slimeIdx % 8) * cropW) % slimeW;
    cropY = (Math.floor(slimeIdx / 8) * cropH) % slimeH;
    // ctx.drawImage(slime, cropX, cropY, cropW, cropH, slimeX + cropW / 8, slimeY, cropW / 2, cropH / 2);
    slimeIdx = (slimeIdx + 1) % 32;
    if (slimeX === Game.DIM_X - 10) slimeY = (slimeY + 10) % Game.DIM_Y;
    slimeX = (slimeX + 10) % Game.DIM_X;
    
    ctx.font = "bold italic 42px Impact";
    ctx.fillText(":::::SpaceForce:::::   Make The Galaxy Great Again!",20,50)
    
    this.ships[0].resetColorsSequentially();
    this.allObjects().forEach((object) => { //comment out 
      object.draw(ctx); //these lines to exclude 
    }); //asteroids and ship
    
  }

  modal(ctx) {
    ctx.shadowBlur = 0;
    let oldFillStyle = ctx.fillStyle;
    let oldGlobAlpha = ctx.globalAlpha;
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#303";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // if (this.framesCounter === 100 * Math.floor(this.framesCounter / 100)) console.log(ctx.fillStyle, ctx.globalAlpha);
    ctx.fillStyle = oldFillStyle;
    ctx.globalAlpha = oldGlobAlpha;
    ctx.font = "30px Courier";
    ctx.fillText(`Level ${level}, ${this.asteroids.length} flies detected.`,100,100);
    // if(this.framesCounter === 100*Math.floor(this.framesCounter/100)) console.log(ctx.fillStyle,ctx.globalAlpha);
    
  }
  
  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  centerPosition() {
    let randRadius = 0.1;
    let centPos = [
      Game.DIM_X / 2,
      Game.DIM_Y / 2
    ];
    return [
      centPos[0] + (2 * Math.random() - 1) * Game.DIM_X * randRadius,
      centPos[1] + (2 * Math.random() - 1) * Game.DIM_Y * randRadius
    ];
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  boarderPosition() {
    let pos = this.randomPosition();
    if (Math.abs(pos[0] / Game.DIM_X - 1 / 2) > Math.abs(pos[1] / Game.DIM_Y - 1 / 2)) {
      if (pos[0] < Game.DIM_X / 2) {
        pos[0] = 0;
      } else {
        pos[0] = Game.DIM_X;
      }
    } else {
      if (pos[1] < Game.DIM_Y / 2) {
        pos[1] = 0;
      } else {
        pos[1] = Game.DIM_Y;
      }
    }
    return pos;
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "purple";
Game.DIM_X = 1290;//860;
Game.DIM_Y = 730;//490;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 8;

module.exports = Game;
