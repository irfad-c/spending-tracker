import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      /*An enum is a special data structure used to define a set of named constants.
      Restricts the possible values for this field.
      Allowed values: "income" or "expense".*/
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  //enables createdAt & updatedAt
  { timestamps: true }
);
//"Transaction" → the model name you chose.
//transactions will be the collection name
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
