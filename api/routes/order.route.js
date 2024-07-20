import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { orderCompleted } from "../controllers/order.controller.js";

const router = Router();

router.post("/complete-order/:id", verifyUser, orderCompleted);

export default router;
