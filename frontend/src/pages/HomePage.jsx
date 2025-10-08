import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center bg-light position-relative"
      style={{
        backgroundImage: "url('/images/dp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay tint */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
      ></div>

      {/* 🔘 Login/Logout icon */}
      <div
        className="position-absolute top-0 start-0 m-3 p-2 rounded-circle bg-dark bg-opacity-50 text-white"
        style={{ cursor: "pointer", zIndex: 3 }}
        onClick={() => {
          if (user) handleLogout();
          else navigate("/login");
        }}
        title={user ? "Logout" : "Login"}
      >
        <i
          className={`bi ${user ? "bi-box-arrow-right" : "bi-box-arrow-in-right"} fs-3`}
        ></i>
      </div>

      {/* Main content */}
      <div
        className="text-center text-white position-relative"
        style={{ zIndex: 2 }}
      >
        <h1 className="fw-bold mb-4 display-4">Welcome to Our Project Gallery</h1>
        <p className="fs-5 mb-5">
          Explore our portfolio of architectural and construction excellence
        </p>

        {/* Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="btn btn-outline-light btn-lg px-5 py-2 rounded-pill shadow"
          >
            View Projects
          </button>

          <button
            onClick={() => navigate("/about")}
            className="btn btn-light btn-lg px-5 py-2 rounded-pill shadow text-dark"
          >
            About Us
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="btn btn-outline-light btn-lg px-5 py-2 rounded-pill shadow"
          >
            Contact Us
          </button>
          
          <button
  onClick={() => navigate("/cac")}
  className="btn btn-outline-light btn-lg px-5 py-2 rounded-pill shadow"
>
  View CAC & Achievements
</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;