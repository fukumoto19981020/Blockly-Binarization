Blockly.Blocks['threshold_input_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(128, 0, 255), 'NUMBER_INPUT');
    this.setOutput(true, 'Number');
    this.setColour(230);
    this.setTooltip('0〜255の整数を指定します');
    this.setHelpUrl('');
  }
};

// JavaScriptコード生成
Blockly.JavaScript.forBlock['threshold_input_block'] = function(block) {
  var number = block.getFieldValue('NUMBER_INPUT');
  return [number, Blockly.JavaScript.ORDER_ATOMIC];
};
