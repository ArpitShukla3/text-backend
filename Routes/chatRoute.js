import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup} from "../Controllers/chatController.js";
const router= express.Router();
router.route("/").get();


router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupRemove").put(protect, removeFromGroup);
router.route("/groupAdd").put(protect, addToGroup);

export default router; 