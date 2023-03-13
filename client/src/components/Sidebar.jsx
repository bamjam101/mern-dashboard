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
  ChevronLeft,
  ChevronRightOutlined,
  CloseOutlined,
  DataObjectOutlined,
  Groups2Outlined,
  HomeOutlined,
  PersonOutlined,
  ReceiptLongOutlined,
  RequestPageOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Registrant",
    icon: null,
  },
  {
    text: "Registrants",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Approval & History",
    icon: null,
  },
  {
    text: "Requests",
    icon: <RequestPageOutlined />,
  },
  {
    text: "Transactions",
    icon: <DataObjectOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
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
  const [isSidebarToggleVisible, setIsSidebarToggelVisible] = useState(false);

  useEffect(() => {
    setActive(pathname.substring(1));
    if (pathname.startsWith("/network")) {
      setIsSidebarToggelVisible(true);
      setIsSidebarOpen(false);
    } else {
      setIsSidebarToggelVisible(false);
    }
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
              width: drawerWidth,
            },
          }}
        >
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/"
                >
                  <Box width="100%" display={"grid"} placeItems="center">
                    <img
                      src="/rd-logo.png"
                      style={{ objectFit: "contain", width: "2rem" }}
                      alt="richdollar-logo"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight={"bold"} sx={{}}>
                    Richdollar
                  </Typography>
                </Link>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <CloseOutlined />
                </IconButton>
              )}
              {isSidebarToggleVisible && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <CloseOutlined />
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
                      "&:hover": {
                        color: "white",
                      },
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
            <FlexBetween textTransform={"none"} gap="0.4rem" mt={"0.5rem"}>
              <PersonOutlined
                sx={{
                  fontSize: "1.5rem",
                }}
              />
              <Typography
                fontWeight={"bold"}
                fontSize="0.9rem"
                m={"0.2rem 0"}
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user?.profile?.name}
              </Typography>
              <SettingsOutlined
                sx={{
                  "&:hover": { transform: "scale(1.1)" },
                  fontSize: "1.5rem",
                  color: theme.palette.secondary[300],
                }}
              />
            </FlexBetween>
            <Divider />
            <Typography
              fontSize="0.8rem"
              sx={{
                color: theme.palette.secondary[200],
                textAlign: "center",
              }}
            >
              {user?.role}
            </Typography>
          </Box>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default Sidebar;
