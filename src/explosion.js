import Bomb from "./bomb";
import Rock from "./rock";
import Airship from "./airship";

class Explosion {
  constructor(props) {
    this.curFrameCount = 0;
    this.spriteFrameCount = 8;
    this.curFrame = 0;
    this.sprite_x_start = 0;
    this.sprite_y_start = 0;
    this.explode_image = new Image();
    this.pos = props.pos;
    this.game = props.game;
    this.object = props.object;
  }

  draw(ctx) {
    this.curFrameCount++;
    let width;
    let height;
    let resize;
    if (this.object instanceof Bomb) {
      width = 50;
      height = 50;
      resize = [50, 50];
      this.explode_image.src = "../src/assets/explode1.png";
    } else if (this.object instanceof Rock) {
      width = 120;
      height = 120;
      resize = [230, 230];
      this.explode_image.src = "../src/assets/rock_down.png";
    } else if (this.object instanceof Airship) {
      width = 64;
      height = 64;
      resize = [150, 150];
      this.explode_image.src = "../src/assets/explode2.png";
    }

    let sprite_x;
    if (this.curFrameCount > 8) {
      this.curFrame = ++this.curFrame % this.spriteFrameCount;
      this.curFrameCount = 0;
    }
    sprite_x = this.curFrame * width + this.sprite_x_start;
    if (!(this.object instanceof Airship) && this.curFrame === this.spriteFrameCount - 1) {
      this.game.remove(this);
    }
    ctx.drawImage(
      this.explode_image,
      sprite_x,
      this.sprite_y_start,
      width,
      height,
      this.pos[0] - resize[0] / 2,
      this.pos[1] - resize[1] / 2,
      resize[0],
      resize[1]
    );
  }
}

export default Explosion;