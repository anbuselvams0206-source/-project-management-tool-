const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Login User
router.post("/login", async (req, res) => {
    res.json({
        message: "Login API working"
    });
});

module.exports = router;
