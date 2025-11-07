import React, { useState, useEffect } from "react";
import "./Transaction.css";
import fetchAPI from "../api/fetchAPI";

const Transactions = () => {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchAPI("/api/transactions");
        setTransaction(data);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (type, id) => {
    try {
      await fetchAPI(`/api/transactions/${type}/${id}`, {
        method: "DELETE",
      });
      setTransaction((prev) => prev.filter((item) => item._id !== id));
      console.log(`${type} transaction deleted successfully`);
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
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
                  {data.selectedExpenseCategory?.categoryName ||
                    data.selectedIncomeCategory?.categoryName}
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
