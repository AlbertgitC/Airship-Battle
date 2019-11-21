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
    this.pos = [this.pos[0] + move[0], this.pos[1] + move[1]];
    this.center_pos = [this.pos[0] + 50, this.pos[1] + 50];
  };
  
}

export default MovingObject;