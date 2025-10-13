import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
 import adminRoute from "./routes/adminRoute.js";
 import authRoute from "./routes/authRoutes.js";
 import projectRoute from "./routes/projectRoute.js";
 import contactRoutes from "./routes/contactRoutes.js";
import cookieParser from "cookie-parser";
import sequelize from "./db.js";
import User from "./model/User.js"
import Project from "./model/Project.js"

dotenv.config();
const app = express();

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173","https://tmylines-queh.onrender.com"],
        credentials: true
    })
);
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb"}));
app.use(cookieParser());

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Test route
app.use("/uploads", express.static(path.join(__dirname,"uploads")
)); // serve images
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
 app.use("/api/projects", projectRoute);
 app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => {
    res.send("✅ Backend API is running...");
});

// Start server
const PORT = process.env.PORT || 5000

sequelize.authenticate()
  .then(() => console.log("✅ MySQL Connected"))
  .catch(err => console.error("❌ DB Error:", err));

sequelize.sync({ alter: true }) // create/update tables
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
