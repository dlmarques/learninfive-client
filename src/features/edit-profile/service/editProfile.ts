import type { UserProfileRequestDto } from "@/types/UserProfile";
import { axiosInstance } from "@/utils/interceptors";

export const editProfile = async (
  data: UserProfileRequestDto,
  token: string
) => {
  return axiosInstance.patch("me/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
