import Chord from "./MusicalFunctions/Chord.js"
import Scale from "./MusicalFunctions/Scale.js"
import NumberGenerators from "./NumberGenerators/NumberGenerators.js";

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