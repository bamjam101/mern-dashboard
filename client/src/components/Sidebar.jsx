import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PersonOffOutlined,
  PersonOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

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
    text: "Network",
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

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen ? (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              widht: drawerWidth,
            },
          }}
        >
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    sx={{
                      "&:hover ": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    NetworkMarket
                  </Typography>
                </Link>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography
                    key={text}
                    gutterBottom
                    sx={{ m: "2.25rem 0 0.5rem 3rem", fontWeight: "bold" }}
                  >
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box
            position="fixed"
            widht="100%"
            bottom="2rem"
            m="1.5rem 2rem 0 3rem"
          >
            <Divider />
            <FlexBetween textTransform={"none"} gap="1rem" mt={"0.5rem"}>
              <PersonOutlined
                sx={{
                  fontSize: "1.5rem",
                }}
              />
              <Typography
                fontWeight={"bold"}
                fontSize="0.9rem"
                mt={"0.2rem"}
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user?.name}jam200111
              </Typography>
              <SettingsOutlined
                sx={{
                  "&:hover": { transform: "scale(1.1)" },
                  fontSize: "1.5rem",
                  color: theme.palette.secondary[300],
                }}
              />
            </FlexBetween>
            <Typography
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200], textAlign: "center" }}
            >
              {user?.name}Superadmin
            </Typography>
          </Box>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default Sidebar;
