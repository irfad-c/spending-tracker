import express from "express";
import {
  getFullTransaction,
  deleteTransaction,
} from "../controllers/transactionControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getFullTransaction);
router.delete("/:type/:id", deleteTransaction);

export default router;
