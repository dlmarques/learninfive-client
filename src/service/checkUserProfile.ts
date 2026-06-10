import { axiosInstance } from "@/utils/interceptors";

export type UserProfileStatusResponse = {
  exists: boolean;
};

export const checkUserProfile = async (token: string) => {
  return axiosInstance.get<UserProfileStatusResponse>("me/profile/status", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
