class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ships = game.addShips();
  }

  checkBombHit() {
    if (this.game.bomb.length > 0) {
      let target_ship;

      if (this.game.selected_ship.name === "ship1") {
        target_ship = this.ships[1];
      } else {
        target_ship = this.ships[0];
      }

      const pos1 = this.game.selected_ship.bomb.center_pos;
      const pos2 = target_ship.center_pos;
      

      const ship_dist = Math.pow(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2), 0.5);

      if (ship_dist <= 5 + 38) {
        this.game.remove(this.game.selected_ship.bomb);
        this.game.addExplosion(this.game.selected_ship.bomb);
        this.game.selected_ship.bomb = null;
        if (this.game.selected_ship.name === "ship1") {
          this.ships[1].hp--;
          if (this.ships[1].hp === 0) {
            this.game.addExplosion(this.ships[1]);
          }
        } else if (this.game.selected_ship.name === "ship2") {
          this.ships[0].hp--;
          if (this.ships[0].hp === 0) {
            this.game.addExplosion(this.ships[0]);
          }
        }
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
          this.game.remove(this.game.selected_ship.bomb);
          this.game.addExplosion(this.game.selected_ship.bomb);
          this.game.selected_ship.bomb = null;
          return true;
        }
      });

      return false;
    }
    return false;
  }

  start() {
    this.game.bindKeyHandlers();
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