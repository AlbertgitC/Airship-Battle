class Explosion {
  constructor(props) {
    this.curFrameCount = 0;
    this.spriteFrameCount = 8;
    this.curFrame = 0;
    this.sprite_x_start = 0;
    this.sprite_y_start = 0;
    this.explode_image = new Image();
    this.explode_image.src = "../src/assets/explode1.png";
    this.pos = props.pos;
    this.game = props.game;
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 50;
    const height = 50;

    let sprite_x;
    if (this.curFrameCount > 8) {
      this.curFrame = ++this.curFrame % this.spriteFrameCount;
      this.curFrameCount = 0;
    }
    sprite_x = this.curFrame * width + this.sprite_x_start;
    if (this.curFrame === 7) {
      this.game.remove(this);
    }
    ctx.drawImage(
      this.explode_image,
      sprite_x,
      this.sprite_y_start,
      width,
      height,
      this.pos[0] - 25,
      this.pos[1] - 25,
      width,
      height
    );
  }
}

export default Explosion;