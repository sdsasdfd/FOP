import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  getCompletedOrder,
  orderCompleted,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/complete-order/:id", verifyUser, orderCompleted);
router.get("/get-completed-order/:id", verifyUser, getCompletedOrder);
export default router;
