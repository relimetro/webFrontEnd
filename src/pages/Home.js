// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "#007bff" }}>NMS Dashboard</h1>
        <p>Welcome back, Doctor. Select a section below to continue.</p>
      </header>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div
          onClick={() => navigate("/patients")}
          style={{
            flex: 1,
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          <h2>👩‍⚕️ Patients</h2>
          <p>View and manage dementia risk data for patients.</p>
        </div>

        <div
          onClick={() => navigate("/reports")}
          style={{
            flex: 1,
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          <h2>📊 Reports</h2>
          <p>Generate and download patient risk reports.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
