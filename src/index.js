import SynthEngine from "./SynthEngine/SynthEngine.js"
import Scheduler from "./SequencerEngine/Scheduler.js"
import Blockly, { Block } from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.js"
import setupWindowScope from "./setupWindowScope"
import Visualizer from "./Visualizer/Visualizer.js"
import PersistenceEngine from "./PersistenceEngine.js"

// run this on load
document.addEventListener("DOMContentLoaded", function(){
  'use strict';

  const visualizer = new Visualizer();

  // setup scheduler
  const scheduler = new Scheduler(SynthEngine);
  
  // Setup synth engine
  SynthEngine.init(visualizer);
  SynthEngine.setVolume(0.6);
  visualizer.setAudioContext(SynthEngine.audioContext);

  // setup Blockly
  const workspace = Blockly.inject('blockly',
    {
      toolbox: document.getElementById('toolbox'),
      oneBasedIndex: false
    }); 
  ConfigBlocklyBlocks(workspace, Blockly, SynthEngine);
  workspace.setTheme(Blockly.Themes.Dark);

  // setup persistence engine
  const pstEngine = new PersistenceEngine(Blockly, workspace);

  workspace.addChangeListener(()=>{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('codeBlock').innerText = code;
    pstEngine.setChanged();
  });

  // attach events so eval works
  setupWindowScope(SynthEngine, scheduler);

  /**
   * Setup events for buttons
   */
  pstEngine.attach("newScore", "openScore", "saveScore", "fileInput");

  const modalCode = document.getElementById("modalCode");

  const startButton = document.getElementById("startAudio");
  const stopButton = document.getElementById("stopAudio");
  const codeButton = document.getElementById("showCode");

  function startAudio(){

    startButton.disabled = true;
    stopButton.disabled = false;
    scheduler.start();

    try{
      eval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
      alert("There was an error: " + e.message);
    }
  }

  function stopAudio(){
    scheduler.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
  }

  startButton.addEventListener("click", startAudio);

  stopButton.addEventListener("click", stopAudio);
  stopButton.disabled = true;

  function hideModal(){
    modalCode.classList.add('hidden');
  }

  function showModal(){
    modalCode.classList.remove('hidden');
  }

  modalCode.onclick = hideModal;
  codeButton.onclick = showModal;

});