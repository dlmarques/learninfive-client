import type { UserProfileRequestDto } from "@/types/UserProfile";
import { axiosInstance } from "@/utils/interceptors";

export const completeProfile = async (
  data: UserProfileRequestDto,
  token: string
) => {
  return axiosInstance.post("me/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
