import { useAuth } from "@clerk/clerk-react";
import type { UserProfileOutputDto } from "@/types/UserProfile";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import { editProfile } from "../service/editProfile";

export const useEditProfile = () => {
  const { userId, getToken } = useAuth();
  const navigate = useNavigate();

  const editUserProfile = async (
    data: Omit<UserProfileOutputDto, "userId">
  ) => {
    if (userId) {
      const token = await getToken();
      if (token) {
        const response = await editProfile({ ...data, userId }, token);

        if (response.data.success) {
          toast.success("User preferences edited successfully!");
          navigate({ to: "/" });
        } else {
          toast.error(response.data.content);
        }
      } else {
        throw new Error("Token not found");
      }
    } else {
      throw new Error("User not found");
    }
  };

  return { editUserProfile };
};
