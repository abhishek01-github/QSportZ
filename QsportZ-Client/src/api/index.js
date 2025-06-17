import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Interceptor: read from the same key we use in AuthContext
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("qsportz_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
