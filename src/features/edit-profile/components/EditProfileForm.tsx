import FormTextArea from "@/shared/components/form-textarea";
import type {
  UserProfileInputDto,
  UserProfileOutputDto,
} from "@/types/UserProfile";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface EditProfileFormProps {
  onSubmit: (data: Omit<UserProfileOutputDto, "userId">) => void;
  user?: UserProfileInputDto;
}

const EditProfileForm = ({ onSubmit, user }: EditProfileFormProps) => {
  const [formData, setFormData] = useState<
    Omit<UserProfileOutputDto, "userId">
  >(
    user || {
      csLevel: "",
      goals: "",
      preferences: "",
      topicsToAvoid: "",
    }
  );

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ textAlign: "center", paddingBottom: "32px" }}>
        Edit your profile preferences
      </h1>
      <FormTextArea
        id="csLevel"
        name="csLevel"
        label="Describe your Computer Science level"
        placeholder="Describe your Computer Science level"
        onChange={(e: any) => {
          setFormData({ ...formData, csLevel: e.target.value });
        }}
        key="csLevel"
        value={formData.csLevel}
      />
      <FormTextArea
        id="goals"
        name="goals"
        label="Describe your goals in Computer Science"
        placeholder="Describe your goals in Computer Science"
        onChange={(e: any) => {
          setFormData({ ...formData, goals: e.target.value });
        }}
        key="goals"
        value={formData.goals}
      />
      <FormTextArea
        id="preferences"
        name="preferences"
        label="Summarize your preferences and fluent skills"
        placeholder="Summarize your preferences and fluent skills"
        onChange={(e: any) => {
          setFormData({ ...formData, preferences: e.target.value });
        }}
        key="preferences"
        value={formData.preferences}
      />
      <FormTextArea
        id="topicsToAvoid"
        name="topicsToAvoid"
        label="Tell us about topics you'd like to avoid (if any)"
        placeholder="Tell us about topics you'd like to avoid (if any)"
        onChange={(e: any) => {
          setFormData({ ...formData, topicsToAvoid: e.target.value });
        }}
        key="topicsToAvoid"
        value={formData.topicsToAvoid}
      />
      <Button size="lg" onClick={() => onSubmit(formData)}>
        Complete profile
      </Button>
    </form>
  );
};

export default EditProfileForm;
