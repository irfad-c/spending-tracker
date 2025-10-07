import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories"

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
          <Route path="/categories" element={<Categories/>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
