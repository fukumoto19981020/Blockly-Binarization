Blockly.Blocks['binarization_block'] = {
  init: function() {
    this.appendValueInput("IMAGE_INPUT")  // 画像入力
      .setCheck('String')
      .appendField("画像");
    this.appendValueInput("THRESHOLD_INPUT")  // 閾値入力
      .setCheck('Number')
      .appendField("閾値");
    this.setOutput(true);  // 出力を持つ
    this.setColour(160);  // 色を指定
    this.setTooltip('画像と閾値を受け取り、次に渡します');
  }
};

async function sendImageToServer(imageInput, th) {
  const data = {
    image: imageInput.fileContent,  // Base64形式のファイル内容
    th: th
  };

  try {
    const response = await fetch('http://localhost:5000/binarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('response:', result);
      return result;
    } else {
      const errorData = await response.json();
      console.error(`エラー: ${response.status}, メッセージ: ${JSON.stringify(errorData)}`);
      return null;
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}
  
Blockly.JavaScript.forBlock['binarization_block'] = function(block) {
  const imageInput = Blockly.JavaScript.valueToCode(block, 'IMAGE_INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  const thresholdInput = Blockly.JavaScript.valueToCode(block, 'THRESHOLD_INPUT', Blockly.JavaScript.ORDER_ATOMIC);

  const code = `await sendImageToServer(${imageInput},  ${thresholdInput})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
