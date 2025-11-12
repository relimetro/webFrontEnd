import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const match = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      setError("Invalid credentials");
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(match));
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Login</button>
      </form>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>
      <p>Don’t have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
