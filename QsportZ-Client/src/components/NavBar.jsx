import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fetch presigned photo URL from backend
  useEffect(() => {
    if (token && user?.id) {
      axios
        .get(`/api/users/${user.id}/photo-url`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Photo URL from backend:", res.data); // 👈 log it
          setPhotoUrl(res.data);
        })
        .catch(() => setPhotoUrl(""));
    }
  }, [token, user]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopLinks = token
    ? [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/features", label: "Features" }
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/features", label: "Features" }
      ];

  const guestLinks = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" }
  ];

  const renderLinks = items =>
    items.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `px-3 py-2 rounded hover:bg-white/10 ${isActive ? "bg-white/20" : ""}`
        }
        onClick={() => setOpen(false)}
      >
        {label}
      </NavLink>
    ));

  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section: Logo + Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white font-bold text-xl flex items-center">
            <img
              src="/images/qsportz-logo.png"
              alt="QSportz"
              className="h-10 filter invert mr-2"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-2 text-white">
            {token ? renderLinks(desktopLinks) : renderLinks(guestLinks)}
          </div>
        </div>

        {/* Right Section: Search + Profile */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-2 py-1 rounded bg-white/20 placeholder-white/50 focus:outline-none"
            />
          </div>
          {token && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/20 text-white">
                    {user.name?.[0] || "U"}
                  </div>
                )}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-md text-white rounded-xl py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded hover:bg-white/10"
                    onClick={() => setProfileOpen(false)}>
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard/athlete/shared-videos"
                    className="block px-4 py-2 rounded hover:bg-white/10"
                    onClick={() => setProfileOpen(false)}>
                    Videos Shared
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 rounded hover:bg-white/10"
                    onClick={() => setProfileOpen(false)}>
                    About Us
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 rounded hover:bg-white/10"
                    onClick={() => setProfileOpen(false)}>
                    Help & Support
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded hover:bg-white/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-white p-2 focus:outline-none">
              <img
                src={open ? "/images/cross.png" : "/images/hamburger.png"}
                alt={open ? "Close" : "Open"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/70 backdrop-blur-sm text-white">
          <div className="px-4 pt-2 pb-3 space-y-2 flex flex-col">
            {token ? renderLinks(desktopLinks) : renderLinks(guestLinks)}
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded bg-white/20 placeholder-white/50 focus:outline-none"
            />
            {token && (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="px-3 py-2 rounded hover:bg-white/10 mt-2">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
