// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ClientDashboard from "./pages/ClientDashboard";
 import FreelancerDashboard from "./pages/FreelancerDashboard";
 import JobList from "./pages/JobList"; 


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route
            path="/freelancer-dashboard"
            element={<FreelancerDashboard />}
          />
          <Route path="*" element={<Login />} />
          <Route path="/jobs" element={<JobList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
