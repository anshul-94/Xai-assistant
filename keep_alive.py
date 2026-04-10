import requests

def keep_alive():
    url = "https://your-app-name.onrender.com/chat"
    payload = {"message": "ping"}
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}, Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    keep_alive()
