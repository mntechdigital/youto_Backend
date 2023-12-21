import { Router } from "express";
import { createFeature, deleteAllFeatures, getAllFeatures } from "../Controller/FeaturesController.js";

const router = Router();

router.post("/", createFeature);
router.get("/", getAllFeatures)
// router.get("/:id", getUserById)
// router.put("/:id", updateUserById)
// router.delete("/:id", deleteUserById)
router.delete("/", deleteAllFeatures)

export default router;
