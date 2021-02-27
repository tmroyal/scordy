import AnimationObject from '../AnimationObject.mjs'

const baseRadius = 18;

export default class SinObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.speed = 120.0;
    this.y = 0;
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

    p.noStroke();

    if (this.ellapsed >= 0){
      let radius = (this.ellapsed <= this.lifetime) ?
          baseRadius*(1.0-this.ellapsed/this.lifetime) : 0;
      radius += 5;

      p.ellipse(this.x, this.y, radius, radius);
      this.y += this.speed*dt;
    }
  }

  finished(p){
    // sinobject finished when at bottom
    this.y >= p.height; 
  }
}