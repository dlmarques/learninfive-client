import type { UserProfileOutputDto } from "@/types/UserProfile";
import axios from "axios";

export const completeProfile = async (
  data: UserProfileOutputDto,
  token: string
) => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}users/complete-profile`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
