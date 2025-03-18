import axios from "axios";

export const checkUserProfile = async (token: string) => {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_API_URL}users/check-user-profile`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
