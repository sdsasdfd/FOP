import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/chat-app/message.controller.js";
import { verifyUser } from "../middleware/verifyToken.js";
import { getLastMessage } from "../controllers/chat-app/message.controller.js";

const router = Router();

router.post("/create/:id", verifyUser, sendMessage);
router.get("/:id", verifyUser, getAllMessages);
router.get("/last/:id", verifyUser, getLastMessage);

export default router;
