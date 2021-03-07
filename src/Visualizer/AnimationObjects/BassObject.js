import SustainedObject from "./SustainedObject.js";

export default class BassObject extends SustainedObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
  }

  draw(p, dt){
    super.draw(p, dt);
    if (this.ellapsed >= 0){
      let len = this.getDrawLength();
      let base = this.shrinkingRadius();

      p.noStroke();
      p.fill(this.getColor(p));

      p.triangle(
        this.x - base/2, this.y, 
        this.x + base/2, this.y,
        this.x, this.y - len);
    }
  }

}