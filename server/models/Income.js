import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    selectedIncomeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "income",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const IncomeVariable =
  mongoose.models.Income || mongoose.model("Income", incomeSchema);
export default IncomeVariable;


