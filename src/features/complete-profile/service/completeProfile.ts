import type { UserProfileOutputDto } from "@/types/UserProfile";
import { axiosInstance } from "@/utils/interceptors";

export const completeProfile = async (
  data: UserProfileOutputDto,
  token: string
) => {
  return axiosInstance.post(`users/complete-profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
