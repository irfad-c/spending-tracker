import IncomeVariable from "../models/income.js";

// @desc    Get current net Income data
// @route   GET /api/transactions
export const getTotalIncome = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      { $group: { _id: null, totalIncome: { $sum: "$incomeAmount" } } },
    ]);

    res.json({ totalIncome: result[0]?.totalIncome || 0 }); // clean response;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incomeByCategory = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      { $group: { _id: "$incomeCategory", total: { $sum: "$incomeAmount" } } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
