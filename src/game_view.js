class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ships = game.addShips();
    this.selected_ship = this.ships[0];
  }

  moveMode() {
    key("w", () => { 
      this.selected_ship.move([0, -4]);
      this.selected_ship.spendEnergy();
      this.selected_ship.aim_mode = false;
      this.selected_ship.aim_angle = 0;
    });
    key("a", () => { 
      this.selected_ship.move([-4, 0]);
      this.selected_ship.facing = "left";
      this.selected_ship.spendEnergy();
      this.selected_ship.aim_mode = false;
      this.selected_ship.aim_angle = 0;
    });
    key("s", () => { 
      this.selected_ship.move([0, 4]);
      this.selected_ship.spendEnergy();
      this.selected_ship.aim_mode = false;
      this.selected_ship.aim_angle = 0;
    });
    key("d", () => { 
      this.selected_ship.move([4, 0]);
      this.selected_ship.facing = "right";
      this.selected_ship.spendEnergy();
      this.selected_ship.aim_mode = false;
      this.selected_ship.aim_angle = 0; 
    });
  }

  aimMode() {
    key("q", () => { 
      this.selected_ship.aim(2);
      this.selected_ship.aim_mode = true; 
    });
    key("e", () => { 
      this.selected_ship.aim(-2);
      this.selected_ship.aim_mode = true;
    });
  }

  bindKeyHandlers() {
    this.moveMode();
    this.aimMode();

    key("g", () => {
      key.unbind("w, a, s, d");
      if (this.selected_ship.name === "ship1") {
        this.selected_ship = this.ships[1];
        this.selected_ship.selected = true;
        this.selected_ship.energy = 100;
        this.ships[0].selected = false;
        this.ships[0].aim_mode = false;
        this.selected_ship.aim_mode = false;
        this.selected_ship.aim_angle = 0;
        this.moveMode();
      } else if (this.selected_ship.name === "ship2") {
        this.selected_ship = this.ships[0];
        this.selected_ship.selected = true;
        this.selected_ship.energy = 100;
        this.ships[1].selected = false;
        this.ships[1].aim_mode = false;
        this.selected_ship.aim_mode = false;
        this.selected_ship.aim_angle = 0;
        this.moveMode();
      }
    });

    key("space", () => {
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
      

      const ship_dist = Math.pow(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2), 0.5);

      if (ship_dist <= 5 + 38) {
        this.game.remove(this.selected_ship.bomb);
        this.game.addExplosion(this.selected_ship.bomb);
        this.selected_ship.bomb = null;
        if (this.selected_ship.name === "ship1") {
          this.ships[1].hp--;
          if (this.ships[1].hp === 0) {
            this.game.addExplosion(this.ships[1]);
          }
        } else if (this.selected_ship.name === "ship2") {
          this.ships[0].hp--;
          if (this.ships[0].hp === 0) {
            this.game.addExplosion(this.ships[0]);
          }
        }
        this.bindKeyHandlers();
        return true;
      } 
      
      this.game.rocks.forEach(rock => {
        const pos3 = rock.pos;
        const rock_dist = Math.pow(Math.pow(pos1[0] - pos3[0], 2) + Math.pow(pos1[1] - pos3[1], 2), 0.5);
        if (rock_dist <= 5 + rock.radius) {
          if (rock.removable) {
            this.game.remove(rock);
            this.game.addExplosion(rock);
          }
          this.game.remove(this.selected_ship.bomb);
          this.game.addExplosion(this.selected_ship.bomb);
          this.selected_ship.bomb = null;
          this.bindKeyHandlers();
          return true;
        }
      });

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