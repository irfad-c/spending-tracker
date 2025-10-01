import express from "express";
import {
  incomeCalculation,
  getTotalIncome,
  incomeByCategory,
} from "../controllers/incomeControllers.js";

const router = express.Router();
router.get("/", getTotalIncome);
router.get("/category", incomeByCategory);
router.post("/", incomeCalculation);

export default router;
