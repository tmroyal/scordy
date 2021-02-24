import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

export default class Organ extends Synth {
  constructor(engine){ 
    super(engine); 
    this.wave = this.setupWave();
    this.setADSR(0.1, 0, 1.0, 0.1);
  }

  setupWave(){
    var real = new Float32Array(9);
    var imag = new Float32Array(9);
    
    real[1] = 0.49957227706909;
    real[2] = 0.24657237529755;
    real[4] = 0.97180926799774;
    real[8] = 0.96439158916473;

    return this.engine.audioContext.createPeriodicWave(real, imag);
  }

  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note.forEach((theNote)=>{
        this.play(theNote, volume, dur, start);
      })
    } else {
      const freq = SynthUtil.midicps(note);

      const snd = this.engine.audioContext.createOscillator();
      const env = this.engine.audioContext.createGain();

      this.setADSREnvelope(volume, dur, env.gain, start);

      snd.setPeriodicWave(this.wave);
      snd.frequency.value = freq;

      snd.connect(env).connect(this.engine.gainNode);

      snd.start(start);
      snd.stop(start+dur+this.release);

      snd.onended = ()=>{
        env.disconnect();
      }
    }
  }

}