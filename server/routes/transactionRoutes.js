import express from "express";
import {
  addTransaction,
  getTransactions,
  getSummary,
} from "../controllers/transactionController.js";

const router = express.Router();
// @route   POST /api/transactions
router.post("/", addTransaction);
// @route   GET /api/transactions
router.get("/", getTransactions);
// @route   GET /api/transactions/summary
router.get("/summary", getSummary);

/*export default → you can import with any name.
export { something } → you must use the same name (or alias with as).
Example
export const router = express.Router();
import { router } from "./routes/transactionRoutes.js";
Here we cant change the {router}
*/
export default router;
