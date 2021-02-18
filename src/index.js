import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"
import Blockly from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.mjs"
import Synth from "./SynthEngine/Synth.mjs";
import Chord from "./MusicalFunctions/Chord.mjs"
import Scale from "./MusicalFunctions/Scale.mjs"
import { NumberGenerators } from "./NumberGenerators/NumberGenerators.mjs";

document.addEventListener("DOMContentLoaded", function(){
  ConfigBlocklyBlocks(Blockly);

  const workspace = Blockly.inject('blockly',
    {toolbox: document.getElementById('toolbox')}); 

  workspace.addChangeListener(()=>{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').innerText = code;
  });

  // add tempo block
  var configBlock = '<xml><block type="scor_tempo" deletable="false" movable="false"></block></xml>';
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(configBlock), workspace);


  const scheduler = new Scheduler(SynthEngine);
  window.scheduler = scheduler;
  window.SynthEngine = SynthEngine;
  window.NumberGenerators = NumberGenerators;
  window.Chord = Chord;
  window.Scale = Scale;

  SynthEngine.init();
  SynthEngine.setVolume(0.6);

  function startAudio(){

    scheduler.setTempo(120);
    scheduler.start();

    try{
      eval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch {
      console.error("whoops");
    }
  }

  function stopAudio(){
    scheduler.stop();
  }

  document.getElementById("startAudio").addEventListener("click", startAudio);
  document.getElementById("stopAudio").addEventListener("click", stopAudio);


});