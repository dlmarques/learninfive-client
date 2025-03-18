import { axiosInstance } from "@/utils/interceptors";

export const getUserData = async (token: string) => {
  return axiosInstance.get(
    `${import.meta.env.VITE_BACKEND_API_URL}users/get-user`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
