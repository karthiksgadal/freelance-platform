import React, { useEffect, useState } from "react";

const FreelancerDashboard = ({ token }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setApplications(data);
        } else {
          console.error(data.error || "Failed to fetch applications");
        }
      } catch (err) {
        console.error("Network error", err);
      }
    };

    fetchApplications();
  }, [token]);

  return (
    <div>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="application-card">
            <h3>{app.jobId?.title}</h3>
            <p>{app.jobId?.description}</p>
            <p>
              <strong>Status:</strong> {app.status}
            </p>
            <p>
              <strong>Cover Letter:</strong> {app.coverLetter}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default FreelancerDashboard;
