import Airship from "./airship";
import Cloud from "./cloud";

class Game {
  constructor() {
    this.FPS = 32;
    this.ships = [];
  }
  // this.addAsteroids();

  add(object) {
    if (object instanceof Airship) {
      this.ships.push(object);
    // } else if (object instanceof Bullet) {
    //   this.bullets.push(object);
    // } else if (object instanceof Asteroid) {
    //   this.asteroids.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  };

  allObjects() {
    return [].concat(this.ships);
  };

  addShips() {
    const ship1 = new Airship({
      name: "ship1",
      pos: [100, 200],
      game: this,
      sprite_x_start: 0,
      facing: "right"
    });

    const ship2 = new Airship({
      name: "ship2",
      pos: [900, 200],
      game: this,
      sprite_x_start: 51,
      facing: "left"
    });

    this.add(ship1);
    this.add(ship2);

    return [ship1, ship2];
  };

  addBackground() {
    this.sky = new Image();
    this.sky.src = "../src/assets/background/sky.png";

    this.cloud = new Cloud({ pos: [0, 210], x_vel: 1, game: this });
    return this.cloud;
  }

  draw(ctx) {
    // const sky = new Image();
    // sky.src = "../src/assets/background/sky.png";
    // this.cloud = new Cloud({pos: [0, 210], x_vel: 1, game: this});
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

  // step(delta) {
  //   this.moveObjects(delta);
  //   this.checkCollisions();
  // };
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