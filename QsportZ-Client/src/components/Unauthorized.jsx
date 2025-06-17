import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">
          {user
            ? `It looks like you are logged in as "${user.role}", but you don’t have permission to view this page.`
            : "You do not have permission to view this page."}
        </p>
        <Link to="/" className="text-red-500 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
