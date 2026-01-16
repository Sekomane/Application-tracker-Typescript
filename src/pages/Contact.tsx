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
  <div className="contact-page">
    {/* Navbar */}
    <nav className="navbar">
      <div className="nav-logo">JobTracker</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact" className="active">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register" className="signup-btn">Sign-up</Link></li>
      </ul>
    </nav>

    {/* Header */}
    <section className="contact-hero">
      <h1>Contact Us</h1>
      <p>We’re here to help. Send us your questions or complaints.</p>
    </section>

    {/* Content */}
    <section className="contact-content">
      {/* Contact Info */}
      <div className="contact-info-card">
        <h2>Our Details</h2>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Support:</strong> {contact.support}</p>
        <p><strong>Address:</strong> {contact.address}, {contact.city}, {contact.zipcode}</p>
        <p><strong>Country:</strong> {contact.country}</p>
      </div>

      {/* Form */}
      <div className="contact-form-card">
        <h2>Send Feedback</h2>

        {submitted && <p className="success-msg">Your message has been sent successfully.</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={feedback.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={feedback.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={feedback.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn">Send Message</button>

        </form>
      </div>
    </section>

    {/* Footer */}
    <footer className="footer">
      <p>© 2025 Job Application Tracker. All Rights Reserved.</p>
    </footer>
  </div>
);
};

export default Contact;
