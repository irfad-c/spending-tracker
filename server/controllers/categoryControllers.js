import { CategoryVariable } from "../models/category.js";

export const postIncomeCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.create({
      name: req.body.name,
      type: "income",
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomeCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.find({ type: "income" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const postExpenseCategory = async (req, res) => {
  try {
    const data = await CategoryVariable.create({
      name: req.body.name,
      type: "expense",
    });
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
