import { Link, useLocation } from "@tanstack/react-router";

const Footer = ({ customStyles }: { customStyles?: React.CSSProperties }) => {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "16px",
        ...customStyles,
      }}
    >
      {pathname === "/" && (
        <Link to="/about">
          <p>Click here to visit about page</p>
        </Link>
      )}
      {pathname === "/about" && (
        <Link to="/">
          <p>Click here to visit topic page</p>
        </Link>
      )}
      <p style={{ fontSize: "14px" }}>@2025 dlmarques</p>
    </div>
  );
};

export default Footer;
