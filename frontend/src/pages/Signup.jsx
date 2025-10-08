import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🧠 Automatically assign role based on email
      const role = formData.email.includes("tmylines") ? "admin" : "user";

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { ...formData, role },
        { withCredentials: true }
      );

      toast.success(res.data.message || "User registered successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
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
      <Toaster position="top-center" reverseOrder={false} />

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      ></div>

      {/* Back to Home Button */}
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 d-flex align-items-center gap-2"
        onClick={() => navigate("/")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left-circle"></i> Back to Home
      </button>

      {/* Signup Card */}
      <div
        className="card shadow-lg p-4 border-0 rounded-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 2,
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">TMYLINES CONCEPT</h3>
          <p className="text-muted">Create your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold py-2"
          >
            <i className="bi bi-person-plus-fill me-2"></i> Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-muted">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary fw-semibold text-decoration-none"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}