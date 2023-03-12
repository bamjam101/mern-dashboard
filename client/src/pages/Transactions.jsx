import { Box, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { getItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const theme = useTheme();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
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
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "balance", headerName: "Current Balance", flex: 0.5 },
    { field: "amount", headerName: "Transaction Amount", flex: 0.5 },
    { field: "date", headerName: "Transaction Date", flex: 0.5 },
    { field: "status", headerName: "Approved/Rejected", flex: 0.5 },
  ];

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/stat/transactions`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      const result = response.data;
      setData(result);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="List Of Transactions..." />
      <Table columns={columns} data={data} isEditable={false} />
      {error && <ErrorText error={error} />}
    </Box>
  );
};

export default Transactions;
