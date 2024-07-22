import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  getAllTransactionRecords,
  getTransactionRecord,
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/get-transaction-history", verifyUser, getTransactionRecord);
router.get(
  "/get-transaction-history-for-admin",
  verifyUser,
  getAllTransactionRecords
);

export default router;
