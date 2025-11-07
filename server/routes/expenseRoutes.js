import express from "express";
import {
  postExpenseCalculation,
  getTotalExpense,
  getExpenseByCategory,
} from "../controllers/expenseControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
/*For every route that comes after this line, run authMiddleware first.
That means every request hitting this router will automatically be checked for authentication before it reaches your actual route handler*/
router.use(authMiddleware);

// Fetch total expense
router.get("/", getTotalExpense);

// Add new expense
router.post("/", postExpenseCalculation);
router.get("/category", getExpenseByCategory);
export default router;
