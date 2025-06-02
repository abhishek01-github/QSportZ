import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout(); // clear token in context + localStorage
    navigate("/login");
  };

  const authenticatedLinks = (
    <>
      <Link to="/" className="px-3 py-2 rounded hover:bg-white/10">
        Home
      </Link>
      <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-white/10">
        Dashboard
      </Link>
      <Link to="/videos" className="px-3 py-2 rounded hover:bg-white/10">
        Videos
      </Link>
      <Link to="/matches" className="px-3 py-2 rounded hover:bg-white/10">
        Matches
      </Link>
      <Link to="/teams" className="px-3 py-2 rounded hover:bg-white/10">
        Teams
      </Link>
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded hover:bg-white/10 ml-4 whitespace-nowrap">
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="px-3 py-2 rounded hover:bg-white/10">
        Login
      </Link>
      <Link to="/register" className="px-3 py-2 rounded hover:bg-white/10">
        Register
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand / Logo */}
        <Link to="/" className="flex-shrink-0 text-white font-bold text-xl">
          <img
            src="/images/qsportz-logo.png"
            alt="QSportz"
            className="
            h-10
            filter                /* enable CSS filters */
            invert                /* invert them to white (on dark bg) */
          "
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2 text-white">
          {token ? authenticatedLinks : guestLinks}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-white p-2 focus:outline-none">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/70 backdrop-blur-sm text-white">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            {token ? authenticatedLinks : guestLinks}
          </div>
        </div>
      )}
    </nav>
  );
}
