import express from "express";
import { getFullTransaction } from "../controllers/transactionControllers.js";

const router = express.Router();

router.get("/", getFullTransaction);

export default router;
