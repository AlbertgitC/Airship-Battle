class Bomb {
  constructor(props) {
    this.curFrameCount = 0;
    this.spriteFrameCount = 2;
    this.curFrame = 0;
    this.sprite_x_start = 0;
    this.sprite_y_start = 0;
    this.bomb_image = new Image();
    this.bomb_image.src = "../src/assets/torpedo.png";
    this.pos = props.pos;
    this.game = props.game;
    this.ship = props.ship;
    this.bomb_path = props.bomb_path;
    this.step = 0;
    this.center_pos = [this.pos[0], this.pos[1]];
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 30;
    const height = 30;

    let sprite_x;
    let sprite_y;
    if (this.curFrameCount > 1) {
      this.curFrame = ++this.curFrame % this.spriteFrameCount;
      this.curFrameCount = 0;
    }
    sprite_x = this.curFrame * width + this.sprite_x_start;

    if (this.ship.facing === "right") {
      sprite_y = this.sprite_y_start + 31;
    } else {
      sprite_y = this.sprite_y_start;
    }

    if (this.bomb_path[this.step]) {
      for (let i = 0; i <= this.step; i++) {
        ctx.moveTo(this.bomb_path[i][0], this.bomb_path[i][1]);
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.arc(this.bomb_path[i][0], this.bomb_path[i][1], 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      this.bomb_path.forEach(bomb_pos => {
        ctx.moveTo(bomb_pos[0], bomb_pos[1]);
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.arc(bomb_pos[0], bomb_pos[1], 1, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    ctx.drawImage(
      this.bomb_image,
      sprite_x,
      sprite_y,
      width,
      height,
      this.pos[0] - 19,
      this.pos[1] - 17,
      40,
      40
    );

    // this.drawHitBox(ctx);
    this.move();
  }

  move() {
    if (this.bomb_path[this.step] && !this.game.exitingVerBounds(this.bomb_path[this.step])) {
      this.pos = this.bomb_path[this.step];
      this.center_pos = [this.pos[0] + 10, this.pos[1] + 10];
      this.step++;
    } else if (this.game.exitingVerBounds(this.bomb_path[this.step])) {
      this.game.remove(this);
      this.ship.bomb = null;
    }
  }

  drawHitBox(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 8, 0, 2 * Math.PI);
    ctx.stroke();
  }
}


export default Bomb;