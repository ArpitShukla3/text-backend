import User from "../Models/userModel.js";
import generateToken from "../config/generateToken.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
export const registerUser = async (req, res) => {

    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        return res.status(404).json({
            success: false,
            message: "all fields are compulsory"
        })
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(402).json({
            success: false,
            message: "User already exists"
        })
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    if (user) {
        return res.status(200).json({
            success: true,
            _id: User._id,
            name: User.name,
            email: User.email,
            pic: User.pic,
            token: generateToken(user._id)
        })
    }
    else {
        throw new Error("failed to create the user")
    }
}
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        throw new Error("Invalid Email or Password")
    }

})
export const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: new RegExp(req.query.search, 'i') } },
            { email: { $regex: new RegExp(req.query.search, 'i') } }
        ]
    } : {};
    try {
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        return res.status(200).json({
            success: true,
            results: users
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            results: error.message
        })
    }

}) 