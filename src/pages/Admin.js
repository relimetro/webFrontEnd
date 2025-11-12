import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";

function Admin() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (!file) return alert("Please select a JSON file first.");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (Array.isArray(jsonData)) setData(jsonData);
        else alert("File must contain an array of JSON objects.");
      } catch {
        alert("Invalid JSON format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Admin – Data Aggregation</h1>
        <p>Upload anonymised datasets to extend dementia model training data.</p>

        <input type="file" accept=".json" onChange={handleFileChange} />
        <button className="button" onClick={handleUpload}>Upload</button>

        {data.length > 0 && (
          <table className="patients-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Admin;
