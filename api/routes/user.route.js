import { Router } from "express";
import {
  deleteServicer,
  deleteUser,
  getLocationCategory,
  getServicers,
  getUsers,
  user,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyToken.js";

const router = Router();

router.get("/user", verifyUser, user);
router.get("/get-location-category", verifyUser, getLocationCategory);
router.get("/get-users", verifyUser, getUsers);
router.get("/get-servicers", verifyUser, getServicers);
router.delete("/delete/:id", verifyUser, deleteUser);
router.delete("/delete/:id", verifyUser, deleteServicer);

export default router;
