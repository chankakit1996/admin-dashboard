"use client";

import { useState } from "react";
import {
  Box,
  useMediaQuery,
  CircularProgress,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useAppSelector } from "../../lib/hook";
import { themeSettings } from "../../theme";
import { useGetUserQuery } from "../../lib/features/api/apiSlice";

export const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const mode = useAppSelector((state) => state.colorMode);
  const user = useAppSelector((state) => state.user);
  const theme = createTheme(themeSettings(mode as "light" | "dark"));
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data, isLoading } = useGetUserQuery(user.userId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {isLoading || !data ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          className="homepage-layout-box"
          display={isNonMobile ? "flex" : "block"}
          width="100%"
          height="100%"
        >
          <>
            <SideBar
              user={data}
              isNonMobile={isNonMobile}
              drawerWidth="250px"
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
              <NavBar
                user={data}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
              {children}
            </Box>
          </>
        </Box>
      )}
    </ThemeProvider>
  );
};

export const HomePageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box className="homepage-header" flexGrow={1}>
      <Typography variant="h1" fontWeight="bold" mb="0.5rem">
        {title}
      </Typography>
      <Typography variant="body1" mb="0.5rem">
        {description}
      </Typography>
    </Box>
  );
};

export default HomePageLayout;
