import {
  getAllMessageRequests,
  getAllMessageRequestsForAdmin,
  getStatusOfRequest,
  sendMessageRequest,
  sendResponseOfMessageRequest,
} from "../controllers/messageRequest.controller.js";
import express from "express";
import { verifyUser } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/send-request/:id", verifyUser, sendMessageRequest);
router.patch("/send-response/:id", verifyUser, sendResponseOfMessageRequest);
router.get("/get-all-requests", verifyUser, getAllMessageRequests);
router.get("/status/:id", verifyUser, getStatusOfRequest);
router.get(
  "/get-all-requests-for-admin",
  verifyUser,
  getAllMessageRequestsForAdmin
);

export default router;
