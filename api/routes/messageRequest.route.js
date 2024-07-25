import {
  getAllMessageRequestsForAdmin,
  getAllMessageRequestsForServicer,
  getAllMessageRequestsForUser,
  getStatusOfRequest,
  sendMessageRequest,
  sendResponseOfMessageRequest,
} from "../controllers/messageRequest.controller.js";
import express from "express";
import { verifyUser } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/send-request/:id", verifyUser, sendMessageRequest);
router.patch("/send-response/:id", verifyUser, sendResponseOfMessageRequest);

router.get(
  "/get-requests-servicer",
  verifyUser,
  getAllMessageRequestsForServicer
);
router.get("/get-requests-user", verifyUser, getAllMessageRequestsForUser);
router.get("/status/:id", verifyUser, getStatusOfRequest);
router.get(
  "/get-all-requests-for-admin",
  verifyUser,
  getAllMessageRequestsForAdmin
);

export default router;
