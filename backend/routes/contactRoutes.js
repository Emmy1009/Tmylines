import express from "express";
import { ContactMessage } from "../model/contactMessage.js"; // ✅ Import your Sequelize model

const router = express.Router();

// 📨 POST /api/contact
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ message: "All required fields must be filled" });
        }

        // ✅ Create message via Sequelize
        const newMessage = await ContactMessage.create({
            name,
            email,
            subject: subject || "No subject",
            message
        });

        res.status(201).json({
            message: "Message submitted successfully",
            data: newMessage
        });
    } catch (error) {
        console.error("❌ Error saving contact message:", error);
        res.status(500).json({ message: "Server error while saving message" });
    }
});

// 🧾 GET /api/contact - Get all messages
router.get("/", async (req, res) => {
    try {
        const messages = await ContactMessage.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.json(messages);
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ message: "Failed to retrieve messages" });
    }
});

// 🧩 GET /api/contact/:id - Get a single message by ID
router.get("/:id", async (req, res) => {
    try {
        const message = await ContactMessage.findByPk(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        console.error("❌ Error fetching message:", error);
        res.status(500).json({ message: "Failed to fetch message" });
    }
});

// ❌ DELETE /api/contact/:id - Delete a message
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await ContactMessage.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting message:", error);
        res.status(500).json({ message: "Failed to delete message" });
    }
});

export default router;
