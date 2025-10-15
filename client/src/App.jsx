import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import { ReactContextObject } from "./pages/ReactContext.js";
import { useState, useEffect } from "react";
import Categories from "./pages/Categories.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);

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

  return (
    <>
      {/*client side routing using react router
      React Router just swaps the component shown inside <Routes>
      React Router → Manages navigation between pages (URL → which component should render). */}

      <ReactContextObject.Provider
        value={{
          incomeCategory,
          expenseCategory,
          setIncomeCategory,
          setExpenseCategory,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </ReactContextObject.Provider>
    </>
  );
}

export default App;
