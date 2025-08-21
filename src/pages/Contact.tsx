import React, { useState } from "react";
import { Link } from "react-router-dom";
import contactData from "../data/contact.json";
import "../styles/styles.css";

// Define TypeScript types
interface ContactInfo {
  email: string;
  phone: string;
  support: string;
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

interface Feedback {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const contact: ContactInfo = contactData;
  const [feedback, setFeedback] = useState<Feedback>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback({ name: "", email: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign-up</Link></li>
        </ul>
      </nav>

      {/* Contact Header */}
      <div className="about-header">
        <h1 className="about-title">Contact Us</h1>
        <p className="about-subtitle">Have questions or complaints? Reach out to us!</p>
      </div>

      {/* Feedback Form */}
      <div className="feedback-form-section">
        <h2>Send Us Your Feedback</h2>
        {submitted && <p className="success-msg">Thank you! Your feedback has been submitted.</p>}
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Write your feedback or complaint here..."
            value={feedback.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Feedback</button>
        </form>
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
              <li><Link to="/register">Sign-up</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Support: {contact.support}</p>
          </div>

          {/* Location Info */}
          <div className="footer-section">
            <h3>Location</h3>
            <p>{contact.address}</p>
            <p>{contact.city}, {contact.zipcode}</p>
            <p>{contact.country}</p>
          </div>

        </div>
        <div className="footer-bottom">
          <p>© 2025 Job Application Tracker. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
