import express from "express";
import {
  addTransaction,
  getTransactions,
  getSummary,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/summary", getSummary);

export default router;
