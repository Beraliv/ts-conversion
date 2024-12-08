import { Theme } from "../types/Theme";

export const getDefaultTheme = (): Theme => {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  // when `matchMedia` is not supported, synchronise it to styles
  // which use dark theme by default

  return "dark";
};
