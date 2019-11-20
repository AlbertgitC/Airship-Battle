import MovingObject from "./moving_object";
import Bomb from "./bomb";

class Airship extends MovingObject {
  constructor(props) {
    super(props);
    
    this.name = props.name;
    this.curFrameCount = 0;
    this.spriteFrameCount = 8;
    this.curFrame = 0;
    this.sprite_x_start = props.sprite_x_start;
    this.sprite_y_start = props.sprite_y_start;
    this.ship_image = new Image();
    this.ship_image.src = "../src/assets/ships.png";
    this.aim_angle = 0;
    this.aim_mode = false;
    this.facing = props.facing;
    this.bomb_path = null;
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 22;
    const height = 22;

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

    // if (this.bomb_path) {
    //   this.drawPath(ctx);;
    // }

    if (this.bomb) {
      this.bomb.draw(ctx);;
      this.bomb.move();
    }

    if (this.facing === "left") {
      ship_sprite_y = this.sprite_y_start + 23;
    } else {
      ship_sprite_y = this.sprite_y_start;
    }

    ctx.drawImage(
      this.ship_image, 
      ship_sprite_x, 
      ship_sprite_y, 
      width, 
      height, 
      this.pos[0], 
      this.pos[1], 
      100, 
      100
    );
  }

  drawAim(ctx) {
    if (this.facing === "right") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'orange';
      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);
      ctx.lineTo(this.pos[0] + 50 + delta_x, this.pos[1] + 50 - delta_y);
      ctx.stroke();
    } else if (this.facing === "left") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'orange';
      const delta_y = 100 * Math.sin(this.aim_angle * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);
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

  fire() {
    this.bomb_path = [];

    let counter = 0;
    let x;
    let y;
    const increase = this.aim_angle / 180 * Math.PI / 20;

    if (this.facing === "right") {
      for (let i = 0; i <= 2160; i += 10) {

        x = this.pos[0] + 50 + i;

        y = this.pos[1] + 50 - Math.sin(counter) * 290;
        counter += increase;

        this.bomb_path.push([x, y]);
      }
    } else {
      for (let i = 0; i <= 2160; i += 10) {

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
    // const norm = Util.norm(this.vel);

    // const relVel = Util.scale(
    //   Util.dir(this.vel),
    //   Bullet.SPEED
    // );

    // const bulletVel = [
    //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    // ];

    // const bullet = new Bullet({
    //   pos: this.pos,
    //   vel: bulletVel,
    //   color: this.color,
    //   game: this.game
    // });

    // this.game.add(bullet);
  };
}

export default Airship;