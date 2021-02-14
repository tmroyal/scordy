import Synth from "./Synth";

export default class SynthEngine {
  constructor(){
    console.warn("SynthEngine contains only static methods");
  }

  /**
   * initialize audio engine
   */
  static init(){
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  /**
   * create a synth
   */
  static createSynth(){
    return new Synth(this);
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
