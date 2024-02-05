import { Router } from "express";
import { createBookmark, deleteBookmark, getBookmarks } from "../Controller/BookmarkController.js";
const router = Router();

router.post("/", createBookmark)
router.get("/:id", getBookmarks)
router.delete("/:id/:newsId", deleteBookmark)

export default router;

