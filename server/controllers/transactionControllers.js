import IncomeVariable from "../models/Income.js";
import ExpenseVariable from "../models/Expense.js";

export const getFullTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const incomeData = await IncomeVariable.find({ userId }).populate(
      "selectedIncomeCategory",
      "categoryName"
    );
    const expenseData = await ExpenseVariable.find({ userId }).populate(
      "selectedExpenseCategory",
      "categoryName"
    );
    const transactionData = [...incomeData, ...expenseData].sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.json(transactionData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { type, id } = req.params;
    const userId = req.user._id;
    let deleted;
    if (type == "income") {
      deleted = await IncomeVariable.findOneAndDelete({ _id: id, userId });
    } else {
      deleted = await ExpenseVariable.findOneAndDelete({ _id: id, userId });
    }
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Transaction not found or not yours" });
    }
    //we should send a response back to the frontend — otherwise the frontend will wait without knowing the result:
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

