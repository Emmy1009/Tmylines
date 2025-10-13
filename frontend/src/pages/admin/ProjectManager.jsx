import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://tmylines-queh.onrender.com/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast.error("❌ Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to confirm + delete project
  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">
          ⚠️ Are you sure you want to delete this project?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              handleDelete(id);
              toast.dismiss(t.id);
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("✅ Project deleted successfully");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("❌ Failed to delete project. Try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading projects...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-6">Project Management</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-600 truncate">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button className="text-blue-600 hover:underline text-sm">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => confirmDelete(project.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
                <button className="text-purple-600 hover:underline text-sm">
                  🖼️ Add Image
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
