import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loader;
