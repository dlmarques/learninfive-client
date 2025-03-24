import React from "react";
import Footer from "../components/footer";
import "./styles/base.css";
import Header from "../components/header";

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
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default BaseLayout;
