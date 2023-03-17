import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ErrorText = ({ error }) => {
  const [visibility, setVisibility] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, 5000);
    setVisibility(true);
  }, []);
  return (
    <Box
      position={"absolute"}
      bottom="0"
      left={"0"}
      width={"100%"}
      zIndex="1000"
      padding="2rem 0"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      {error && visibility ? (
        <Typography
          paragraph
          color={"tomato"}
          padding={"0.5rem 1rem"}
          border={`2px dotted tomato`}
          textAlign={"center"}
          sx={{ borderRadius: "8px" }}
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
};

export default ErrorText;
