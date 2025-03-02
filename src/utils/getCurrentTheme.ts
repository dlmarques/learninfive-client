export const getCurrentThemeClass = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) return "dark-theme";
  return theme === "dark" ? "dark-theme" : "light-theme";
};
