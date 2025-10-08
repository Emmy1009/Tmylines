import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./model/User.js";
import connectDB from "db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear old users (optional)
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);

    const users = [
      {
        name: "Super Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("123456", salt),
        role: "admin",
      },
      {
        name: "Dev Guy",
        email: "dev@example.com",
        password: await bcrypt.hash("123456", salt),
        role: "developer",
      },
      {
        name: "Normal User",
        email: "user@example.com",
        password: await bcrypt.hash("123456", salt),
        role: "user",
      },
    ];

    await User.insertMany(users);

    console.log("✅ Dummy users created!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();