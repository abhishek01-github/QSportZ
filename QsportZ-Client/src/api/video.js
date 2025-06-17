import axios from "axios";

export const uploadVideo = async (file, metadata, token) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );

  const { data } = await axios.post("/api/videos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getVideo = async (id) => {
  const { data } = await axios.get(`/api/videos/${id}`);
  return data;
};

export const listVideosBySchool = async (schoolId) => {
  const { data } = await axios.get(`/api/videos/by-school/${schoolId}`);
  return data;
};

export const deleteVideo = async (id, token) => {
  await axios.delete(`/api/videos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
