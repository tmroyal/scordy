import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"
import Blockly, { Block } from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.mjs"

// run this on load
document.addEventListener("DOMContentLoaded", function(){
  window.onbeforeunload = function() {
    return true;
  };



  // setup Blockly
  const workspace = Blockly.inject('blockly',
    {toolbox: document.getElementById('toolbox')}); 

  workspace.setTheme(Blockly.Themes.Dark);

  workspace.addChangeListener(()=>{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').innerText = code;
  });

  ConfigBlocklyBlocks(workspace, Blockly);

  // setup scheduler
  const scheduler = new Scheduler(SynthEngine);
  
  // Setup synth engine
  SynthEngine.init();
  SynthEngine.setVolume(0.6);

  /**
   * Setup events for start and stop button
   */
  function startAudio(){

    scheduler.setTempo(120);
    scheduler.start();

    try{
      eval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
      alert("There was an error: " + e.message);
    }
  }

  function stopAudio(){
    scheduler.stop();
  }

  document.getElementById("startAudio").addEventListener("click", startAudio);
  document.getElementById("stopAudio").addEventListener("click", stopAudio);

});