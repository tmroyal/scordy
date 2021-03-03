import SinObject from "./AnimationObjects/SinObject.mjs"
import SquareObject from "./AnimationObjects/SquareObject.mjs"
import TriangleObject from "./AnimationObjects/TriangleObject.mjs"
import SawObject from "./AnimationObjects/SawObject.mjs"
import OrganObject from "./AnimationObjects/OrganObject.mjs"
import BassObject from "./AnimationObjects/BassObject.mjs"
import CowbellObject from "./AnimationObjects/CowbellObject.mjs"
import HiHatObject from "./AnimationObjects/HiHatObject.mjs"
import SnareObject from "./AnimationObjects/SnareObject.mjs"
import KickObject from "./AnimationObjects/KickObject.mjs"

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