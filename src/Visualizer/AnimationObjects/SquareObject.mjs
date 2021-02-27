import AnimationObject from '../AnimationObject.mjs'

const baseRadius = 18;

export default class SquareObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.speed = 120.0;
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
  draw(p, dt){
    super.draw(p, dt);

    p.noStroke();
    p.fill(p.color(`hsla(${this.hue}, 30%, 50%, 0.9)`));

    if (this.ellapsed >= 0){
      let radius = (this.ellapsed <= this.lifetime) ?
          baseRadius*(1.0-this.ellapsed/this.lifetime) : 0;
      radius += 5;

      p.push();
        p.translate(this.x, this.y);
        p.rotate(this.theta);
        p.rect(0, 0, radius, radius);
      p.pop();

      this.y += this.speed*dt;
      this.theta += this.omega*dt;
    }
  }

  finished(p){
    // sinobject finished when at bottom
    this.y >= p.height; 
  }
}