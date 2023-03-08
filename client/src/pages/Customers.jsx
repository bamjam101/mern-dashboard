import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { getItemInLocalStorage } from "../utlis";

const Customers = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatingRow, setUpdatingRow] = useState(null);

  async function handleEditSubmit() {
    if (updatingRow) {
      const { _id, name, pan, aadhar, isApproved, role } = updatingRow;
      await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/user/${_id}`, {
        _id,
        name,
        role,
        pan,
        aadhar,
        isApproved,
      });
    }
  }

  useEffect(() => {
    handleEditSubmit();
    fetchRegistrants();
    setIsUpdated(false);
  }, [isUpdated]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    {
      field: "contact",
      headerName: "Contact",
      flex: 0.5,
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "pan", headerName: "PAN", flex: 0.6, editable: true },
    { field: "aadhar", headerName: "Aadhar", flex: 1, editable: true },
    { field: "role", headerName: "Role", flex: 0.5, editable: true },
    {
      field: "isApproved",
      headerName: "Verified",
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        const { row } = params;
        return (
          <button
            type="button"
            style={{
              width: "100%",
              height: "100%",
              outline: "none",
              border: "none",
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary[100],
              fontWeight: "bold",
              zIndex: "1000",
              cursor: "pointer",
            }}
            onClick={() => {
              const { isApproved, ...others } = row;
              setUpdatingRow({ ...others, isApproved: true });
              setIsUpdated(true);
            }}
          >
            Verify
          </button>
        );
      },
    },
  ];

  const fetchRegistrants = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/all`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    const result = response.data;
    if (typeof result === "string") {
      setData([]);
    } else {
      setData(result);
    }
  };
  useEffect(() => {
    fetchRegistrants();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List Of Customers..." />
      <Table columns={columns} data={data} isEditable={true} />
    </Box>
  );
};

export default Customers;
