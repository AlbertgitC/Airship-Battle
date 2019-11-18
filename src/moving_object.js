class MovingObject {
  constructor(props) {
    this.pos = props["pos"];
    this.vel = props["vel"];
    this.radius = props["radius"];
    this.color = props["color"];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move() {
    let newPos = [(this.pos[0] + this.vel[0]), (this.pos[1] + this.vel[1])];
  };
}

module.exports = MovingObject;