import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function TeamAdminDashboard({ stats = {} }) {
  // stats: { schools, teams, matches, videos }
  const { schools = 0, teams = 0, matches = 0, videos = 0 } = stats;

  const cards = [
    { label: "Total Schools", value: schools },
    { label: "Total Teams", value: teams },
    { label: "Total Matches", value: matches },
    { label: "Videos Uploaded", value: videos },
  ];

  return (
    <DashboardLayout title="Team Admin Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map(({ label, value }) => (
          <div
            key={label}
            className="p-6 bg-white/10 backdrop-blur rounded-2xl">
            <p className="text-gray-400">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="px-6 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold">
          Create School
        </button>
        <button className="px-6 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold">
          Schedule Match
        </button>
        <button className="px-6 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold">
          Upload Video
        </button>
      </div>
    </DashboardLayout>
  );
}
