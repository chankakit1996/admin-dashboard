import FlexBetween from "./FlexBetween";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
