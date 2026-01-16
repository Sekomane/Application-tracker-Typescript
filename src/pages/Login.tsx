import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import usersJSON from "../data/users.json";

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const allUsers: User[] = [...usersJSON, ...localUsers];

    const user = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Layout>
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to continue</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="primary-btn"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#2563eb", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
