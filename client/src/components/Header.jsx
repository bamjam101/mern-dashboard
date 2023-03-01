import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap="0.5rem">
      <Typography variant="h5" component={"h2"} fontWeight="bold">
        {title.toUpperCase()}
      </Typography>
      <Typography variant="h6" component={"h3"}>
        {subtitle.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default Header;
