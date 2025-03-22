import { useAuth } from "@clerk/clerk-react";
import { completeProfile } from "../service/completeProfile";
import type { UserProfileOutputDto } from "@/types/UserProfile";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const useCompleteProfile = () => {
  const { userId, getToken } = useAuth();
  const navigate = useNavigate();
  const createUserProfile = async (
    data: Omit<UserProfileOutputDto, "userId">
  ) => {
    if (userId) {
      const token = await getToken();
      if (token) {
        const response = await completeProfile({ ...data, userId }, token);

        if (response.data.success) {
          toast.success("User created successfully!");
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

  return { createUserProfile };
};
