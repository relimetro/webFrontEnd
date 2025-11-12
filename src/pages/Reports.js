import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  // This will later be backend data
  const [reports, setReports] = useState([]);

  const generatePDF = () => {
    if (reports.length === 0) {
      alert("No reports available to export.");
      return;
    }

    const doc = new jsPDF();
    doc.text("NeuroMind System - Patient Risk Report", 14, 15);
    autoTable(doc, {
      head: [["Patient Name", "Risk Level", "Last Check Date"]],
      body: reports.map((r) => [r.name, r.risk, r.date]),
      startY: 25,
    });
    doc.save("PatientRiskReport.pdf");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Patient Reports</h1>
        <p>
          View and download summaries of patient dementia risk profiles.
        </p>

        <button className="button" onClick={generatePDF}>
          Download Report as PDF
        </button>

        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Risk Level</th>
              <th>Last Check</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="3">No reports available.</td>
              </tr>
            ) : (
              reports.map((r, index) => (
                <tr key={index}>
                  <td>{r.name}</td>
                  <td
                    className={
                      r.risk === "High"
                        ? "risk-high"
                        : r.risk === "Medium"
                        ? "risk-medium"
                        : "risk-low"
                    }
                  >
                    {r.risk}
                  </td>
                  <td>{r.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reports;
