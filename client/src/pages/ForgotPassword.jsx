import { LockResetOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ErrorText from "../components/ErrorText";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isResent, setIsResent] = useState(false);

  const handleOTPGeneration = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/recovery/forgot-password`,
        {
          email: email,
        }
      );
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleOTPResend = () => {
    handleOTPGeneration();
    setIsResent(true);
  };
  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: "secondary.main",
          }}
        >
          <LockResetOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: "1rem" }}>
          Recover Your Account
        </Typography>
        <form
          sx={{
            width: "100%",
          }}
          onSubmit={handleOTPGeneration}
        >
          <Grid container sx={{ gap: 2 }}>
            <TextField
              name="email"
              id="email"
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></TextField>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
          >
            Send OTP
          </Button>
          {!isResent ? (
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Typography paragraph>
                  Did not recieve OTP?{" "}
                  <Button
                    type="button"
                    style={{ color: "gold", outline: "none", border: "none" }}
                    onClick={handleOTPResend}
                  >
                    Resend OTP
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          ) : null}
        </form>
        {error && <ErrorText error={error} />}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
