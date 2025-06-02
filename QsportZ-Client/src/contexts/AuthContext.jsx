import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

// 1) Create the context
const AuthContext = createContext({
  token: null,
  login: async () => {},
  logout: () => {},
  setToken: () => {},
});

// 2) Provider component
export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);

  // On mount, load any existing token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setTokenState(stored);
      api.defaults.headers.Authorization = `Bearer ${stored}`;
    }
  }, []);

  // Wrap setting token so we also persist & set axios header
  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
      setTokenState(newToken);
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.Authorization;
      setTokenState(null);
    }
  };

  // login: call your /auth/login endpoint, set token
  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.token);
  };

  // logout: clear token
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3) Custom hook for easy consumption
export function useAuth() {
  return useContext(AuthContext);
}
