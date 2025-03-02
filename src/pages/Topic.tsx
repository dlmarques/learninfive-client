import Footer from "@/shared/components/footer";
import React from "react";

const Topic = React.lazy(() => import("../features/topic"));

const TopicPage = () => {
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
        <Topic />
        <Footer />
      </div>
    </main>
  );
};

export default TopicPage;
