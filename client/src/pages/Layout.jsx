import React, { useEffect, useState, Suspense } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { getItemInLocalStorage, setItemInLocalStorage } from "../utlis";
import axios from "axios";
import {
  setAdmin,
  setLoading,
  setProfile,
  setUser,
  setUserRole,
} from "../state";
import ErrorText from "../components/ErrorText";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const redirect = getItemInLocalStorage("REDIRECT");
  const fetchUser = async () => {
    try {
      const { data: result } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      handleDispatch(result);
    } catch (error) {
      setError(error.response.data);
    }
  };

  function handleDispatch(result) {
    dispatch(setUser(result._id));
    dispatch(
      setProfile({
        name: result.name,
        contact: result.contact,
        email: result.email,
        wallet: 0,
        isApproved: result.isApproved,
      })
    );
    dispatch(setUserRole(result.role));
    if (result?.role === "superadmin" || result?.role === "admin") {
      dispatch(setAdmin(true));
      setItemInLocalStorage("REDIRECT", "/dashboard");
    } else {
      setItemInLocalStorage("REDIRECT", "/user");
    }
    dispatch(setLoading(false));
  }
  const state = useSelector((state) => state.global);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchUser();
    if (!redirect) return;
    navigate(redirect);
  }, []);
  return (
    <Box
      width="100%"
      height="100%"
      display={isNonMobile ? "flex" : "block"}
      overflow="hidden"
    >
      {state?.isAdmin ? (
        <Sidebar
          user={state || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      ) : null}
      <Suspense fallback={<Loader />}>
        <Box component="header" sx={{ width: "100%" }}>
          <Navbar
            user={state || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {state.isAdmin ? null : (
            <Box sx={{ height: "8vh", width: "100%" }}></Box>
          )}
          <Outlet />
          {error && <ErrorText error={error} />}
        </Box>
      </Suspense>
    </Box>
  );
};

export default Layout;
