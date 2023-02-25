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
import { setMode } from "../state";
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

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {};

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
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
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
          <FlexBetween onClick={handleClick} textTransform={"none"} gap="1rem">
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
              {user?.name}jam200111
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
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
