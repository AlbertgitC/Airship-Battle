class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ships = game.addShips();
    this.selected_ship = this.ships[0];
  }

  moveMode() {
    key.unbind("w, s");
    key("w", () => { this.selected_ship.move([0, -4]); });
    key("a", () => { 
      this.selected_ship.move([-4, 0]);
      this.selected_ship.facing = "left";
    });
    key("s", () => { this.selected_ship.move([0, 4]); });
    key("d", () => { 
      this.selected_ship.move([4, 0]);
      this.selected_ship.facing = "right"; 
    });
  }

  aimMode() {
    key.unbind("a, w, s, d");
    key("w", () => { this.selected_ship.aim(2); });
    key("s", () => { this.selected_ship.aim(-2); });
  }

  bindKeyHandlers() {
    this.moveMode();

    key("space", () => {
      if (this.selected_ship.name === "ship1") {
        this.selected_ship = this.ships[1];
      } else if (this.selected_ship.name === "ship2") {
        this.selected_ship = this.ships[0];
      }
    });

    key("r", () => {
      if (!this.selected_ship.aim_mode) {
        this.selected_ship.aim_mode = true;
        this.aimMode();
      } else {
        this.selected_ship.aim_mode = false;
        this.moveMode();
        this.selected_ship.aim_pos = 0;
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
    this.game.draw(this.ctx);
    this.cloud.move();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  };
}

export default GameView;