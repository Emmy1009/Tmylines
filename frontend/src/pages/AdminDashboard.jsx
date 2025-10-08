import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import ProjectManager from "./admin/ProjectManager.jsx";
import UserManager from "./admin/UserManager.jsx";
import Stats from "./admin/Stats.jsx";
import AddProject from "./admin/AddProject.jsx";
import LogoutButton from "../component/LogoutButton.jsx";
import Messages from "./admin/Messages.jsx";
import MessageDetail from "./admin/MessageDetail.jsx"; // ✅ Import this

export default function AdminDashboard() {
  const [active, setActive] = useState("stats");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
        style={{ minHeight: "100vh", width: "240px" }}
      >
        <div>
          <h4 className="mb-4 text-center">TMYLINES</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link
                className={`nav-link text-white ${active === "stats" && "fw-bold"}`}
                to="/admin/stats"
                onClick={() => setActive("stats")}
              >
                📊 Stats
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className={`nav-link text-white ${active === "projects" && "fw-bold"}`}
                to="/admin/projects"
                onClick={() => setActive("projects")}
              >
                🏗 Projects
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className={`nav-link text-white ${active === "add" && "fw-bold"}`}
                to="/admin/projects/add"
                onClick={() => setActive("add")}
              >
                ➕ Add Project
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className={`nav-link text-white ${active === "users" && "fw-bold"}`}
                to="/admin/users"
                onClick={() => setActive("users")}
              >
                👥 Users
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className={`nav-link text-white ${active === "messages" && "fw-bold"}`}
                to="/admin/messages"
                onClick={() => setActive("messages")}
              >
                📬 Messages
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <div className="mb-4">
          <h2>
            Welcome {user ? user.email : "Admin"}{" "}
            <small className="text-muted">({user?.role})</small>
          </h2>
          <hr />
        </div>

        {/* ✅ All routes correctly placed */}
        <Routes>
          <Route path="/stats" element={<Stats />} />
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/users" element={<UserManager />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<MessageDetail />} /> {/* ✅ single message */}
        </Routes>
      </div>
    </div>
  );
}