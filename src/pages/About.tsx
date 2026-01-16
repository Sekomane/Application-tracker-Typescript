import Layout from "../components/Layout";
import contactData from "../data/contact.json";
import aboutImg from "../assets/about.webp";

const About = () => {
  const contact = contactData;

  const team = [
    { name: "Sekomane R.", role: "Founder & CEO", icon: "👑" },
    { name: "Rorisang S.", role: "Lead Developer", icon: "💻" },
    { name: "Rori S.", role: "Manager", icon: "📊" },
  ];


  return (
    <Layout>
      {/* Hero */}
      <section className="contact-hero">
        <h1>About Job Application Tracker</h1>
        <p>
          Helping job seekers stay organised, track applications, and land their
          dream jobs.
        </p>
      </section>

      {/* About Content */}
      <section className="contact-content">
        <div className="contact-info-card">
          <h2>Who We Are</h2>
          <p>
            Job Application Tracker is a modern platform designed to make your
            job hunt simple and efficient. Keep all your applications,
            deadlines, and interviews in one place.
          </p>
          <p>
            Our mission is to empower job seekers with tools to track, manage,
            and optimise their applications so they never miss an opportunity.
          </p>

          <h3 style={{ marginTop: "25px" }}>Contact</h3>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Support:</strong> {contact.support}</p>
        </div>

        <div className="contact-form-card">
          <img
            src={aboutImg}
            alt="Team collaboration"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Meet Our Team
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          {team.map((member) => (
            <div
              key={member.name}
              className="contact-info-card"
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {member.icon}
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;
