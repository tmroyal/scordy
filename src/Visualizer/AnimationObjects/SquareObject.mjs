import AnimationObject from '../AnimationObject.mjs'

const baseRadius = 18;

export default class SquareObject extends AnimationObject {
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

      this.rotated(p, ()=>{
        p.rect(0, 0, radius, radius);
      });

      this.y += this.speed*dt;
      this.theta += this.omega*dt;
    }
  }

}