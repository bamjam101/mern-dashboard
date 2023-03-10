import {
  CopyAllOutlined,
  JoinInnerOutlined,
  MoneyOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getItemInLocalStorage } from "../utlis";

const UserProfile = () => {
  const theme = useTheme();
  const { isAdmin } = useSelector((state) => state.global);
  const [profile, setProfile] = useState({});
  const params = useParams();
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
    navigator.clipboard.writeText(
      `${params.id}/${rowData._id}/${rowData.link}`
    );
  }, [rowData]);

  const fetchUserReferrals = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setProfile(res);
    if (res?.referralLinks?.length) {
      index = 1;
      res?.referralLinks?.forEach((element) => {
        const { _id, link, isUsed } = element;
        if (row.length < 5) {
          row = [...row, { index, link, _id, isUsed, copy: null }];

          index++;
        }
      });
      setReferrals(row);
    }
  };

  const fetchMyReferrals = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setProfile(res);
    if (res?.referralLinks?.length) {
      index = 1;
      res?.referralLinks?.forEach((element) => {
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
    if (isAdmin) {
      fetchUserReferrals();
    } else {
      fetchMyReferrals();
    }
  }, []);
  return (
    <Container component={"main"} width="100%">
      <Box
        width={"100%"}
        display="grid"
        gridTemplateColumns={"0.2fr 0.5fr 0.3fr"}
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
            {profile?.name}
            <Typography paragraph color={"gold"}>
              {profile?.role}
            </Typography>
          </Typography>
          <Typography variant="h5" component={"h2"} textTransform="lowercase">
            {profile?.email}
          </Typography>
          <Typography variant="h6" component={"h3"}>
            {profile?.contact}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "16px",
              padding: "1rem 1.2rem",
              width: "100%",
              flex: "1",
            }}
          >
            <Typography paragraph fontWeight={"bold"} color={"gold"}>
              Wallet
            </Typography>
            <Typography variant="h6">Balance</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              ~RD 200
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {!isAdmin && (
                <Button
                  variant="default"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary[600],
                    color: theme.palette.secondary[500],
                    opacity: "0.8",
                  }}
                >
                  <MoneyOutlined /> Withdraw
                </Button>
              )}
              <Button
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.primary[500],
                  color: theme.palette.primary[100],
                  opacity: "0.8",
                }}
              >
                <WalletOutlined /> Details
              </Button>
            </Box>
          </Box>
          {isAdmin ? (
            <Link
              to={`/network/${params.id}`}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "gold",
                  gap: "0.5rem",
                  width: "100%",
                  marginTop: "0.5rem",
                }}
              >
                <JoinInnerOutlined />
                User Network
              </Button>
            </Link>
          ) : (
            <Link
              to="/network"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "gold",
                  gap: "0.5rem",
                  width: "100%",
                  marginTop: "0.5rem",
                }}
              >
                <JoinInnerOutlined />
                Network
              </Button>
            </Link>
          )}
        </Box>
      </Box>
      <Box mt={"2rem"} height="42.5vh">
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
      </Box>
    </Container>
  );
};

export default UserProfile;
