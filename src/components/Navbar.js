import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../index.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password"
  ) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">NeuroMind System</h2>
      </div>
      <div className="nav-right">
        {!user && location.pathname === "/" && (
          <Link to="/login" className="nav-link">Login</Link>
        )}

        {user && (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/patients" className="nav-link">Patients</Link>
            <Link to="/reports" className="nav-link">Reports</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="nav-link">Admin</Link>
            )}

            <Link to="/news" className="nav-link">News</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

