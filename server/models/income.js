import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    incomeCategory: {
      type: String,
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
//"Income" → the model name you chose.
//IncomeVariable - This is the variable you use in your backend code to interact with that collection
//incomes will be the collection name
const IncomeVariable = mongoose.model("Income", incomeSchema);
export default IncomeVariable;
