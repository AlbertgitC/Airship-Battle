class MovingObject {
  constructor(props) {
    this.pos = props.pos;
    // this.vel = props["vel"];
    this.game = props.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  
  move(move) {
    // const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //   offsetX = this.vel[0] * velocityScale,
    //   offsetY = this.vel[1] * velocityScale;
    this.pos = [this.pos[0] + move[0], this.pos[1] + move[1]];
    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];
  };
  
}

export default MovingObject;