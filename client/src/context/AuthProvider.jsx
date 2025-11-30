import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosInstance.js";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  //useState() → Reads user data (from localStorage when app loads)
  //Here the state is whatever we stored in the localStorage.

  const [loading, setLoading] = useState(true);
  //when we refresh the page it shows loading for few second.If there is token we will not logged out.

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  //this funcion is called inside Login.jsx
  //so the data and token shared and save in the local storage.

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const verify = async () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (!stored?.token) {
        logout();
        setLoading(false);
        return;
      }
      try {
        const res = await axiosClient.get("/api/auth/verify");
        const { user } = res.data;
        setUser({ ...user, token: stored.token });
        // res.data.user comes from backend verify route response
        //It’s mainly used when your frontend reloads — to verify that the login session is still valid.
        setLoading(false);
      } catch (error) {
        logout();
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <div className="center">Loading...</div>;
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
