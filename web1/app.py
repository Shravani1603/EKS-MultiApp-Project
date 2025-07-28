from flask import Flask
app = Flask(__name__)

@app.route('/health')
def health_check():
    return 'OK', 200
    
@app.route('/web1')
def home():
    return "Hello from Web1 - Python Flask"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500)
