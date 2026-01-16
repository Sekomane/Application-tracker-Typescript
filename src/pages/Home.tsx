import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
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
    if (window.confirm("Delete this job?")) {
      setJobs(jobs.filter((_, i) => i !== index));
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
    <Layout>
      <h2 style={{ marginBottom: "30px" }}>My Job Applications</h2>

      <div className="contact-content">
        {/* Job Form */}
        <div className="contact-form-card">
          <h3>{editingIndex !== null ? "Edit Job" : "Add New Job"}</h3>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              required
            />
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
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
              placeholder="Notes"
            />
            <button className="primary-btn" type="submit">
              {editingIndex !== null ? "Update Job" : "Add Job"}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="contact-info-card">
          <h3>Search & Filter</h3>
          <input
            placeholder="Search company or role"
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
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          padding: "60px",
        }}
      >
        {filteredJobs.map((job, index) => (
          <div key={index} className="contact-info-card">
            <h3>{job.company}</h3>
            <p><strong>Role:</strong> {job.role}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Date:</strong> {job.dateApplied}</p>
            <p>{job.extraDetails}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="primary-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="primary-btn"
                style={{ background: "#ef4444" }}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
