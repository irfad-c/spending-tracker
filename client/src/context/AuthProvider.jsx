import React, { useState, useEffect } from "react";
import fetchAPI from "../api/fetchAPI";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  //when we refresh the page it shows loading for few second.If there is token we will not logged out.
  const [loading, setLoading] = useState(true);

  //this funcion is called inside Login.jsx
  //so the data and token shared and save in the local storage.
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const verify = async () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.token) {
        try {
          // Verify token using fetch wrapper
          const res = await fetchAPI("/api/auth/verify");
          // res.user comes from backend verify route response
          //It’s mainly used when your frontend reloads — to verify that the login session is still valid.
          setUser({ ...res.user, token: stored.token });
        } catch {
          logout();
        }
      }
      setLoading(false);
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
