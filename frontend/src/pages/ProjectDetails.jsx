import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`https://tmylines-queh.onrender.com/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center relative">
      <div className="w-full max-w-md pb-24">
        {/* Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Small Image */}
          <div className="flex justify-center p-4">
            <img
              src={project.image}
              alt={project.title}
              className="w-100 h-[180px] object-cover rounded-md"
            />
          </div>

          {/* Text Info */}
          <div className="p-4">
            <h1 className="text-lg font-bold text-gray-900">{project.title}</h1>
            <p className="mt-1 text-sm text-gray-500 italic">
              {project.location} • {project.year}
            </p>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Full-width Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Link
          to="/projects"
          className="block text-center w-full px-6 py-4 text-base font-semibold text-red-700 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all"
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
