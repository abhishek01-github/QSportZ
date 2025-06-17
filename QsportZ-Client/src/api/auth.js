import axios from "axios";

export const login = async (credentials) => {
  const { data } = await axios.post("/api/auth/login", credentials);
  return data;
};

export const register = async (userInfo) => {
  const { data } = await axios.post("/api/auth/register", userInfo);
  return data;
};

export const registerAdmin = async (userInfo, token) => {
  const { data } = await axios.post("/api/auth/register/admin", userInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getCurrentUser = async (token) => {
  const { data } = await axios.get("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const requestPasswordReset = async (email) => {
  await axios.post("/api/auth/password/request", { email });
};

export const resetPassword = async (token, newPassword) => {
  await axios.post("/api/auth/password/reset", { token, newPassword });
};
