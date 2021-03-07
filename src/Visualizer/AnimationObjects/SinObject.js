import AnimationObject from '../AnimationObject.js'

export default class SinObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
  }


  /**
   * draws the object to the processing context
   * (Aoc is ignored)
   *  
   * @param p the processing context
   * @param dt delta time in seconds
   */
  draw(p, dt){
    super.draw(p, dt);

    if (this.ellapsed >= 0){
      let radius = this.shrinkingRadius();

      p.noFill();
      p.stroke(this.getColor(p));
      p.strokeWeight(2);

      p.ellipse(this.x, this.y, radius, radius);

    }
  }

}