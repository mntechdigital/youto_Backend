import { Router } from "express";
import {
  createAdminUser,
  getAdminUserByEmail,
  getCurrentRoleByEmail,
  getCurrentUserIdByEmail,
} from "../Controller/AdminUserController.js";

const router = Router();

router.post("/", createAdminUser);
router.get("/:email", getAdminUserByEmail);
router.get("/role/:email", getCurrentRoleByEmail);
router.get("/id/:email", getCurrentUserIdByEmail);

export default router;
