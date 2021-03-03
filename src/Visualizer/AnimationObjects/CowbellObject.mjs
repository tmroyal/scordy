import AnimationObject from '../AnimationObject.mjs'

const buffer = (()=>{
  let b = [];
  for (let i = 0; i < 10; i++){
    let v = 1*Math.sin(5*i*2*Math.PI/20);
    v += 0.8*Math.sin(i*2*Math.PI/20);
    b.push(v);
  }
  return b;
})();

export default class CowbellObject extends AnimationObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);
    this.x = width/2;
    this.bufferOffset = Math.floor(Math.random()*5);
    this.buffer = buffer;
  }


  draw(p, dt){
    super.draw(p, dt);
    if (this.ellapsed >= 0){
      let ind;
      let rad = this.shrinkingRadius();
      p.strokeWeight(2);
      p.stroke(128,128,255);
      p.noFill();

      p.beginShape();
        for (let i = 0; i < this.buffer.length; i++){
          ind = (i + this.bufferOffset) % this.buffer.length;
          p.vertex(this.buffer[ind]*rad+this.x, this.y-i*2);
        }
      p.endShape();
      this.y += this.speed*dt;
    }
  }
}