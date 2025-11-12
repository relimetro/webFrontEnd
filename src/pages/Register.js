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

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find((u) => u.email === email)) {
      setError("An account with this email already exists");
      return;
    }

    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleRegister} className="form">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input" />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
