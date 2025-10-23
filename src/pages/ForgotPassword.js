
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("⚠️ Please enter your email address.");
      return;
    }

    
   

    
    setTimeout(() => navigate("/"), 2500);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2>Forgot Password</h2>
        <p>Enter your email and we’ll send reset instructions.</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="doctor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "1rem",
              borderRadius: "0.3rem",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.7rem",
              width: "100%",
              borderRadius: "0.3rem",
              cursor: "pointer",
            }}
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "1rem", color: "#007bff" }}>{message}</p>
        )}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            background: "transparent",
            border: "none",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
