import IncomeVariable from "../models/income.js";
import ExpenseVariable from "../models/expense.js";

export const getFullTransaction = async (req, res) => {
  try {
    const incomeData = await IncomeVariable.find();
    const expenseData = await ExpenseVariable.find();

    const transactionData = [...incomeData, ...expenseData].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.json(transactionData);
  } catch (error) {
    console.error(error.message);

    return [];
  }
};
