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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setProfile } from "../state";
import { getItemInLocalStorage } from "../utlis";

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.global);
  const { isAdmin, isLoading } = useSelector((state) => state.global);
  const [userProfile, setUserProfile] = useState({});
  const [wallet, setWallet] = useState({});
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

  const fetchUserProfile = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setUserProfile(res);
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

  const fetchMyProfile = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setUserProfile(res);
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

  const fetchUserWallet = async () => {
    const { data: res } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/wallet/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setWallet(res);
  };

  const fetchMyWallet = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/wallet/me`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    setWallet(data);
  };
  useEffect(() => {
    if (isAdmin) {
      fetchUserProfile();
      fetchUserWallet();
    } else if (!isLoading) {
      fetchMyProfile();
      fetchMyWallet();
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(setProfile({ ...profile, wallet: wallet.balance }));
  }, [wallet]);
  return (
    <Container component={"main"} width="100%">
      <Box
        width={"100%"}
        display="grid"
        gridTemplateColumns={"0.5fr 1fr 1fr"}
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
            {userProfile?.name}
            <Typography paragraph color={"gold"}>
              {userProfile?.role}
            </Typography>
          </Typography>
          <Typography variant="h5" component={"h2"} textTransform="lowercase">
            {userProfile?.email}
          </Typography>
          <Typography variant="h6" component={"h3"}>
            {userProfile?.contact}
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
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "0.5rem",
                height: "0.5rem",
                top: "5%",
                right: "5%",
                borderRadius: "45%",
                backgroundColor: wallet?.active ? "lightgreen" : "tomato",
              }}
              title="Card Status"
            ></Box>
            <Typography paragraph fontWeight={"bold"} color={"gold"}>
              Wallet
            </Typography>
            <Typography variant="h6">Balance</Typography>
            <Typography variant="h4" fontWeight="bold" padding="0.4rem">
              ~RD {wallet?.balance?.toString()}
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
                  onClick={() => navigate("/withdraw")}
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
