import AnimationObject from '../AnimationObject.mjs'


export default class BufferedObject extends AnimationObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.x = width/2;
    this.bufferOffset = Math.floor(Math.random()*5);
  }


  draw(p, dt){
    super.draw(p, dt);
    if (this.ellapsed >= 0){
      let ind;
      let rad = this.shrinkingRadius();
      p.strokeWeight(2);
      p.stroke(this.color);
      p.noFill();

      p.beginShape();
        for (let i = 0; i < this.buffer.length; i++){
          ind = (i + this.bufferOffset) % this.buffer.length;
          p.vertex(this.buffer[ind]*rad+this.x, this.y-i*2);
        }
      p.endShape();
    }
  }
}