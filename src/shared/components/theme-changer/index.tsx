import { useThemeStore } from "@/store/theme.store";
import { getTheme } from "@/utils/getSystemTheme";
import { useEffect } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const ThemeChanger = () => {
  const { setTheme, theme } = useThemeStore();
  const size = "25px";
  const htmlElement = document.querySelector("html");

  const onChangeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    htmlElement?.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    const sessionTheme = localStorage.getItem("theme");

    if (sessionTheme) {
      setTheme(sessionTheme || "dark");
    } else {
      let systemTheme = getTheme();
      localStorage.setItem("theme", systemTheme);
      setTheme(systemTheme);
    }

    htmlElement?.setAttribute("data-theme", theme);
  }, []);

  return (
    <div style={{ position: "absolute", left: "16px", top: "16px" }}>
      {theme === "dark" ? (
        <LuSun onClick={() => onChangeTheme("light")} size={size} />
      ) : (
        <LuMoon onClick={() => onChangeTheme("dark")} size={size} />
      )}
    </div>
  );
};

export default ThemeChanger;
