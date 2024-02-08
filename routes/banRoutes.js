import { Router } from "express";
import { createBan } from "../Controller/BanController.js";

const router = Router();

router.post("/", createBan);

export default router;
