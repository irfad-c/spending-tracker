import express from "express";
import {
  getFullTransaction,
  deleteTransaction,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.get("/", getFullTransaction);
router.delete("/:type/:id", deleteTransaction);

export default router;
