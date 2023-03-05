import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "/success.png";
import { Container, Typography, Button, Box } from "@mui/material";

const Verification = () => {
  const [response, setResponse] = useState("");

  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_BASE_URL}/user/${
          params.id
        }/verify/${params.token}`;
        const res = await axios.get(url);
        setValidUrl(true);
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
        <Typography variant="h4">Email verified successfully</Typography>
        <Typography paragraph textAlign={"center"}>
          <Link style={{ color: "gold" }} to={"/login"}>
            Login
          </Link>
        </Typography>
      </Box>
      <Box
        width={"100%"}
        padding="2rem 0"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        {response ? (
          <Typography
            paragraph
            color="lightgreen"
            padding={"0.5rem 1rem"}
            border="2px dotted lightgreen"
            textAlign={"center"}
            sx={{ borderRadius: "8px" }}
          >
            {response}
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
};

export default Verification;
