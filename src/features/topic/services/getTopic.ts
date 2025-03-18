import axios from "axios";

export const getTopic = async (token?: string | null) => {
  return axios.get(`${import.meta.env.VITE_BACKEND_API_URL}topics/get-topic`, {
    headers: {
      Authorization: token && `Bearer ${token}`,
    },
  });
};
