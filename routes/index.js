import { Router } from "express";
import CustomerRoutes from "./customerRoutes.js";
import FeatureRoutes from "./featuresRoutes.js";
import RoleRoutes from "./roleRoutes.js";
import AdminUserRoutes from "./adminUserRoutes.js";
import NewsRoutes from "./newsRouts.js";
import CommentRoutes from "./commentRoutes.js";
import VideoNewsRoutes from "./videoNewsRoutes.js";
import AdvertisementRoutes from "./advertisementRoutes.js";
import CategoriesRoutes from "./categoriesRoutes.js";
import BookMarkRoutes from "./bookmarkRoutes.js";

const router = Router();

router.use("/api/customer", CustomerRoutes);
router.use("/api/features", FeatureRoutes);
router.use("/api/role", RoleRoutes);
router.use("/api/adminUser", AdminUserRoutes);
router.use("/api/news", NewsRoutes);
router.use("/api/comment", CommentRoutes);
router.use("/api/videoNews", VideoNewsRoutes);
router.use("/api/advertisement", AdvertisementRoutes);
router.use("/api/categories", CategoriesRoutes);
router.use("/api/bookmarks", BookMarkRoutes);

export default router;
