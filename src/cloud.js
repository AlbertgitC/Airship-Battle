class Cloud {
  constructor(props) {
    this.pos = props.pos;
    this.game = props.game;
    this.x_vel = props.x_vel;
    this.cloud_img = new Image();
    this.cloud_img.src = "./src/assets/background/clouds.png";
  }

  move() {
    this.pos = [this.pos[0] - 1, this.pos[1]];

    if (this.game.exitedBounds(this.pos, 1870, 510)) {
      this.pos = [0, 210];
    }
  };

  draw(ctx) {
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0], this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 935, this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 1870, this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 2805, this.pos[1], 935, 510);
  }

}

export default Cloud;