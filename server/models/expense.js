import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    selectedExpenseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseVariable = mongoose.model("Expense", expenseSchema);

export default ExpenseVariable;
