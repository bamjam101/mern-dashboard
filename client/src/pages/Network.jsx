import { Box, Container, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import axios from "axios";
import { getItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";

const Network = () => {
  const theme = useTheme();
  const [error, setError] = useState("false");
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
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/network/me`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      console.log(response.data);
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
    }

    // setData(data);
    // console.log(message);
  };

  useEffect(() => {
    if (isAdmin) {
      getAllNetworks();
    } else {
      getMyNetwork();
    }
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      {!isAdmin ? (
        <Header title="YOUR NETWORK" subtitle="" />
      ) : (
        <Header title="NETWORKS" subtitle="List Of Networks..." />
      )}
      {!isAdmin ? (
        <Box></Box>
      ) : (
        <Table data={data} columns={columns} isEditable={false} />
      )}

      <ErrorText error={error} />
    </Box>
  );
};

export default Network;
