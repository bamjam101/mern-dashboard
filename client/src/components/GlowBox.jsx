import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const GlowBox = ({ right, left, top, bottom, opacity }) => {
  const theme = useTheme();
  const isNonMediumDevice = useMediaQuery("(max-width: 900px)");
  return (
    <Box
      sx={{
        position: "absolute",
        borderRadius: "54% 46% 60% 40% / 67% 30% 70% 33%",
        width: isNonMediumDevice ? "5svh" : "10svh",
        height: isNonMediumDevice ? "5svh" : "10svh",
        top: `${top}`,
        right: `${right}`,
        left: `${left}`,
        bottom: `${bottom}`,
        backgroundColor: theme.palette.primary[300],
        boxShadow: `0 0 60px 50px ${theme.palette.primary[300]}, 0 0 100px 125px ${theme.palette.primary[200]},0 0 140px 200px ${theme.palette.primary[100]}`,
        opacity: opacity,
        WebkitFilter: "blur(5px)",
        filter: "blur(5px)",
      }}
    ></Box>
  );
};

export default GlowBox;
