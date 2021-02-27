import AnimationObject from '../AnimationObject.mjs'

export default class RotatingObject extends AnimationObject {
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
  draw(p, dt, cb){
    super.draw(p, dt);

    if (this.ellapsed >= 0){
      this.rotated(p, cb);

      this.y += this.speed*dt;
      this.theta += this.omega*dt;
    }
  }

}