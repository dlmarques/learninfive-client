import Footer from "@/shared/components/footer";
import React from "react";

const About = React.lazy(() => import("../features/about"));

const AboutPage = () => {
  return (
    <main
      style={{
        padding: "32px",
        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "50vw",
        }}
      >
        <About />
        <Footer />
      </div>
    </main>
  );
};

export default AboutPage;
