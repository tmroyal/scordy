import AnimationObject from '../AnimationObject.js'

export default class SustainedObject extends AnimationObject {
  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.length = this.speed*this.lifetime;
    this.top = this.y;
  }

  draw(p, dt){
    super.draw(p, dt);

  }

  getDrawLength(){
    var toTop = this.y - this.top;
    if (toTop < this.length){
      return toTop;
    } else {
      return this.length;
    }
  }
}