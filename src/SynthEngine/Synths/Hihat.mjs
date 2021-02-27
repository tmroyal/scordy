import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

const NOISEBUFFERSIZE = 4410;

export default class Hihat extends Synth {
  constructor(engine){
    super(engine);
    this.setupFilters();
    this.setupNoise();
    this.attack = 0.01;
    this.decay = 0.09;
  }

  setupNoise(){
    this.noiseBuffer = this.engine.audioContext.createBuffer(
            1, NOISEBUFFERSIZE, this.engine.audioContext.sampleRate);
 
    var bufferData = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < NOISEBUFFERSIZE; i++){
      bufferData[i] = Math.random() * 2.0 - 1.0;
    }
  }

  setupFilters(){
    const parts = [
      [200, 0.1, 0.1],
      [3000, 0.3, 1.0],
      [10000, 0.7, 1.0],
    ];

    this.filtersOutput = this.engine.audioContext.createGain();
    this.filtersInput = this.engine.audioContext.createGain();

    this.allpass = this.engine.audioContext.createBiquadFilter();
    this.allpass.type = "allpass";
    this.allpass.frequency.value = 10000;
    this.allpass.Q.value = 0.5;

    parts.forEach( (params) => {
      const bpf = this.engine.audioContext.createBiquadFilter();
      bpf.frequency.value = params[0];
      bpf.type = "bandpass";
      bpf.Q.value = 1/(params[1]); // sound design was in supercollider, so here we convert from RQ

      this.filtersInput.connect(bpf).connect(this.allpass);
    });

    this.allpass.connect(this.filtersOutput).connect(this.engine.gainNode);
  }

  /**
   * Play one note from this synth. Ignored params left to be compatible with api
   * 
   * @param {int|Array} note as midi note, ignored
   * @param {float} volume 0-1
   * @param {float} dur duration in seconds, ignored
   * @param {float} start start time
   */
  play(note, volume, dur, start){
    let snd = this.engine.audioContext.createBufferSource();
    snd.buffer = this.noiseBuffer;
    let env = this.engine.audioContext.createGain();

    snd.connect(env).connect(this.filtersInput);
    snd.start(start);
    snd.stop(start+this.attack+this.decay+1.0);
    this.setEnvelope(0, volume, this.attack+this.decay, env.gain, start);

    snd.onended = ()=>{
      env.disconnect();
    };
  }


}