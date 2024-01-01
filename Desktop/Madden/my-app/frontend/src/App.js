// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import { Bar } from 'react-chartjs-2'; 
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'], 
    datasets: [
      {
        label: 'Example Data',
        data: [12, 19, 3], // Example data
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        {data ? (
          <div>
            <p>Name: {data.name}, Age: {data.age}</p>
            <FileUpload />
            <div className="chart-container">
              <Bar data={chartData} /> {/* Bar chart */}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
