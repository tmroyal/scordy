/**
 * This method takes Blockly as an argument
 * and decorates it with the custom blocks for
 * scordare 
 * @param Blockly 
 */
export default function ConfigBlocklyBlocks(Blockly){
  /**
   * every n beats, custom retrigger
   */
  Blockly.Blocks['scor_recur_func'] = {
    init: function() {
      this.appendStatementInput("STATEMENTS")
          .setCheck(null)
          .appendField("After delay")
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "DELAY")
          .appendField("do");
      this.appendValueInput("RETURN_DUR")
          .setCheck("Number")
          .appendField("and retrigger every");
      this.setColour(230);
      this.setTooltip("Allows for custom re-trigger times");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_recur_func'] = function(block) {
    var number_delay = block.getFieldValue('DELAY') || '0';
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var value_return_dur = Blockly.JavaScript.valueToCode(block, 'RETURN_DUR', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 
      `scheduler.schedule((current_beat, current_time)=>{\n${ statements_statements }\n  return ${ value_return_dur };\n}, ${ number_delay });`;
    return code;
  };

  /**
   * every n beats
   */
  Blockly.Blocks['every_n_beats'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("After delay")
          .appendField(new Blockly.FieldNumber(0, 0, null, 1/6.0), "DELAY")
          .appendField("trigger");
      this.appendStatementInput("STATEMENTS")
          .setCheck(null)
          .appendField("every")
          .appendField(new Blockly.FieldNumber(1, 1, null, 1), "NUM_BEATS")
          .appendField("/")
          .appendField(new Blockly.FieldDropdown([["1","1"], ["2", "2"], ["3","3"],["4","4"]]), "DENOM_BEATS")
          .appendField("beats");
      this.setColour(300);
      this.setTooltip("Statement input every N beats");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['every_n_beats'] = function(block) {
    var numerator_beats = block.getFieldValue('NUM_BEATS');
    var denom_beats = parseInt(block.getFieldValue('DENOM_BEATS'));
    var delay = block.getFieldValue('DELAY') || 0;
    var num_beats = numerator_beats / denom_beats;
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var code = 
      `scheduler.scheduleRecurring((current_beat, current_time)=>{\n${statements_statements}}, ${num_beats}, ${delay});`;
    return code;
  };

  /**
   * Current beat
   */
  Blockly.Blocks['current_beat'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("current beat");
      this.setOutput(true, "Number");
      this.setColour(300);
      this.setTooltip("Return current beat");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['current_beat'] = function(block) {
    var code = 'current_beat';
    return [code+" + 1", Blockly.JavaScript.ORDER_ATOMIC];
  };

  /**
   * Current time
   */
  Blockly.Blocks['current_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("current time");
      this.setOutput(true, "Number");
      this.setColour(300);
      this.setTooltip("return current time in seconds");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['current_time'] = function(block) {
    var code = 'current_time';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  /**
   * Play Synth
   */
  Blockly.Blocks['play_synth'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Play Sound")
          .appendField(new Blockly.FieldDropdown([["Sine","SINE"], ["Saw","SAW"]]), "NAME");
      this.appendValueInput("NOTE")
          .setCheck(["Number", "Array"])
          .appendField("Note");
      this.appendValueInput("VOLUME")
          .setCheck("Number")
          .appendField("Volume");
      this.appendValueInput("LENGTH")
          .setCheck("Number")
          .appendField("Length");
      this.setInputsInline(false);
      this.setColour(230);
      this.setTooltip("Play Synth");
      this.setHelpUrl("");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  Blockly.JavaScript['play_synth'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_note = Blockly.JavaScript.valueToCode(block, 'NOTE', Blockly.JavaScript.ORDER_ATOMIC) || 60;
    var value_volume = Blockly.JavaScript.valueToCode(block, 'VOLUME', Blockly.JavaScript.ORDER_ATOMIC) || 0.5;
    var value_length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_ATOMIC) || 0.5;
    var code = `SynthEngine.playSynth("${ dropdown_name }", ${ value_note }, ${ value_volume }, ${ value_length }, current_time);\n`;
    return code;
  };

  /**
   * Number generators
   * =================
   */
  
  /**
  * Choose from
  */
  Blockly.Blocks['scor_choose'] = {
    init: function() {
      this.appendValueInput("INPUT")
          .setCheck("Array")
          .appendField("Choose from");
      this.setOutput(true, "Number");
      this.setColour(150);
      this.setTooltip("Choose from list");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_choose'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `NumberGenerators.choose(${value_name})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  /**
   * Wrap
   */
  Blockly.Blocks['scor_wrap'] = {
    init: function() {
      this.appendValueInput("INPUT")
          .setCheck("Number")
          .appendField("wrap");
      this.appendValueInput("LOW")
          .setCheck("Number")
          .appendField("low");
      this.appendValueInput("HIGH")
          .setCheck("Number")
          .appendField("high");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(240);
      this.setTooltip("Wrap between two numbers");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_wrap'] = function(block) {
    var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_low = Blockly.JavaScript.valueToCode(block, 'LOW', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_high = Blockly.JavaScript.valueToCode(block, 'HIGH', Blockly.JavaScript.ORDER_ATOMIC) || 1;
    var code = `NumberGenerators.wrap(${value_input}, ${value_low}, ${value_high})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  /**
   * Random walk
   */
  Blockly.Blocks['scor_walk'] = {
    init: function() {
      this.appendValueInput("INPUT")
          .setCheck("Number");
      this.appendValueInput("STEP")
          .setCheck("Number")
          .appendField("randomly add by +/-");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(240);
      this.setTooltip("Change number randomly by step amount");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_walk'] = function(block) {
    var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_step = Blockly.JavaScript.valueToCode(block, 'STEP', Blockly.JavaScript.ORDER_ATOMIC) || 2;
    var code = `NumberGenerators.walk(${ value_input },${ value_step })`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  /**
   * MUSIC FUNCTIONS
   * ================
   */

  /**
   * Base note to chord
   */
  Blockly.Blocks['scor_to_chord'] = {
    init: function() {
      this.appendValueInput("NOTE")
          .setCheck("Number")
          .appendField("as chord")
          .appendField(new Blockly.FieldDropdown([["Major","MAJOR"], ["Minor","MINOR"], ["Major 7th","MAJ7"], ["Minor 7th","MIN7"], ["Minor 7th flat 5","MIN7B5"], ["Augmented","AUGMENTED"]]), "TYPE");
      this.setOutput(true, "Number");
      this.setColour(30);
      this.setTooltip("Turn a single note to a chord");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_to_chord'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE').toLowerCase();
    var value_note = Blockly.JavaScript.valueToCode(block, 'NOTE', Blockly.JavaScript.ORDER_ATOMIC) || 60;
    var code = `Chord.${ dropdown_type }( ${value_note} )`
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };


  /**
   * Major scale
   */
  Blockly.Blocks['scor_scale'] = {
    init: function() {
      this.appendValueInput("DEGREE")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(new Blockly.FieldDropdown([["major","MAJOR"], ["minor","MINOR"]]), "TYPE")
          .appendField("scale note number");
      this.appendValueInput("BASE")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("base note");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Major Scale");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_scale'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE').toLowerCase();
    var value_degree = Blockly.JavaScript.valueToCode(block, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_ATOMIC) || 60;
    var code = `Scale.${ dropdown_type }FromDegree(${ value_degree }, ${ value_base })`
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  /**
   * Custom scale
   */
  Blockly.Blocks['scor_custom_scale'] = {
    init: function() {
      this.appendValueInput("SCALE")
          .setCheck("Array")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("get from scale");
      this.appendValueInput("DEGREE")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("note number");
      this.appendValueInput("BASE")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("base note");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Custom Scale");
      this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['scor_custom_scale'] = function(block) {
    var value_scale = Blockly.JavaScript.valueToCode(block, 'SCALE', Blockly.JavaScript.ORDER_ATOMIC) || '[0]';
    var value_degree = Blockly.JavaScript.valueToCode(block, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_ATOMIC) || 60;
    var code = `Scale.getScaleMember(${ value_scale }, ${ value_degree }, ${ value_base })`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };


  /**
   * Note block
   */

  Blockly.Blocks['scor_note'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("note")
          .appendField(new Blockly.FieldDropdown([["C","C"], ["D","D"], ["E","E"], ["F","F"], ["G","G"], ["A","A"], ["B","B"]]), "NAME")
          .appendField(new Blockly.FieldDropdown([["♮","NATURAL"], ["♭","FLAT"], ["♯","SHARP"]]), "MODIFIER");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  var notes = {
    C: 0, D: 2, E: 4, F: 5, G:7, A:9, B: 11
  };
  var modifiers = {
    SHARP: 1, 
    FLAT: -1,
    NATURAL: 0
  }

  Blockly.JavaScript['scor_note'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var dropdown_modifier = block.getFieldValue('MODIFIER');


    var code = `${ notes[dropdown_name] + modifiers[dropdown_modifier]}`
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };


  /**
   * At octave
   */
  Blockly.Blocks['scor_at_octave'] = {
    init: function() {
      this.appendValueInput("INPUT")
          .setCheck("Number")
          .appendField("at octave")
          .appendField(new Blockly.FieldNumber(4, -2, 8, 1), "OCTAVES");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Puts the incoming note at the specified octave. 4 is the middle.");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_at_octave'] = function(block) {
    var number_octaves = block.getFieldValue('OCTAVES') || '4';
    var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC) || '0'
    
    var code = (parseInt(number_octaves)+1)*12 + parseInt(value_input);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };


  // tempo config block
  Blockly.Blocks['scor_tempo'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("tempo =")
          .appendField(new Blockly.FieldNumber(110, 20, 250, 1), "TEMPO")
          .appendField("bpm");
      this.setColour(230);
      this.setTooltip("Set tempo");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['scor_tempo'] = function(block) {
    var number_name = block.getFieldValue('TEMPO');
    var code = `scheduler.setTempo(${ number_name })`;
    return code;
  };
}