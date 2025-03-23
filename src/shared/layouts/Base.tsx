import React from "react";
import Footer from "../components/footer";
import "./styles/base.css";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
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
      <div className="main-content">
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default BaseLayout;
