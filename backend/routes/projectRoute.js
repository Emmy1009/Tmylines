import express from "express";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import Project from "../model/Project.js"; // Sequelize model for `projects`
import db from "../db.js"

const router = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Add new project
router.post("/add", async (req, res) => {
  try {
    const { title, description, location, year, image } = req.body;

    if (!title || !description || !location || !year || !image) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }

    // ✅ Upload Base64 image to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "projects",
    });

    console.log("✅ Cloudinary upload success:", uploadRes.secure_url);

    // ✅ Save to DB using Sequelize
    const newProject = await Project.create({
      title,
      description,
      location,
      year,
      image: uploadRes.secure_url,
    });

    res.json({
      message: "✅ Project added successfully",
      project: newProject,
    });
  } catch (err) {
    console.error("❌ Error adding project:", err);
    res.status(500).json({ message: "Failed to add project", error: err.message });
  }
});

// ✅ Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [["createdAt", "DESC"]] });
    res.json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Get single project by ID
// Get single project
router.get("/:id", async (req, res) => {
  console.log("Oya na let us delete")
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete project by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🪓 Delete request ID:", id);

  try {
    // 1️⃣ Find the project
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2️⃣ Extract Cloudinary public_id
    const imageUrl = project.image;
    const parts = imageUrl.split("/");
    const publicIdWithExt = parts.slice(-2).join("/"); // e.g., "projects/abc123.jpg"
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove extension

    // 3️⃣ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 4️⃣ Delete from DB
    await project.destroy();

    res.json({ message: "✅ Project deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

// Get statistics
router.get("/stats", async (req, res) => {
  try {
    const totalProjects = await Project.count();

    // Since each project has 1 image (stored in Cloudinary URL)
    const totalImages = totalProjects;

    const latestProject = await Project.findOne({
      order: [["year", "DESC"]],
    });

    res.json({
      totalProjects,
      totalImages,
      latestYear: latestProject ? latestProject.year : null,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;