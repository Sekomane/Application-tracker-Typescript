import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-logo">JobTracker</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>

      <main className="page-content">
        {children}
      </main>

      <footer className="footer">
        <p>© 2025 Job Application Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
