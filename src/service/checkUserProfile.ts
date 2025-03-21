import { axiosInstance } from "@/utils/interceptors";

export const checkUserProfile = async (token: string) => {
  return axiosInstance.get(`users/check-user-profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
