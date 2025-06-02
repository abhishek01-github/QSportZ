import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setError("Passwords do not match");
    }
    setError("");
    try {
      await api.post("/auth/password/reset", { token, newPassword: password });
      setSubmitted(true);
      // Optionally auto-redirect to login after a few seconds:
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        <div className="w-full lg:w-full flex items-center justify-center">
          <AuthCard
            title={submitted ? "Password Reset" : "Reset Your Password"}
            bottomText={
              submitted ? (
                <Link to="/login" className="text-red-500 hover:underline">
                  Back to Login
                </Link>
              ) : (
                <Link
                  to="/forgot-password"
                  className="text-gray-400 hover:text-white text-sm">
                  Request a new link?
                </Link>
              )
            }>
            {submitted ? (
              <p className="text-center text-gray-300">
                Your password has been reset successfully. Redirecting to login…
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-800/20 text-red-300 rounded">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                               text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                               text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-md 
                             hover:bg-red-700 transition-colors">
                  Reset Password
                </button>
              </form>
            )}
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
