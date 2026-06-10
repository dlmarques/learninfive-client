import type { Topic } from "@/types/Topic";
import { axiosInstance } from "@/utils/interceptors";

export const getTopic = async (token?: string | null) => {
  if (!token) {
    return axiosInstance.get<Topic>("topics/today");
  }

  return axiosInstance.get<Topic>("me/topics/today", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
