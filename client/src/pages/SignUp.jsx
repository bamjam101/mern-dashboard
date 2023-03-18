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
import {
  contactValidation,
  getItemInLocalStorage,
  passwordValidation,
} from "../utlis";
import ResponseText from "../components/ResponseText";
import ErrorText from "../components/ErrorText";

const Register = () => {
  const navigate = useNavigate();
  const userId = getItemInLocalStorage("TOKEN");
  const redirect = getItemInLocalStorage("REDIRECT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [referral, setReferral] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleUserSignUp = async (e) => {
    e.preventDefault();
    try {
      const validContact = contactValidation(contact);
      const validPassword = passwordValidation(password);
      if (validContact && validPassword) {
        const newRegistrant = {
          name,
          contact,
          email,
          password,
          referral,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
          newRegistrant
        );
        setResponse(response.data);
        setName("");
        setContact("");
        setEmail("");
        setPassword("");
        setReferral("");

        setResponse("Sign up details sent successfully.");
      } else {
        if (validContact) {
          setError("Password to weak!");
        } else {
          setError("Contact number is not valid 10 digit number.");
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userId) {
      navigate(redirect);
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
              name="name"
              id="name"
              type="text"
              placeholder="Enter Full Name"
              autoFocus
              value={name}
              label="Full Name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              required
            ></TextField>
            <TextField
              name="contact"
              id="contact"
              type="text"
              value={contact}
              placeholder="Enter 10 digit mobile number"
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
              placeholder="Enter a valid email address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></TextField>
            <TextField
              name="password"
              id="password"
              type="password"
              placeholder="Enter a strong password"
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
            <TextField
              type="text"
              label="Referral"
              placeholder="Do you have a referral? If No, Skip."
              fullWidth
              id="referral"
              name="referral"
              value={referral}
              autoComplete="off"
              onChange={(e) => setReferral(e.target.value)}
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
                <Link style={{ color: "gold" }} to={"/login"}>
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {response && <ResponseText response={response} />}
        {error && <ErrorText error={error} />}
      </Box>
    </Container>
  );
};

export default Register;
