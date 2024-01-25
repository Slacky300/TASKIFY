const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    try {
        const {
            username,
            email,
            password
        } = req.body;
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) return res.status(400).json({
            message: `User with email ${email} already exists`
        });
        const doesUsernameExists = await User.findOne({
            username
        });
        if (doesUsernameExists) return res.status(400).json({
            message: `Username ${username} already exists`
        });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            username,
        });
        res.status(201).json({
            user: result,
            message: `Congratulations ${username}, your account has been created successfully`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


const login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;
        const existingUser = await User.findOne({
            email
        });
        if (!existingUser) return res.status(404).json({
            message: "User doesn't exist"
        });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({
            message: "Invalid credentials"
        });
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({
            user: existingUser,
            token: token,
            message: "Logged in successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

module.exports = {
    register,
    login
}