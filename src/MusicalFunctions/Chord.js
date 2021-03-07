export default class Chord {
  /**
   * Returns the given chord transposed by baseNote 
   * 
   * @param {Array} chord 
   * @param {int} baseNote 
   */
  static transposed(chord, baseNote){
    return chord.map(member=>{
      return member + baseNote;
    });
  }

  /**
   * Returns major chord whose root is baseNote
   *  
   * @param {int} baseNote 
   */
  static major(baseNote){
    return this.transposed([0,4,7], baseNote);
  }

  /**
   * Returns minor chord whose root is baseNote
   * 
   * @param {int} baseNote 
   */
  static minor(baseNote){
    return this.transposed([0,3,7], baseNote);
  }

  /**
   * Returns major 7th chord whose root is baseNote
   * 
   * @param {int} baseNote 
   */
  static maj7(baseNote){
    return this.transposed([0,4,7,11], baseNote);
  }

  /**
   * Returns minor 7th chord whose root is baseNote
   * 
   * @param {int} baseNote 
   */
  static min7(baseNote){
    return this.transposed([0,3,7,10], baseNote);

  }

  /**
   * Returns minor 7th flat 5 (half diminished) chord whose root is baseNote
   * 
   * @param {int} baseNote 
   */
  static min7b5(baseNote){
    return this.transposed([0,3,6,10], baseNote);
  }

  /**
   * Returns augmented chord whose root is baseNote
   * 
   * @param {int} baseNote 
   */
  static augmented(baseNote){
    return this.transposed([0,4,8], baseNote);
  }
}