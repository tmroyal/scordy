import RotatingObject from './RotatingObject.mjs'

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

    p.noStroke();
    p.fill(this.getColor(p));

    super.draw(p, dt, (r)=>{
      p.rect(0, 0, radius, radius);
    });
  }

}