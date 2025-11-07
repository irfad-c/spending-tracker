import React, { useState } from "react";
import styles from "./Categories.module.css";
import { useEffect } from "react";
import fetchAPI from "../api/fetchAPI";

const Categories = () => {
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  // store input values separately
  const [newIncome, setNewIncome] = useState("");
  const [newExpense, setNewExpense] = useState("");

  //GET-IncomeCategory
  useEffect(() => {
    const fetchIncomeCategory = async () => {
      try {
        const data = await fetchAPI("/api/category/income");
        setIncomeCategory(data);
      } catch (err) {
        console.error("Cant fetch income category", err.message);
      }
    };
    fetchIncomeCategory();
  }, []);

  //GET-ExpenseCategory
  useEffect(() => {
    const fetchExpenseCategory = async () => {
      try {
        const data = await fetchAPI("/api/category/expense");
        setExpenseCategory(data);
      } catch (err) {
        console.error("Can't fetch expense category:", err.message);
      }
    };

    fetchExpenseCategory();
  }, []);

  const addIncomeCategory = async (e) => {
    e.preventDefault();
    if (!newIncome || newIncome.trim() === "") {
      alert("Please enter category name");
      return;
    }
    try {
      const data = await fetchAPI("/api/category/income", {
        method: "POST",
        body: { name: newIncome.trim() },
      });
      setIncomeCategory((prev) => [...prev, data]);
      setNewIncome("");
      console.log("Income category added:", data);
    } catch (err) {
      console.error("Error adding income category:", err.message);
      alert(err.message);
    }
  };

  const addExpenseCategory = async (e) => {
    e.preventDefault();
    if (!newExpense || newExpense.trim() === "") {
      alert("Please enter category name");
      return;
    }
    try {
      const data = await fetchAPI("/api/category/expense", {
        method: "POST",
        body: { name: newExpense.trim() },
      });
      setExpenseCategory((prev) => [...prev, data]);
      setNewExpense("");
      console.log("Expense category added:", data);
    } catch (err) {
      console.error("Error adding expense category:", err.message);
      alert(err.message);
    }
  };

  const handleDelete = async (type, id) => {
  try {
    await fetchAPI(`/api/category/${type}/${id}`, {
      method: "DELETE",
    });

    // Update UI after successful delete
    if (type === "income") {
      setIncomeCategory((prev) => prev.filter((item) => item._id !== id));
    } else {
      setExpenseCategory((prev) => prev.filter((item) => item._id !== id));
    }

    console.log(`${type} category deleted successfully`);
  } catch (error) {
    console.error("Error deleting category:", error.message);
  }
};


  return (
    <>
      <div className={styles.container}>
        <div className={styles.display}>
          {/* Income container */}
          <div className={styles.incomeContainer}>
            <h1>Income</h1>
            {incomeCategory.map((item) => (
              <div className={styles.categoryContainer} id={item._id}>
                <h3>{item.categoryName}</h3>
                <button
                  onClick={() => handleDelete("income", item._id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}

            <form onSubmit={addIncomeCategory}>
              <input
                type="text"
                placeholder="Enter category name"
                className={styles.inputBox}
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
              />
              <button
                type="submit"
                className={`${styles.submitBtn} ${styles.incomeBtn}`}
              >
                Add
              </button>
            </form>
          </div>

          {/* Expense container */}
          <div className={styles.expenseContainer}>
            <h1>Expense</h1>
            {expenseCategory.map((item) => (
              <div className={styles.categoryContainer} key={item._id}>
                <h3>{item.categoryName}</h3>
                <button
                  onClick={() => handleDelete("expense", item._id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}

            <form onSubmit={addExpenseCategory}>
              <input
                type="text"
                placeholder="Enter category name"
                className={styles.inputBox}
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
              />
              <button
                type="submit"
                className={`${styles.submitBtn} ${styles.expenseBtn}`}
              >
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
