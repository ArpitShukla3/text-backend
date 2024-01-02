import User from "../Models/userModel.js";
import generateToken from "../config/generateToken.js";
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
    try {
        const user = new User({
            name,
            email,
            password,
            pic
        })
        const val = await user.save();
        if (user) {
            return res.status(200).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        }
        else {
            return res.status(400).json({
                success: false,
                error: "failed to create user"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

}
export const loginUser = async (req, res) => {
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
        return res.status(400).json({
            success: false,
            error: "Invalid email or password/Invalid credentials"
        });
    }

}
