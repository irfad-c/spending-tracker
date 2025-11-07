import express from "express";

import {
  getIncomeCategory,
  postIncomeCategory,
  getExpenseCategory,
  postExpenseCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/income", postIncomeCategory);
router.post("/expense", postExpenseCategory);
router.get("/income", getIncomeCategory);
router.get("/expense", getExpenseCategory);
router.delete("/:type/:id", deleteCategory);

export default router;
