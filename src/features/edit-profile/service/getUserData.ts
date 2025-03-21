import { axiosInstance } from "@/utils/interceptors";

export const getUserData = async (token: string) => {
  return axiosInstance.get(`users/get-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
