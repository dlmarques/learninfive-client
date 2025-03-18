import React from "react";
import BaseLayout from "@/shared/layouts/Base";

const Error = React.lazy(() => import("../features/error"));

const ErrorPage = () => {
  return (
    <BaseLayout>
      <Error />
    </BaseLayout>
  );
};

export default ErrorPage;
