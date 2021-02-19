
export default class Synth {
  /**
   * Creates a new Synth
   * @param {SynthEngine} engine 
   */
  constructor(engine){
    this.engine = engine;
    this.setADSR(0.01, 0.1, 0.1, 0.1);
  }

  /**
   * set Attack, sustain, and release settings for the envelope
   * 
   * @param {float} attack time
   * @param {float} decay time 0-1
   * @param {float} sustain level 0-1
   * @param {float} release time
   */
  setADSR(attack, decay, sustain, release){
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
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
};