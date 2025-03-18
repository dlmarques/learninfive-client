import axios from "axios";

export const getUserData = async (token: string) => {
  return axios.get(`${import.meta.env.VITE_BACKEND_API_URL}users/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
