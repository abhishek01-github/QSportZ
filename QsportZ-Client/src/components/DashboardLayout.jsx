import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

/**
 * Wraps all dashboard pages, providing consistent header/nav and layout.
 */
export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar for navigation links */}
      <Sidebar className="hidden md:block w-64 bg-black/70 backdrop-blur p-4" />

      <div className="flex-1 flex flex-col">
        {/* Top nav bar */}
        <NavBar />

        {/* Page title and content */}
        <header className="px-6 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
