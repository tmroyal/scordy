import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"
import Blockly, { Block } from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.mjs"
import setupWindowScope from "./setupWindowScope"
import Visualizer from "./Visualizer/Visualizer.mjs"

// run this on load
document.addEventListener("DOMContentLoaded", function(){

  const visualizer = new Visualizer();

  // setup Blockly
  const workspace = Blockly.inject('blockly',
    {toolbox: document.getElementById('toolbox')}); 

  // setup scheduler
  const scheduler = new Scheduler(SynthEngine);
  
  // Setup synth engine
  SynthEngine.init(visualizer);
  SynthEngine.setVolume(0.6);
  visualizer.setAudioContext(SynthEngine.audioContext);

  ConfigBlocklyBlocks(workspace, Blockly, SynthEngine);

  workspace.setTheme(Blockly.Themes.Dark);

  // get previously stored script, if it exists
  (()=>{
    var xml_text = window.localStorage.getItem('currentScript');
    if (xml_text){
      var xml = Blockly.Xml.textToDom(xml_text);
      Blockly.Xml.domToWorkspace(xml, workspace);
    } else {
      // add tempo block
      var configBlock = '<xml><block type="scor_tempo" deletable="false" movable="false"></block></xml>';
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(configBlock), workspace);
    }
  })();

  workspace.addChangeListener(()=>{
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    window.localStorage.setItem('currentScript', xml_text);
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').innerText = code;

  });

  setupWindowScope(SynthEngine, scheduler);

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