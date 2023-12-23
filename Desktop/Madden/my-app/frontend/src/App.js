import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';  // Ensure this path is correct

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data ? <p>Name: {data.name}, Age: {data.age}</p> : <p>Loading...</p>}
        <FileUpload />  {/* File Upload Component */}
      </header>
    </div>
  );
}

export default App;
