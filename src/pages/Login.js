import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please enter your full name, email, and password.");
      return;
    }
    localStorage.setItem("doctorFullName", fullName);
    navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          NMS Web Portal Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.3rem",
                borderRadius: "0.3rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@example.com"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.3rem",
                borderRadius: "0.3rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.3rem",
                borderRadius: "0.3rem",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {error && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.7rem",
              borderRadius: "0.3rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link
            to="/forgot-password"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;




