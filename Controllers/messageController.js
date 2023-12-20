import asyncHandler from "express-async-handler"
import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";
import chat from "../Models/chatModel.js";
export const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(401)
        throw new Error("All fields are compulsory")
    }
    var newmessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {

        let message = await Message.create(newmessage);
        message = await message.populate("sender", "name email pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: ' name pic email'
        });
        await chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})
export const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email pic")
            .populate("chat");
        res.json({
            messages
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})