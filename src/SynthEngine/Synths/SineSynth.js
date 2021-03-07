import Synth from "./Synth.js";
import SynthUtil from "./SynthUtil.js"


export default class SineSynth extends Synth {
  constructor(engine){
    super(engine);
  }

  /**
   * Play one note from this synth
   * 
   * @param {int|Array} note as midi note
   * @param {float} volume 0-1
   * @param {float} dur duration in seconds
   */
  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note.forEach((theNote)=>{
        this.play(theNote, volume, dur, start);
      })
    } else {
      const osc = this.engine.audioContext.createOscillator();
      const env = this.engine.audioContext.createGain();

      start = start || 0;

      osc.connect(env).connect(this.engine.gainNode);
      osc.type = 'sine';
      osc.frequency.value = SynthUtil.midicps(note);

      this.setADSREnvelope(volume, dur, env.gain, start);
      osc.start(start);
      osc.stop(start+dur+this.release);

      osc.onended = ()=>{
        env.disconnect();
      }
    }
  }
  


}