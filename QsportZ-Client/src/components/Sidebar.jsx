import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Sidebar navigation: renders links based on user role
 */
export default function Sidebar({ className = "" }) {
  const { user, token } = useAuth();

  const commonLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const roleLinks = [];
  if (token && user) {
    switch (user.role) {
      case "ADMIN":
        roleLinks.push(
          { to: "/dashboard/super-admin", label: "Overview" },
          { to: "/dashboard/super-admin/users", label: "User Management" }
        );
        break;
      case "TEAM_ADMIN":
        roleLinks.push(
          { to: "/dashboard/team-admin", label: "Overview" },
          { to: "/dashboard/team-admin/create-school", label: "Create School" },
          {
            to: "/dashboard/team-admin/schedule-match",
            label: "Schedule Match",
          },
          { to: "/dashboard/team-admin/upload-video", label: "Upload Video" }
        );
        break;
      case "COACH":
        roleLinks.push(
          { to: "/dashboard/coach", label: "Overview" },
          { to: "/dashboard/coach/teams", label: "My Teams" },
          { to: "/dashboard/coach/upload", label: "Upload Video" }
        );
        break;
      case "ATHLETE":
        roleLinks.push({ to: "/dashboard/athlete", label: "Shared Videos" });
        break;
      default:
        break;
    }
  }

  // exact matching for root and overview links
  const exactMatchPaths = [
    "/",
    "/dashboard",
    "/dashboard/super-admin",
    "/dashboard/team-admin",
    "/dashboard/coach",
    "/dashboard/athlete",
  ];

  return (
    <nav
      style={{ boxShadow: "4px 0 16px rgba(0,0,0,0.6)" }}
      className={`${className} bg-black/70 backdrop-blur-md ring-1 ring-black/40 text-white h-full flex flex-col p-4`}>

      <hr className="border-gray-600 mb-2 mt-15 " />

      <ul className="flex-1 space-y-1">
        {roleLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={exactMatchPaths.includes(link.to)}
              className={({ isActive }) =>
                `block w-full px-4 py-3 rounded-lg transition-colors hover:bg-white/10 ${
                  isActive
                    ? "bg-red-600 text-white font-semibold"
                    : "text-gray-300"
                }`
              }>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
