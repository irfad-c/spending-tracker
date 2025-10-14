import express from "express";

import {
  getIncomeCategory,
  postIncomeCategory,
  getExpenseCategory,
  postExpenseCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();
router.post("/income", postIncomeCategory);
router.post("/expense", postExpenseCategory);
router.get("/income", getIncomeCategory);
router.get("/expense", getExpenseCategory);
router.delete("/:type/:id", deleteCategory);

export default router;
