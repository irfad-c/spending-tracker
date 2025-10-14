import React, { useState, useEffect } from "react";
import "./Transaction.css";

const Transactions = () => {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="transactions-container">
        <h1>Transaction History</h1>

        <ol className="transaction-list">
          {transactions.map((data) => (
            <li key={data._id} className="transaction-item">
              <h5 className="category">
                {data.selectedExpenseCategory || data.selectedIncomeCategory}
              </h5>
              <p
                className={`amount ${data.incomeAmount ? "income" : "expense"}`}
              >
                ₹ {data.expenseAmount || data.incomeAmount}
              </p>
              <p className="date">
                {new Date(data.createdAt).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Transactions;
