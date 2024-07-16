import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  createFaqForServicer,
  createFaqForUser,
  deleteFaq,
  getFaq,
  getFaqForServicer,
  getFaqForUser,
  updateFaq,
} from "../controllers/faq.controller.js";

const router = Router();

router.post("/new/user", verifyUser, createFaqForUser);
router.post("/new/servicer", verifyUser, createFaqForServicer);
router.get("/user", verifyUser, getFaqForUser);
router.get("/servicer", verifyUser, getFaqForServicer);
router.get("/:id", verifyUser, getFaq);
router.delete("/delete/:id", verifyUser, deleteFaq);
router.patch("/update/:id", verifyUser, updateFaq);

export default router;
