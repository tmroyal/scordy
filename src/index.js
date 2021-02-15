import SynthEngine from "./SynthEngine/SynthEngine.mjs"
import Scheduler from "./SequencerEngine/Scheduler.mjs"

function startAudio(){
  const scheduler = new Scheduler(SynthEngine);

  SynthEngine.init();
  SynthEngine.setVolume(0.1);

  scheduler.setTempo(120);
  scheduler.start();

  const synth = SynthEngine.createSynth();
  synth.setADSR(0.01, 0.1, 0.0, 0.0);

  const cb = (beat, time)=>{
    synth.play(60 + beat*2 % 12,0.5,1,time);
    console.log(beat, time);
    return 0.5;
  };

  scheduler.schedule(cb, 2);

}

document.getElementById("startAudio").addEventListener("click", startAudio);