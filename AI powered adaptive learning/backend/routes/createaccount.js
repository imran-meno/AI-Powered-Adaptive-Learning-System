
const express = require('express');
const router = express.Router();

const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user in MongoDB
        await newUser.save();

        res.status(201).json({
            message: "Account created successfully"
        });

    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Account creation failed"
        });
    }
});

module.exports = router;
