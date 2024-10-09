Blockly.Blocks['debug_probe'] = {
  init: function() {
    this.appendValueInput("DEBUG_INPUT")  // 前段の出力を受け取る
      .setCheck(null)
      .appendField("debug probe");
    this.setOutput(true);  // 出力を持つ
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('前段の出力を確認し、次のブロックに転送します');
  }
};

// 値を渡すための関数
function passValue(value, sourceBlockName='') {
  console.log(sourceBlockName, ":", value);
  return value;  // 値をそのまま返して次に渡す
}
  
Blockly.JavaScript.forBlock['debug_probe'] = function(block) {
  const value = Blockly.JavaScript.valueToCode(block, 'DEBUG_INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  const inputConnection = block.getInputTargetBlock('DEBUG_INPUT');  // 入力名に対応する接続先ブロックを取得
  const sourceBlockName = inputConnection.type;  // 接続元のブロックのタイプを取得
  const code = `passValue(${value}, '${sourceBlockName}')`;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
