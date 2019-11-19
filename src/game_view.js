class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ships = game.addShips();
    this.selected_ship = this.ships[0];
  }

  bindKeyHandlers() {
    const MOVES = {
      w: [0, -4],
      a: [-4, 0],
      s: [0, 4],
      d: [4, 0],
    };

    Object.keys(MOVES).forEach(k => {
      const move = MOVES[k];
      key(k, () => { this.selected_ship.move(move); });
    });

    key("space", () => {
      if (this.selected_ship.name === "ship1") {
        this.selected_ship = this.ships[1];
      } else if (this.selected_ship.name === "ship2") {
        this.selected_ship = this.ships[0];
      }
    });
  };

  start() {
    this.bindKeyHandlers();
    this.cloud = this.game.addBackground();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  };

  animate(time) {
    // const timeDelta = time - this.lastTime;
    // console.log(time);
    // console.log(timeDelta);
    // this.game.step(timeDelta);
    this.ships.forEach(
      ship => {
        ship.move();
      }
    );
    this.game.draw(this.ctx);
    this.cloud.move(this.ctx);
    this.lastTime = time;
    
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
}

export default GameView;