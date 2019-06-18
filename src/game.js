const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const Util = require("./util");
const numFrames = 99;
const bgImgs = new Array(numFrames);
let bgIdx = 0;

class Game {
  constructor() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];

    for(let i = 0; i < numFrames; i++) {
      let bgImg = new Image();
      bgImg.src = `./galaxy_pics/${9*(i + 1)}.jpg`;
      bgImgs[i] = bgImg;
    }
    
    this.addAsteroids();
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
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
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
    ctx.drawImage(bgImgs[bgIdx], 5, 5); 
    bgIdx = (bgIdx + 1) % numFrames;
    this.ships[0].resetColorsSequentially();
    this.allObjects().forEach((object) => { //comment out 
      object.draw(ctx); //these lines to exclude 
    }); //asteroids and ship
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

Game.BG_COLOR = "#000000";
Game.DIM_X = 1280;//860;
Game.DIM_Y = 720;//490;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 32;

module.exports = Game;
