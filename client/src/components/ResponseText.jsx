import { Box, Typography } from "@mui/material";
import React from "react";

const ResponseText = ({ response }) => {
  return (
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
  );
};

export default ResponseText;
