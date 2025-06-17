import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // make sure axios baseURL is "/api"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: load token & fetch /auth/me
  useEffect(() => {
    const savedToken = localStorage.getItem("qsportz_token");
    if (savedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      api
        .get("/auth/me")
        .then((resp) => {
          setUser(resp.data);
          setToken(savedToken);
        })
        .catch(() => {
          localStorage.removeItem("qsportz_token");
          delete api.defaults.headers.common["Authorization"];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (newToken) => {
    localStorage.setItem("qsportz_token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    const resp = await api.get("/auth/me");
    setUser(resp.data);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("qsportz_token");
    delete api.defaults.headers.common["Authorization"];
  };

  if (loading)
    return <div className="p-4 text-center text-white">Loading…</div>;

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}