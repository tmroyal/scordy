import Synth from "./SynthEngine/Synth.mjs";
import Chord from "./MusicalFunctions/Chord.mjs"
import Scale from "./MusicalFunctions/Scale.mjs"
import NumberGenerators from "./NumberGenerators/NumberGenerators.mjs";

/**
 * Adds libraries to window in order for 
 * blockly to be able to execute scordare's custom
 * functionality.
 */
export default function setupWindowScope(SynthEngine, scheduler){
  window.scheduler = scheduler;
  window.SynthEngine = SynthEngine;
  window.NumberGenerators = NumberGenerators;
  window.Chord = Chord;
  window.Scale = Scale;
}