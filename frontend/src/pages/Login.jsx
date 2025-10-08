import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful");

      // 🔑 Save role and user info locally
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin" || res.data.user.role === "developer") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light position-relative"
      style={{
        backgroundImage: "url('/images/dp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for dark tint */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      ></div>

      {/* Back button */}
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 d-flex align-items-center gap-2"
        onClick={() => navigate("/")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left-circle"></i> Back to Home
      </button>

      {/* Login Card */}
      <div
        className="card shadow-lg p-4 border-0 rounded-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 2,
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">TMYLINES CONCEPT</h3>
          <p className="text-muted">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-3 fw-semibold"
            type="submit"
          >
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
        </form>

        <p className="mt-4 text-center text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary fw-semibold text-decoration-none">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}