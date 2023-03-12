import { CopyAllOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../utlis";
import { setStats } from "../state";

const Dashboard = () => {
  const { isAdmin, isLoading } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statistics = new Map();

  const getUserStats = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/stat/users`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    statistics.set("users", data);
  };

  const getInvestmentStats = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/stat/investments`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    statistics.set("investments", data);
  };
  const getWithdrawalStats = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/stat/withdrawal-requests`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    statistics.set("requests", data);
  };
  const getRegistrantStats = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/stat/registrants`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    statistics.set("registrants", data);
  };
  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate("/user");
    }
    getInvestmentStats();
    getUserStats();
    getWithdrawalStats();
    getRegistrantStats();
    dispatch(
      setStats({
        users: statistics.get("users"),
        investments: statistics.get("investments"),
        requests: statistics.get("requests"),
        registrants: statistics.get("registrants"),
      })
    );
    console.log(statistics);
  }, [isLoading]);
  return (
    <Box sx={{ m: "1.5rem 2.25rem" }}>
      <Header title="DASHBOARD" subtitle="Overview Of System" />
    </Box>
  );
};

export default Dashboard;
