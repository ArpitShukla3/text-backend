import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { create, read, terminate, update } from "../Controllers/textController.js";
const router = express.Router();
router.route("/").get(protect, read);
router.route("/").post(protect, update);
router.route("/create").post(protect, create);
router.route("/delete").post(protect, terminate);
export default router;