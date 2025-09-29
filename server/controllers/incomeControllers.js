import IncomeVariable from "../models/income.js";

// @desc    Get current net Income data
// @route   GET /api/transactions
export const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await calculateTotalIncome();
    res.json(totalIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function calculateTotalIncome() {
  const result = await IncomeVariable.aggregate([
    //don’t split into categories, just one group for everything
    { $group: { _id: null, netIncome: { $sum: "$incomeAmount" } } },
  ]);
  return result[0]?.netIncome || 0;
}
// @desc   income calculation
// @route   POST /api/in
export const incomeCalculation = async (req, res) => {
  try {
    const { incomeCategory, incomeAmount } = req.body;
    if (!incomeCategory || !incomeAmount) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const newIncome = await IncomeVariable.create({
      incomeCategory,
      incomeAmount,
    });
    const netIncome = await calculateTotalIncome();

    res.status(201).json({
      message: "Income added successfully",
      netIncome,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
