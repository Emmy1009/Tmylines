import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, Image, Layers, Calendar } from "lucide-react";

const Stat = () => {
  const [stats, setStats] = useState({
    projects: 0,
    images: 0,
    categories: 0,
    recentYear: new Date().getFullYear(),
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        const data = res.data;

        setStats({
          projects: data.length,
          images: data.length * 3, // adjust when image data is real
          categories: new Set(data.map((p) => p.category)).size || 1,
          recentYear:
            data.length > 0
              ? Math.max(...data.map((p) => parseInt(p.year) || 0))
              : new Date().getFullYear(),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-semibold text-center">Dashboard Overview</h1>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Total Projects"
            value={stats.projects}
            icon={<Layers size={36} color="#0d6efd" />}
            bg="primary"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Images Uploaded"
            value={stats.images}
            icon={<Image size={36} color="#198754" />}
            bg="success"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={<BarChart3 size={36} color="#fd7e14" />}
            bg="warning"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Most Recent Year"
            value={stats.recentYear}
            icon={<Calendar size={36} color="#6f42c1" />}
            bg="info"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg }) => {
  return (
    <div className={`card border-0 shadow-sm text-${bg}`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="card-title text-muted">{title}</h6>
          <h3 className="fw-bold mb-0">{value}</h3>
        </div>
        <div
          className={`d-flex align-items-center justify-content-center bg-${bg}-subtle rounded-circle p-3`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Stat;