import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "COACH",
  });
  const [error, setError] = useState("");
  const roles = [
    { value: "COACH", label: "Coach" },
    { value: "ATHLETE", label: "Athlete" },
    { value: "TEAM_ADMIN", label: "Team Admin" },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      setToken(data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        {/* Hero image with overlay */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/steven.jpg')`,
            backgroundBlendMode: "multiply",
            backgroundColor: "#00000088",
          }}
        />
        {/* Form side */}
        <div className="w-full my-10 lg:w-1/2 flex items-center justify-center">
          <AuthCard
            title="Create Your QSportz Account"
            bottomText={
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:underline">
                  Log in
                </Link>
              </>
            }>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-800/20 text-red-400 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-300">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                             text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                             text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
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
              <div>
                <label className="block text-sm text-gray-300">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                             text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-md 
                           hover:bg-red-700 transition-colors">
                Sign Up
              </button>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
