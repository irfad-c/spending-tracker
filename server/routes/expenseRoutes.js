import express from "express";
import {
  postExpenseCalculation,
  getTotalExpense,
  getExpenseByCategory
} from "../controllers/expenseControllers.js";

const router = express.Router();

// Fetch total expense
router.get("/", getTotalExpense);

// Add new expense
router.post("/", postExpenseCalculation);
router.get("/category", getExpenseByCategory);
export default router;
