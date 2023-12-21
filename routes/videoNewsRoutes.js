import { Router } from "express";
import {
  createVideoNews,
  deleteVideoNewsById,
  getVideoNews,
  getVideoNewsById,
  updateVideoNewsById,
} from "../Controller/VideoNewsController.js";

const router = Router();

router.post("/", createVideoNews);
router.get("/", getVideoNews);
router.get("/:id", getVideoNewsById);
router.put("/:id", updateVideoNewsById);
router.delete("/:id", deleteVideoNewsById);

export default router;
