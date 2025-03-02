import axios from "axios";

export const getTopic = async () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_API_URL}topics/get-topic`);
};
