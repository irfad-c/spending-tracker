import express from "express";
import {
  incomeCalculation,
  getTotalIncome,
} from "../controllers/incomeControllers.js";

const router = express.Router();
router.get("/", getTotalIncome);
router.post("/", incomeCalculation);

export default router;
