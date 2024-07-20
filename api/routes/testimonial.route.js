import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  addNewTestimonial,
  getAllTestimonials,
} from "../controllers/testimonial.controller.js";

const router = Router();
router.post("/add-new-testimonial", verifyUser, addNewTestimonial);
router.get("/get-all-testimonials", getAllTestimonials);

export default router;
