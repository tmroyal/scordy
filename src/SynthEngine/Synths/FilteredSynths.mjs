import Synth from "./Synth.mjs"
import SynthUtil from "./SynthUtil.mjs"

class FilteredSynth extends Synth {
  constructor(engine){
    super(engine);
    this.attack = 0.1;
    this.osc = 'sine';
    this.freq_mult = 10;
  }

  /**
   * Play a note
   * @param {int} note midi note
   * @param volume 
   * @param dur 
   * @param start 
   */
  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note.forEach((theNote)=>{
        this.play(theNote, volume, dur, start);
      })
    } else {
      const osc = this.engine.audioContext.createOscillator();
      const ampenv = this.engine.audioContext.createGain();
      const filt = this.engine.audioContext.createBiquadFilter();
      const freq = SynthUtil.midicps(note);

      start = start || 0;

      // setup filter
      filt.type = 'lowpass';
      filt.Q.value = 1.0;
      this.setEnvelope(freq*2, freq*this.freq_mult, dur, filt.frequency, start);

      osc.type = this.osc;
      osc.frequency.value = freq;

      osc.connect(filt).connect(ampenv).connect(this.engine.gainNode);

      this.setEnvelope(0, volume, dur, ampenv.gain, start);

      osc.start(start);
      osc.stop(start+dur);

      osc.onended = ()=>{
        ampenv.disconnect();
        filt.disconnect();
      };
    }
  }
}

export class Saw extends FilteredSynth {
  constructor(engine){
    super(engine);
    this.osc = "sawtooth";
  }
}

export class Tri extends FilteredSynth {
  constructor(engine){
    super(engine);
    this.osc = "triangle";
  }
}

export class Square extends FilteredSynth {
  constructor(engine){
    super(engine);
    this.osc = "square";
  }
}

export class Bass1 extends FilteredSynth {
  constructor(engine){
    super(engine);
    this.osc = "sawtooth";
    this.freq_mult = 3;
    this.attack = 0.01;
  }

}