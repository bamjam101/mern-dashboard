import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Registrant = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [isClicked, setIsClicked] = useState(false);
  const [updatingRow, setUpdatingRow] = useState(null);

  async function handleEditSubmit() {
    if (updatingRow) {
      const { _id, name, role } = updatingRow;
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/approve`,
        {
          _id,
          name,
          role,
        }
      );
      console.log(response.data);
    }
  }
  useEffect(() => {
    handleEditSubmit();
  }, [updatingRow]);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5, editable: true },
    { field: "role", headerName: "Role", flex: 0.5, editable: true },
    {
      field: "isApproved",
      headerName: "Verified",
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        if (isClicked) {
          const { row } = params;
          setUpdatingRow(row);
        }
        return params.value ? (
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
            }}
            onClick={() => setIsClicked(true)}
          >
            Submit
          </button>
        ) : (
          "false"
        );
      },
    },
  ];

  useEffect(() => {
    const fetchRegistrants = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/user/registrants/all`
      );
      const result = response.data;
      if (typeof result === "string") {
        setIsEmpty(true);
      } else {
        setData(result);
      }
    };
    fetchRegistrants();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="REGISTRANTS" subtitle="List Of Registrants..." />
      <Box
        mt={"2rem"}
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={data || []}
          loading={!data}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Registrant;
