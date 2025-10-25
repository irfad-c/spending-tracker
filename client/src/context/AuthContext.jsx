import React, { createContext, useState, useEffect } from "react";
import fetchAPI from "../api/fetchAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

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
          const res = await fetchAPI("/auth/verify");
          // res.user comes from backend verify route response
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
