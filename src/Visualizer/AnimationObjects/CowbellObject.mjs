import AnimationObject from '../AnimationObject.mjs'
import BufferedObject from './BufferedObject.mjs';

const buffer = (()=>{
  let b = [];
  for (let i = 0; i < 10; i++){
    let v = 1*Math.sin(5*i*2*Math.PI/20);
    v += 0.8*Math.sin(i*2*Math.PI/20);
    b.push(v);
  }
  return b;
})();

export default class CowbellObject extends BufferedObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);

    this.buffer = buffer;
    this.color = 'hsla(190, 88%, 57%, 0.9)';
  }


  draw(p, dt){
    super.draw(p, dt);
  }
}