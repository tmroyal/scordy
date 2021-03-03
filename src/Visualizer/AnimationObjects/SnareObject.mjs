import BufferedObject from './BufferedObject.mjs';

var buffer = [0.18984449059202868,
0.7257193846958772,
-0.8936523709403087,
-0.2766052355262837,
-0.874504505580554,
0.41140698653479046,
-0.745256062466441,
0.9459346357311976,
-0.9701235644843064,
0.7454183452618475];

export default class SnareObject extends BufferedObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);

    this.buffer = buffer;
    this.color = 'hsla(54, 93%, 76%, 0.91)';
    this.x -= 20;
  }

  draw(p, dt){
    super.draw(p, dt);
  }
}