import { useEffect, useState } from "react";
import { getDefaultTheme } from "./getDefaultTheme";
import { Theme } from "../types/Theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme());

  useEffect(() => {
    const darkThemeListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme("dark");
    const lightThemeListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme("light");

    const darkColourScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const lightColourScheme = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    darkColourScheme.addEventListener("change", darkThemeListener);
    lightColourScheme.addEventListener("change", lightThemeListener);

    return () => {
      darkColourScheme.removeEventListener("change", darkThemeListener);
      lightColourScheme.removeEventListener("change", lightThemeListener);
    };
  }, []);

  return theme;
};
