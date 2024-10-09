from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cv2
import numpy as np
import io
import os
import base64

app = Flask(__name__)
CORS(app)  # CORSを有効にする

# 1つ目のエンドポイント：画像を受け取って二値化して返す
# @app.route('/binarize', methods=['POST'])
# def binarize_image():
#     print(request.files)  # デバッグ用
#     if 'image' not in request.files:
#         return jsonify({"error": "No image provided"}), 400

#     # 画像を読み込み
#     file = request.files['image']
#     in_memory_file = np.frombuffer(file.read(), dtype=np.uint8)
#     image = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

#     if image is None:
#         return jsonify({"error": "Invalid image file"}), 400

#     # グレースケールに変換して二値化
#     gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     _, binarized_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY)

#     # 二値化された画像をPNG形式でバイナリデータに変換
#     _, buffer = cv2.imencode('.png', binarized_image)
#     img_io = io.BytesIO(buffer)

#     return send_file(img_io, mimetype='image/png')

@app.route('/binarize', methods=['POST'])
def binarize_image():
    data = request.json
    print(data)
    image_base64 = data.get('image')  # Base64形式の画像データ
    th = data.get('th')
    output_path = 'output_image.png'  # 出力パス

    # Base64データを画像に変換
    try:
        image_data = base64.b64decode(image_base64.split(',')[1])  # Base64ヘッダの分離
        np_array = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    except Exception as e:
        return jsonify({"error": "Failed to decode image", "details": str(e)}), 400

    if image is None:
        return jsonify({"error": "Failed to decode input image"}), 400
   
    # グレースケールに変換して二値化
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binarized_image = cv2.threshold(gray_image, th, 255, cv2.THRESH_BINARY)

    _, buffer = cv2.imencode('.png', binarized_image)
    binarized_image_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({"binarizedImage": f"data:image/png;base64,{binarized_image_base64}"}), 200


# 2つ目のエンドポイント：サーバーのシャットダウン
@app.route('/shutdown', methods=['POST'])
def shutdown_server():
    shutdown = request.environ.get('werkzeug.server.shutdown')
    if shutdown is None:
        return jsonify({"error": "Server not running with Werkzeug"}), 500
    shutdown()
    return jsonify({"message": "Server is shutting down..."}), 200

if __name__ == '__main__':
    app.run(debug=True)
