import { CopyAllOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../utlis";

const Dashboard = () => {
  const { isAdmin, isLoading } = useSelector((state) => state.global);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate("/user");
    }
  }, [isLoading]);
  return <Container component={"main"}>Dashboard</Container>;
};

export default Dashboard;
