import { Box, Container, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header";
import axios from "axios";
import { getItemInLocalStorage } from "../utlis";

const Network = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const isAdmin = useSelector((state) => state.global.isAdmin);
  console.log(isAdmin);

  const columns = [
    { field: "networkId", headerName: "Network ID", flex: 0.3 },
    { field: "networkOwner", headerName: "Network Leader", flex: 0.5 },
    { field: "networkStrength", headerName: "Network Strength", flex: 0.2 },
  ];

  const getAllNetworks = async () => {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/network/all`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );

    setData(response);
  };

  const getMyNetwork = async () => {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/network/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );

    setData(response);
  };

  useEffect(() => {
    if (isAdmin) {
      getAllNetworks();
    } else {
      getMyNetwork();
    }
  }, []);
  return (
    <Container component={"main"}>
      {!isAdmin ? (
        <Header title="Your Network" subtitle="" />
      ) : (
        <Header title="Networks" subtitle="List Of Networks" />
      )}
      {!isAdmin ? (
        <Box></Box>
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
    </Container>
  );
};

export default Network;
