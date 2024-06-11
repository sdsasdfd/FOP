import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getCategoryName,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/names", getCategoryName);
router.post("/create", verifyUser, createCategory);
router.get("/all-category", getAllCategory);
router.delete("/delete/:id", verifyUser, deleteCategory);
router.post("/update/:id", verifyUser, updateCategory);
router.get("/:id", verifyUser, getCategory);

export default router;
