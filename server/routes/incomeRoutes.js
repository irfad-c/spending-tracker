import express from "express";
import {
  postIncomeCalculation,
  getTotalIncome,
  getIncomeByCategory,
} from "../controllers/incomeControllers.js";

const router = express.Router();

//here /api/income or /api/income/ will give getTotalIncome (GET request)
router.get("/", getTotalIncome);
router.get("/category", getIncomeByCategory);
router.post("/", postIncomeCalculation);

export default router;
