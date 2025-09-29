import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [income, setIncome] = useState(0);
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const [expense, setExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  //Initial state: an object (empty object).
  //Used when you want to store structured data (e.g., form data, user profile).

  const balance = income - expense;

  // -GET request
  useEffect(() => {
    fetch("http://localhost:5000/api/income")
      .then((res) => res.json())
      .then((data) => setIncome(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/expense")
      .then((res) => res.json())
      .then((data) => setExpense(data))
      .catch((err) => console.error(err));
  }, []);

  //When the user submit the form this function will trigger - POST request also done inside this.
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
        // update state with net income from backend
        setIncome(data.netIncome);
        // clear form fields after successful update
        setIncomeAmount("");
        setIncomeCategory("");
      })
      .catch((err) => console.error(err));
  }

  // Add expense
  function addExpense(e) {
    e.preventDefault();
    if (!expenseCategory || !expenseAmount) {
      alert("Please enter both category and expense amount");
      return;
    }
    fetch("http://localhost:5000/api/expense", {
      // your expense route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expenseCategory,
        expenseAmount: Number(expenseAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // update state with total expense from backend
        setExpense(data.totalExpense);
        // clear form fields after successful update
        setExpenseAmount("");
        setExpenseCategory("");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="entire-content">
      <h2>Spending Tracker</h2>
      {/* Balance */}
      <div className="balance">
        <h3>Your Balance</h3>
        <h1>₹{balance}</h1>
      </div>
      {/* Income & Expense */}
      <div className="income-expense">
        <div className="income">
          <h4>Income</h4>
          <p className="income-p">₹{income}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p className="expense-p">₹{expense}</p>
        </div>
      </div>
      {/*Form - Add income*/}
      <div className="add-income">
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
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>
      </div>

      {/* Form - Add Expense */}
      <div className="add-expense">
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
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Enter amount"
            className="input-box"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>
      </div>

      {/* Category-wise totals */}

      {/* Add Expense */}
    </div>
  );
}
export default App;
