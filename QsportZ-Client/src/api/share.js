import axios from "axios";

export const shareVideo = async (shareDto, token) => {
  const { data } = await axios.post("/api/shares", shareDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const listSharesByUser = async (userId) => {
  const { data } = await axios.get(`/api/shares/by-user/${userId}`);
  return data;
};

export const unshareVideo = async (shareId, token) => {
  await axios.delete(`/api/shares/${shareId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
