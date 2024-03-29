import { LockOutlined } from "@mui/icons-material";
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
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setItemInLocalStorage } from "../utlis";
import ErrorText from "../components/ErrorText";

const Login = () => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        newUser
      );
      if (response.data) {
        const { token, user } = response.data;
        setItemInLocalStorage("TOKEN", token);
        if (user.role === "superadmin" || user.role === "admin") {
          navigate("/dashboard");
          setItemInLocalStorage("REDIRECT", "/dashboard");
        } else {
          navigate("/user");
          setItemInLocalStorage("REDIRECT", "/user");
        }
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
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
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form
          sx={{
            widht: "100%",
            mt: "1rem",
          }}
          onSubmit={handleUserLogin}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            type="email"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            label="Password"
            required
            fullWidth
            id="password"
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Login
          </Button>
        </form>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Typography paragraph>
              Forgot Your Password?{" "}
              <Link
                style={{ color: theme.palette.secondary[300] }}
                to={"/forgot-password"}
              >
                Reset Password
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography paragraph>
              New User? Go to{" "}
              <Link
                style={{ color: theme.palette.secondary[300] }}
                to={"/signup"}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {error && <ErrorText error={error} />}
    </Container>
  );
};

export default Login;
