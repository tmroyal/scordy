import NumberGenerators from '../src/NumberGenerators/NumberGenerators.mjs'
var expect = require('chai').expect;

describe('Number Generators', ()=>{
  describe('randint', ()=>{
    it('should generate numbers between hi and low', ()=>{
      const low = -3;
      const high = 4;
      let matches = true;
      let testValue;
      for (let i = 0; i < 50; i++){
        testValue = NumberGenerators.randint(-3,4);
        matches = (testValue < high) && (testValue >= low);
        if (!matches){
          break;
        }
      }
      expect(matches).to.be.true;
    });

  })

})