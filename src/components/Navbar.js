import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#2E5A88",
    color: "white",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 10px"
  };

  return (
    <nav style={navStyle}>
      <h2>🧠 NeuroMind System</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/patients" style={linkStyle}>Patients</Link>
        <Link to="/reports" style={linkStyle}>Reports</Link>
      </div>
    </nav>
  );
}

export default Navbar;
