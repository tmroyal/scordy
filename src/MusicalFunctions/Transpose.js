
export default class Transpose{
  static toOctave(nOctaves, input){
    const numSemis = (nOctaves+1) * 12;
    if (Array.isArray(input)){
      return input.map((v)=>{ return v + numSemis; });
    } else {
      return input + numSemis;
    }
  }
}