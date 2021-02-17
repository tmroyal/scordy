export default function ConfigBlocklyBlocks(Blockly){
  /**
   * every n beats
   */
  Blockly.Blocks['every_n_beats'] = {
    init: function() {
      this.appendStatementInput("NAME")
          .setCheck(null)
          .appendField("Every")
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
    var num_beats = numerator_beats / denom_beats;
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = 
      `scheduler.scheduleRecurring((current_beat, current_time)=>{\n${statements_name}}, ${num_beats});`;
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
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['current_beat'] = function(block) {
    var code = 'current_beat';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code+" + 1", Blockly.JavaScript.ADDITION];
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
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['current_time'] = function(block) {
    var code = 'current_time';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
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
          .setCheck("Number")
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
}