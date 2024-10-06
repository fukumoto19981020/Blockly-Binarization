import os
import requests

# スクリプトが存在するディレクトリのパスを取得
script_dir = os.path.dirname(os.path.abspath(__file__))

# 実行しているPythonスクリプトと同じディレクトリ内の画像ファイルのパスを指定
image_path = os.path.join(script_dir, 'sample.png')

# サーバーに画像を送信して二値化された画像を受け取る
with open(image_path, 'rb') as image_file:
    response = requests.post('http://localhost:5000/binarize', files={'image': image_file})

# ステータスコードをチェック
if response.status_code == 200:
    # 受け取った二値化画像を保存
    with open('binarized_image.png', 'wb') as f:
        f.write(response.content)
    print("二値化画像を保存しました: binarized_image.png")
else:
    print(f"error: {response.status_code}, message: {response.json()}")
