"use client";

import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import FlexBetween from "./FlexBetween";
import {
  ReceiptLongOutlined,
  Groups2Outlined,
  HomeOutlined,
  ShoppingCartOutlined,
  PublicOutlined,
  ChevronRightOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  PieChartOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme, ListItemIcon, ListItemText } from "@mui/material";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

export default function SideBar({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isNonMobile: boolean;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    isSidebarOpen && (
      <Box component="nav" className="sidebar-box">
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant={isNonMobile ? "persistent" : "temporary"}
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              width: drawerWidth,
              backgroundImage: "none",
            },
          }}
        >
          <Box width="100%">
            <Box margin="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      variant="h6"
                      color={theme.palette.grey[300]}
                      sx={{ m: "1.5rem 0 0.75rem 3rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lowerText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <Link href={`/${lowerText}`} width="100%">
                      <ListItemButton
                        onClick={() => {
                          setActive(text.toLowerCase());
                        }}
                        sx={{
                          backgroundColor:
                            active === lowerText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lowerText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lowerText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lowerText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </Box>
    )
  );
}
