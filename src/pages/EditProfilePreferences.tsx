import BaseLayout from "@/shared/layouts/Base";
import React from "react";

const EditProfile = React.lazy(() => import("../features/edit-profile"));

const EditProfilePreferencesPage = () => {
  return (
    <BaseLayout>
      <EditProfile />
    </BaseLayout>
  );
};

export default EditProfilePreferencesPage;
