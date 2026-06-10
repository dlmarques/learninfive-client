import { useAuth } from "@clerk/clerk-react";
import { completeProfile } from "../service/completeProfile";
import type { UserProfileRequestDto } from "@/types/UserProfile";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const useCompleteProfile = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const createUserProfile = async (data: UserProfileRequestDto) => {
    const token = await getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    await completeProfile(data, token);
    toast.success("User created successfully!");
    navigate({ to: "/" });
  };

  return { createUserProfile };
};
