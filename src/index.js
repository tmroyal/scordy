import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"
import Blockly from 'blockly';
import ConfigBlocklyBlocks from "./BlocklyConfig/ConfigBlockly.mjs"

document.addEventListener("DOMContentLoaded", function(){
  ConfigBlocklyBlocks(Blockly);

  const workspace = Blockly.inject('blockly',
    {toolbox: document.getElementById('toolbox')}); 

  workspace.addChangeListener(()=>{
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').innerText = code;
  });
 

});
/*
function startAudio(){
  const scheduler = new Scheduler(SynthEngine);

  SynthEngine.init();
  SynthEngine.setVolume(0.1);

  scheduler.setTempo(120);
  scheduler.start();

  const synth = SynthEngine.createSynth();
  synth.setADSR(0.01, 0.1, 0.0, 0.0);

  const cb = (beat, time)=>{
    const notes = [60, 62, 64, 65, 67, 68];
    const curNote = notes[Math.floor(beat) % notes.length];
    synth.play(curNote,0.5,0.1,time);
    return 1/3.0;
  };

  scheduler.schedule(cb, 0);
}

document.getElementById("startAudio").addEventListener("click", startAudio);
*/