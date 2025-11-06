import IncomeVariable from "../models/income.js"; // 👈 use your Income model

// @desc   Get total income
export const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await calculateTotalIncome(req.user._id);
    res.json({ totalIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate total income
async function calculateTotalIncome(userId) {
  // aggregate() function always returns an array, even if it has only one object.
  const result = await IncomeVariable.aggregate([
    { $match: { userId } },
    // _id: null means we don't want to group by any category
    { $group: { _id: null, totalIncome: { $sum: "$incomeAmount" } } },
  ]);
  // result = [{ _id: null, totalIncome: 750 }]
  // result[0] = { _id: null, totalIncome: 750 }
  return result[0]?.totalIncome || 0;
  // this will return a single number
}

// @desc   Add new income
export const postIncomeCalculation = async (req, res) => {
  try {
    const { selectedIncomeCategory, incomeAmount } = req.body;

    await IncomeVariable.create({
      selectedIncomeCategory,
      incomeAmount,
      userId: req.user._id,
    });

    const totalIncome = await calculateTotalIncome(req.user._id);

    res.status(201).json({
      message: "Income added successfully",
      totalIncome,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get income grouped by category
export const getIncomeByCategory = async (req, res) => {
  try {
    const result = await IncomeVariable.aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "categories", // 👈 the collection name in MongoDB
          localField: "selectedIncomeCategory",
          foreignField: "_id", // field in Category model
          as: "categoryDetails", // result will be stored in this field
        },
      },
      { $unwind: "$categoryDetails" }, // flatten the array
      {
        $group: {
          _id: "$categoryDetails.categoryName", // group by category name
          total: { $sum: "$incomeAmount" },
        },
      },
      { $sort: { total: -1 } }, // optional: sort by total descending
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
