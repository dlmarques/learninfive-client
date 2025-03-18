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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p>Useful links:</p>
          <Link to="/about">
            <p>About</p>
          </Link>
          <p>|</p>
          <Link to="/license">
            <p>License</p>
          </Link>
        </div>
      )}
      {pathname === "/sign-in" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p>Useful links:</p>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <p>|</p>
          <Link to="/about">
            <p>About</p>
          </Link>
          <p>|</p>
          <Link to="/license">
            <p>License</p>
          </Link>
        </div>
      )}
      {pathname === "/sign-up" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p>Useful links:</p>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <p>|</p>
          <Link to="/about">
            <p>About</p>
          </Link>
          <p>|</p>
          <Link to="/license">
            <p>License</p>
          </Link>
        </div>
      )}
      {pathname === "/about" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p>Useful links:</p>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <p>|</p>
          <Link to="/license">
            <p>License</p>
          </Link>
        </div>
      )}
      {pathname === "/license" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p>Useful links:</p>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <p>|</p>
          <Link to="/about">
            <p>About</p>
          </Link>
        </div>
      )}
      <p style={{ fontSize: "14px" }}>@2025 dlmarques</p>
    </div>
  );
};

export default Footer;
