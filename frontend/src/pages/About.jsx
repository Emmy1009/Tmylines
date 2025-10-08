import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page bg-light text-dark py-5">
      {/* Hero Section */}
      <section
        className="text-center text-white py-5 mb-5"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgndxqj9u/image/upload/v1723541123/projects/sample-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold mb-3">About Tmylines</h1>
          <p className="lead mb-0">
            Redefining architectural excellence through creativity, precision, and sustainability.
          </p>
        </div>
      </section>

      {/* Company Info Section */}
      <div className="container">
        <div className="mb-5 text-center">
          <h2 className="fw-bold mb-3">Company Profile</h2>
          <p className="text-muted fs-5">
            Tmylines is an innovative architectural firm dedicated to redefining spaces through creativity, precision, 
            and sustainable design. We believe that every line drawn is the foundation of a vision — one that transforms 
            ideas into functional and timeless structures.
          </p>
        </div>

        {/* Focus & Mission Section */}
        <div className="row g-5 align-items-center mb-5">
          <div className="col-md-6">
            <h3 className="fw-bold">Our Focus</h3>
            <p className="text-muted">
              We specialize in delivering high-quality architectural and design solutions across residential, commercial, 
              and public projects. With a balance of aesthetics, functionality, and environmental responsibility, Tmylines 
              brings modern architecture to life while preserving cultural and contextual relevance.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/images/dp.jpg"
              alt="Our Focus"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded h-100">
              <h4 className="fw-bold text-primary mb-3">Our Mission</h4>
              <p>
                To design and deliver architectural projects that enhance human experience, reflect excellence, and contribute 
                to the sustainable development of communities.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm rounded h-100">
              <h4 className="fw-bold text-primary mb-3">Our Vision</h4>
              <p>
                To be a leading architectural company recognized for innovation, quality, and integrity in creating iconic and 
                enduring spaces.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-5">
          <h3 className="fw-bold text-center mb-4">Our Core Values</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {[
              { title: "Innovation", text: "Pushing creative boundaries to design unique spaces." },
              { title: "Excellence", text: "Commitment to precision and quality in every project." },
              { title: "Sustainability", text: "Designing with responsibility to the environment and future generations." },
              { title: "Integrity", text: "Building trust through transparency and professionalism." },
              { title: "Client-Centric Approach", text: "Placing our clients’ needs and satisfaction at the heart of every design." },
            ].map((value, idx) => (
              <div key={idx} className="col">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h5 className="fw-bold text-primary mb-2">{value.title}</h5>
                  <p className="text-muted">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-5">
          <h3 className="fw-bold text-center mb-4">Our Services</h3>
          <ul className="list-group list-group-flush shadow-sm rounded">
            {[
              "Architectural Design & Consultancy",
              "Interior Design & Space Planning",
              "3D Visualization & Rendering",
              "Project Supervision & Management",
              "Landscape Design",
            ].map((service, idx) => (
              <li key={idx} className="list-group-item fs-5 py-3">
                <i className="bi bi-check-circle-fill text-primary me-2"></i> {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-5">
          <h3 className="fw-bold mb-3">Why Choose Us</h3>
          <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "900px" }}>
            At Tmylines, we combine creativity with technical expertise to produce architectural solutions 
            that are both functional and visually compelling. Our dedication to excellence ensures that every 
            project reflects our clients’ vision while adding long-term value.
          </p>
        </div>

        {/* ✅ Back to Home Button */}
        <div className="text-center mt-5">
          <button
            className="btn btn-primary px-4 py-2 fs-5 rounded-pill shadow-sm"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;