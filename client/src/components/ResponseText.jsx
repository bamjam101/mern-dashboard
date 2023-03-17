import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ResponseText = ({ response }) => {
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
      zIndex="1000"
      width={"100%"}
      padding="2rem 0"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      {response && visibility ? (
        <Typography
          paragraph
          color={"lightgreen"}
          padding={"0.5rem 1rem"}
          border={`2px dotted lightgreen`}
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
