import Footer from "@/shared/components/footer";
import React from "react";

const CompleteProfile = React.lazy(() => import("@/features/complete-profile"));

const CompleteProfilePage = () => {
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
        <CompleteProfile />
        <Footer />
      </div>
    </main>
  );
};

export default CompleteProfilePage;
