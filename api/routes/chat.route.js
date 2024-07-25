import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { getAllChats } from "../controllers/chat-app/chat.controller.js";

const router = Router();

router.get("/all", verifyUser, getAllChats);

export default router;
