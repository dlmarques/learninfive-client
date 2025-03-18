import BaseLayout from "@/shared/layouts/Base";
import React from "react";

const About = React.lazy(() => import("../features/about"));

const AboutPage = () => {
  return (
    <BaseLayout>
      <About />
    </BaseLayout>
  );
};

export default AboutPage;
