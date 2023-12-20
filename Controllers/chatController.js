import asyncHandler from "express-async-handler"
import Chat from "../Models/chatModel.js";
import User from "../Models/userModel.js";



export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(401);
        throw new Error("UserID param not sent with headers")
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: " name pic email"
    });


    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(`Error:${error.message}`);
        }
    }
}
)

export const fetchChats = asyncHandler(async (req, res) => {
    try {
        const result = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        const updatedResult = await User.populate(result, {
            path: "latestMessage.sender",
            select: "name email pic"
        });
        res.status(200).send(updatedResult);
    } catch (error) {
        res.status(400);
        throw new Error(`Error: ${error.message}`);
    }
})

export const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.users) {
        return res.status(400).send("Name of group and users are missing")
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to create group")
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password");
        res.status(200).send(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(`Error: ${error.message}`);
    }
})

export const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    if (!chatId, !chatName) {
        res.status(400);
        throw new Error(`Error: Enter chatID and chatName`);
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error(`Chat not found`);
    }
    else {
        res.json(updatedChat);
    }
})

export const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        res.status(400);
        throw new Error(`Error: Enter chatID and chatName`);
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error(`Chat not found`);
    }
    else {
        res.json(updatedChat);
    }
})
export const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        res.status(400);
        throw new Error(`Error: Enter chatID and chatName`);
    }
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error(`Chat not found`);
    }
    else {
        res.json(updatedChat);
    }
})