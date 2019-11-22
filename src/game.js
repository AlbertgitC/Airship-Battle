import Airship from "./airship";
import Cloud from "./cloud";
import Bomb from "./bomb";
import Rock from "./rock";
import Explosion from "./explosion";

class Game {
  constructor() {
    // this.FPS = 32;
    this.ships = [];
    this.bomb = [];
    this.rocks = [];
    this.explosion = [];
    this.curFrameCount = 0;
    this.curFrame = 0;
    this.hp_bar_image = new Image();
    this.hp_bar_image.src = "../src/assets/hp_bar.png";
    this.current_ship_image = new Image();
    this.current_ship_image.src = "../src/assets/current_player.png";
  }

  add(object) {
    if (object instanceof Airship) {
      this.ships.push(object);
    } else if (object instanceof Bomb) {
      this.bomb.push(object);
    } else if (object instanceof Rock) {
      this.rocks.push(object);
    } else if (object instanceof Explosion) {
      this.explosion.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  };

  allObjects() {
    return [].concat(this.rocks, this.ships, this.bomb, this.explosion);
  };

  addShips() {
    const ship1 = new Airship({
      name: "ship1",
      pos: [100, 360],
      game: this,
      sprite_x_start: 0,
      sprite_y_start: 0,
      facing: "right",
      selected: true
    });

    const ship2 = new Airship({
      name: "ship2",
      pos: [1670, 360],
      game: this,
      sprite_x_start: 0,
      sprite_y_start: 45,
      facing: "left",
      selected: false
    });

    this.add(ship1);
    this.add(ship2);

    return [ship1, ship2];
  };

  addBomb(bomb) {
    this.add(bomb);
  }

  addRocks() {
    const big_rock = new Rock({
      sprite_x_start: 0,
      pos: [935, 400],
      game: this,
      radius: 135,
      resize: [400, 400],
      removable: false
    });

    const mid_rock1 = new Rock({
      sprite_x_start: 121,
      pos: [320, 300],
      game: this,
      radius: 46,
      resize: [230, 230],
      removable: true
    });

    const mid_rock2 = new Rock({
      sprite_x_start: 121,
      pos: [1550, 300],
      game: this,
      radius: 46,
      resize: [230, 230],
      removable: true
    });

    const sml_rock1 = new Rock({
      sprite_x_start: 241,
      pos: [510, 620],
      game: this,
      radius: 37,
      resize: [230, 230],
      removable: true
    });

    const sml_rock2 = new Rock({
      sprite_x_start: 241,
      pos: [680, 140],
      game: this,
      radius: 37,
      resize: [230, 230],
      removable: true
    });

    const sml_rock3 = new Rock({
      sprite_x_start: 241,
      pos: [1190, 140],
      game: this,
      radius: 37,
      resize: [230, 230],
      removable: true
    });

    const sml_rock4 = new Rock({
      sprite_x_start: 241,
      pos: [1360, 620],
      game: this,
      radius: 37,
      resize: [230, 230],
      removable: true
    });

    this.add(big_rock);
    this.add(mid_rock1);
    this.add(mid_rock2);
    this.add(sml_rock1);
    this.add(sml_rock2);
    this.add(sml_rock3);
    this.add(sml_rock4);
  }

  addExplosion(object) {
    const new_explosion = new Explosion({
      pos: object.center_pos || object.pos,
      game: this,
      object: object
    });

    this.add(new_explosion);
  }

  addBackground() {
    this.sky = new Image();
    this.sky.src = "../src/assets/background/sky.png";

    this.addRocks(); 

    this.cloud = new Cloud({ pos: [0, 210], x_vel: 1, game: this });
    return this.cloud;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1870, 720);
    ctx.drawImage(this.sky, 0, 0, 112, 304, 0, 0, 1870, 720);
    this.cloud.draw(ctx);
    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
    this.drawStatus(ctx);
    this.drawSelector(ctx)
  };

  exitingBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > 1870) || (pos[1] > 720);
  };

  exitingVerBounds(pos) {
    return (pos[0] < 0) || (pos[0] > 1870);
  };

  exitedBounds(pos, width, height) {
    return (pos[0] < - width) || (pos[1] < - height) ||
      (pos[0] > 1870) || (pos[1] > 720);
  };

  wrap(pos) {
    let wrap_x;
    if (pos[0] < 0) {
      wrap_x = 1870 - (pos[0] % 1870);
    } else if (pos[0] > 1870) {
      wrap_x = pos[0] % 1870;
    } else {
      wrap_x = pos[0];
    }

    return [wrap_x, pos[1]];
  };

  remove(object) {
    if (object instanceof Bomb) {
      this.bomb.splice(this.bomb.indexOf(object), 1);
      // this.bindKeyHandlers();
    } else if (object instanceof Explosion) {
      this.explosion.splice(this.explosion.indexOf(object), 1);
    } else if (object instanceof Rock) {
      this.rocks.splice(this.rocks.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  };

  drawStatus(ctx) {
    const width = 100;
    const height = 100;

    this.ships.forEach(ship => {
      let hp_sprite_x;
      let hp_sprite_y;
      if (ship.hp === 3) {
        hp_sprite_x = 0;
      } else if (ship.hp === 2) {
        hp_sprite_x = 101;
      } else if (ship.hp === 1) {
        hp_sprite_x = 201;
      } else if (ship.hp === 0) {
        hp_sprite_x = 301;
      }

      if (ship.energy === 100) {
        hp_sprite_y = 0;
      } else if (ship.energy < 100 && ship.energy >= 95) {
        hp_sprite_y = 101;
      } else if (ship.energy < 95 && ship.energy >= 85) {
        hp_sprite_y = 201;
      } else if (ship.energy < 85 && ship.energy >= 75) {
        hp_sprite_y = 301;
      } else if (ship.energy < 75 && ship.energy >= 65) {
        hp_sprite_y = 401;
      } else if (ship.energy < 65 && ship.energy >= 55) {
        hp_sprite_y = 501;
      } else if (ship.energy < 55 && ship.energy >= 45) {
        hp_sprite_y = 601;
      } else if (ship.energy < 45 && ship.energy >= 35) {
        hp_sprite_y = 701;
      } else if (ship.energy < 35 && ship.energy >= 25) {
        hp_sprite_y = 801;
      } else if (ship.energy < 25 && ship.energy >= 15) {
        hp_sprite_y = 901;
      } else if (ship.energy < 15 && ship.energy >= 5) {
        hp_sprite_y = 1001;
      } else if (ship.energy < 5 && ship.energy > 0) {
        hp_sprite_y = 1101;
      } else if (ship.energy === 0) {
        hp_sprite_y = 1201;
      }
      
      ctx.drawImage(
        this.hp_bar_image,
        hp_sprite_x,
        hp_sprite_y,
        width,
        height,
        ship.pos[0] - 20,
        ship.pos[1] - 100,
        150,
        150
      );
    });
  }

  drawSelector(ctx) {
    this.curFrameCount++;
    const width = 40;
    const height = 40;

    let selector_sprite_x;
    if (this.curFrameCount > 5) {
      this.curFrame = ++this.curFrame % 4;
      this.curFrameCount = 0;
    }
    selector_sprite_x = this.curFrame * width;

    this.ships.forEach(ship => {
      if (ship.selected) {
        if (ship.name === "ship1") {
          ctx.drawImage(
            this.current_ship_image,
            selector_sprite_x,
            0,
            width,
            height,
            ship.pos[0] + 30,
            ship.pos[1] - 110,
            50,
            50
          );
        } else if (ship.name === "ship2") {
          ctx.drawImage(
            this.current_ship_image,
            selector_sprite_x,
            41,
            width,
            height,
            ship.pos[0] + 30,
            ship.pos[1] - 110,
            50,
            50,
          );
        }
      }
    });
  }
}

export default Game;