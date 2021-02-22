import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

const REL_PADDING = 50;

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

      this.setEnvelope(volume, dur, env, start);
      osc.start(start);
      osc.stop(start+dur+this.release+REL_PADDING);

      osc.onended = ()=>{
        env.disconnect();
      }
    }
  }
  

  /**
   * set envelope segements
   * 
   * @param {float} volume - max volume
   * @param {GainNode} dur - sound duration in seconds
   * @param {GainNode} gain - gain object
   * @param {float} start - start time
   */
  setEnvelope(volume, dur, gain, start){
    let time = start;

    gain.gain.setValueAtTime(0.0, start);

    // attack
    time += this.attack;
    gain.gain.linearRampToValueAtTime(volume, time);

    // decay
    time += this.decay;
    gain.gain.linearRampToValueAtTime(this.sustain, time);

    // sustain
    time += dur;
    gain.gain.linearRampToValueAtTime(this.sustain, time);

    // release
    time += this.release;
    gain.gain.linearRampToValueAtTime(0, time);
  }

}