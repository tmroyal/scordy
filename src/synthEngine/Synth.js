import SynthUtil from './SynthUtil';

export default class Synth {
  /**
   * Creates a new Synth
   * @param {SynthEngine} engine 
   */
  constructor(engine){
    this.engine = engine;
  }

  /**
   * Play one note from this synth
   * 
   * @param {int} note as midi note
   * @param {float} volume 0-1
   * @param {float} dur duration in seconds
   */
  play(note, volume, dur){
    const osc = this.engine.audioContext.createOscillator();
    osc.connect(this.engine.gainNode);
    osc.type = 'sine';
    osc.frequency.value = SynthUtil.midicps(note);
    osc.start();

    setTimeout(()=>{
      osc.stop();
    }, dur*1000.0);
  }
};