import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import { backend_GetNews, backend_login } from "../backend.js";

function Patients() {
  const [patients, setPatients] = useState([]);

  // example usage (note danis code only sometimes responds to requests so until I fix that might need to call multiple times (will get 501 not implemented)
  // note: i dont think calling functions directly in function body is a best practise in react but that sounds like a frontend person problem
  backend_GetNews((e) => console.log(e));
  backend_GetNews((e) => console.log(e));
  backend_GetNews((e) => console.log(e));
  backend_login("Eoin", "12345", (e) => console.log(e)); // last argument is callback that recieves response, all prev arguments are part of request

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>My Patients</h1>
        <p>This page will show dementia risk scores for patients.</p>

        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="2">No patients loaded.</td>
              </tr>
            ) : (
              patients.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td
                    className={
                      p.risk === "High"
                        ? "risk-high"
                        : p.risk === "Medium"
                        ? "risk-medium"
                        : "risk-low"
                    }
                  >
                    {p.risk}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Patients;

