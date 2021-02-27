import SinObject from "./AnimationObjects/SinObject.mjs"

export default class AnimationObjectCollection {
  constructor(params){ 
    this.animationObjects = {
      "sine": SinObject
    };
  
    // create all of the animation objects
  }

  spawn(objectName, params, delay){
    return new this.animationObjects["sine"](params, delay);
    // for now, always spawn sin object
  }
};