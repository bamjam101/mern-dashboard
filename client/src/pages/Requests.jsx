import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Table from "../components/Table";
import { getItemInLocalStorage } from "../utlis";
import { ApprovalOutlined, CancelOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorText from "../components/ErrorText";

const Requests = () => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const [updatingRow, setUpdatingRow] = useState({});
  const [data, setData] = useState([]);

  async function handleApproval() {
    try {
      if (updatingRow) {
        console.log(updatingRow);
        await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/withdraw/${
            updatingRow.requestedBy
          }`,
          updatingRow,
          {
            headers: {
              Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (updatingRow?.requestedBy) {
      handleApproval();
    }
  }, [updatingRow]);

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
            {params.row._id}
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
      flex: 0.5,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
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
              onClick={() => {
                setUpdatingRow({ ...row, status: "approved" });
              }}
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
              onClick={() => {
                setUpdatingRow({ ...row, status: "rejected" });
              }}
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
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Requests" subtitle="List Of Requests..." />
      <Table columns={columns} data={data} isEditable={false} />
      {error && <ErrorText error={error} />}
    </Box>
  );
};

export default Requests;
