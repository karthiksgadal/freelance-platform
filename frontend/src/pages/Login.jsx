import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      const role = decoded.role;
      console.log("Decoded token:", decoded);
      console.log("User role:", role);

      setMessage("✅ Login successful!");

      // Redirect based on role
      if (role === "client") {
        console.log("Navigating to client-dashboard");
        navigate("/client-dashboard");
      } else if (role === "freelancer") {
        console.log("Navigating to freelancer-dashboard");
        navigate("/freelancer-dashboard");
      } else {
        console.log("Role is unknown:", role);
        setMessage("Unknown role. Contact admin.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message || err);
      setMessage("❌ Login failed. Check credentials.");
    }
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
