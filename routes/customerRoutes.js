import {Router} from "express"
import { createCustomer } from "../Controller/CustomerController.js";

const router = Router()

router.post("/", createCustomer)
// router.get("/", getAllUsers)
// router.get("/:id", getUserById)
// router.put("/:id", updateUserById)
// router.delete("/:id", deleteUserById)

export default router;