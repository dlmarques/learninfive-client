import BaseLayout from "@/shared/layouts/Base";
import React from "react";

const License = React.lazy(() => import("../features/license"));

const LicensePage = () => {
  return (
    <BaseLayout>
      <License />
    </BaseLayout>
  );
};

export default LicensePage;
