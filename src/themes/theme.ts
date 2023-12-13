import { DefaultTheme } from "styled-components";
import { atom } from "recoil";

export const theme: DefaultTheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#4e4e4e",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};

export const darkState = atom({
  key: "isDark",
  default: false,
});
