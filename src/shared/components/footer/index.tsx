import { useFooterLinks } from "@/shared/hooks/useFooterLinks";

const Footer = ({ customStyles }: { customStyles?: React.CSSProperties }) => {
  const footerLinks = useFooterLinks();

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
      {footerLinks}
      <p style={{ fontSize: "14px" }}>@2025 dlmarques</p>
    </div>
  );
};

export default Footer;
