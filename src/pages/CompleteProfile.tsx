import BaseLayout from "@/shared/layouts/Base";
import React from "react";

const CompleteProfile = React.lazy(() => import("@/features/complete-profile"));

const CompleteProfilePage = () => {
  return (
    <BaseLayout>
      <CompleteProfile />
    </BaseLayout>
  );
};

export default CompleteProfilePage;
