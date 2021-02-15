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
    const notes = [60, 62, 64, 65, 67, 68];
    const curNote = notes[Math.floor(beat) % notes.length];
    synth.play(curNote,0.5,0.1,time);
    return 1/3.0;
  };

  scheduler.schedule(cb, 0);
}

document.getElementById("startAudio").addEventListener("click", startAudio);