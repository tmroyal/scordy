export default class SynthUtil {
  /**
   * Convert midi number to cycles per second 
   * 
   * @param {int} midi - midi note number
   */
  static midicps(midi){
    return 440*Math.pow(2, (midi-69)/12);
  }
};