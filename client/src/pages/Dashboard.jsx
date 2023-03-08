import { CopyAllOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../utlis";

const Dashboard = () => {
  const [response, setResponse] = useState("");
  const { userId, profile, role, isAdmin } = useSelector(
    (state) => state.global
  );
  let index;
  let row = [];
  const [referrals, setReferrals] = useState(null);
  const [rowData, setRowData] = useState({
    link: null,
    isUsed: false,
    _id: null,
  });

  const columns = [
    { field: "index", headerName: "Sr. No.", flex: 0.2 },
    { field: "link", headerName: "Referral Link", flex: 1 },
    { field: "_id", headerName: "Occupied By", flex: 1 },
    {
      field: "isUsed",
      headerName: "Active",
      flex: 1,
    },
    {
      field: "copy",
      headerName: "-----",
      flex: 0.2,
      renderCell: () => {
        return (
          <IconButton>
            <CopyAllOutlined />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    navigator.clipboard.writeText(`${userId}/${rowData._id}/${rowData.link}`);
  }, [rowData]);

  const fetchReferrals = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/referral/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setResponse(res?.message);
    if (res?.length) {
      index = 1;
      res?.forEach((element) => {
        const { _id, link, isUsed } = element;
        if (row.length < 5) {
          row = [...row, { index, link, _id, isUsed, copy: null }];

          index++;
        }
      });
      setReferrals(row);
    }
  };
  useEffect(() => {
    fetchReferrals();
  }, []);
  return (
    <Container component={"main"}>
      <Box
        width={"100%"}
        display="grid"
        gridTemplateColumns={"0.2fr 0.8fr"}
        padding="2rem 0"
        gap={"2rem"}
      >
        <Avatar
          src="/profile.png"
          alt="profile-img"
          sx={{
            width: "10rem",
            objectFit: "contain",
            height: "10rem",
          }}
        ></Avatar>
        <Box
          padding={"0 1rem"}
          display="flex"
          flexDirection={"column"}
          gap="0.5rem"
          justifyContent="center"
        >
          <Typography variant="h3" component={"h2"} textTransform="uppercase">
            {profile.name}
            <Typography paragraph color={"gold"}>
              {role}
            </Typography>
          </Typography>
          <Typography variant="h5" component={"h2"} textTransform="lowercase">
            {profile.email}
          </Typography>
          <Typography variant="h6" component={"h3"}>
            {profile.contact}
          </Typography>
        </Box>
      </Box>
      {!isAdmin && (
        <Box mt={"2rem"} height="45vh">
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={referrals || []}
            loading={!referrals}
            getRowId={(referral) => referral._id}
            columns={columns}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = referrals.filter((row) =>
                selectedIDs.has(row._id.toString())
              );
              setRowData(selectedRowData[0]);
            }}
          />
          <Box
            width={"100%"}
            padding="2rem 0"
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            {response ? (
              <Typography
                paragraph
                color="tomato"
                padding={"0.5rem 1rem"}
                border="2px dotted tomato"
                textAlign={"center"}
                sx={{ borderRadius: "8px" }}
              >
                {response}
              </Typography>
            ) : null}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
