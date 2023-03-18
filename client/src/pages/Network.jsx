import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { getItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";
import Tree from "../components/Tree";
import { setLevels } from "../state";
import { useNavigate, useParams } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";

const Network = () => {
  const navigate = useNavigate();
  const [isTreeReady, setIsTreeReady] = useState(false);
  const { isAdmin } = useSelector((state) => state.global);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const params = useParams();

  const getUserNetwork = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/network/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );

      setData(data);
      console.log(data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const getMyNetwork = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/network/me`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setData(data);
      console.log(data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      getUserNetwork();
    } else {
      getMyNetwork();
    }
  }, []);
  return (
    <Box>
      <Box
        position={"fixed"}
        left="0"
        top="0"
        zIndex="10000"
        p="0 2.5rem"
        height={"10vh"}
        sx={{
          display: "grid",
          width: "100%",
        }}
      >
        <FlexBetween>
          {!isAdmin ? (
            <Header title="YOUR NETWORK" subtitle={""} />
          ) : (
            <Header title="User NETWORK" subtitle={""} />
          )}
          <IconButton onClick={() => navigate(-1)}>
            <CloseOutlined />
          </IconButton>
        </FlexBetween>
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          bottom: "0",
          minWidth: "100svw",
          minHeight: "90svh",
        }}
        width="auto"
      >
        {data && <Tree sx={{ width: "100%", height: "100%" }} data={data} />}
      </Box>
      {error ? <ErrorText error={error} /> : null}
    </Box>
  );
};

export default Network;
