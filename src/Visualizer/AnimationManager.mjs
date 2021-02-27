import AnimationObjectCollection from './AnimationObjectCollection.mjs'

export default class AnimationManager {

  constructor(){
    this.objects = [];
    // this.aoc represents the collection of available animation objects
    this.aoc = new AnimationObjectCollection();
  }

  /**
   * draws the animation objects to the processing context
   * deletes any objects whose lifetime is finished
   * 
   * @param p the processing context
   * @param dt delta time in seconds
   */
  draw(p, dt){
    this.objects = this.objects.filter(animObject=>{
      animObject.draw(p, dt, this);

      return !animObject.finished(p);
    });
  }

  /**
   * spawn an object with object name with params
   * 
   * @param {String} objectName 
   * @param {Object} params 
   * @param {float} delay in seconds 
   */
  spawn(objectName, params, delay){
    if (Array.isArray(params.note)){
      params.note.forEach(note=>{
        let itParams = Object.assign({}, params);
        itParams.note = note;
        this.objects.push(this.aoc.spawn(objectName, itParams, delay));

      });
    } else {
      this.objects.push(this.aoc.spawn(objectName, params, delay));
    }
  }
};