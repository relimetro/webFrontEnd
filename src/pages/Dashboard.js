import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Dashboard() {
  const [riskData, setRiskData] = useState([]);

  useEffect(() => {
    // When backend is ready, fetch patient data and calculate risk levels here
  }, []);

  const COLORS = ["#ff4d4d", "#ffcc00", "#00b300"];

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Risk Dashboard</h1>
        <p>Visualisation of dementia risk scores across multiple patients.</p>

        {riskData.length === 0 ? (
          <p>No risk data available.</p>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <PieChart width={400} height={400}>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
