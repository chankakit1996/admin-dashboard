"use client";

import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useAppSelector } from "../../lib/hook";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const mode = useAppSelector((state) => state.colorMode.mode);
  const theme = createTheme(themeSettings(mode as "light" | "dark"));
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="homepage-layout-box"
        display={isNonMobile ? "flex" : "block"}
        width="100%"
        height="100%"
      >
        <SideBar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePageLayout;
