import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://tmylines-queh.onrender.com/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Projects</h1>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project._id}>
            <div className="card shadow-sm h-100">
              {project.images?.length > 0 && (
                <img
                  src={`http://localhost:5000${project.images[0]}`}
                  alt={project.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text text-muted">
                  {project.description?.slice(0, 80)}...
                </p>
                <Link
                  to={`/projects/${project._id}`}
                  className="btn btn-primary"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-muted">No projects available yet.</p>
        )}
      </div>
    </div>
  );
}
