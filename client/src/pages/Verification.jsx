import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "/success.png";
import { Container, Typography, Button, Box } from "@mui/material";
import ResponseText from "../components/ResponseText";

const Verification = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [response, setResponse] = useState("");

  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_BASE_URL}/auth/${
          params.id
        }/verify/${params.token}`;
        const res = await axios.get(url);
        if (res.data) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
          setResponse("Email has already been verified.");
        }
      } catch (error) {
        setResponse("Email has been verified.");
      }
    };
    verifyEmailUrl();
  }, [params]);

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
        <img src={success} alt="success_img" />
        {validUrl ? (
          <Typography variant="h4">Email verified successfully</Typography>
        ) : (
          <Typography variant="h4">Verification code had been used</Typography>
        )}
        <Typography paragraph textAlign={"center"}>
          <Link style={{ color: "gold" }} to={"/login"}>
            Login
          </Link>
        </Typography>
      </Box>
      <ResponseText response={response} />
    </Container>
  );
};

export default Verification;
