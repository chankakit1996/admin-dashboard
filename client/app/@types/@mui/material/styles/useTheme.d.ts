import { Theme, PaletteColor, Palette } from "@mui/material/styles";

interface MyTheme extends Theme {
  palette: {
    neutral: {
      0: string;
      10: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
    } & PaletteColor;
    primary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    } & PaletteColor;
    background: {
      default: string;
      alt: string;
      paper: string;
    } & PaletteColor;
  } & Palette;
}

declare module "@mui/material/styles" {
  export function useTheme(): MyTheme;
}
