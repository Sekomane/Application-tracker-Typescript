import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import usersJSON from "../data/users.json";

interface User {
  username: string;
  password: string;
}

import contactDataRaw from "../data/contact.json";

interface ContactInfo {
  email: string;
  phone: string;
  support: string;
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

const contactData: ContactInfo = contactDataRaw as ContactInfo;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
    <div className="page-container">
      {}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>

      {}
      <div className="login-container">
        <div className="login-card">
          <h2>Job Application Tracker</h2>
          <p>Login to continue</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="register-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")} className="link-text">
              Register
            </span>
          </p>
        </div>
      </div>

      {}
      <footer className="footer">
        <div className="footer-container">
          {}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
          </div>

          {}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: {contactData.email}</p>
            <p>Phone: {contactData.phone}</p>
            <p>Support: {contactData.support}</p>
          </div>

          {}
          <div className="footer-section">
            <h3>Location</h3>
            <p>{contactData.address}</p>
            <p>{contactData.city}, {contactData.zipcode}</p>
            <p>{contactData.country}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Job Application Tracker. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
