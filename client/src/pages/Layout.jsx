import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getItemInLocalStorage } from "../utlis";
import axios from "axios";
import { setAdmin, setProfile, setUser, setUserRole } from "../state";

const Layout = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const { data: result } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    handleDispatch(result);
  };

  function handleDispatch(result) {
    dispatch(setUser(result._id));
    dispatch(
      setProfile({
        name: result.name,
        contact: result.contact,
        email: result.email,
        isApproved: result.isApproved,
      })
    );
    dispatch(setUserRole(result.role));
    if (result?.role === "superadmin") {
      dispatch(setAdmin(true));
    } else if (result?.role === "admin") {
      dispatch(setAdmin(true));
    }
  }
  const state = useSelector((state) => state.global);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      {state?.isAdmin ? (
        <Sidebar
          user={state || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      ) : null}
      <Box component="header" sx={{ width: "100%" }}>
        <Navbar
          user={state || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
