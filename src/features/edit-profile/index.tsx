import { useQuery } from "@tanstack/react-query";
import EditProfileForm from "./components/EditProfileForm";
import { useEditProfile } from "./hooks/useEditProfile";
import { useAuth } from "@clerk/clerk-react";
import { getUserData } from "./service/getUserData";
import type { UserProfileInputDto } from "@/types/UserProfile";

const EditProfile = () => {
  const { editUserProfile } = useEditProfile();
  const { getToken } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Token not found");
      }
      const topicResponse = await getUserData(token);
      return topicResponse.data.content as UserProfileInputDto;
    },
  });

  // TODO - handle loading and errors
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    !isLoading && <EditProfileForm onSubmit={editUserProfile} user={data} />
  );
};

export default EditProfile;
