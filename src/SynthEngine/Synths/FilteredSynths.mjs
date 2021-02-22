import Synth from "./Synth.mjs"
import SynthUtil from "./SynthUtil.mjs"

export class Saw extends Synth {
  constructor(engine){
    super(engine);
    this.attack = 0.1;
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
      this.setEnvelope(freq*2, freq*10, dur, filt.frequency, start);

      osc.type = 'sawtooth';
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

  /**
   * Simple Attack Decay Envelope
   * 
   * @param base - base value
   * @param peak - peak value
   * @param dur - duration
   * @param value - the value to modulate
   * @param start - start time
   */
  setEnvelope(base, peak, dur, value, start){
    let time = start;
    
    value.setValueAtTime(base, time);

    time += this.attack;
    value.linearRampToValueAtTime(peak, time);

    time += dur-this.attack;
    value.linearRampToValueAtTime(base, time);
  }

}