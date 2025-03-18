import { axiosInstance } from "@/utils/interceptors";

export const checkUserProfile = async (token: string) => {
  return axiosInstance.get(
    `${import.meta.env.VITE_BACKEND_API_URL}users/check-user-profile`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
