import shanty from "./Demos/scordySeaShanty.xml";
import bossa from "./Demos/bossaMachine.xml";
import drumbeat from "./Demos/drumbeat.xml";
import liccPhase from "./Demos/liccPhase.xml";
import waves from "./Demos/waves.xml";
import rhythmicon from "./Demos/Rhythmicon.xml";

const demoData = {
  "Scordy Sea Shanty": {
    description: "The official Scordy theme song. Demonstrates how to make complex textures.",
    data: shanty
  },
  "Bossa Machine": {
    description: "For Tom, a Bossa accompinment demonstrating methods for creating rhythm patterns.",
    data: bossa
  },
  "Drum Beat":{
    description: "A simple drum beat. Demonstrates how to create rhythms.",
    data: drumbeat
  },
  "Licc Phase":{
    description: "This demonstrates the ability to create fine rhythmic adjustments",
    data: liccPhase
  },
  "Waves": {
    description: "Using functions and current_time to create interesting textures.",
    data: waves
  },
  "Rhythmicon": {
    description: "Rhythms based on the harmonic series, in Homage to Cowell and Theremin.",
    data: rhythmicon
  }
};

export default class Demos {
  constructor(){

  }
}