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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n// import { randomColor } from './ship.js';\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 32,\n  SPEED: 2\n};\n\nclass Asteroid extends MovingObject {\n  constructor(options = {}) {\n    options.color = DEFAULTS.COLOR;\n    options.pos = options.pos || options.game.randomPosition();\n    options.radius = DEFAULTS.RADIUS;\n    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n    super(options);\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Ship) {\n      otherObject.relocate();\n      return true;\n    } else if (otherObject instanceof Bullet) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n\n    return false;\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.strokeStyle = \"black\";\n    ctx.lineWidth = 1;\n    ctx.shadowBlur = 0;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n    ctx.stroke();\n  }\n  \n}\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Bullet extends MovingObject {\n  constructor(options) {\n    options.radius = Bullet.RADIUS;\n    super(options);\n    this.isWrappable = false;\n  }\n  \n  draw(ctx) {\n    ctx.strokeStyle = this.color;\n    ctx.lineWidth = 2;\n    ctx.shadowBlur = 5;\n    ctx.shadowColor = this.color;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.stroke();\n\n  }\n}\n\nBullet.RADIUS = 16;\nBullet.SPEED = 16;\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst numFrames = 99;\nconst bgImgs = new Array(numFrames);\nlet bgIdx = 0;\n\nclass Game {\n  constructor() {\n    this.asteroids = [];\n    this.bullets = [];\n    this.ships = [];\n\n    for(let i = 0; i < numFrames; i++) {\n      let bgImg = new Image();\n      bgImg.src = `./galaxy_pics/${9*(i + 1)}.jpg`;\n      bgImgs[i] = bgImg;\n    }\n    \n    this.addAsteroids();\n  }\n  \n  add(object) {\n    if (object instanceof Asteroid) {\n      this.asteroids.push(object);\n    } else if (object instanceof Bullet) {\n      this.bullets.push(object);\n    } else if (object instanceof Ship) {\n      this.ships.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  addAsteroids() {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n      this.add(new Asteroid({ game: this }));\n    }\n  }\n\n  addShip() {\n    const ship = new Ship({\n      pos: this.centerPosition(),\n      game: this,\n      color: \"#F00\",\n      otherColor: \"#FF0\"\n    });\n\n    this.add(ship);\n\n    return ship;\n  }\n\n  allObjects() {\n    return [].concat(this.ships, this.asteroids, this.bullets);\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n\n        if (obj1.isCollidedWith(obj2)) {\n          const collision = obj1.collideWith(obj2);\n          if (collision) return;\n        }\n      }\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.shadowBlur = 0;\n    ctx.drawImage(bgImgs[bgIdx], 5, 5); \n    bgIdx = (bgIdx + 1) % numFrames;\n    this.ships[0].resetColorsSequentially();\n    this.allObjects().forEach((object) => { //comment out \n      object.draw(ctx); //these lines to exclude \n    }); //asteroids and ship\n  }\n\n  isOutOfBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n    });\n  }\n\n  centerPosition() {\n    let randRadius = 0.1;\n    let centPos = [\n      Game.DIM_X / 2,\n      Game.DIM_Y / 2\n    ];\n    return [\n      centPos[0] + (2 * Math.random() - 1) * Game.DIM_X * randRadius,\n      centPos[1] + (2 * Math.random() - 1) * Game.DIM_Y * randRadius\n    ];\n  }\n\n  randomPosition() {\n    return [\n      Game.DIM_X * Math.random(),\n      Game.DIM_Y * Math.random()\n    ];\n  }\n\n  remove(object) {\n    if (object instanceof Bullet) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof Asteroid) {\n      this.asteroids.splice(this.asteroids.indexOf(object), 1);\n    } else if (object instanceof Ship) {\n      this.ships.splice(this.ships.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  step(delta) {\n    this.moveObjects(delta);\n    this.checkCollisions();\n  }\n\n  wrap(pos) {\n    return [\n      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n    ];\n  }\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1280;//860;\nGame.DIM_Y = 720;//490;\nGame.FPS = 32;\nGame.NUM_ASTEROIDS = 32;\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ship = this.game.addShip();\n    this.counter = 0;\n    this.limiter = 1000000;\n  }\n\n  bindKeyHandlers() {\n    const ship = this.ship;\n\n    Object.keys(GameView.MOVES).forEach((k) => {\n      const move = GameView.MOVES[k];\n      key(k, () => { ship.power(move); });\n    });\n\n    key(\"space\", () => { ship.fireVolly(); });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.lastTime = 0;\n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    if (this.counter >= this.limiter) return;\n    this.counter++;\n    const timeDelta = time - this.lastTime;\n\n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n\n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n  }\n}\n\nGameView.MOVES = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0],\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass MovingObject {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n    this.isWrappable = true;\n  }\n\n  collideWith(otherObject) {\n    // default do nothing\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  isCollidedWith(otherObject) {\n    const centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n  }\n\n  move(timeDelta) {\n    // timeDelta is number of milliseconds since last move\n    // if the computer is busy the time delta will be larger\n    // in this case the MovingObject should move farther in this frame\n    // velocity of object is how far it should move in 1/60th of a second\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n    if (this.game.isOutOfBounds(this.pos)) {\n      if (this.isWrappable) {\n        this.pos = this.game.wrap(this.pos);\n      } else {\n        this.remove();\n      }\n    }\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst hexDigits = \"0123456789ABCDEF\";\nlet normVel = [1,0];\n\nfunction randomColor() {\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor((Math.random() * 16))];\n  }\n\n  return color;\n}\n\nfunction colorIncrease(colorVal) {\n  if(colorVal===\"F\") return \"F\";\n  return hexDigits[ hexDigits.indexOf(colorVal) + 1 ]\n}\n\nfunction colorDecrease(colorVal) {\n  if (colorVal === \"0\") return \"0\";\n  return hexDigits[hexDigits.indexOf(colorVal) - 1]\n}\n\nclass Ship extends MovingObject {\n  constructor(options) {\n    options.radius = Ship.RADIUS;\n    options.vel = options.vel || [0, 0];\n    options.color = options.color || randomColor();\n    super(options);\n\n    this.otherColor = options.otherColor;\n    this.resetColorRandomly = this.resetColorRandomly.bind(this);\n    this.resetColorsSequentially = this.resetColorsSequentially.bind(this);\n  }\n  \n  resetColorRandomly() {\n    this.color = randomColor();\n  }\n\n  resetColorsSequentially() {\n    this.color = this.advanceColorSequentially(this.color);\n    this.otherColor = this.advanceColorSequentially(this.otherColor);\n  }\n  \n  advanceColorSequentially(color) {\n    let colors = color.split(\"\");\n    let red = colors[1];\n    let green = colors[2];\n    let blue = colors[3];\n    if (red === \"F\") {\n      if (blue === \"0\") {\n        if (green === \"F\") {\n          red = colorDecrease(red);\n        } else {\n          green = colorIncrease(green);\n        }\n      } else {\n        blue = colorDecrease(blue);\n      }\n    } else if (green === \"F\") {\n      if (red === \"0\") {\n        if (blue === \"F\") {\n          green = colorDecrease(green);\n        } else {\n          blue = colorIncrease(blue);\n        }\n      } else {\n        red = colorDecrease(red);\n      }\n    } else if (blue === \"F\") {\n      if (green === \"0\") {\n        if (red === \"F\") {\n          blue = colorDecrease(blue);\n        } else {\n          red = colorIncrease(red);\n        }\n      } else {\n        green = colorDecrease(green);\n      }\n    }\n    return \"#\" + red + green + blue;\n  }\n\n  draw(ctx) {\n    if(Util.norm(this.vel) !== 0) normVel = Util.dir(this.vel);\n    let xi = this.pos[0] - this.radius * normVel[0];\n    let yi = this.pos[1] - this.radius * normVel[1];\n    let xf = this.pos[0] + this.radius * normVel[0];\n    let yf = this.pos[1] + this.radius * normVel[1];\n    let shipGradient = ctx.createLinearGradient(xi, yi, xf, yf);\n    shipGradient.addColorStop(0, this.color);\n    shipGradient.addColorStop(1, this.otherColor);\n    ctx.fillStyle = shipGradient; // gradient(this.color, this.otherColor);\n    ctx.shadowBlur = 7;\n    ctx.shadowColor = this.otherColor;\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  fireVolly() {\n    let vollyCount = 5;\n    let bulletPos = this.pos;\n    let bulletColor = this.color;\n    \n    const normShipVel = Util.norm(this.vel);\n\n    let relVel = [Bullet.SPEED, 0];\n    let relDir = [1,0];\n    \n    if (normShipVel !== 0) {\n      relDir = Util.dir(this.vel);\n      relVel = Util.scale(relDir, Bullet.SPEED);\n    }\n\n    const bulletVel = [\n      relVel[0] + this.vel[0],\n      relVel[1] + this.vel[1]\n    ];\n    \n    for (let i = 0; i < vollyCount; i++) {\n      \n      this.fireBullet(bulletPos,bulletVel,bulletColor);\n      \n      bulletPos = [\n        bulletPos[0] + Bullet.RADIUS * 3/2 * relDir[0],\n        bulletPos[1] + Bullet.RADIUS * 3/2 * relDir[1]\n      ];\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n      bulletColor = this.advanceColorSequentially(bulletColor);\n    }\n  }\n  \n  fireBullet(bulletPos,bulletVel,bulletColor) {\n\n    let bullet1200 = new Bullet({\n      pos: bulletPos,\n      vel: bulletVel,\n      color: bulletColor,\n      game: this.game\n    });\n    \n    this.game.add(bullet1200);\n    \n  }\n\n  power(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n  }\n\n  relocate() {\n    this.pos = this.game.centerPosition();\n    console.log(this.pos);\n    this.vel = [0, 0];\n  }\n}\n\nShip.RADIUS = 16;\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  // Normalize the length of the vector to 1, maintaining direction.\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  // Find the length of the vector.\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n  // Return a randomly oriented vector with the given length.\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });