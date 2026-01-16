import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import jobssImg from "../assets/jobss.webp";

export default function Landing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="contact-hero">
        <h1>Job Application Tracker</h1>
        <p>Apply, track and manage your job hunt in one place.</p>
      </section>

      {/* Main content */}
      <section className="contact-content">
        <div className="contact-info-card">
          <h2>Why Choose Us?</h2>
          <p>
            Keep all your job applications, interviews and deadlines organised
            in one powerful dashboard so you can focus on landing your next
            opportunity.
          </p>

          <p>
            Track your progress, stay organised and increase your chances of
            getting hired faster.
          </p>

          <Link to="/register" className="primary-btn">
            Get Started
          </Link>
        </div>

        <div className="contact-form-card">
          <img
            src={jobssImg}
            alt="Job tracker"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-box">
          <h2>10×</h2>
          <p>Faster Job Search</p>
        </div>

        <div className="stat-box">
          <h2>90%</h2>
          <p>More Interviews</p>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <p>Applications Tracked</p>
        </div>
      </section>


      {/* Testimonials */}
      <section style={{ padding: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          What Job Seekers Say
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
          }}
        >
  <div className="testimonial-grid">
  <div className="testimonial-card">
    <div className="rating">★★★★☆</div>
    <p>
      This tracker helped me stay organised and get my dream job faster.
    </p>
    <span>Rorisang S.</span>
  </div>

  <div className="testimonial-card featured">
    <div className="rating">★★★★★</div>
    <p>
      Simple, easy-to-use, and keeps all my job applications in one place.
    </p>
    <span>Zwanga M.</span>
  </div>

  <div className="testimonial-card">
    <div className="rating">★★★★☆</div>
    <p>
      I love how it tracks interviews and deadlines automatically.
    </p>
    <span>Mbali M.</span>
  </div>
</div>
        </div>
      </section>
    </Layout>
  );
}
