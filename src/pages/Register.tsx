import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import contactDataRaw from "../data/contact.json";

// Type definitions
interface ContactInfo {
  email: string;
  phone: string;
  support: string;
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

interface User {
  username: string;
  password: string;
}

const contactData: ContactInfo = contactDataRaw as ContactInfo;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    // Get existing users from localStorage or empty array
    const existingUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if username already exists
    const userExists = existingUsers.find((u) => u.username === username);
    if (userExists) {
      setError("Username already exists");
      setSuccess("");
      return;
    }

    // Add new user to localStorage
    const newUser: User = { username, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("Registration successful! Redirecting to login...");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>

      {/* Register Card */}
      <div className="login-container">
        <div className="login-card">
          <h2>Register</h2>
          <p>Create your account</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            <button type="submit" className="login-btn">Register</button>
          </form>

          <p className="register-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="link-text">
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Quick Links */}
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

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: {contactData.email}</p>
            <p>Phone: {contactData.phone}</p>
            <p>Support: {contactData.support}</p>
          </div>

          {/* Location Info */}
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

export default Register;
