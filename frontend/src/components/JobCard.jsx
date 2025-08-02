import React, { useState } from "react";

const JobCard = ({ job, token }) => {
  const [showForm, setShowForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: job._id,
          coverLetter,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Application submitted!");
        setCoverLetter("");
        setShowForm(false);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error");
    }
  };

  return (
    <div
      className="job-card"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>
        <strong>Budget:</strong> ₹{job.budget}
      </p>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Apply"}
      </button>

      {showForm && (
        <div style={{ marginTop: "1rem" }}>
          <textarea
            rows="4"
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          <button
            onClick={handleApply}
            style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
          >
            Submit
          </button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </div>
  );
};

export default JobCard;
