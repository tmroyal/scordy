import shanty from "./Demos/scordySeaShanty.xml";
import bossa from "./Demos/bossaMachine.xml";
import drumbeat from "./Demos/drumbeat.xml";
import liccPhase from "./Demos/liccPhase.xml";
import waves from "./Demos/waves.xml";
import rhythmicon from "./Demos/Rhythmicon.xml";

const demoData = {
  "Scordy Sea Shanty": {
    description: "The official Scordy theme song. Demonstrates a complex texture.",
    data: shanty
  },
  "Bossa Machine": {
    description: "A Bossa accompinment showing methods for creating rhythmic patterns.",
    data: bossa
  },
  "Drum Beat":{
    description: "A simple drum beat.",
    data: drumbeat
  },
  "Licc Phase":{
    description: "A phasing piece demonstrating capability for fine rhythmic adjustments",
    data: liccPhase
  },
  "Waves": {
    description: "Shows the use of functions and current_time for creating novel textures.",
    data: waves
  },
  "Rhythmicon": {
    description: "Rhythms based on the harmonic series, in Homage to Cowell and Theremin.",
    data: rhythmicon
  }
};

export default class Demos {
  constructor(){
    const demoElement = document.getElementById("demoList");

    const template = document.getElementById("demoTemplate");

    for (const [key, value] of Object.entries(demoData)){
      let demoListing = template.cloneNode(true);
      demoListing.id = "";
      demoListing.getElementsByTagName("h3")[0].innerText = key;
      demoListing.getElementsByTagName("p")[0].innerText = value.description;
      demoElement.appendChild(demoListing);

      demoListing.getElementsByTagName("a")[0].onclick = ()=>{
        this.loadDemo(key);
      };
    }
  }

  loadDemo(name){
    console.log(name);
  }

}