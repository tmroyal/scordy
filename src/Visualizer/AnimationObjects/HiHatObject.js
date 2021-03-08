import BufferedObject from './BufferedObject.js';

const buffer = [
  0.8486913453331666, 
  -0.22748658104323205, 
  0.09419107651910963, 
  -0.4935622976726082, 
  0.3059195093401277, 
  -0.7269070697423698, 
  -0.11496664157157976, 
  -0.5675908579525042, 
  0.24374386029091344, 
  0.31508636497627274];

export default class HiHatObject extends BufferedObject {

  constructor(params, width, height, delay){
    super(params, width, height, delay);

    this.buffer = buffer;
    this.color = 'hsla(273, 93%, 76%, 0.91)';
    this.x = width - 40;
  }

  draw(p, dt){
    super.draw(p, dt);
  }
}