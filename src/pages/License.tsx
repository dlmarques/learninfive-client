import Footer from "@/shared/components/footer";
import React from "react";

const License = React.lazy(() => import("../features/license"));

const LicensePage = () => {
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
          width: "55vw",
        }}
      >
        <License />
        <Footer />
      </div>
    </main>
  );
};

export default LicensePage;
