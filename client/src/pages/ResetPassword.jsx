import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "/success.png";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import ResponseText from "../components/ResponseText";

const ResetPassword = () => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/user/${
        params.id
      }/reset-password/${params.token}`;
      const res = await axios.post(url, {
        password: password,
      });
      if (res.data) {
        setIsRequestSent(true);
      }
    } catch (error) {
      setResponse("Email has already been verified.");
    }
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box display={"flex"} gap="1rem" flexDirection={"column"}>
        {isRequestSent ? (
          <img src={success} alt="success_img" />
        ) : (
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Avatar
              sx={{
                m: 1,
                backgroundColor: "gold",
                display: "grid",
                placeItems: "center",
              }}
            >
              <LockOutlined />
            </Avatar>
          </Box>
        )}
        {isRequestSent ? (
          <Typography variant="h4">Password Has Been Modified</Typography>
        ) : (
          <Typography variant="h4">Enter New Password</Typography>
        )}
        {isRequestSent ? null : (
          <form
            sx={{
              width: "100%",
            }}
            onSubmit={handleResetPassword}
          >
            <Grid container sx={{ gap: 2 }}>
              <TextField
                name="password"
                id="password"
                type="password"
                label="New Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "100%" }}
            >
              Reset Password
            </Button>
          </form>
        )}
        {isRequestSent ? (
          <Typography paragraph textAlign={"center"}>
            <Link style={{ color: "gold" }} to={"/login"}>
              Login
            </Link>
          </Typography>
        ) : null}
      </Box>

      <ResponseText response={response} />
    </Container>
  );
};

export default ResetPassword;
