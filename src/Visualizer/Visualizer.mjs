import p5 from 'p5';

/**
 * The processing instance
 */

export default class Visualizer{
  constructor(){
    this.sketch = this.createSketch();
    this.element = document.getElementById('visualizer');
    this.p5 = new p5(this.sketch, this.element);
    this.size = 10;
  }

  createSketch(){
    return (p)=>{
      p.setup = ()=>{
        p.createCanvas(400,480);
      }

      p.draw = ()=>{
        p.background(0);
        p.fill(255, 255, 255);
        p.ellipse(p.width/2, p.height/2, this.size, this.size);
      }
    };
  }

}