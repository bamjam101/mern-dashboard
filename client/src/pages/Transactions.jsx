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
      field: "transactionHolder",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Link
            style={{
              color: theme.palette.secondary[400],
              textDecoration: "none",
            }}
            to={`/user/${row.requestedBy}`}
          >
            {row.transactionHolder}
          </Link>
        );
      },
    },
    { field: "transactionAmount", headerName: "Transaction Amount", flex: 0.5 },
    { field: "dispatchTime", headerName: "Transaction Date", flex: 0.5 },
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
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="List Of Transactions..." />
      <Table columns={columns} data={data} isEditable={false} height={"75vh"} />
      {error && <ErrorText error={error} />}
    </Box>
  );
};

export default Transactions;
