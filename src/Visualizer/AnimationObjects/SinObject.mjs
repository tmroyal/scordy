import AnimationObject from '../AnimationObject.mjs'

export default class SinObject extends AnimationObject {
  constructor(params, delay){
    super(params, delay);
    this.speed = 120.0;
    this.y = 20;
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
      let x = super.mapPitch(p, this.params.note);
      let y = this.y;
      this.y += this.speed*dt;
      p.ellipse(x, y, 10, 10);
    }
  }

  finished(p){
    // sinobject finished when at bottom
    this.y >= p.height; 
  }
}