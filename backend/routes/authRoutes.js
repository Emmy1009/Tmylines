import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken"
import {protect,verifyToken} from "../middleware/authMiddleware.js"

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // defaults to "user"
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    console.log(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // 4. Store in cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // change to true in production (with HTTPS)
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log(user)
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Get current user

router.get("/me", verifyToken, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      role: req.user.role,
      email: req.user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
});

export default router;