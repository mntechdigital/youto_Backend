import { Router } from "express";
import { createAdminUser, getAdminUserByEmail } from "../Controller/AdminUserController.js";

const router = Router();

router.post("/", createAdminUser);
router.get("/:email", getAdminUserByEmail)

export default router;
