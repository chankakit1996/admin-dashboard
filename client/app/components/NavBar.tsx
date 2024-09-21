"use client";

import FlexBetween from "./FlexBetween";
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  InputBase,
} from "@mui/material";
import {
  LightModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { useAppDispatch } from "@/lib/hook";
import SearchIcon from "@mui/icons-material/Search";
import { setColorMode } from "@/lib/features/color-mode/colorModeSlice";
import { Dispatch, SetStateAction } from "react";

export default function NavBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* right */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setColorMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
