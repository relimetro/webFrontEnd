import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot-password"
  ) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("doctorFullName");
    navigate("/");
  };

  const navbarStyle = {
    backgroundColor: "#1e4d92",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const linkContainer = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
  };

  const buttonStyle = {
    background: "white",
    color: "#1e4d92",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontWeight: 500,
  };

  return (
    <nav style={navbarStyle}>
      <h2 style={{ margin: 0, fontSize: "1.3rem" }}>🧠 NeuroMind System</h2>
      <div style={linkContainer}>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        <Link to="/patients" style={linkStyle}>
          Patients
        </Link>
        <Link to="/reports" style={linkStyle}>
          Reports
        </Link>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
