import express from "express";
import User from "../model/User.js";
import Project from "../model/Project.js";
import { protect, authorizeRoles, verifyToken, isAdmin, isDeveloper } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------- USERS ------------------- */

// @desc   Get overall dashboard stats
// @route  GET /api/admin/stats
// @access Admin only
router.get("/stats", protect,verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      users: totalUsers,
      projects: totalProjects,
      recentProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Get all users (admin only)
router.get("/users", protect, verifyToken,isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Delete user
router.delete("/users/:id", protect, verifyToken,isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- PROJECTS ------------------- */

// @desc   Get all projects (admin only)
// @route  GET /api/admin/projects
router.get("/projects", protect, verifyToken, isDeveloper, async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email role");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Update a project
// @route  PUT /api/admin/projects/:id
router.put("/projects/:id", protect, verifyToken,isDeveloper, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   Delete a project
// @route  DELETE /api/admin/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "❌ Project not found" });
    }

    await project.destroy();
    res.json({ message: "✅ Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "⚠️ Server error while deleting project" });
  }
});

export default router;