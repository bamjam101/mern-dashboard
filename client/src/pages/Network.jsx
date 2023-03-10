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
    <Box m="1.5rem 2.5rem">
      <Box position="fixed" width={"100%"}>
        {!isAdmin ? (
          <Header title="YOUR NETWORK" subtitle={""} />
        ) : (
          <Header title="User NETWORK" subtitle={""} />
        )}
        <IconButton
          sx={{
            position: "absolute",
            right: "5%",
            top: "5%",
          }}
          onClick={() => navigate(-1)}
        >
          <CloseOutlined />
        </IconButton>
      </Box>
      <Box overflow={"hidden"} position={"absolute"} left="0%" bottom={"0%"}>
        {isTreeReady ? <Tree /> : null}
      </Box>
      {error ? <ErrorText error={error} /> : null}
    </Box>
  );
};

export default Network;
