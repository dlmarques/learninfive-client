import { axiosInstance } from "@/utils/interceptors";

export const getTopic = async (token?: string | null) => {
  return axiosInstance.get(
    `${import.meta.env.VITE_BACKEND_API_URL}topics/get-topic`,
    {
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    }
  );
};
