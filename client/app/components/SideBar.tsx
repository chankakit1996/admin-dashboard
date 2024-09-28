"use client";

import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
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
  SettingsOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme, ListItemIcon, ListItemText } from "@mui/material";
import profileImage from "../assets/profile.png";
import { User } from "@/lib/features/api/apiSlice";

const navItems = [
  {
    text: "Dashboard",
    toPage: "/",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    toPage: "/",
    icon: null,
  },
  {
    text: "Products",
    toPage: "/product",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    toPage: "/customer",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    toPage: "/transaction",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    toPage: "/geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    toPage: "/sales/overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    toPage: "/sales/daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    toPage: "/sales/monthly",
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
    toPage: "/admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    toPage: "/performance",
    icon: <TrendingUpOutlined />,
  },
];

export default function SideBar({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  user: User;
  isNonMobile: boolean;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(`/${pathname.substring(1)}`);
  }, [pathname]);

  return (
    isSidebarOpen && (
      <Box component="nav">
        <Drawer
          className="sidebar-drawer"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="temporary"
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
              justifyContent: "space-between",
              overflow: "hidden",
            },
          }}
        >
          <Box width="100%" className="sidebar-box-2">
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
              {navItems.map(({ text, icon, toPage }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      variant="h6"
                      color={theme.palette.secondary.light}
                      sx={{ m: "1.5rem 0 0.75rem 3rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <Link href={toPage} width="100%">
                      <ListItemButton
                        onClick={() => {
                          setActive(text.toLowerCase());
                        }}
                        sx={{
                          backgroundColor:
                            active === toPage
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === toPage
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === toPage
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === toPage && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box width="100%" className="sidebar-box-3">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="2rem 2rem 1.5rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage.src}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box
                textAlign="left"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  noWrap
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.email}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      </Box>
    )
  );
}
