export type ThemeColor = {
  primaryBackground: string;
  secondaryBackground: string;
  text: string;
  active: string;
  accent: string;
  accentHover: string;
  border: string;
  hover: string;
  icon: string;
  disabled: string;
};

export const themeColors: {
  light: ThemeColor;
  dark: ThemeColor;
} = {
  light: {
    primaryBackground: "#FFFFFF",
    secondaryBackground: "#FFFFFF",
    text: "#000000",
    active: "#bfdbd7",
    accent: "#53A597",
    accentHover: "#016764",
    border: "#EEEEEE",
    hover: "rgba(0, 0, 0, 0.1)",
    icon: "#888888",
    disabled: "#CCCCCC",
  },
  dark: {
    primaryBackground: "#000000",
    secondaryBackground: "#323232",
    text: "#FFFFFF",
    active: "#016764",
    accent: "#016764",
    accentHover: "#005958",
    border: "#323232",
    hover: "rgba(255, 255, 255, 0.3)",
    icon: "#FFFFFF",
    disabled: "#CCCCCC",
  },
};
