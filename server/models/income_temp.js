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

/* 
Mongoose automatically adds createdAt and updatedAt fields
Mongoose convert the BSON date data to JS date object in NodeJS memory
createdAt stored as JS Date object in NodeJS memory (from Mongoose with timestamps: true) 
"Income" → the model name you chose.
IncomeVariable - This is the variable you use in your backend code to interact with that collection
incomes will be the collection name

Prevent OverwriteModelError
“If the Income model already exists, reuse it. Otherwise, create a new one.”
const IncomeVariable =
  mongoose.models.Income || mongoose.model("Income", incomeSchema);
export default IncomeVariable;

/*I imported IncomeVariable in many files.It created error in the backend.
🧠 Why this happens
It almost always occurs because of this pattern inside your model file (e.g., models/income.js):
const IncomeVariable = mongoose.model("Income", incomeSchema);
export default IncomeVariable;
When the server reloads (via nodemon), or if multiple imports of this file occur,
Mongoose tries to redefine "Income" again — and that triggers the OverwriteModelError.
🧱 Why it appeared now
This error started after you added multiple imports and switched to ESM modules (import/export).
ESM + nodemon often reload files differently, causing Mongoose to recompile models — hence the conflict.
So this fix (mongoose.models.ModelName || ...) is the standard way to make your models reload-safe and multi-import safe.
 */
