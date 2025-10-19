import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import { ReactContextObject } from "./pages/ReactContext.js";

import Categories from "./pages/Categories.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <>
      {/*client side routing using react router
      React Router just swaps the component shown inside <Routes>
      React Router → Manages navigation between pages (URL → which component should render). */}

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
