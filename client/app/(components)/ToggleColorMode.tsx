"use client";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeSettings from "../../theme";
import { useAppDispatch, useAppSelector } from "../../lib/hook";
import { setColorMode } from "../../lib/features/color-mode/colorModeSlice";

export default function ToggleColorMode() {
  const mode = useAppSelector((state) => state.colorMode);
  const theme = createTheme(themeSettings(mode as "light" | "dark"));
  const dispatch = useAppDispatch();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />(
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <Select value={mode} onChange={() => dispatch(setColorMode())}>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </Box>
      )
    </ThemeProvider>
  );
}
