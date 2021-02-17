export default class Chord {
  static transposed(chord, baseNote){
    return chord.map(member=>{
      return member + baseNote;
    });
  }

  static major(baseNote){
    return this.transposed([0,4,7], baseNote);
  }

  static minor(baseNote){
    return this.transposed([0,3,7], baseNote);
  }

  static maj7(baseNote){
    return this.transposed([0,4,7,11], baseNote);
  }

  static min7(baseNote){
    return this.transposed([0,3,7,10], baseNote);

  }

  static min7b5(baseNote){
    return this.transposed([0,3,6,10], baseNote);
  }

  static augmented(baseNote){
    return this.transposed([0,4,8], baseNote);
  }
}