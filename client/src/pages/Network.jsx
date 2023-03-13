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
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const params = useParams();

  const getUserNetwork = async () => {
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/network/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );

    setData(response.data);
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
      getUserNetwork();
    } else {
      getMyNetwork();
    }
  }, []);
  return (
    <Box>
      <Box
        width={"100%"}
        p="0 2.5rem"
        height={"10vh"}
        display="grid"
        placeItems="center"
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
      <Box overflow={"scroll"} width="100svw" height="90svh">
        {isTreeReady ? <Tree /> : null}
      </Box>
      {error ? <ErrorText error={error} /> : null}
    </Box>
  );
};

export default Network;
