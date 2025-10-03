import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  //intially isOpen will be false
  const [isOpen, setIsOpen] = useState(false);
  //when this function trigger value of isOpen swap between true and false
  const toggleMenu = () => setIsOpen(!isOpen);

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
          <Link to="/income" onClick={() => setIsOpen(false)}>
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/expenses" onClick={() => setIsOpen(false)}>
            Categories
          </Link>
        </li>
        <li>
          <Link to="/reports" onClick={() => setIsOpen(false)}>
            Settings
          </Link>
        </li>
      </ul>

      {/* Actions */}
      <div className="nav-actions">
        <button className="nav-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
