import RotatingObject from './RotatingObject.mjs'

const SQRT2 = Math.sqrt(2);

export default class SquareObject extends RotatingObject {
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
    let radius = this.shrinkingRadius();
    let r_2 = radius/2;
    let r_sq2_2 = r_2*SQRT2;

    p.noStroke();
    p.fill(this.getColor(p));

    super.draw(p, dt, ()=>{
      p.triangle(0, radius, r_sq2_2, -r_2, -r_sq2_2, -r_2);
    });
  }

}