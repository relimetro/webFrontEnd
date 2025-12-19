import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://dementica.danigoes.online:80/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Password: password,
        RegisterWith: email,
        RegType: "Email",
        UserType: "Doctor",
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Registration failed");
    }

    navigate("/login");
  } catch (err) {
    setError(err.message);
  }
};
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="form">

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;

