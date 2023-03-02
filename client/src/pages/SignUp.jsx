import { LockOutlined } from "@mui/icons-material";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../utlis";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = getItemInLocalStorage("USER_ID");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleUserSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return new Error("Password too short!");
    } else {
      const newRegistrant = {
        contact,
        email,
        password,
      };
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
          newRegistrant
        );
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, []);
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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: "1rem" }}>
          Sign Up
        </Typography>
        <form
          sx={{
            width: "100%",
          }}
          onSubmit={handleUserSignUp}
        >
          <Grid container sx={{ gap: 2 }}>
            <TextField
              name="contact"
              id="contact"
              type="text"
              autoFocus
              value={contact}
              label="Contact"
              fullWidth
              onChange={(e) => setContact(e.target.value)}
              required
            ></TextField>
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
            <TextField
              name="password"
              id="password"
              type="password"
              sx={{
                padding: "0",
                margin: "0",
              }}
              label="Password"
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
            Sign Up
          </Button>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography paragraph>
                Already have an account? Go to{" "}
                <Link
                  style={{ color: theme.palette.secondary[300] }}
                  to={"/login"}
                >
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
