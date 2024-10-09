// デバッグ値転送ブロック定義
Blockly.Blocks['debug_image_probe'] = {
  init: function() {
    this.appendValueInput("DEBUG_INPUT")  // 前段の出力を受け取る
      .setCheck(null)
      .appendField("debug image probe");
    this.appendValueInput("PROP_NAME")
      .setCheck("String")
      .appendField("プロパティ名");
    this.setOutput(true);  // 出力を持つ
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('前段の出力を確認し、次のブロックに転送します');
  }
};
  
// 値を渡すための関数
async function viewImage(value, propName = 'image', sourceBlockName = '') {
  // 最後に追加されたexecutionGroupを取得
  const imageContainer = document.getElementById('imageContainer');
  const executionGroups = imageContainer.getElementsByTagName('div');
  const firstGroup = executionGroups[0];  // 最初に追加したグループ

  const src = value[propName] || value['image'];

  const div = document.createElement('div');
  const nameTag = document.createElement('p');
  nameTag.textContent = sourceBlockName;

  // 画像を表示するためのimg要素を作成
  const imageElement = document.createElement('img');
  imageElement.src = src;  // Base64またはURLの画像
  imageElement.alt = 'Debug image';
  imageElement.style.width = '300px';  // 幅を指定
  imageElement.style.height = 'auto';  // 高さを自動調整

  // img要素を最初のdivに追加
  div.appendChild(nameTag);
  div.appendChild(imageElement);
  firstGroup.appendChild(div);
  
  // 値をそのまま返して次のブロックに転送
  return value;
}
  
// JavaScriptコード生成
Blockly.JavaScript.forBlock['debug_image_probe'] = function(block) {
  const value = Blockly.JavaScript.valueToCode(block, 'DEBUG_INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  const inputConnection = block.getInputTargetBlock('DEBUG_INPUT');  // 入力名に対応する接続先ブロックを取得
  const sourceBlockName = inputConnection.type;  // 接続元のブロックのタイプを取得
  const propName = Blockly.JavaScript.valueToCode(block, 'PROP_NAME', Blockly.JavaScript.ORDER_ATOMIC) || "'image'";  // 接続されていない場合は'image'をデフォルト値に

  const code = `await viewImage(${value}, ${propName}, '${sourceBlockName}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
