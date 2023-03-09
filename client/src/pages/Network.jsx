import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import axios from "axios";
import { getItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";
import Tree from "../components/Tree";
import { setLevels } from "../state";

const Network = () => {
  const [isTreeReady, setIsTreeReady] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
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
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/network/me`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    dispatch(
      setLevels({
        zero: data[0],
        one: data[1],
        two: data[2],
        three: data[3],
        four: data[4],
        five: data[5],
      })
    );
    setIsTreeReady(true);
  }, [data]);

  useEffect(() => {
    if (isAdmin) {
      getAllNetworks();
    } else {
      getMyNetwork();
    }
  }, []);
  return (
    <Box m="1.5rem 2.5rem" position={"relative"}>
      {!isAdmin ? (
        <Header title="YOUR NETWORK" subtitle="" />
      ) : (
        <Header title="NETWORKS" subtitle="List Of Networks..." />
      )}
      {!isAdmin ? (
        <Box overflow={"hidden"} position={"absolute"} left="2%" bottom={"10%"}>
          {isTreeReady ? <Tree /> : null}
        </Box>
      ) : (
        <Table data={data} columns={columns} isEditable={false} />
      )}
      {error ? <ErrorText error={error} /> : null}
    </Box>
  );
};

export default Network;
