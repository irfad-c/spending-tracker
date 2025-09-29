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

// "Expense" → model name, MongoDB will create "expenses" collection
const ExpenseVariable = mongoose.model("Expense", expenseSchema);

export default ExpenseVariable;
