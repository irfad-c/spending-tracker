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

  const handleDelete = async (type, id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/transactions/${type}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setTransaction((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="transactions-container">
        <h1>Transaction History</h1>
        <ol className="transaction-list">
          {transactions.map((data) => (
            <li key={data._id} className="transaction-item">
              <div className="amount-box">
                <p className="category">
                  {data.selectedExpenseCategory || data.selectedIncomeCategory}
                </p>
                <p
                  className={`amount ${
                    data.incomeAmount ? "income" : "expense"
                  }`}
                >
                  ₹ {data.expenseAmount || data.incomeAmount}
                </p>
                <button
                  onClick={() => handleDelete(data.type, data._id)}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </div>

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
