import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      setToken(data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        {/* Hero image with dark overlay */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/steven.jpg')`,
            backgroundBlendMode: "multiply",
            backgroundColor: "#00000088",
          }}
        />
        {/* Form side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <AuthCard
            title="Welcome Back"
            bottomText={
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-red-500 hover:underline">
                  Register
                </Link>
              </>
            }>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-800/20 text-red-400 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                             text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                             text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-md 
                           hover:bg-red-700 transition-colors">
                Log In
              </button>
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-400 hover:text-white">
                  Forgot password?
                </Link>
              </div>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
