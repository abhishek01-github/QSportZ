import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function CoachDashboard({ upcoming = [], teams = [] }) {
  return (
    <DashboardLayout title="Coach Dashboard">
      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Upcoming Matches</h2>
        <div className="space-y-4">
          {upcoming.map((match) => (
            <div
              key={match.id}
              className="flex justify-between items-center p-4 bg-white/10 backdrop-blur rounded-xl">
              <div>
                <p className="font-medium text-white">{match.title}</p>
                <p className="text-gray-400 text-sm">{match.date}</p>
              </div>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm">
                Upload Video
              </button>
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-gray-500">No upcoming matches.</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">My Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-4 bg-white/10 backdrop-blur rounded-xl">
              <p className="font-semibold text-white">{team.name}</p>
              <p className="text-gray-400 text-sm">
                Videos: {team.videos.length}
              </p>
            </div>
          ))}
          {teams.length === 0 && (
            <p className="text-gray-500">No teams assigned.</p>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
