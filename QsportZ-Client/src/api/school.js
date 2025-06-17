import axios from "axios";

export const createSchool = async (schoolDto, token) => {
  const { data } = await axios.post("/api/schools", schoolDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getSchool = async (id) => {
  const { data } = await axios.get(`/api/schools/${id}`);
  return data;
};

export const listSchools = async () => {
  const { data } = await axios.get("/api/schools");
  return data;
};

export const updateSchool = async (id, schoolDto, token) => {
  const { data } = await axios.put(`/api/schools/${id}`, schoolDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteSchool = async (id, token) => {
  await axios.delete(`/api/schools/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
