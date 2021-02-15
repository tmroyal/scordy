const majorScale = [0, 2, 4, 5, 7, 9, 11];
const minorScale = [0, 2, 3, 5, 7, 8, 10];

export default class Scale {
  static validate(number){
    return !isNaN(number);
  }

  /**
   * Convert scale degree to major scale note
   * 
   * @param {int} degree 
   * @param {int} baseNote  default 0 for C
   * @param {int} baseOctave default 4 for middle
   */
  static majorFromDegree(degree, baseNote, baseOctave){
    baseNote = this.validate(baseNote) ? baseNote : 0;
    baseOctave = this.validate(baseOctave) ? baseOctave : 4;

    baseNote %= 12;
    const scaleData = this.getScaleMember(degree, majorScale, baseOctave);

    return scaleData.note + baseNote + scaleData.octaveOffset;
  }

  /**
   * Convert scale degree to minor scale note
   * 
   * @param degree 
   * @param baseNote 
   * @param baseOctave 
   */
  static minorFromDegree(degree, baseNote, baseOctave){
    baseNote = this.validate(baseNote) ? baseNote : 0;
    baseOctave = this.validate(baseOctave) ? baseOctave : 4;

    baseNote %= 12;

    const scaleData = this.getScaleMember(degree, minorScale, baseOctave);

    return scaleData.note + baseNote + scaleData.octaveOffset;
  }

  static getScaleMember(degree, scale, baseOctave){
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