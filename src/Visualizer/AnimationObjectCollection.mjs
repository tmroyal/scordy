import SinObject from "./AnimationObjects/SinObject.mjs"

export default class AnimationObjectCollection {
  constructor(params){ 
    this.animationObjects = {
      "sine": SinObject
    };
  
    // create all of the animation objects
  }

  spawn(objectName, params, width, height, delay){
    return new this.animationObjects["sine"](params, width, height, delay);
    // for now, always spawn sin object
  }
};