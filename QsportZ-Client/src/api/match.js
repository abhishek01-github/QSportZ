import axios from "axios";

export const createMatch = async (matchDto, token) => {
  const { data } = await axios.post("/api/matches", matchDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getMatch = async (id) => {
  const { data } = await axios.get(`/api/matches/${id}`);
  return data;
};

export const listMatchesBySchool = async (schoolId) => {
  const { data } = await axios.get(`/api/matches/by-school/${schoolId}`);
  return data;
};

export const updateMatch = async (id, matchDto, token) => {
  const { data } = await axios.put(`/api/matches/${id}`, matchDto, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteMatch = async (id, token) => {
  await axios.delete(`/api/matches/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
