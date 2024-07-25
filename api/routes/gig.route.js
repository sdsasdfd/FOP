import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { createGig, getGig, updateGig } from "../controllers/gig.controller.js";

const router = Router();
router.post("/create", verifyUser, createGig);
router.get("/:id", verifyUser, getGig);
router.patch("/update-gig", verifyUser, updateGig);

export default router;
