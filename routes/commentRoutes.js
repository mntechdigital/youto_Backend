import { Router } from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../Controller/CommentController.js";

const router = Router();

router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
