import IncomeVariable from "../models/income.js";
import ExpenseVariable from "../models/expense.js";

export const getFullTransaction = async (req, res) => {
  try {
    /*"selectedIncomeCategory" → the field name in your schema that stores a reference (ObjectId)."CategoryName" → which field(s) you want from that referenced document. */
    const incomeData = await IncomeVariable.find().populate(
      "selectedIncomeCategory",
      "categoryName"
    );
    const expenseData = await ExpenseVariable.find().populate(
      "selectedExpenseCategory",
      "categoryName"
    );

    const transactionData = [...incomeData, ...expenseData].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.json(transactionData);
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { type, id } = req.params;

    if (type == "income") {
      const incomeData = await IncomeVariable.findByIdAndDelete(id);
    } else {
      const expenseData = await ExpenseVariable.findByIdAndDelete(id);
    }
    //we should send a response back to the frontend — otherwise the frontend will wait without knowing the result:
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
