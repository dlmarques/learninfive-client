import { axiosInstance } from "@/utils/interceptors";

export const getTopic = async (token?: string | null) => {
  return axiosInstance.get(`topics/get-topic`, {
    headers: {
      Authorization: token && `Bearer ${token}`,
    },
  });
};
