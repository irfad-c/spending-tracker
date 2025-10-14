import IncomeVariable from "../models/income.js";

// @desc    Get current net Income data
// @route   GET /api/transactions
//incomeRoutes.js file determined this as a GET request
export const getTotalIncome = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      { $group: { _id: null, totalIncome: { $sum: "$incomeAmount" } } },
    ]);
    res.json({ totalIncome: result[0]?.totalIncome || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//GET request for income by category calculation
export const incomeByCategory = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      {
        $group: {
          _id: "$selectedIncomeCategory",
          total: { $sum: "$incomeAmount" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   total income calculation
// @route   POST /api/transactions
export const incomeCalculation = async (req, res) => {
  try {
    const { selectedIncomeCategory, incomeAmount } = req.body;

    const newIncome = await IncomeVariable.create({
      selectedIncomeCategory,
      incomeAmount,
    });
    const totalIncome = await IncomeVariable.aggregate([
      { $group: { _id: null, totalIncome: { $sum: "$incomeAmount" } } },
    ]);

    res.status(201).json({
      message: "Income added successfully",
      totalIncome: totalIncome[0]?.totalIncome || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
