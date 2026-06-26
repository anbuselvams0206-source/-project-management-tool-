const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Get comments for a task
router.get("/:taskId", async (req, res) => {
    try {
        const comments = await Comment.find({
            task: req.params.taskId
        }).populate("user");

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a comment
router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
