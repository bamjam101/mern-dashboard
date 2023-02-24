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
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();

  const handleUserLogin = () => {};
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
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
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
    </Container>
  );
};

export default Login;
