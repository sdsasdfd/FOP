import { Router } from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  getServiceName,
  updateService,
} from "../controllers/service.controller.js";

const router = Router();

router.get("/names", getServiceName);
router.post("/create", verifyUser, createService);
router.get("/all-services", getAllServices);
router.delete("/delete/:id", verifyUser, deleteService);
router.post("/update/:id", verifyUser, updateService);
router.get("/:id", verifyUser, getService);

export default router;
