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

/***/ "./src/airship.js":
/*!************************!*\
  !*** ./src/airship.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\n\nclass Airship extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super(props);\n    \n    this.name = props.name;\n    this.frameCount = 3;\n    this.curFrame = 0;\n    this.sprite_x_start = props.sprite_x_start;\n    this.ship_sprite_y = 0;\n    this.ship_image = new Image();\n    this.ship_image.src = \"../src/assets/Shooter_SpriteSheet.png\";\n    this.aim_pos = 0;\n    this.aim_mode = false;\n    this.facing = props.facing;\n  }\n\n  // power(impulse) {\n  //   this.vel[0] += impulse[0];\n  //   this.vel[1] += impulse[1];\n  // };\n\n  draw(ctx) {\n    const width = 17;\n    const height = 17;\n\n    let ship_sprite_x;\n\n    this.curFrame = ++this.curFrame % this.frameCount;\n    ship_sprite_x = this.curFrame * width + this.sprite_x_start;\n    if (this.aim_mode) {\n      this.drawAim(ctx);\n    }\n    ctx.drawImage(\n      this.ship_image, \n      ship_sprite_x, \n      this.ship_sprite_y, \n      width, \n      height, \n      this.pos[0], \n      this.pos[1], \n      100, \n      100\n    );\n    \n  }\n\n  drawAim(ctx) {\n    if (this.facing === \"right\") {\n      ctx.beginPath();\n      ctx.lineWidth = 2;\n      ctx.strokeStyle = 'orange';\n      const delta_y = 100 * Math.sin(this.aim_pos * Math.PI / 180);\n      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));\n      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);\n      ctx.lineTo(this.pos[0] + 50 + delta_x, this.pos[1] + 50 - delta_y);\n      ctx.stroke();\n    } else if (this.facing === \"left\") {\n      ctx.beginPath();\n      ctx.lineWidth = 2;\n      ctx.strokeStyle = 'orange';\n      const delta_y = 100 * Math.sin(this.aim_pos * Math.PI / 180);\n      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));\n      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);\n      ctx.lineTo(this.pos[0] + 50 - delta_x, this.pos[1] + 50 - delta_y);\n      ctx.stroke();\n    }\n  }\n\n  aim(angle) {\n    if (angle > 0 && this.aim_pos < 46) {\n      const new_angle = this.aim_pos + angle;\n      this.aim_pos = new_angle;\n    } else if (angle < 0 && this.aim_pos > -46) {\n      const new_angle = this.aim_pos + angle;\n      this.aim_pos = new_angle;\n    }\n  }\n\n  // fireBullet() {\n  //   const norm = Util.norm(this.vel);\n\n  //   const relVel = Util.scale(\n  //     Util.dir(this.vel),\n  //     Bullet.SPEED\n  //   );\n\n  //   const bulletVel = [\n  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n  //   ];\n\n  //   const bullet = new Bullet({\n  //     pos: this.pos,\n  //     vel: bulletVel,\n  //     color: this.color,\n  //     game: this.game\n  //   });\n\n  //   this.game.add(bullet);\n  // };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Airship);\n\n//# sourceURL=webpack:///./src/airship.js?");

/***/ }),

/***/ "./src/cloud.js":
/*!**********************!*\
  !*** ./src/cloud.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\n\nclass Cloud extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super(props);\n    this.cloud_img = new Image();\n    this.cloud_img.src = \"../src/assets/background/clouds.png\";\n  }\n\n  move(ctx) {\n    // const NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n    // timeDelta is number of milliseconds since last move\n    // if the computer is busy the time delta will be larger\n    // in this case the MovingObject should move farther in this frame\n    // velocity of object is how far it should move in 1/60th of a second\n    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    //   offsetX = this.x_vel * velocityScale;\n    // console.log(timeDelta);  \n    this.pos = [this.pos[0] - 1, this.pos[1]];\n\n    if (this.game.exitedBounds(this.pos, 1870, 510)) {\n      this.pos = [0, 210];\n    }\n    // console.log(this.pos);\n  };\n\n  draw(ctx) {\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0], this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 935, this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 1870, this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 2805, this.pos[1], 935, 510);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cloud);\n\n//# sourceURL=webpack:///./src/cloud.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _airship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./airship */ \"./src/airship.js\");\n/* harmony import */ var _cloud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloud */ \"./src/cloud.js\");\n\n\n\nclass Game {\n  constructor() {\n    this.FPS = 32;\n    this.ships = [];\n  }\n  // this.addAsteroids();\n\n  add(object) {\n    if (object instanceof _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.ships.push(object);\n    // } else if (object instanceof Bullet) {\n    //   this.bullets.push(object);\n    // } else if (object instanceof Asteroid) {\n    //   this.asteroids.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  };\n\n  allObjects() {\n    return [].concat(this.ships);\n  };\n\n  addShips() {\n    const ship1 = new _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      name: \"ship1\",\n      pos: [100, 200],\n      game: this,\n      sprite_x_start: 0,\n      facing: \"right\"\n    });\n\n    const ship2 = new _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      name: \"ship2\",\n      pos: [900, 200],\n      game: this,\n      sprite_x_start: 51,\n      facing: \"left\"\n    });\n\n    this.add(ship1);\n    this.add(ship2);\n\n    return [ship1, ship2];\n  };\n\n  addBackground() {\n    this.sky = new Image();\n    this.sky.src = \"../src/assets/background/sky.png\";\n\n    this.cloud = new _cloud__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: [0, 210], x_vel: 1, game: this });\n    return this.cloud;\n  }\n\n  draw(ctx) {\n    // const sky = new Image();\n    // sky.src = \"../src/assets/background/sky.png\";\n    // this.cloud = new Cloud({pos: [0, 210], x_vel: 1, game: this});\n    ctx.clearRect(0, 0, 1870, 720);\n    ctx.drawImage(this.sky, 0, 0, 112, 304, 0, 0, 1870, 720);\n    this.cloud.draw(ctx);\n    this.allObjects().forEach(object => {\n      object.draw(ctx);\n    });\n  };\n\n  exitingBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > 1870) || (pos[1] > 720);\n  };\n\n  exitedBounds(pos, width, height) {\n    return (pos[0] < - width) || (pos[1] < - height) ||\n      (pos[0] > 1870) || (pos[1] > 720);\n  };\n\n  wrap(pos) {\n    let wrap_x;\n    if (pos[0] < 0) {\n      wrap_x = 1870 - (pos[0] % 1870);\n    } else if (pos[0] > 1870) {\n      wrap_x = pos[0] % 1870;\n    } else {\n      wrap_x = pos[0];\n    }\n\n    return [wrap_x, pos[1]];\n  };\n\n  // step(delta) {\n  //   this.moveObjects(delta);\n  //   this.checkCollisions();\n  // };\n}\n\n\n\n// Game.prototype.checkCollisions = function checkCollisions() {\n//   const allObjects = this.allObjects();\n//   for (let i = 0; i < allObjects.length; i++) {\n//     for (let j = 0; j < allObjects.length; j++) {\n//       const obj1 = allObjects[i];\n//       const obj2 = allObjects[j];\n\n//       if (obj1.isCollidedWith(obj2)) {\n//         const collision = obj1.collideWith(obj2);\n//         if (collision) return;\n//       }\n//     }\n//   }\n// };\n\n\n// Game.prototype.moveObjects = function moveObjects(delta) {\n//   this.allObjects().forEach(function (object) {\n//     object.move(delta);\n//   });\n// };\n\n// Game.prototype.randomPosition = function randomPosition() {\n//   return [\n//     Game.DIM_X * Math.random(),\n//     Game.DIM_Y * Math.random()\n//   ];\n// };\n\n// Game.prototype.remove = function remove(object) {\n//   if (object instanceof Bullet) {\n//     this.bullets.splice(this.bullets.indexOf(object), 1);\n//   } else if (object instanceof Asteroid) {\n//     this.asteroids.splice(this.asteroids.indexOf(object), 1);\n//   } else if (object instanceof Ship) {\n//     this.ships.splice(this.ships.indexOf(object), 1);\n//   } else {\n//     throw new Error(\"unknown type of object\");\n//   }\n// };\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ships = game.addShips();\n    this.selected_ship = this.ships[0];\n  }\n\n  moveMode() {\n    key.unbind(\"w, s\");\n    key(\"w\", () => { this.selected_ship.move([0, -4]); });\n    key(\"a\", () => { \n      this.selected_ship.move([-4, 0]);\n      this.selected_ship.facing = \"left\";\n    });\n    key(\"s\", () => { this.selected_ship.move([0, 4]); });\n    key(\"d\", () => { \n      this.selected_ship.move([4, 0]);\n      this.selected_ship.facing = \"right\"; \n    });\n  }\n\n  aimMode() {\n    key.unbind(\"a, w, s, d\");\n    key(\"w\", () => { this.selected_ship.aim(2); });\n    key(\"s\", () => { this.selected_ship.aim(-2); });\n  }\n\n  bindKeyHandlers() {\n    this.moveMode();\n\n    key(\"space\", () => {\n      if (this.selected_ship.name === \"ship1\") {\n        this.selected_ship = this.ships[1];\n      } else if (this.selected_ship.name === \"ship2\") {\n        this.selected_ship = this.ships[0];\n      }\n    });\n\n    key(\"r\", () => {\n      if (!this.selected_ship.aim_mode) {\n        this.selected_ship.aim_mode = true;\n        this.aimMode();\n      } else {\n        this.selected_ship.aim_mode = false;\n        this.moveMode();\n        this.selected_ship.aim_pos = 0;\n      }\n    });\n  };\n\n  start() {\n    this.bindKeyHandlers();\n    this.cloud = this.game.addBackground();\n    this.lastTime = 0;\n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n  };\n\n  animate(time) {\n    // const timeDelta = time - this.lastTime;\n    // console.log(time);\n    // console.log(timeDelta);\n    // this.game.step(timeDelta);\n    // this.ships.forEach(\n    //   ship => {\n    //     ship.move();\n    //   }\n    // );\n    this.game.draw(this.ctx);\n    this.cloud.move(this.ctx);\n    this.lastTime = time;\n    \n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MovingObject {\n  constructor(props) {\n    this.pos = props.pos;\n    // this.vel = props[\"vel\"];\n    this.game = props.game;\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.fill();\n  }\n\n  \n  move(move) {\n    // const NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n    // timeDelta is number of milliseconds since last move\n    // if the computer is busy the time delta will be larger\n    // in this case the MovingObject should move farther in this frame\n    // velocity of object is how far it should move in 1/60th of a second\n    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n    //   offsetX = this.vel[0] * velocityScale,\n    //   offsetY = this.vel[1] * velocityScale;\n    this.pos = [this.pos[0] + move[0], this.pos[1] + move[1]];\n  };\n  \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ })

/******/ });