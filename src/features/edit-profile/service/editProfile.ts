import type { UserProfileOutputDto } from "@/types/UserProfile";
import axios from "axios";

export const editProfile = async (
  data: UserProfileOutputDto,
  token: string
) => {
  return axios.patch(
    `${import.meta.env.VITE_BACKEND_API_URL}users/edit-profile`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
