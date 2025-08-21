import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";

interface Job {
  company: string;
  role: string;
  status: "Applied" | "Interviewed" | "Rejected";
  dateApplied: string;
  extraDetails: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  }, [navigate]);

  const [jobs, setJobs] = useState<Job[]>(() => {
    return JSON.parse(localStorage.getItem("jobs") || "[]");
  });

  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [dateApplied, setDateApplied] = useState<string>("");
  const [extraDetails, setExtraDetails] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newJob: Job = { company, role, status, dateApplied, extraDetails };

    if (editingIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = newJob;
      setJobs(updatedJobs);
      setEditingIndex(null);
    } else {
      setJobs([...jobs, newJob]);
    }

    setCompany("");
    setRole("");
    setStatus("Applied");
    setDateApplied("");
    setExtraDetails("");
  };

  const handleEdit = (index: number) => {
    const job = jobs[index];
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDateApplied(job.dateApplied);
    setExtraDetails(job.extraDetails);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updatedJobs = jobs.filter((_, i) => i !== index);
      setJobs(updatedJobs);
    }
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((job) => (filterStatus ? job.status === filterStatus : true))
    .sort((a, b) => {
      if (!a.dateApplied || !b.dateApplied) return 0;
      return sortOrder === "asc"
        ? new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        : new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
    });

  return (
    <div className="page-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("auth");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="home-content">
        <h2>Job Application Tracker</h2>

        <form className="job-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            required
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Position"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Job["status"])}
          >
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          />
          <textarea
            value={extraDetails}
            onChange={(e) => setExtraDetails(e.target.value)}
            placeholder="Notes about the Job"
          />
          <button type="submit">
            {editingIndex !== null ? "Update Job" : "Add Job"}
          </button>
        </form>

        <div className="job-controls">
          <input
            type="text"
            placeholder="Search by company or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Rejected</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Sort by Date ↑</option>
            <option value="desc">Sort by Date ↓</option>
          </select>
        </div>

        <div className="job-list">
          {filteredJobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            filteredJobs.map((job, index) => (
              <div
                className={`job-card ${job.status.toLowerCase()}`}
                key={index}
              >
                <h3>{job.company}</h3>
                <p><strong>Role:</strong> {job.role}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Date Applied:</strong> {job.dateApplied}</p>
                <p>{job.extraDetails}</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
