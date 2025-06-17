// src/dashboard/routes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SkeletonLoader from "../components/SkeletonLoader";
import RequireAuth from "../components/RequireAuth";

// Lazy load dashboards
const TeamAdminDashboard = lazy(() => import("./TeamAdmin/TeamAdminDashboard"));
const CreateSchool = lazy(() => import("./TeamAdmin/CreateSchool"));
const ScheduleMatch = lazy(() => import("./TeamAdmin/ScheduleMatch"));

const CoachDashboard = lazy(() => import("./Coach/CoachDashboard"));
const UploadVideo = lazy(() => import("./Coach/UploadVideo"));
const MyTeams = lazy(() => import("./Coach/MyTeams"));

const AthleteDashboard = lazy(() => import("./Athlete/AthleteDashboard"));

const SuperAdminDashboard = lazy(() =>
  import("./superAdmin/SuperAdminDashboard")
);
const UserManagement = lazy(() => import("./SuperAdmin/UserManagement"));

function getDefaultPath(role) {
  switch (role) {
    case "ADMIN":
      return "super-admin";
    case "TEAM_ADMIN":
      return "team-admin";
    case "COACH":
      return "coach";
    case "ATHLETE":
      return "athlete";
    default:
      return "";
  }
}

export default function DashboardRoutes() {
  const { user, token } = useAuth();
  const location = useLocation();
  // While requiring auth, you could show loading or redirect
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const defaultPath = getDefaultPath(user.role);

  return (
    <Suspense fallback={<SkeletonLoader rowCount={5} />}>
      <Routes>
        {/* Team Admin Routes */}
        <Route element={<RequireAuth roles={["TEAM_ADMIN"]} />}>
          <Route path="team-admin" element={<TeamAdminDashboard />} />
          <Route path="team-admin/create-school" element={<CreateSchool />} />
          <Route path="team-admin/schedule-match" element={<ScheduleMatch />} />
        </Route>

        {/* Coach Routes */}
        <Route element={<RequireAuth roles={["COACH"]} />}>
          <Route path="coach" element={<CoachDashboard />} />
          <Route path="coach/upload" element={<UploadVideo />} />
          <Route path="coach/teams" element={<MyTeams />} />
        </Route>

        {/* Athlete Routes */}
        <Route element={<RequireAuth roles={["ATHLETE"]} />}>
          <Route path="athlete" element={<AthleteDashboard />} />
        </Route>

        {/* Super Admin Routes */}
        <Route element={<RequireAuth roles={["ADMIN"]} />}>
          <Route path="super-admin" element={<SuperAdminDashboard />} />
          <Route path="super-admin/users" element={<UserManagement />} />
        </Route>

        {/* Default Dashboard Redirect based on role */}
        <Route
          path=""
          element={<Navigate to={`/dashboard/${defaultPath}`} replace />}
        />
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
      </Routes>
    </Suspense>
  );
}
