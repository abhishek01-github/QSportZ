import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import api from "../api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/password/request", { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        <div className="w-full lg:w-full flex items-center justify-center">
          <AuthCard
            title={submitted ? "Check Your Inbox" : "Forgot Your Password?"}
            bottomText={
              <Link to="/login" className="text-red-500 hover:underline">
                Back to Login
              </Link>
            }>
            {submitted ? (
              <p className="text-center text-gray-300">
                If that email exists in our system, you’ll receive a
                password-reset link.
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
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 
                               text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-md 
                             hover:bg-red-700 transition-colors">
                  Send Reset Link
                </button>
              </form>
            )}
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
