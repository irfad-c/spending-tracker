import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

/*
What is outlet

**`<Outlet />` is a placeholder where child routes will be rendered.**
---
🔥 Example to Understand It Clearly
📌 Your ProtectedRoute:
return user ? <Outlet /> : <Navigate to="/login" replace />;
Meaning:
* If the user **is logged in** → render whatever child route is inside ProtectedRoute
* If user **not logged in** → redirect to login page
So `<Outlet />` = *show the actual protected page here*.
*/
