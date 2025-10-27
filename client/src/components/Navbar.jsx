import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  //intially isOpen will be false
  const [isOpen, setIsOpen] = useState(false);
  //when this function trigger value of isOpen swap between true and false
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">SpendingTracker</Link>
      </div>

      {/* Hamburger Icon */}
      {/*here only class name changes according to true or false.Initially className will be hamburger */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      {/*here when we click hamburger icon isOpnen changes.
      initially isOpen will be false.When isOpen true,it will display style according to .nav-links.open */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/transactions" onClick={() => setIsOpen(false)}>
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/categories" onClick={() => setIsOpen(false)}>
            Categories
          </Link>
        </li>
        <li>
          <Link to="/settings" onClick={() => setIsOpen(false)}>
            Settings
          </Link>
        </li>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
};

export default Navbar;
