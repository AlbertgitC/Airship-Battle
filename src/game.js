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
    } else if (object instanceof Explosion) {
      this.explosion.splice(this.explosion.indexOf(object), 1);
    } else if (object instanceof Rock) {
      this.rocks.splice(this.rocks.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  };
}



// Game.prototype.checkCollisions = function checkCollisions() {
//   const allObjects = this.allObjects();
//   for (let i = 0; i < allObjects.length; i++) {
//     for (let j = 0; j < allObjects.length; j++) {
//       const obj1 = allObjects[i];
//       const obj2 = allObjects[j];

//       if (obj1.isCollidedWith(obj2)) {
//         const collision = obj1.collideWith(obj2);
//         if (collision) return;
//       }
//     }
//   }
// };


// Game.prototype.moveObjects = function moveObjects(delta) {
//   this.allObjects().forEach(function (object) {
//     object.move(delta);
//   });
// };

// Game.prototype.randomPosition = function randomPosition() {
//   return [
//     Game.DIM_X * Math.random(),
//     Game.DIM_Y * Math.random()
//   ];
// };

// Game.prototype.remove = function remove(object) {
//   if (object instanceof Bullet) {
//     this.bullets.splice(this.bullets.indexOf(object), 1);
//   } else if (object instanceof Asteroid) {
//     this.asteroids.splice(this.asteroids.indexOf(object), 1);
//   } else if (object instanceof Ship) {
//     this.ships.splice(this.ships.indexOf(object), 1);
//   } else {
//     throw new Error("unknown type of object");
//   }
// };


export default Game;