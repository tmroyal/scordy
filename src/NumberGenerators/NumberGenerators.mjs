export class NumberGenerators {

  static randint(lower, upper){
    return Math.floor(this.randrange(lower, upper));
  }

  static randrange(lower, upper){
    const range = upper - lower;
    return Math.random()*range+lower;
  }

  static choose(arr){
    return arr[this.randint(0, arr.length)];
  }

  static clip(input, low, high){
    if (input > high){
      return high;
    } else if (input < low){
      return low;
    } else {
      return input;
    }
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
