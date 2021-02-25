import Synth from "./Synth.mjs";
import SynthUtil from "./SynthUtil.mjs"

const NOISEBUFFERSIZE = 1024;

export default class Cowbell extends Synth {
  constructor(engine){
    super(engine);
    this.setupFilters();
    this.setupNoise();
    this.attack = 0.01;
    this.decay = 0.1;
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
    // this is a result analysis created in python
    const parts = [
      [795.5973248966956, 0.003849459495720562, 0.10760855611045789],
      [1533.3631186204354, 0.0026903091891704346, 0.03152037062609473],
      [2481.248558910146, 0.0027442101478066506, 0.01452503724530184],
      [4139.953189622314, 0.001706555786525331, 0.013933783279589327],
      [710.3259344336542, 0.012517094401585226, 0.014141037849929584],
      [1871.3885878741733, 0.0040182345263522655, 0.005522743005730342],
      [3767.483800923808, 0.00514047177586228, 0.006279779560983245],
      [4723.863898572316, 0.0020412488875831514, 0.0064577319509059716]
    ];

    this.filtersOutput = this.engine.audioContext.createGain();
    this.filtersInput = this.engine.audioContext.createGain();

    parts.forEach( (params) => {
      const bpf = this.engine.audioContext.createBiquadFilter();
      bpf.frequency.value = params[0];
      bpf.type = "bandpass";
      bpf.Q.value = 1/(params[1]);
      bpf.gain.value = params[2];

      this.filtersInput.connect(bpf).connect(this.filtersOutput);
    });

    this.filtersOutput.connect(this.engine.gainNode);
    this.filtersOutput.gain.value = 10.0;
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

    let filt = this.engine.audioContext.createBiquadFilter();
    filt.frequency.value = volume*10000 + 4000;
    filt.type = "lowpass";


    snd.connect(filt).connect(env).connect(this.filtersInput);
    snd.start(start);
    snd.stop(start+this.attack+this.decay+1.0);
    this.setEnvelope(0, volume, this.attack+this.decay, env.gain, start);

    snd.onended = ()=>{
      env.disconnect();
    };
  }
}