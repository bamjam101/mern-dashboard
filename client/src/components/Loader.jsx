import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();
  return (
    <Backdrop
      open
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "1000",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "gold" }} />
    </Backdrop>
  );
};

export default Loader;
