import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

export default class FMSynth extends Synth {
  constructor(engine, ind){
    super(engine);

    // not a true fm modulation index
    this.ind = ind;
    this.attack = 0.01;
  }

  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note.forEach((theNote)=>{
        this.play(theNote, volume, dur, start);
      })
    } else {
      var freq = SynthUtil.midicps(note);
      var car = this.engine.audioContext.createOscillator();
      var carGain = this.engine.audioContext.createGain();
      var mod = this.engine.audioContext.createOscillator();
      var modGain = this.engine.audioContext.createGain();
    
      mod.frequency.value = freq*this.ind;
      modGain.gain.value = freq;
      car.frequency.value = freq;

      //setEnvelope(base, peak, dur, value, start){
      this.setEnvelope(0, freq, dur, modGain.gain, start);
      this.setEnvelope(0, volume, dur, carGain.gain, start);
    
      mod.connect(modGain).connect(car.detune);
      car.connect(carGain).connect(this.engine.gainNode);
    
      car.start(start);
      mod.start(start);

      car.stop(start+dur);
      mod.stop(start+dur);

      car.onended = function(){
        carGain.disconnect();
        modGain.disconnect();
      }
    }
  }
}