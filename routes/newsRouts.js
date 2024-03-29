import { Router } from "express";
import {
  createNews,
  decrementLikeCount,
  deleteNewsById,
  getAllNews,
  getAllNewsByCategory,
  getLatestNews,
  getNewsAll,
  getNewsAllWithPagination,
  getNewsAllWithPaginationInDashboard,
  getNewsByCategory,
  getNewsById,
  getSportNews,
  getTopNews,
  getTopNewsByCategoryWithPagination,
  incrementLikeCount,
  updateNewsById,
} from "../Controller/NewsController.js";

const router = Router();

router.post("/", createNews);
router.get("/", getAllNews);
router.get("/all", getNewsAll);
router.get("/sportsNews", getSportNews);
router.get("/topNews", getTopNews);
router.get(
  "/topNewsPagination/:customerId",
  getTopNewsByCategoryWithPagination
);
router.get("/allCategoryNews/:id/:customerId", getAllNewsByCategory);
router.get(
  "/allNewsWithPaginationInDashboard",
  getNewsAllWithPaginationInDashboard
);
router.get("/allPagination/:id", getNewsAllWithPagination);
router.get("/recentNews", getLatestNews);
router.get("/:id", getNewsById);
router.get("/categories/:id/:category", getNewsByCategory);
router.put("/:id", updateNewsById);
router.put("/incrementLikes/:id", incrementLikeCount);
router.put("/decrementLikes/:id", decrementLikeCount);
router.delete("/:id", deleteNewsById);

export default router;
