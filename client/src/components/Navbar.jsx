import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "../state";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/*Left end of Navbar*/}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background}
            borderRadius="1rem"
            gap="1rem"
            p="0.1rem 1.5rem"
          >
            <InputBase
              sx={{
                border: `2px solid ${theme.palette.primary[100]}`,
                padding: "0.2rem 0.5rem",
                borderRadius: "1.5rem",
              }}
              placeholder="Search..."
            />
            <IconButton>
              <Search sx={{ fontSize: "1.6rem" }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* Right end of Navbar */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "1.5rem" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
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
              sx={{ color: theme.palette.secondary[100] }}
            >
              {user?.username}
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
    </AppBar>
  );
};

export default Navbar;
