/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n// import { randomColor } from './ship.js';\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 32,\n  SPEED: 1\n};\n\nclass Asteroid extends MovingObject {\n  constructor(options = {}) {\n    options.color = \"rgba(255, 255, 255, 0.3)\";\n    options.pos = options.pos || options.game.randomPosition();\n    options.radius = DEFAULTS.RADIUS;\n    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n    super(options);\n    this.startGlow = Math.floor(10*Math.random());\n    console.log(this.startGlow);\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Ship) {\n      otherObject.relocate();\n      return true;\n    } else if (otherObject instanceof Bullet) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n\n    return false;\n  }\n\n  draw(ctx) {\n    // ctx.fillStyle = this.color;\n    // ctx.strokeStyle = \"black\";\n    // ctx.lineWidth = 1;\n    // ctx.shadowBlur = 0;\n    // ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    // );\n    // ctx.fill();\n    // ctx.stroke();\n    let spaceFlyX = 0, spaceFlyY = 0;\n    // note that asteroids always have nonzero velocity\n    if(this.vel[0]===0) {\n      spaceFlyX = 0;\n      if(this.vel[1] < 0) {\n        spaceFlyY = 0;\n      } else {\n        spaceFlyY = 500;\n      }\n    } else if (this.vel[1] === 0) {\n      spaceFlyX = 0;\n      if (this.vel[0] > 0) {\n        spaceFlyY = 250;\n      } else {\n        spaceFlyY = 750;\n      }\n    } else {\n      let angle = Math.abs(Math.atan(this.vel[1] / this.vel[0])) * 32 / Math.PI;\n      if (this.vel[0] > 0){\n        if (this.vel[1] < 0){\n          spaceFlyY = 0;\n          spaceFlyX = 250 * Math.floor(125 * (17 - angle) / 250); \n        } else {\n          spaceFlyY = 250;\n          spaceFlyX = 250 * Math.floor(125 * angle / 250);\n        }\n      } else {\n        if (this.vel[1] < 0) {\n          spaceFlyY = 750;\n          spaceFlyX = 250 * Math.floor(125 * angle / 250);\n        } else {\n          spaceFlyY = 500;\n          spaceFlyX = 250 * Math.floor(125 * (17 - angle) / 250);\n        }\n      }\n    }\n    if (spaceFlyX < 0) spaceFlyX = 0;\n    if (spaceFlyX > 1750) spaceFlyX = 1750;\n    // console.log(spaceFlyX,spaceFlyY);\n    let myShadowBlur = (this.startGlow + Math.floor(this.game.framesCounter/3)) % 10 + 2;\n    if(myShadowBlur > 6) myShadowBlur = 14 - myShadowBlur;\n    ctx.shadowBlur = myShadowBlur;\n    ctx.shadowColor = \"#9D0\";\n    ctx.drawImage(this.game.spaceFly,spaceFlyX,spaceFlyY,250,250,this.pos[0]-63,this.pos[1]-63,125,125);\n    \n    this.adjustCourse();\n  }\n  \n  adjustCourse() {\n    let ship = this.game.ships[0];\n    let bestTraj = Util.dir(Util.diff(ship.pos, this.pos));\n    let thisTraj = Util.dir(this.vel);\n    let bestAng = Math.atan(bestTraj[1] / bestTraj[0]);\n    if (bestTraj[1] < 0) bestAng = bestAng + Math.PI;\n    let thisAng = Math.atan(thisTraj[1] / thisTraj[0]);\n    if (thisTraj[1] < 0) thisAng = thisAng + Math.PI;\n    let rotAng = Math.PI/16;\n    // if (Math.abs(bestAng - thisAng) > Math.PI) rotAng = -rotAng;\n    if (Math.abs(bestAng - thisAng) >= Math.PI / 16) this.vel = Util.rotateVec(this.vel, rotAng);\n    // let newTraj = Util.dir(this.vel);\n    // let newAng = Math.atan(newTraj[1] / newTraj[0]);\n    // if (newTraj[1] < 0) newAng = newAng + Math.PI;\n    // if (!this.game.isPaused && this.game.framesCounter < 10) console.log(thisTraj, thisAng, newTraj, newAng);\n  }\n  \n}\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Bullet extends MovingObject {\n  constructor(options) {\n    options.radius = Bullet.RADIUS;\n    super(options);\n    this.isWrappable = false;\n  }\n  \n  draw(ctx) {\n    ctx.strokeStyle = this.color;\n    ctx.lineWidth = 1;\n    ctx.shadowBlur = 5;\n    ctx.shadowColor = this.color;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.stroke();\n\n  }\n}\n\nBullet.RADIUS = 16;\nBullet.SPEED = 4;\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst numFrames = 99;\nconst bgImgs = new Array(numFrames);\nconst bgDuration = 1;\nlet level = 0;\nlet bgIdx = 0;\nconst spaceFly = new Image();\nspaceFly.src = './pics/spaceFlySprite.png'\nlet spaceFlyIdx = 0;\nlet spaceFlyX = 0, spaceFlyY = -63, spaceFlyW = 2000, spaceFlyH = 1000;\nconst slime = new Image();\nslime.src = './pics/slimeSprite.png'\nlet slimeIdx = 0;\nlet slimeX = 0, slimeY = 187, slimeW = 2000, slimeH = 1000;\n\nclass Game {\n  constructor() {\n    this.asteroids = [];\n    this.bullets = [];\n    this.ships = [];\n    this.spaceFly = spaceFly;\n    this.framesCounter = 0;\n    this.isPaused = true;\n\n    for(let i = 0; i < numFrames; i++) {\n      let bgImg = new Image();\n      bgImg.src = `./pics/${9*(i + 1)}.jpg`;\n      bgImg.style = \"opacity: 0.2\";\n      // if(i===0) console.log(bgImg);\n      bgImgs[i] = bgImg;\n      \n    }\n    \n    this.addAsteroids = this.addAsteroids.bind(this);\n  }\n  \n  add(object) {\n    if (object instanceof Asteroid) {\n      this.asteroids.push(object);\n    } else if (object instanceof Bullet) {\n      this.bullets.push(object);\n    } else if (object instanceof Ship) {\n      this.ships.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  addAsteroids() {\n    for (let i = 0; i < 3*level; i++) {\n      this.add(new Asteroid({ game: this }));\n    }\n\n    level++;\n  }\n\n  addShip() {\n    const ship = new Ship({\n      pos: this.centerPosition(),\n      game: this,\n      color: \"#F00\",\n      otherColor: \"#FF0\"\n    });\n\n    this.add(ship);\n\n    return ship;\n  }\n\n  allObjects() {\n    return [].concat(this.ships, this.asteroids, this.bullets);\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n\n        if (obj1.isCollidedWith(obj2)) {\n          const collision = obj1.collideWith(obj2);\n          if (collision) return;\n        }\n      }\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.shadowBlur = 0;\n    \n    // ctx.drawImage(bgImgs[16], 5, 5); \n    ctx.drawImage(bgImgs[Math.floor(bgIdx / bgDuration)], 5, 5);\n    bgIdx = (bgIdx + 1) % (bgDuration * numFrames);\n\n    let cropW = spaceFlyW / 8, cropH = spaceFlyH / 4;\n    let cropX = ((spaceFlyIdx % 8) * cropW) % spaceFlyW;\n    let cropY = (Math.floor(spaceFlyIdx / 8) * cropH) % spaceFlyH;\n    // ctx.drawImage(spaceFly, cropX, cropY, cropW, cropH, spaceFlyX, spaceFlyY, cropW, cropH);\n    spaceFlyIdx = (spaceFlyIdx + 1) % 32;\n    if (spaceFlyX === Game.DIM_X - 10) spaceFlyY = (spaceFlyY + 10) % Game.DIM_Y;\n    spaceFlyX = (spaceFlyX + 10) % Game.DIM_X;\n\n    \n    \n    cropW = slimeW / 8, cropH = slimeH / 4;\n    cropX = ((slimeIdx % 8) * cropW) % slimeW;\n    cropY = (Math.floor(slimeIdx / 8) * cropH) % slimeH;\n    // ctx.drawImage(slime, cropX, cropY, cropW, cropH, slimeX + cropW / 8, slimeY, cropW / 2, cropH / 2);\n    slimeIdx = (slimeIdx + 1) % 32;\n    if (slimeX === Game.DIM_X - 10) slimeY = (slimeY + 10) % Game.DIM_Y;\n    slimeX = (slimeX + 10) % Game.DIM_X;\n    \n    ctx.font = \"42px Impact\";\n    ctx.style = \"Bold\"\n    ctx.fillText(\":::::SpaceForce:::::   Make The Galaxy Great Again!\",50,50)\n    \n    this.ships[0].resetColorsSequentially();\n    this.allObjects().forEach((object) => { //comment out \n      object.draw(ctx); //these lines to exclude \n    }); //asteroids and ship\n    \n  }\n\n  modal(ctx) {\n    ctx.shadowBlur = 0;\n    let oldFillStyle = ctx.fillStyle;\n    let oldGlobAlpha = ctx.globalAlpha;\n    ctx.globalAlpha = 0.6;\n    ctx.fillStyle = \"#303\";\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    // if (this.framesCounter === 100 * Math.floor(this.framesCounter / 100)) console.log(ctx.fillStyle, ctx.globalAlpha);\n    ctx.fillStyle = oldFillStyle;\n    ctx.globalAlpha = oldGlobAlpha;\n    ctx.font = \"30px Courier\";\n    ctx.fillText(`Level ${level}, ${this.asteroids.length} flies detected.`,100,100);\n    // if(this.framesCounter === 100*Math.floor(this.framesCounter/100)) console.log(ctx.fillStyle,ctx.globalAlpha);\n    \n  }\n  \n  isOutOfBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n    });\n  }\n\n  centerPosition() {\n    let randRadius = 0.1;\n    let centPos = [\n      Game.DIM_X / 2,\n      Game.DIM_Y / 2\n    ];\n    return [\n      centPos[0] + (2 * Math.random() - 1) * Game.DIM_X * randRadius,\n      centPos[1] + (2 * Math.random() - 1) * Game.DIM_Y * randRadius\n    ];\n  }\n\n  randomPosition() {\n    return [\n      Game.DIM_X * Math.random(),\n      Game.DIM_Y * Math.random()\n    ];\n  }\n\n  remove(object) {\n    if (object instanceof Bullet) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof Asteroid) {\n      this.asteroids.splice(this.asteroids.indexOf(object), 1);\n    } else if (object instanceof Ship) {\n      this.ships.splice(this.ships.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  step(delta) {\n    this.moveObjects(delta);\n    this.checkCollisions();\n  }\n\n  wrap(pos) {\n    return [\n      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n    ];\n  }\n}\n\nGame.BG_COLOR = \"purple\";\nGame.DIM_X = 1290;//860;\nGame.DIM_Y = 730;//490;\nGame.FPS = 32;\nGame.NUM_ASTEROIDS = 8;\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./play */ \"./src/play.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass MovingObject {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n    this.isWrappable = true;\n  }\n\n  collideWith(otherObject) {\n    // default do nothing\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  isCollidedWith(otherObject) {\n    const centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n  }\n\n  move(timeDelta) {\n    // timeDelta is number of milliseconds since last move\n    // if the computer is busy the time delta will be larger\n    // in this case the MovingObject should move farther in this frame\n    // velocity of object is how far it should move in 1/60th of a second\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n    if (this.game.isOutOfBounds(this.pos)) {\n      if (this.isWrappable) {\n        this.pos = this.game.wrap(this.pos);\n      } else {\n        this.remove();\n      }\n    }\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/play.js":
/*!*********************!*\
  !*** ./src/play.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ship = this.game.addShip();\n    this.counter = 0;\n    this.limiter = 1000000;\n    this.isPaused = true;\n  }\n\n  bindKeyHandlers() {\n\n    key(\"enter\", () => { this.isPaused = !this.isPaused });\n    \n    const ship = this.ship;\n\n    Object.keys(GameView.MOVES).forEach((k) => {\n      const move = GameView.MOVES[k];\n      key(k, () => { ship.power(move); });\n    });\n\n    key(\"space\", () => { ship.fireVolly(); });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    // console.log(this.lastTime);\n    this.lastTime = 0; //this variable is created here.\n    // console.log(this.lastTime); \n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    if (this.counter >= this.limiter) return;\n    if(this.game.asteroids.length===0) {\n      this.game.addAsteroids();\n      this.isPaused = true;\n    }\n    if (this.isPaused) {\n      this.game.draw(this.ctx);\n      this.game.modal(this.ctx);\n    } else {\n      const timeDelta = time - this.lastTime;\n\n      this.game.step(timeDelta);\n      this.game.draw(this.ctx);\n    }\n    this.counter++;\n    if(!this.isPaused) this.game.framesCounter++;\n    this.lastTime = time;\n    this.game.isPaused = this.isPaused;\n\n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n\n  }\n  \n  \n  \n}\n\nGameView.MOVES = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0],\n  up: [0, -1],\n  left: [-1, 0],\n  down: [0, 1],\n  right: [1, 0]\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/play.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst hexDigits = \"0123456789ABCDEF\";\nlet normVel = [1,0];\n\nfunction randomColor() {\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor((Math.random() * 16))];\n  }\n\n  return color;\n}\n\nfunction colorIncrease(colorVal) {\n  if(colorVal===\"F\") return \"F\";\n  return hexDigits[ hexDigits.indexOf(colorVal) + 1 ]\n}\n\nfunction colorDecrease(colorVal) {\n  if (colorVal === \"0\") return \"0\";\n  return hexDigits[hexDigits.indexOf(colorVal) - 1]\n}\n\nclass Ship extends MovingObject {\n  constructor(options) {\n    options.radius = Ship.RADIUS;\n    options.vel = options.vel || [0, 0];\n    options.color = options.color || randomColor();\n    super(options);\n\n    this.otherColor = options.otherColor;\n    // this.resetColorRandomly = this.resetColorRandomly.bind(this);\n    // this.resetColorsSequentially = this.resetColorsSequentially.bind(this);\n    this.cornersRelPos = [[0, 0], [0, 0], [0, 0]];\n    this.cornersAbsPos = [[0,0],[0,0],[0,0]];\n    // this.calcCornersAbsolutePosition = this.calcCornersAbsolutePosition.bind(this);\n    this.rotateCorners();\n    this.calcCornersAbsolutePosition();\n  }\n  \n  resetColorRandomly() {\n    this.color = randomColor();\n  }\n\n  resetColorsSequentially() {\n    this.color = this.advanceColorSequentially(this.color);\n    this.otherColor = this.advanceColorSequentially(this.otherColor);\n  }\n  \n  advanceColorSequentially(color) {\n    let colors = color.split(\"\");\n    let red = colors[1];\n    let green = colors[2];\n    let blue = colors[3];\n    if (red === \"F\") {\n      if (blue === \"0\") {\n        if (green === \"F\") {\n          red = colorDecrease(red);\n        } else {\n          green = colorIncrease(green);\n        }\n      } else {\n        blue = colorDecrease(blue);\n      }\n    } else if (green === \"F\") {\n      if (red === \"0\") {\n        if (blue === \"F\") {\n          green = colorDecrease(green);\n        } else {\n          blue = colorIncrease(blue);\n        }\n      } else {\n        red = colorDecrease(red);\n      }\n    } else if (blue === \"F\") {\n      if (green === \"0\") {\n        if (red === \"F\") {\n          blue = colorDecrease(blue);\n        } else {\n          red = colorIncrease(red);\n        }\n      } else {\n        green = colorDecrease(green);\n      }\n    }\n    return \"#\" + red + green + blue;\n  }\n\n  draw(ctx) {\n    if(Util.norm(this.vel) !== 0) normVel = Util.dir(this.vel);\n    let xi = this.pos[0] - this.radius * normVel[0];\n    let yi = this.pos[1] - this.radius * normVel[1];\n    let xf = this.pos[0] + 2*this.radius * normVel[0];\n    let yf = this.pos[1] + 2*this.radius * normVel[1];\n    let shipGradient = ctx.createLinearGradient(xi, yi, xf, yf);\n    shipGradient.addColorStop(0, this.color);\n    shipGradient.addColorStop(1, this.otherColor);\n    ctx.fillStyle = shipGradient; // gradient(this.color, this.otherColor);\n    ctx.shadowBlur = 7;\n    ctx.shadowColor = this.otherColor;\n    ctx.beginPath();\n    // ctx.arc(\n    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    // );\n    this.rotateCorners();\n    this.calcCornersAbsolutePosition();\n    ctx.moveTo(this.cornersAbsPos[0][0], this.cornersAbsPos[0][1]);\n    ctx.lineTo(this.cornersAbsPos[1][0], this.cornersAbsPos[1][1]);\n    ctx.lineTo(this.cornersAbsPos[2][0], this.cornersAbsPos[2][1]);\n    ctx.fill();\n  }\n  \n  rotateCorners() { // this.cornersRelPos = [[-this.radius, this.radius], [this.radius, 0], [-this.radius, -this.radius]];\n    let dirAngle = Math.atan(this.vel[1]/this.vel[0]);\n    if (isNaN(dirAngle)) dirAngle = 0;\n    let signController = 1;\n    if(this.vel[0]<0) signController = -1;\n    let zeroAngleCorners = [[-this.radius, this.radius], [2*this.radius, 0], [-this.radius, -this.radius]];\n    this.cornersRelPos[0][0] = (zeroAngleCorners[0][0] * Math.cos(dirAngle) + zeroAngleCorners[0][1] * Math.sin(dirAngle))*signController;\n    this.cornersRelPos[0][1] = (-zeroAngleCorners[0][1] * Math.cos(dirAngle) + zeroAngleCorners[0][0] * Math.sin(dirAngle))*signController;\n    this.cornersRelPos[1][0] = (zeroAngleCorners[1][0] * Math.cos(dirAngle) + zeroAngleCorners[1][1] * Math.sin(dirAngle))*signController;\n    this.cornersRelPos[1][1] = (-zeroAngleCorners[1][1] * Math.cos(dirAngle) + zeroAngleCorners[1][0] * Math.sin(dirAngle))*signController;\n    this.cornersRelPos[2][0] = (zeroAngleCorners[2][0] * Math.cos(dirAngle) + zeroAngleCorners[2][1] * Math.sin(dirAngle))*signController;\n    this.cornersRelPos[2][1] = (-zeroAngleCorners[2][1] * Math.cos(dirAngle) + zeroAngleCorners[2][0] * Math.sin(dirAngle))*signController;\n  }\n  \n  calcCornersAbsolutePosition() {\n    this.cornersAbsPos[0][0] = this.pos[0] + this.cornersRelPos[0][0];\n    this.cornersAbsPos[0][1] = this.pos[1] + this.cornersRelPos[0][1];\n    this.cornersAbsPos[1][0] = this.pos[0] + this.cornersRelPos[1][0];\n    this.cornersAbsPos[1][1] = this.pos[1] + this.cornersRelPos[1][1];\n    this.cornersAbsPos[2][0] = this.pos[0] + this.cornersRelPos[2][0];\n    this.cornersAbsPos[2][1] = this.pos[1] + this.cornersRelPos[2][1];\n    // console.log(this.cornersAbsPos, this.cornersAbsPos);\n  }\n\n  fireVolly() {\n    const vollyCount = 5;\n    let bulletPos = this.pos;\n    // const bulletStep = 1.5;\n    const bulletVelStep = 2;\n    let bulletColor = this.color;\n    \n    const normShipVel = Util.norm(this.vel);\n\n    let relVel = [Bullet.SPEED, 0];\n    let relDir = [1,0];\n    \n    if (normShipVel !== 0) {\n      relDir = Util.dir(this.vel);\n      relVel = Util.scale(relDir, Bullet.SPEED);\n    }\n\n    let bulletVel = [\n      relVel[0] + this.vel[0],\n      relVel[1] + this.vel[1]\n    ];\n    \n    for (let i = 0; i < vollyCount; i++) {   \n      this.fireBullet(bulletPos, bulletVel, bulletColor);\n      let bulletVelStepVector = Util.scale(relDir, bulletVelStep);\n      // console.log(bulletVel, bulletVelStepVector);\n      bulletVel = [\n        bulletVel[0] + bulletVelStepVector[0],\n        bulletVel[1] + bulletVelStepVector[1]\n      ];\n      // console.log(bulletVel);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n    }\n  }\n  \n  fireBullet(bulletPos,bulletVel,bulletColor) {\n\n    let bullet1200 = new Bullet({\n      pos: bulletPos,\n      vel: bulletVel,\n      color: bulletColor,\n      game: this.game\n    });\n    \n    this.game.add(bullet1200);\n    \n  }\n\n  power(impulse) {\n    if(impulse[0]!==0 && Math.abs(this.vel[0]) > 1 && this.vel[0]/impulse[0] < 0) {\n      if(this.vel[0] < 0) {\n        this.vel[0] = -Math.floor(-this.vel[0] / 4);\n      } else {\n        this.vel[0] = Math.floor(this.vel[0] / 4);\n      }\n    } else {\n      this.vel[0] += impulse[0];\n    }\n    if (impulse[1] !== 0 && Math.abs(this.vel[1]) > 1 && this.vel[1] / impulse[1] < 0) {\n      if (this.vel[1] < 0) {\n        this.vel[1] = -Math.floor(-this.vel[1] / 4);\n      } else {\n        this.vel[1] = Math.floor(this.vel[1] / 4);\n      }\n    } else {\n      this.vel[1] += impulse[1];\n    }\n  }\n\n  relocate() {\n    this.pos = this.game.centerPosition();\n    // console.log(this.pos);\n    this.vel = [0, 0];\n  }\n}\n\nShip.RADIUS = 16;\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  // Normalize the length of the vector to 1, maintaining direction.\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  // Find difference between two vectors, pos1 - pos2\n  diff(pos1, pos2) {\n    return [\n      pos1[0] - pos2[0],\n      pos1[1] - pos2[1]\n    ]\n  }, \n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  // Find the length of the vector.\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  // Return a randomly oriented vector with the given length.\n  randomVec(length) {\n    const ang = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(ang), Math.cos(ang)], length);\n  },\n  // Return the input vector rotated counter-clockwise by the input angle\n  rotateVec(vec,rotAng) {\n    let oldAng = Math.atan(vec[1]/vec[0]);\n    if(vec[1]<0) oldAng = oldAng + Math.PI;\n    let length = this.norm(vec);\n    let newAng = oldAng + rotAng;\n    return Util.scale([Math.cos(newAng), Math.sin(newAng)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });