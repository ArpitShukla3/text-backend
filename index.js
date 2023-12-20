import express from "express";
import userRoute from "./Routes/userRoute.js";
import chatRoute from "./Routes/chatRoute.js";
import chatMessages from "./Routes/chatMessages.js";
import cors from "cors";
import dataBaseConnect from "./config/Connection.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
// import { createServer } from 'node:http';
import http from 'http';
const app = express();
app.use(cors({
    origin: "*"
}));
dataBaseConnect();
const PORT = process.env.PORT || 4000;
//socket setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: true
});



io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("join chat", (roomId) => {
        socket.join(roomId);
    });
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
    socket.on("typing", (room) => socket.to(room).emit("typing"));
    socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));
});
//App Setup 
server.listen(PORT, function () {
    console.log("server is listening at port", PORT);
})
app.use(express.json()) // to accept json data
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "working properly"
    })
})
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", chatMessages);
app.use(notFound)
app.use(errorHandler)        
