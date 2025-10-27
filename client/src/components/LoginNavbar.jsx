import React, { useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="nav">
        <div className="brand">
          MERN Auth - This is present in LoginNavbar.jsx
        </div>
        <div className="links">
          {user ? (
            <>
              <span>Hi, {user.name} This is present in LoginNavbar.jsx </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* 👇 This is where Login.jsx or Register.jsx will render */}
      <Outlet />
    </>
  );
};

export default LoginNavbar;
