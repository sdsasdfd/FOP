import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { createGig } from "../controllers/gig.controller.js";
const router = Router();

router.post("/create", verifyUser, createGig);

export default router;
