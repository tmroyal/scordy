const majorScale = [0, 2, 4, 5, 7, 9, 11];
const minorScale = [0, 2, 3, 5, 7, 8, 10];

export default class Scale {
  /**
   * Determines if input is a number 
   * @param number 
   */
  static validate(number){
    return !isNaN(number);
  }

  /**
   * Convert scale degree to major scale note
   * 
   * @param {int} degree 
   * @param {int} baseNote  default 60 for C4
   */
  static majorFromDegree(degree, baseNote){
    baseNote = this.validate(baseNote) ? baseNote : 60;

    const scaleData = this.getScaleMember(degree, majorScale, baseNote);

    return scaleData.note + baseNote + scaleData.octaveOffset;
  }

  /**
   * Convert scale degree to minor scale note
   * 
   * @param degree 
   * @param baseNote 
   */
  static minorFromDegree(degree, baseNote){
    baseNote = this.validate(baseNote) ? baseNote : 60;;

    const scaleData = this.getScaleMember(degree, minorScale, baseNote);

    return scaleData.note + baseNote + scaleData.octaveOffset;
  }

  /**
   * Get note and octave of passed in scale, degree, and baseNote
   * @param scale 
   * @param degree 
   * @param baseNote 
   */
  static getScaleMember(scale, degree, baseNote){
    let baseOctave = 0;

    while (degree < 0){
      degree += scale.length;
      baseOctave += 1;
    }

    while (degree >= scale.length){
      degree -= scale.length;
      baseOctave -= 1;
    }

    return {
      note: scale[degree],
      octaveOffset: baseOctave * 12
    }
  }

}