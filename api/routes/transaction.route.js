import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { getTransactionRecord } from "../controllers/transaction.controller.js";

const router = Router();

router.get("/get-transaction-history", verifyUser, getTransactionRecord);

export default router;
