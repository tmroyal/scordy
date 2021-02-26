import Scale from "../src/MusicalFunctions/Scale.mjs"
var expect = require('chai').expect;

describe("Major Scale", ()=>{
  it("should produce major scale at middle c by default", ()=>{
    var scale = [60, 62, 64, 65, 67, 69, 71, 72];

    for (let i = 0; i < scale.length; i++){
      expect(Scale.majorFromDegree(i)).to.equal(scale[i]);
    }
  });

  it("should produce scale an octave lower given correct argument", ()=>{
    var scale = [48, 50, 52, 53, 55, 57, 59, 60];

    for (let i = 0; i < scale.length; i++){
      expect(Scale.majorFromDegree(i, 48)).to.equal(scale[i]);
    }

  });

  it("should produce scale a fifth above given correct argumet", ()=>{
    var scale = [60, 62, 64, 65, 67, 69, 71, 72];
    var root = 67;
    
    for (let i = 0; i < scale.length; i++){
      expect(Scale.majorFromDegree(i, root)).to.equal(scale[i]+7);
    }
  });

  it("should produce a scale an octave lower with negative degrees", ()=>{
    var scale = [48, 50, 52, 53, 55, 57, 59, 60];

    for (let i = 0; i < scale.length; i++){
      expect(Scale.majorFromDegree(i-7)).to.equal(scale[i]);
    }
  });

  it("should produce a scale an octave higher with +7 degrees", ()=>{
    var scale = [60, 62, 64, 65, 67, 69, 71, 72];

    for (let i = 0; i < scale.length; i++){
      expect(Scale.majorFromDegree(i+7, 48)).to.equal(scale[i]);
    }
  });

});

describe('Minor scale', ()=>{
  it('should produce a minor scale', ()=>{
    var scale = [60, 62, 63, 65, 67, 68, 70, 72];
    for (let i = 0; i < scale.length; i++){
      expect(Scale.minorFromDegree(i)).to.equal(scale[i]);
    }
  })
});

describe('Custom from degree', ()=>{
  it('should cycle through custom scale with length 6', ()=>{
    var wt = [0,2,4,6,8,10];
    var scale = [];

    for (let oct = -1; oct < 1; oct++){
      for (let deg = 0; deg < wt.length; deg++){
        scale.push(wt[deg]+60+oct*12); 
      }
    }

    for (let i = 0; i < scale.length; i++){
      expect(Scale.customFromDegree(wt, i-6, 60)).to.equal(scale[i]);
    }
  });
});