import ExpenseVariable from "../models/expense.js"; // import your Expense model

// @desc    Get current total Expense data
// @route   GET /api/expenses
export const getTotalExpense = async (req, res) => {
  try {
    const totalExpense = await calculateTotalExpense();
    res.json(totalExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// helper function to calculate total expense
async function calculateTotalExpense() {
  const result = await ExpenseVariable.aggregate([
    // don’t split into categories, just one group for everything
    { $group: { _id: null, totalExpense: { $sum: "$expenseAmount" } } },
  ]);
  return result[0]?.totalExpense || 0;
}

// @desc   Add new expense
// @route   POST /api/expenses
export const expenseCalculation = async (req, res) => {
  try {
    const { expenseCategory, expenseAmount } = req.body;
    if (!expenseCategory || !expenseAmount) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const newExpense = await ExpenseVariable.create({
      expenseCategory,
      expenseAmount,
    });

    const totalExpense = await calculateTotalExpense();

    res.status(201).json({
      message: "Expense added successfully",
      totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
