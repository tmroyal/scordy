import SinObject from "./AnimationObjects/SinObject.mjs"
import SquareObject from "./AnimationObjects/SquareObject.mjs"
import TriangleObject from "./AnimationObjects/TriangleObject.mjs"

export default class AnimationObjectCollection {
  constructor(params){ 
    this.animationObjects = {
      "sine": SinObject,
      "square": SquareObject,
      "tri": TriangleObject
    };
  
    // create all of the animation objects
  }

  spawn(objectName, params, width, height, delay){
    if (!(objectName in this.animationObjects)){
      objectName = "sine";
    }
    return new this.animationObjects[objectName](params, width, height, delay);
  }
};