import { Router } from "express";
import {
  createCustomer,
  getCategoriesNameWithoutDuplicateByCustomerId,
  getCustomerById,
} from "../Controller/CustomerController.js";

const router = Router();

router.post("/", createCustomer);
// router.get("/", getAllUsers)
router.get("/:id", getCustomerById);
router.get(
  "/forCategoriesNames/:id",
  getCategoriesNameWithoutDuplicateByCustomerId
);
// router.put("/:id", updateUserById)
// router.delete("/:id", deleteUserById)

export default router;
