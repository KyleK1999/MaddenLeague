import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'http://localhost:5000/upload', // Update with your Flask server URL
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('File uploaded successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
