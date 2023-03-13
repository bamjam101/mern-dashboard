import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const Header = ({ title, subtitle }) => {
  const [showSubtitle, setShowSubtitle] = useState(true);
  useEffect(() => {
    if (subtitle === "") {
      setShowSubtitle(false);
    }
  }, []);
  return (
    <Box width="100%" display="flex" flexDirection="column" gap="0.5rem">
      <Typography variant="h5" component={"h2"} fontWeight="bold">
        {title.toUpperCase()}
      </Typography>
      {showSubtitle && (
        <Typography paragraph>{subtitle.toUpperCase()}</Typography>
      )}
    </Box>
  );
};

export default Header;
