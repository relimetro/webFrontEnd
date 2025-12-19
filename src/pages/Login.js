import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://dementica.danigoes.online/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
        UserType: "Doctor", 
      }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();

    // Save auth/session info
    sessionStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.UserType || "Doctor");
    localStorage.setItem("userId", data.UserID || null);
    localStorage.setItem("id_token", data.IdToken || null);

    // Redirect
    if (data.UserType === "Admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (err) {
    setError(err.message || "Login failed");
  }
};
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="form">
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

        {error && <p className="error">{error}</p>}

        <button type="submit" className="button">Login</button>
      </form>

      <p><Link to="/forgot-password">Forgot Password?</Link></p>
      <p>Don’t have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;

