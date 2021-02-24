import SineSynth from "./Synths/SineSynth.mjs"
import { Saw, Tri, Square, Bass1 } from "./Synths/FilteredSynths.mjs"
import FMSynth from "./Synths/FMSynths.mjs"
import Organ from "./Synths/Organ.mjs"

export default class SynthEngine {
  constructor(){
    console.warn("SynthEngine is not meant to be instansiated");
  }

  /**
   * initialize audio engine
   */
  static init(){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.synths = {};

    this.synths['SINE'] = new SineSynth(this);
    this.synths['SAW'] = new Saw(this);
    this.synths['TRI'] = new Tri(this);
    this.synths['SQUARE'] = new Square(this);
    this.synths['BASS1'] = new Bass1(this);

    this.synths['FM1'] = new FMSynth(this, 4.0);
    this.synths['FM2'] = new FMSynth(this, 12.0);

    this.synths['ORGAN'] = new Organ(this);
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
