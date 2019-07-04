class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.counter = 0;
    this.limiter = 1000000;
    this.isPaused = true;
  }

  bindKeyHandlers() {

    key("enter", () => { this.isPaused = !this.isPaused });
    
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      const move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("space", () => { ship.fireVolly(); });
  }

  start() {
    this.bindKeyHandlers();
    // console.log(this.lastTime);
    this.lastTime = 0; //this variable is created here.
    // console.log(this.lastTime); 
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if (this.counter >= this.limiter) return;
    if(this.game.asteroids.length===0) {
      this.game.addAsteroids();
      this.isPaused = true;
    }
    if (this.isPaused) {
      this.game.draw(this.ctx);
      this.game.modal(this.ctx);
    } else {
      const timeDelta = time - this.lastTime;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);
    }
    this.counter++;
    if(!this.isPaused) this.game.framesCounter++;
    this.lastTime = time;
    this.game.isPaused = this.isPaused;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));

  }
  
  
  
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
};

module.exports = GameView;
