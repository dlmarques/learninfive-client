import { Link, useLocation } from "@tanstack/react-router";

export const useFooterLinks = () => {
  const { pathname } = useLocation();

  const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <p>Useful links:</p>
      {children}
    </div>
  );

  const Separator = () => <p>|</p>;

  switch (pathname) {
    case "/":
      return (
        <FooterWrapper>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Separator />
          <Link to="/license">
            <p>License</p>
          </Link>
        </FooterWrapper>
      );
    case "/sign-in":
    case "/sign-up":
    case "/complete-profile":
    case "/edit-profile-preferences":
      return (
        <FooterWrapper>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <Separator />
          <Link to="/about">
            <p>About</p>
          </Link>
          <Separator />
          <Link to="/license">
            <p>License</p>
          </Link>
        </FooterWrapper>
      );
    case "/about":
      return (
        <FooterWrapper>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <Separator />
          <Link to="/license">
            <p>License</p>
          </Link>
        </FooterWrapper>
      );
    case "/license":
      return (
        <FooterWrapper>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <Separator />
          <Link to="/about">
            <p>About</p>
          </Link>
        </FooterWrapper>
      );
    case "/error":
      return (
        <FooterWrapper>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <Separator />
          <Link to="/about">
            <p>About</p>
          </Link>
          <Separator />
          <Link to="/license">
            <p>License</p>
          </Link>
        </FooterWrapper>
      );
    default:
      return (
        <FooterWrapper>
          <Link to="/">
            <p>Topic</p>
          </Link>
          <Separator />
          <Link to="/about">
            <p>About</p>
          </Link>
          <Separator />
          <Link to="/license">
            <p>License</p>
          </Link>
        </FooterWrapper>
      );
  }
};
