
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
};