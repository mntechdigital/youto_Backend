import { Router } from "express";
import { createRole, getAllRoles} from "../Controller/RoleController.js";

const router = Router();

router.post("/", createRole);
router.get("/", getAllRoles)
// router.get("/:id", getUserById)
// router.put("/:id", updateUserById)
// router.delete("/:id", deleteUserById)

export default router;
