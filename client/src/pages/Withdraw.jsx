import { ExitToAppOutlined, LinkOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { getItemInLocalStorage } from "../utlis";

const Withdraw = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isInsufficient, setIsInsufficient] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { profile, isLoading } = useSelector((state) => state.global);
  const [amount, setAmount] = useState("");

  const putWithdrawalRequest = async (event) => {
    event.preventDefault();
    try {
      let value = parseInt(amount);
      if (profile.wallet - value < 0) {
        handleOpen();
        setIsInsufficient(true);
        setIsModalShown(false);
      } else if (profile.wallet - value < 200) {
        setIsInsufficient(false);

        if (!isModalShown) {
          handleOpen();
        }
        setIsModalShown(true);
      }
      if (isModalShown && profile.wallet - value > 0) {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/withdraw`,
          { amount: value },
          {
            headers: {
              authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
            },
          }
        );
        setAmount("");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    if (profile?.wallet === 0) {
      navigate("/user");
    }
  }, [isLoading]);
  return (
    <Container component={"main"} sx={{ height: "70svh" }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "16px",
          padding: "1rem 1.2rem",
          width: "100%",
          height: "40%",
          flex: "1",
          my: "2rem",
        }}
      >
        <Typography paragraph fontWeight={"bold"} color={"gold"}>
          Wallet
        </Typography>
        <Typography variant="h6">Balance</Typography>
        <Typography variant="h4" fontWeight="bold" padding="0.4rem">
          ~RD {profile?.wallet?.toString()}
        </Typography>
      </Box>
      <form
        sx={{
          width: "100%",
        }}
        onSubmit={putWithdrawalRequest}
      >
        <Grid container sx={{ gap: 2 }} justifyContent={"center"} mb="1rem">
          <Grid item>
            <TextField
              name="amount"
              id="amount"
              type="text"
              autoFocus
              value={amount}
              label="Amount"
              fullWidth
              onChange={(e) => setAmount(e.target.value)}
              required
            ></TextField>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" sx={{ height: "100%" }}>
              Submit Request
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Typography paragraph>
              Changed Your Mind? Go Back{" "}
              <IconButton onClick={() => naviaget("/user")}>
                <ExitToAppOutlined />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </form>

      {error && <ErrorText error={error} />}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {isInsufficient ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Your Wallet Has Insufficient Funds
              </Typography>
            ) : (
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Still want to continue? It will cease you account.
                </Typography>
                <Button variant="outlined" mt="0.5rem" onClick={handleClose}>
                  Continue
                </Button>
              </Box>
            )}
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default Withdraw;
