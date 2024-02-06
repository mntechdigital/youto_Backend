import { Router } from "express";
import {
  createAdminUser,
  getAdminUserByEmail,
  getCurrentRoleByEmail,
  getCurrentUserByEmail,
  getCurrentUserIdByEmail,
} from "../Controller/AdminUserController.js";

const router = Router();

router.post("/", createAdminUser);
router.get("/:email", getAdminUserByEmail);
router.get("/role/:email", getCurrentRoleByEmail);
router.get("/id/:email", getCurrentUserIdByEmail);
router.get("/currentUser/:email", getCurrentUserByEmail);

export default router;
