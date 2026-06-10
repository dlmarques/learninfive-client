import type { UserProfileResponseDto } from "@/types/UserProfile";
import { axiosInstance } from "@/utils/interceptors";

export const getUserData = async (token: string) => {
  return axiosInstance.get<UserProfileResponseDto>("me/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
