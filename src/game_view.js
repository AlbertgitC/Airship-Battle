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
        this.selected_ship.aim_angle = 0;
      }
    });

    key("e", () => {
      this.selected_ship.fire();
    });
  };

  checkBombHit() {
    if (this.game.bomb.length > 0) {
      let target_ship;

      if (this.selected_ship.name === "ship1") {
        target_ship = this.ships[1];
      } else {
        target_ship = this.ships[0];
      }

      const pos1 = this.selected_ship.bomb.center_pos;
      const pos2 = target_ship.center_pos;

      const dist = Math.pow(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2), 0.5);

      if (dist <= 38 + 5) {
        this.game.remove(this.selected_ship.bomb);
        return true;
      }
      return false;
    }
    return false;
  }

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
    this.checkBombHit();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  };
}

export default GameView;