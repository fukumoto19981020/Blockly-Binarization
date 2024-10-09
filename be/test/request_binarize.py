import os
import requests

script_dir = os.path.dirname(os.path.abspath(__file__))

input_image_path = os.path.join(script_dir, 'sample.png')
output_image_path = os.path.join(script_dir, 'binarized_image.png')

data = {
    'inputImagePath': input_image_path,
    'outputImagePath': output_image_path,
    'th': 0
}

response = requests.post('http://localhost:5000/binarize', json=data)
print(response)
if response.status_code == 200:
    print("二値化画像を保存しました:", response.json()['outputImagePath'])
else:
    print(f"Error: {response.status_code}, message: {response.json()}")
