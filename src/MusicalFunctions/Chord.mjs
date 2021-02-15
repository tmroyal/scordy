export default class Chord {
  static mapped(chord, baseNote, octave){
    return chord.map(member=>{
      return member + baseNote + octave*12;
    });
  }

  static major(baseNote, octave){
    return mapped([0,4,7], baseNote, octave);
  }

  static minor(baseNote, octave){
    return mapped([0,3,7], baseNote, octave);
  }

  static M7(baseNote, octave){
    return mapped([0,4,7,11], baseNote, octave);
  }

  static m7(baseNote, octave){
    return mapped([0,3,7,10], baseNote, octave);

  }

  static m7b5(baseNote, octave){
    return mapped([0,3,6,10], baseNote, octave);
  }

  static augmented(baseNote, octave){
    return mapped([0,4,8], baseNote, octave);
  }
}