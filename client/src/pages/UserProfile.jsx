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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setProfile } from "../state";
import { getItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";
import Table from "../components/Table";
import ResponseText from "../components/ResponseText";

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, isAdmin, isLoading, profile } = useSelector(
    (state) => state.global
  );
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const isNonMediumDevice = useMediaQuery("(max-width: 900px)");
  const [wallet, setWallet] = useState({});
  const params = useParams();
  let index;
  let row = [];
  const [referrals, setReferrals] = useState([]);
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
      renderCell: (params) => {
        const { row } = params;
        return (
          <IconButton onClick={() => setRowData(row)}>
            <CopyAllOutlined />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    navigator.clipboard.writeText(
      `${isAdmin ? params.id : userId}/${rowData._id}/${rowData.link}`
    );
  }, [rowData]);

  const fetchUserProfile = async () => {
    try {
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
        if (profile?.isApproved) {
          setReferrals(row);
        }
      }
      setResponse("Success");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const fetchMyProfile = async () => {
    try {
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
        if (profile?.isApproved) {
          setReferrals(row);
        }
      }
      setResponse("Success");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const fetchUserWallet = async () => {
    try {
      const { data: res } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/wallet/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setWallet(res);
      setResponse("Success");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const fetchMyWallet = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/wallet/me`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setWallet(data);
      setResponse("Success");
    } catch (error) {
      setError(error.response.data);
    }
  };
  useEffect(() => {
    if (isAdmin) {
      fetchUserProfile();
      fetchUserWallet();
    } else if (!isLoading) {
      fetchMyProfile();
      if (profile.isApproved) {
        fetchMyWallet();
      }
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(setProfile({ ...profile, wallet: wallet?.balance }));
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
            width: isNonMediumDevice ? "8rem" : "10rem",
            objectFit: "contain",
            height: isNonMediumDevice ? "8rem" : "10rem",
          }}
        ></Avatar>
        <Box
          padding={"0 1rem"}
          display="flex"
          flexDirection={"column"}
          gap={`${isNonMediumDevice ? "" : "0.5rem"}`}
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
        {profile?.isApproved ? (
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
                  top: "5%",
                  right: "5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    width: "0.5rem",
                    height: "0.5rem",

                    borderRadius: "45%",
                    backgroundColor: wallet?.active ? "lightgreen" : "tomato",
                  }}
                  title="Card Status"
                ></Box>
                <Typography
                  sx={{
                    m: 0,
                    p: 0,
                    color: wallet?.active ? "lightgreen" : "tomato",
                  }}
                >
                  {wallet?.active ? "Active" : "Inactive"}
                </Typography>
              </Box>
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
                {!isAdmin && profile.wallet !== 0 && (
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
        ) : (
          <ErrorText
            error={
              "Your profile is still under survery, kindly wait for approval to proceed with your account management."
            }
          />
        )}
      </Box>
      <Box mt={"2rem"} height="42.5vh">
        <Table
          columns={columns}
          data={referrals}
          isEditable={false}
          height={"42.5vh"}
        />
      </Box>
      {response && <ResponseText response={response} />}

      {error && <ErrorText error={error} />}
    </Container>
  );
};

export default UserProfile;
