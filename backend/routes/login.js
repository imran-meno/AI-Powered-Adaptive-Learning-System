
const express = require('express');
const router = express.Router();

const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found. Please create an account.'
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Login successful
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Login failed'
        });
    }
});

module.exports = router;
