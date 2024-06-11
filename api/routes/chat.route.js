import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  createChat,
  getAllChats,
} from "../controllers/chat-app/chat.controller.js";

const router = Router();

router.get("/:id", verifyUser, getAllChats);
router.post("/create/:id", verifyUser, createChat);

export default router;
