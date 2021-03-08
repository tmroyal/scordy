import Synth from "./Synth.js";

const NOISEBUFFERSIZE = 5000;

export default class Kick extends Synth {
  constructor(engine){
    super(engine);
    this.attack = 0.01;
  }

  init(){
    this.setupNoise();
  }

  close(){
    this.noiseBuffer = null;
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
    let noise = this.engine.audioContext.createBufferSource();
    noise.buffer = this.noiseBuffer;
    let noiseEnv = this.engine.audioContext.createGain();
    this.setEnvelope(0, 0.2*volume, 0.11, noiseEnv.gain, start);

    let osc = this.engine.audioContext.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, start);
    osc.frequency.linearRampToValueAtTime(50,start+0.2);

    let filt = this.engine.audioContext.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 300;

    let oscEnv = this.engine.audioContext.createGain();
    this.setEnvelope(0, volume, this.attack+0.2, oscEnv.gain, start);

    osc.connect(oscEnv).connect(filt).connect(this.engine.gainNode);

    let clickOsc = this.engine.audioContext.createOscillator();
    clickOsc.frequency.setValueAtTime(900,start);
    clickOsc.frequency.linearRampToValueAtTime(100,start+0.04);

    let clickOscEnv = this.engine.audioContext.createGain();
    this.setEnvelope(0, volume*0.1, this.attack+0.04, clickOscEnv.gain, start);

    osc.start(start);
    osc.stop(start+this.attack+0.2);
    clickOsc.start(start);
    clickOsc.stop(start+this.attack+0.04);

    osc.onended = ()=>{
      oscEnv.disconnect();
      filt.disconnect();
      clickOscEnv.disconnect();
    };
  }


}