import express from "express";
import {
  expenseCalculation,
  getTotalExpense,
} from "../controllers/expenseControllers.js";

const router = express.Router();

// Fetch total expense
router.get("/", getTotalExpense);

// Add new expense
router.post("/", expenseCalculation);

export default router;
