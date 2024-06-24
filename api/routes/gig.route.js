import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { createGig, getGig, updateGig } from "../controllers/gig.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();
router.post("/create", verifyUser, upload.single("coverImg"), createGig);
router.get("/:id", verifyUser, getGig);
router.patch("/update-gig", verifyUser, upload.single("coverImg"), updateGig);

export default router;
