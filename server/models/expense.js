import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expenseCategory: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseVariable = mongoose.model("Expense", expenseSchema);

export default ExpenseVariable;
