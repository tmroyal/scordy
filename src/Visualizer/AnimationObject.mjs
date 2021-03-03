const baseRadius = 14;

export default class AnimationObject {
  constructor(params, width, height, delay){
    // the lifetime of the object in seconds
    // obtained from params object
    this.params = params
    this.lifetime = this.params.duration || 1.0;
    this.ellapsed = -delay;
    this.x = this.mapPitch(width, params.note);
    this.hue = this.mapHue(params.note);
    this.y = 30;

    this.speed = 120.0;
  }

  /**
   * Maps midi notes to hue. 7ths are closer than thirds are closer than half
   * steps
   *  
   * @param midi 
   */
  mapHue(midi){
    return Math.floor(255 * ((midi%12*7+7) % 12 / 12));
  }
  
  /**
   * Maps incoming pitches to the width of a processing sketch
   * using a logistical function to give convincing spread
   * 
   * @param width
   * @param midi midi note 0-127
   */
  mapPitch(width, midi){
    let i = 1/(1+Math.exp(-0.06*(midi-60)));
    return i*width;
  }

  /**
   * draws the object to the processing context
   *  
   * @param p the processing context
   * @param dt delta time in seconds
   * @param aoc AnimationObjectCollection, used to spawn new items
   */
  draw(p, dt, aoc){
    this.ellapsed += dt;

  }

  getColor(p){
    return p.color(`hsla(${this.hue}, 30%, 50%, 0.9)`); 
  }

  rotated(p, cb){
    p.push();
      p.translate(this.x, this.y);
      p.rotate(this.theta || 0.0);
      cb();
    p.pop();
  }

  /**
   * returns whether the object has exited
   * @param p the processing context
   */
  finished(p){
    this.y >= p.height; 
  }

  shrinkingRadius(){
    let radius = (this.ellapsed <= this.lifetime) ?
        baseRadius*(1.0-this.ellapsed/this.lifetime) : 0;
    radius += 5;
    return radius;
  }
}