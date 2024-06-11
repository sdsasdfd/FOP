import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { createGig, getGig } from "../controllers/gig.controller.js";
const router = Router();

router.post("/create", verifyUser, createGig);
router.get("/:id", verifyUser, getGig);

export default router;
