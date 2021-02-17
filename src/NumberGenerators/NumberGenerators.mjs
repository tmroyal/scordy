export class NumberGenerators {

  static choose(arr){
    return arr[this.randint(0, arr.length)];
  }

  static wrap(input, low, high){
    const range = high - low;
    return (input - low) % range + low
  }

  static walk(input, step){
    const this_step = Math.round(Math.random()*step*2-step);
    return input+this_step;
  }
}
