import ExpenseVariable from "../models/Expense.js";

export const getTotalExpense = async (req, res) => {
  try {
    const totalExpense = await calculateTotalExpense(req.user._id);
    res.json({ totalExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function calculateTotalExpense(userId) {
  //aggregate() function always returns an array, even if it has only one object.
  const result = await ExpenseVariable.aggregate([
    { $match: { userId } },
    //_id:null means we don't want to group by any category
    { $group: { _id: null, totalExpense: { $sum: "$expenseAmount" } } },
  ]);
  //result=[{_id:null,totalExpense:750}]
  //result[0]={_id:null,totalExpense:750}
  return result[0]?.totalExpense || 0;
  //this will return a single number
}

// @desc   Add new expense

export const postExpenseCalculation = async (req, res) => {
  try {
    const { selectedExpenseCategory, expenseAmount } = req.body;
    await ExpenseVariable.create({
      selectedExpenseCategory,
      expenseAmount,
      userId: req.user._id,
    });
    const totalExpense = await calculateTotalExpense(req.user._id);
    res.status(201).json({
      message: "Expense added successfully",
      totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseByCategory = async (req, res) => {
  try {
    const result = await ExpenseVariable.aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "categories", // 👈 the collection name
          localField: "selectedExpenseCategory",
          foreignField: "_id", // field in CategoryVariable
          as: "categoryDetails", // result will be stored in this field
        },
      },
      // unwind the array (each lookup result is an array)
      { $unwind: "$categoryDetails" },
      // Group by category name instead of ID
      {
        $group: {
          _id: "$categoryDetails.categoryName",
          total: { $sum: "$expenseAmount" },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
