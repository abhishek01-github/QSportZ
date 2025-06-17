// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavBar />

      <div className="flex flex-1">
        {isDashboard && (
          <aside className="hidden md:block w-64">
            <Sidebar className="h-full" />
          </aside>
        )}

<main className="flex-1 overflow-y-auto bg-white/90 ring-1 ring-white/10">
  <Outlet />
</main>
      </div>

      <Footer />
    </div>
  );
}
