class Bomb {
  constructor(props) {
    this.curFrameCount = 0;
    this.spriteFrameCount = 2;
    this.curFrame = 0;
    this.sprite_x_start = 0;
    this.sprite_y_start = 0;
    this.bomb_image = new Image();
    this.bomb_image.src = "../src/assets/bomb.png";
    this.pos = props.pos;
    this.game = props.game;
    this.ship = props.ship;
    this.bomb_path = props.bomb_path;
    this.step = 0;
  }

  draw(ctx) {
    this.curFrameCount++;
    const width = 20;
    const height = 20;

    let sprite_x;
    let sprite_y;
    if (this.curFrameCount > 8) {
      this.curFrame = ++this.curFrame % this.spriteFrameCount;
      this.curFrameCount = 0;
    }
    sprite_x = this.curFrame * width + this.sprite_x_start;

    if (this.ship.facing === "left") {
      sprite_y = this.sprite_y_start + 21;
    } else {
      sprite_y = this.sprite_y_start;
    }

    if (this.bomb_path[this.step]) {
      for (let i = 0; i <= this.step; i++) {
        ctx.beginPath();
        ctx.moveTo(this.bomb_path[i][0], this.bomb_path[i][1]);
        ctx.fillStyle = "brown";
        ctx.arc(this.bomb_path[i][0], this.bomb_path[i][1], 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      this.bomb_path.forEach(bomb_pos => {
        ctx.beginPath();
        ctx.moveTo(bomb_pos[0], bomb_pos[1]);
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
      this.pos[0],
      this.pos[1],
      width,
      height
    );
  }

  move() {
    this.step++;
    if (this.bomb_path[this.step]) {
      this.pos = this.bomb_path[this.step];
    }
  }
  
}


export default Bomb;