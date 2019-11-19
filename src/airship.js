import MovingObject from "./moving_object";

class Airship extends MovingObject {
  constructor(props) {
    super(props);
    
    this.name = props.name;
    this.frameCount = 3;
    this.curFrame = 0;
    this.sprite_x_start = props.sprite_x_start;
    this.ship_sprite_y = 0;
  }

  // power(impulse) {
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  // };

  draw(ctx) {
    const ship_image = new Image(); 
    ship_image.src = "../src/assets/Shooter_SpriteSheet.png";

    const width = 17;
    const height = 17;

    let ship_sprite_x;

    this.curFrame = ++this.curFrame % this.frameCount;
    ship_sprite_x = this.curFrame * width + this.sprite_x_start;
    ctx.drawImage(
      ship_image, 
      ship_sprite_x, 
      this.ship_sprite_y, 
      width, 
      height, 
      this.pos[0], 
      this.pos[1], 
      100, 
      100
    );
  }
}

export default Airship;