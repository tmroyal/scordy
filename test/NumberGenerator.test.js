import NumberGenerators from '../src/NumberGenerators/NumberGenerators.mjs'
var expect = require('chai').expect;

describe('Number Generators', ()=>{
  const min = -3;
  const max = 4;

  describe('randint', ()=>{
    it('should generate numbers from min to max', ()=>{
      let matches = true;
      let testValue;
      for (let i = 0; i < 50; i++){
        testValue = NumberGenerators.randint(-3,4);
        matches = (testValue <= max) && (testValue >= min);
        if (!matches){
          break;
        }
      }
      expect(matches).to.be.true;
    });

    // this test may not pass, being stochastic
    it('should eventually generate min', ()=>{
      let eq = false;
      for (var i = 0; i < 50; i++){
        if (NumberGenerators.randint(min, max) === min){
          eq = true;
          break;
        }
      }
      expect(eq).to.be.true;
    });

    it('should eventually generate max', ()=>{
      let eq = false;

      for (var i = 0; i < 50; i++){
        if (NumberGenerators.randint(min, max) === max){
          eq = true;
          break;
        }
      }

      expect(eq).to.be.true;
    });

  })

})