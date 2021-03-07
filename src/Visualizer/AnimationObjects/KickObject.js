import BufferedObject from './BufferedObject.js';

var buffer = (()=>{
  var b = [];
  for (let i = 0; i < 15; i++){
    var amp = 1.5*i/15.0;
    var v = Math.sin(7*i*Math.PI/15);

    b.push(amp*v);
  }

  return b;
})();


export default class KickObject extends BufferedObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);

    this.buffer = buffer;
    this.color = 'hsla(191, 93%, 90%, 0.91)';
    this.x -= 40;
    this.bufferOffset = 0.0;
  }

  draw(p, dt){
    super.draw(p, dt);
  }
}