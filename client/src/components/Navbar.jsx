import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "../state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMediumDevice = useMediaQuery("(max-width: 900px)");
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname.startsWith("/network")) {
      setIsNavbarHidden(true);
    } else {
      setIsNavbarHidden(false);
    }
  }, [location]);

  return (
    <AppBar
      sx={{
        position: user.isAdmin ? "static" : "fixed",
        background: "none",
        boxShadow: "none",
        width: "100%",
      }}
    >
      {!isNavbarHidden && (
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/*Left end of Navbar*/}
          {user?.isAdmin ? (
            <FlexBetween>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
              </IconButton>
            </FlexBetween>
          ) : (
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <Box width="100%">
                <img
                  src="/rd-logo.png"
                  style={{ objectFit: "contain", width: "3.5rem" }}
                  alt="richdollar-logo"
                />
              </Box>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                sx={{
                  "&:hover ": {
                    transform: "scale(1.02)",
                  },
                  color: theme.palette.secondary.main,
                }}
              >
                Richdollar
              </Typography>
            </Link>
          )}
          {/* Right end of Navbar */}
          <FlexBetween gap="0.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "1.5rem" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "1.5rem" }} />
              )}
            </IconButton>
            <FlexBetween
              onClick={handleClick}
              textTransform={"none"}
              gap="1rem"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  background: theme.palette.primary[400],
                },
                padding: "0.5rem 1rem",
                borderRadius: "22px",
              }}
            >
              <PersonOutlined
                sx={{
                  fontSize: "1.5rem",
                }}
              />
              <Typography
                fontWeight={"bold"}
                fontSize="0.85rem"
                sx={{
                  color: theme.palette.secondary[100],
                  display: isNonMediumDevice ? "none" : "block",
                }}
              >
                {user?.profile?.name}
              </Typography>
              <ArrowDropDownOutlined
                sx={{
                  "&:hover": { transform: "scale(1.1)" },
                  fontSize: "1.5rem",
                  color: theme.palette.secondary[300],
                }}
              />
            </FlexBetween>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
