import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

export default class FMSynth extends Synth {
  constructor(engine, ind){
    super(engine);

    // not a true fm modulation index
    this.ind = ind;
    this.attack = 0.01;
  }

  static supported(engine){
    return 'audioWorklet' in engine.audioContext;
  }

  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note.forEach((theNote)=>{
        this.play(theNote, volume, dur, start);
      })
    } else {
      var freq = SynthUtil.midicps(note);

    }
  }
}