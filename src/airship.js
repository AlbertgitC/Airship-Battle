import Bomb from "./bomb";

class Airship {
  constructor(props) {
    this.name = props.name;
    this.pos = props.pos;
    this.curFrameCount = 0;
    this.spriteFrameCount = 8;
    this.curFrame = 0;
    this.game = props.game;
    this.sprite_x_start = props.sprite_x_start;
    this.sprite_y_start = props.sprite_y_start;
    this.ship_image = new Image();
    this.ship_image.src = "../src/assets/zeplin.png";
    this.aim_angle = 0;
    this.aim_mode = false;
    this.facing = props.facing;
    this.bomb_path = null;
    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];
    this.selected = props.selected;
    this.energy = 100;
    this.hp = 3;
    this.fired = false;
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 120;
    const height = 120;

    let ship_sprite_x;
    let ship_sprite_y;
    if (this.curFrameCount > 8) {
      this.curFrame = ++this.curFrame % this.spriteFrameCount;
      this.curFrameCount = 0;
    }
    ship_sprite_x = this.curFrame * width + this.sprite_x_start;
    
    if (this.aim_mode) {
      this.drawAim(ctx);
    }

    if (!this.bomb && this.bomb_path && this.selected) {
      this.drawPath(ctx);;
    }

    if (this.facing === "left") {
      ship_sprite_y = this.sprite_y_start + 121;
    } else {
      ship_sprite_y = this.sprite_y_start;
    }

    ctx.drawImage(
      this.ship_image, 
      ship_sprite_x, 
      ship_sprite_y, 
      width, 
      height, 
      this.pos[0] - 17, 
      this.pos[1] - 19, 
      140, 
      140
    );

    // this.drawHitBox(ctx);
  }

  drawAim(ctx) {
    if (this.facing === "right") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'orange';
      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.center_pos[0], this.center_pos[1]);
      ctx.lineTo(this.pos[0] + 50 + delta_x, this.pos[1] + 50 - delta_y);
      ctx.stroke();
    } else if (this.facing === "left") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'orange';
      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.center_pos[0], this.center_pos[1]);
      ctx.lineTo(this.pos[0] + 50 - delta_x, this.pos[1] + 50 - delta_y);
      ctx.stroke();
    }
  }

  aim(angle) {
    if (angle > 0 && this.aim_angle < 60) {
      const new_angle = this.aim_angle + angle;
      this.aim_angle = new_angle;
    } else if (angle < 0 && this.aim_angle > -60) {
      const new_angle = this.aim_angle + angle;
      this.aim_angle = new_angle;
    }
  }

  drawPath(ctx) {
    this.bomb_path.forEach(bomb_pos => {
      ctx.beginPath();
      ctx.moveTo(bomb_pos[0], bomb_pos[1]);
      ctx.fillStyle = "brown";
      ctx.arc(bomb_pos[0], bomb_pos[1], 1, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  drawHitBox(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.center_pos[0], this.center_pos[1], 50, 0, 2 * Math.PI);
    ctx.stroke();
  }

  fire() {
    if (!this.fired) {
      this.fired = true;
      key.unbind("w, a, s, d, q, e, g, space");
      this.bomb_path = [];

      let counter = 0;
      let x;
      let y;
      const increase = this.aim_angle / 180 * Math.PI / 40;

      if (this.facing === "right") {
        for (let i = 0; i <= 2160; i += 5) {

          x = this.pos[0] + 50 + i;

          y = this.pos[1] + 50 - Math.sin(counter) * 290;
          counter += increase;

          this.bomb_path.push([x, y]);
        }
      } else {
        for (let i = 0; i <= 2160; i += 5) {

          x = this.pos[0] + 50 - i;

          y = this.pos[1] + 50 - Math.sin(counter) * 290;
          counter += increase;

          this.bomb_path.push([x, y]);
        }
      }

      this.bomb = new Bomb({
        pos: this.bomb_path[0],
        game: this.game,
        ship: this,
        bomb_path: this.bomb_path
      });

      this.game.addBomb(this.bomb);
    }
  };

  move(move) {
    this.pos = [this.pos[0] + move[0], this.pos[1] + move[1]];
    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];
    if (this.game.exitingBounds(this.center_pos)) {
      if (this.center_pos[0] < 0) {
        this.pos = [this.pos[0] + 4, this.pos[1]];
      } else if (this.center_pos[1] < 0) {
        this.pos = [this.pos[0], this.pos[1] + 4];
      } else if (this.center_pos[0] > 1870) {
        this.pos = [this.pos[0] - 4, this.pos[1]];
      } else if (this.center_pos[1] > 720) {
        this.pos = [this.pos[0], this.pos[1] - 4];
      }
    }

    const pos1 = this.center_pos;
    
    this.game.rocks.forEach(rock => {
      const pos3 = rock.pos;
      const rock_dist = Math.pow(Math.pow(pos1[0] - pos3[0], 2) + Math.pow(pos1[1] - pos3[1], 2), 0.5);
      if (rock_dist <= 50 + rock.radius) {
        if (this.center_pos[0] < pos3[0] && this.center_pos[1] <= pos3[1]) {
          this.pos = [this.pos[0], this.pos[1] - 4];
        } else if (this.center_pos[0] >= pos3[0] && this.center_pos[1] < pos3[1]) {
          this.pos = [this.pos[0], this.pos[1] - 4];
        } else if (this.center_pos[0] > pos3[0] && this.center_pos[1] >= pos3[1]) {
          this.pos = [this.pos[0], this.pos[1] + 4];
        } else if (this.center_pos[0] <= pos3[0] && this.center_pos[1] > pos3[1]) {
          this.pos = [this.pos[0], this.pos[1] + 4];
        }
      }
    });
  };

  spendEnergy() {
    if(this.energy <= 0) {
      key.unbind("w, a, s, d");
      key("a", () => {
        this.facing = "left";
      });
      key("d", () => {
        this.facing = "right";
      });
    } else {
      this.energy--;
    }
  }
}

export default Airship;