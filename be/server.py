from flask import Flask, request, jsonify, send_file
import cv2
import numpy as np
import io

app = Flask(__name__)

# 1つ目のエンドポイント：画像を受け取って二値化して返す
@app.route('/binarize', methods=['POST'])
def binarize_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # 画像を読み込み
    file = request.files['image']
    in_memory_file = np.frombuffer(file.read(), dtype=np.uint8)
    image = cv2.imdecode(in_memory_file, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Invalid image file"}), 400

    # グレースケールに変換して二値化
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binarized_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY)

    # 二値化された画像をPNG形式でバイナリデータに変換
    _, buffer = cv2.imencode('.png', binarized_image)
    img_io = io.BytesIO(buffer)

    return send_file(img_io, mimetype='image/png')

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
