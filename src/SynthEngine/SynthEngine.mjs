import Synth from "./Synth.mjs";

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

    this.synths['SINE'] = new Synth(this);
  }

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
