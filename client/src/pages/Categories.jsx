import React, { useState } from "react";
import "./Categories.css";
import { useEffect } from "react";

const Categories = () => {
  // Store all categories
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);

  // Store input values separately
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/category/income")
      .then((res) => res.json())
      .then((data) => setIncomeCategory(data))
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/category/expense")
      .then((res) => res.json())
      .then((data) => setExpenseCategory(data))
      .catch((err) => console.error(err.message));
  }, []);

  // Handle add income category
  const addIncomeCategory = (e) => {
    e.preventDefault();
    //logical OR
    if (!newIncome || newIncome.trim() === "") {
      alert("Please enter category name");
      return;
    }
    fetch("http://localhost:5000/api/category/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newIncome.trim() }),
    })
      .then((res) => res.json())
    
      .then((data) => {
        setIncomeCategory((prev) => [...prev, data]);
        setNewIncome("");
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  // Handle add expense category
  const addExpenseCategory = (e) => {
    e.preventDefault();
    // logical OR — show alert if input empty
    if (!newExpense || newExpense.trim() === "") {
      alert("Please enter category name");
      return; // stop execution if invalid input
    }
    fetch("http://localhost:5000/api/category/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newExpense.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenseCategory((prev) => [...prev, data]);
        setNewExpense("");
      })
      .catch((err) => console.error("Error adding expense category:", err));
  };

  return (
    <>
      <div className="container">
        <div className="display">
          {/*income container */}
          <div className="income-container">
            <h1>Income</h1>
            {incomeCategory.map((item) => (
              <h3 key={item._id}>{item.name}</h3>
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
            {expenseCategory.map((item) => (
              <h3 key={item._id}>{item.name}</h3>
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
