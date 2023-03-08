import { Box, Container, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import axios from "axios";
import { getItemInLocalStorage } from "../utlis";

const Network = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const isAdmin = useSelector((state) => state.global.isAdmin);

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
        <Table data={data} columns={columns} isEditable={false} />
      )}
    </Container>
  );
};

export default Network;
