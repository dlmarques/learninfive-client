import type { UserProfileOutputDto } from "@/types/UserProfile";
import { axiosInstance } from "@/utils/interceptors";

export const editProfile = async (
  data: UserProfileOutputDto,
  token: string
) => {
  return axiosInstance.patch(
    `${import.meta.env.VITE_BACKEND_API_URL}users/edit-profile`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
