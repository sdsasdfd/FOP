import express from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import {
  getGeneralComplain,
  getServicerComplain,
  giveResponse,
  makeComplainForServicer,
  makeGeneralComplain,
} from "../controllers/complain.controller.js";

const router = express.Router();

router.post("/make/:id", verifyUser, makeComplainForServicer);
router.post("/make-general", verifyUser, makeGeneralComplain);
router.get("/get-servicer-complains", verifyUser, getServicerComplain);
router.get("/get-general-complains", verifyUser, getGeneralComplain);
router.post("/res/:id", verifyUser, giveResponse);

export default router;
