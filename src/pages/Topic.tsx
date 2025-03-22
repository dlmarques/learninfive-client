import BaseLayout from "@/shared/layouts/Base";
import React from "react";

const Topic = React.lazy(() => import("../features/topic"));

const TopicPage = () => {
  return (
    <BaseLayout>
      <Topic />
    </BaseLayout>
  );
};

export default TopicPage;
