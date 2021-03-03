import Synth from "./Synth.mjs";

const NOISEBUFFERSIZE = 8000;

export default class Snare extends Synth {
  constructor(engine){
    super(engine);
    this.setupNoise();
    this.attack = 0.01;
  }

  setupNoise(){
    this.noiseBuffer = this.engine.audioContext.createBuffer(
            1, NOISEBUFFERSIZE, this.engine.audioContext.sampleRate);
 
    var bufferData = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < NOISEBUFFERSIZE; i++){
      bufferData[i] = Math.random() * 2.0 - 1.0;
    }
  }

  /**
   * Play one note from this synth. Ignored params left to be compatible with api
   * 
   * @param {int} note  midi note. If array is passed in, only first note is used.
   *            pitch is indefinite
   * @param {float} volume 0-1
   * @param {float} dur duration in seconds, ignored
   * @param {float} start start time
   */
  play(note, volume, dur, start){
    if (Array.isArray(note)){
      note = note[0];
    }  
    let pitchHeight = note/128.0;

    let noise = this.engine.audioContext.createBufferSource();
    noise.buffer = this.noiseBuffer;
    let noiseEnv = this.engine.audioContext.createGain();
    this.setEnvelope(0, 0.3*volume, 0.16*dur, noiseEnv.gain, start);

    let osc = this.engine.audioContext.createOscillator();
    let oscEnv = this.engine.audioContext.createGain();
    this.setEnvelope(0, volume*0.5, 0.05*dur, oscEnv.gain, start);

    let filt = this.engine.audioContext.createBiquadFilter();
    filt.type = "bandpass";
    filt.frequency.value = 500;
    filt.Q.value = 0.5;

    osc.frequency.setValueAtTime(250, start);
    osc.frequency.linearRampToValueAtTime(60,start+0.05*dur);

    osc.connect(oscEnv).connect(this.engine.gainNode);
    noise.connect(noiseEnv).connect(this.engine.gainNode);

    osc.start(start);
    noise.start(start);

    noise.onended = ()=>{
      noiseEnv.disconnect();
      filt.disconnect();
      oscEnv.disconnect();
    };
  }


}