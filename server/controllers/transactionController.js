import Transaction from "../models/transaction.js";

// @desc    Add new transaction
// @route   POST /api/transactions
export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;
    if (!type || !category || !amount) {
      //400-bad request
      //sends a JSON-formatted response to the client.
      //standard data format for APIs,structured response,consistency
      return res.status(400).json({ message: "All required fields missing" });
    }

    //creates and saves a MongoDB document in one step.
    const transaction = await Transaction.create({
      //type, category, amount,description are variables extracted from req.body
      //if we dont use req.body (destructuring),we have to manually type category:category.
      type,
      category,
      amount,
      description,
    });
    //created
    res.status(201).json(transaction);
  } catch (error) {
    //internal server error
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
export const getTransactions = async (req, res) => {
  try {
    //.sort({ createdAt: -1 }) → sorts the results by the createdAt field in descending order (-1 means newest first).-1 = descending, 1 = ascending.
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
    //transactions contain multiple objects
    const transactions = await Transaction.find();
    const income = transactions
      .filter((t) => t.type === "income")
      //.reduce() → combines array elements into a single value.
      //(acc, t) => acc + t.amount → acc is the accumulator(running total), t is the current transaction.
      //0 → initial value of accumulator
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
