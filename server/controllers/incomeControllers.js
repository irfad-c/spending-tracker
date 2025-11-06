import IncomeVariable from "../models/income.js";


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
export const getIncomeByCategory = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      {
        $lookup: {
          from: "categories", // 👈 the collection name 
          localField: "selectedIncomeCategory", // field in IncomeVariable
          foreignField: "_id", // field in CategoryVariable
          as: "categoryDetails", // result will be stored in this field
        },
      },
      // Unwind the array (each lookup result is an array)
      { $unwind: "$categoryDetails" },
      // Group by category name instead of ID
      {
        $group: {
          _id: "$categoryDetails.categoryName",
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

export const postIncomeCalculation = async (req, res) => {
  try {
    const { selectedIncomeCategory, incomeAmount } = req.body;

    await IncomeVariable.create({
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
