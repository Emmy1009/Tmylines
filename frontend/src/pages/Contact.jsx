import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // optional backend POST — if you plan to handle messages
      await axios.post("http://localhost:5000/api/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light position-relative"
      style={{
        backgroundImage: "url('/images/dp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center" />

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      ></div>

      {/* Back to Home Button */}
      <button
        className="btn btn-outline-light position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 d-flex align-items-center gap-2"
        onClick={() => navigate("/")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left-circle"></i> Back to Home
      </button>

      {/* Contact Card */}
      <div
        className="card shadow-lg border-0 p-4 rounded-4 text-dark"
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          zIndex: 2,
        }}
      >
        <h3 className="text-center text-primary fw-bold mb-3">
          Contact TMYLINES
        </h3>
        <p className="text-center text-muted mb-4">
          We’d love to hear from you! Please fill out the form below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Subject</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-chat-dots-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Message subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Message</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-pencil-fill"></i>
              </span>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your message here..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold py-2"
          >
            <i className="bi bi-send-fill me-2"></i> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;