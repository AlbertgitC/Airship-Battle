import MovingObject from "./moving_object";

class Airship extends MovingObject {
  constructor(props) {
    super(props);
    
    this.name = props.name;
    this.frameCount = 3;
    this.curFrame = 0;
    this.sprite_x_start = props.sprite_x_start;
    this.ship_sprite_y = 0;
    this.ship_image = new Image();
    this.ship_image.src = "../src/assets/Shooter_SpriteSheet.png";
    this.aim_pos = 0;
    this.aim_mode = false;
    this.facing = props.facing;
  }

  // power(impulse) {
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  // };

  draw(ctx) {
    const width = 17;
    const height = 17;

    let ship_sprite_x;

    this.curFrame = ++this.curFrame % this.frameCount;
    ship_sprite_x = this.curFrame * width + this.sprite_x_start;
    if (this.aim_mode) {
      this.drawAim(ctx);
    }
    ctx.drawImage(
      this.ship_image, 
      ship_sprite_x, 
      this.ship_sprite_y, 
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
      const delta_y = 100 * Math.sin(this.aim_pos * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);
      ctx.lineTo(this.pos[0] + 50 + delta_x, this.pos[1] + 50 - delta_y);
      ctx.stroke();
    } else if (this.facing === "left") {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'orange';
      const delta_y = 100 * Math.sin(this.aim_pos * Math.PI / 180);
      const delta_x = Math.sqrt(10000 - Math.pow(delta_y, 2));
      ctx.moveTo(this.pos[0] + 50, this.pos[1] + 50);
      ctx.lineTo(this.pos[0] + 50 - delta_x, this.pos[1] + 50 - delta_y);
      ctx.stroke();
    }
  }

  aim(angle) {
    if (angle > 0 && this.aim_pos < 46) {
      const new_angle = this.aim_pos + angle;
      this.aim_pos = new_angle;
    } else if (angle < 0 && this.aim_pos > -46) {
      const new_angle = this.aim_pos + angle;
      this.aim_pos = new_angle;
    }
  }

  // fireBullet() {
  //   const norm = Util.norm(this.vel);

  //   const relVel = Util.scale(
  //     Util.dir(this.vel),
  //     Bullet.SPEED
  //   );

  //   const bulletVel = [
  //     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  //   ];

  //   const bullet = new Bullet({
  //     pos: this.pos,
  //     vel: bulletVel,
  //     color: this.color,
  //     game: this.game
  //   });

  //   this.game.add(bullet);
  // };
}

export default Airship;