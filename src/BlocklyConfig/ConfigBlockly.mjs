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

  Blockly.Blocks['rand_int'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("random integer between");
      this.appendValueInput("LB")
          .setCheck("Number");
      this.appendValueInput("UB")
          .setCheck("Number")
          .appendField("and");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(10);
      this.setTooltip("Choose random number between lb and ub");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['rand_int'] = function(block) {
    var value_lb = Blockly.JavaScript.valueToCode(block, 'LB', Blockly.JavaScript.ORDER_ATOMIC);
    var value_ub = Blockly.JavaScript.valueToCode(block, 'UB', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `NumberGenerators.randint(${value_lb}, ${value_ub});`;

    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.Blocks['random'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("random number between");
      this.appendValueInput("LB")
          .setCheck("Number");
      this.appendValueInput("UB")
          .setCheck("Number")
          .appendField("and");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(10);
      this.setTooltip("Choose random number between lb and ub");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['random'] = function(block) {
    var value_lb = Blockly.JavaScript.valueToCode(block, 'LB', Blockly.JavaScript.ORDER_ATOMIC);
    var value_ub = Blockly.JavaScript.valueToCode(block, 'UB', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `NumberGenerators.randint(${value_lb}, ${value_ub});`;

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

  // rewrite list index of to support 0 indexing
}