import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function SuperAdminDashboard({ stats = {} }) {
  const { schools = 0, users = 0, pending = 0 } = stats;
  const cards = [
    { label: "All Schools", value: schools },
    { label: "Total Users", value: users },
    { label: "Pending Approvals", value: pending },
  ];

  return (
    <DashboardLayout title="Super Admin Panel">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ label, value }) => (
          <div
            key={label}
            className="p-6 bg-white/10 backdrop-blur rounded-2xl">
            <p className="text-gray-400">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}