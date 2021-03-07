import AnimationObject from '../AnimationObject.mjs'

export default class RotatingObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);

    this.omega = (params.volume || 1.0) * 3 * Math.PI * (1.0 + Math.random()*0.1);
    this.theta = Math.random() * 2 * Math.PI;
    if (Math.random() < 0.5){
      this.omega *= -1.0;
    }
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

      this.theta += this.omega*dt;
    }
  }

  rotated(p, cb){
    p.push();
      p.translate(this.x, this.y);
      p.rotate(this.theta || 0.0);
      cb();
    p.pop();
  }


}