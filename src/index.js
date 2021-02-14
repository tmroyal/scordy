import SynthEngine from "./SynthEngine/SynthEngine"

function startAudio(){
  SynthEngine.init();
  SynthEngine.setVolume(0.1);

  const synth = SynthEngine.createSynth();
  synth.setADSR(0.5, 0.1, 0.0, 0.0);
  synth.play(60,0.5,1,0.0);
  synth.play(64,0.5,1,1);
}


document.getElementById("startAudio").addEventListener("click", startAudio);