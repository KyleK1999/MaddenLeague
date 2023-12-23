import os
import datetime
import shutil
from flask import jsonify
from werkzeug.utils import secure_filename

CURRENT_FOLDER = '../../madden_data/current'
ARCHIVE_FOLDER = '../../madden_data/archive'
ALLOWED_EXTENSIONS = {'json'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def archive_current_data():
    date_str = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    archive_dir = os.path.join(ARCHIVE_FOLDER, f"export_{date_str}")
    os.makedirs(archive_dir, exist_ok=True)

    for filename in os.listdir(CURRENT_FOLDER):
        if filename.endswith('.json'):
            shutil.move(os.path.join(CURRENT_FOLDER, filename), os.path.join(archive_dir, filename))

def save_uploaded_file(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(CURRENT_FOLDER, filename))
        return True, filename
    return False, None

def handle_upload(request):
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400

    archive_current_data()  # Archive existing data

    success, filename = save_uploaded_file(file)
    if success:
        return jsonify({'message': f'File {filename} uploaded successfully'}), 200
    else:
        return jsonify({'message': 'Invalid file type'}), 400
