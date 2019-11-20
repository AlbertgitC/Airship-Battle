import Airship from "./airship";

class Bomb extends Airship {
  constructor(props) {
    super(props);

    this.ship = props.ship;
  }


}


export default Bomb;