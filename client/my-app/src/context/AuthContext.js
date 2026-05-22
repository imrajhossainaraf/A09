"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/check");
      if (res.data.authenticated) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 0);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    if (res.data.confirmation) {
      setUser(res.data.user);
      return res.data;
    }
    throw new Error("Login failed");
  };

  const register = async (name, email, photoURL, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      photoURL,
      password,
    });
    return res.data;
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
