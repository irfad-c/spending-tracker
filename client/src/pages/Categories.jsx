import React, { useState } from "react";
import "./Categories.css";

const Categories = () => {
  // Store all categories
  const [incomeCategory, setIncomeCategory] = useState([
    "Salary",
    "Family",
    "Other",
  ]);
  const [expenseCategory, setExpenseCategory] = useState([
    "Food",
    "Bills",
    "Charity",
    "Shopping",
    "Health",
    "Other",
  ]);

  // Store input values separately
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState("");

  // Handle add income category
  const addIncomeCategory = (e) => {
    e.preventDefault();
    if (newIncome.trim() !== "") {
      setIncomeCategory([...incomeCategory, newIncome]);
      setNewIncome(""); // clear input
    }
  };

  // Handle add expense category
  const addExpenseCategory = (e) => {
    e.preventDefault();
    if (newExpense.trim() !== "") {
      setExpenseCategory([...expenseCategory, newExpense]);
      setNewExpense("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="display">
          {/*income container */}
          <div className="income-container">
            <h1>Income</h1>
            {incomeCategory.map((item, index) => (
              <h3 key={index}>{item}</h3>
            ))}

            <form onSubmit={addIncomeCategory}>
              <input
                type="text"
                placeholder="Enter category name"
                className="input-box"
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
              />
              <button type="submit" className="submit-btn income-btn">
                Add
              </button>
            </form>
          </div>
          {/*expense container */}
          <div className="expense-container">
            <h1>Expense</h1>
            {expenseCategory.map((item, index) => (
              <h3 key={index}>{item}</h3>
            ))}

            <form onSubmit={addExpenseCategory}>
              <input
                type="text"
                placeholder="Enter category name"
                className="input-box"
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
              />
              <button type="submit" className="submit-btn expense-btn">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
