import { CategoryVariable } from "../models/Category.js";
import IncomeVariable from "../models/Income.js";
import ExpenseVariable from "../models/Expense.js";

export const getIncomeCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.find({
      type: "income",
      userId: req.user._id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.find({
      type: "expense",
      userId: req.user._id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postIncomeCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.create({
      categoryName: req.body.name,
      type: "income",
      userId: req.user._id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postExpenseCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.create({
      categoryName: req.body.name,
      type: "expense",
      userId: req.user._id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete only if category belongs to current user
    const data = await CategoryVariable.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    //Based on category type, delete corresponding records
    if (data.type === "income") {
      await IncomeVariable.deleteMany({ selectedIncomeCategory: id });
    } else if (data.type === "expense") {
      await ExpenseVariable.deleteMany({ selectedExpenseCategory: id });
    }
    res
      .status(200)
      .json({ message: `${data.type} category deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
MongoDB’s deleteMany() method never throws an error when there are no matches.
It just returns a result object telling you how many documents were deleted.

Example:

await IncomeVariable.deleteMany({ selectedIncomeCategory: "someExpenseCategoryId" });
// returns { acknowledged: true, deletedCount: 0 }

So even if it doesn’t find any income documents, it won’t crash.
That’s why your code still “works” for both income and expense categories.
 */
