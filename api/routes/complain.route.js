import express from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  deleteComplain,
  getServicerComplain,
  getTestimonials,
  giveResponse,
  makeComplainForServicer,
  testimonialFromUser,
} from "../controllers/complain.controller.js";

const router = express.Router();

router.post("/make/:id", verifyUser, makeComplainForServicer);
router.post("/make-general", verifyUser, testimonialFromUser);
router.get("/get-servicer-complains", verifyUser, getServicerComplain);
router.get("/get-general-complains", getTestimonials);
router.post("/res/:id", verifyUser, giveResponse);
router.delete("/delete/:id", verifyUser, deleteComplain);

export default router;
