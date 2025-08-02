// src/pages/ClientDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/client/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title,
          description,
          budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Job posted successfully!");
      setTitle("");
      setDescription("");
      setBudget("");
      fetchJobs(); // refresh the job list after posting
    } catch (error) {
      console.error("Job post error:", error.response?.data || error.message);
      setMessage("❌ Failed to post job.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Posted Jobs</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Post a New Job</h3>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Post Job
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-green-700 font-medium">
            {message}
          </p>
        )}
      </form>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.description}</p>
              <p className="text-gray-600">💰 Budget: ₹{job.budget}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientDashboard;
