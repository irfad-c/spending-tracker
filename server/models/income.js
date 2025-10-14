import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    selectedIncomeCategory: {
      type: String,
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: true,
    },
  },
  //Mongoose automatically adds createdAt and updatedAt fields
  //Mongoose convert the BSON date data to JS date object in NodeJS memory
  //createdAt stored as JS Date object in NodeJS memory (from Mongoose with timestamps: true)
  { timestamps: true }
);
//"Income" → the model name you chose.
//IncomeVariable - This is the variable you use in your backend code to interact with that collection
//incomes will be the collection name
const IncomeVariable = mongoose.model("Income", incomeSchema);
export default IncomeVariable;
