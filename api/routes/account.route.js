import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { getAccountDetails } from "../controllers/account.controller.js";

const router = Router();

router.get("/get-account-details", verifyUser, getAccountDetails);

export default router;
