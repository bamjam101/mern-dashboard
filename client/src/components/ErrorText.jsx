import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

const ErrorText = ({ error }) => {
  return (
    <Box
      width={"100%"}
      padding="2rem 0"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      {error ? (
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
