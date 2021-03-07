import SustainedObject from "./SustainedObject.js";

export default class OrganObject extends SustainedObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
  }

  draw(p, dt){
    super.draw(p, dt);
    if (this.ellapsed >= 0){
      let len = this.getDrawLength();

      p.noFill();
      p.strokeWeight(4);
      p.stroke(this.getColor(p));
      p.line(this.x, this.y, this.x, this.y-len);

    }
  }

}