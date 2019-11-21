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
      this.pos[0] - 200,
      this.pos[1] - 200,
      400,
      400
    );

    this.drawHitBox(ctx);
  }

  drawHitBox(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 135, 0, 2 * Math.PI);
    ctx.stroke();
  }

}

export default Rock;