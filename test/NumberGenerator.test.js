import NumberGenerators from '../src/NumberGenerators/NumberGenerators.js'
var expect = require('chai').expect;

/**
 * These tests are for scordare's number generators.
 * Some of them may fail randomly because they are based off of 
 * random number generators. Randomness is hard to test.
 */

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
  }); // describe("randint");

  describe('choose', ()=>{
    it('should eventually choose all elements from list', ()=>{
      let theList = [0, 1, 2, 3, 4];
      let chosenValues = new Set();

      for (var i = 0; i < 100; i++){
        chosenValues.add(NumberGenerators.choose(theList));
        if (chosenValues.size == theList.length){ break; }
      }
      expect(Array.from(chosenValues)).to.have.same.members(theList);

    });
  });

  describe('wrap', ()=>{
    it('should equal top of range', ()=>{
      var result = NumberGenerators.wrap(3, -2, 4);
      expect(result).to.equal(3);
    });

    it('should wrap to bottom if at top of range', ()=>{
      var result = NumberGenerators.wrap(4, -2, 4);
      expect(result).to.equal(-2);
    });

    it('should wrap to bottom+1 if one above range', ()=>{
      var result = NumberGenerators.wrap(5, -2, 4);
      expect(result).to.equal(-1);
    });

    it('should wrap to bottom if over range twice', ()=>{
      var result = NumberGenerators.wrap(10, -2, 4);
      expect(result).to.equal(-2);
    })

    it('should equal bottom when at bottom of the range', ()=>{
      var result = NumberGenerators.wrap(-2, -2, 4);
      expect(result).to.equal(-2);
    });

    it('should equal top of range when one below bottom of range', ()=>{
      var result = NumberGenerators.wrap(-3, -2, 4);
      expect(result).to.equal(3);
    });

    it('should equal one below top of range when two below bottom of range', ()=>{
      var result = NumberGenerators.wrap(-4, -2, 4);
      expect(result).to.equal(2);
    });

    it('should equal top of range when twice below the bottom of range', ()=>{
      var result = NumberGenerators.wrap(-9, -2, 4);
      expect(result).to.equal(3);
    })

  });

  describe('step', ()=>{
    const EPSILON = 0.01;
    const step = 2.0;
    const input = 1;

    it('should probably output only numbers between walk-step and walk+step',()=>{
      let within = true;
      for (var i = 0; i < 50; i++){
        let value = NumberGenerators.walk(input, step);
        if (!((value <= input+step) && (value >= input - step))){
          within = false;
          break;
        }
      }
      expect(within).to.be.true;
    });

    it('should eventualy output the same number', ()=>{
      let same = false;
      
      for (var i = 0; i < 50; i++){
        let value = NumberGenerators.walk(input, step);
        if (value === input){
          same = true;
          break;
        }
      }
      expect(same).to.be.true;
    });

    it('should eventually ouput the max step', ()=>{
      let maxed = false;

      for (var i = 0; i < 50; i++){
        let value = NumberGenerators.walk(input, step);
        if (value === input + step){
          maxed = true;
          break;
        }
      }

      expect(maxed).to.be.true;
    });

    it('should eventually ouput the min step', ()=>{
      let minned = false;

      for (var i = 0; i < 50; i++){
        let value = NumberGenerators.walk(input, step);
        if (value === input - step){
          minned = true;
          break;
        }
      }

      expect(minned).to.be.true;

    });

  });
});