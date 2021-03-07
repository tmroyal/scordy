import SinObject from "./AnimationObjects/SinObject.js"
import SquareObject from "./AnimationObjects/SquareObject.js"
import TriangleObject from "./AnimationObjects/TriangleObject.js"
import SawObject from "./AnimationObjects/SawObject.js"
import OrganObject from "./AnimationObjects/OrganObject.js"
import BassObject from "./AnimationObjects/BassObject.js"
import CowbellObject from "./AnimationObjects/CowbellObject.js"
import HiHatObject from "./AnimationObjects/HiHatObject.js"
import SnareObject from "./AnimationObjects/SnareObject.js"
import KickObject from "./AnimationObjects/KickObject.js"

export default class AnimationObjectCollection {
  constructor(params){ 
    this.animationObjects = {
      "sine": SinObject,
      "square": SquareObject,
      "tri": TriangleObject,
      "saw": SawObject,
      "organ": OrganObject,
      "bass1": BassObject,
      "cowbell": CowbellObject,
      "hihat": HiHatObject,
      "snare": SnareObject,
      "kick": KickObject
    }; 
  }

  spawn(objectName, params, width, height, delay){
    if (!(objectName in this.animationObjects)){
      objectName = "sine";
    }
    return new this.animationObjects[objectName](params, width, height, delay);
  }
};