import MovingObject from "./moving_object";

class Cloud extends MovingObject {
  constructor(props) {
    super(props);
    this.cloud_img = new Image();
    this.cloud_img.src = "../src/assets/background/clouds.png";
  }

  move(ctx) {
    // const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //   offsetX = this.x_vel * velocityScale;
    // console.log(timeDelta);  
    this.pos = [this.pos[0] - 1, this.pos[1]];

    if (this.game.exitedBounds(this.pos, 1870, 510)) {
      this.pos = [0, 210];
    }
    // console.log(this.pos);
  };

  draw(ctx) {
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0], this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 935, this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 1870, this.pos[1], 935, 510);
    ctx.drawImage(this.cloud_img, 0, 0, 544, 236, this.pos[0] + 2805, this.pos[1], 935, 510);
  }

}

export default Cloud;