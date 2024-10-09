Blockly.Blocks['file_input_block'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ファイルを選択");
    this.setOutput(true, 'String');
    this.setColour(160);
    this.setTooltip('ファイルを選択し、そのパスを出力します');
  }
};

function handleFileInput() {
  return new Promise((resolve, reject) => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = function(event) {
      var file = event.target.files[0];
      if (file) {
        // ファイルの内容を読み込む
        var reader = new FileReader();
        reader.onload = function(event) {
          var fileContent = event.target.result;
          console.log("File content loaded");
          resolve({ fileName: file.name, fileContent: fileContent });  // ファイル名と内容を返す
        };
        reader.onerror = function() {
          reject("ファイルの読み込みに失敗しました");
        };
        reader.readAsDataURL(file);  // Base64で読み込む
      } else {
        reject("ファイルが選択されませんでした");
      }
    };
    input.click();
  });
}

// BlocklyのJavaScriptコード生成部分
Blockly.JavaScript.forBlock['file_input_block'] = function(block) {
  const code = 'await handleFileInput()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
    
  