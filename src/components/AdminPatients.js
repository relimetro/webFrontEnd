import React, { useState, useEffect } from "react";
import "../index.css";
import { backend_GetPatients } from "../backend";

function AdminPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    backend_GetPatients((data) => {
      if (data.Result === "Ok") {
        setPatients(data.Patients);
      }
    });
  }, []);

  return (
    <div className="container">
      <h1>Patients (Admin View)</h1>
      <p>
        Admin users can view patient–doctor assignments but cannot access
        medical data.
      </p>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Assigned Doctor</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="2">No patients available for admin users.</td>
            </tr>
          ) : (
            patients.map((p, index) => (
              <tr key={index}>
                <td>{p.Name}</td>
                <td>{p.DoctorID || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPatients;


