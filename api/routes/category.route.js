import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.post("/create", verifyUser, createCategory);
router.get("/all-category", verifyUser, getAllCategory);
router.delete("/delete/:id", verifyUser, deleteCategory);
router.post("/update/:id", verifyUser, updateCategory);
router.get("/:id", verifyUser, getCategory);

export default router;
