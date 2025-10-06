import express from "express";
import {
  incomeCalculation,
  getTotalIncome,
  incomeByCategory,
} from "../controllers/incomeControllers.js";

const router = express.Router();

//here /api/income or /api/income/ will give getTotalIncome (GET request)
router.get("/", getTotalIncome);
router.get("/category", incomeByCategory);
router.post("/", incomeCalculation);

export default router;
