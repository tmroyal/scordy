import p5 from 'p5';
import AnimationManager from './AnimationManager.js'

const WIDTH = 400;
const HEIGHT = 480;

export default class Visualizer{
  constructor(){
    this.sketch = this.createSketch();
    this.element = document.getElementById('visualizer');
    this.p5 = new p5(this.sketch, this.element);
    this.size = 10;

    this.animationManager = new AnimationManager(WIDTH, HEIGHT);
    this.active = true;
  }

  /**
   * set the audio context. used for timing 
   * 
   * @param context audio context
   */
  setAudioContext(context){
    this.audioContext = context;
  }

  /**
   * creates the processing sketch that is sent to the p5 object
   */
  createSketch(){
    return (p)=>{
      p.setup = ()=>{
        p.createCanvas(400,480);
        p.rectMode(p.CENTER);
      };

      p.draw = ()=>{
        p.background(0);
        p.fill(255, 255, 255);
        this.animationManager.draw(p, p.deltaTime / 1000.0);
      };
    };
  }

  /**
   * calculate delay from audioContext and start property
   * @param params 
   */
  calculateDelay(params){
    if (!this.audioContext || !params.hasOwnProperty("start")){
      return 0;
    } else {
      let delay = params.start - this.audioContext.currentTime;

      if (delay > 0){
        return delay;
      } else {
        return 0;
      }
    }
  }

  /**
   * spawn an animation object. cleanup is handled by the object
   * 
   * @param objectName the name of the object to spawn
   * @param params the parameters for the spawning object
   */
  spawn(objectName, params){
    if (!document.hidden){
      let delay = this.calculateDelay(params);
      this.animationManager.spawn(objectName, params, delay);
    }
  }

}