import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/chat-app/message.controller.js";
import { verifyUser } from "../middleware/verifyToken.js";

const router = Router();

router.post("/create/:id", verifyUser, sendMessage);
router.get("/:id", verifyUser, getAllMessages);

export default router;
