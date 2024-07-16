import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  generatePaymentSlip,
  makePayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/make-payment/:id", verifyUser, makePayment);
router.get("/generate-slip/:id", verifyUser, generatePaymentSlip);

export default router;
