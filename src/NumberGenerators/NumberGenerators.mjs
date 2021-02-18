export default class NumberGenerators {

  /**
   * Choose random element from arr
   * 
   * @param {Array} arr 
   */
  static choose(arr){
    return arr[this.randint(0, arr.length)];
  }

  /**
   * Wrap input into range low-high. If low is zero, 
   * this decays to the modulo case. 
   * 
   * @param {int} input 
   * @param {int} low 
   * @param {int} high 
   */
  static wrap(input, low, high){
    const range = high - low;
    return (input - low) % range + low
  }

  /**
   * Adds a random number from 0-step to input
   *  
   * @param {int} input 
   * @param {int} step 
   */
  static walk(input, step){
    const this_step = Math.round(Math.random()*step*2-step);
    return input+this_step;
  }
}
