import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://tmylines-queh.onrender.com/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      localStorage.removeItem("isAuthenticated");
localStorage.removeItem("role");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
