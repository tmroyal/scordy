import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"
import Blockly from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.mjs"
import Synth from "./SynthEngine/Synth.mjs";

document.addEventListener("DOMContentLoaded", function(){
  ConfigBlocklyBlocks(Blockly);

  const workspace = Blockly.inject('blockly',
    {toolbox: document.getElementById('toolbox')}); 

  workspace.addChangeListener(()=>{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').innerText = code;
  });

  const scheduler = new Scheduler(SynthEngine);
  window.scheduler = scheduler;
  window.SynthEngine = SynthEngine;

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
  document.getElementById("startAudio").addEventListener("click", startAudio);


});