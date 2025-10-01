import express from "express";
import {
  expenseCalculation,
  getTotalExpense,
  expenseByCategory
} from "../controllers/expenseControllers.js";

const router = express.Router();

// Fetch total expense
router.get("/", getTotalExpense);

// Add new expense
router.post("/", expenseCalculation);
router.get("/category", expenseByCategory);
export default router;
