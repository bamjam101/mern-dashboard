import { ExitToAppOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../utlis";
const Header = lazy(() => import("../components/Header"));
const ErrorText = lazy(() => import("../components/ErrorText"));
const FlexBetween = lazy(() => import("../components/FlexBetween"));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.global);
  const [error, setError] = useState("");
  const [users, setUsers] = useState({});
  const [investments, setInvestments] = useState({});
  const [registrants, setRegistrants] = useState(0);
  const [requests, setRequests] = useState({});
  const isNonSmallDevice = useMediaQuery("(max-width: 900px)");

  const getUserStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/stat/users`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setUsers(data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const getInvestmentStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/stat/investments`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setInvestments(data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const getWithdrawalStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/stat/withdrawal-requests`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setRequests(data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const getRegistrantStats = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/stat/registrants`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setRegistrants(data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  useEffect(() => {
    getInvestmentStats();
    getUserStats();
    getWithdrawalStats();
    getRegistrantStats();
  }, [isLoading]);
  return (
    <Box sx={{ m: "1.5rem 2.25rem" }}>
      <Header title="DASHBOARD" subtitle="Overview Of System" />
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
          height: "20svh",
          mt: "1rem",
        }}
      >
        <FlexBetween>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={"gold"}
            sx={{ margin: "0", padding: "0" }}
          >
            Number of registrantion requests
          </Typography>
          <IconButton onClick={() => navigate("/registrants")}>
            <ExitToAppOutlined />
          </IconButton>
        </FlexBetween>
        <Box>
          <Typography variant="h4" fontWeight="bold" padding="0.4rem">
            {registrants} Pending
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
          height: "20svh",
          mt: "1rem",
        }}
      >
        <FlexBetween>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={"gold"}
            sx={{ margin: "0", padding: "0" }}
          >
            Number of withdrawal requests
          </Typography>
          <IconButton onClick={() => navigate("/requests")}>
            <ExitToAppOutlined />
          </IconButton>
        </FlexBetween>
        <Box>
          <Typography variant="h4" fontWeight="bold" padding="0.4rem">
            {requests?.numberOfRequests} Pending
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
          position: "relative",
          height: "20svh",
          mt: "1rem",
        }}
      >
        <FlexBetween>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={"gold"}
            sx={{ margin: "0", padding: "0" }}
          >
            User Statistics
          </Typography>
          <IconButton onClick={() => navigate("/users")}>
            <ExitToAppOutlined />
          </IconButton>
        </FlexBetween>
        <Box
          display={"grid"}
          gridTemplateColumns="repeat(3, 1fr)"
          gap={"0.5rem"}
        >
          <Box>
            <Typography variant="h6">Total number of users</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {users?.allUsers}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Number of inactive users</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {users?.inActiveUsers}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Number of active users</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {users?.activeUsers}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexDirection: "column",
          position: "relative",
          height: "20svh",
          mt: "1rem",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={"gold"}
          sx={{ margin: "0", padding: "0" }}
        >
          Investments
        </Typography>
        <Box
          display={"grid"}
          gridTemplateColumns="repeat(3, 1fr)"
          gap={"0.5rem"}
        >
          <Box>
            <Typography variant="h6">Total investments</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {investments?.investment}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Investments Withdrawn</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {investments?.investmentWithdrawn}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Current Investment</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              {investments?.investmentRemaining}
            </Typography>
          </Box>
        </Box>
      </Box>
      {error && <ErrorText error={error} />}
    </Box>
  );
};

export default Dashboard;
