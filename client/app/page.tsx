"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeSettings from "../theme";
import { useAppSelector } from "../lib/hook";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { useGetUserQuery } from "../state/api";
import { Box } from "@mui/material";
import Sidebar from "./(components)/SideBar";
import NavBar from "./(components)/NavBar";

export default function App() {
  const mode = useAppSelector((state) => state.colorMode);
  const theme = createTheme(themeSettings(mode as "light" | "dark"));

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%">
          <Box>
            <NavBar />
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
