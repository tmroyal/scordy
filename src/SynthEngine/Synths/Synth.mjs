
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

  /**
   * set envelope segements
   * 
   * @param {float} volume - max volume
   * @param {GainNode} dur - sound duration in seconds
   * @param {GainNode} val -  object
   * @param {float} start - start time
   */
  setADSREnvelope(volume, dur, val, start){
    console.log(this.attack, this.decay, this.sustain, this.release);
    console.log(volume, dur, val, start);
    let time = start;

    val.setValueAtTime(0.0, start);

    // attack
    time += this.attack;
    val.linearRampToValueAtTime(volume, time);

    // decay
    time += this.decay;
    val.linearRampToValueAtTime(volume*this.sustain, time);

    // sustain
    time = start + dur;
    val.linearRampToValueAtTime(volume*this.sustain, time);

    // release
    time += this.release;
    val.linearRampToValueAtTime(0, time);
  }
};