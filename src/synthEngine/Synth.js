import SynthUtil from './SynthUtil';

const REL_PADDING = 50;

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
   * Play one note from this synth
   * 
   * @param {int} note as midi note
   * @param {float} volume 0-1
   * @param {float} dur duration in seconds
   */
  play(note, volume, dur){
    const osc = this.engine.audioContext.createOscillator();
    const env = this.engine.audioContext.createGain();

    osc.connect(env).connect(this.engine.gainNode);
    osc.type = 'sine';
    osc.frequency.value = SynthUtil.midicps(note);

    env.gain.value = 0.0;

    osc.start();

    this.setEnvelope(volume, dur, env);

    setTimeout(()=>{
      osc.stop();
    }, dur*1000.0 + this.release*1000.0 + REL_PADDING);
  }

  /**
   * set envelope segements
   * 
   * @param {float} volume - max volume
   * @param {GainNode} dur - sound duration in seconds
   * @param {GainNode} gain - gain object
   */
  setEnvelope(volume, dur, gain){
    let time = this.engine.audioContext.currentTime;

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