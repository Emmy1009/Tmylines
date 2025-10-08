import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, MessageSquare, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        withCredentials: true,
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      toast.error("Unable to get messages");
    }
  };

  // 🗑 Delete message handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`, {
        withCredentials: true,
      });
      toast.success("Message deleted successfully");
      setMessages(messages.filter((msg) => msg.id !== id)); // update UI
    } catch (err) {
      console.error("Failed to delete message:", err);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">📬 Messages</h3>

      {messages.length === 0 ? (
        <p className="text-center text-muted">No messages found.</p>
      ) : (
        <div className="row g-3">
          {messages.map((msg) => (
            <div key={msg.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 h-100 position-relative hover-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title text-primary">
                      <User className="me-2" size={18} />
                      {msg.name}
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(msg.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h6 className="text-muted mb-2">{msg.email}</h6>
                  <p className="fw-semibold">{msg.subject || "No subject"}</p>
                  <p className="text-secondary">
                    {msg.message.length > 80
                      ? msg.message.substring(0, 80) + "..."
                      : msg.message}
                  </p>
                  <small className="text-muted">
                    <MessageSquare size={14} className="me-1" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </small>
                </div>

                {/* Link covers full card (optional, if you want to open message detail) */}
                <Link
                  to={`/admin/messages/${msg.id}`}
                  className="stretched-link text-decoration-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}