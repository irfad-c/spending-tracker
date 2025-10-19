import { CategoryVariable } from "../models/category.js";
import IncomeVariable from "../models/income.js";

export const getIncomeCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.find({ type: "income" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.find({ type: "expense" });
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
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CategoryVariable.findByIdAndDelete(id);
    const secondData = await IncomeVariable.deleteMany({
      selectedIncomeCategory: id,
    });
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
