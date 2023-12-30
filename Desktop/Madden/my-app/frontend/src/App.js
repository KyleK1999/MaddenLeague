import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';  

function App() {
  const [data, setData] = useState(null);

  const clearData = () => {
    setData(null);
  };

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header custom-header">
        {data ? (
          <div>
            <p>Name: {data.name}, Age: {data.age}</p>
            <button onClick={clearData}>Clear Data</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <FileUpload />
      </header>
    </div>
  );
}

export default App;
