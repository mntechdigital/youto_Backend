import { Router } from "express";
import { createReport } from "../Controller/ReportController.js";

const router = Router();

router.post("/", createReport);

export default router;
