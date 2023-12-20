import express from "express";
import { loginUser, registerUser } from "../Controllers/userController.js";
import { allUsers } from "../Controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.route("/").get(protect,allUsers)
export default router;        