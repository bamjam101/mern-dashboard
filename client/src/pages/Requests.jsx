import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Table from "../components/Table";
import { getItemInLocalStorage } from "../utlis";
import { ApprovalOutlined, CancelOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import ResponseText from "../components/ResponseText";

const Requests = () => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [data, setData] = useState([]);

  async function handleApproval(row) {
    try {
      const { requestedBy } = row;
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/withdraw/approve/${requestedBy}`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setResponse("Transaction Approved.");
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function handleRejection(row) {
    try {
      const { requestedBy } = row;
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/withdraw/reject/${requestedBy}`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setResponse("Transaction Rejected.");
    } catch (error) {
      setError(error.response.data);
    }
  }

  const columns = [
    {
      field: "requestedBy",
      headerName: "User",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link
            style={{
              color: theme.palette.secondary[400],
              textDecoration: "none",
            }}
            to={`/user/${params.row.requestedBy}`}
          >
            {params.row.transactionHolder}
          </Link>
        );
      },
    },
    { field: "transactionAmount", headerName: "Request Amount", flex: 0.5 },
    {
      field: "dispatchTime",
      headerName: "Request Time",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            width="100%"
            gap="0.5rem"
          >
            <IconButton
              type="button"
              style={{
                outline: "none",
                border: "none",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.secondary[100],
                fontWeight: "bold",
                zIndex: "1000",
                cursor: "pointer",
              }}
              onClick={() => handleApproval(row)}
            >
              <ApprovalOutlined />
            </IconButton>
            <IconButton
              type="button"
              style={{
                outline: "none",
                border: "none",
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.primary[100],
                fontWeight: "bold",
                zIndex: "1000",
                cursor: "pointer",
              }}
              onClick={() => handleRejection(row)}
            >
              <CancelOutlined />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const fetchWithdrawalRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/withdraw/all`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      const result = response.data;
      setData(result);
    } catch (error) {
      setError(error.response.data);
    }
  };
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Requests" subtitle="List Of Requests..." />
      <Table columns={columns} data={data} isEditable={false} height={"75vh"} />
      {error && <ErrorText error={error} />}
      {response && <ResponseText response={response} />}
    </Box>
  );
};

export default Requests;
