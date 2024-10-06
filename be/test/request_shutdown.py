import requests

# サーバーをシャットダウン
shutdown_response = requests.post('http://localhost:5000/shutdown')
print(shutdown_response.json())
