import React, { useState } from "react";
import Card from "../../components/VideoCard";
import Button from "../../components/Button";
import api from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function UploadVideo() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setMessage("Please provide both a title and a video file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "metadata",
        new Blob(
          [
            JSON.stringify({
              title,
              schoolId: user.schoolId,
              uploadedBy: user.id,
            }),
          ],
          { type: "application/json" }
        )
      );

      const resp = await api.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Video uploaded successfully!");
      setTitle("");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card title="Upload New Video">
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-red-300">{message}</p>}

          <div>
            <label className="block text-sm text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-black/30 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 w-full text-gray-200"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
            disabled={uploading}>
            {uploading ? "Uploading…" : "Upload Video"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
