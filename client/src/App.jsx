import "./App.css";
import { useState } from "react";

function App() {
  //Used when you want to store numeric values (e.g., counters, scores, prices).
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  //Used when you want to store text values (e.g., input fields, messages).
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  //Initial state: an object (empty object).
  //Used when you want to store structured data (e.g., form data, user profile).
  const [incomeCategories, setIncomeCategories] = useState({});
  const [expenseCategories, setExpenseCategories] = useState({});

  const balance = income - expense;

  // Add income
  const handleIncomeSubmit = (e) => {
    // prevents page reload on form submit
    e.preventDefault();
    if (!incomeCategory || !incomeAmount) return;
    //converts the incomeAmount (string from the input) into a number.
    const amount = parseFloat(incomeAmount);

    setIncome(income + amount);
    setIncomeCategories((prev) => ({
      //The ...prev syntax is called object spread.
      //It only works on objects, not strings, numbers, or arrays (well, arrays can be spread too, but it behaves differently).
      ...prev,
      //computed property name (Javascript)
      //With square brackets: key name is computed from the variable’s value.
      [incomeCategory]: (prev[incomeCategory] || 0) + amount,
    }));
    //resetting the input field
    setIncomeCategory("");
    setIncomeAmount("");
  };

  // Add expense
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseCategory || !expenseAmount) return;

    const amount = parseFloat(expenseAmount);

    setExpense(expense + amount);
    setExpenseCategories((prev) => ({
      ...prev,
      [expenseCategory]: (prev[expenseCategory] || 0) + amount,
    }));

    setExpenseCategory("");
    setExpenseAmount("");
  };

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

      {/* Category-wise totals */}
      <div className="category-lists">
        <div className="category-income">
          <h3>Income by Category</h3>
          <ul>
            {/*Object.entries convert objects { Salary: 5000, Business: 2000} into array of key value pairs [["Salary", 5000], ["Business", 2000]]*/}
            {/* incomeCategories will get the data when we click the add button.Also summation happens there. */}
            {/*[cat, amt] is array destructuring, so:
cat = category name (e.g., "Salary")
amt = amount (e.g., 5000) */}

            {Object.entries(incomeCategories).map(([cat, amt]) => (
              <li key={cat} className="income-p">
                {cat}: {amt}
              </li>
            ))}
          </ul>
        </div>

        <div className="category-expense">
          <h3>Expense by Category</h3>
          <ul>
            {Object.entries(expenseCategories).map(([cat, amt]) => (
              <li key={cat} className="expense-p">
                {cat}: {amt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Income */}
      <div className="add-income">
        <h3>Add New Income</h3>
        <form onSubmit={handleIncomeSubmit}>
          <select
            className="input-box"
            value={incomeCategory}
            //setIncomeCategory(...) updates the state so React knows which option is chosen.
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

      {/* Add Expense */}
      <div className="add-expense">
        <h3>Add New Expense</h3>
        <form onSubmit={handleExpenseSubmit}>
          <select
            className="input-box"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Fuel">Fuel</option>
            <option value="General">General</option>
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
    </div>
  );
}

export default App;
