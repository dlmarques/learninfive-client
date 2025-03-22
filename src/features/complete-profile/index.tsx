import ProfileCompleteForm from "./components/ProfileCompleteForm";
import { useCompleteProfile } from "./hooks/useCompleteProfile";

const CompleteProfile = () => {
  const { createUserProfile } = useCompleteProfile();
  return <ProfileCompleteForm onSubmit={createUserProfile} />;
};

export default CompleteProfile;
