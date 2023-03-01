import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Registrant = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const theme = useTheme();

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
    { field: "isApproved", headerName: "Verified", flex: 0.5, editable: true },
  ];

  useEffect(() => {
    const fetchRegistrants = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/registrant/all`
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
      {isEmpty ? (
        <Typography variant="h6" component={"h4"} m="1.5rem 0">
          No Registrant Found
        </Typography>
      ) : (
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
      )}
    </Box>
  );
};

export default Registrant;
