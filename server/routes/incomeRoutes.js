import express from "express";
import {
  postIncomeCalculation,
  getTotalIncome,
  getIncomeByCategory,
} from "../controllers/incomeControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

//here /api/income or /api/income/ will give getTotalIncome (GET request)
router.get("/", getTotalIncome);
router.get("/category", getIncomeByCategory);
router.post("/", postIncomeCalculation);

export default router;
