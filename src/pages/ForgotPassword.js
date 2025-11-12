import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("If this email is registered, a reset link has been sent.");
    setTimeout(() => navigate("/login"), 2500);
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
              backgroundColor: "#004aad",
              color: "white",
              border: "none",
              padding: "0.7rem",
              width: "100%",
              borderRadius: "0.3rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "1rem", color: "#004aad" }}>{message}</p>
        )}

        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "1rem",
            background: "transparent",
            border: "none",
            color: "#004aad",
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
