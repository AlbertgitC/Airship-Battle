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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bomb */ \"./src/bomb.js\");\n\n\nclass Airship {\n  constructor(props) {\n    this.name = props.name;\n    this.pos = props.pos;\n    this.curFrameCount = 0;\n    this.spriteFrameCount = 8;\n    this.curFrame = 0;\n    this.game = props.game;\n    this.sprite_x_start = props.sprite_x_start;\n    this.sprite_y_start = props.sprite_y_start;\n    this.ship_image = new Image();\n    this.ship_image.src = \"./src/assets/zeplin.png\";\n    this.aim_angle = 0;\n    this.aim_mode = false;\n    this.facing = props.facing;\n    this.bomb_path = null;\n    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];\n    this.selected = props.selected;\n    this.energy = 100;\n    this.hp = 3;\n    this.fired = false;\n  }\n\n  draw(ctx) {\n    this.curFrameCount++;\n    const width = 120;\n    const height = 120;\n\n    let ship_sprite_x;\n    let ship_sprite_y;\n    if (this.curFrameCount > 8) {\n      this.curFrame = ++this.curFrame % this.spriteFrameCount;\n      this.curFrameCount = 0;\n    }\n    ship_sprite_x = this.curFrame * width + this.sprite_x_start;\n    \n    if (this.aim_mode) {\n      this.drawAim(ctx);\n    }\n\n    if (!this.bomb && this.bomb_path && this.selected) {\n      this.drawPath(ctx);;\n    }\n\n    if (this.facing === \"left\") {\n      ship_sprite_y = this.sprite_y_start + 121;\n    } else {\n      ship_sprite_y = this.sprite_y_start;\n    }\n\n    ctx.drawImage(\n      this.ship_image, \n      ship_sprite_x, \n      ship_sprite_y, \n      width, \n      height, \n      this.pos[0] - 17, \n      this.pos[1] - 19, \n      140, \n      140\n    );\n\n    // this.drawHitBox(ctx);\n  }\n\n  drawAim(ctx) {\n    if (this.facing === \"right\") {\n      ctx.beginPath();\n      ctx.lineWidth = 2;\n      ctx.strokeStyle = 'orange';\n      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);\n      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));\n      ctx.moveTo(this.center_pos[0], this.center_pos[1]);\n      ctx.lineTo(this.pos[0] + 50 + delta_x, this.pos[1] + 50 - delta_y);\n      ctx.stroke();\n    } else if (this.facing === \"left\") {\n      ctx.beginPath();\n      ctx.lineWidth = 2;\n      ctx.strokeStyle = 'orange';\n      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);\n      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));\n      ctx.moveTo(this.center_pos[0], this.center_pos[1]);\n      ctx.lineTo(this.pos[0] + 50 - delta_x, this.pos[1] + 50 - delta_y);\n      ctx.stroke();\n    }\n  }\n\n  aim(angle) {\n    if (angle > 0 && this.aim_angle < 60) {\n      const new_angle = this.aim_angle + angle;\n      this.aim_angle = new_angle;\n    } else if (angle < 0 && this.aim_angle > -60) {\n      const new_angle = this.aim_angle + angle;\n      this.aim_angle = new_angle;\n    }\n  }\n\n  drawPath(ctx) {\n    this.bomb_path.forEach(bomb_pos => {\n      ctx.beginPath();\n      ctx.moveTo(bomb_pos[0], bomb_pos[1]);\n      ctx.fillStyle = \"brown\";\n      ctx.arc(bomb_pos[0], bomb_pos[1], 1, 0, 2 * Math.PI);\n      ctx.fill();\n    });\n  }\n\n  drawHitBox(ctx) {\n    ctx.lineWidth = 1;\n    ctx.strokeStyle = 'black';\n    ctx.beginPath();\n    ctx.arc(this.center_pos[0], this.center_pos[1], 50, 0, 2 * Math.PI);\n    ctx.stroke();\n  }\n\n  fire() {\n    if (!this.fired) {\n      this.fired = true;\n      key.unbind(\"w, a, s, d, q, e, g, space\");\n      this.bomb_path = [];\n\n      let counter = 0;\n      let x;\n      let y;\n      const increase = this.aim_angle / 180 * Math.PI / 40;\n\n      if (this.facing === \"right\") {\n        for (let i = 0; i <= 2160; i += 5) {\n\n          x = this.pos[0] + 50 + i;\n\n          y = this.pos[1] + 50 - Math.sin(counter) * 290;\n          counter += increase;\n\n          this.bomb_path.push([x, y]);\n        }\n      } else {\n        for (let i = 0; i <= 2160; i += 5) {\n\n          x = this.pos[0] + 50 - i;\n\n          y = this.pos[1] + 50 - Math.sin(counter) * 290;\n          counter += increase;\n\n          this.bomb_path.push([x, y]);\n        }\n      }\n\n      this.bomb = new _bomb__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        pos: this.bomb_path[0],\n        game: this.game,\n        ship: this,\n        bomb_path: this.bomb_path\n      });\n\n      this.game.addBomb(this.bomb);\n    }\n  };\n\n  move(move) {\n    this.pos = [this.pos[0] + move[0], this.pos[1] + move[1]];\n    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];\n    if (this.game.exitingBounds(this.center_pos)) {\n      if (this.center_pos[0] < 0) {\n        this.pos = [this.pos[0] + 4, this.pos[1]];\n      } else if (this.center_pos[1] < 0) {\n        this.pos = [this.pos[0], this.pos[1] + 4];\n      } else if (this.center_pos[0] > 1870) {\n        this.pos = [this.pos[0] - 4, this.pos[1]];\n      } else if (this.center_pos[1] > 720) {\n        this.pos = [this.pos[0], this.pos[1] - 4];\n      }\n    }\n\n    const pos1 = this.center_pos;\n    \n    this.game.rocks.forEach(rock => {\n      const pos3 = rock.pos;\n      const rock_dist = Math.pow(Math.pow(pos1[0] - pos3[0], 2) + Math.pow(pos1[1] - pos3[1], 2), 0.5);\n      if (rock_dist <= 50 + rock.radius) {\n        if (this.center_pos[0] < pos3[0] && this.center_pos[1] <= pos3[1]) {\n          this.pos = [this.pos[0], this.pos[1] - 4];\n        } else if (this.center_pos[0] >= pos3[0] && this.center_pos[1] < pos3[1]) {\n          this.pos = [this.pos[0], this.pos[1] - 4];\n        } else if (this.center_pos[0] > pos3[0] && this.center_pos[1] >= pos3[1]) {\n          this.pos = [this.pos[0], this.pos[1] + 4];\n        } else if (this.center_pos[0] <= pos3[0] && this.center_pos[1] > pos3[1]) {\n          this.pos = [this.pos[0], this.pos[1] + 4];\n        }\n      }\n    });\n  };\n\n  spendEnergy() {\n    if(this.energy <= 0) {\n      key.unbind(\"w, a, s, d\");\n      key(\"a\", () => {\n        this.facing = \"left\";\n      });\n      key(\"d\", () => {\n        this.facing = \"right\";\n      });\n    } else {\n      this.energy--;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Airship);\n\n//# sourceURL=webpack:///./src/airship.js?");

/***/ }),

/***/ "./src/bomb.js":
/*!*********************!*\
  !*** ./src/bomb.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Bomb {\n  constructor(props) {\n    this.curFrameCount = 0;\n    this.spriteFrameCount = 2;\n    this.curFrame = 0;\n    this.sprite_x_start = 0;\n    this.sprite_y_start = 0;\n    this.bomb_image = new Image();\n    this.bomb_image.src = \"./src/assets/torpedo.png\";\n    this.pos = props.pos;\n    this.game = props.game;\n    this.ship = props.ship;\n    this.bomb_path = props.bomb_path;\n    this.step = 0;\n    this.center_pos = [this.pos[0], this.pos[1]];\n  }\n\n  draw(ctx) {\n    this.curFrameCount++;\n    const width = 30;\n    const height = 30;\n\n    let sprite_x;\n    let sprite_y;\n    if (this.curFrameCount > 1) {\n      this.curFrame = ++this.curFrame % this.spriteFrameCount;\n      this.curFrameCount = 0;\n    }\n    sprite_x = this.curFrame * width + this.sprite_x_start;\n\n    if (this.ship.facing === \"right\") {\n      sprite_y = this.sprite_y_start + 31;\n    } else {\n      sprite_y = this.sprite_y_start;\n    }\n\n    if (this.bomb_path[this.step]) {\n      for (let i = 0; i <= this.step; i++) {\n        ctx.moveTo(this.bomb_path[i][0], this.bomb_path[i][1]);\n        ctx.beginPath();\n        ctx.fillStyle = \"brown\";\n        ctx.arc(this.bomb_path[i][0], this.bomb_path[i][1], 1, 0, 2 * Math.PI);\n        ctx.fill();\n      }\n    } else {\n      this.bomb_path.forEach(bomb_pos => {\n        ctx.moveTo(bomb_pos[0], bomb_pos[1]);\n        ctx.beginPath();\n        ctx.fillStyle = \"brown\";\n        ctx.arc(bomb_pos[0], bomb_pos[1], 1, 0, 2 * Math.PI);\n        ctx.fill();\n      });\n    }\n\n    ctx.drawImage(\n      this.bomb_image,\n      sprite_x,\n      sprite_y,\n      width,\n      height,\n      this.pos[0] - 19,\n      this.pos[1] - 17,\n      40,\n      40\n    );\n\n    // this.drawHitBox(ctx);\n    this.move();\n  }\n\n  move() {\n    if (this.bomb_path[this.step] && !this.game.exitingVerBounds(this.bomb_path[this.step])) {\n      this.pos = this.bomb_path[this.step];\n      this.center_pos = [this.pos[0] + 10, this.pos[1] + 10];\n      this.step++;\n    } else if (this.game.exitingVerBounds(this.bomb_path[this.step])) {\n      this.game.remove(this);\n      this.ship.bomb = null;\n    }\n  }\n\n  drawHitBox(ctx) {\n    ctx.lineWidth = 1;\n    ctx.strokeStyle = 'black';\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], 8, 0, 2 * Math.PI);\n    ctx.stroke();\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bomb);\n\n//# sourceURL=webpack:///./src/bomb.js?");

/***/ }),

/***/ "./src/cloud.js":
/*!**********************!*\
  !*** ./src/cloud.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cloud {\n  constructor(props) {\n    this.pos = props.pos;\n    this.game = props.game;\n    this.x_vel = props.x_vel;\n    this.cloud_img = new Image();\n    this.cloud_img.src = \"./src/assets/background/clouds.png\";\n  }\n\n  move() {\n    this.pos = [this.pos[0] - 1, this.pos[1]];\n\n    if (this.game.exitedBounds(this.pos, 1870, 510)) {\n      this.pos = [0, 210];\n    }\n  };\n\n  draw(ctx) {\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0], this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 935, this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 1870, this.pos[1], 935, 510);\n    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 2805, this.pos[1], 935, 510);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cloud);\n\n//# sourceURL=webpack:///./src/cloud.js?");

/***/ }),

/***/ "./src/explosion.js":
/*!**************************!*\
  !*** ./src/explosion.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bomb */ \"./src/bomb.js\");\n/* harmony import */ var _rock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rock */ \"./src/rock.js\");\n/* harmony import */ var _airship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./airship */ \"./src/airship.js\");\n\n\n\n\nclass Explosion {\n  constructor(props) {\n    this.curFrameCount = 0;\n    this.spriteFrameCount = 8;\n    this.curFrame = 0;\n    this.sprite_x_start = 0;\n    this.sprite_y_start = 0;\n    this.explode_image = new Image();\n    this.pos = props.pos;\n    this.game = props.game;\n    this.object = props.object;\n  }\n\n  draw(ctx) {\n    this.curFrameCount++;\n    let width;\n    let height;\n    let resize;\n    if (this.object instanceof _bomb__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      width = 50;\n      height = 50;\n      resize = [50, 50];\n      this.explode_image.src = \"./src/assets/explode1.png\";\n    } else if (this.object instanceof _rock__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      width = 120;\n      height = 120;\n      resize = [230, 230];\n      this.explode_image.src = \"./src/assets/rock_down.png\";\n    } else if (this.object instanceof _airship__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      width = 64;\n      height = 64;\n      resize = [150, 150];\n      this.explode_image.src = \"./src/assets/explode2.png\";\n    }\n\n    let sprite_x;\n    if (this.curFrameCount > 8) {\n      this.curFrame = ++this.curFrame % this.spriteFrameCount;\n      this.curFrameCount = 0;\n    }\n    sprite_x = this.curFrame * width + this.sprite_x_start;\n    if (!(this.object instanceof _airship__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) && this.curFrame === this.spriteFrameCount - 1) {\n      this.game.remove(this);\n    }\n    ctx.drawImage(\n      this.explode_image,\n      sprite_x,\n      this.sprite_y_start,\n      width,\n      height,\n      this.pos[0] - resize[0] / 2,\n      this.pos[1] - resize[1] / 2,\n      resize[0],\n      resize[1]\n    );\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Explosion);\n\n//# sourceURL=webpack:///./src/explosion.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _airship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./airship */ \"./src/airship.js\");\n/* harmony import */ var _cloud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cloud */ \"./src/cloud.js\");\n/* harmony import */ var _bomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bomb */ \"./src/bomb.js\");\n/* harmony import */ var _rock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rock */ \"./src/rock.js\");\n/* harmony import */ var _explosion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./explosion */ \"./src/explosion.js\");\n\n\n\n\n\n\nclass Game {\n  constructor() {\n    // this.FPS = 32;\n    this.ships = [];\n    this.bomb = [];\n    this.rocks = [];\n    this.explosion = [];\n    this.curFrameCount = 0;\n    this.curFrame = 0;\n    this.hp_bar_image = new Image();\n    this.hp_bar_image.src = \"./src/assets/hp_bar.png\";\n    this.current_ship_image = new Image();\n    this.current_ship_image.src = \"./src/assets/current_player.png\";\n    this.selected_ship;\n  }\n\n  add(object) {\n    if (object instanceof _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.ships.push(object);\n    } else if (object instanceof _bomb__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.bomb.push(object);\n    } else if (object instanceof _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n      this.rocks.push(object);\n    } else if (object instanceof _explosion__WEBPACK_IMPORTED_MODULE_4__[\"default\"]) {\n      this.explosion.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  };\n\n  allObjects() {\n    return [].concat(this.rocks, this.ships, this.bomb, this.explosion);\n  };\n\n  addShips() {\n    const ship1 = new _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      name: \"ship1\",\n      pos: [100, 360],\n      game: this,\n      sprite_x_start: 0,\n      sprite_y_start: 0,\n      facing: \"right\",\n      selected: true\n    });\n\n    const ship2 = new _airship__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      name: \"ship2\",\n      pos: [1670, 360],\n      game: this,\n      sprite_x_start: 0,\n      sprite_y_start: 241,\n      facing: \"left\",\n      selected: false\n    });\n\n    this.add(ship1);\n    this.add(ship2);\n    this.selected_ship = this.ships[0];\n    return [ship1, ship2];\n  };\n\n  addBomb(bomb) {\n    this.add(bomb);\n  }\n\n  addRocks() {\n    const big_rock = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 0,\n      pos: [935, 400],\n      game: this,\n      radius: 135,\n      resize: [400, 400],\n      removable: false\n    });\n\n    const mid_rock1 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 121,\n      pos: [320, 300],\n      game: this,\n      radius: 46,\n      resize: [230, 230],\n      removable: true\n    });\n\n    const mid_rock2 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 121,\n      pos: [1550, 300],\n      game: this,\n      radius: 46,\n      resize: [230, 230],\n      removable: true\n    });\n\n    const sml_rock1 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 241,\n      pos: [510, 620],\n      game: this,\n      radius: 37,\n      resize: [230, 230],\n      removable: true\n    });\n\n    const sml_rock2 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 241,\n      pos: [680, 140],\n      game: this,\n      radius: 37,\n      resize: [230, 230],\n      removable: true\n    });\n\n    const sml_rock3 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 241,\n      pos: [1190, 140],\n      game: this,\n      radius: 37,\n      resize: [230, 230],\n      removable: true\n    });\n\n    const sml_rock4 = new _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      sprite_x_start: 241,\n      pos: [1360, 620],\n      game: this,\n      radius: 37,\n      resize: [230, 230],\n      removable: true\n    });\n\n    this.add(big_rock);\n    this.add(mid_rock1);\n    this.add(mid_rock2);\n    this.add(sml_rock1);\n    this.add(sml_rock2);\n    this.add(sml_rock3);\n    this.add(sml_rock4);\n  }\n\n  addExplosion(object) {\n    const new_explosion = new _explosion__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      pos: object.center_pos || object.pos,\n      game: this,\n      object: object\n    });\n\n    this.add(new_explosion);\n  }\n\n  addBackground() {\n    this.sky = new Image();\n    this.sky.src = \"./src/assets/background/sky.png\";\n\n    this.addRocks(); \n\n    this.cloud = new _cloud__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: [0, 210], x_vel: 1, game: this });\n    return this.cloud;\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, 1870, 720);\n    ctx.drawImage(this.sky, 0, 0, 112, 304, 0, 0, 1870, 720);\n    this.cloud.draw(ctx);\n    this.allObjects().forEach(object => {\n      object.draw(ctx);\n    });\n    this.drawStatus(ctx);\n    this.drawSelector(ctx)\n  };\n\n  exitingBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > 1870) || (pos[1] > 720);\n  };\n\n  exitingVerBounds(pos) {\n    return (pos[0] < 0) || (pos[0] > 1870);\n  };\n\n  exitedBounds(pos, width, height) {\n    return (pos[0] < - width) || (pos[1] < - height) ||\n      (pos[0] > 1870) || (pos[1] > 720);\n  };\n\n  wrap(pos) {\n    let wrap_x;\n    if (pos[0] < 0) {\n      wrap_x = 1870 - (pos[0] % 1870);\n    } else if (pos[0] > 1870) {\n      wrap_x = pos[0] % 1870;\n    } else {\n      wrap_x = pos[0];\n    }\n\n    return [wrap_x, pos[1]];\n  };\n\n  remove(object) {\n    if (object instanceof _bomb__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.bomb.splice(this.bomb.indexOf(object), 1);\n      this.bindKeyHandlers();\n    } else if (object instanceof _explosion__WEBPACK_IMPORTED_MODULE_4__[\"default\"]) {\n      this.explosion.splice(this.explosion.indexOf(object), 1);\n    } else if (object instanceof _rock__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n      this.rocks.splice(this.rocks.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  };\n\n  drawStatus(ctx) {\n    const width = 100;\n    const height = 100;\n\n    this.ships.forEach(ship => {\n      let hp_sprite_x;\n      let hp_sprite_y;\n      if (ship.hp === 3) {\n        hp_sprite_x = 0;\n      } else if (ship.hp === 2) {\n        hp_sprite_x = 101;\n      } else if (ship.hp === 1) {\n        hp_sprite_x = 201;\n      } else if (ship.hp === 0) {\n        hp_sprite_x = 301;\n      }\n\n      if (ship.energy === 100) {\n        hp_sprite_y = 0;\n      } else if (ship.energy < 100 && ship.energy >= 95) {\n        hp_sprite_y = 101;\n      } else if (ship.energy < 95 && ship.energy >= 85) {\n        hp_sprite_y = 201;\n      } else if (ship.energy < 85 && ship.energy >= 75) {\n        hp_sprite_y = 301;\n      } else if (ship.energy < 75 && ship.energy >= 65) {\n        hp_sprite_y = 401;\n      } else if (ship.energy < 65 && ship.energy >= 55) {\n        hp_sprite_y = 501;\n      } else if (ship.energy < 55 && ship.energy >= 45) {\n        hp_sprite_y = 601;\n      } else if (ship.energy < 45 && ship.energy >= 35) {\n        hp_sprite_y = 701;\n      } else if (ship.energy < 35 && ship.energy >= 25) {\n        hp_sprite_y = 801;\n      } else if (ship.energy < 25 && ship.energy >= 15) {\n        hp_sprite_y = 901;\n      } else if (ship.energy < 15 && ship.energy >= 5) {\n        hp_sprite_y = 1001;\n      } else if (ship.energy < 5 && ship.energy > 0) {\n        hp_sprite_y = 1101;\n      } else if (ship.energy === 0) {\n        hp_sprite_y = 1201;\n      }\n      \n      ctx.drawImage(\n        this.hp_bar_image,\n        hp_sprite_x,\n        hp_sprite_y,\n        width,\n        height,\n        ship.pos[0] - 20,\n        ship.pos[1] - 100,\n        150,\n        150\n      );\n    });\n  }\n\n  drawSelector(ctx) {\n    this.curFrameCount++;\n    const width = 40;\n    const height = 40;\n\n    let selector_sprite_x;\n    if (this.curFrameCount > 5) {\n      this.curFrame = ++this.curFrame % 4;\n      this.curFrameCount = 0;\n    }\n    selector_sprite_x = this.curFrame * width;\n\n    this.ships.forEach(ship => {\n      if (ship.selected) {\n        if (ship.name === \"ship1\") {\n          ctx.drawImage(\n            this.current_ship_image,\n            selector_sprite_x,\n            0,\n            width,\n            height,\n            ship.pos[0] + 30,\n            ship.pos[1] - 110,\n            50,\n            50\n          );\n        } else if (ship.name === \"ship2\") {\n          ctx.drawImage(\n            this.current_ship_image,\n            selector_sprite_x,\n            41,\n            width,\n            height,\n            ship.pos[0] + 30,\n            ship.pos[1] - 110,\n            50,\n            50,\n          );\n        }\n      }\n    });\n  }\n\n  moveMode() {\n    key(\"w\", () => {\n      this.selected_ship.move([0, -4]);\n      this.selected_ship.spendEnergy();\n      this.selected_ship.aim_mode = false;\n      this.selected_ship.aim_angle = 0;\n    });\n    key(\"a\", () => {\n      this.selected_ship.move([-4, 0]);\n      this.selected_ship.facing = \"left\";\n      this.selected_ship.spendEnergy();\n      this.selected_ship.aim_mode = false;\n      this.selected_ship.aim_angle = 0;\n    });\n    key(\"s\", () => {\n      this.selected_ship.move([0, 4]);\n      this.selected_ship.spendEnergy();\n      this.selected_ship.aim_mode = false;\n      this.selected_ship.aim_angle = 0;\n    });\n    key(\"d\", () => {\n      this.selected_ship.move([4, 0]);\n      this.selected_ship.facing = \"right\";\n      this.selected_ship.spendEnergy();\n      this.selected_ship.aim_mode = false;\n      this.selected_ship.aim_angle = 0;\n    });\n  }\n\n  aimMode() {\n    key(\"q\", () => {\n      this.selected_ship.aim(2);\n      this.selected_ship.aim_mode = true;\n    });\n    key(\"e\", () => {\n      this.selected_ship.aim(-2);\n      this.selected_ship.aim_mode = true;\n    });\n  }\n\n  bindKeyHandlers() {\n    this.moveMode();\n    this.aimMode();\n\n    key(\"g\", () => {\n      key.unbind(\"w, a, s, d\");\n      if (this.selected_ship.name === \"ship1\") {\n        this.selected_ship = this.ships[1];\n        this.selected_ship.selected = true;\n        this.selected_ship.fired = false;\n        this.selected_ship.energy = 100;\n        this.ships[0].selected = false;\n        this.ships[0].aim_mode = false;\n        this.selected_ship.aim_mode = false;\n        this.selected_ship.aim_angle = 0;\n        this.moveMode();\n      } else if (this.selected_ship.name === \"ship2\") {\n        this.selected_ship = this.ships[0];\n        this.selected_ship.selected = true;\n        this.selected_ship.fired = false;\n        this.selected_ship.energy = 100;\n        this.ships[1].selected = false;\n        this.ships[1].aim_mode = false;\n        this.selected_ship.aim_mode = false;\n        this.selected_ship.aim_angle = 0;\n        this.moveMode();\n      }\n    });\n\n    key(\"space\", () => {\n      this.selected_ship.fire();\n    });\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ships = game.addShips();\n  }\n\n  checkBombHit() {\n    if (this.game.bomb.length > 0) {\n      let target_ship;\n\n      if (this.game.selected_ship.name === \"ship1\") {\n        target_ship = this.ships[1];\n      } else {\n        target_ship = this.ships[0];\n      }\n\n      const pos1 = this.game.selected_ship.bomb.center_pos;\n      const pos2 = target_ship.center_pos;\n      \n\n      const ship_dist = Math.pow(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2), 0.5);\n\n      if (ship_dist <= 5 + 50) {\n        this.game.remove(this.game.selected_ship.bomb);\n        this.game.addExplosion(this.game.selected_ship.bomb);\n        this.game.selected_ship.bomb = null;\n        if (this.game.selected_ship.name === \"ship1\") {\n          this.ships[1].hp--;\n          if (this.ships[1].hp === 0) {\n            this.game.addExplosion(this.ships[1]);\n            document.getElementById(\"game-over-menu\").firstElementChild.innerHTML = \"Player 1 Won!\";\n            document.getElementById(\"game-over-menu\").style.display = \"flex\";\n            key.unbind(\"w, a, s, d, q, e, g, space\");\n          }\n        } else if (this.game.selected_ship.name === \"ship2\") {\n          this.ships[0].hp--;\n          if (this.ships[0].hp === 0) {\n            this.game.addExplosion(this.ships[0]);\n            document.getElementById(\"game-over-menu\").firstElementChild.innerHTML = \"Player 2 Won!\";\n            document.getElementById(\"game-over-menu\").style.display = \"flex\";\n            key.unbind(\"w, a, s, d, q, e, g, space\");\n          }\n        }\n        return true;\n      } \n      \n      this.game.rocks.forEach(rock => {\n        const pos3 = rock.pos;\n        const rock_dist = Math.pow(Math.pow(pos1[0] - pos3[0], 2) + Math.pow(pos1[1] - pos3[1], 2), 0.5);\n        if (rock_dist <= 5 + rock.radius) {\n          if (rock.removable) {\n            this.game.remove(rock);\n            this.game.addExplosion(rock);\n          }\n          this.game.remove(this.game.selected_ship.bomb);\n          this.game.addExplosion(this.game.selected_ship.bomb);\n          this.game.selected_ship.bomb = null;\n          return true;\n        }\n      });\n\n      return false;\n    }\n    return false;\n  }\n\n  start() {\n    this.cloud = this.game.addBackground();\n    this.lastTime = 0;\n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n  };\n\n  animate(time) {\n    this.game.draw(this.ctx);\n    this.cloud.move();\n    this.checkBombHit();\n    this.lastTime = time;\n    requestAnimationFrame(this.animate.bind(this));\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\nconst loadGame = (ctx) => {\n  const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx).start();\n}\n\nconst startGame = (ctx) => {\n  const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx).start();\n  game.bindKeyHandlers();\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  const ctx = canvas.getContext(\"2d\");\n  loadGame(ctx);\n  \n  document.getElementById(\"start\").onclick = () => {\n    startGame(ctx);\n    document.getElementById(\"start-menu\").style.display = \"none\";\n  };\n\n  document.getElementById(\"restart\").onclick = () => {\n    startGame(ctx);\n    document.getElementById(\"game-over-menu\").style.display = \"none\";\n  };\n  \n  \n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/rock.js":
/*!*********************!*\
  !*** ./src/rock.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Rock {\n  constructor(props) {\n    this.curFrameCount = 0;\n    this.spriteFrameCount = 1;\n    this.curFrame = 0;\n    this.sprite_x_start = props.sprite_x_start;\n    this.sprite_y_start = 0;\n    this.rock_image = new Image();\n    this.rock_image.src = \"./src/assets/rocks.png\";\n    this.pos = props.pos;\n    this.game = props.game;\n    this.radius = props.radius;\n    this.resize = props.resize;\n    this.removable = props.removable;\n  }\n\n  draw(ctx) {\n    this.curFrameCount++;\n    const width = 120;\n    const height = 120;\n\n    let sprite_x;\n    // if (this.curFrameCount > 8) {\n    //   this.curFrame = ++this.curFrame % this.spriteFrameCount;\n    //   this.curFrameCount = 0;\n    // }\n    sprite_x = this.curFrame * width + this.sprite_x_start;\n\n    ctx.drawImage(\n      this.rock_image,\n      sprite_x,\n      this.sprite_y_start,\n      width,\n      height,\n      this.pos[0] - this.resize[0] / 2,\n      this.pos[1] - this.resize[1] / 2,\n      this.resize[0],\n      this.resize[1]\n    );\n\n    // this.drawHitBox(ctx);\n  }\n\n  drawHitBox(ctx) {\n    ctx.lineWidth = 1;\n    ctx.strokeStyle = 'black';\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.stroke();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rock);\n\n//# sourceURL=webpack:///./src/rock.js?");

/***/ })

/******/ });