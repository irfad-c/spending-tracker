import ExpenseVariable from "../models/expense.js"; // import your Expense model

// @desc    Get current total Expense data
// @route   GET /api/expenses
export const getTotalExpense = async (req, res) => {
  try {
    const totalExpense = await calculateTotalExpense();
    //here data will be {"totalExpense":200}
    res.json({ totalExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// helper function to calculate total expense
async function calculateTotalExpense() {
  const result = await ExpenseVariable.aggregate([
    { $group: { _id: null, totalExpense: { $sum: "$expenseAmount" } } },
  ]);
  return result[0]?.totalExpense || 0; // return just the number
}

// @desc   Add new expense
// @route   POST /api/expenses
export const expenseCalculation = async (req, res) => {
  try {
    const { selectedExpenseCategory, expenseAmount } = req.body;

    const newExpense = await ExpenseVariable.create({
      selectedExpenseCategory,
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

export const expenseByCategory = async (req, res) => {
  try {
    const result = await ExpenseVariable.aggregate([
      {
        $group: { _id: "$expenseCategory", total: { $sum: "$expenseAmount" } },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
