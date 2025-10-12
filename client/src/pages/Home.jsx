import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { ReactContextObject } from "./ReactContext.js";
function Home() {
  const { incomeCategory, expenseCategory } = useContext(ReactContextObject);

  const [income, setIncome] = useState(0);
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState("");
  //when the user type in the input box,its value will stored in react state.
  const [incomeAmount, setIncomeAmount] = useState("");

  const [expense, setExpense] = useState(0);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);

  const balance = income - expense;

  useEffect(() => {
    fetch("http://localhost:5000/api/income")
      //taking the http request and converting the body from json text to javascript object or array
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

  const fetchExpenseByCategory = () => {
    fetch("http://localhost:5000/api/expense/category")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.total - a.total);
        setExpenseByCategory(sorted);
      })
      .catch((err) => console.error(err));
  };

  //this code is needed to fetch the data at the beginning
  useEffect(() => {
    fetchExpenseByCategory();
  }, []);

  const fetchIncomeByCategory = () => {
    fetch("http://localhost:5000/api/income/category")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.total - a.total);
        setIncomeByCategory(sorted);
      })
      .catch((err) => console.error(err));
  };
  //this useEffect is needed when we load the page initially
  //empty dependency array.Run this only once, when the component is mounted (first time it appears on screen).
  useEffect(() => {
    fetchIncomeByCategory();
  }, []);

  function addIncome(e) {
    e.preventDefault();
    if (!selectedIncomeCategory || !incomeAmount) {
      alert("Please enter both category and income amount");
      return;
    }
    fetch("http://localhost:5000/api/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedIncomeCategory,
        incomeAmount: Number(incomeAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIncome(data.totalIncome);
        setIncomeAmount("");
        setSelectedIncomeCategory("");
        fetchIncomeByCategory();
      })
      .catch((err) => console.error(err));
  }

  function addExpense(e) {
    e.preventDefault();
    if (!selectedExpenseCategory || !expenseAmount) {
      alert("Please enter both category and expense amount");
      return;
    }
    fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedExpenseCategory,
        expenseAmount: Number(expenseAmount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpense(data.totalExpense);
        setExpenseAmount("");
        setSelectedExpenseCategory("");
        fetchExpenseByCategory();
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="entire-content">
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
                value={selectedIncomeCategory}
                onChange={(e) => setSelectedIncomeCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {incomeCategory.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
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

          {/*form - add Expense */}
          <div className="form-card">
            <h3>Add New Expense</h3>
            <form onSubmit={addExpense}>
              <select
                className="input-box"
                value={selectedExpenseCategory}
                onChange={(e) => setSelectedExpenseCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {expenseCategory.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
    </>
  );
}

export default Home;
