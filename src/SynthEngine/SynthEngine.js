import SineSynth from "./Synths/SineSynth.js"
import { Saw, Tri, Square, Bass1 } from "./Synths/FilteredSynths.js"
import Organ from "./Synths/Organ.js"
import Cowbell from "./Synths/Cowbell.js"
import Hihat from "./Synths/Hihat.js"
import Snare from "./Synths/Snare.js"
import Kick from "./Synths/Kick.js"

export default class SynthEngine {
  constructor(){
    console.warn("SynthEngine is not meant to be instansiated");
  }

  /**
   * 
   * 
   */
  static setupSynths(){
    this.synths = {};

    this.synths['SINE'] = new SineSynth(this);
    this.synths['SAW'] = new Saw(this);
    this.synths['TRI'] = new Tri(this);
    this.synths['SQUARE'] = new Square(this);
    this.synths['BASS1'] = new Bass1(this);

    this.synths['ORGAN'] = new Organ(this);

    this.synths['COWBELL'] = new Cowbell(this);
    this.synths['HIHAT'] = new Hihat(this);
    this.synths['SNARE'] = new Snare(this);
    this.synths['KICK'] = new Kick(this);
  }

  static setVisualizer(visualizer){
    this.visualizer = visualizer;
  }

  /**
   * initialize audio engine
   */
  static init(visualizer){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.limiter = this.audioContext.createDynamicsCompressor();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.limiter).connect(this.audioContext.destination);

    // limiter settings
    this.limiter.threshold.value = -6;
    this.limiter.knee.value = 3;
    this.limiter.ratio.value = 20;

    this.initializeSynths();

  }

  static initializeSynths(){
    for (const [key, synth] of Object.entries(this.synths)) {
      synth.init();
    }
  }

  static closeSynths(){
    for (const [key, synth] of Object.entries(this.synths)) {
      synth.close();
    }
  }

  static stop(){
    setTimeout(()=>{
      this.audioContext.close();
      this.closeSynths();
    }, 2000);
  }

  /**
   * Play synth with given name according to paramters given
   *  
   * @param {String} name - name of synth
   * @param {int} note - midi note number
   * @param {float} volume - volume (0-1)
   * @param {float} duration - duration in seconds
   * @param {float} start - start time, determined by the scheduler
   *    using the audioContext from WebAudio API
   */
  static playSynth(name, note, volume, duration, start){
    this.synths[name].play(note, volume, duration, start);

    this.visualizer.spawn(name.toLowerCase(), {
      note: note,
      volume: volume, 
      duration: duration,
      start: start
    });
  }

  /**
   * set volume of synthesis engine
   * 
   * @param {float} volume 0-1
   */
  static setVolume(volume){
    this.gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.05);
  }
};
