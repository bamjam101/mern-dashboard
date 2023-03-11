import { LinkOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemInLocalStorage } from "../utlis";

const Withdraw = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [amount, setAmount] = useState(0);
  const putWithdrawalRequest = async () => {
    const { data: res } = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/wallet/me`,
      {
        headers: {
          authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );

    console.log(res);
  };
  return (
    <Container component={"main"}>
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
      </Box>
      <form
        sx={{
          width: "100%",
        }}
        onSubmit={putWithdrawalRequest}
      >
        <Grid container sx={{ gap: 2 }}>
          <TextField
            name="amount"
            id="amount"
            type="number"
            autoFocus
            value={amount}
            label="Amount"
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
            required
          ></TextField>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, width: "100%" }}
        >
          Submit Request
        </Button>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Typography paragraph>
              Changed Your Mind? Go Back{" "}
              <Button
                type="button"
                style={{ color: "gold" }}
                onClick={() => navigate(-1)}
              >
                <LinkOutlined />
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Withdraw;
