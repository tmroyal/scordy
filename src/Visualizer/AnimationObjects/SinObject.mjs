import AnimationObject from '../AnimationObject.mjs'


export default class SinObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.speed = 120.0;
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

      p.ellipse(this.x, this.y, radius, radius);
      this.y += this.speed*dt;
    }
  }

  finished(p){
    // sinobject finished when at bottom
    this.y >= p.height; 
  }
}