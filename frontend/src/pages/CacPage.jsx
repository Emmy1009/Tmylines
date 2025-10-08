import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, ShieldCheck, FileText } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const CacPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline-secondary mb-4 d-flex align-items-center"
      >
        <ArrowLeft size={18} className="me-2" /> Back to Home
      </button>

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Corporate Certifications & Achievements</h1>
        <p className="text-muted fs-5">
          Our credentials reflect our commitment to excellence, integrity, and innovation.
        </p>
      </div>

      {/* Certificate Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-3 mb-md-0 text-center">
          <img
            src="/images/certificate.jpg"
            alt="CAC Certificate"
            className="img-fluid rounded shadow border"
            style={{ maxHeight: "400px", objectFit: "contain" }}
            onError={(e) => (e.target.src = "/images/fallback.jpg")}
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-primary fw-semibold mb-3 d-flex align-items-center">
            <ShieldCheck className="me-2 text-success" /> Registered & Certified
          </h3>
          <p className="fs-5 text-secondary">
            TMYLINES CONCEPT is a legally registered architectural firm under the Corporate Affairs Commission (CAC). 
            Our registration affirms our credibility and commitment to professional and ethical business practices.
          </p>
          <p className="text-muted fst-italic">Registration No: RC 8736284</p>
        </div>
      </div>

      <hr className="my-5" />

      {/* Achievements Section */}
      <div>
        <h3 className="text-center mb-4 fw-bold">
          <Award className="me-2 text-warning" /> Our Milestones
        </h3>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 p-4">
              <Award className="text-warning mb-3" size={36} />
              <h5 className="fw-semibold">Best Innovative Firm {new Date().getFullYear()}</h5>
              <p className="text-muted">
                Recognized for cutting-edge architectural designs that blend art, technology, and sustainability.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 p-4">
              <FileText className="text-primary mb-3" size={36} />
              <h5 className="fw-semibold">Over 50 Completed Projects</h5>
              <p className="text-muted">
                Delivered high-quality architectural solutions across residential and commercial developments.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 p-4">
              <ShieldCheck className="text-success mb-3" size={36} />
              <h5 className="fw-semibold">Fully Compliant & Insured</h5>
              <p className="text-muted">
                Our operations meet all local and international safety and environmental standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacPage;