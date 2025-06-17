import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import VideoCard from "../../components/VideoCard";

export default function AthleteDashboard({ videos = [] }) {
  return (
    <DashboardLayout title="My Shared Videos">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
        {videos.length === 0 && (
          <p className="text-gray-500">No videos shared with you.</p>
        )}
      </div>
    </DashboardLayout>
  );
}
