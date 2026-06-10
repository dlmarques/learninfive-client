import { useAuth } from "@clerk/clerk-react";
import type { UserProfileRequestDto } from "@/types/UserProfile";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import { editProfile } from "../service/editProfile";

export const useEditProfile = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const editUserProfile = async (data: UserProfileRequestDto) => {
    const token = await getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    await editProfile(data, token);
    toast.success("User preferences edited successfully!");
    navigate({ to: "/" });
  };

  return { editUserProfile };
};
