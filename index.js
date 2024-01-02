import express from "express";
import userRoute from "./Routes/userRoute.js";
import textEditorRoutes from "./Routes/textEditorRoutes.js"
import cors from "cors";
import dataBaseConnect from "./config/Connection.js";
const app = express();
app.use(cors({
    origin: "*"
}));
dataBaseConnect();
const PORT = process.env.PORT || 4000;

//App Setup 
app.listen(PORT, function () {
    console.log("server is listening at port", PORT);
})
app.use(express.json()) // to accept json data
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "working properly"
    })
})
app.use("/user", userRoute);
app.use("/edit", textEditorRoutes);
