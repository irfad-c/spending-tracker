import Transaction from "../models/Transaction.js";

// @desc    Add new transaction
// @route   POST /api/transactions
export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;

    if (!type || !category || !amount) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const transaction = await Transaction.create({
      type,
      category,
      amount,
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get summary
// @route   GET /api/transactions/summary
export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
