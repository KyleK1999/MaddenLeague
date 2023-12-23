from flask import Flask, request
from components.file_manager import handle_upload

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def file_upload():
    return handle_upload(request)

if __name__ == '__main__':
    app.run(debug=True)
