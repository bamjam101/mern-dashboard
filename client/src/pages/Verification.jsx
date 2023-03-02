import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "/success.png";
import { Container, Typography, Button, Box } from "@mui/material";

const Verification = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_BASE_URL}/user/${
          param.id
        }/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Container component="main">
      {validUrl ? (
        <Box>
          <img src={success} alt="success_img" />
          <Typography variant="h4">Email verified successfully</Typography>
          <Link to="/login">
            <Button type="button">Login</Button>
          </Link>
        </Box>
      ) : (
        <Typography variant="h4">404 Not Found</Typography>
      )}
    </Container>
  );
};

export default Verification;
