import { checkUserProfile } from "@/service/checkUserProfile";

export const isUserProfileCompleted = async (
  token: string
): Promise<boolean> => {
  const response = await checkUserProfile(token);
  return response.data.exists;
};
