import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2, Mail, User, MessageSquare } from "lucide-react";

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      const res = await axios.get(`https://tmylines-queh.onrender.com/api/contact/${id}`, {
        withCredentials: true,
      });
      setMessage(res.data);
    } catch (err) {
      console.error("Failed to fetch message:", err);
      toast.error("Unable to fetch message details");
    }
  };

  // 🗑 Delete message
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        withCredentials: true,
      });
      toast.success("Message deleted successfully");
      navigate("/admin/messages");
    } catch (err) {
      console.error("Failed to delete message:", err);
      toast.error("Failed to delete message");
    }
  };

  if (!message) {
    return (
      <div className="text-center mt-5">
        <p className="text-muted">Loading message details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin/messages" className="btn btn-outline-secondary d-flex align-items-center">
          <ArrowLeft size={18} className="me-2" /> Back to Messages
        </Link>

        <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleDelete}>
          <Trash2 size={18} className="me-2" /> Delete
        </button>
      </div>

      {/* Message Card */}
      <div className="card shadow-sm border-0 p-4">
        <div className="mb-3">
          <h4 className="text-primary d-flex align-items-center">
            <User className="me-2" /> {message.name}
          </h4>
          <p className="text-muted d-flex align-items-center">
            <Mail className="me-2" size={16} /> {message.email}
          </p>
        </div>

        <hr />

        <div>
          <h5 className="fw-bold d-flex align-items-center mb-2">
            <MessageSquare className="me-2" /> {message.subject || "No Subject"}
          </h5>
          <p className="fs-5">{message.message}</p>
        </div>

        <hr />

        <small className="text-muted">
          Sent on: {new Date(message.createdAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
