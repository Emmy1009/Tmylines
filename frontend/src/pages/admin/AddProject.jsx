import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  // ✅ Convert file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
      setPreview(reader.result); // show preview
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://tmylines-queh.onrender.com/api/projects/add", {
        title,
        description,
        location,
        year,
        image,
      });

      toast.success(res.data.message);

      // reset fields
      setTitle("");
      setDescription("");
      setLocation("");
      setYear("");
      setImage("");
      setPreview(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add project");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h3 className="mb-4 text-center text-primary">➕ Add New Project</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Project Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter project location"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter year"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Project Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {preview && (
                <div className="mt-3 text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold py-2 mt-3"
            >
              🚀 Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
