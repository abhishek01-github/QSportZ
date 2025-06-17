import axios from "axios";

export const getUserById = async (id, token) => {
  const { data } = await axios.get(`/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const listUsers = async (token) => {
  const { data } = await axios.get("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateUser = async (id, userDto, token) => {
  const { data } = await axios.put(`/api/users/${id}`, userDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteUser = async (id, token) => {
  await axios.delete(`/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadProfilePhoto = async (id, file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(`/api/users/${id}/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getProfilePhotoUrl = async (id, token) => {
  const { data } = await axios.get(`/api/users/${id}/photo-url`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
