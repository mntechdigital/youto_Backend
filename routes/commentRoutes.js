import { Router } from "express";
import {
  createComment,
  createReplayComment,
  deleteComment,
  deleteReplayComment,
  getCommentsNewByNewsId,
  getCommentsOldByNewsId,
  updateComment,
  updateReplayComment,
} from "../Controller/CommentController.js";

const router = Router();

router.post("/", createComment);
router.post("/replayComment", createReplayComment);
router.get("/newestComment/:id", getCommentsNewByNewsId);
router.get("/oldestComment/:id", getCommentsOldByNewsId);
router.put("/:id", updateComment);
router.put("/replayComment/:id", updateReplayComment);
router.delete("/:id/:newsId", deleteComment);
router.delete("/replayComment/delete/:id", deleteReplayComment);

export default router;
