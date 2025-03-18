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
    <div>
      {theme === "dark" ? (
        <LuSun
          onClick={() => onChangeTheme("light")}
          size={size}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <LuMoon
          onClick={() => onChangeTheme("dark")}
          size={size}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default ThemeChanger;
