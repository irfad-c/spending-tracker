import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [income, setIncome] = useState(0);
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const [expense, setExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);

  const balance = income - expense;

  useEffect(() => {
    fetch("http://localhost:5000/api/income")
      .then((res) => res.json())
      .then((data) => setIncome(data.totalIncome))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/expense")
      //this parses response body into JS object
      .then((res) => res.json())
      .then((data) => setExpense(data.totalExpense))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/income/category")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.total - a.total);
        setIncomeByCategory(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/expense/category")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.total - a.total);
        setExpenseByCategory(sorted);
        console.log(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  function addIncome(e) {
    e.preventDefault();
    if (!incomeCategory || !incomeAmount) {
      alert("Please enter both category and income amount");
      return;
    }
    fetch("http://localhost:5000/api/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incomeCategory,
        incomeAmount: Number(incomeAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIncome(data.totalIncome);
        setIncomeAmount("");
        setIncomeCategory("");
      })
      .catch((err) => console.error(err));
  }

  function addExpense(e) {
    e.preventDefault();
    if (!expenseCategory || !expenseAmount) {
      alert("Please enter both category and expense amount");
      return;
    }
    fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expenseCategory,
        expenseAmount: Number(expenseAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpense(data.totalExpense);
        setExpenseAmount("");
        setExpenseCategory("");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="entire-content">
      <h2 className="title">Spending Tracker</h2>

      {/* Balance */}
      <div className="balance-card">
        <h3>Your Balance</h3>
        <h1>₹{balance}</h1>
      </div>

      {/* Income & Expense */}
      <div className="income-expense">
        <div className="income">
          <h4>Income</h4>
          <p>₹{income}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p>₹{expense}</p>
        </div>
      </div>
      <div className="form-card-both">
        {/* Add Income */}
        <div className="form-card">
          <h3>Add New Income</h3>
          <form onSubmit={addIncome}>
            <select
              className="input-box"
              value={incomeCategory}
              onChange={(e) => setIncomeCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="Salary">Salary</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Enter amount"
              className="input-box"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />
            <button type="submit" className="submit-btn income-btn">
              Add
            </button>
          </form>
        </div>

        {/* Add Expense */}
        <div className="form-card">
          <h3>Add New Expense</h3>
          <form onSubmit={addExpense}>
            <select
              className="input-box"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Charity">Charity</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Enter amount"
              className="input-box"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
            <button type="submit" className="submit-btn expense-btn">
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="income-expense-category">
        <h3 className="income-expense-category-h">Income by category</h3>
        <ol className="income-expense-category-ol">
          {incomeByCategory.map((e) => (
            <li key={e._id}>
              {e._id}: ₹{e.total}
            </li>
          ))}
        </ol>
      </div>
      <div className="income-expense-category">
        <h3 className="income-expense-category-h">Expense by category</h3>
        <ol className="income-expense-category-ol">
          {expenseByCategory.map((e) => (
            <li key={e._id}>
              {e._id}: ₹{e.total}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
