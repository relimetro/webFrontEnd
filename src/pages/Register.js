import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");   // <-- NEW
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!role) {
      setError("Please select a role (Admin or Doctor)");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.find((u) => u.email === email)) {
      setError("An account with this email already exists");
      return;
    }

    // NEW: store role in user object
    const newUser = { name, email, password, role };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    navigate("/login");
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

        {/* NEW: Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input"
          required
        >
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

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

