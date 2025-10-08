import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsPage from "./pages/ProjectsPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CacPage from "./pages/CacPage.jsx";


// Get user role from localStorage (set on login)
function getUserRole() {
  return localStorage.getItem("role"); // "admin", "developer", or null
}

// Protect admin routes
function AdminRoute({ children }) {
  const role = getUserRole();
  if (role !== "admin" && role !== "developer") {
    return <Navigate to="/projects" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/cac" element={<CacPage />} />
        {/* Protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </Router>
  );
}