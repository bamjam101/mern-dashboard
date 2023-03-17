import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "/success.png";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorText from "../components/ErrorText";
import ResponseText from "../components/ResponseText";

const Verification = () => {
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const params = useParams();

  const verifyEmailUrl = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/auth/${
        params.id
      }/verify/${params.token}`;
      const res = await axios.get(url);
      if (res) {
        console.log(response);
        setResponse(res);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
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
        <Typography paragraph textAlign={"center"}>
          <Link style={{ color: "gold" }} to={"/login"}>
            Login
          </Link>
        </Typography>
      </Box>
      {response && <ResponseText response={response} />}

      {error && <ErrorText error={error} />}
    </Container>
  );
};

export default Verification;
