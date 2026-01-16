import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface User {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    const existingUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = existingUsers.find((u) => u.username === username);
    if (userExists) {
      setError("Username already exists");
      setSuccess("");
      return;
    }

    existingUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("Account created. Redirecting to login...");
    setError("");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Layout>
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Start tracking your job applications</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />

          <button className="primary-btn" type="submit">
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2563eb", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
