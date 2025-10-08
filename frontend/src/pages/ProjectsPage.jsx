// src/pages/ProjectPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // 🧠 Get user role from localStorage (if available)
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        console.log("Fetched projects:", res.data);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // 🔙 Handle back button
  const handleBack = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">📂 Our Projects</h2>

      <div className="row g-4 mb-5">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card shadow-sm h-100 rounded-3 border-0 hover-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card-img-top rounded-top"
                    style={{ height: "220px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-semibold">
                      {project.title}
                    </h5>
                    <p className="card-text text-muted">
                      {project.description && project.description.length > 100
                        ? project.description.substring(0, 100) + "..."
                        : project.description}
                    </p>
                    <span className="badge bg-secondary">{project.year}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No projects available.</p>
        )}
      </div>

      {/* ✅ Back Button */}
      <div className="text-center mt-4">
        <button
          className={`btn ${
            isAdmin ? "btn-outline-danger" : "btn-outline-primary"
          } px-4 py-2 fs-5 rounded-pill shadow-sm`}
          onClick={handleBack}
        >
          <i
            className={`bi ${
              isAdmin ? "bi-speedometer2" : "bi-arrow-left-circle"
            } me-2`}
          ></i>
          {isAdmin ? "Back to Dashboard" : "Back to Home"}
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;