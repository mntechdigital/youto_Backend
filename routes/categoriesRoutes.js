import { Router } from "express";
import { getCategoriesWithoutDuplicate } from "../Controller/CategoriesController.js";

const router = Router()

router.get("/", getCategoriesWithoutDuplicate)

export default router;







