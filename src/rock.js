class Rock {
  constructor(props) {
    this.curFrameCount = 0;
    this.spriteFrameCount = 1;
    this.curFrame = 0;
    this.sprite_x_start = props.sprite_x_start;
    this.sprite_y_start = 0;
    this.rock_image = new Image();
    this.rock_image.src = "../src/assets/rocks.png";
    this.pos = props.pos;
    this.game = props.game;
    this.radius = props.radius;
    this.resize = props.resize;
    this.removable = props.removable;
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 120;
    const height = 120;

    let sprite_x;
    // if (this.curFrameCount > 8) {
    //   this.curFrame = ++this.curFrame % this.spriteFrameCount;
    //   this.curFrameCount = 0;
    // }
    sprite_x = this.curFrame * width + this.sprite_x_start;

    ctx.drawImage(
      this.rock_image,
      sprite_x,
      this.sprite_y_start,
      width,
      height,
      this.pos[0] - this.resize[0] / 2,
      this.pos[1] - this.resize[1] / 2,
      this.resize[0],
      this.resize[1]
    );

    // this.drawHitBox(ctx);
  }

  drawHitBox(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

}

export default Rock;