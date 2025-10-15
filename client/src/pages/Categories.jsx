import React, { useContext, useState } from "react";
import styles from "./Categories.module.css";
import { useEffect } from "react";
import Home from "./Home.jsx";
import { ReactContextObject } from "./ReactContext.js";

const Categories = () => {
  const {
    incomeCategory,
    expenseCategory,
    setIncomeCategory,
    setExpenseCategory,
  } = useContext(ReactContextObject);

  //useState not needed here for setIncomeCategory.Because clicking add button will change the state
  //Here useState is present in App.jsx
  //useContext can read and update the state in App.jsx

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

  const handleDelete = async (type, id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/category/${type}/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        //Checks if the delete request to the backend was successful.
        if (type === "income") {
          setIncomeCategory(incomeCategory.filter((item) => item._id !== id));
        } else {
          setExpenseCategory(expenseCategory.filter((item) => item._id !== id));
        }
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ReactContextObject.Provider value={{ incomeCategory, expenseCategory }}>
        <div className={styles.container}>
          <div className={styles.display}>
            {/* Income container */}
            <div className={styles.incomeContainer}>
              <h1>Income</h1>
              {incomeCategory.map((item) => (
                <div className={styles.categoryContainer} id={item._id}>
                  <h3>{item.name}</h3>
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
                  <h3>{item.name}</h3>
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
      </ReactContextObject.Provider>
    </>
  );
};

export default Categories;
