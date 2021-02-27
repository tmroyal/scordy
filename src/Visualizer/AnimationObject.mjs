export default class AnimationObject {
  constructor(params, width, height, delay){
    // the lifetime of the object in seconds
    // obtained from params object
    this.params = params
    this.lifetime = this.params.duration || 1.0;
    this.ellapsed = -delay;
    this.x = this.mapPitch(width, params.note);
  }

  /**
   * Maps incoming pitches to the width of a processing sketch
   * using a logistical function to give convincing spread
   * 
   * @param width
   * @param midi midi note 0-127
   */
  mapPitch(width, midi){
    let i = midi/127.0;
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

  /**
   * returns whether the object has existed for longer 
   * than it's lifetime
   * @param p the processing context
   */
  finished(p){
    return this.ellapsed >= this.lifetime; 
  }
}