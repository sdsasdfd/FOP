import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  addNewReview,
  getAllReviews,
} from "../controllers/review.controller.js";

const router = Router();

router.get("/get-all-reviews/:id", verifyUser, getAllReviews);
router.post("/create/:id", verifyUser, addNewReview);

export default router;
